// Focus Garden leaderboard → Telegram (see src/worker.ts). Inactive until the secrets
// TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are set on the Worker.
// Deploy from this folder: cf deploy (builds with Vite, see vite.config.ts)
import { bindings, defineConfig, triggers } from 'cf/config';

export default defineConfig({
  worker: {
    name: 'focus-garden-telegram',
    entrypoint: './src/worker.ts',
    compatibilityDate: '2026-11-01',
    env: {
      // Last post (ranking key and time) and a 10-minute cache for GET /dry-run.
      STATE: bindings.kv(),
    },
    // Hourly check; a post goes out at most once a day, and only when the top 5 changed.
    triggers: [triggers.scheduled({ schedule: '0 * * * *' })],
  },
});
