export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  const patronStore = usePatronStore();
  const nuxtApp = useNuxtApp();
  const runtimeConfig = useRuntimeConfig();

  // const devLoggedIn = useCookie("xmrchat-dev-logged-in");

  nuxtApp.$axios.interceptors.request.use((config) => {
    // different base url when on production and server side
    if (process.server && process.env.NODE_ENV === "production") {
      config.baseURL = runtimeConfig.public.apiServerSideBaseUrl;
    }

    config.headers.Authorization = `Bearer ${authStore.state.token}`;
    if (patronStore.token) config.headers["X-Patron-Token"] = patronStore.token;
    config.headers["Accept-Language"] = nuxtApp.$i18n.locale.value;

    return config;
  });

  nuxtApp.$axios.interceptors.response.use(
    (res) => {
      // API responds with error object when there is error but does not fail the request
      const data = res.data;
      if (!data || data.error) {
        return Promise.reject({
          message: data.error,
        });
      }
      return res;
    },
    (error) => {
      if (error?.response?.status === 403 && authStore.isLoggedIn)
        authStore.logout();
      return Promise.reject(error);
    }
  );
});
