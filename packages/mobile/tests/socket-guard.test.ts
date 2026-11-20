import { describe, expect, test } from 'bun:test';
import { guardWebSocket } from '../src/features/socket-guard';

class FakeSocket {
  readyState = 0;
  sent: unknown[] = [];
  private listeners: (() => void)[] = [];
  send(data: unknown) {
    if (this.readyState === 0) throw new Error('INVALID_STATE_ERR');
    this.sent.push(data);
  }
  addEventListener(_type: 'open', listener: () => void) { this.listeners.push(listener); }
  removeEventListener(_type: 'open', listener: () => void) { this.listeners = this.listeners.filter((item) => item !== listener); }
  open() { this.readyState = 1; for (const listener of [...this.listeners]) listener(); }
  get waiting() { return this.listeners.length; }
}

describe('WebSocket send guard', () => {
  guardWebSocket(FakeSocket as unknown as Parameters<typeof guardWebSocket>[0]);
  guardWebSocket(FakeSocket as unknown as Parameters<typeof guardWebSocket>[0]); // installing twice is harmless

  test('a send while connecting waits for open instead of throwing', () => {
    const socket = new FakeSocket();
    expect(() => socket.send('server.version')).not.toThrow();
    expect(socket.sent).toEqual([]);
    socket.open();
    expect(socket.sent).toEqual(['server.version']);
    expect(socket.waiting).toBe(0);
  });

  test('queued sends keep their order, and sends on an open socket go straight out', () => {
    const socket = new FakeSocket();
    socket.send('a');
    socket.send('b');
    socket.open();
    socket.send('c');
    expect(socket.sent).toEqual(['a', 'b', 'c']);
  });
});
