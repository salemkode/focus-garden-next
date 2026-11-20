import { describe, expect, test } from 'bun:test';
import { ripemd160, sha1, sha256, sha512 } from '@bitauth/libauth';
import * as shim from '../src/crypto-shim';

// The Worker swaps libauth's WebAssembly hashes for these; they must agree byte for byte.
const inputs = [new Uint8Array(0), new TextEncoder().encode('Focus Garden'), Uint8Array.from({ length: 1000 }, (_, i) => i % 251)];

describe('crypto shim matches libauth', () => {
  for (const [name, reference, replacement] of [['sha1', sha1, shim.sha1], ['sha256', sha256, shim.sha256], ['sha512', sha512, shim.sha512], ['ripemd160', ripemd160, shim.ripemd160]] as const) {
    test(`${name}: one-shot and streaming`, () => {
      for (const input of inputs) {
        expect(replacement.hash(input)).toEqual(reference.hash(input));
        const state = replacement.update(replacement.update(replacement.init(), input.slice(0, 7)), input.slice(7));
        expect(replacement.final(state)).toEqual(reference.hash(input));
      }
    });
  }

  test('signing is not available', () => {
    expect(() => (shim.secp256k1 as { signMessageHashSchnorr: unknown }).signMessageHashSchnorr).toThrow('not available');
  });
});
