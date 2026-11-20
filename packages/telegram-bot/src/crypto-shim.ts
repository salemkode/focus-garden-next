/**
 * Replaces libauth's `crypto/default-crypto-instances.js` in the Worker bundle (see vite.config.ts).
 * The original compiles WebAssembly at runtime behind a top-level `await`, which Cloudflare Workers do
 * not allow. The leaderboard only reads transactions, so pure-JS hashes from @noble/hashes are enough;
 * signing (secp256k1) is not available here on purpose.
 */
import { ripemd160 as nobleRipemd160 } from '@noble/hashes/legacy';
import { sha1 as nobleSha1 } from '@noble/hashes/legacy';
import { sha256 as nobleSha256 } from '@noble/hashes/sha2';
import { sha512 as nobleSha512 } from '@noble/hashes/sha2';

type Noble = typeof nobleSha256;
type Hasher = ReturnType<Noble['create']>;

/** libauth's streaming interface keeps state in an opaque Uint8Array; here it is a handle to a noble hasher. */
function hashInstance(noble: Noble) {
  const states = new WeakMap<Uint8Array, Hasher>();
  return {
    hash: (input: Uint8Array) => noble(input),
    init: () => { const handle = new Uint8Array(1); states.set(handle, noble.create()); return handle; },
    update: (state: Uint8Array, input: Uint8Array) => { states.get(state)!.update(input); return state; },
    final: (state: Uint8Array) => states.get(state)!.digest(),
  };
}

export const sha1 = hashInstance(nobleSha1 as Noble);
export const sha256 = hashInstance(nobleSha256);
export const sha512 = hashInstance(nobleSha512 as unknown as Noble);
export const ripemd160 = hashInstance(nobleRipemd160 as Noble);
export const secp256k1 = new Proxy({}, {
  get(_target, key) {
    if (key === 'then') return undefined;
    throw new Error(`secp256k1.${String(key)} is not available in the leaderboard bot (read-only).`);
  },
});
