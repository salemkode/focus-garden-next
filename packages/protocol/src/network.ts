import { binToHex, cashAddressToLockingBytecode } from '@bitauth/libauth';
import { z } from 'zod';

/**
 * Where Focus Garden lives. There is no server: the app reads and writes the shared contracts
 * directly through public Electrum (Fulcrum) servers. A deployment record pins the contracts.
 */
export type NetworkName = 'mainnet' | 'chipnet';
export const NETWORKS = ['mainnet', 'chipnet'] as const;
export const PREFIX = { mainnet: 'bitcoincash', chipnet: 'bchtest' } as const satisfies Record<NetworkName, string>;
export type Prefix = (typeof PREFIX)[NetworkName];

/**
 * Public Fulcrum servers (WSS on 50004), in order of preference; see ./failover.ts. Mainnet servers were
 * checked on 21 Nov 2026 (handshake, BCH fork block, same tip). electroncash.de stopped answering and
 * was removed.
 */
export const ELECTRUM_SERVERS: Record<NetworkName, readonly string[]> = {
  mainnet: ['bch.imaginary.cash', 'cashnode.bch.ninja', 'fulcrum.greyh.at', 'electrum.imaginary.cash', 'bch.loping.net'],
  chipnet: ['chipnet.bch.ninja', 'chipnet.imaginary.cash'],
};

/**
 * A block only this network's chain has. A server is used only if its header at `height` hashes to
 * `hash`, so a server on another chain (for example BTC, which shares the genesis block) is skipped.
 * Mainnet: block 478559, the first block after the August 2017 split.
 */
export const CHAIN_CHECKPOINTS: Record<NetworkName, { height: number; hash: string } | null> = {
  mainnet: { height: 478559, hash: '000000000000000000651ef99cb9fcbe0dadde1d424bd9f15ff20136191a5eec' },
  chipnet: null,
};

const hash = z.string().regex(/^[0-9a-f]{64}$/);
const contract = z.object({
  category: hash,
  address: z.string(),
  tokenAddress: z.string(),
  lockingBytecode: z.string().regex(/^aa20[0-9a-f]{64}87$/),
});
const recordSchema = z.object({
  schema: z.literal('focus-garden-deployment-v1'),
  network: z.enum(NETWORKS),
  forest: contract,
  directory: contract.nullable().optional(),
});
export type ContractDeployment = z.infer<typeof contract>;
export interface Deployment {
  network: NetworkName;
  prefix: Prefix;
  forest: ContractDeployment;
  directory: ContractDeployment | null;
}

/** Reads a packages/contracts/deployments/<network>.json record and checks it is self-consistent. */
export function deploymentFromRecord(input: unknown): Deployment {
  const record = recordSchema.parse(input);
  const prefix = PREFIX[record.network];
  for (const entry of [record.forest, record.directory].filter((value) => value != null)) {
    for (const address of [entry.address, entry.tokenAddress]) {
      const decoded = cashAddressToLockingBytecode(address);
      if (typeof decoded === 'string' || !address.startsWith(`${prefix}:`) || binToHex(decoded.bytecode) !== entry.lockingBytecode) {
        throw new Error(`Deployment record for ${record.network} has an address that does not match its contract.`);
      }
    }
  }
  return { network: record.network, prefix, forest: record.forest, directory: record.directory ?? null };
}
