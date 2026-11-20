import { connectWallet } from './wallet';

/**
 * Creates (or opens) the on-device Focus Garden wallet that pays network fees, and says which kind
 * it is. iPhone and Android use the XO wallet, whose recovery phrase lives in the Keychain/Keystore.
 */
export async function createAppWallet(): Promise<'xo' | 'foundation'> {
  await connectWallet();
  return 'xo';
}

/** Native apps keep wallet keys in the system's secure storage. */
export const BROWSER_HOT_WALLET = false;
