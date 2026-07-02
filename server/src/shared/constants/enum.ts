export enum UserTokenType {
  EMAIL_VERIFICATION = 'email-verification',
  RESET_PASSWORD = 'reset-password',
}

export enum FileType {
  PAGE_LOGO = 'page-logo',
  PAGE_BANNER = 'page-banner',
  OBS_SOUND = 'obs-sound',
}

export enum MinioBucket {
  MEDIA = 'media',
  IMAGES = 'images',
  THUMBNAILS = 'thumbnails',
}

export enum PageSettingCategory {
  OBS = 'obs',
  STREAMING = 'streaming',
  NOTIFICATIONS = 'notifications',
  SUPER_DM = 'super-dm',
  PAID_CONTENT = 'paid-content',
  TIP_REPLIES = 'tip-replies',
}

export enum PageSettingKey {
  TWITCH_CHANNEL = 'twitch-channel',
  OBS_KEEP_MESSAGES = 'obs-keep-messages',
  OBS_PLAY_SOUND = 'obs-play-sound',
  OBS_AUTO_SHOW_TIPS = 'obs-auto-show-tips',
  OBS_SOUND = 'obs-sound',
  MIN_NOTIFICATION_THRESHOLD = 'min-notification-threshold',
  DAILY_SUMMARY_NOTIFICATION_TIME = 'daily-summary-notification-time',
  SUPER_DM_MIN_AMOUNT = 'super-dm-min-amount',
  SUPER_DM_PUBLIC_KEY = 'super-dm-public-key',
  SUPER_DM_ACTIVE = 'super-dm-active',
  TELEGRAM_USER_ID = 'telegram-user-id',
  TELEGRAM_PAID_CONTENT_ID = 'telegram-paid-content-id',
  TIP_REPLY_BACKGROUND_COLOR = 'tip-reply-background-color',
  TIP_REPLY_TEXT_COLOR = 'tip-reply-text-color',
}

export enum TipDisplayMode {
  XMR = 'xmr',
  FIAT = 'fiat',
}

export enum FiatEnum {
  USD = 'usd',
  EUR = 'eur',
  MXN = 'mxn',
}

export enum PageSettingValueType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
}

export enum LinkPlatformEnum {
  X = 'x',
  WEBSITE = 'website',
  NOSTR = 'nostr',
  YOUTUBE = 'youtube',
  PODCAST_RSS = 'podcast-rss',
  RUMBLE = 'rumble',
  SUBSTACK = 'substack',
  TWITCH = 'twitch',
  TELEGRAM = 'telegram',
  TIKTOK = 'tiktok',
  INSTAGRAM = 'instagram',
  ODYSEE = 'odysee',
  XMRBAZAAR = 'xmrbazaar',
  KICK = 'kick',
  KUNO = 'kuno',
  PEERTUBE = 'peertube',
  UPSCROLLED = 'upscrolled',
  BITCHUTE = 'bitchute',
  DISCORD = 'discord',
  PATREON = 'patreon',
  SUBSCRIBESTAR = 'subscribestar',
  GITHUB = 'github',
  MONERO_JOBS = 'monero-jobs',
  FACEBOOK = 'facebook',
}

export enum TrocadorStatusEnum {
  WAITING = 'waiting',
  CONFIRMING = 'confirming',
  SENDING = 'sending',
  FINISHED = 'finished',

  FAILED = 'failed',
  EXPIRED = 'expired',
  HALTED = 'halted',
  REFUNDED = 'refunded',
}

export enum SwapStatusEnum {
  WAITING = 'waiting', // Waiting for payment
  CONFIRMING = 'confirming', // Paid and confirming the payment
  SENDING = 'sending',
  FINISHED = 'finished',

  FAILED = 'failed',
  EXPIRED = 'expired', // swap duration expired
}

export enum AuditTypeEnum {
  PAGE_UPDATED = 'page-updated',
}

export enum RolesEnum {
  ADMIN = 'admin',
  STREAMER = 'streamer',
  COHOST = 'cohost',
}

export enum PageStatusEnum {
  ACTIVE = 'active',
  DEACTIVE = 'deactive',
}

export enum IntegrationConfigType {
  SIGNAL = 'signal',
  TELEGRAM = 'telegram',
  SIMPLEX = 'simplex',
}

export enum IntegrationConfigMethod {
  CODE = 'code',
}

export enum NotificationPreferenceType {
  NEW_TIP = 'new_tip',
  DAILY_SUMMARY = 'daily_summary',
  SUPER_DM = 'super_dm',
}

export enum NotificationChannelEnum {
  EMAIL = 'email',
  WEBHOOK = 'webhook',
  TELEGRAM = 'telegram',
  SIGNAL = 'signal',
  SIMPLEX = 'simplex',
}

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
  Receive = 'receive',
  Invite = 'invite',
  SendObsMessage = 'send-obs-message',
  MakeTipPrivate = 'make-tip-private',
  MakeTipPublic = 'make-tip-public',
  SendSuperDmMessage = 'send-super-dm-message',
  ReadSuperDmMessages = 'read-super-dm-messages',
}

export enum PageRecipientVariant {
  PAGE = 'page',
  XMRCHAT = 'xmrchat',
  RECIPIENT = 'recipient',
}

export enum LiveStreamPlatformEnum {
  YOUTUBE = 'youtube',
  TWITCH = 'twitch',
  X = 'x',
  RUMBLE = 'rumble',
}

export enum CohostInvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  EXPIRED = 'expired',
}

export enum SuperDmMessageSenderType {
  CREATOR = 'creator',
  VIEWER = 'viewer',
}

export enum PageVerificationTypeEnum {
  X = 'x',
}
