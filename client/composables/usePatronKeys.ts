import type { SavedPatronKey } from "~/types";

const PATRON_KEYS_IDB_KEY = "patron-keys";

export const usePatronKeys = () => {
  const idb = useIdb();

  // Appends a mnemonic to the list. Used when a new patron is created
  // (not logged in). Logged-in patrons reuse their existing key.
  const savePatronKey = async (params: { mnemonic: string }) => {
    const keys = (await idb.get<SavedPatronKey[]>(PATRON_KEYS_IDB_KEY)) || [];
    if (keys.some((k) => k.mnemonic === params.mnemonic)) return;

    keys.push({ mnemonic: params.mnemonic });
    await idb.set(PATRON_KEYS_IDB_KEY, keys);
  };

  const getPatronSavedKeys = async () => {
    return (await idb.get<SavedPatronKey[]>(PATRON_KEYS_IDB_KEY)) || [];
  };

  const removePatronSavedKey = async (params: { mnemonic: string }) => {
    const keys = (await idb.get<SavedPatronKey[]>(PATRON_KEYS_IDB_KEY)) || [];
    const next = keys.filter((k) => k.mnemonic !== params.mnemonic);
    await idb.set(PATRON_KEYS_IDB_KEY, next);
  };

  return { savePatronKey, getPatronSavedKeys, removePatronSavedKey };
};
