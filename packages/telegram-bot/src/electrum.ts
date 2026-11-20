import type { ElectrumRequest } from '@focus-garden/protocol/chain';

/** A line-oriented duplex connection: Electrum's TCP protocol is newline-delimited JSON-RPC. */
export interface LineConnection {
  write(line: string): Promise<void>;
  /** Calls back once per received line until the connection closes. */
  read(onLine: (line: string) => void): Promise<void>;
  close(): void;
}

const TIMEOUT_MS = 20_000;

/**
 * JSON-RPC over one connection. Requests time out after 20 s; a server error is thrown as an Error
 * with the server's message. `done()` closes the connection.
 */
export function electrumClient(connection: LineConnection): { request: ElectrumRequest; done(): void } {
  let next = 1;
  const pending = new Map<number, { resolve(value: unknown): void; reject(error: Error): void }>();
  const reading = connection.read((line) => {
    let message: { id?: unknown; result?: unknown; error?: { message?: string } | string };
    try { message = JSON.parse(line); } catch { return; }
    if (typeof message.id !== 'number') return;
    const waiter = pending.get(message.id);
    if (!waiter) return;
    pending.delete(message.id);
    if (message.error) waiter.reject(new Error(typeof message.error === 'string' ? message.error : message.error.message ?? 'Electrum error'));
    else waiter.resolve(message.result);
  });
  void reading.catch(() => undefined).finally(() => {
    for (const waiter of pending.values()) waiter.reject(new Error('Electrum connection closed'));
    pending.clear();
  });
  const request: ElectrumRequest = (method, ...params) => new Promise((resolve, reject) => {
    const id = next++;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`Electrum ${method} timed out`)); }, TIMEOUT_MS);
    pending.set(id, {
      resolve: (value) => { clearTimeout(timer); resolve(value); },
      reject: (error) => { clearTimeout(timer); reject(error); },
    });
    connection.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n').catch((error: unknown) => {
      clearTimeout(timer); pending.delete(id); reject(error instanceof Error ? error : new Error(String(error)));
    });
  });
  return { request, done: () => connection.close() };
}

/** Splits a byte stream into lines. */
export function lineSplitter(onLine: (line: string) => void) {
  const decoder = new TextDecoder();
  let buffer = '';
  return (chunk: Uint8Array) => {
    buffer += decoder.decode(chunk, { stream: true });
    let index: number;
    while ((index = buffer.indexOf('\n')) >= 0) {
      const line = buffer.slice(0, index).trim();
      buffer = buffer.slice(index + 1);
      if (line) onLine(line);
    }
  };
}
