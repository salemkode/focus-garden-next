import { describe, expect, test } from 'bun:test';
import { IDLE_REFRESH_MS, refreshInterval, WAITING_REFRESH_MS } from '../src/features/rewards/refresh-policy';

describe('garden refresh interval', () => {
  test('checks often while a tree waits for the chain', () => {
    for (const state of ['confirming', 'locked', 'claiming', 'merging']) expect(refreshInterval([{ state: 'claimed' }, { state }])).toBe(WAITING_REFRESH_MS);
  });
  test('relaxes when nothing is waiting', () => {
    expect(refreshInterval([])).toBe(IDLE_REFRESH_MS);
    // A claimable tree is released at once if it has a consent; without one it waits for the user.
    expect(refreshInterval([{ state: 'claimed' }, { state: 'claimable' }])).toBe(IDLE_REFRESH_MS);
  });
});
