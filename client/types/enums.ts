export enum UploadSlug {
  PAGE_LOGO = "page-logo",
  OBS_SOUND = "obs-sound",
}

export enum PageSettingKey {
  TWITCH_CHANNEL = "twitch-channel",
  OBS_KEEP_MESSAGES = "obs-keep-messages",
  OBS_PLAY_SOUND = "obs-play-sound",
  OBS_AUTO_SHOW_TIPS = "obs-auto-show-tips",
  OBS_SOUND = "obs-sound",

  SUPER_DM_MIN_AMOUNT = "super-dm-min-amount",
  SUPER_DM_PUBLIC_KEY = "super-dm-public-key",
  SUPER_DM_ACTIVE = "super-dm-active",

  TELEGRAM_USER_ID = "telegram-user-id",
  TELEGRAM_PAID_CONTENT_ID = "telegram-paid-content-id",

  TIP_REPLY_BACKGROUND_COLOR = "tip-reply-background-color",
  TIP_REPLY_TEXT_COLOR = "tip-reply-text-color",
}

export enum ContentLinkPlatformEnum {
  X = "x",
  WEBSITE = "website",
  NOSTR = "nostr",
  YOUTUBE = "youtube",
  PODCAST_RSS = "podcast-rss",
  RUMBLE = "rumble",
  SUBSTACK = "substack",
  TWITCH = "twitch",
  TELEGRAM = "telegram",
  TIKTOK = "tiktok",
  INSTAGRAM = "instagram",
  ODYSEE = "odysee",
  XMRBAZAAR = "xmrbazaar",
  KICK = "kick",
  KUNO = "kuno",
  PEERTUBE = "peertube",
  UPSCROLLED = "upscrolled",
  BITCHUTE = "bitchute",
  DISCORD = "discord",
  PATREON = "patreon",
  SUBSCRIBESTAR = "subscribestar",
  GITHUB = "github",
  GITLAB = "gitlab",
  MATRIX = "matrix",
  MONERO_JOBS = "monero-jobs",
  FACEBOOK = "facebook",
}

export enum TipDisplayMode {
  XMR = "xmr",
  FIAT = "fiat",
}

export enum FiatEnum {
  USD = "usd",
  EUR = "eur",
  MXN = "mxn",
}

export enum SwapStatusEnum {
  WAITING = "waiting",
  CONFIRMING = "confirming",
  SENDING = "sending",
  FINISHED = "finished",

  FAILED = "failed",
  EXPIRED = "expired",
}

export enum RolesEnum {
  ADMIN = "admin",
  STREAMER = "streamer",
  COHOST = "cohost",
}

export enum PageStatusEnum {
  ACTIVE = "active",
  DEACTIVE = "deactive",
}

export enum NotificationPreferenceType {
  NEW_TIP = "new_tip",
  DAILY_SUMMARY = "daily_summary",
  SUPER_DM = "super_dm",
}

export enum NotificationChannelEnum {
  EMAIL = "email",
  // WEBHOOK = "webhook",
  // TELEGRAM = "telegram",
  SIMPLEX = "simplex",
  SIGNAL = "signal",
}

export enum IntegrationConfigType {
  SIGNAL = "signal",
  TELEGRAM = "telegram",
  SIMPLEX = "simplex",
}

export enum PageRecipientVariant {
  RECIPIENT = "recipient",
  PAGE = "page",
  XMRCHAT = "xmrchat",
}

export enum LiveStreamPlatformEnum {
  YOUTUBE = "youtube",
  TWITCH = "twitch",
  KICK = "kick",
  X = "x",
  RUMBLE = "rumble",
  PEERTUBE = "peertube",
}

export enum CohostInvitationStatusEnum {
  PENDING = "pending",
  ACCEPTED = "accepted",
  EXPIRED = "expired",
}

export enum SuperDmMessageSenderTypeEnum {
  CREATOR = "creator",
  VIEWER = "viewer",
}

export enum MoneroNetworkTypeEnum {
  MAINNET = "mainnet",
  TESTNET = "testnet",
  STAGENET = "stagenet",
  STRESSNET = "stressnet",
}
