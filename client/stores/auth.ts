import type { StreamerPage, User } from "~/types";
import { parse, stringify } from "zipson";
import { RolesEnum } from "~/types/enums";

interface State {
  user?: User;
  page?: StreamerPage;
  token?: string;
}

export const useAuthStore = defineStore(
  "auth",
  () => {
    const { toStreamerDisplay, toIndex } = useRouteLocation();

    const {
      me: getMeApi,
      login: loginApi,
      signup: signupApi,
      logout: logoutApi,
      logoutAllSessions: logoutAllSessionsApi,
    } = useServices();

    const state: State = reactive({
      token: undefined,
      user: undefined,
      page: undefined,
    });

    const getMe = async () => {
      if (!state.token) return;
      try {
        const res = await getMeApi();
        state.user = res.user;
        state.page = res.page;

        return res;
      } catch (error) {
        // @ts-ignore
        console.log("getMe error: ", error?.response?.data);
      }
    };

    const afterAuth = async () => {
      try {
        const res = await getMeApi();
        state.user = res.user;
        state.page = res.page;

        return navigateTo(toStreamerDisplay()?.path);
      } catch (error) {
        // @ts-ignore
        console.log("Error on after auth", error?.response?.data);
      }
    };

    const login = async (params: { email?: string; password?: string }) => {
      const { access_token } = await loginApi(params);
      state.token = access_token;
      await afterAuth();
    };

    const signup = async (params: { password?: string; email?: string }) => {
      await signupApi(params);
      // await afterAuth();
    };

    const logout = async () => {
      try {
        await logoutApi();
      } catch (error) {
      } finally {
        state.token = undefined;
        state.page = undefined;
        state.user = undefined;
        return navigateTo(toIndex()?.path);
      }
    };

    const logoutAll = async () => {
      const { access_token } = await logoutAllSessionsApi();
      state.token = access_token;
    };

    const isLoggedIn = computed(() => state.token);
    const isAdmin = computed(() => state.user?.roles.includes(RolesEnum.ADMIN));
    const isPremium = computed(() => state.page?.isPremium);
    const isPremiumOrAdmin = computed(() => isPremium.value || isAdmin.value);
    const isCohost = computed(() => state.user?.cohostPage);
    const userEmail = computed(() => state.user?.email);
    const pageName = computed(() => state.page?.name || state.page?.path);

    return {
      state,
      isLoggedIn,
      userEmail,
      pageName,
      isAdmin,
      isPremium,
      isPremiumOrAdmin,
      isCohost,
      getMe,
      login,
      signup,
      logout,
      logoutAll,
    };
  },
  {
    persist: {
      serializer: {
        deserialize: parse,
        serialize: stringify,
      },
    },
  },
);
