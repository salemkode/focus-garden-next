/**
 * Web only: expo-secure-store has no web implementation, and a browser has no secure enclave.
 * The browser build keeps the Focus Garden fee wallet in this browser's localStorage so a visitor
 * can plant, register and tip on Bitcoin Cash from the website. It is a hot wallet for network
 * fees: the app tells web users to keep only a small amount in it and to back up its phrase.
 * Grown trees always go to the linked external wallet, never to this one. Native builds use
 * expo-secure-store (Keychain / Keystore).
 */
const PREFIX = 'focusgarden.securestore.';

export const WHEN_UNLOCKED_THIS_DEVICE_ONLY = 'WHEN_UNLOCKED_THIS_DEVICE_ONLY';

// The linked wallet's address was stored under its bare name before; keep reading it.
const LEGACY_PUBLIC_KEYS = new Set(['focusgarden.reward.chipnet']);

export async function getItemAsync(key: string): Promise<string | null> {
  const value = globalThis.localStorage.getItem(PREFIX + key);
  if (value !== null) return value;
  return LEGACY_PUBLIC_KEYS.has(key) ? globalThis.localStorage.getItem(key) : null;
}

export async function setItemAsync(key: string, value: string): Promise<void> {
  globalThis.localStorage.setItem(PREFIX + key, value);
}

export async function deleteItemAsync(key: string): Promise<void> {
  globalThis.localStorage.removeItem(PREFIX + key);
  if (LEGACY_PUBLIC_KEYS.has(key)) globalThis.localStorage.removeItem(key);
}

export async function isAvailableAsync() {
  return true;
}
