/**
 * Prints the exact Telegram message for the live leaderboard, without sending anything.
 * Usage (from packages/telegram-bot): bun run dry-run
 * Runs under Bun with libauth's own crypto; the Worker build swaps in src/crypto-shim.ts (vite.config.ts).
 */
import tls from 'node:tls';
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

for (const host of ['bch.imaginary.cash', 'bch.loping.net']) {
  const client = electrumClient(tlsConnection(host));
  try {
    await client.request('server.version', 'focus-garden-telegram', '1.5');
    const leaders = await readLeaderboard(client.request, 'week');
    console.log(formatLeaderboard(leaders));
    console.error(`\n(dry run from ${host}; ranking key ${rankingKey(leaders) || '(empty)'}; nothing was sent)`);
    process.exit(0);
  } catch (error) {
    console.error(`${host}: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    client.done();
  }
}
process.exit(1);
