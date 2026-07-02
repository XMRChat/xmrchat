// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: process.env.NUXT_PUBLIC_DEVTOOLS_ENABLED === "true" },
  devServer: {
    port: 3002,
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: "",
      apiServerSideBaseUrl: "",
      imageBaseUrl: "http://localhost:9000",
      imageServerSideBaseUrl: "",
      showLocaleSelect: "",
      activeLocales: "en,fr,de,es",
      showPremiumPages: "",
      showTipSplits: "",
      moneroNetwork: "mainnet",
      testTip: "",
    },
  },

  css: ["@/assets/style/main.scss"],

  components: [{ path: "./components", pathPrefix: false }],

  modules: [
    "@nuxt/ui",
    "@nuxt/fonts",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "dayjs-nuxt",
    "@nuxtjs/seo",
  ],

  piniaPluginPersistedstate: {
    cookieOptions: {
      maxAge: 3600 * 24 * 30,
    },
  },

  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      redirectOn: "root",
    },
    locales: [
      {
        code: "en",
        language: "en-US",
        iso: "en",
        name: "English",
        dir: "auto",
      },
      { code: "fr", language: "fr-FR", iso: "fr", name: "French", dir: "auto" },
      {
        code: "es",
        language: "es-ES",
        iso: "es",
        name: "Spanish",
        dir: "auto",
      },
      { code: "de", language: "de-DE", iso: "de", name: "German", dir: "auto" },
      {
        code: "ru",
        language: "ru-RU",
        iso: "ru",
        name: "Russian",
        dir: "auto",
      },
      {
        code: "fi",
        language: "fi-FI",
        iso: "fi",
        name: "Finnish",
        dir: "auto",
      },
      {
        code: "pcm",
        language: "pcm-NG",
        iso: "pcm",
        name: "Pidgin",
        dir: "auto",
      },
      { code: "ko", language: "ko-KR", iso: "ko", name: "Korean", dir: "auto" },
      { code: "ar", language: "ar-SA", iso: "ar", name: "Arabic", dir: "rtl" },
      { code: "cs", language: "cs-CZ", iso: "cs", name: "Czech", dir: "auto" },
      { code: "fa", language: "fa-IR", iso: "fa", name: "Farsi", dir: "rtl" },
    ],
    defaultLocale: "en",
    vueI18n: "./i18n.config.ts",
    restructureDir: false,
  },

  ui: {},

  icon: {
    collections: ["heroicons", "mdi", "tabler", "simple-icons"],
    customCollections: [{ prefix: "icon", dir: "./assets/icons" }],
  },

  dayjs: {
    plugins: ["localizedFormat"],
    locales: ["en", "fr", "es", "de", "ru", "fi", "ko", "ar"],
  },

  colorMode: {
    preference: "light",
    fallback: "light",
    classSuffix: "",
  },

  fonts: {
    families: [{ name: "Inter", provider: "google" }],
  },

  sitemap: {
    sitemaps: {
      pages: {
        includeAppSources: true,
        defaults: { changefreq: "weekly" },
      },
      creators: {
        sources: ["/api/__sitemap__/creators"],
        defaults: { changefreq: "daily" },
      },
    },
  },

  robots: {
    disallow: ["/admin", "/streamer"],
  },

  site: {
    name: "XMRChat",
    url: "https://xmrchat.com",
  },

  seo: {
    fallbackTitle: false,
    automaticOgAndTwitterTags: false,
  },
});
