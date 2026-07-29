export default {
  validations: {
    required: "الحقل مطلوب",
    email: "البريد الإلكتروني غير صالح",
    numberic: "يجب أن يكون رقماً",
    minLength: "يجب أن يكون على الأقل {length} حرفاً",
    maxLength: "يجب ألا يتجاوز {length} حرفاً",
    minValue: "يجب أن يكون على الأقل {value}",
    sameAs: "يجب أن يكون مطابقاً لـ {otherName}",
    someFieldsAreIncorrect: "بعض الحقول غير مكتملة بشكل صحيح",
    url: "الرابط غير صالح",
    notUrl: "يجب ألا يكون رابطاً",
    streamerSlug: "يمكن أن يحتوي الرابط على أحرف صغيرة، أرقام، أسطر و أسطورة",
    moneroPrimaryAddress:
      "عنوان الاستلام غير صالح. يجب أن يبدأ بـ {characters}.",
  },

  account: "الحساب",
  logout: "تسجيل الخروج",
  login: "تسجيل الدخول",
  send: "إرسال",
  email: "البريد الإلكتروني",
  search: "بحث",
  password: "كلمة المرور",
  confirm: "تأكيد",
  reconnect: "إعادة الاتصال",
  confirmPassword: "تأكيد كلمة المرور",
  signupInstead: "انشاء حساب جديد",
  signupFailed: "فشل التسجيل",
  noItems: "لا توجد عناصر",
  signupSuccessfull: "تم التسجيل بنجاح",
  signupSuccessfullDescription:
    "يرجى اتباع الرابط المرسل إلى بريدك الإلكتروني للتحقق من حسابك",
  loginInstead: "تسجيل الدخول بدلاً من ذلك",
  loginFailed: "فشل تسجيل الدخول",
  signup: "تسجيل",
  forgetPassword: "نسيت كلمة المرور؟",
  loginDescription: "سجل دخولك إلى حسابك للوصول إلى صفحة العرض الخاصة بك",
  resetPassword: "إعادة تعيين كلمة المرور",
  enterYourNewPassword: "أدخل كلمة المرور الجديدة",
  passwordResetFailed: "فشل إعادة تعيين كلمة المرور",
  passwordUpdated: "تم تحديث كلمة المرور الخاصة بك بنجاح",
  weSentYouAnEmail:
    "لقد أرسلنا إليك بريدًا إلكترونيًا {email}، يرجى اتباع الرابط في البريد الإلكتروني لإعادة تعيين كلمة المرور الخاصة بك",
  changeEmail: "تغيير البريد الإلكتروني",
  enterEmailToResetPassword: "أدخل البريد الإلكتروني لإعادة تعيين كلمة المرور",
  creatorLogin: "تسجيل دخول المبدع",
  goToHomePage: "اذهب إلى الصفحة الرئيسية",
  searchCreators: {
    title: "البحث عن صانعي المحتوى",
    description: "البحث عن صانعي المحتوى (الصفحات العامة) ",
  },
  typePageName: "اكتب اسم الصفحة...",
  contactUs: "اتصل بنا",
  here: "هنا",
  backToHome: "العودة إلى الصفحة الرئيسية",
  somethingWentWrong: "حدث خطأ ما!",

  xmrchat: "XMRChat",
  heroDescription: "تبرّع لصانع المحتوى المفضل لديك بالعملات المشفرة",
  findCreators: "البحث عن صانعي المحتوى",
  creatorsStartHere: "اشترك الآن",

  FAQ: {
    title: "الأسئلة الشائعة",
    whyTipWithXMRChat: "لماذا التبرع باستخدام XMRChat؟",
    howToUseXMRChat: "كيفية استخدام XMRChat؟",
    whyUseMonero: "لماذا يستخدم XMRChat عملة Monero؟",
    whereToGetMonero: "أين يمكن الحصول على Monero؟",
  },

  earnMore: {
    title: "كسب المزيد",
    description:
      "بينما YouTube و Rumble يأخذون نسبة (٢٠٪؜~٥٠٪؜) من التبرعات، يأخذ صانع المحتوى ١٠٠٪؜ من تبرعات XMR من المعجبين، مباشرة الى محفظة Monero الخاص به باستخدام XMRChat",
  },
  censorshipResistant: {
    title: "مقاوم للرقابة",
    description:
      "تقوم العديد من الأنظمة بالاستيلاء على أو تجميد الحسابات المصرفية لأعدائها السياسيين. يتيح لك Monero أن تكون بمثابة مصرفك الخاص، مع تحكم كامل في أموالك.",
  },
  corruptionResistant: {
    title: "مقاوم للفساد",
    description:
      "كثير من الأنظمة تصادر أو تجمد حسابات البنوك للأعداء السياسيين. تتيح لك Monero أن تكون بنكك الخاص مع سيطرة كاملة على أموالك",
  },
  private: {
    title: "خاص",
    description:
      "يمكن للمشاهدين التبرع بشكل مجهول، دون القلق من كشف هويتهم أو الآخرين بتبرعاتهم",
  },
  quickAndEasy: {
    title: "سريع وسهل",
    description:
      "لا حاجة للمشاهد بإنشاء حساب أو التحقق من البريد الإلكتروني أو إدخال معلومات بطاقة الائتمان. فقط التوجه الى صفحة التبرع الخاصة به، و ادخال الاسم و الرسالة و المبلغ و التبرع بعملة XMR",
  },
  openSource: {
    title: "مفتوح المصدر",
    description: "XMRChat مفتوح المصدر. يمكنك مراجعة الكود {github}",
  },

  lowFees: {
    title: "رسوم منخفضة",
    description: "رسوم معاملات Monero لا تتجاوز بضعة سنتات",
  },
  privateMonero: {
    title: "خاص",
    description:
      "بينما تستخدم معظم العملات المشفرة سجلات مفتوحة، تخفي Monero بيانات المعاملات. المرسل والمستلم ومبالغ المعاملات لا يتم الكشف عنها من خلال النظر في سلسلة الكتل",
  },
  accepted: {
    title: "مقبول",
    description:
      "تجنب عناء بيع عملتك المشفرة في منصة مركزية. اشترِ السلع والخدمات مباشرة من التجار الذين يقبلون Monero على {xmrbazaar} و {monerica}",
  },
  andMore: {
    title: "والمزيد",
    description: "تعرف على المزيد عن Monero في {getmonero}",
  },
  forContentCreators: {
    title: "لصانعي المحتوى",
    description: {
      main: `انقر على زر "ابدأ هنا للمبدعين". أنشئ حساب XMRChat. أنشئ صفحة البقشيش. أخبر جمهورك بعنوان URL لصفحة البقشيش الخاصة بك.`,
      tutorialLink:
        "لدى Alex Anarcho برنامج تعليمي رائع حول كيفية استخدام XMRChat على {youtube}.",
      ifStreamyard: "إذا كنت تستخدم Streamyard:",
      ifOBS: "إذا كنت تستخدم OBS:",
      ifLiveJoiner: "إذا كنت تستخدم LiveJoiner:",
      streamyard: `انتقل إلى عنصر القائمة "تعديل صفحة التبرع". تأكد من إضافة اسم مستخدم قناة Twitch الخاصة بك. عند بدء البث في Streamyard، أضف Twitch كوجهة. سيرسل روبوت XMRChat (xmr-chat على Twitch) رسالة التبرع على Twitch ويمكنك عرضها على شاشتك من Streamyard. يبدو شعار روبوت xmrchat أفضل مع إعداد "Minimal".`,
      obs: `انتقل إلى عنصر القائمة "OBS". انقر على "نسخ رابط صفحة OBS". أضف مصدر متصفح في OBS والصق الرابط.`,
      liveJoiner:
        "اختر XMRChat من قائمة المنصات المدعومة، ثم أدخل مسار أو رابط صفحة الإكراميات الخاصة بك على XMRChat.",
    },
  },
  forFans: {
    title: "للمعجبين",
    description:
      "انتقل إلى عنوان URL لصفحة التبرع الخاصة بصانع المحتوى المفضل لديك. أدخل اسم المستخدم والرسالة، اختر مبلغ التبرع، ثم أرسل. ستظهر نافذة منبثقة مع تفاصيل التبرع. سيتم عرض xmrchat الخاص بك على صفحة صانع المحتوى بعد إرسال التبرع.",
  },
  whereToGetMonero: {
    cakeWallet: "اشترِ أو تاجر بعملات مشفرة أخرى مقابل Monero في {cakeWallet}",
    stealthex:
      "تاجر بعملات مشفرة أخرى مقابل Monero (XMR) في {stealthex} وغيرها في {kycnot}",
    haveno: "اشترِ Monero بدون توثيق حساب في {haveno}",
    kraken: "بإمكانك شراء Monero باستخدام حساب موثق في {kraken}",
    xmrbazaar: "بيع و شراء منتجات و خدمات مقابل Monero في {xmrbazaar}",
    gupax: "تعدين Monero من خلال {gupax}",
    kunoAnneMedia: "أنشئ حملة تمويل Monero في {kunoAnneMedia}",
    monerica:
      "اضافة دفع Monero في متجرك يؤهلك لادراج متجرك على خرائط Monero و مجانا على المواقع التالية: {monerica} و {monerodirectory} و {xmrbazaar} و {bankexit}",
  },

  // TIP PAGE
  tipName: "الاسم",
  tipAmount: "المبلغ",
  tipMessage: "الرسالة",
  tipPrivate: "خاص",
  tipDate: "التاريخ",
  tipUpdated: "تم تحديث التبرع!",
  tipPrivateTooltip: "الاسم والرسالة سيكونان مرئيين فقط للمبدع",
  tipCoin: "العملة",
  tipCoinPlaceholder: "XMR",
  sendTip: "إرسال التبرع",
  tipCreationFailed: "فشل إنشاء التبرع",
  tipNamePlaceholder: "أدخل الاسم",
  tipAmountPlaceholder: "أدخل المبلغ",
  tipMessagePlaceholder: "أدخل الرسالة",
  tipPrivatePlaceholder: "خاص",
  tipSwapUnavailable: "التبادل غير متوفر حالياً",
  tipSwapMinimum: "الحد الأدنى للتبادل {min}",
  tipMinimum: "الحد الأدنى {min}",
  recentTips: "التبرعات الأخيرة",
  tipDisplayValueTooltip: "عرض قيم التبرعات بـ XMR أو {fiat}",
  noRecentTips: "لا توجد تبرعات حديثة!",
  pageDeactivatedAlert:
    "تم تعطيل صفحتك وهي غير مرئية للعامة. يرجى الاتصال بالدعم لمزيد من المعلومات",
  tipPrivateMessage: "رسالة خاصة",
  tipWalletWarningTitle: "لا تبرع بمحفظة المبدع",
  tipWalletWarningDescription:
    "يرجى تجنب إرسال التبرعات باستخدام المحفظة المسجلة على الصفحة. التغيير المعاد يزيد من المبلغ الذي نراه مستلم",
  tipWalletMinimum:
    "يرجى إرسال ما لا يقل عن {minimumAmount} XMR إلى العنوان التالي ليتم عرض xmrchat الخاص بك",
  partialAmountReceived:
    "تم استلام {partialAmount} حتى الآن، يرجى إرسال المتبقي {remainingAmount}.",
  openInMyWallet: "فتح في محفظتي",
  cancel: "إلغاء",
  copyAddress: "نسخ العنوان",
  waitingForPayment: "في انتظار الدفع",

  // CONTACT US PAGE
  contactUsDescription: "اتصل بنا لأي أسئلة أو ملاحظات",
  contactUsForm: "نموذج الاتصال بنا",
  contactUsFormDescription: "اتصل بنا لأي أسئلة أو ملاحظات",
  contactUsFormButton: "اتصل بنا",
  emailUsDirectly: "راسلنا مباشرة",
  followUsOnTwitter: "تابعنا على تويتر",
  twitter: "تويتر",

  // CREATE PAGE
  createPage: "إنشاء صفحة",
  getStartedCreatingPage: "ابدأ بإنشاء صفحة المبدع الخاصة بك",
  home: "الرئيسية",
  logo: "صورة ملف شخصي",
  logoRatio: "نسبة 1:1",
  bannerImage: "صورة غلاف",
  bannerImageBestRatio: "من الأفضل رفعها بنسبة 3:1",
  yourId: "اضافة رابط الصفحة",
  pageSlug: "رابط الصفحة",
  moneroPrmReciveAddress: "عنوان استلام Monero الرئيسي",
  prmMoneroReciveAdressBegin:
    "تبدأ عناوين استلام Monero الرئيسية بـ {characters}.",
  moneroSecretViewKey: "مفتاح عرض Monero السري",
  weNeedSecretViewKey:
    "نحتاج إلى مفتاح العرض السري لنتمكن من عرض المعاملات الواردة من المشاهدين. {whereToFind}",
  whereToFindViewKey: "أين يمكن العثور على مفتاح العرض؟",
  twitchChannelName: "اسم قناة Twitch",
  nameOfYourTwitchChannel:
    "اسم قناة Twitch الخاصة بك. يستخدم لعرض التبرعات على البث عبر روبوت Twitch xmr_chat",
  optional: "اختياري",
  tipPageAmountFormat: "تنسيق مبلغ صفحة الإكرامية",
  determinesDefaultValue:
    "يحدد القيمة الافتراضية المحددة لتنسيق المبلغ في صفحة الإكرامية الخاصة بك.",
  messageAmountFormat: "تنسيق مبلغ الرسالة",
  determinesAmountInObsAndTwitch: "يحدد تنسيق المبلغ المعروض في OBS وTwitch.",
  publicPage: "صفحة عامة (تظهر في صفحة البحث عن صانعي المحتوى)",
  continue: "متابعة",
  clickToUpload: "انقر للرفع",
  pageCreatedSuccessfully: "تم إنشاء الصفحة بنجاح!",
  slugReservedUntil: "تم حجز الرابط الخاص بك حتى",
  note: "ملاحظة",
  pageUpdated: "تم تحديث الصفحة!",
  loading: "جاري التحميل",
  available: "متاح",
  unavailable: "غير متاح",
  fiatUnit: "وحدة العملة",
  fiatUnitHelp:
    "وحدة العملة المستخدمة لعرض التبرعات عندما يكون جدول التبرعات في العملة",
  never: "أبدًا",
  tipExpiration: "انتهاء صلاحية الإكرامية",
  tipExpirationHelp: "ستُحذف الإكراميات تلقائيًا بعد المدة المحددة",
  tipExpirationWarning:
    "سيؤدي تغيير تاريخ انتهاء الصلاحية إلى حذف جميع محادثات xmr الأقدم من المدة المحددة",
  xDays: "{count} أيام | {count} يوم",
  xMonths: "{count} شهور | {count} شهر",
  paymentIsExpired:
    "انتهت صلاحية الدفع. إذا كنت قد أتممت الدفع بالفعل، يرجى التواصل مع الدعم.",
  pageReservationExpired: "انتهت صلاحية حجز الصفحة.",
  paymentCheckingDis: "تم فصل التحقق من الدفع.",
  ifPaymentMade: "إذا تم الدفع بالفعل، فسيتم عرضه في قائمة النصائح.",
  bioHelp: "سيظهر في صفحة الإكراميات وفي نتائج البحث.",

  // STREAMER MENU
  menu: "القائمة",
  myXmrchats: "xmrchats الخاصة بي",
  editTipPage: "تعديل صفحة التبرع",
  accounts: "الحسابات",
  tipPage: "صفحة التبرع",
  contentLinks: "روابط المحتوى",
  obs: "OBS",
  show: "ظهر",
  hide: "غير مرئي",
  youDontHavePage: "ليس لديك صفحة بعد",
  getStartedByCreatingPage: "ابدأ بإنشاء صفحة صانع المحتوى",
  createNewPage: "إنشاء صفحة جديدة",

  // ACCOUNT PAGE
  changePassword: "تغيير كلمة المرور",
  updateYourLoginPassword: "تحديث كلمة مرور تسجيل الدخول",
  currentPassword: "كلمة المرور الحالية",
  newPassword: "كلمة المرور الجديدة",
  repeatNewPassword: "تكرار كلمة المرور الجديدة",
  contactSupportForEmailChange:
    "اتصل بالدعم لتغيير عنوان البريد الإلكتروني الخاص بك",

  // EDIT PAGE
  editPage: "تعديل الصفحة",
  customizeYourTipPage: "تخصيص صفحة التبرع الخاصة بك",
  errorCreatingUpdatingPage: "خطأ في إنشاء/تحديث الصفحة",
  tipAmountSuggestions: "اقتراحات مبلغ التبرع",
  pageWillBeAvailableAt: "ستكون صفحتك متاحة في {url}",
  noSuggestedAmountsAdded:
    "لم تتم إضافة مبالغ مقترحة، انقر على الزر أدناه لإضافة مستويات جديدة",
  addTier: "إضافة مستوى",
  remove: "إزالة",
  name: "الاسم",
  amountUSD: "المبلغ (USD)",
  amountFiat: "المبلغ ( {fiat} )",

  // CONTENT LINKS
  brandName: "اسم العلامة التجارية",
  brandNameHelp: "اسم العلامة التجارية/المحتوى. يمكن أن يكون مختلفاً عن الرابط",
  searchTerms: "مصطلحات البحث",
  searchTermsHelp:
    "سيُرجع بحث المبدع نتائج بناءً على رابط الصفحة والاسم والكلمات الرئيسية في هذه القائمة",
  contentLinksDescription: "الاسم ومصطلحات البحث وروابط المحتوى",
  contentLinksSecondDescription:
    "روابط لصفحاتك الاجتماعية أو مواقع الويب. لإعادة تعيين قيمة، اترك الحقل فارغاً",
  saveChanges: "حفظ التغييرات",
  notUrlWithMessage: "أدخل الاسم فقط، وليس الرابط الكامل",
  changesAreSaved: "تم حفظ التغييرات",
  errorSavingChanges: "خطأ في حفظ التغييرات",
  xUsername: "{platform} اسم المستخدم",
  websiteLink: "رابط الموقع",
  youtubeChannel: "قناة Youtube",
  podcastRssLink: "رابط RSS البودكاست",
  nostrPubKey: "مفتاح Nostr",
  rumbleLiveStreamApi: "واجهة برمجة تطبيقات البث المباشر لـ Rumble",
  rumbleLiveStreamApiHelp:
    "واجهة برمجة تطبيقات البث المباشر لـ Rumble من {guide}. يستخدم XMRChat هذا الرابط للحصول على البثوث المباشرة الحالية لقناتك.",
  thisGuide: "هذا الدليل",

  // OBS
  obsDescription: "إعدادات وأدوات OBS",
  settingsAreUpdated: "تم تحديث الإعدادات",
  errorUpdatingSettings: "خطأ في تحديث الإعدادات",
  toUseXMRchatsOnOBS:
    "لاستخدام XMRChat على OBS، انسخ الرابط إلى صفحة OBS وأضفه في 'المتصفح' في مصادر OBS",
  copyOBSLink: "نسخ رابط صفحة OBS",
  obsPageSettings: "إعدادات صفحة OBS",
  preventMessagesFromFading: "منع اختفاء الرسائل",
  preventMessagesFromFadingDescription:
    "عند التفعيل، يحتفظ بأحدث التبرعات على الشاشة، وإلا فإن كل رسالة تظهر لمدة 60 ثانية",
  playSound: "تشغيل الصوت",
  playSoundDescription: "يتم تشغيل صوت في صفحة OBS عند ظهور تبرع جديد",
  playSoundDescriptionLocal:
    "إذا كنت تختبر هذه الوظيفة محلياً في متصفحك، بعد فتح علامة التبويب obs تأكد من النقر في مكان ما على الصفحة. وإلا فلن يقوم المتصفح بتشغيل الصوت بسبب عدم وجود تفاعلات مع علامة التبويب المفتوحة",
  autoShowTips: "إظهار التبرعات تلقائياً",
  autoShowTipsDescription:
    "إذا كان مفعلاً، سيتم عرض التبرعات تلقائياً على صفحة OBS لمدة 60 ثانية",

  // INTEGRATIONS PAGE
  integrations: "التكاملات",
  integrationsTitle: "التكاملات",
  integrationsDes: "إدارة التكاملات الخاصة بك",
  notConnected: "غير متصل.",
  waitingForVerification: "في انتظار التحقق.",
  connected: "متصل.",
  connect: "اتصال",
  disconnect: "قطع الاتصال",
  simplexDescription: "أول تطبيق مراسلة بدون معرفات مستخدم.",
  simplexIntegration: "تكامل SimpleX",
  enterYourSimplexLink:
    "أدخل رابط الاتصال بـ SimpleX ثم اضغط على اتصال. سيرسل حساب XMRChat طلب اتصال إلى حسابك في SimpleX. بعد قبول الطلب، ستحصل على رمز. أدخل الرمز لإكمال الاتصال.",
  simplexIsConnectedTo: 'SimpleX متصل بالحساب "{name}".',
  acceptRequestInSimplex:
    "اقبل طلب الاتصال في تطبيق SimpleX وأدخل الرمز الذي تحصل عليه.",
  confirmCode: "تأكيد الرمز",
  success: "نجاح",
  openSimplexAndAccept:
    "افتح تطبيق SimpleX على جهازك ووافق على الاتصال من حساب XMRChat.",
  error: "خطأ",
  simplexIsConnected: "تم الاتصال بـ SimpleX.",
  simplexDisconnected: "تم قطع الاتصال بـ SimpleX.",
  simplexLink: "رابط SimpleX",
  signalDescription:
    'قل "مرحبًا" لتجربة مراسلة مختلفة. تركيز غير متوقع على الخصوصية، مع جميع الميزات التي تتوقعها.',
  signalIsConnected: "تم الاتصال بـ Signal.",
  signalIsDisconnected: "تم قطع الاتصال بـ Signal.",
  signalIntegration: "تكامل Signal",
  signalIsConnectedTo: "Signal متصل بالحساب {number}.",
  enterCodeinSignalApp: "أدخل الرمز المُرسل إلى تطبيق Signal الخاص بك.",
  enterSignalNumOrId:
    "أدخل رقم هاتفك أو معرفك في Signal. سنرسل رمزًا إلى هذا الرقم للتحقق.",
  signalPhoneNumOrId: "رقم الهاتف أو المعرف في Signal",
  sendCode: "إرسال الرمز",
  code: "الرمز",

  // NOTIFICATIONS-PREFERENCES PAGE
  notifications: "الإشعارات",
  manageYourNotifs: "إدارة إشعاراتك",
  comingSoon: "قريبًا",
  featureAvailableSoon: "هذه الميزة ستكون متوفرة قريبًا.",
  minNotifsThreshold: "الحد الأدنى للإشعارات",
  minNotifsThresholdHelp: "الحد الأدنى من إكراميات XMR التي ستؤدي إلى إشعار.",
  connectInIntegrations: "اتصل من خلال {integrations} لتفعيل الميزة.",
  dailySummaryTimeHelp: "الوقت الذي سيتم فيه إرسال ملخص يومي بالإشعارات.",
  notifsPreferencesSaved: "تم حفظ تفضيلات الإشعارات.",
  newTip: "إكرامية جديدة",
  receiveNotifsWhenTipReceived: "استلام إشعار عند تلقي إكرامية جديدة",
  dailySummary: "الملخص اليومي",
  receiveDailySummary: "استلام ملخص يومي لإكرامياتك",
  receiveNotifsViaEmail: "استلام الإشعارات عبر البريد الإلكتروني",
  receiveNotifsViaSimplex: "استلام الإشعارات عبر SimpleX",
  receiveNotifsViaSignal: "استلام الإشعارات عبر Signal",

  // HEAD
  head: {
    description:
      "المشاهدون، أرسلوا الرسائل والنصائح بسهولة وخصوصية. البث المباشرون، احتفظوا بمعظم تبرعاتكم بدلاً من إعطاء 30-50% لشركات التقنية الكبرى.",
    title: "أرسل رسالة وتبرع باستخدام مونيرو",
    XMRChatTip: "XMRChat - تبرع لـ {path} باستخدام مونيرو",
    tip: "تبرع لـ {path}",
  },
  moneroSuperchats: "سوبر شات مونيرو : XMRChat",
  emailVerification: "التحقق من البريد الإلكتروني",
  forgotPassword: "هل نسيت كلمة المرور؟",
  signUp: "إنشاء حساب",

  // LIVE STREAMS
  liveNow: "مباشر الآن",
  noStreamersLive: "لا يوجد منشئو بث مباشر الآن.",
  liveOn: "يبث على",

  // COHOSTS
  cohost: "المضيف المشارك",
  cohostPage: "صفحة المضيف المشارك",
  cohostDes: "إدارة {path} دردشات XMR",
  inviteCohosts: "دعوة مضيفين مشاركين",
  noCohosts: "ليس لديك أي مضيفين مشاركين بعد",
  cohostsCanHelpYou:
    "المضيفون المشاركون هم مستخدمون يمكنهم مساعدتك في إدارة دردشات XMR.",
  youCanInviteCohosts: "يمكنك دعوة مضيفين مشاركين باستخدام الزر أدناه.",
  removeYourselfFromCohost:
    "هل أنت متأكد أنك تريد إزالة نفسك من المضيفين المشاركين للصفحة؟ يجب دعوتك مرة أخرى لتصبح مضيفًا مشاركًا مرة أخرى.",
  youRemovedFromCohost: "تمت إزالتك من المضيفين المشاركين للصفحة.",
  removeFromCohost: "إزالة من المضيف المشارك",
  removeCohost: "إزالة المضيف المشارك",
  removeThisCohost: "هل أنت متأكد أنك تريد إزالة هذا المضيف المشارك؟",
  cohostRemoved: "تمت إزالة المضيف المشارك",
  invitationCancelled: "تم إلغاء الدعوة",
  expired: "منتهي",
  expires: "ينتهي",
  pending: "قيد الانتظار",

  // TIP TIERS
  tipTiers: "مستويات الإكراميات",
  minAmount: "الحد الأدنى:",
  close: "إغلاق",
  minXMR: "الحد الأدنى (XMR)",
  color: "اللون",
  sound: "الصوت",
  wantToDeleteTier: "هل أنت متأكد أنك تريد حذف هذا المستوى؟",
  deleteTier: "حذف المستوى",
  tierDeleted: "تم حذف المستوى",
  createTier: "إنشاء مستوى",
  createNewTier: "إنشاء مستوى جديد",
  edit: "تعديل",
  delete: "حذف",
  pageTierUpdated: "تم تحديث مستوى الصفحة.",
  pageTierCreated: "تم إنشاء مستوى الصفحة.",
  minAmountXMR: "الحد الأدنى (XMR)",
  description: "الوصف",
  soundOBS: "الصوت (OBS)",
  uploaded: "تم الرفع:",
  clear: "مسح",
  save: "حفظ",
  editTier: "تعديل المستوى",
  editTierDetails: "تعديل تفاصيل المستوى",
  manageYourTipTiers: "إدارة مستويات الإكرامية الخاصة بك",

  // TIP LIST
  tipList: {
    reply: "الرد:",
    replyToTip: "الرد على الإكرامية:",
    private: "خاص:",
    obs: "OBS:",
    message: "الرسالة:",
  },
  reply: "رد",
  replyColors: "ألوان الرد",
  backgroundColor: "لون الخلفية",
  textColor: "لون النص",
  repliedMessagePreview: "معاينة الرسالة المُرد عليها",
  action: "إجراء",
  premium: "بريميوم",
};
