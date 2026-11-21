/**
 * Prints the exact Telegram message for the live leaderboard, without sending anything.
 * Usage (from packages/telegram-bot): bun run dry-run
 * Runs under Bun with libauth's own crypto; the Worker build swaps in src/crypto-shim.ts (vite.config.ts).
 */
import tls from 'node:tls';
import { failoverRequest } from '@focus-garden/protocol/failover';
import { CHAIN_CHECKPOINTS, ELECTRUM_SERVERS } from '@focus-garden/protocol/network';
import { electrumClient, lineSplitter, type LineConnection } from '../src/electrum';
import { readLeaderboard } from '../src/leaderboard';
import { formatLeaderboard, rankingKey } from '../src/message';

function tlsConnection(host: string): LineConnection {
  const socket = tls.connect({ host, port: 50002, servername: host });
  return {
    write: (line) => new Promise((resolve, reject) => socket.write(line, (error?: Error | null) => (error ? reject(error) : resolve()))),
    read: (onLine) => new Promise((resolve) => { const split = lineSplitter(onLine); socket.on('data', (chunk: Buffer) => split(new Uint8Array(chunk))); socket.on('close', () => resolve()); socket.on('error', () => resolve()); }),
    close: () => socket.end(),
  };
}

const opened: (() => void)[] = [];
let used = '';
const request = failoverRequest({
  hosts: ELECTRUM_SERVERS.mainnet,
  checkpoint: CHAIN_CHECKPOINTS.mainnet,
  async connect(host) {
    const client = electrumClient(tlsConnection(host));
    opened.push(client.done);
    await client.request('server.version', 'focus-garden-telegram', '1.5');
    used = host;
    return { request: client.request, close: client.done };
  },
});
try {
  const leaders = await readLeaderboard(request, 'week');
  console.log(formatLeaderboard(leaders));
  console.error(`\n(dry run from ${used}; ranking key ${rankingKey(leaders) || '(empty)'}; nothing was sent)`);
  process.exit(0);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
} finally {
  for (const close of opened) close();
}
