import { createInternalWallet } from '../../wallet/internal';

/**
 * Web: the XO engine needs native storage, so the browser uses the single-key Focus Garden wallet
 * (same contracts, same signing checks). Its key is kept in this browser's storage, which is why the
 * app tells web users to hold only a little BCH in it. Grown trees still go to the linked wallet,
 * which can also release them itself if this browser's wallet is lost.
 */
export async function createAppWallet(): Promise<'xo' | 'foundation'> {
  await createInternalWallet();
  return 'foundation';
}

/** The browser holds this wallet's key in its own storage. */
export const BROWSER_HOT_WALLET = true;
