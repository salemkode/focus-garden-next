# Focus Garden leaderboard → Telegram

A Cloudflare Worker (`focus-garden-telegram`) that posts the weekly Focus Garden leaderboard to a
Telegram chat. It reads the same public chain data the app shows: it scans the Focus Forest and
Focus Directory contracts through a public Electrum server and ranks them with
`@focus-garden/protocol`.

- **Inactive until configured.** Without the secrets `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`,
  the hourly cron logs "not configured" and does nothing else.
- **No spam.** It posts at most once a day, and only when the top 5 (ids and verified focus)
  changed since the last post. The last post is kept in the KV namespace bound as `STATE`.
- **Message.** Plain text, up to 8 lines: the title, the top 5, the app link and "Built with React
  Native (Expo) on Bitcoin Cash."

## Commands (from this folder)

| Command | What it does |
|---|---|
| `bun run dry-run` | Prints the exact message for the live leaderboard. Sends nothing. |
| `bun run test` | Formatter, change detection, and the crypto shim against libauth |
| `bun run check-deploy` | Builds the Worker without uploading it |
| `cf deploy` | Builds and deploys the Worker |

The deployed Worker also answers `GET /dry-run` with the same message, cached for 10 minutes.

## Activate

1. In Telegram, message **@BotFather**, send `/newbot`, and keep the token it gives you.
2. Add the bot to the target group or channel (as an admin for a channel), then get the chat id.
   For example, send a message in the chat and open
   `https://api.telegram.org/bot<token>/getUpdates`; the id is in `chat.id` (groups start with `-`).
3. Set both secrets on the Worker: `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`. Use the
   Cloudflare dashboard (Workers → focus-garden-telegram → Settings → Variables and secrets), or
   `cf deploy --secrets-file <file>` with a local file that is never committed. The next hourly run
   posts.

libauth normally compiles WebAssembly at runtime, which Workers refuse, so `vite.config.ts` swaps its
default crypto instances for `src/crypto-shim.ts` (pure-JS hashes, no signing).
