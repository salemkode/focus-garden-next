/** What a leaderboard post needs from a ranked entry (a subset of @focus-garden/protocol's LeaderEntry). */
export interface Leader {
  id: string;
  name: string;
  /** Verified focus in 512-second lock steps, as the app counts it. */
  points: number;
}

export const TOP = 5;
export const APP_URL = 'https://focus-app.salemkode.com';
/** One lock step, in seconds (packages/mobile/src/features/focus/catalog.ts SESSION_STEP). */
const STEP_SECONDS = 512;
const DAY_MS = 24 * 60 * 60 * 1000;

/** The app's duration format (packages/mobile/src/features/focus/stats.ts formatDuration). */
export function formatFocus(points: number) {
  const minutes = Math.round((points * STEP_SECONDS) / 60);
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  return minutes % 60 === 0 ? `${hours} h` : `${hours} h ${minutes % 60} min`;
}

/** Names come from the chain; keep each one on its own line and short. */
function cleanName(name: string) {
  const flat = name.replace(/\s+/g, ' ').trim();
  return flat.length > 32 ? `${flat.slice(0, 31).trimEnd()}…` : flat || 'Anonymous';
}

/** The Telegram post: plain text, at most 8 lines. */
export function formatLeaderboard(leaders: readonly Leader[]) {
  const top = leaders.slice(0, TOP);
  const lines = ['🌳 Focus Garden leaderboard (this week)'];
  if (top.length === 0) lines.push('No verified focus yet this week.');
  top.forEach((leader, index) => lines.push(`${index + 1}. ${cleanName(leader.name)}: ${formatFocus(leader.points)}`));
  lines.push(APP_URL, 'Built with React Native (Expo) on Bitcoin Cash.');
  return lines.join('\n');
}

/** Identifies a ranking: the top entries' ids and points, in order. Names don't change it. */
export function rankingKey(leaders: readonly Leader[]) {
  return leaders.slice(0, TOP).map((leader) => `${leader.id}:${leader.points}`).join('|');
}

export interface PostState {
  key: string;
  postedAt: number;
}

/**
 * Whether to post now: only when there is someone on the board, the ranking changed since the last
 * post, and at least a day has passed since it.
 */
export function shouldPost(last: PostState | null, leaders: readonly Leader[], now: number) {
  if (leaders.length === 0) return false;
  if (!last) return true;
  if (last.key === rankingKey(leaders)) return false;
  return now - last.postedAt >= DAY_MS;
}
