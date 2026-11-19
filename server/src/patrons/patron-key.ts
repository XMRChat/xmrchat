import { createHash, randomBytes } from 'node:crypto';
import {
  entropyToMnemonic,
  mnemonicToEntropy,
  validateMnemonic,
} from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';

const ENTROPY_BYTES = 32;

// The hash is created from the hex of the entropy not the phrase,
// so spaces or letter case of the phrase does not matter.
const hashEntropy = (entropy: Uint8Array) =>
  createHash('sha256')
    .update(Buffer.from(entropy).toString('hex'))
    .digest('hex');

const normalizeMnemonic = (mnemonic: string) =>
  mnemonic.trim().toLowerCase().split(/\s+/).join(' ');

/**
 * Generates a new patron key. The mnemonic must only be shown to the patron once,
 * only the keyHash and keyHint are stored.
 */
export const generatePatronKey = () => {
  const entropy = randomBytes(ENTROPY_BYTES);
  const mnemonic = entropyToMnemonic(entropy, wordlist);

  return {
    mnemonic,
    keyHash: hashEntropy(entropy),
    // First 4 letters of the first word (words can be 3 letters).
    keyHint: mnemonic.split(' ')[0].slice(0, 4),
  };
};

/**
 * Returns the keyHash of a mnemonic or null if the mnemonic is not valid.
 */
export const hashPatronMnemonic = (mnemonic?: string) => {
  if (!mnemonic || typeof mnemonic !== 'string') return null;

  const normalized = normalizeMnemonic(mnemonic);
  if (!validateMnemonic(normalized, wordlist)) return null;

  const entropy = mnemonicToEntropy(normalized, wordlist);
  if (entropy.length !== ENTROPY_BYTES) return null;

  return hashEntropy(entropy);
};
