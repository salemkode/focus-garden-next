import { fileURLToPath } from 'node:url';
import { cloudflare } from '@cloudflare/vite-plugin';
import { defineConfig } from 'vite';

// libauth's default crypto instances compile WebAssembly at runtime behind a top-level await, which
// Workers refuse. The bot only reads transactions, so they are swapped for pure-JS hashes.
export default defineConfig({
  plugins: [cloudflare()],
  resolve: {
    alias: [{ find: /^\.\/default-crypto-instances\.js$/, replacement: fileURLToPath(new URL('./src/crypto-shim.ts', import.meta.url)) }],
  },
});
