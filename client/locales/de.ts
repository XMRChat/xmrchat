export default {
  validations: {
    required: "Pflichtfeld",
    email: "E-Mail ist ungültig",
    numberic: "Muss eine Zahl sein",
    minLength: "Muss mindestens {length} Zeichen lang sein",
    maxLength: "Darf nicht länger als {length} Zeichen sein",
    minValue: "Muss mindestens {value} sein",
    sameAs: "Muss identisch mit {otherName} sein",
    someFieldsAreIncorrect: "Einige Felder sind nicht korrekt ausgefüllt",
    url: "Der Link ist ungültig",
    notUrl: "Darf kein Link sein",
    streamerSlug:
      "Der Pfad darf nur Kleinbuchstaben, Zahlen, Unterstriche und Bindestriche enthalten.",
    moneroPrimaryAddress:
      "Die primäre Adresse ist ungültig. Sie muss mit {characters} beginnen.",
  },

  account: "Konto",
  logout: "Abmelden",
  login: "Anmelden",
  send: "Senden",
  loginFailed: "Anmeldung fehlgeschlagen",
  email: "E-Mail",
  search: "Suchen",
  password: "Passwort",
  confirm: "Bestätigen",
  reconnect: "Erneut verbinden",
  confirmPassword: "Passwort bestätigen",
  signupInstead: "Stattdessen registrieren",
  loginInstead: "Stattdessen anmelden",
  signup: "Registrieren",
  signupFailed: "Registrierung fehlgeschlagen",
  signupSuccessfull: "Registrierung erfolgreich",
  noItems: "Keine Einträge",
  signupSuccessfullDescription:
    "Bitte folge dem Link in deinem Postfach, um dein Konto zu verifizieren.",
  forgetPassword: "Passwort vergessen?",
  loginDescription:
    "Melde dich bei deinem Konto an, um auf deine Anzeigeseite zuzugreifen",
  resetPassword: "Passwort zurücksetzen",
  enterYourNewPassword: "Gib dein neues Passwort ein",
  passwordResetFailed: "Passwort zurücksetzen fehlgeschlagen",
  passwordUpdated: "Dein Passwort wurde erfolgreich aktualisiert.",
  weSentYouAnEmail:
    "Wir haben dir eine E-Mail an {email} gesendet, bitte folge dem Link in der E-Mail, um dein Passwort zurückzusetzen.",
  changeEmail: "E-Mail ändern",
  enterEmailToResetPassword:
    "Gib deine E-Mail ein, um dein Passwort zurücksetzen",
  creatorLogin: "Creator Anmeldung",
  goToHomePage: "Zur Startseite gehen",
  searchCreators: {
    title: "Creator Suchen",
    description: "Suche nach Creators mit öffentlichen Seiten auf xmrchat.",
  },
  typePageName: "Seitennamen eingeben...",
  contactUs: "Kontaktiere uns",
  here: "hier",
  backToHome: "Zurück zur Startseite",
  somethingWentWrong: "Etwas ist schiefgelaufen!",

  xmrchat: "XMRChat",
  heroDescription: "Unterstütze deinen Lieblings-Streamer mit Kryptowährung",
  findCreators: "Creator finden",
  creatorsStartHere: "Creator starten hier",

  FAQ: {
    title: "FAQ",
    whyTipWithXMRChat: "Warum mit XMRChat Trinkgeld verschicken?",
    howToUseXMRChat: "Wie verwende ich XMRChat?",
    whyUseMonero: "Warum verwendet XMRChat Monero?",
    whereToGetMonero: "Wo bekomme ich Monero?",
  },

  earnMore: {
    title: "Mehr verdienen",
    description:
      "YouTube berechnet 30-50% für Superchats, Rumble 20% für Rants. Mit XMRChat erhälst du 100% deiner XMR-Trinkgelder von Fans direkt in deine Monero-Wallet",
  },
  censorshipResistant: {
    title: "Zensurresistent",
    description:
      "Das Akzeptieren von Monero-Trinkgeldern ermöglicht dir ein Einkommen, das nicht direkt mit Big Tech und willkürlichen Richtlinienverstößen verbunden ist",
  },
  corruptionResistant: {
    title: "Korruptionsresistent",
    description:
      "Viele Regime beschlagnahmen oder sperren Bankkonten politischer Gegner. Monero ermöglicht es dir, deine eigene Bank zu sein mit vollständiger Kontrolle über deine Finanzen",
  },
  private: {
    title: "Privat",
    description:
      "Zuschauer können anonym Trinkgeld schicken. So müssen sie sich keine Sorgen vor Arbeitgebern oder anderen machen, die aufgrund ihrer Spenden diskriminieren.",
  },
  quickAndEasy: {
    title: "Schnell und einfach",
    description:
      "Zuschauer müssen kein Konto erstellen, keine E-Mail verifizieren oder Kreditkarteninformationen eingeben. Fans gehen zu deiner Trinkgeld-Seite, geben ihren Namen, Nachricht und Betrag ein und senden dir XMR-Trinkgeld",
  },
  openSource: {
    title: "Open Source",
    description:
      "XMRChat ist Open Source. Du kannst den Code auf {github} überprüfen.",
  },

  lowFees: {
    title: "Niedrige Gebühren",
    description:
      "Monero-Transaktionsgebühren betragen höchstens ein paar Cent. Das Empfangen kostet nichts.",
  },
  privateMonero: {
    title: "Privat",
    description:
      "Während die meisten Kryptowährungen transparente Blockchains verwenden, sind Monero Transaktionsdaten verschleiert. Sender, Empfänger und Transaktionsbeträge stehen nicht transparent in der Blockchain",
  },
  accepted: {
    title: "Akzeptiert",
    description:
      "Mit Monero kannst du bereits jetzt Waren und Dienstleistungen kaufen. Händler, die Monero akzeptieren, findest du auf {xmrbazaar} und {monerica}.",
  },
  andMore: {
    title: "Und mehr",
    description: "Erfahre mehr über Monero auf {getmonero}.",
  },
  forContentCreators: {
    title: "Für Content Creator",
    description: {
      main: `Klicken Sie auf die Schaltfläche "Ersteller starten hier". Erstellen Sie ein XMRChat-Konto. Erstellen Sie eine Trinkgeldseite. Teilen Sie Ihrem Publikum die URL Ihrer Trinkgeldseite mit.`,
      tutorialLink:
        "Alex Anarcho hat ein großartiges Tutorial zur Verwendung von XMRChat auf {youtube}.",
      ifStreamyard: "Wenn Sie Streamyard verwenden:",
      ifOBS: "Wenn du OBS verwendest:",
      ifLiveJoiner: "Wenn Sie LiveJoiner verwenden:",
      streamyard: `Gehe zum Menüpunkt "Trinkgeld-Seite bearbeiten". Stelle sicher, dass du deinen Twitch-Kanalnamen hinzugefügt hast. Wenn du den Stream in Streamyard startest, füge Twitch als Ziel hinzu. Der XMRChat-Bot (xmr-chat auf Twitch) wird die Trinkgeld-Nachricht auf Twitch senden und du kannst sie auf deinem Bildschirm von Streamyard anzeigen. Das angezeigte xmrchat-Bot-Logo sieht am besten mit der "Minimal"-Einstellung aus.`,
      obs: `Gehe zum "OBS"-Menüpunkt. Klicke auf "OBS-Seitenlink kopieren". Füge eine Browserquelle in OBS hinzu und füge den Link ein.`,
      liveJoiner:
        "Wählen Sie XMRChat aus der Liste der unterstützten Plattformen aus und geben Sie den Pfad oder die URL Ihrer XMRChat-Trinkgeldseite ein.",
    },
  },
  forFans: {
    title: "Für Fans",
    description:
      "Gehe zur URL der Trinkgeld-Seite deines Content Creators. Gib Benutzernamen und Nachricht ein, wähle den Trinkgeld-Betrag und sende ab. Ein Dialog mit den Trinkgeld-Details wird erscheinen. Dein xmrchat wird auf der Seite des Streamers angezeigt, nachdem das Trinkgeld gesendet wurde.",
  },
  whereToGetMonero: {
    cakeWallet:
      "Kaufe oder tausche Monero gegen andere Kryptowährungen bei {cakeWallet}.",
    stealthex:
      "Tausche Monero gegen andere Kryptowährungen bei {stealthex} oder {kycnot}.",
    haveno: "Kaufe Monero ohne KYC bei {haveno}.",
    kraken: "Kaufe Monero mit KYC bei {kraken} (nur bei Kraken USA).",
    xmrbazaar:
      "Verkaufe Artikel oder Dienstleistungen für Monero bei {xmrbazaar}.",
    gupax: "Mine Monero mit {gupax}.",
    kunoAnneMedia: "Erstelle eine Monero-Spendenaktion bei {kunoAnneMedia}.",
    monerica:
      "Akzeptiere Monero in deinem Unternehmen und werde auf den Seiten {monerica} und {monerodirectory}, sowie auf der Geschäftsübersichtskarte bei {xmrbazaar} und {bankexit} gelistet.",
  },

  // TIP PAGE
  tipName: "Name",
  tipAmount: "Betrag",
  tipMessage: "Nachricht",
  tipPrivate: "Privat",
  tipDate: "Datum",
  tipUpdated: "Trinkgeld-Transaktion aktualisiert!",
  tipPrivateTooltip: "Name und Nachricht sind nur für den Creator sichtbar",
  tipCoin: "Kryptowährung",
  tipCoinPlaceholder: "XMR",
  sendTip: "Trinkgeld senden",
  tipCreationFailed: "Trinkgeld-Erstellung fehlgeschlagen",
  tipNamePlaceholder: "Name eingeben",
  tipAmountPlaceholder: "Betrag eingeben",
  tipMessagePlaceholder: "Nachricht eingeben",
  tipPrivatePlaceholder: "Privat",
  tipSwapUnavailable: "Tausch ist derzeit nicht verfügbar",
  tipSwapMinimum: "Minimum {min} zum Tauschen",
  tipMinimum: "Minimum {min}",
  recentTips: "Letzte Trinkgeld-Transaktionen",
  tipDisplayValueTooltip: "Trinkgeld in XMR oder {fiat} anzeigen",
  noRecentTips: "Keine aktuellen Trinkgeld-Transaktionen!",
  pageDeactivatedAlert:
    "Deine Seite wurde deaktiviert und ist nicht öffentlich sichtbar. Bitte kontaktiere den Support für weitere Informationen.",
  tipPrivateMessage: "Private Nachricht",
  tipWalletWarningTitle:
    "Verwende nicht deine Creator-Wallet um Trinkgeld zu verschicken",
  tipWalletWarningDescription:
    "Bitte vermeide es, Trinkgelder mit der auf der Seite registrierten Wallet zu senden. Die zurückgegebene Outputs erhöhen den Betrag, den wir als empfangen sehen",
  tipWalletMinimum:
    "Bitte sende mindestens {minimumAmount} XMR an die folgende Adresse, damit dein xmrchat angezeigt wird",
  partialAmountReceived:
    "{partialAmount} bisher erhalten, bitte sende den Rest {remainingAmount}.",
  openInMyWallet: "In meiner Wallet öffnen",
  cancel: "Abbrechen",
  copyAddress: "Adresse kopieren",
  waitingForPayment: "Warte auf Zahlung",

  // CONTACT US PAGE
  contactUsDescription: "Kontaktiere uns bei Fragen oder Feedback.",
  contactUsForm: "Kontaktformular",
  contactUsFormDescription: "Kontaktiere uns bei Fragen oder Feedback.",
  contactUsFormButton: "Kontakt",
  emailUsDirectly: "Direkt per E-Mail kontaktieren",
  followUsOnTwitter: "Folge uns auf Twitter",
  twitter: "Twitter",

  // CREATE PAGE
  createPage: "Seite erstellen",
  getStartedCreatingPage: "Beginne mit der Erstellung diner Creator-Seite",
  home: "Startseite",
  logo: "Logo",
  logoRatio: "1:1 Verhältnis",
  bannerImage: "Bannerbild",
  bannerImageBestRatio: "Am besten im Verhältnis 3:1 hochladen",
  yourId: "Deine ID",
  pageSlug: "Seiten-Slug",
  moneroPrmReciveAddress: "Primäre Monero-Empfangsadresse",
  prmMoneroReciveAdressBegin:
    "Primäre Monero-Empfangsadressen beginnen mit {characters}.",
  moneroSecretViewKey: "Geheimer View Key von Monero",
  weNeedSecretViewKey:
    "Wir benötigen den geheimen View Key, um eingehende Transaktionen von Zuschauern sehen zu können. {whereToFind}",
  whereToFindViewKey: "Wo finde ich den View Key?",
  twitchChannelName: "Twitch-Kanalname",
  nameOfYourTwitchChannel:
    "Name deines Twitch-Kanals. Wird verwendet, um Trinkgeld-Transaktionen über den xmr_chat Twitch-Bot anzuzeigen.",
  optional: "Optional",
  minTipAmount: "Mindestbetrag (XMR)",
  tipPageAmountFormat: "Trinkgeldseiten-Betragsformat",
  determinesDefaultValue:
    "Bestimmt den Standardwert für das Betragsformat auf deiner Trinkgeldseite.",
  messageAmountFormat: "Nachrichtenbetragsformat",
  determinesAmountInObsAndTwitch:
    "Bestimmt das Betragsformat, das in OBS und Twitch angezeigt wird.",
  publicPage: "Öffentliche Seite (wird auf der Creator-Suchseite angezeigt).",
  continue: "Weiter",
  clickToUpload: "Zum Hochladen klicken",
  pageCreatedSuccessfully: "Seite wurde erfolgreich erstellt!",
  slugReservedUntil: "Dein Slug ist reserviert bis ",
  note: "Hinweis",
  pageUpdated: "Seite wurde aktualisiert!",
  loading: "Laden",
  available: "Verfügbar",
  unavailable: "Nicht verfügbar",
  fiatUnit: "Fiat-Einheit",
  fiatUnitHelp:
    "Einheit, die bei der Anzeige von Trinkgeldern verwendet wird, wenn der Trinkgeld-Anzeigemodus auf Fiat gesetzt ist.",
  tipExpiration: "Vervaldatum tip",
  tipExpirationHelp: "Tips worden automatisch verwijderd na de opgegeven duur.",
  tipExpirationWarning:
    "Als u de vervaldatum wijzigt, worden alle xmrchats verwijderd die ouder zijn dan de geselecteerde duur.",
  never: "Nooit",
  xDays: "{count} dag | {count} dagen",
  xMonths: "{count} maand | {count} maanden",
  paymentIsExpired:
    "Die Zahlung ist abgelaufen. Wenn Sie bereits bezahlt haben, kontaktieren Sie bitte den Support.",
  pageReservationExpired: "Die Seitenreservierung ist abgelaufen.",
  paymentCheckingDis: "Die Zahlungsüberprüfung wurde getrennt.",
  ifPaymentMade:
    "Wenn die Zahlung bereits erfolgt ist, wird sie in der Tipp-Liste angezeigt.",
  bioHelp: "Wird auf der Trinkgeldseite und in den Suchergebnissen angezeigt.",

  // STREAMER MENU
  menu: "Menü",
  myXmrchats: "Meine xmrchats",
  editTipPage: "Trinkgeld-Seite bearbeiten",
  accounts: "Konten",
  tipPage: "Trinkgeld-Seite",
  contentLinks: "Content-Links",
  obs: "OBS",
  show: "Anzeigen",
  hide: "Verstecken",
  youDontHavePage: "Du hast noch keine Seite",
  getStartedByCreatingPage: "Erstelle eine Seite für dich selbst",
  createNewPage: "Neue Seite erstellen",

  // ACCOUNT PAGE
  changePassword: "Passwort ändern",
  updateYourLoginPassword: "Aktualisiere dein Anmeldepasswort",
  currentPassword: "Aktuelles Passwort",
  newPassword: "Neues Passwort",
  repeatNewPassword: "Neues Passwort wiederholen",
  contactSupportForEmailChange:
    "Kontaktiere den Support, um deine E-Mail-Adresse zu ändern.",

  // EDIT PAGE
  editPage: "Seite bearbeiten",
  customizeYourTipPage: "Passe deine Trinkgeld-Seite an.",
  errorCreatingUpdatingPage: "Fehler beim Erstellen/Aktualisieren der Seite",
  tipAmountSuggestions: "Trinkgeldbetrag-Vorschläge",
  pageWillBeAvailableAt: "Deine Seite wird unter {url} verfügbar sein",
  noSuggestedAmountsAdded:
    "Es wurden keine Beträge vorgeschlagen. Klicke auf die Schaltfläche unten, um neue Stufen hinzuzufügen.",
  addTier: "Stufe hinzufügen",
  remove: "Entfernen",
  name: "Name",
  amountUSD: "Betrag (USD)",
  amountFiat: "Betrag ( {fiat} )",

  // CONTENT LINKS
  brandName: "Markenname",
  brandNameHelp: "Name der Marke/des Inhalts. Kann vom Slug abweichen.",
  searchTerms: "Suchbegriffe",
  searchTermsHelp:
    "Die Creator-Suche liefert Ergebnisse basierend auf dem Seiten-Slug, Namen und Schlüsselwörtern in dieser Liste.",
  contentLinksDescription: "Name, Suchbegriffe und Content-Links",
  contentLinksSecondDescription:
    "Links zu Deinen Social-Media-Seiten oder Websites. Um einen Wert zurückzusetzen, lasse das Feld leer.",
  saveChanges: "Änderungen speichern",
  notUrlWithMessage: "Gib nur den Namen ein, nicht den vollständigen Link.",
  changesAreSaved: "Änderungen wurden gespeichert.",
  errorSavingChanges: "Fehler beim Speichern der Änderungen.",
  xUsername: "{platform} Benutzername",
  websiteLink: "Website-Link",
  youtubeChannel: "Youtube-Kanal",
  podcastRssLink: "Podcast-RSS-Link",
  nostrPubKey: "Nostr öffentlicher Schlüssel (npub)",
  rumbleLiveStreamApi: "Rumble-Livestream-API",
  rumbleLiveStreamApiHelp:
    "Rumble-Livestream-API aus {guide}. XMRChat verwendet diese URL, um die aktuellen Livestreams deines Kanals abzurufen.",
  thisGuide: "dieser Anleitung",

  // OBS
  obsDescription: "OBS-Widget und Einstellungen.",
  settingsAreUpdated: "Einstellungen wurden aktualisiert.",
  errorUpdatingSettings: "Fehler beim Aktualisieren der Einstellungen",
  toUseXMRchatsOnOBS:
    "Um XMRChat in OBS zu verwenden, kopiere den Link zur OBS-Seite und füge ihn in 'Browser' der OBS-Quellen ein.",
  copyOBSLink: "OBS-Seitenlink kopieren",
  obsPageSettings: "OBS-Seiteneinstellungen",
  preventMessagesFromFading: "Verhindern, dass Nachrichten verblassen",
  preventMessagesFromFadingDescription:
    "Wenn aktiv, bleiben die letzten Trinkgeld-Transaktionen auf dem Bildschirm, ansonsten wird jede Nachricht 60 Sekunden lang angezeigt.",
  playSound: "Ton abspielen",
  playSoundDescription:
    "Spielt einen Ton auf der OBS-Seite ab, wenn eine neue Trinkgeld-Transaktion erscheint.",
  playSoundDescriptionLocal:
    "Wenn du diese Funktion lokal in deinem Browser testest, klicke nach dem Öffnen des OBS-Tabs irgendwo auf die Seite. Andernfalls spielt der Browser keinen Ton ab, da keine Interaktionen mit dem geöffneten Tab stattgefunden haben.",
  autoShowTips: "Automatisch Trinkgeld-Transaktionen anzeigen",
  autoShowTipsDescription:
    "Wenn aktiviert, werden Trinkgeld-Transaktionen automatisch auf der OBS-Seite für 60 Sekunden angezeigt.",

  // INTEGRATIONS PAGE
  integrations: "Integrationen",
  integrationsTitle: "Integrationen",
  integrationsDes: "Verwalte deine Integrationen",
  notConnected: "Nicht verbunden.",
  waitingForVerification: "Warte auf Verifizierung.",
  connected: "Verbunden.",
  connect: "Verbinden",
  disconnect: "Trennen",
  simplexDescription: "Der erste Messenger ohne Benutzer-IDs.",
  simplexIntegration: "SimpleX-Integration",
  enterYourSimplexLink:
    "Gib deinen SimpleX-Verbindungslink ein und klicke dann auf 'Verbinden'. Das XMRChat-Konto sendet eine Verbindungsanfrage an dein SimpleX-Konto. Nach dem Akzeptieren der Anfrage erhältst du einen Code. Gib den Code ein, um die Verbindung abzuschließen.",
  simplexIsConnectedTo: "SimpleX ist mit dem Konto „{name}“ verbunden.",
  acceptRequestInSimplex:
    "Akzeptiere die Verbindungsanfrage in der SimpleX-App und gib den erhaltenen Code ein.",
  confirmCode: "Code bestätigen",
  success: "Erfolg",
  openSimplexAndAccept:
    "Öffne die SimpleX-App auf deinem Gerät und akzeptiere die Verbindung vom XMRChat-Konto.",
  error: "Fehler",
  simplexIsConnected: "SimpleX ist verbunden.",
  simplexDisconnected: "SimpleX wurde getrennt.",
  simplexLink: "SimpleX-Link",
  signalDescription:
    "Sag 'Hallo' zu einem anderen Messenger-Erlebnis. Ein unerwarteter Fokus auf Datenschutz, kombiniert mit allen Funktionen, die du erwartest.",
  signalIsConnected: "Signal ist verbunden.",
  signalIsDisconnected: "Signal wurde getrennt.",
  signalIntegration: "Signal-Integration",
  signalIsConnectedTo: "Signal ist mit dem Konto {number} verbunden.",
  enterCodeinSignalApp:
    "Gib den Code ein, der dir in der Signal-App gesendet wurde.",
  enterSignalNumOrId:
    "Gib deine Signal-Telefonnummer oder ID ein. Wir senden einen Code zur Verifizierung.",
  signalPhoneNumOrId: "Signal-Telefonnummer oder ID",
  sendCode: "Code senden",
  code: "Code",

  // NOTIFICATIONS-PREFERENCES PAGE
  notifications: "Benachrichtigungen",
  manageYourNotifs: "Verwalte deine Benachrichtigungen",
  comingSoon: "Demnächst verfügbar",
  featureAvailableSoon: "Diese Funktion ist bald verfügbar.",
  minNotifsThreshold: "Mindestbenachrichtigungsgrenze",
  minNotifsThresholdHelp:
    "Der Mindestbetrag eines XMR-Tipps, der eine Benachrichtigung auslöst.",
  connectInIntegrations:
    "Verbinde dich in {integrations}, um dies zu aktivieren.",
  dailySummaryTimeHelp:
    "Uhrzeit, zu der tägliche Zusammenfassungen gesendet werden.",
  notifsPreferencesSaved: "Benachrichtigungseinstellungen gespeichert.",
  newTip: "Neues Trinkgeld",
  receiveNotifsWhenTipReceived:
    "Benachrichtigung erhalten, wenn ein neues Trinkgeld eingeht",
  dailySummary: "Tägliche Zusammenfassung",
  receiveDailySummary: "Tägliche Zusammenfassung deiner Trinkgelder erhalten",
  receiveNotifsViaEmail: "Benachrichtigungen per E-Mail erhalten",
  receiveNotifsViaSimplex: "Benachrichtigungen über SimpleX erhalten",
  receiveNotifsViaSignal: "Benachrichtigungen über Signal erhalten",

  // HEAD
  head: {
    description:
      "Zuschauer, sendet Nachrichten und Trinkgelder einfach und privat. Creator, behaltet fast alle eure Trinkgelder anstatt 30–50 % an Big Tech abzugeben.",
    title: "Nachricht und Trinkgeld mit Monero",
    XMRChatTip: "XMRChat – unterstütze {path} mit Monero",
    tip: "Trinkgeld an {path}",
  },
  moneroSuperchats: "Monero Superchats : XMRChat",
  emailVerification: "E-Mail-Verifizierung",
  forgotPassword: "Passwort vergessen",
  signUp: "Registrieren",

  // LIVE STREAM
  liveNow: "Jetzt live",
  noStreamersLive: "Derzeit sind keine Streamer live.",
  liveOn: "Live auf",

  // COHOSTS

  cohost: "Co-Host",
  cohostPage: "Co-Host-Seite",
  cohostDes: "Verwalte {path} xmrchats",
  inviteCohosts: "Co-Hosts einladen",
  noCohosts: "Du hast noch keine Co-Hosts",
  cohostsCanHelpYou:
    "Co-Hosts sind Benutzer, die dir helfen können, deine xmrchats zu verwalten.",
  youCanInviteCohosts:
    "Du kannst Co-Hosts über die Schaltfläche unten einladen.",
  removeYourselfFromCohost:
    "Bist du sicher, dass du dich selbst als Co-Host dieser Seite entfernen möchtest? Du musst erneut eingeladen werden, um wieder Co-Host der Seite zu werden.",
  youRemovedFromCohost: "Du wurdest als Co-Host der Seite entfernt.",
  removeFromCohost: "Vom Co-Host entfernen",
  removeCohost: "Co-Host entfernen",
  removeThisCohost:
    "Bist du sicher, dass du diesen Co-Host entfernen möchtest?",
  cohostRemoved: "Co-Host entfernt",
  invitationCancelled: "Einladung abgebrochen",
  expired: "Abgelaufen",
  expires: "läuft ab",
  pending: "ausstehend",

  // TIP TIERS
  tipTiers: "Tipp-Stufen",
  minAmount: "Mindestbetrag:",
  close: "Schließen",
  minXMR: "Mind. (XMR)",
  color: "Farbe",
  sound: "Ton",
  wantToDeleteTier: "Bist du sicher, dass du diese Stufe löschen möchtest?",
  deleteTier: "Stufe löschen",
  tierDeleted: "Stufe gelöscht",
  createTier: "Stufe erstellen",
  createNewTier: "Neue Stufe erstellen",
  edit: "Bearbeiten",
  delete: "Löschen",
  pageTierUpdated: "Seitenstufe aktualisiert.",
  pageTierCreated: "Seitenstufe erstellt.",
  minAmountXMR: "Mindestbetrag (XMR)",
  description: "Beschreibung",
  soundOBS: "Ton (OBS)",
  uploaded: "Hochgeladen:",
  clear: "Leeren",
  save: "Speichern",
  editTier: "Stufe bearbeiten",
  editTierDetails: "Stufendetails bearbeiten",
  manageYourTipTiers: "Verwalte deine Tipp-Stufen",

  // TIP LIST
  tipList: {
    reply: "Antwort:",
    replyToTip: "Auf Trinkgeld antworten:",
    private: "Privat:",
    obs: "OBS:",
    message: "Nachricht:",
  },
  reply: "Antworten",
  replyColors: "Antwortfarben",
  backgroundColor: "Hintergrundfarbe",
  textColor: "Textfarbe",
  repliedMessagePreview: "Vorschau der beantworteten Nachricht",
  action: "Aktion",
  premium: "Premium",
};
