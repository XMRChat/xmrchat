export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  const patronStore = usePatronStore();
  await useLazyAsyncData(
    async () => {
      const [me] = await Promise.all([authStore.getMe(), patronStore.getMe()]);
      return me;
    },
    { server: false }
  );
});
