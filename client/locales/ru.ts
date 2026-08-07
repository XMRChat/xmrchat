export default {
  validations: {
    required: "Поле обязательно для заполнения",
    email: "Неверный адрес электронной почты",
    numberic: "Должно быть числом",
    minLength: "Минимум {length} символов.",
    maxLength: "Не должно превышать {length} символов.",
    minValue: "Минимальное значение {value}.",
    sameAs: "Должно совпадать с {otherName}",
    someFieldsAreIncorrect: "Некоторые поля заполнены неверно.",
    url: "Недопустимая ссылка.",
    notUrl: "Не должно быть ссылкой.",
    streamerSlug:
      "Путь может содержать только строчные буквы, цифры, подчеркивание и дефисы.",
    moneroPrimaryAddress:
      "Основной адрес недействителен. Он должен начинаться с {characters}.",
  },

  account: "Аккаунт",
  logout: "Выйти",
  login: "Войти",
  send: "Отправить",
  email: "Эл. почта",
  search: "Поиск",
  password: "Пароль",
  confirm: "Подтвердить",
  reconnect: "Переподключиться",
  confirmPassword: "Подтвердите пароль",
  signupInstead: "Зарегистрироваться",
  signupFailed: "Ошибка регистрации",
  signupSuccessfull: "Регистрация прошла успешно",
  noItems: "Нет элементов",
  signupSuccessfullDescription:
    "Пожалуйста, перейдите по ссылке, отправленной на вашу электронную почту, чтобы подтвердить аккаунт.",
  loginInstead: "Войти",
  loginFailed: "Ошибка входа",
  signup: "Регистрация",
  forgetPassword: "Забыли пароль?",
  loginDescription:
    "Войдите в аккаунт, чтобы получить доступ к вашей странице.",
  resetPassword: "Сбросить пароль",
  enterYourNewPassword: "Введите новый пароль",
  passwordResetFailed: "Ошибка сброса пароля",
  passwordUpdated: "Ваш пароль был успешно обновлен.",
  weSentYouAnEmail:
    "Мы отправили вам электронное письмо {email}, пожалуйста, следуйте ссылке в письме, чтобы сбросить пароль.",
  changeEmail: "Изменить электронную почту",
  enterEmailToResetPassword:
    "Введите вашу электронную почту для сброса пароля.",
  creatorLogin: "Вход для авторов",
  goToHomePage: "Перейти на главную страницу",
  searchCreators: {
    title: "Поиск Создателей",
    description: "Ищите создателей с публичными страницами на xmrchat.",
  },
  typePageName: "Введите название страницы...",
  contactUs: "Свяжитесь с нами",
  here: "здесь",
  backToHome: "Назад на главную",
  somethingWentWrong: "Что-то пошло не так!",

  xmrchat: "XMRChat",
  heroDescription: "Поддержите любимого стримера криптовалютой.",
  findCreators: "Найти авторов",
  creatorsStartHere: "Начало для авторов",

  FAQ: {
    title: "Часто задаваемые вопросы",
    whyTipWithXMRChat: "Почему стоит использовать XMRChat?",
    howToUseXMRChat: "Как использовать XMRChat?",
    whyUseMonero: "Почему XMRChat использует Monero?",
    whereToGetMonero: "Где купить Monero?",
  },

  earnMore: {
    title: "Зарабатывайте больше",
    description:
      "YouTube удерживает 30–50% с Superchats. Rumble — 20% с Rants. С XMRChat вы получаете 100% чаевых от фанатов прямо в свой Monero-кошелек.",
  },
  censorshipResistant: {
    title: "Устойчивость к цензуре",
    description:
      "Принимая чаевые в Monero, вы получаете доход, не связанный с большими технокомпаниями и их политиками.",
  },
  corruptionResistant: {
    title: "Устойчивость к коррупции",
    description:
      "Многие режимы конфискуют или блокируют счета оппозиции. Monero позволяет вам быть собственным банком и контролировать свои финансы.",
  },
  private: {
    title: "Конфиденциальность",
    description:
      "Зрители могут отправлять чаевые анонимно — без страха, что кто-то узнает о донатах.",
  },
  quickAndEasy: {
    title: "Быстро и просто",
    description:
      "Не нужно создавать аккаунт, подтверждать email или вводить данные карты. Поклонник просто указывает имя, сообщение, сумму и отправляет XMR.",
  },
  openSource: {
    title: "Открытый код",
    description:
      "XMRChat — это open source. Исходный код доступен на {github}.",
  },

  lowFees: {
    title: "Низкие комиссии",
    description: "Комиссии в сети Monero составляют считанные центы.",
  },
  privateMonero: {
    title: "Приватность",
    description:
      "В отличие от большинства криптовалют, Monero скрывает данные транзакций. Отправитель, получатель и сумма не видны в блокчейне.",
  },
  accepted: {
    title: "Принимается",
    description:
      "Не нужно продавать крипту через централизованные биржи. Покупайте товары и услуги напрямую у продавцов на {xmrbazaar} и {monerica}.",
  },
  andMore: {
    title: "И многое другое",
    description: "Узнайте больше о Monero на {getmonero}.",
  },
  forContentCreators: {
    title: "Для Создателей Контента",
    description: {
      main: `Нажмите кнопку "Начало для авторов". Создайте аккаунт XMRChat. Создайте Страницу Чаевых. Сообщите своей аудитории URL вашей страницы чаевых.`,
      tutorialLink:
        "У Алекса Анархо есть отличный урок по использованию XMRChat на {youtube}.",
      ifStreamyard: "Если вы используете Streamyard:",
      ifOBS: "Если вы используете OBS:",
      ifLiveJoiner: "Если вы используете LiveJoiner:",
      streamyard: `Перейдите в пункт меню "Редактировать страницу чаевых". Убедитесь, что вы добавили имя пользователя вашего канала Twitch. При запуске стрима в Streamyard добавьте Twitch как направление. Бот XMRChat (xmr-chat на Twitch) отправит сообщение с чаевыми на Twitch, и вы сможете отобразить его на экране из Streamyard. Логотип бота xmrchat лучше всего выглядит с настройкой "Minimal".`,
      obs: `Перейдите в пункт меню "OBS". Нажмите "Копировать ссылку страницы OBS". Добавьте источник браузера в OBS и вставьте ссылку.`,
      liveJoiner:
        "Выберите XMRChat из списка поддерживаемых платформ и укажите путь или URL вашей страницы чаевых XMRChat.",
    },
  },
  forFans: {
    title: "Для Фанатов",
    description:
      "Перейдите по URL страницы чаевых вашего создателя контента. Введите имя пользователя и сообщение, выберите сумму чаевых, затем отправьте. Появится диалоговое окно с деталями чаевых. Ваш xmrchat будет отображаться на странице стримера после отправки чаевых.",
  },
  whereToGetMonero: {
    cakeWallet: "Купите или обменяйте крипту на Monero в {cakeWallet}.",
    stealthex:
      "Обменяйте криптовалюту на Monero (XMR) на {stealthex} и других платформах с {kycnot}.",
    haveno: "Купите Monero без KYC на {haveno}.",
    kraken: "Купите Monero с KYC на {kraken}.",
    xmrbazaar: "Продавайте товары или услуги за Monero на {xmrbazaar}.",
    gupax: "Добывайте его с помощью {gupax}.",
    kunoAnneMedia: "Создайте сбор средств в Monero на {kunoAnneMedia}.",
    monerica:
      "Принимайте Monero в своём бизнесе и появляйтесь в каталогах {monerica}, {monerodirectory} и на карте на {xmrbazaar} и {bankexit}.",
  },

  tipName: "Имя",
  tipAmount: "Сумма",
  tipMessage: "Сообщение",
  tipPrivate: "Приватно",
  tipDate: "Дата",
  tipUpdated: "Совет обновлён!",
  tipPrivateTooltip: "Имя и сообщение будут видны только стримеру.",
  tipCoin: "Монета",
  tipCoinPlaceholder: "XMR",
  sendTip: "Отправить чаевые",
  tipCreationFailed: "Не удалось создать чаевые",
  tipNamePlaceholder: "Введите имя",
  tipAmountPlaceholder: "Введите сумму",
  tipMessagePlaceholder: "Введите сообщение",
  tipPrivatePlaceholder: "Приватно",
  tipSwapUnavailable: "Обмен сейчас недоступен.",
  tipSwapMinimum: "Минимум {min} для обмена",
  tipMinimum: "Минимум {min}",
  recentTips: "Последние чаевые",
  tipDisplayValueTooltip: "Показывать чаевые в XMR или {fiat}",
  noRecentTips: "Нет недавних чаевых!",
  pageDeactivatedAlert:
    "Ваша страница была деактивирована и не отображается для публичного просмотра. Пожалуйста, свяжитесь с поддержкой для получения дополнительной информации.",
  tipPrivateMessage: "личное сообщение",
  tipWalletWarningTitle: "Не отправляйте чаевые с кошелька стримера.",
  tipWalletWarningDescription:
    "Пожалуйста, не используйте зарегистрированный кошелек стримера — сдача может исказить отображаемую сумму.",
  tipWalletMinimum:
    "Пожалуйста, отправьте минимум {minimumAmount} XMR на следующий адрес, чтобы ваш донат отобразился на xmrchat.",
  partialAmountReceived:
    "{partialAmount} получено пока что, пожалуйста, отправьте оставшиеся {remainingAmount}.",
  openInMyWallet: "Открыть в моем кошельке",
  cancel: "Отмена",
  copyAddress: "Скопировать адрес",
  waitingForPayment: "Ожидание платежа",

  contactUsDescription: "Свяжитесь с нами по вопросам и отзывам.",
  contactUsForm: "Форма связи",
  contactUsFormDescription: "Свяжитесь с нами по вопросам и отзывам.",
  contactUsFormButton: "Связаться с нами",
  emailUsDirectly: "Напишите нам напрямую",
  followUsOnTwitter: "Подписывайтесь на нас в Twitter",
  twitter: "Twitter",

  // CREATE PAGE
  createPage: "Создать страницу",
  getStartedCreatingPage: "Начните с создания страницы стримера",
  home: "Главная",
  logo: "Логотип",
  logoRatio: "Соотношение 1:1",
  bannerImage: "Баннер",
  bannerImageBestRatio: "Лучшее соотношение — 3:1",
  yourId: "Ваш ID",
  pageSlug: "Slug страницы",
  moneroPrmReciveAddress: "Основной адрес для получения Monero",
  prmMoneroReciveAdressBegin:
    "Основные адреса для получения Monero начинаются с {characters}.",
  moneroSecretViewKey: "Секретный ключ просмотра Monero",
  weNeedSecretViewKey:
    "Нам нужен секретный ключ просмотра, чтобы видеть входящие транзакции от зрителей. {whereToFind}",
  whereToFindViewKey: "Где найти ключ просмотра?",
  twitchChannelName: "Имя Twitch-канала",
  nameOfYourTwitchChannel:
    "Имя вашего Twitch-канала. Используется для отображения чаевых через xmr_chat Twitch-бота.",
  optional: "Необязательно",
  minTipAmount: "Мин. сумма чаевых (XMR)",
  tipPageAmountFormat: "Формат суммы на странице чаевых",
  determinesDefaultValue:
    "Определяет значение по умолчанию для формата суммы на вашей странице чаевых.",
  messageAmountFormat: "Формат суммы сообщения",
  determinesAmountInObsAndTwitch:
    "Определяет формат суммы, отображаемой в OBS и Twitch.",
  publicPage: "Публичная страница (отображается в поиске создателей).",
  continue: "Продолжить",
  clickToUpload: "Кликните, чтобы загрузить",
  pageCreatedSuccessfully: "Страница успешно создана!",
  slugReservedUntil: "Ваш slug зарезервирован до ",
  note: "Примечание",
  pageUpdated: "Страница обновлена!",
  loading: "Загрузка",
  available: "Доступно",
  unavailable: "Недоступно",
  fiatUnit: "Валюта",
  fiatUnitHelp:
    "Валюта, используемая для отображения чаевых при установленном режиме отображения чаевых в валюте.",
  never: "Никогда",
  tipExpiration: "Срок действия чаевых",
  tipExpirationHelp:
    "Чаевые будут автоматически удалены по истечении указанного срока",
  tipExpirationWarning:
    "Изменение срока действия приведет к удалению всех сообщений xmrchat старше выбранного срока",
  xDays: "{count} День | {count} Дней",
  xMonths: "{count} Месяц | {count} Месяцев",
  paymentIsExpired:
    "Срок действия платежа истёк. Если вы уже оплатили, пожалуйста, свяжитесь со службой поддержки.",
  pageReservationExpired: "Резервация страницы истекла.",
  paymentCheckingDis: "Проверка платежа отключена.",
  ifPaymentMade: "Если платеж уже был произведён, он появится в списке чаевых.",
  bioHelp: "Будет отображаться на странице чаевых и в результатах поиска.",

  // STREAMER MENU
  menu: "Меню",
  myXmrchats: "Мои xmrchats",
  editTipPage: "Редактировать Страницу Чаевых",
  accounts: "Аккаунты",
  tipPage: "Страница Чаевых",
  contentLinks: "Ссылки на Контент",
  obs: "OBS",
  show: "Показать",
  hide: "Скрыть",
  youDontHavePage: "У вас еще нет страницы",
  getStartedByCreatingPage: "Начните с создания страницы для себя",
  createNewPage: "Создать новую страницу",

  // ACCOUNT PAGE
  changePassword: "Изменить Пароль",
  updateYourLoginPassword: "Обновить пароль для входа",
  currentPassword: "Текущий пароль",
  newPassword: "Новый пароль",
  repeatNewPassword: "Повторите новый пароль",
  contactSupportForEmailChange:
    "Свяжитесь с поддержкой для изменения вашего адреса электронной почты.",

  // EDIT PAGE
  editPage: "Редактировать Страницу",
  customizeYourTipPage: "Настройте свою страницу чаевых.",
  errorCreatingUpdatingPage: "Ошибка при создании/обновлении страницы",
  tipAmountSuggestions: "Предлагаемые Суммы Чаевых",
  pageWillBeAvailableAt: "Ваша страница будет доступна по адресу {url}",
  noSuggestedAmountsAdded:
    "Нет предложенных сумм, нажмите кнопку ниже, чтобы добавить новые уровни.",
  addTier: "Добавить Уровень",
  remove: "Удалить",
  name: "Имя",
  amountUSD: "Сумма (USD)",
  amountFiat: "Сумма ( {fiat} )",

  // CONTENT LINKS
  brandName: "Название Бренда",
  brandNameHelp: "Название бренда/контента. Может отличаться от slug.",
  searchTerms: "Поисковые Термины",
  searchTermsHelp:
    "Поиск создателей будет возвращать результаты на основе slug страницы, имени и ключевых слов в этом списке.",
  contentLinksDescription: "Имя, Поисковые Термины и Ссылки на Контент",
  contentLinksSecondDescription:
    "Ссылки на ваши страницы в соцсетях или веб-сайты. Чтобы сбросить значение, оставьте поле пустым.",
  saveChanges: "Сохранить Изменения",
  notUrlWithMessage: "Введите только название, не полную ссылку.",
  changesAreSaved: "Изменения сохранены.",
  errorSavingChanges: "Ошибка при сохранении изменений.",
  xUsername: "{platform} имя пользователя",
  websiteLink: "Ссылка на сайт",
  youtubeChannel: "Youtube канал",
  podcastRssLink: "Ссылка на RSS-канал",
  nostrPubKey: "Nostr Публичный Ключ",
  rumbleLiveStreamApi: "API прямых трансляций Rumble",
  rumbleLiveStreamApiHelp:
    "API прямых трансляций Rumble из {guide}. XMRChat использует этот URL для получения текущих прямых трансляций вашего канала.",
  thisGuide: "этого руководства",

  // OBS
  obsDescription: "Виджет и настройки OBS.",
  settingsAreUpdated: "Настройки обновлены.",
  errorUpdatingSettings: "Ошибка при обновлении настроек",
  toUseXMRchatsOnOBS:
    "Чтобы использовать XMRChat в OBS, скопируйте ссылку на страницу OBS и добавьте её в 'Браузер' Источников OBS.",
  copyOBSLink: "Копировать Ссылку на Страницу OBS",
  obsPageSettings: "Настройки Страницы OBS",
  preventMessagesFromFading: "Предотвратить исчезновение сообщений",
  preventMessagesFromFadingDescription:
    "Когда активно, последние чаевые остаются на экране, в противном случае каждое сообщение отображается в течение 60 секунд.",
  playSound: "Воспроизвести Звук",
  playSoundDescription:
    "Воспроизводит звук на странице OBS при появлении нового чаевого.",
  playSoundDescriptionLocal:
    "Если вы тестируете эту функцию локально в браузере, после открытия вкладки obs обязательно кликните где-нибудь на странице. В противном случае браузер не будет воспроизводить звук из-за отсутствия взаимодействия с открытой вкладкой.",
  autoShowTips: "Автоматически показывать чаевые",
  autoShowTipsDescription:
    "Если активно, чаевые будут автоматически отображаться на странице OBS в течение 60 секунд.",

  // INTEGRATIONS PAGE
  integrations: "Интеграции",
  integrationsTitle: "Интеграции",
  integrationsDes: "Управляйте вашими интеграциями",
  notConnected: "Не подключено.",
  waitingForVerification: "Ожидание подтверждения.",
  connected: "Подключено.",
  connect: "Подключить",
  disconnect: "Отключить",
  simplexDescription: "Первый мессенджер без идентификаторов пользователей.",
  simplexIntegration: "Интеграция SimpleX",
  enterYourSimplexLink:
    "Введите ссылку для подключения SimpleX и нажмите «Подключить». Аккаунт XMRChat отправит запрос на подключение к вашему аккаунту SimpleX. После принятия запроса вы получите код. Введите код, чтобы завершить подключение.",
  simplexIsConnectedTo: "SimpleX подключен к аккаунту «{name}».",
  acceptRequestInSimplex:
    "Примите запрос на подключение в приложении SimpleX и введите полученный код.",
  confirmCode: "Подтвердить код",
  success: "Успешно",
  openSimplexAndAccept:
    "Откройте приложение SimpleX на вашем устройстве и примите подключение от аккаунта XMRChat.",
  error: "Ошибка",
  simplexIsConnected: "SimpleX подключен.",
  simplexDisconnected: "SimpleX отключен.",
  simplexLink: "Ссылка SimpleX",
  signalDescription:
    "Поздоровайтесь с новым опытом обмена сообщениями. Неожиданный упор на конфиденциальность вместе со всеми ожидаемыми функциями.",
  signalIsConnected: "Signal подключен.",
  signalIsDisconnected: "Signal отключён.",
  signalIntegration: "Интеграция Signal",
  signalIsConnectedTo: "Signal подключён к аккаунту {number}.",
  enterCodeinSignalApp: "Введите код, отправленный в ваше приложение Signal.",
  enterSignalNumOrId:
    "Введите ваш номер телефона или ID Signal. Мы отправим код на этот номер для подтверждения.",
  signalPhoneNumOrId: "Номер телефона или ID Signal",
  sendCode: "Отправить код",
  code: "Код",

  // NOTIFICATIONS-PREFERENCES PAGE
  notifications: "Уведомления",
  manageYourNotifs: "Управляйте вашими уведомлениями",
  comingSoon: "Скоро будет",
  featureAvailableSoon: "Эта функция скоро станет доступна.",
  minNotifsThreshold: "Минимальный порог уведомлений",
  minNotifsThresholdHelp:
    "Минимальная сумма чаевых в XMR, при которой будет отправлено уведомление.",
  connectInIntegrations: "Подключитесь в {integrations}, чтобы включить.",
  dailySummaryTimeHelp: "Время отправки ежедневных уведомлений с итогами.",
  notifsPreferencesSaved: "Настройки уведомлений сохранены.",
  newTip: "Новый чаевые",
  receiveNotifsWhenTipReceived:
    "Получать уведомления при получении новых чаевых",
  dailySummary: "Ежедневная сводка",
  receiveDailySummary: "Получать ежедневную сводку ваших чаевых",
  receiveNotifsViaEmail: "Получать уведомления по электронной почте",
  receiveNotifsViaSimplex: "Получать уведомления через SimpleX",
  receiveNotifsViaSignal: "Получать уведомления через Signal",

  // HEAD
  head: {
    description:
      "Зрители, отправляйте сообщения и чаевые легко и конфиденциально. Стримеры, сохраняйте почти все свои чаевые, а не отдавайте 30–50 % крупным технокомпаниям.",
    title: "Сообщения и чаевые с Monero",
    XMRChatTip: "XMRChat — чаевые для {path} через Monero",
    tip: "Оставить чаевые {path}",
  },
  moneroSuperchats: "Monero Суперчаты : XMRChat",
  emailVerification: "Подтверждение электронной почты",
  forgotPassword: "Забыли пароль?",
  signUp: "Зарегистрироваться",

  // LIVE STREAMS
  liveNow: "Сейчас в эфире",
  noStreamersLive: "Сейчас никто из стримеров не в эфире.",
  liveOn: "В эфире на",

  // COHOSTS
  cohost: "Соведущий",
  cohostPage: "Страница соведущего",
  cohostDes: "Управление {path} xmrchats",
  inviteCohosts: "Пригласить соведущих",
  noCohosts: "У вас пока нет соведущих",
  cohostsCanHelpYou:
    "Соведущие — это пользователи, которые могут помочь вам управлять вашими xmrchats.",
  youCanInviteCohosts: "Вы можете пригласить соведущих с помощью кнопки ниже.",
  removeYourselfFromCohost:
    "Вы уверены, что хотите удалить себя из соведущих? Чтобы снова стать соведущим, потребуется новое приглашение.",
  youRemovedFromCohost: "Вы были удалены из соведущих.",
  removeFromCohost: "Удалить из соведущих",
  removeCohost: "Удалить соведущего",
  removeThisCohost: "Вы уверены, что хотите удалить этого соведущего?",
  cohostRemoved: "Соведущий удалён",
  invitationCancelled: "Приглашение отменено",
  expired: "Истекло",
  expires: "истекает",
  pending: "в ожидании",

  // TIP TIERS
  tipTiers: "Уровни чаевых",
  minAmount: "Мин. сумма:",
  close: "Закрыть",
  minXMR: "Мин. (XMR)",
  color: "Цвет",
  sound: "Звук",
  wantToDeleteTier: "Вы уверены, что хотите удалить этот уровень?",
  deleteTier: "Удалить уровень",
  tierDeleted: "Уровень удалён",
  createTier: "Создать уровень",
  createNewTier: "Создать новый уровень",
  edit: "Редактировать",
  delete: "Удалить",
  pageTierUpdated: "Уровень обновлён.",
  pageTierCreated: "Уровень создан.",
  minAmountXMR: "Мин. сумма (XMR)",
  description: "Описание",
  soundOBS: "Звук (OBS)",
  uploaded: "Загружено:",
  clear: "Очистить",
  save: "Сохранить",
  editTier: "Редактировать уровень",
  editTierDetails: "Редактировать детали уровня",
  manageYourTipTiers: "Управляйте своими уровнями чаевых",

  // TIP LIST
  tipList: {
    reply: "Ответ:",
    replyToTip: "Ответить на чаевые:",
    private: "Приватно:",
    obs: "OBS:",
    message: "Сообщение:",
  },
  reply: "Ответить",
  replyColors: "Цвета ответа",
  backgroundColor: "Цвет фона",
  textColor: "Цвет текста",
  repliedMessagePreview: "Предпросмотр ответа",
  action: "Действие",
  premium: "Премиум",
};
