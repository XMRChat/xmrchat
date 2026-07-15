import type {
  ContentLinkPlatformEnum,
  FiatEnum,
  IntegrationConfigType,
  NotificationChannelEnum,
  NotificationPreferenceType,
  PageSettingKey,
  PageStatusEnum,
  PageRecipientVariant,
  RolesEnum,
  SwapStatusEnum,
  TipDisplayMode,
  LiveStreamPlatformEnum,
  CohostInvitationStatusEnum,
  SuperDmMessageSenderTypeEnum,
} from "./enums";

export type Numberic = string | number;

export interface LoginResponse {
  access_token: string;
}

export interface MeResponse {
  user?: User;
  page?: StreamerPage;
}

export interface User {
  username: string;
  email: string;
  id: string;
  roles: RolesEnum[];
  language?: string;
  cohostPage?: StreamerPage;
}

export interface CreateFormFields {
  logo?: Numberic;
  coverImage?: Numberic;
  primaryAddress?: string;
  secretViewKey?: string;
  path?: string;
  tiers?: TipTierField[];
  twitchChannel?: string;
  minTipAmount?: string;
  isPublic?: boolean;
  tipDisplayMode?: TipDisplayMode;
  messageTipDisplayMode?: TipDisplayMode;
  fiat?: FiatEnum;
  expirationMinutes?: number;
  bio?: string;
  name?: string;
  searchTerms?: string;
}

export interface TipFormFields {
  private?: boolean;
  name?: string;
  message?: string;
  amount?: any;
}

export interface SlugReservationResponse {
  paymentAddress: string;
  amount: number;
  reservedUntil: number;
}

export interface TipRecipient extends PageRecipient {
  amount: number | string;
}

export interface PageRecipientShare extends PageRecipient {
  amount: number | string;
}

export interface TipCreationResponse {
  amount: string;
  id: number;
  paymentAddress: string;
  tip: Tip;
  swap?: Swap;

  recipients: TipRecipient[];
  url?: string;
}

export interface StreamerPage {
  userId: string;
  id: string;
  name: string;
  path: string;
  logo: UploadedFile;
  coverImage: UploadedFile;
  adult: boolean;
  primaryAddress?: string;
  secretViewKey?: string;
  tiers?: TipTier[];
  twitchChannel?: string;
  minTipAmount?: string;
  isPublic: boolean;
  isPremium?: boolean;
  tipDisplayMode?: TipDisplayMode;
  messageTipDisplayMode?: TipDisplayMode;
  fiat?: FiatEnum;
  links?: ContentLink[];
  user?: User;
  totalTips?: number;
  tipsCount?: number;
  status?: PageStatusEnum;
  expirationMinutes?: number;
  liveStreams?: LiveStream[];
  pageTipTiers?: PageTipTier[];
  ability?: any;
  bio?: string;
  searchTerms?: string;
}

interface TipPayment {
  amount: string;
  id: number;
  paidAmount: string;
}

export interface Payment extends TipPayment {}

export interface Tip {
  id: number;
  pageId: string;
  name: string;
  message: string;
  private?: boolean;
  paidAt?: string;
  payment?: TipPayment;
  expiresAt?: string;
  swap?: Swap;
  createdAt?: string;
  pageTipTier?: PageTipTier;
  tipReplies?: TipReply[];
}

export interface TipTier {
  amount: string;
  name?: string;
  description?: string;
  id: string;
}

export interface TipReply {
  id: number;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TipTierField {
  name?: string;
  description?: string;
  amount?: string;
}

export interface PaymentSocketMessage {
  paidAt: Date;
  amount: string;
  paidAmount: string;
}

export interface TipEventData {
  paidAt: Date;
  amount: string;
  paidAmount: string;
}

export interface ObsTipSocketEvent {
  tip?: Tip;
  message: string;
  autoRemove: boolean;
}

export interface UploadedFile {
  filename: string;
  originalName: string;
  type: UploadedFile;
  url: string;
  thumbnail?: string;
  id: number;
}

export interface PageSetting {
  key: PageSettingKey;
  value?: any;
  category: string;
  data?: any;
}

export interface PageSettingField {
  key: PageSettingKey;
  value?: any;
}

export interface ContentLink {
  platform: ContentLinkPlatformEnum;
  value: string;
  verification?: LinkVerification;
}

export interface LinkVerification {
  id: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentLinkFull {
  name: string;
  colorClassName?: string;
  iconClassName?: string;
  icon: string;
  inputLabel: string;
  linkCreator?: (v?: string) => string | undefined;
  verify?: boolean;
}

export interface Coin {
  id: number;
  name: string;
  ticker: string;
  network: string;
  image: string;
  minimum: number;
  maximum: number;
}

export interface Swap {
  id: number;
  platform: string;
  swapId: string;
  inputAmount: string;
  swapAddress: string;
  status: SwapStatusEnum;
  coin: Coin;
  eta: number;
  statusMessage: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConfirmModalState {
  title?: string;
  text?: string;
  color?: string;
  onConfirm?: () => unknown;
  onDismiss?: () => unknown;
  active?: boolean;
}

export interface Prices {
  usd?: number;
  mxn?: number;
  eur?: number;
}

export interface NotificationPreference {
  type: NotificationPreferenceType;
  channel: NotificationChannelEnum;
  enabled: boolean;
}

export interface IntegrationConfig {
  type: IntegrationConfigType;
  method: string;
  config: any;
  verified: boolean;
}

export interface PageRecipient {
  name?: string;
  address?: string;
  percentage?: Numberic;
  variant?: PageRecipientVariant;
}

export interface LiveStream {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  channelId?: string;
  channelName?: string;
  viewerCount?: number;
  startedAt?: string;
  platform?: LiveStreamPlatformEnum;
  page?: StreamerPage;
  videoId?: string;
  embedUrl?: string;
}

export interface CohostInvitation {
  id: number;
  user: User;
  page: StreamerPage;
  status: CohostInvitationStatusEnum;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageTipTier {
  id: number;
  name: string;
  description?: string;
  minAmount?: number;
  messageLength?: number;
  color?: string;
  sound?: UploadedFile;
}

export interface SuperDmMessage {
  id: number;
  senderType: SuperDmMessageSenderTypeEnum;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface SuperDm {
  id: string;
  name: string;
  amount: number;
  paymentAddress: string;
  publicKey: string;
  swap?: Swap;
  payment?: Payment;
  createdAt: string;
  expiresAt?: string;
  messages?: SuperDmMessage[];
  endedAt?: string;
  endedByType?: SuperDmMessageSenderTypeEnum;
}

export interface SuperDmResponse {
  id: string;
  amount: string;
  paymentAddress: string;
  superDm: SuperDm;
  swap: Swap;
  recipients: PageRecipientShare[];
  url: string;
}

export interface SuperDmContentData {
  created: SuperDmResponse;
  keys: GeneratedKeys;
}

export interface BasePaymentData {
  amount?: string;
  paymentAddress?: string;
  recipients?: PageRecipientShare[];
  url?: string;
  expiresAt?: string;
  swap?: Swap;
}

export interface GeneratedKeys {
  mnemonic: string;
  privateKeyArmored: string;
  publicKeyArmored: string;
}

export interface SavedViewerSuperDmKeys extends GeneratedKeys {
  superDmId: string;
}

export interface TipReplySettings {
  backgroundColor?: string;
  textColor?: string;
}

export interface TipGoal {
  id: number;
  name: string;
  amount: string;
  startTime: string;
  endTime?: string;
  description?: string;
  isActive: boolean;
}
