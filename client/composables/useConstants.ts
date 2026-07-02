import type { ContentLinkFull } from "~/types";
import {
  ContentLinkPlatformEnum,
  FiatEnum,
  IntegrationConfigType,
  LiveStreamPlatformEnum,
  MoneroNetworkTypeEnum,
  NotificationChannelEnum,
  NotificationPreferenceType,
} from "~/types/enums";

export const useConstants = () => {
  const { t } = useI18n();

  const CONTENT_LINKS: Record<ContentLinkPlatformEnum, ContentLinkFull> = {
    [ContentLinkPlatformEnum.X]: {
      name: "X (formerly Twitter)",
      colorClassName: "",
      iconClassName: "",
      icon: "i-tabler-brand-x",
      inputLabel: t("xUsername", { platform: "X (Twitter)" }),
      linkCreator: (v?: string) => `https://x.com/${v}`,
      verify: true,
    },
    [ContentLinkPlatformEnum.WEBSITE]: {
      name: "Website",
      colorClassName: "",
      iconClassName: "",
      icon: "i-tabler-link",
      inputLabel: t("websiteLink"),
      linkCreator: (v?: string) => v,
    },
    [ContentLinkPlatformEnum.YOUTUBE]: {
      name: "Youtube",
      colorClassName: "text-[#FF0000]",
      iconClassName: "",
      icon: "i-tabler-brand-youtube",
      inputLabel: t("youtubeChannel"),
      linkCreator: (v?: string) => `https://www.youtube.com/@${v}`,
    },
    [ContentLinkPlatformEnum.RUMBLE]: {
      name: "Rumble",
      colorClassName: "text-[#85c742]",
      iconClassName: "",
      icon: "i-tabler-brand-rumble",
      inputLabel: t("xUsername", { platform: "Rumble" }),
      linkCreator: (v?: string) => `https://rumble.com/c/${v}`,
    },
    [ContentLinkPlatformEnum.TWITCH]: {
      name: "Twitch",
      colorClassName: "text-[#6441a5]",
      iconClassName: "",
      icon: "i-tabler-brand-twitch",
      inputLabel: t("xUsername", { platform: "Twitch" }),
      linkCreator: (v?: string) => `https://www.twitch.tv/${v}`,
    },
    [ContentLinkPlatformEnum.SUBSTACK]: {
      name: "Substack",
      colorClassName: "text-[#FF6719]",
      iconClassName: "max-w-5 max-h-5",
      icon: "i-simple-icons-substack",
      inputLabel: t("xUsername", { platform: "Substack" }),
      linkCreator: (v?: string) => `https://substack.com/@${v}`,
    },
    [ContentLinkPlatformEnum.ODYSEE]: {
      name: "Odysee",
      colorClassName: "text-[#de0050]",
      iconClassName: "",
      icon: "i-simple-icons-odysee",
      inputLabel: t("xUsername", { platform: "Odysee" }),
      linkCreator: (v?: string) => `https://odysee.com/@${v}`,
    },
    [ContentLinkPlatformEnum.INSTAGRAM]: {
      name: "Instagram",
      colorClassName: "text-[#E1306C]",
      iconClassName: "",
      icon: "i-tabler-brand-instagram",
      inputLabel: t("xUsername", { platform: "Instagram" }),
      linkCreator: (v?: string) => `https://instagram.com/${v}`,
    },
    [ContentLinkPlatformEnum.TELEGRAM]: {
      name: "Telegram",
      colorClassName: "text-[#24A1DE]",
      iconClassName: "",
      icon: "i-tabler-brand-telegram",
      inputLabel: t("xUsername", { platform: "Telegram" }),
      linkCreator: (v?: string) => `https://t.me/${v}`,
    },
    [ContentLinkPlatformEnum.DISCORD]: {
      name: "Discord",
      colorClassName: "text-[#5865F2]",
      iconClassName: "",
      icon: "i-tabler-brand-discord",
      inputLabel: "Discord link (enter full URL)",
      linkCreator: (v?: string) => `${v}`,
    },
    [ContentLinkPlatformEnum.TIKTOK]: {
      name: "Tiktok",
      colorClassName: "text-[#FE2C55]",
      iconClassName: "",
      icon: "i-tabler-brand-tiktok",
      inputLabel: t("xUsername", { platform: "Tiktok" }),
      linkCreator: (v?: string) => `https://tiktok.com/@${v}`,
    },
    [ContentLinkPlatformEnum.PODCAST_RSS]: {
      name: "Podcast RSS",
      colorClassName: "text-[#ee802f]",
      iconClassName: "",
      icon: "i-tabler-rss",
      inputLabel: t("podcastRssLink"),
      linkCreator: (v?: string) => `${v}`,
    },
    [ContentLinkPlatformEnum.NOSTR]: {
      name: "Nostr",
      colorClassName: "text-[#662482]",
      iconClassName: "",
      icon: "i-icon-nostr",
      inputLabel: t("nostrPubKey"),
    },
    [ContentLinkPlatformEnum.XMRBAZAAR]: {
      name: "xmrbazaar",
      colorClassName: "text-[#F25C05]",
      iconClassName: "",
      icon: "i-icon-xmrbazaar",
      inputLabel: t("xUsername", { platform: "Xmrbazaar" }),
      linkCreator: (v?: string) => `https://xmrbazaar.com/user/${v}`,
    },
    [ContentLinkPlatformEnum.KICK]: {
      name: "Kick",
      colorClassName: "text-[#53FC19]",
      iconClassName: "",
      icon: "i-tabler-brand-kick",
      inputLabel: t("xUsername", { platform: "Kick" }),
      linkCreator: (v?: string) => `https://kick.com/${v}`,
    },
    [ContentLinkPlatformEnum.KUNO]: {
      name: "Kuno",
      colorClassName: "text-[#FF6600]",
      iconClassName: "",
      icon: "i-icon-kuno",
      inputLabel: t("kunoFundraiser"),
      linkCreator: (v?: string) => `https://kuno.anne.media/fundraiser/${v}`,
    },
    [ContentLinkPlatformEnum.PEERTUBE]: {
      name: "Peertube",
      colorClassName: "",
      iconClassName: "",
      icon: "i-icon-peertube",
      inputLabel: "Peertube link (enter full URL)",
      linkCreator: (v?: string) => `${v}`,
    },
    [ContentLinkPlatformEnum.UPSCROLLED]: {
      name: "Upscrolled",
      colorClassName: "text-[#000000]",
      iconClassName: "",
      icon: "i-icon-upscrolled",
      inputLabel: "Upscrolled link (enter full URL)",
      linkCreator: (v?: string) => `${v}`,
    },
    [ContentLinkPlatformEnum.BITCHUTE]: {
      name: "Bitchute",
      colorClassName: "text-[#FF6600]",
      iconClassName: "",
      icon: "i-icon-bitchute",
      inputLabel: "Bitchute link (enter full URL)",
      linkCreator: (v?: string) => `${v}`,
    },
    [ContentLinkPlatformEnum.PATREON]: {
      name: "Patreon",
      colorClassName: "text-[#FF424D]",
      iconClassName: "max-w-5 max-h-5",
      icon: "i-tabler-brand-patreon",
      inputLabel: "Patreon link (enter full URL)",
      linkCreator: (v?: string) => `${v}`,
    },
    [ContentLinkPlatformEnum.SUBSCRIBESTAR]: {
      name: "SubscribeStar",
      colorClassName: "text-[#6E3BCE]",
      iconClassName: "",
      icon: "i-icon-subscribestar",
      inputLabel: "SubscribeStar link (enter full URL)",
      linkCreator: (v?: string) => `${v}`,
    },
  };
  const getContentLink = (v: ContentLinkPlatformEnum) => {
    return CONTENT_LINKS[v];
  };

  const fiats = computed(() => {
    return {
      [FiatEnum.USD]: {
        code: FiatEnum.USD,
        name: "USD",
        symbol: "US$",
      },
      [FiatEnum.EUR]: {
        code: FiatEnum.EUR,
        name: "EUR",
        symbol: "€",
      },
      [FiatEnum.MXN]: {
        code: FiatEnum.MXN,
        name: "MXN",
        symbol: "MXN$",
      },
    };
  });

  const getFiat = (v: FiatEnum) => fiats.value[v];

  const NOTIFICATION_CHANNELS = {
    [NotificationChannelEnum.EMAIL]: {
      name: t("email"),
      description: t("receiveNotifsViaEmail"),
      icon: "i-heroicons-envelope",
    },
    [NotificationChannelEnum.SIMPLEX]: {
      name: "SimpleX",
      description: t("receiveNotifsViaSimplex"),
      icon: "i-icon-simplex",
    },
    [NotificationChannelEnum.SIGNAL]: {
      name: "Signal",
      description: t("receiveNotifsViaSignal"),
      icon: "i-icon-signal",
    },
  };

  const getNotificationChannel = (v: NotificationChannelEnum) => {
    return NOTIFICATION_CHANNELS[v];
  };

  const NOTIFICATION_TYPES = {
    [NotificationPreferenceType.NEW_TIP]: {
      name: t("newTip"),
      description: t("receiveNotifsWhenTipReceived"),
      icon: "i-heroicons-sparkles",
    },
    [NotificationPreferenceType.DAILY_SUMMARY]: {
      name: t("dailySummary"),
      description: t("receiveDailySummary"),
      icon: "i-heroicons-sparkles",
    },
    [NotificationPreferenceType.SUPER_DM]: {
      name: "SuperDM",
      description:
        "Receive notifications when a SuperDM arrives or new messages are sent.",
      icon: "i-heroicons-chat-bubble-left-right",
    },
  };

  const getNotificationType = (v: NotificationPreferenceType) => {
    return NOTIFICATION_TYPES[v];
  };

  const INTEGRATION_CONFIG_TYPES: Record<
    IntegrationConfigType,
    {
      name: string;
      image?: string;
      description?: string;
      tags?: string[];
      link?: { label?: string; url?: string };
    }
  > = {
    [IntegrationConfigType.SIGNAL]: {
      name: "Signal",
      tags: [],
      image: "i-icon-signal",
      description: t(`signalDescription`),
      link: {
        label: "signal.org",
        url: "https://signal.org/",
      },
    },
    [IntegrationConfigType.TELEGRAM]: {
      name: "Telegram",
    },
    [IntegrationConfigType.SIMPLEX]: {
      name: "SimpleX",
      image: "i-icon-simplex",
      description: t("simplexDescription"),
      tags: [],
      link: {
        label: "simplex.chat",
        url: "https://simplex.chat/",
      },
    },
  };

  const getIntegrationConfigType = (v: IntegrationConfigType) => {
    return INTEGRATION_CONFIG_TYPES[v];
  };

  const LIVE_STREAM_PLATFORMS = {
    [LiveStreamPlatformEnum.YOUTUBE]: {
      name: "YouTube",
      icon: "i-tabler-brand-youtube",
      colorClassName: "text-[#FF0000]",
    },
    [LiveStreamPlatformEnum.TWITCH]: {
      name: "Twitch",
      icon: "i-tabler-brand-twitch",
      colorClassName: "text-[#6441a5]",
    },
    [LiveStreamPlatformEnum.X]: {
      name: "X",
      icon: "i-tabler-brand-x",
      colorClassName: "",
    },
    [LiveStreamPlatformEnum.RUMBLE]: {
      name: "Rumble",
      icon: "i-tabler-brand-rumble",
      colorClassName: "text-[#85c742]",
    },
  };

  const getLiveStreamPlatform = (v?: LiveStreamPlatformEnum) => {
    if (!v) return null;
    return LIVE_STREAM_PLATFORMS[v];
  };

  const getPageTierColorsList = () => {
    return Object.values(PAGE_TIER_COLORS);
  };

  const getPageTierColor = (v?: string) => {
    if (!v) return null;
    return PAGE_TIER_COLORS[v];
  };

  const NETWORK_CONFIGS: Record<
    MoneroNetworkTypeEnum,
    { type: MoneroNetworkTypeEnum; validationCharacters: string[] }
  > = {
    [MoneroNetworkTypeEnum.MAINNET]: {
      type: MoneroNetworkTypeEnum.MAINNET,
      validationCharacters: ["4"],
    },
    [MoneroNetworkTypeEnum.TESTNET]: {
      type: MoneroNetworkTypeEnum.TESTNET,
      validationCharacters: ["9", "A"],
    },
    [MoneroNetworkTypeEnum.STAGENET]: {
      type: MoneroNetworkTypeEnum.STAGENET,
      validationCharacters: ["5"],
    },
    [MoneroNetworkTypeEnum.STRESSNET]: {
      type: MoneroNetworkTypeEnum.STRESSNET,
      validationCharacters: ["9", "A"],
    },
  };

  const getNetworkConfig = (v: MoneroNetworkTypeEnum) => {
    return NETWORK_CONFIGS[v];
  };

  return {
    getContentLink,
    CONTENT_LINKS,
    fiats,
    getFiat,
    NOTIFICATION_CHANNELS,
    getNotificationChannel,
    NOTIFICATION_TYPES,
    getNotificationType,
    INTEGRATION_CONFIG_TYPES,
    getIntegrationConfigType,
    LIVE_STREAM_PLATFORMS,
    getLiveStreamPlatform,
    getPageTierColorsList,
    getPageTierColor,
    NETWORK_CONFIGS,
    getNetworkConfig,
  };
};
