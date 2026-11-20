import { chainReader, type ElectrumRequest } from '@focus-garden/protocol/chain';
import { rankLeaders, scanForest, type ChainTransaction, type LeaderEntry, type LeaderPeriod } from '@focus-garden/protocol/leaderboard';
import { deploymentFromRecord } from '@focus-garden/protocol/network';
import mainnet from '../../contracts/deployments/mainnet.json';

export const DEPLOYMENT = deploymentFromRecord(mainnet);

/**
 * The leaderboard exactly as the app computes it (packages/mobile/src/services/community.ts): every
 * confirmed transaction of the Focus Forest and Focus Directory contracts, scanned and ranked by
 * @focus-garden/protocol. Only public profiles are ranked.
 */
export async function readLeaderboard(request: ElectrumRequest, period: LeaderPeriod, nowSeconds = Math.floor(Date.now() / 1000)): Promise<LeaderEntry[]> {
  const chain = chainReader(request);
  const contracts = [DEPLOYMENT.forest, ...(DEPLOYMENT.directory ? [DEPLOYMENT.directory] : [])];
  const histories = await Promise.all(contracts.map((entry) => chain.history(entry.lockingBytecode)));
  const ordered = [...new Map(histories.flat().filter((entry) => entry.height > 0).map((entry) => [entry.txid, entry])).values()]
    .sort((a, b) => a.height - b.height);
  const transactions: ChainTransaction[] = [];
  for (let index = 0; index < ordered.length; index += 8) {
    const batch = ordered.slice(index, index + 8);
    transactions.push(...await Promise.all(batch.map(async (entry) => ({ ...entry, raw: await chain.rawTransaction(entry.txid) }))));
  }
  const scan = scanForest(
    transactions,
    { category: DEPLOYMENT.forest.category, lockingBytecode: DEPLOYMENT.forest.lockingBytecode },
    DEPLOYMENT.directory ? { category: DEPLOYMENT.directory.category, lockingBytecode: DEPLOYMENT.directory.lockingBytecode } : null,
  );
  return rankLeaders(scan, period, nowSeconds, DEPLOYMENT.prefix);
}
