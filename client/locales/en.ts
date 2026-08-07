export default {
  validations: {
    required: "Field is required",
    email: "Email is invalid",
    numberic: "Should be a number",
    minLength: "Should be at least {length} characters.",
    maxLength: "Should not be more than {length} characters.",
    minValue: "Should be at least {value}.",
    maxValue: "Should be less than or equal to {value}.",
    sameAs: "Should be same as {otherName}",
    someFieldsAreIncorrect: "Some of the fields are not filled correctly.",
    url: "The link is invalid.",
    notUrl: "Should not be a link.",
    streamerSlug:
      "Your path can only contain lowercase letters, numbers, underscores, and hyphens.",
    moneroPrimaryAddress:
      "Primary address is invalid. It should start with {characters}.",
  },

  account: "Account",
  logout: "Logout",
  login: "Login",
  send: "Send",
  email: "Email",
  search: "Search",
  password: "Password",
  confirm: "Confirm",
  reconnect: "Reconnect",
  confirmPassword: "Confirm Password",
  signupInstead: "Signup Instead",
  signupFailed: "Signup Failed",
  noItems: "No Items",
  signupSuccessfull: "Signup Successfull",
  signupSuccessfullDescription:
    "Please follow the link sent to your email to verify your account.",
  loginInstead: "Login Instead",
  loginFailed: "Login Failed",
  signup: "Signup",
  forgetPassword: "Forget Password ?",
  loginDescription:
    "Login to your account in order to access your display page.",
  resetPassword: "Reset Password",
  enterYourNewPassword: "Enter your new password",
  passwordResetFailed: "Password Reset Failed",
  passwordUpdated: "Your password has been successfully updated.",
  weSentYouAnEmail:
    "We have sent you an email {email}, please follow the link in the email to reset your password.",
  changeEmail: "Change Email",
  enterEmailToResetPassword: "Enter your email to reset your password.",
  creatorLogin: "Creator Login",
  goToHomePage: "Go To Home Page",
  searchCreators: {
    title: "Search Creators",
    description: "Search creators with public pages on XMRChat.",
  },
  typePageName: "Type page name...",
  contactUs: "Contact Us",
  here: "here",
  backToHome: "Back to Home",
  somethingWentWrong: "Something went wrong!",

  xmrchat: "XMRChat",
  heroDescription: "Tip your favorite streamer in cryptocurrency.",
  findCreators: "Find Creators",
  creatorsStartHere: "Creators Start Here",

  FAQ: {
    title: "FAQ",
    whyTipWithXMRChat: "Why tip with XMRChat?",
    howToUseXMRChat: "How to use XMRChat?",
    whyUseMonero: "Why does XMRChat use Monero?",
    whereToGetMonero: "Where to get Monero?",
  },

  earnMore: {
    title: "Earn More",
    description:
      "YouTube charges 30-50% for Superchats. Rumble 20% for Rants. With XMRChat you receive 100% of your XMR tips from fans, directly to your Monero wallet.",
  },
  censorshipResistant: {
    title: "Censorship Resistant",
    description:
      "Accepting Monero tips allows you to have an income that is not directly connected to big tech and arbitrary policy violations.",
  },
  corruptionResistant: {
    title: "Corruption Resistant",
    description:
      "Many regimes seize or freeze bank accounts of political enemies. Monero allows you to be your own bank with complete control of your finances.",
  },
  private: {
    title: "Private",
    description:
      "Viewers can tip anonymously, no worries from employers or others knowing your donations.",
  },
  quickAndEasy: {
    title: "Quick And Easy",
    description:
      "No need for viewers to create an account, verify their email, or enter credit card info. Fans go to your tip page, type their name, message, amount, and submit their XMR tip.",
  },
  openSource: {
    title: "Open Source",
    description: "XMRChat is open source. You can review the code {github}.",
  },

  lowFees: {
    title: "Low fees",
    description: "Monero transaction fees are a few pennies at most.",
  },
  privateMonero: {
    title: "Private",
    description:
      "While most crypto uses open ledgers, Monero hides transaction data. Sender, receiver, and transaction amounts are not revealed by looking at the blockchain.",
  },
  accepted: {
    title: "Accepted",
    description:
      "Avoid the hassle of selling your crypto on a centralized exchange. Buy goods and services directly from merchants that accept Monero on {xmrbazaar} and {monerica}.",
  },
  andMore: {
    title: "And more",
    description:
      "Learn more about Monero at {getmonero} and where it's used at {moneroeco}.",
  },
  forContentCreators: {
    title: "For Content Creators",
    description: {
      main: `Click "Creators Start Here" button. Create XMRChat account. Create Tip Page. Let your audience know the URL of your tip page.`,
      tutorialLink:
        "Alex Anarcho has a great tutorial on how to use XMRChat on {youtube}.",
      ifStreamyard: "If you use Streamyard:",
      ifOBS: "If you use OBS:",
      ifLiveJoiner: "If you use LiveJoiner:",
      streamyard: `Go to "Edit tip page" menu item. Make sure you have added your twitch channel username. When starting the stream in Streamyard add Twitch as a destination. XMRChat bot ( xmr-chat on twitch ) will send the tip message on Twitch and you can display it on your screen from Streamyard. Displayed xmrchat bot logo looks best with "Minimal" setting.`,
      obs: `Go to "OBS" menu item. Click on "Copy OBS Page Link". Add a browser source in OBS and paste the link.`,
      liveJoiner:
        "Choose XMRChat from the list of supported platforms, and enter your XMRChat tip page path or URL.",
    },
  },
  forFans: {
    title: "For Fans",
    description:
      "Go to the URL of your content creator's tip page. Type username and message, choose tip amount, then send. A dialog will appear with the tip details. Your xmrchat will be displayed on the streamer's page after the tip is sent.",
  },
  whereToGetMonero: {
    cakeWallet: "Buy or trade other crypto for Monero in {cakeWallet}.",
    stealthex:
      "Trade other crypto for Monero (XMR) at {stealthex} and others at {kycnot}.",
    haveno: "Buy Monero without KYC at {haveno}.",
    kraken: "Buy Monero with KYC at {kraken}.",
    xmrbazaar: "Sell items or services for Monero at {xmrbazaar}.",
    gupax: "Mine it with {gupax}.",
    kunoAnneMedia: "Create a Monero Fundraiser at {kunoAnneMedia}.",
    monerica:
      "Accept Monero at your business and get listed at the {monerica} and {monerodirectory} pages and the business listings map on {xmrbazaar} and {bankexit}.",
  },

  // TIP PAGE
  tipName: "Name",
  tipAmount: "Amount",
  tipMessage: "Message",
  tipPrivate: "Private",
  tipDate: "Date",
  tipUpdated: "Tip updated!",
  tipPrivateTooltip: "Name and message will be only visible to the streamer.",
  tipCoin: "Coin",
  tipCoinPlaceholder: "XMR",
  sendTip: "Send Tip",
  tipCreationFailed: "Tip Creation Failed",
  tipNamePlaceholder: "Enter name",
  tipAmountPlaceholder: "Enter amount",
  tipMessagePlaceholder: "Enter message",
  tipPrivatePlaceholder: "Private",
  tipSwapUnavailable: "Swap is currently unavailable.",
  tipSwapMinimum: "Minimum {min} to swap",
  tipMinimum: "Minimum {min}",
  recentTips: "Recent Tips",
  tipDisplayValueTooltip: "Show tip values in XMR or {fiat}",
  noRecentTips: "No recent tips!",
  pageDeactivatedAlert:
    "Your page has been deactivated and it is not visible to public. Please contact support for more info.",
  tipPrivateMessage: "Private message",
  tipWalletWarningTitle: "Do not tip with streamer wallet.",
  tipWalletWarningDescription:
    "Please avoid sending tips with wallet registered on the page. The change returned inflates the amount we see received.",
  tipWalletMinimum:
    "Please send a minimum {minimumAmount} XMR to the following address for your xmrchat to be displayed.",
  superDmWalletMinimum:
    "Please send a minimum {minimumAmount} XMR to the following address for your SuperDM to be started.",
  partialAmountReceived:
    "{partialAmount} received so far, please send remaining {remainingAmount}.",
  openInMyWallet: "Open in My Wallet",
  cancel: "Cancel",
  copyAddress: "Copy Address",
  waitingForPayment: "Waiting for payment",

  // CONTACT US PAGE
  contactUsDescription: "Contact us for any questions or feedback.",
  contactUsForm: "Contact Us Form",
  contactUsFormDescription: "Contact us for any questions or feedback.",
  contactUsFormButton: "Contact Us",
  emailUsDirectly: "Email us directly",
  followUsOnTwitter: "Follow us on Twitter",
  twitter: "Twitter",

  // CREATE PAGE
  createPage: "Create Page",
  getStartedCreatingPage: "Get started by creating your streamer page",
  home: "Home",
  logo: "Logo",
  logoRatio: "1:1 ratio",
  bannerImage: "Banner image",
  bannerImageBestRatio: "Best to be uploaded in 3:1",
  yourId: "Your id",
  pageSlug: "Page Slug",
  moneroPrmReciveAddress: "Monero primary receive address",
  prmMoneroReciveAdressBegin:
    "Primary Monero receive addresses begin with {characters}.",
  moneroSecretViewKey: "Monero secret view key",
  weNeedSecretViewKey:
    "We need secret view key to be able to view incoming transactions from viewers. {whereToFind}",
  whereToFindViewKey: "Where to find view key?",
  twitchChannelName: "Twitch channel name",
  nameOfYourTwitchChannel:
    "Name of your Twitch channel. Used to display tips on stream via xmr_chat Twitch bot.",
  optional: "Optional",
  minTipAmount: "Min. tip amount ( XMR )",
  tipPageAmountFormat: "Tip page amount format",
  determinesDefaultValue:
    "Determines the default value selected for the amount format on your tip page.",
  messageAmountFormat: "Message amount format",
  determinesAmountInObsAndTwitch:
    "Determines the amount format displayed in OBS and Twitch.",
  publicPage: "Public Page ( Shown on creator search page ).",
  continue: "Continue",
  clickToUpload: "Click to upload",
  pageCreatedSuccessfully: "Page is created successfully!",
  slugReservedUntil: "Your slug is reserved until ",
  note: "Note",
  pageUpdated: "Page updated!",
  loading: "Loading",
  available: "Available",
  unavailable: "Unavailable",
  fiatUnit: "Fiat unit",
  fiatUnitHelp: "Unit to display tips when tip display mode is fiat.",
  tipExpiration: "Tip expiration",
  tipExpirationHelp:
    "Tips will automatically be removed after specified duration.",
  tipExpirationWarning:
    "Changing expiration will delete all xmrchats older than selected duration.",
  disappearsX: "Disappears {time}",
  never: "Never",
  xDays: "{count} Day | {count} Days",
  xMonths: "{count} Month | {count} Months",
  paymentIsExpired:
    "Payment is expired. If you have already sent your payment please contact support.",
  pageReservationExpired: "Page reservation expired.",
  paymentCheckingDis: "Payment checking is disconnected.",
  ifPaymentMade:
    "If payment is already made it will be displayed on tips list.",
  splitPaymentToMultipleRecipients: "Split tip",
  backToSinglePayment: "Back to single recipient",
  recipients: "Recipients",
  bioHelp: "Will appear on tip page and in search results.",

  // STREAMER MENU
  menu: "Menu",
  myXmrchats: "My xmrchats",
  accounts: "Accounts",
  editTipPage: "Edit Tip Page",
  tipPage: "Tip Page",
  contentLinks: "Content Links",
  obs: "OBS",
  show: "Show",
  hide: "Hide",
  youDontHavePage: "You don't have a page yet",
  getStartedByCreatingPage: "Get started by creating a new page for yourself",
  createNewWallet:
    "Please create a new Monero wallet to use with XMRChat. We only need to see transactions that relate to XMRChat messages, and nothing else.",
  createNewPage: "Create New Page",

  // ACCOUNT PAGE
  changePassword: "Change Password",
  updateYourLoginPassword: "Update your login password",
  currentPassword: "Current password",
  newPassword: "New password",
  repeatNewPassword: "Repeat new password",
  contactSupportForEmailChange: "Contact support to change your email address.",

  // EDIT PAGE
  editPage: "Edit Page",
  customizeYourTipPage: "Customize your tip page.",
  errorCreatingUpdatingPage: "Error creating/updating page",
  tipAmountSuggestions: "Tip Amount Suggestions",
  pageWillBeAvailableAt: "Your page will be available at {url}",
  noSuggestedAmountsAdded:
    "There are no suggested amounts added, Click the button bellow to add new tiers.",
  addTier: "Add Tier",
  remove: "Remove",
  name: "Name",
  amountUSD: "Amount ( USD )",
  amountFiat: "Amount ( {fiat} )",

  // CONTENT LINKS
  brandName: "Brand Name",
  brandNameHelp: "Name of the brand/content. It can be different from slug.",
  searchTerms: "Search Terms",
  searchTermsHelp:
    "Creator search will return results based on page slug, name, and keywords in this list.",
  contentLinksDescription: "Name, Search Terms and Content Links",
  contentLinksSecondDescription:
    "Links to your social pages or websites. To reset a value leave the field empty.",
  saveChanges: "Save Changes",
  notUrlWithMessage: "Only enter the name, not the full link.",
  changesAreSaved: "Changes are saved.",
  errorSavingChanges: "Error saving changes.",
  xUsername: "{platform} username",
  websiteLink: "Website link",
  youtubeChannel: "Youtube channel",
  peertubeChannel: "Peertube channel",
  podcastRssLink: "Podcast RSS Link",
  nostrPubKey: "Nostr Pub Key",
  kunoFundraiser: "Kuno fundraiser",
  rumbleLiveStreamApi: "Rumble live stream API",
  rumbleLiveStreamApiHelp:
    "Rumble live stream API from {guide}. XMRChat uses this URL for getting current live streams of your channel.",
  thisGuide: "this guide",

  // OBS
  obsDescription: "OBS widget and settings.",
  settingsAreUpdated: "Settings are updated.",
  errorUpdatingSettings: "Error updating settings",
  toUseXMRchatsOnOBS:
    "To use XMRChat on OBS, copy the link to OBS page and add it on 'Browser' of OBS Sources.",
  copyOBSLink: "Copy OBS Page Link",
  obsPageSettings: "OBS Page Settings",
  preventMessagesFromFading: "Prevent messages from fading",
  preventMessagesFromFadingDescription:
    "When active, keeps the latest tips on the screen, otherwise each message is displayed for 60 seconds.",
  playSound: "Play Sound",
  playSoundDescription:
    "Plays a sound on the OBS page when new tip is received.",
  playSoundDescriptionLocal:
    "If you are testing this functionality locally in your browser, after opening the obs tab make sure to click somewhere on the page. Otherwise browser won't play sound due to not having interactions with the opened tab.",
  autoShowTips: "Auto Show Tips",
  autoShowTipsDescription:
    "If active, tips will be automatically shown on the OBS page for 60 seconds.",

  //  INTEGRATIONS PAGE
  integrations: "Integrations",
  integrationsTitle: "Integrations",
  integrationsDes: "Manage your integrations",
  notConnected: "Not connected.",
  waitingForVerification: "Waiting for verification.",
  connected: "Connected.",
  connect: "Connect",
  disconnect: "Disconnect",
  simplexDescription: "The first messenger without user IDs.",
  simplexIntegration: "Simplex Integration",
  enterYourSimplexLink:
    "Enter your simplex connection link then click connect. XMRChat account will send a connection request to your simplex account. After accepting the request you will get a code. Enter the code to complete the connection.",
  simplexIsConnectedTo: 'Simplex is connected to account "{name}".',
  acceptRequestInSimplex:
    "Accept connection request in SimpleX app and enter the code you get.",
  confirmCode: "Confirm code",
  success: "Success",
  openSimplexAndAccept:
    "Open SimpleX app on your device and accept connection from XMRChat account.",
  error: "Error",
  simplexIsConnected: "Simplex is connected.",
  simplexDisconnected: "Simplex disconnected.",
  simplexLink: "SimpleX link",
  signalDescription:
    'Say "hello" to a different messaging experience. An unexpected focus on privacy, combined with all of the features you expect.',
  signalIsConnected: "Signal is connected.",
  signalIsDisconnected: "Signal is disconnected.",
  signalIntegration: "Signal Integration",
  signalIsConnectedTo: "Signal is connected to account {number}.",
  enterCodeinSignalApp: "Enter the code sent to your signal app.",
  enterSignalNumOrId:
    "Enter your signal phone number or id. We will send a code to this number to verify.",
  signalPhoneNumOrId: "Signal phone number or id",
  sendCode: "Send code",
  code: "Code",

  // NOTIFICATIONS-PREFERENCES PAGE
  notifications: "Notifications",
  manageYourNotifs: "Manage your notifications",
  comingSoon: "Coming Soon",
  featureAvailableSoon: "This feature will be available soon.",
  minNotifsThreshold: "Min Notification Threshold",
  minNotifsThresholdHelp:
    "The minimum amount of XMR tip that will trigger a notification.",
  connectInIntegrations: "Connect in {integrations} to enable.",
  dailySummaryTimeHelp: "Time when daily summary notifications will be sent.",
  notifsPreferencesSaved: "Notification preferences saved.",
  newTip: "New Tip",
  receiveNotifsWhenTipReceived:
    "Receive notifications when a new tip is received",
  dailySummary: "Daily Summary",
  receiveDailySummary: "Receive daily summary of your tips",
  receiveNotifsViaEmail: "Receive notifications via email",
  receiveNotifsViaSimplex: "Receive notifications via SimpleX",
  receiveNotifsViaSignal: "Receive notifications via Signal",

  // HEAD
  head: {
    description:
      "Viewers, send messages and tips with ease and privacy. Streamers, keep nearly all of your tips instead of giving 30-50% to big tech.",
    title: "Message and Tip with Monero",
    XMRChatTip: "XMRChat - Tip {path} with Monero",
    tip: "Tip {path}",
  },
  moneroSuperchats: "Monero Superchats : XMRChat",
  emailVerification: "Email Verification",
  forgotPassword: "Forgot Password",
  signUp: "Sign up",

  // LIVE STREAMS
  liveNow: "Live Now",
  noStreamersLive: "No streamers are live right now.",
  liveOn: "Live on",

  // COHOSTS
  cohost: "Cohost",
  cohostPage: "Cohost Page",
  cohostDes: "Manage {path} xmrchats",
  inviteCohosts: "Invite Cohosts",
  noCohosts: "You don't have any cohosts yet",
  cohostsCanHelpYou: "Cohosts are users who can help you manage your xmrchats.",
  youCanInviteCohosts: "You can invite cohosts using the button bellow.",
  removeYourselfFromCohost:
    "Are you sure you want to remove yourself from the cohost of the page? You should be invited again to be able to cohost the page again.",
  youRemovedFromCohost: "You have been removed from the cohost of the page.",
  removeFromCohost: "Remove from cohost",
  removeCohost: "Remove cohost",
  removeThisCohost: "Are you sure you want to remove this cohost?",
  cohostRemoved: "Cohost removed",
  invitationCancelled: "Invitation cancelled",
  expired: "Expired",
  expires: "expires",
  pending: "pending",

  // TIP TIERS
  tipTiers: "Tip Tiers",
  minAmount: "Min. amount:",
  close: "Close",
  minXMR: "Min. (XMR)",
  color: "Color",
  sound: "Sound",
  wantToDeleteTier: "Are you sure you want to delete this tier?",
  deleteTier: "Delete tier",
  tierDeleted: "Tier deleted",
  createTier: "Create Tier",
  createNewTier: "Create a new tier",
  edit: "Edit",
  delete: "Delete",
  pageTierUpdated: "Page tier updated.",
  pageTierCreated: "Page tier created.",
  minAmountXMR: "Min. amount ( XMR )",
  description: "Description",
  soundOBS: "Sound ( OBS )",
  uploaded: "Uploaded:",
  clear: "Clear",
  save: "Save",
  editTier: "Edit Tier",
  editTierDetails: "Edit the tier details",
  manageYourTipTiers: "Manage your tip tiers",
  messageLength: "Message length:",

  // TIP LIST
  tipList: {
    reply: "Reply:",
    replyToTip: "Reply to tip:",
    private: "Private:",
    obs: "OBS:",
    message: "Message:",
  },
  reply: "Reply",
  replyColors: "Reply colors",
  backgroundColor: "Background color",
  textColor: "Text color",
  repliedMessagePreview: "Replied message preview",
  action: "Action",
  premium: "Premium",
};
