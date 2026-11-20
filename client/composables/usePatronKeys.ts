import type { SavedPatronKey } from "~/types";

export const usePatronKeys = () => {
  const idb = useIdb();

  const savePatronKey = async (params: {
    pagePath: string;
    membershipId: number;
    mnemonic: string;
  }) => {
    const savedKeys =
      (await idb.get<SavedPatronKey[]>(`patron-${params.pagePath}`)) || [];

    const keys = savedKeys.filter((k) => k.membershipId !== params.membershipId);
    keys.push({ membershipId: params.membershipId, mnemonic: params.mnemonic });

    await idb.set(`patron-${params.pagePath}`, keys);
  };

  const getPatronSavedKeys = async (params: { pagePath: string }) => {
    return await idb.get<SavedPatronKey[]>(`patron-${params.pagePath}`);
  };

  return { savePatronKey, getPatronSavedKeys };
};
