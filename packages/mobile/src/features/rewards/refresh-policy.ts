/** How often the garden is re-read from Bitcoin Cash while the app is open. */
export const IDLE_REFRESH_MS = 60_000;
/**
 * While a tree is confirming, locked or on its way to the wallet, the next block decides when it can
 * move, so the app checks often: a grown tree is released within seconds of the chain allowing it,
 * not a minute later.
 */
export const WAITING_REFRESH_MS = 15_000;

const WAITING = new Set(['confirming', 'locked', 'claiming', 'merging']);

export function refreshInterval(sessions: readonly { state: string }[]) {
  return sessions.some((session) => WAITING.has(session.state)) ? WAITING_REFRESH_MS : IDLE_REFRESH_MS;
}
