import { ElectrumNetworkProvider } from 'cashscript';
import { chainReader, type ChainReader } from '@focus-garden/protocol/chain';
import { failoverRequest } from '@focus-garden/protocol/failover';
import { GardenTransactionError } from '@focus-garden/protocol';
import { CHAIN_CHECKPOINTS } from '@focus-garden/protocol/network';
import { ELECTRUM_HOSTS, NETWORK } from './network';

/**
 * One shared connection to a public Electrum server, with failover across the list in ./network
 * (see @focus-garden/protocol/failover): a server that can't be reached, isn't on the Bitcoin Cash
 * chain, times out or drops is set aside, and a failed read is retried once on the next server in the
 * same call. Servers are not trusted: transactions are checked against their ids and everything
 * signed is rebuilt from them (see @focus-garden/protocol/chain).
 */
const request = failoverRequest({
  hosts: ELECTRUM_HOSTS,
  checkpoint: CHAIN_CHECKPOINTS[NETWORK],
  async connect(hostname) {
    const provider = new ElectrumNetworkProvider(NETWORK, { hostname, manualConnectionManagement: true });
    try {
      await provider.connect();
    } catch (cause) {
      void provider.disconnect().catch(() => undefined);
      throw cause;
    }
    return { request: (method, ...params) => provider.performRequest(method, ...params), close: () => provider.disconnect() };
  },
  timeoutError: () => new GardenTransactionError({ message: 'Bitcoin Cash did not answer in time. Try again.' }),
  unreachableError: (cause) => new GardenTransactionError({ message: `Could not reach Bitcoin Cash. Check your connection and try again.${__DEV__ ? ` (${String(cause)})` : ''}` }),
});

export const chain: ChainReader = chainReader(request);
