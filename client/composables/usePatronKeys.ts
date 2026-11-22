import type { SavedPatronKey } from "~/types";

const PATRON_KEYS_IDB_KEY = "patron-keys";

export const usePatronKeys = () => {
  const idb = useIdb();

  const savePatronKey = async (params: { mnemonic: string }) => {
    const savedKeys =
      (await idb.get<SavedPatronKey[]>(PATRON_KEYS_IDB_KEY)) || [];

    if (savedKeys.some((k) => k.mnemonic === params.mnemonic)) return;

    savedKeys.push({ mnemonic: params.mnemonic });
    await idb.set(PATRON_KEYS_IDB_KEY, savedKeys);
  };

  const getPatronSavedKeys = async () => {
    return await idb.get<SavedPatronKey[]>(PATRON_KEYS_IDB_KEY);
  };

  return { savePatronKey, getPatronSavedKeys };
};
