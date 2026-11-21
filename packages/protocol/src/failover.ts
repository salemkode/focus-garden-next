import { binToHex, hash256, hexToBin } from '@bitauth/libauth';
import type { ElectrumRequest } from './chain';

/** One open connection to an Electrum server. */
export interface ElectrumConnection {
  request(method: string, ...params: (string | number | boolean)[]): Promise<unknown>;
  close(): unknown;
}

export interface FailoverOptions {
  /** Server hostnames, in order of preference. */
  hosts: readonly string[];
  connect(host: string): Promise<ElectrumConnection>;
  /** A block only the right chain has; servers whose header at `height` doesn't match are skipped. */
  checkpoint?: { height: number; hash: string } | null;
  timeoutMs?: number;
  /** Builds the error thrown when a request or connection takes too long. */
  timeoutError?: () => Error;
  /** Builds the error thrown when no server could be reached. */
  unreachableError?: (cause: unknown) => Error;
}

/** Methods that are not retried on another server (a lost reply may hide a success). */
const NO_RETRY = new Set(['blockchain.transaction.broadcast']);

/** A server's refusal (a consensus rule, a missing coin) is an answer, not a server problem. */
export function isServerAnswer(cause: unknown) {
  const message = cause instanceof Error ? cause.message : String(cause);
  return /rule|reject|missing|conflict|no such|not found|unknown|invalid|dust|fee|spent|mempool/i.test(message);
}

export function headerHash(headerHex: string) {
  return binToHex(hash256(hexToBin(headerHex)).reverse());
}

/**
 * Electrum requests over a list of public servers. One connection is shared. A server that can't be
 * reached, fails the chain checkpoint, times out or drops is set aside, and the next one in the list
 * is used. A read that fails because of the server is retried once on the next server, within the
 * same call, so a single bad server never shows up as an error (a broadcast is not retried).
 */
export function failoverRequest(options: FailoverOptions): ElectrumRequest & { reset(): void } {
  const { hosts, connect, checkpoint = null, timeoutMs = 20_000 } = options;
  if (hosts.length === 0) throw new Error('No Electrum servers configured.');
  const timeoutError = options.timeoutError ?? (() => new Error('Bitcoin Cash did not answer in time. Try again.'));
  const unreachableError = options.unreachableError ?? ((cause: unknown) => new Error(`Could not reach Bitcoin Cash. (${String(cause)})`));
  let current: { host: string; connection: ElectrumConnection } | null = null;
  let connecting: Promise<{ host: string; connection: ElectrumConnection }> | null = null;
  let index = 0;

  function withTimeout<T>(work: Promise<T>) {
    return new Promise<T>((resolve, reject) => {
      const timer = setTimeout(() => reject(timeoutError()), timeoutMs);
      work.then((value) => { clearTimeout(timer); resolve(value); }, (cause: unknown) => { clearTimeout(timer); reject(cause); });
    });
  }

  async function open(host: string) {
    const connection = await withTimeout(connect(host));
    try {
      if (checkpoint) {
        const header = await withTimeout(connection.request('blockchain.block.header', checkpoint.height));
        if (typeof header !== 'string' || headerHash(header) !== checkpoint.hash) throw new Error(`${host} is not on the expected chain.`);
      }
      return { host, connection };
    } catch (cause) {
      void Promise.resolve().then(() => connection.close()).catch(() => undefined);
      throw cause;
    }
  }

  function connected() {
    if (current) return Promise.resolve(current);
    connecting ??= (async () => {
      let lastError: unknown = null;
      for (let attempt = 0; attempt < hosts.length; attempt += 1) {
        const at = (index + attempt) % hosts.length;
        try {
          const opened = await open(hosts[at]!);
          index = at;
          current = opened;
          return opened;
        } catch (cause) { lastError = cause; }
      }
      throw unreachableError(lastError);
    })().finally(() => { connecting = null; });
    return connecting;
  }

  /** Sets a server aside: the next call starts with the one after it. */
  function drop(server: { host: string; connection: ElectrumConnection }) {
    if (current !== server) return;
    current = null;
    index = (hosts.indexOf(server.host) + 1) % hosts.length;
    void Promise.resolve().then(() => server.connection.close()).catch(() => undefined);
  }

  const request = (async (method: string, ...params: (string | number | boolean)[]) => {
    const attempts = NO_RETRY.has(method) ? 1 : Math.min(2, hosts.length);
    let lastError: unknown = null;
    for (let attempt = 0; attempt < attempts; attempt += 1) {
      const server = await connected();
      try {
        return await withTimeout(server.connection.request(method, ...params));
      } catch (cause) {
        if (isServerAnswer(cause)) throw cause;
        lastError = cause;
        drop(server);
      }
    }
    throw lastError;
  }) as ElectrumRequest & { reset(): void };
  request.reset = () => { if (current) drop(current); };
  return request;
}
