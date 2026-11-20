/**
 * A WebSocket `send` made while the socket is still connecting throws INVALID_STATE_ERR. The Electrum
 * library behind cashscript (@electrum-cash/network) sends its `server.version` handshake when its
 * socket reports "connected", and on a reconnect that can reach a socket that is still connecting
 * (seen on the iOS simulator, 20 Nov 2026: "Uncaught Error INVALID_STATE_ERR" from
 * versionNegotiator → send). The throw happens inside an event callback, where nothing catches it,
 * and an uncaught error closes a release build.
 *
 * Such a send now waits for the socket to open instead. If the socket never opens, the message is
 * dropped, as it would be on a closed socket; the caller's own timeout then reports the failure.
 */
type Sendable = { readyState: number; send(data: unknown): void; addEventListener(type: 'open', listener: () => void): void; removeEventListener(type: 'open', listener: () => void): void };

const CONNECTING = 0;
const MARK = Symbol.for('focus-garden.socket-guard');

export function guardWebSocket(target: { prototype: Sendable } | undefined = (globalThis as { WebSocket?: { prototype: Sendable } }).WebSocket) {
  const proto = target?.prototype as (Sendable & { [MARK]?: true }) | undefined;
  if (!proto || proto[MARK]) return;
  const send = proto.send;
  proto.send = function guardedSend(this: Sendable, data: unknown) {
    if (this.readyState !== CONNECTING) return send.call(this, data);
    const onOpen = () => { this.removeEventListener('open', onOpen); send.call(this, data); };
    this.addEventListener('open', onOpen);
  };
  proto[MARK] = true;
}

guardWebSocket();
