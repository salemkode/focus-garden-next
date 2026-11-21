import { describe, expect, test } from 'bun:test';
import { failoverRequest, headerHash, type ElectrumConnection } from '../src/failover';
import { CHAIN_CHECKPOINTS, ELECTRUM_SERVERS } from '../src/network';

// The real mainnet header of block 478559, the first block after the 2017 split (fetched 21 Nov 2026).
const BCH_478559 = '00000020432d350741fbf28f2e1486eabe2c4e143bfe2241af6518010000000000000000abaa4bd8a48c1c6bc08ee39b66065e5e9484304cab8b56d5eed3e40b1ac996c899c480593547011822ca4ae8';
const checkpoint = CHAIN_CHECKPOINTS.mainnet!;

type Behaviour = 'ok' | 'down' | 'hang' | 'drops' | 'wrong-chain' | 'refuses';
function servers(behaviours: Record<string, Behaviour>) {
  const log: string[] = [];
  const connect = async (host: string): Promise<ElectrumConnection> => {
    const behaviour = behaviours[host] ?? 'ok';
    log.push(`connect ${host}`);
    if (behaviour === 'down') throw new Error(`${host} refused the connection`);
    return {
      request: async (method: string) => {
        log.push(`${host} ${method}`);
        if (method === 'blockchain.block.header') return behaviour === 'wrong-chain' ? BCH_478559.slice(0, -2) + 'ff' : BCH_478559;
        if (behaviour === 'hang') return new Promise(() => undefined);
        if (behaviour === 'drops') throw new Error('Electrum connection closed');
        if (behaviour === 'refuses') throw new Error('the transaction was rejected by network rules');
        return `${method} from ${host}`;
      },
      close: () => { log.push(`close ${host}`); },
    };
  };
  return { connect, log };
}

describe('Electrum failover', () => {
  test('uses the first server and keeps its connection', async () => {
    const { connect, log } = servers({});
    const request = failoverRequest({ hosts: ['a', 'b'], connect, checkpoint });
    expect(await request('blockchain.headers.get_tip')).toBe('blockchain.headers.get_tip from a');
    expect(await request('blockchain.scripthash.listunspent', 'x')).toBe('blockchain.scripthash.listunspent from a');
    expect(log.filter((line) => line.startsWith('connect'))).toEqual(['connect a']);
  });

  test('skips a server that cannot be reached', async () => {
    const { connect } = servers({ a: 'down' });
    const request = failoverRequest({ hosts: ['a', 'b', 'c'], connect, checkpoint });
    expect(await request('server.ping')).toBe('server.ping from b');
  });

  test('skips a server on another chain', async () => {
    const { connect, log } = servers({ a: 'wrong-chain' });
    const request = failoverRequest({ hosts: ['a', 'b'], connect, checkpoint });
    expect(await request('server.ping')).toBe('server.ping from b');
    expect(log).toContain('close a');
  });

  test('a read that fails on one server is retried on the next, in the same call', async () => {
    const { connect } = servers({ a: 'drops' });
    const request = failoverRequest({ hosts: ['a', 'b'], connect, checkpoint });
    expect(await request('blockchain.scripthash.get_history', 'x')).toBe('blockchain.scripthash.get_history from b');
    // And the next call stays on the working server.
    expect(await request('server.ping')).toBe('server.ping from b');
  });

  test('a server that stops answering times out and the read moves on', async () => {
    const { connect } = servers({ a: 'hang' });
    const request = failoverRequest({ hosts: ['a', 'b'], connect, checkpoint, timeoutMs: 30 });
    expect(await request('blockchain.transaction.get', 'x')).toBe('blockchain.transaction.get from b');
  });

  test('a server refusal is an answer: thrown, not retried, server kept', async () => {
    const { connect, log } = servers({ a: 'refuses' });
    const request = failoverRequest({ hosts: ['a', 'b'], connect, checkpoint });
    await expect(request('blockchain.transaction.get', 'x')).rejects.toThrow('network rules');
    expect(log.some((line) => line.startsWith('b '))).toBe(false);
  });

  test('a broadcast is never retried on another server', async () => {
    const { connect, log } = servers({ a: 'drops' });
    const request = failoverRequest({ hosts: ['a', 'b'], connect, checkpoint });
    await expect(request('blockchain.transaction.broadcast', '00')).rejects.toThrow('closed');
    expect(log.some((line) => line === 'b blockchain.transaction.broadcast')).toBe(false);
  });

  test('when every server is down, the error says so', async () => {
    const { connect } = servers({ a: 'down', b: 'down' });
    const request = failoverRequest({ hosts: ['a', 'b'], connect, checkpoint, unreachableError: () => new Error('Could not reach Bitcoin Cash.') });
    await expect(request('server.ping')).rejects.toThrow('Could not reach Bitcoin Cash.');
  });

  test('the checkpoint hash is the hash of the real header', () => {
    expect(headerHash(BCH_478559)).toBe(checkpoint.hash);
  });

  test('the mainnet list has several servers and a BCH-only checkpoint', () => {
    expect(ELECTRUM_SERVERS.mainnet.length).toBeGreaterThanOrEqual(4);
    expect(new Set(ELECTRUM_SERVERS.mainnet).size).toBe(ELECTRUM_SERVERS.mainnet.length);
    expect(ELECTRUM_SERVERS.mainnet).not.toContain('electroncash.de');
    expect(CHAIN_CHECKPOINTS.mainnet).toEqual({ height: 478559, hash: '000000000000000000651ef99cb9fcbe0dadde1d424bd9f15ff20136191a5eec' });
  });
});
