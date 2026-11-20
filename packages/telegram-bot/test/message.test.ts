import { describe, expect, test } from 'bun:test';
import { formatFocus, formatLeaderboard, rankingKey, shouldPost, type Leader } from '../src/message';

const leader = (id: string, name: string, points: number): Leader => ({ id, name, points });
const DAY = 24 * 60 * 60 * 1000;

describe('formatFocus', () => {
  test('uses the app duration format (512-second steps)', () => {
    expect(formatFocus(1)).toBe('9 min');
    expect(formatFocus(2)).toBe('17 min');
    expect(formatFocus(7)).toBe('1 h');
    expect(formatFocus(8)).toBe('1 h 8 min');
  });
});

describe('formatLeaderboard', () => {
  test('header, top 5, link and the React Native line, within 8 lines', () => {
    const board = [1, 2, 3, 4, 5, 6, 7].map((n) => leader(`p${n}`, `Gardener ${n}`, 10 - n));
    const text = formatLeaderboard(board);
    const lines = text.split('\n');
    expect(lines).toHaveLength(8);
    expect(lines[0]).toBe('🌳 Focus Garden leaderboard (this week)');
    expect(lines[1]).toBe('1. Gardener 1: 1 h 17 min');
    expect(lines[5]).toBe('5. Gardener 5: 43 min');
    expect(text).not.toContain('Gardener 6');
    expect(lines[6]).toBe('https://focus-app.salemkode.com');
    expect(lines[7]).toBe('Built with React Native (Expo) on Bitcoin Cash.');
  });

  test('an empty board says so', () => {
    expect(formatLeaderboard([]).split('\n')).toEqual([
      '🌳 Focus Garden leaderboard (this week)',
      'No verified focus yet this week.',
      'https://focus-app.salemkode.com',
      'Built with React Native (Expo) on Bitcoin Cash.',
    ]);
  });

  test('names from the chain stay on one short line', () => {
    const text = formatLeaderboard([leader('a', 'Two\nlines   and a very long name that keeps going on', 1)]);
    expect(text.split('\n')[1]).toBe('1. Two lines and a very long name…: 9 min');
  });
});

describe('change detection', () => {
  const board = [leader('a', 'A', 3), leader('b', 'B', 2)];

  test('the key follows ids and points, not names', () => {
    expect(rankingKey(board)).toBe('a:3|b:2');
    expect(rankingKey([leader('a', 'Renamed', 3), leader('b', 'B', 2)])).toBe(rankingKey(board));
    expect(rankingKey([leader('a', 'A', 4), leader('b', 'B', 2)])).not.toBe(rankingKey(board));
  });

  test('the first post goes out; an empty board never does', () => {
    expect(shouldPost(null, board, 0)).toBe(true);
    expect(shouldPost(null, [], 0)).toBe(false);
  });

  test('an unchanged ranking is not posted again, even days later', () => {
    expect(shouldPost({ key: rankingKey(board), postedAt: 0 }, board, 10 * DAY)).toBe(false);
  });

  test('a changed ranking waits until a day has passed', () => {
    const last = { key: 'a:1', postedAt: 0 };
    expect(shouldPost(last, board, DAY - 1)).toBe(false);
    expect(shouldPost(last, board, DAY)).toBe(true);
  });
});
