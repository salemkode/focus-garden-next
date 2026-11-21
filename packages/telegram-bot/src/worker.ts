import { connect } from 'cloudflare:sockets';
import { failoverRequest } from '@focus-garden/protocol/failover';
import { CHAIN_CHECKPOINTS, ELECTRUM_SERVERS } from '@focus-garden/protocol/network';
import { electrumClient, lineSplitter, type LineConnection } from './electrum';
import { readLeaderboard } from './leaderboard';
import { formatLeaderboard, rankingKey, shouldPost, type PostState } from './message';

/**
 * Focus Garden leaderboard → Telegram. Inactive until both secrets are set:
 *   TELEGRAM_BOT_TOKEN  the bot's token from @BotFather
 *   TELEGRAM_CHAT_ID    the chat (group, channel or user) it posts to
 * The cron runs hourly; a post goes out at most once a day, and only when the top 5 changed.
 * GET /dry-run shows the message that would be posted, without sending it.
 */
interface Env {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  STATE: KVNamespace;
}

const LAST_POST = 'last-post';
const DRY_RUN_CACHE = 'dry-run';
const DRY_RUN_TTL_SECONDS = 600;

function tcpConnection(hostname: string): LineConnection {
  const socket = connect({ hostname, port: 50002 }, { secureTransport: 'on', allowHalfOpen: false });
  const writer = socket.writable.getWriter();
  const encoder = new TextEncoder();
  return {
    write: (line) => writer.write(encoder.encode(line)),
    async read(onLine) {
      const split = lineSplitter(onLine);
      const reader = socket.readable.getReader();
      for (;;) {
        const { value, done } = await reader.read();
        if (done) return;
        split(value);
      }
    },
    close: () => { void socket.close().catch(() => undefined); },
  };
}

/**
 * The current weekly leaderboard. Same servers, chain checkpoint and failover as the app
 * (@focus-garden/protocol), over TCP/TLS on port 50002, which every listed server offers.
 */
async function leaderboard() {
  const opened: (() => void)[] = [];
  const request = failoverRequest({
    hosts: ELECTRUM_SERVERS.mainnet,
    checkpoint: CHAIN_CHECKPOINTS.mainnet,
    async connect(host) {
      const client = electrumClient(tcpConnection(host));
      opened.push(client.done);
      await client.request('server.version', 'focus-garden-telegram', '1.5');
      return { request: client.request, close: client.done };
    },
  });
  try {
    return await readLeaderboard(request, 'week');
  } finally {
    for (const close of opened) close();
  }
}

async function sendMessage(env: Required<Pick<Env, 'TELEGRAM_BOT_TOKEN' | 'TELEGRAM_CHAT_ID'>>, text: string) {
  const response = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text, disable_web_page_preview: true }),
  });
  // Never log the URL: it contains the token.
  if (!response.ok) throw new Error(`Telegram sendMessage failed with HTTP ${response.status}`);
}

export async function postIfDue(env: Env, now = Date.now()) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    console.log('Telegram leaderboard: not configured (TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are required).');
    return 'not configured';
  }
  const leaders = await leaderboard();
  const last = await env.STATE.get<PostState>(LAST_POST, 'json');
  if (!shouldPost(last, leaders, now)) {
    console.log('Telegram leaderboard: nothing to post (no change, posted within a day, or empty board).');
    return 'skipped';
  }
  await sendMessage({ TELEGRAM_BOT_TOKEN: env.TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID: env.TELEGRAM_CHAT_ID }, formatLeaderboard(leaders));
  await env.STATE.put(LAST_POST, JSON.stringify({ key: rankingKey(leaders), postedAt: now } satisfies PostState));
  console.log('Telegram leaderboard: posted.');
  return 'posted';
}

export default {
  async scheduled(_controller: ScheduledController, env: Env, context: ExecutionContext) {
    context.waitUntil(postIfDue(env).catch((error: unknown) => { console.error('Telegram leaderboard failed:', error instanceof Error ? error.message : String(error)); }));
  },
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    if (request.method !== 'GET' || url.pathname !== '/dry-run') return new Response('Not found', { status: 404 });
    // Read-only: shows the message the next post would carry. Cached so the public servers aren't hammered.
    let text = await env.STATE.get(DRY_RUN_CACHE);
    if (!text) {
      text = formatLeaderboard(await leaderboard());
      await env.STATE.put(DRY_RUN_CACHE, text, { expirationTtl: DRY_RUN_TTL_SECONDS });
    }
    const configured = Boolean(env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID);
    return new Response(text + '\n', { headers: { 'content-type': 'text/plain; charset=utf-8', 'x-telegram-configured': String(configured), 'cache-control': 'no-store' } });
  },
};
