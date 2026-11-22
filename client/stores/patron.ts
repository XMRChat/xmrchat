import type { Patron } from "~/types";

export const usePatronStore = defineStore(
  "patron",
  () => {
    const {
      patronLogin: patronLoginApi,
      getPatron: getPatronApi,
      updatePatronContacts: updatePatronContactsApi,
    } = useServices();

    const token = ref<string | undefined>(undefined);
    const patronData = ref<Patron | undefined>(undefined);

    const isLoggedIn = computed(() => !!token.value);
    const patron = computed(() => (token.value ? patronData.value : undefined));

    const logout = () => {
      token.value = undefined;
      patronData.value = undefined;
    };

    const getMe = async () => {
      if (!token.value) return;
      try {
        const res = await getPatronApi();
        patronData.value = res.patron;

        return res;
      } catch (error: any) {
        // Token is expired or invalid
        if (error?.response?.status === 401) logout();
      }
    };

    const login = async (params: { mnemonic: string }) => {
      const res = await patronLoginApi(params);
      token.value = res.token;
      patronData.value = res.patron;
    };

    const updateContacts = async (params: {
      email?: string;
      signal?: string;
      simplex?: string;
    }) => {
      const res = await updatePatronContactsApi(params);
      patronData.value = res.patron;
      return res;
    };

    return {
      token,
      patron,
      isLoggedIn,
      getMe,
      login,
      logout,
      updateContacts,
    };
  },
  {
    persist: {
      pick: ["token"],
    },
  },
);
