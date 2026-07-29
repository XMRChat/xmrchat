export default {
  validations: {
    required: "Kenttä on pakollinen",
    email: "Virheellinen sähköpostiosoite",
    numberic: "Täytyy olla numero",
    minLength: "Vähintään {length} merkkiä.",
    maxLength: "Enintään {length} merkkiä.",
    minValue: "Vähimmäisarvo on {value}.",
    sameAs: "Täytyy vastata kenttää {otherName}",
    someFieldsAreIncorrect: "Jotkut kentät on täytetty virheellisesti.",
    url: "Virheellinen linkki.",
    notUrl: "Ei saa olla linkki.",
    streamerSlug:
      "Polun saa sisältää vain pieniä kirjaimia, numeroita, alaviivoja ja väliviivoja.",
    moneroPrimaryAddress:
      "Monero ensisijainen osoite on virheellinen. Sen pitää alkaa {characters}.",
  },

  account: "Tili",
  logout: "Kirjaudu ulos",
  login: "Kirjaudu sisään",
  send: "Lähetä",
  email: "Sähköposti",
  search: "Haku",
  password: "Salasana",
  confirm: "Vahvista",
  reconnect: "Yhdistä uudelleen",
  confirmPassword: "Vahvista salasana",
  signupInstead: "Luo tili",
  signupFailed: "Rekisteröinti epäonnistui",
  signupSuccessfull: "Rekisteröinti onnistui",
  noItems: "Ei kohteita",
  signupSuccessfullDescription:
    "Siirry sähköpostissa lähetettyyn linkkiin vahvistaaksesi tilisi.",
  loginInstead: "Kirjaudu sisään",
  loginFailed: "Kirjautuminen epäonnistui",
  signup: "Luo tili",
  forgetPassword: "Unohtuiko salasana?",
  loginDescription: "Kirjaudu sisään päästäksesi omaan sivuusi.",
  resetPassword: "Salasanan uusiksi",
  enterYourNewPassword: "Kirjoita uusi salasana",
  passwordResetFailed: "Salasanan uusiksi epäonnistui",
  passwordUpdated: "Salasana onnistuneesti päivitetty.",
  weSentYouAnEmail:
    "Lähetimme sinulle sähköpostin {email}, seuraa linkkiä sähköpostissa uusiksi salasanaasi.",
  changeEmail: "Vaihda sähköposti",
  enterEmailToResetPassword: "Kirjoita sähköposti uusiksi salasanaasi.",
  creatorLogin: "Sisäänkirjautuminen sisällöntuottajille",
  goToHomePage: "Siirry etusivulle",
  searchCreators: {
    title: "Etsi Sisällöntuottajia",
    description: "Etsi sisällöntuottajia, joilla on julkinen sivu xmrchatissa.",
  },
  typePageName: "Kirjoita sivun nimi...",
  contactUs: "Ota Yhteyttä",
  here: "tässä",
  backToHome: "Takaisin kotiin",
  somethingWentWrong: "Jotain meni pieleen!",

  xmrchat: "XMRChat",
  heroDescription: "Tue suosikkistriimaajaasi Monerolla.",
  findCreators: "Etsi sisällöntuottajia",
  creatorsStartHere: "Sisällöntuottajille: Aloita tästä",

  FAQ: {
    title: "Usein kysytyt kysymykset",
    whyTipWithXMRChat: "Miksi käyttää XMRChatia tippaukseen?",
    howToUseXMRChat: "Miten käytän XMRChat?",
    whyUseMonero: "Miksi XMRChat käyttää Moneroa?",
    whereToGetMonero: "Mistä saan Moneroa?",
  },

  earnMore: {
    title: "Ansaitse enemmän",
    description:
      "YouTube vie 30–50 % Superchatista. Rumble ottaa 20 % Rantsista. XMRChatilla saat 100 % tipeistä suoraan Monero-lompakkoosi.",
  },
  censorshipResistant: {
    title: "Sensuurinkestävä",
    description:
      "Monerolla saat tulot ilman teknologiajättien sääntöjä tai rajoituksia.",
  },
  corruptionResistant: {
    title: "Korruptiota kestävä",
    description:
      "Monet hallinnot jäädyttävät tilejä. Monero antaa sinun olla oma pankkisi ja hallita talouttasi.",
  },
  private: {
    title: "Yksityinen",
    description:
      "Katsojat voivat tipata anonyymisti – ilman pelkoa tunnistamisesta.",
  },
  quickAndEasy: {
    title: "Nopea ja helppo",
    description:
      "Ei tiliä, ei sähköpostivahvistuksia, ei korttitietoja. Fani syöttää nimen, viestin, summan ja lähettää XMR:n.",
  },
  openSource: {
    title: "Avoin lähdekoodi",
    description:
      "XMRChat on avointa lähdekoodia. Katso koodi osoitteessa {github}.",
  },

  lowFees: {
    title: "Alhaiset maksut",
    description: "Moneron siirtomaksut ovat vain muutamia senttejä.",
  },
  privateMonero: {
    title: "Yksityisyys",
    description:
      "Toisin kuin useimmat kryptot, Monero piilottaa tapahtumatiedot. Lähettäjää, vastaanottajaa eikä summaa näy lohkoketjussa.",
  },
  accepted: {
    title: "Hyväksytty",
    description:
      "Sinun ei tarvitse myydä Moneroa vaihtopalvelussa. Voit ostaa Monerolla myös suoraan {xmrbazaar}:sta ja {monerica}:sta.",
  },
  andMore: {
    title: "Ja paljon muuta",
    description: "Lue lisää Monerosta osoitteessa {getmonero}.",
  },
  forContentCreators: {
    title: "Sisällöntuottajille",
    description: {
      main: `Napsauta "Sisällöntuottajat aloittavat tästä" -painiketta. Luo XMRChat-tili. Luo Tippisivu. Kerro yleisöllesi tippisivusi URL-osoite.`,
      tutorialLink:
        "Alex Anarcholla on loistava opetusohjelma XMRChatin käytöstä {youtube}-palvelussa.",
      ifStreamyard: "Jos käytät Streamyardia:",
      ifOBS: "Jos käytät OBS:ia:",
      ifLiveJoiner: "Jos käytät LiveJoineria:",
      streamyard: `Siirry "Muokkaa tippisivua" -valikkoon. Varmista, että olet lisännyt Twitch-kanavasi käyttäjänimen. Kun aloitat striimin Streamyardissa, lisää Twitch kohteena. XMRChat-botti (xmr-chat Twitchissä) lähettää tippiviestin Twitchiin ja voit näyttää sen ruudullasi Streamyardista. xmrchat-botin logo näyttää parhaalta "Minimal" -asetuksella.`,
      obs: `Siirry "OBS" -valikkoon. Klikkaa "Kopioi OBS-sivun linkki". Lisää selainlähde OBS:ään ja liitä linkki.`,
      liveJoiner:
        "Valitse XMRChat tuettujen alustojen luettelosta ja syötä XMRChat-tippisivusi polku tai URL-osoite.",
    },
  },
  forFans: {
    title: "Faneille",
    description:
      "Siirry suosikkisisällöntuottajasi tippisivun URL-osoitteeseen. Kirjoita käyttäjänimesi ja viesti, valitse tippimäärä ja lähetä. Tippitiedot näytetään ponnahdusikkunassa. xmrchat näytetään striimaajan sivulla tippin lähettämisen jälkeen.",
  },
  whereToGetMonero: {
    cakeWallet: "Osta tai vaihda Moneroa {cakeWallet}:ssa.",
    stealthex:
      "Voit vaihtaa muut kryptosi Moneroon (XMR) sivustoilla kuten {stealthex} ja {kycnot}.",
    haveno: "Osta Moneroa ilman KYC:tä {haveno}:sta.",
    kraken: "Osta Moneroa KYC:llä {kraken}:sta.",
    xmrbazaar:
      "Myy tavaroita tai palveluita Monerolla osoitteessa {xmrbazaar}.",
    gupax: "Louhi Moneroa käyttäen {gupax}:ia.",
    kunoAnneMedia: "Luo Monero-varainkeruu {kunoAnneMedia}:ssa.",
    monerica:
      "Hyväksy Monero liiketoiminnassasi ja listaa itsesi {monerica}, {monerodirectory} ja {xmrbazaar} ja {bankexit} sivuille.",
  },

  tipName: "Nimi",
  tipAmount: "Summa",
  tipMessage: "Viesti",
  tipPrivate: "Yksityinen",
  tipDate: "Päivämäärä",
  tipUpdated: "Vinkki päivitetty!",
  tipPrivateTooltip: "Nimi ja viesti näkyvät vain striimaajalle.",
  tipCoin: "Kryptovaluutta",
  tipCoinPlaceholder: "XMR",
  sendTip: "Lähetä tippi",
  tipCreationFailed: "Tipin luonti epäonnistui",
  tipNamePlaceholder: "Anna nimesi",
  tipAmountPlaceholder: "Anna summa",
  tipMessagePlaceholder: "Kirjoita viesti",
  tipPrivatePlaceholder: "Yksityinen",
  tipSwapUnavailable: "Vaihdetta ei ole tällä hetkellä saatavilla.",
  tipSwapMinimum: "Vähintään {min} vaihdettavaksi",
  tipMinimum: "Vähintään {min}",
  recentTips: "Viimeisimmät tipit",
  tipDisplayValueTooltip: "Näytä tippi XMR tai {fiat} muotoisena",
  noRecentTips: "Ei uusia tippejä!",
  pageDeactivatedAlert:
    "Sivusi on poistettu käytöstä eikä se ole julkisesti näkyvissä. Ota yhteyttä tukeen saadaksesi lisätietoja.",
  tipPrivateMessage: "Yksityinen viesti",
  tipWalletWarningTitle: "Älä lähetä tippejä striimaajan lompakosta.",
  tipWalletWarningDescription:
    "Älä käytä rekisteröityä striimaajan lompakkoa – vaihtorahat voivat vääristää näkyvää summaa.",
  tipWalletMinimum:
    "Lähetä vähintään {minimumAmount} XMR seuraavaan osoitteeseen, jotta tippisi näkyy xmrchatissa.",
  partialAmountReceived:
    "{partialAmount} vastaanotettu toistaiseksi, lähetä loput {remainingAmount}.",
  openInMyWallet: "Avaa lompakossani",
  cancel: "Peruuta",
  copyAddress: "Kopioi osoite",
  waitingForPayment: "Odotetaan maksua",

  contactUsDescription: "Ota meihin yhteyttä kysymyksillä tai palautteella.",
  contactUsForm: "Yhteydenottolomake",
  contactUsFormDescription:
    "Ota meihin yhteyttä kysymyksillä tai palautteella.",
  contactUsFormButton: "Lähetä viesti",
  emailUsDirectly: "Lähetä meille suoraan sähköpostia",
  followUsOnTwitter: "Seuraa meitä Twitterissä",
  twitter: "Twitter",

  // CREATE PAGE
  createPage: "Luo sivu",
  getStartedCreatingPage: "Aloita luomalla striimaajasivu",
  home: "Etusivu",
  logo: "Logo",
  logoRatio: "1:1 suhde",
  bannerImage: "Bannerikuva",
  bannerImageBestRatio: "Paras koko on 3:1",
  yourId: "Sinun ID",
  pageSlug: "Sivun osoite (slug)",
  moneroPrmReciveAddress: "Monero ensisijainen vastaanotto-osoite",
  prmMoneroReciveAdressBegin:
    "Ensisijäiset Monero-vastaanotto-osoitteet alkavat merkillä {characters}.",
  moneroSecretViewKey: "Monero salainen katseluavain",
  weNeedSecretViewKey:
    "Tarvitsemme salaisen katseluavaimen, jotta voimme nähdä katsojien maksut. {whereToFind}",
  whereToFindViewKey: "Mistä löydän katseluavaimen?",
  twitchChannelName: "Twitch-kanavan nimi",
  nameOfYourTwitchChannel:
    "Twitch-kanavasi nimi. Käytetään tippien näyttämiseen streamissä xmr_chat Twitch-botin kautta.",
  optional: "Valinnainen",
  minTipAmount: "Minimi tippi (XMR)",
  tipPageAmountFormat: "Tippisivun summan muoto",
  determinesDefaultValue:
    "Määrittää oletusarvon, joka valitaan tippisivun summan muodolle.",
  messageAmountFormat: "Viestin summan muoto",
  determinesAmountInObsAndTwitch:
    "Määrittää summan muodon, joka näytetään OBS:ssä ja Twitchissä.",
  publicPage: "Julkinen sivu (näkyy tekijähakusivulla).",
  continue: "Jatka",
  clickToUpload: "Klikkaa ladataksesi",
  pageCreatedSuccessfully: "Sivu luotiin onnistuneesti!",
  slugReservedUntil: "Slug on varattu asti ",
  note: "Huom",
  pageUpdated: "Sivu päivitetty!",
  loading: "Lataa",
  available: "Saatavilla",
  unavailable: "Ei saatavilla",
  fiatUnit: "Fiat-yksikkö",
  fiatUnitHelp:
    "Yksikkö, joka näytetään tippisivun tippien määränä, kun tippienäkymä on fiat.",
  tipExpiration: "Tipin vanheneminen",
  tipExpirationHelp:
    "Tipit poistetaan automaattisesti määritetyn ajan kuluttua.",
  tipExpirationWarning:
    "Vanhenemisen muuttaminen poistaa kaikki xmrchatit, jotka ovat vanhempia kuin valittu kesto.",
  never: "Ei koskaan",
  xDays: "{count} päivä | {count} päivää",
  xMonths: "{count} Kuukausi | {count} Kuukautta",
  paymentIsExpired:
    "Maksu on vanhentunut. Jos olet jo maksanut, ota yhteyttä tukeen.",
  pageReservationExpired: "Sivun varaus on vanhentunut.",
  paymentCheckingDis: "Maksun tarkistus on katkaistu.",
  ifPaymentMade: "Jos maksu on jo tehty, se näkyy vinkkilistassa.",
  bioHelp: "Näkyy tippisivulla ja hakutuloksissa.",

  // STREAMER MENU
  menu: "Valikko",
  myXmrchats: "Omat xmrchats",
  editTipPage: "Muokkaa Tippisivua",
  accounts: "Tilit",
  tipPage: "Tippisivu",
  contentLinks: "Sisältölinkit",
  obs: "OBS",
  show: "Näytä",
  hide: "Piilota",
  youDontHavePage: "Sinulla ei ole sivua vielä",
  getStartedByCreatingPage: "Aloita luomalla sivu sinulle",
  createNewPage: "Luo Uusi Sivu",

  // ACCOUNT PAGE
  changePassword: "Vaihda Salasana",
  updateYourLoginPassword: "Päivitä kirjautumissalasana",
  currentPassword: "Nykyinen salasana",
  newPassword: "Uusi salasana",
  repeatNewPassword: "Toista uusi salasana",
  contactSupportForEmailChange:
    "Ota yhteyttä tukeen saadaksesi sähköpostiosoitteen muuttamista varten.",

  // EDIT PAGE
  editPage: "Muokkaa Sivua",
  customizeYourTipPage: "Mukauta tippisivusi.",
  errorCreatingUpdatingPage: "Virhe sivun luonnissa/päivityksessä",
  tipAmountSuggestions: "Tippimäärän Ehdotukset",
  pageWillBeAvailableAt: "Sivusi on saatavilla osoitteessa {url}",
  noSuggestedAmountsAdded:
    "Ei lisättyjä ehdotettuja määriä. Lisää uusia tasoja napsauttamalla alla olevaa painiketta.",
  addTier: "Lisää Taso",
  remove: "Poista",
  name: "Nimi",
  amountUSD: "Määrä (USD)",
  amountFiat: "Määrä ( {fiat} )",

  // CONTENT LINKS
  brandName: "Brändin Nimi",
  brandNameHelp: "Brändin/sisällön nimi. Voi olla eri kuin slug.",
  searchTerms: "Hakusanat",
  searchTermsHelp:
    "Sisällöntuottajahaku palauttaa tulokset sivun slugin, nimen ja tämän listan avainsanojen perusteella.",
  contentLinksDescription: "Nimi, Hakusanat ja Sisältölinkit",
  contentLinksSecondDescription:
    "Linkit sosiaalisen median sivuillesi tai verkkosivustoillesi. Nollataksesi arvon, jätä kenttä tyhjäksi.",
  saveChanges: "Tallenna Muutokset",
  notUrlWithMessage: "Syötä vain nimi, ei koko linkkiä.",
  changesAreSaved: "Muutokset tallennettu.",
  errorSavingChanges: "Virhe muutosten tallentamisessa.",
  xUsername: "{platform} käyttäjätunnus",
  websiteLink: "Verkkosivun linkki",
  youtubeChannel: "Youtube-kanava",
  podcastRssLink: "Podcast-RSS-linkki",
  nostrPubKey: "Nostr-julkinen avain",
  rumbleLiveStreamApi: "Rumble-live-lähetysrajapinta",
  rumbleLiveStreamApiHelp:
    "Rumble-live-lähetysrajapinta lähteestä {guide}. XMRChat käyttää tätä URL-osoitetta kanavasi nykyisten live-lähetysten hakemiseen.",
  thisGuide: "tästä oppaasta",

  // OBS
  obsDescription: "OBS-widget ja asetukset.",
  settingsAreUpdated: "Asetukset päivitetty.",
  errorUpdatingSettings: "Virhe asetusten päivityksessä",
  toUseXMRchatsOnOBS:
    "Käyttääksesi XMRChatia OBS:ssä, kopioi linkki OBS-sivulle ja lisää se OBS-lähteiden 'Selain'-kohtaan.",
  copyOBSLink: "Kopioi OBS-sivun Linkki",
  obsPageSettings: "OBS-sivun Asetukset",
  preventMessagesFromFading: "Estä viestien häivytys",
  preventMessagesFromFadingDescription:
    "Kun aktiivinen, pitää viimeisimmät tippit näytöllä, muuten jokainen viesti näytetään 60 sekuntia.",
  playSound: "Toista Ääni",
  playSoundDescription: "Toistaa äänen OBS-sivulla, kun uusi tippi ilmestyy.",
  playSoundDescriptionLocal:
    "Jos testaat tätä toiminnallisuutta paikallisesti selaimessa, avattuasi obs-välilehden, varmista että napsautat jossain sivulla. Muuten selain ei toista ääntä avoimen välilehden kanssa ei ole vuorovaikutusta.",
  autoShowTips: "Näytä vinkit automaattisesti",
  autoShowTipsDescription:
    "Jos aktiivinen, vinkit näytetään automaattisesti OBS-sivulla 60 sekunnin ajan.",

  // INTEGRATIONS PAGE
  integrations: "Integraatiot",
  integrationsTitle: "Integraatiot",
  integrationsDes: "Hallinnoi integraatioitasi",
  notConnected: "Ei yhdistetty.",
  waitingForVerification: "Odotetaan vahvistusta.",
  connected: "Yhdistetty.",
  connect: "Yhdistä",
  disconnect: "Katkaise yhteys",
  simplexDescription: "Ensimmäinen viestisovellus ilman käyttäjätunnuksia.",
  simplexIntegration: "SimpleX-integraatio",
  enterYourSimplexLink:
    "Syötä SimpleX-yhteyslinkkisi ja napsauta 'Yhdistä'. XMRChat-tili lähettää yhdistyspyynnön SimpleX-tilillesi. Hyväksy pyyntö, niin saat koodin. Syötä koodi yhteyden muodostamiseksi.",
  simplexIsConnectedTo: 'SimpleX on yhdistetty tiliin "{name}".',
  acceptRequestInSimplex:
    "Hyväksy yhdistyspyyntö SimpleX-sovelluksessa ja syötä saamasi koodi.",
  confirmCode: "Vahvista koodi",
  success: "Onnistui",
  openSimplexAndAccept:
    "Avaa SimpleX-sovellus laitteellasi ja hyväksy yhteys XMRChat-tililtä.",
  error: "Virhe",
  simplexIsConnected: "SimpleX on yhdistetty.",
  simplexDisconnected: "SimpleX-yhteys katkaistu.",
  simplexLink: "SimpleX-linkki",
  signalDescription:
    "Sano 'hei' erilaiselle viestintäkokemukselle. Yllättävä yksityisyyden painotus yhdistettynä kaikkiin odottamiisi ominaisuuksiin.",
  signalIsConnected: "Signal on yhdistetty.",
  signalIsDisconnected: "Signal-yhteys katkaistu.",
  signalIntegration: "Signal-integraatio",
  signalIsConnectedTo: "Signal on yhdistetty tiliin {number}.",
  enterCodeinSignalApp: "Syötä Signal-sovellukseen lähetetty koodi.",
  enterSignalNumOrId:
    "Syötä Signal-puhelinnumerosi tai ID. Lähetämme tähän numeroon vahvistuskoodin.",
  signalPhoneNumOrId: "Signal-puhelinnumero tai ID",
  sendCode: "Lähetä koodi",
  code: "Koodi",

  // NOTIFICATIONS-PREFERENCES PAGE
  notifications: "Ilmoitukset",
  manageYourNotifs: "Hallinnoi ilmoituksiasi",
  comingSoon: "Tulossa pian",
  featureAvailableSoon: "Tämä ominaisuus on saatavilla pian.",
  minNotifsThreshold: "Ilmoitusten vähimmäisraja",
  minNotifsThresholdHelp: "Pienin XMR-juomaraha, joka laukaisee ilmoituksen.",
  connectInIntegrations: "Yhdistä kohdassa {integrations} ottaaksesi käyttöön.",
  dailySummaryTimeHelp:
    "Aika, jolloin päivittäiset yhteenvetoilmoitukset lähetetään.",
  notifsPreferencesSaved: "Ilmoitusasetukset tallennettu.",
  newTip: "Uusi juomaraha",
  receiveNotifsWhenTipReceived:
    "Vastaanota ilmoitus, kun saat uuden juomarahan",
  dailySummary: "Päivittäinen yhteenveto",
  receiveDailySummary: "Vastaanota päivittäinen yhteenveto juomarahoistasi",
  receiveNotifsViaEmail: "Vastaanota ilmoitukset sähköpostitse",
  receiveNotifsViaSimplex: "Vastaanota ilmoitukset SimpleX:n kautta",
  receiveNotifsViaSignal: "Vastaanota ilmoitukset Signal:n kautta",

  // HEAD
  head: {
    description:
      "Katsojat, lähettäkää viestejä ja tippiä helposti ja yksityisesti. Striimaajat, pitäkää lähes kaikki tipit itsellänne sen sijaan, että annatte 30–50 % suurille teknologiayrityksille.",
    title: "Lähetä viesti ja tippaa Monerolla",
    XMRChatTip: "XMRChat – Tippaa {path} Monerolla",
    tip: "Tippaa {path}",
  },
  moneroSuperchats: "Monero Superchats : XMRChat",
  emailVerification: "Sähköpostivahvistus",
  forgotPassword: "Unohditko salasanan?",
  signUp: "Rekisteröidy",

  // LIVE STREAMS
  liveNow: "Lähetys käynnissä nyt",
  noStreamersLive: "Yhtään striimaajaa ei ole nyt livenä.",
  liveOn: "Livenä palvelussa",

  // COHOSTS
  cohost: "Yhteisjuontaja",
  cohostPage: "Yhteisjuontajan sivu",
  cohostDes: "Hallinnoi {path} xmrchats",
  inviteCohosts: "Kutsu yhteisjuontajia",
  noCohosts: "Sinulla ei ole vielä yhteisjuontajia",
  cohostsCanHelpYou:
    "Yhteisjuontajat ovat käyttäjiä, jotka voivat auttaa sinua hallitsemaan xmrchats-keskustelujasi.",
  youCanInviteCohosts:
    "Voit kutsua yhteisjuontajia alla olevalla painikkeella.",
  removeYourselfFromCohost:
    "Haluatko varmasti poistaa itsesi yhteisjuontajista? Sinut täytyy kutsua uudelleen liittyäksesi takaisin.",
  youRemovedFromCohost: "Sinut poistettiin yhteisjuontajista.",
  removeFromCohost: "Poista yhteisjuontajasta",
  removeCohost: "Poista yhteisjuontaja",
  removeThisCohost: "Haluatko varmasti poistaa tämän yhteisjuontajan?",
  cohostRemoved: "Yhteisjuontaja poistettu",
  invitationCancelled: "Kutsu peruutettu",
  expired: "Vanhentunut",
  expires: "vanhenee",
  pending: "odottaa",

  // TIP TIERS
  tipTiers: "Tippitasot",
  minAmount: "Minimimäärä:",
  close: "Sulje",
  minXMR: "Min. (XMR)",
  color: "Väri",
  sound: "Ääni",
  wantToDeleteTier: "Haluatko varmasti poistaa tämän tason?",
  deleteTier: "Poista taso",
  tierDeleted: "Taso poistettu",
  createTier: "Luo taso",
  createNewTier: "Luo uusi taso",
  edit: "Muokkaa",
  delete: "Poista",
  pageTierUpdated: "Taso päivitetty.",
  pageTierCreated: "Taso luotu.",
  minAmountXMR: "Minimi (XMR)",
  description: "Kuvaus",
  soundOBS: "Ääni (OBS)",
  uploaded: "Ladattu:",
  clear: "Tyhjennä",
  save: "Tallenna",
  editTier: "Muokkaa tasoa",
  editTierDetails: "Muokkaa tason tietoja",
  manageYourTipTiers: "Hallitse tippitasojasi",

  // TIP LIST
  tipList: {
    reply: "Vastaus:",
    replyToTip: "Vastaa tippiin:",
    private: "Yksityinen:",
    obs: "OBS:",
    message: "Viesti:",
  },
  reply: "Vastaa",
  replyColors: "Vastauksen värit",
  backgroundColor: "Taustaväri",
  textColor: "Tekstin väri",
  repliedMessagePreview: "Vastatun viestin esikatselu",
  action: "Toiminto",
  premium: "Premium",
};
