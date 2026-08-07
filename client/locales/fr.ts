export default {
  validations: {
    required: "Champ obligatoire",
    email: "Email invalide",
    numberic: "Doit être un nombre",
    minLength: "Doit contenir au moins {length} caractères.",
    maxLength: "Ne doit pas dépasser {length} caractères.",
    minValue: "Doit être au moins {value}.",
    sameAs: "Doit être identique à {otherName}",
    someFieldsAreIncorrect: "Certains champs ne sont pas correctement remplis.",
    url: "Le lien est invalide.",
    notUrl: "Ne doit pas être un lien.",
    streamerSlug:
      "Le chemin peut contenir uniquement des lettres minuscules, des chiffres, des traits de soulignement et des traits de soulignement.",
    moneroPrimaryAddress:
      "L'adresse principale est invalide. Elle doit commencer par {characters}.",
  },

  account: "Compte",
  logout: "Déconnexion",
  login: "Connexion",
  send: "Envoyer",
  loginFailed: "Échec de la connexion",
  email: "Email",
  search: "Rechercher",
  password: "Mot de passe",
  confirm: "Confirmer",
  reconnect: "Reconnecter",
  confirmPassword: "Confirmer le mot de passe",
  signupInstead: "S'inscrire à la place",
  loginInstead: "Se connecter à la place",
  signup: "Inscription",
  signupFailed: "Échec de l'inscription",
  signupSuccessfull: "Inscription réussie",
  noItems: "Aucun élément",
  signupSuccessfullDescription:
    "Veuillez suivre le lien envoyé à votre email pour vérifier votre compte.",
  forgetPassword: "Mot de passe oublié ?",
  loginDescription:
    "Connectez-vous à votre compte pour accéder à votre page d'affichage.",
  resetPassword: "Réinitialiser le mot de passe",
  enterYourNewPassword: "Entrez votre nouveau mot de passe",
  passwordResetFailed: "Échec de la réinitialisation du mot de passe",
  passwordUpdated: "Votre mot de passe a été mis à jour avec succès.",
  weSentYouAnEmail:
    "Nous avons envoyé un email à {email}, veuillez suivre le lien dans l'email pour réinitialiser votre mot de passe.",
  changeEmail: "Changer l'email",
  enterEmailToResetPassword:
    "Entrez votre email pour réinitialiser votre mot de passe.",
  creatorLogin: "Connexion Créateur",
  goToHomePage: "Aller à la page d’accueil",
  searchCreators: {
    title: "Rechercher des Créateurs",
    description:
      "Recherchez des créateurs avec des pages publiques sur xmrchat.",
  },
  typePageName: "Entrez le nom de la page...",
  contactUs: "Contactez-nous",
  here: "ici",
  backToHome: "Retour à l'accueil",
  somethingWentWrong: "Une erreur s'est produite !",

  xmrchat: "XMRChat",
  heroDescription:
    "Offrez des pourboires en cryptomonnaie à vos streamers préférés.",
  findCreators: "Trouver des Créateurs",
  creatorsStartHere: "Les Créateurs commencent ici",

  FAQ: {
    title: "FAQ",
    whyTipWithXMRChat: "Pourquoi donner des pourboires avec XMRChat ?",
    howToUseXMRChat: "Comment utiliser XMRChat ?",
    whyUseMonero: "Pourquoi XMRChat utilise-t-il Monero ?",
    whereToGetMonero: "Où obtenir du Monero ?",
  },

  earnMore: {
    title: "Gagnez Plus",
    description:
      "YouTube prélève 30-50% pour les Superchats. Rumble 20% pour les Rants. Avec XMRChat, vous recevez 100% de vos pourboires XMR de vos fans, directement sur votre portefeuille Monero.",
  },
  censorshipResistant: {
    title: "Résistant à la Censure",
    description:
      "Accepter des pourboires en Monero vous permet d'avoir un revenu qui n'est pas directement lié aux grandes entreprises technologiques et aux violations de politiques arbitraires.",
  },
  corruptionResistant: {
    title: "Résistant à la Corruption",
    description:
      "De nombreux régimes saisissent ou gèlent les comptes bancaires des ennemis politiques. Monero vous permet d'être votre propre banque avec un contrôle total de vos finances.",
  },
  private: {
    title: "Privé",
    description:
      "Les spectateurs peuvent donner des pourboires anonymement, sans se soucier que les employeurs ou d'autres personnes connaissent vos dons.",
  },
  quickAndEasy: {
    title: "Rapide et Facile",
    description:
      "Pas besoin pour les spectateurs de créer un compte, de vérifier leur email ou de saisir les informations de leur carte de crédit. Les fans vont sur votre page de pourboire, saisissent leur nom, leur message, le montant et soumettent leur pourboire XMR.",
  },
  openSource: {
    title: "Open Source",
    description:
      "XMRChat est open source. Vous pouvez consulter le code sur {github}.",
  },

  lowFees: {
    title: "Frais réduits",
    description:
      "Les frais de transaction Monero sont de quelques centimes au maximum.",
  },
  privateMonero: {
    title: "Privé",
    description:
      "Alors que la plupart des cryptos utilisent des registres ouverts, Monero cache les données de transaction. L'expéditeur, le destinataire et les montants des transactions ne sont pas révélés en consultant la blockchain.",
  },
  accepted: {
    title: "Accepté",
    description:
      "Évitez les tracas liés à la vente de votre crypto sur un échange centralisé. Achetez des biens et des services directement auprès des marchands qui acceptent Monero sur {xmrbazaar} et {monerica}.",
  },
  andMore: {
    title: "Et plus encore",
    description: "En savoir plus sur Monero sur {getmonero}.",
  },
  forContentCreators: {
    title: "Pour les Créateurs de Contenu",
    description: {
      main: `Cliquez sur le bouton "Les créateurs commencent ici". Créez un compte XMRChat. Créez une page de pourboire. Faites connaître l'URL de votre page de pourboire à votre public.`,
      tutorialLink:
        "Alex Anarcho a un excellent tutoriel sur l'utilisation de XMRChat sur {youtube}.",
      ifStreamyard: "Si vous utilisez Streamyard :",
      ifOBS: "Si vous utilisez OBS :",
      ifLiveJoiner: "Si vous utilisez LiveJoiner :",
      streamyard: `Allez dans le menu "Modifier la page de pourboires". Assurez-vous d'avoir ajouté votre nom d'utilisateur de chaîne Twitch. Lors du démarrage du stream dans Streamyard, ajoutez Twitch comme destination. Le bot XMRChat (xmr-chat sur Twitch) enverra le message de pourboire sur Twitch et vous pourrez l'afficher sur votre écran depuis Streamyard. Le logo du bot xmrchat s'affiche le mieux avec le paramètre "Minimal".`,
      obs: `Allez dans le menu "OBS". Cliquez sur "Copier le lien de la page OBS". Ajoutez une source navigateur dans OBS et collez le lien.`,
      liveJoiner:
        "Choisissez XMRChat dans la liste des plateformes prises en charge, puis saisissez le chemin ou l’URL de votre page de pourboires XMRChat.",
    },
  },
  forFans: {
    title: "Pour les Fans",
    description:
      "Allez à l'URL de la page de pourboires de votre créateur de contenu. Saisissez votre nom d'utilisateur et votre message, choisissez le montant du pourboire, puis envoyez. Une boîte de dialogue apparaîtra avec les détails du pourboire. Votre xmrchat sera affiché sur la page du streamer après l'envoi du pourboire.",
  },

  // TIP PAGE
  tipName: "Nom",
  tipAmount: "Montant",
  tipMessage: "Message",
  tipPrivate: "Privé",
  tipDate: "Date",
  tipUpdated: "Astuce mise à jour !",
  tipPrivateTooltip:
    "Le nom et le message ne seront visibles que par le streamer.",
  tipCoin: "Pièce",
  tipCoinPlaceholder: "XMR",
  sendTip: "Envoyer le Pourboire",
  tipCreationFailed: "Échec de la Création du Pourboire",
  tipNamePlaceholder: "Entrez le nom",
  tipAmountPlaceholder: "Entrez le montant",
  tipMessagePlaceholder: "Entrez le message",
  tipPrivatePlaceholder: "Privé",
  tipSwapUnavailable: "L'échange est actuellement indisponible.",
  tipSwapMinimum: "Minimum {min} pour échanger",
  tipMinimum: "Minimum {min}",
  recentTips: "Pourboires Récents",
  tipDisplayValueTooltip:
    "Afficher les valeurs des pourboires en XMR ou {fiat}",
  noRecentTips: "Aucun pourboire récent !",
  pageDeactivatedAlert:
    "Votre page a été désactivée et n'est pas visible publiquement. Veuillez contacter le support pour plus d'informations.",
  tipPrivateMessage: "Message privé",
  tipWalletWarningTitle:
    "Ne donnez pas de pourboire avec le portefeuille du streamer.",
  tipWalletWarningDescription:
    "Veuillez éviter d'envoyer des pourboires avec le portefeuille enregistré sur la page. Le changement retourné gonfle le montant que nous voyons reçu.",
  tipWalletMinimum:
    "Veuillez envoyer un minimum de {minimumAmount} XMR à l'adresse suivante pour que votre xmrchat soit affiché.",
  partialAmountReceived:
    "{partialAmount} reçu jusqu'à présent, veuillez envoyer le reste {remainingAmount}.",
  openInMyWallet: "Ouvrir dans Mon Portefeuille",
  cancel: "Annuler",
  copyAddress: "Copier l'Adresse",
  waitingForPayment: "En attente du paiement",

  // CONTACT US PAGE
  contactUsDescription: "Contactez-nous pour toute question ou commentaire.",
  contactUsForm: "Formulaire de Contact",
  contactUsFormDescription:
    "Contactez-nous pour toute question ou commentaire.",
  contactUsFormButton: "Contact",
  emailUsDirectly: "Nous écrire directement",
  followUsOnTwitter: "Suivez-nous sur Twitter",
  twitter: "Twitter",

  whereToGetMonero: {
    cakeWallet:
      "Achetez ou échangez d'autres cryptomonnaies contre du Monero sur {cakeWallet}.",
    stealthex:
      "Échangez d'autres cryptomonnaies contre du Monero (XMR) sur {stealthex} et d'autres sur {kycnot}.",
    haveno: "Achetez du Monero sans KYC sur {haveno}.",
    kraken: "Achetez du Monero avec KYC sur {kraken}.",
    xmrbazaar:
      "Vendez des articles ou des services pour du Monero sur {xmrbazaar}.",
    gupax: "Minez-le avec {gupax}.",
    kunoAnneMedia: "Créez une collecte de fonds Monero sur {kunoAnneMedia}.",
    monerica:
      "Acceptez le Monero dans votre entreprise et soyez répertorié sur les pages {monerica} et {monerodirectory} et sur la carte des entreprises sur {xmrbazaar} et {bankexit}.",
  },

  // CREATE PAGE
  createPage: "Créer une page",
  getStartedCreatingPage: "Commencez par créer votre page de streamer",
  home: "Accueil",
  logo: "Logo",
  logoRatio: "Ratio 1:1",
  bannerImage: "Image de bannière",
  bannerImageBestRatio: "Idéalement, télécharger au ratio 3:1",
  yourId: "Votre ID",
  pageSlug: "Identifiant de la page",
  moneroPrmReciveAddress: "Adresse principale de réception Monero",
  prmMoneroReciveAdressBegin:
    "Les adresses Monero de réception principales commencent par {characters}.",
  moneroSecretViewKey: "Clé de vue secrète Monero",
  weNeedSecretViewKey:
    "Nous avons besoin de la clé de vue secrète pour voir les transactions entrantes des spectateurs. {whereToFind}",
  whereToFindViewKey: "Où trouver la clé de vue ?",
  twitchChannelName: "Nom de la chaîne Twitch",
  nameOfYourTwitchChannel:
    "Nom de votre chaîne Twitch. Utilisé pour afficher les pourboires via le bot xmr_chat Twitch.",
  optional: "Optionnel",
  minTipAmount: "Montant minimum du pourboire (XMR)",
  tipPageAmountFormat: "Format du montant sur la page de pourboire",
  determinesDefaultValue:
    "Détermine la valeur par défaut sélectionnée pour le format du montant sur votre page de pourboire.",
  messageAmountFormat: "Format du montant du message",
  determinesAmountInObsAndTwitch:
    "Détermine le format du montant affiché dans OBS et Twitch.",
  publicPage: "Page publique (affichée dans la recherche de créateurs).",
  continue: "Continuer",
  clickToUpload: "Cliquez pour télécharger",
  pageCreatedSuccessfully: "Page créée avec succès !",
  slugReservedUntil: "Votre identifiant est réservé jusqu'au ",
  note: "Remarque",
  pageUpdated: "Page mise à jour !",
  loading: "Chargement",
  available: "Disponible",
  unavailable: "Indisponible",
  fiatUnit: "Unité de monnaie",
  fiatUnitHelp:
    "Unité de monnaie utilisée pour afficher les pourboires lorsque le mode d'affichage des pourboires est en monnaie.",
  tipExpiration: "Expiration du pourboire",
  tipExpirationHelp:
    "Les pourboires seront automatiquement supprimés après la durée spécifiée.",
  tipExpirationWarning:
    "Modifier la date d'expiration supprimera tous les xmrchats antérieurs à la durée sélectionnée.",
  never: "Jamais",
  xDays: "{count} Jour | {count} Jours",
  xMonths: "{count} Mois | {count} Mois",
  paymentIsExpired:
    "Le paiement a expiré. Si vous avez déjà effectué le paiement, veuillez contacter le support.",
  pageReservationExpired: "La réservation de la page a expiré.",
  paymentCheckingDis: "La vérification du paiement est déconnectée.",
  ifPaymentMade:
    "Si le paiement a déjà été effectué, il apparaîtra dans la liste des conseils.",
  splitPaymentToMultipleRecipients:
    "Diviser le paiement entre plusieurs destinataires",
  backToSinglePayment: "Retour au paiement unique",
  recipients: "Destinataires",
  bioHelp:
    "S'affichera sur la page de pourboires et dans les résultats de recherche.",

  // STREAMER MENU
  menu: "Menu",
  myXmrchats: "Mes xmrchats",
  editTipPage: "Modifier la Page de Pourboires",
  accounts: "Comptes",
  tipPage: "Page de Pourboires",
  contentLinks: "Liens de Contenu",
  obs: "OBS",
  show: "Afficher",
  hide: "Masquer",
  youDontHavePage: "Vous n'avez pas de page",
  getStartedByCreatingPage: "Commencez par créer une page pour vous-même",
  createNewPage: "Créer une Nouvelle Page",

  // ACCOUNT PAGE
  changePassword: "Changer le Mot de Passe",
  updateYourLoginPassword: "Mettre à jour votre mot de passe de connexion",
  currentPassword: "Mot de passe actuel",
  newPassword: "Nouveau mot de passe",
  repeatNewPassword: "Répéter le nouveau mot de passe",
  contactSupportForEmailChange:
    "Contactez le support pour changer votre adresse email.",

  // EDIT PAGE
  editPage: "Modifier la Page",
  customizeYourTipPage: "Personnalisez votre page de pourboires.",
  errorCreatingUpdatingPage:
    "Erreur lors de la création/mise à jour de la page",
  tipAmountSuggestions: "Suggestions de Montant de Pourboire",
  pageWillBeAvailableAt: "Votre page sera disponible à l'adresse {url}",
  noSuggestedAmountsAdded:
    "Aucun montant suggéré n'a été ajouté, cliquez sur le bouton ci-dessous pour ajouter de nouveaux niveaux.",
  addTier: "Ajouter un Niveau",
  remove: "Supprimer",
  name: "Nom",
  amountUSD: "Montant (USD)",
  amountFiat: "Montant ( {fiat} )",

  // CONTENT LINKS
  brandName: "Nom de la Marque",
  brandNameHelp: "Nom de la marque/contenu. Peut être différent du slug.",
  searchTerms: "Termes de Recherche",
  searchTermsHelp:
    "La recherche de créateurs renverra des résultats basés sur le slug de la page, le nom et les mots-clés de cette liste.",
  contentLinksDescription: "Nom, Termes de Recherche et Liens de Contenu",
  contentLinksSecondDescription:
    "Liens vers vos pages sociales ou sites web. Pour réinitialiser une valeur, laissez le champ vide.",
  saveChanges: "Enregistrer les Modifications",
  notUrlWithMessage: "Entrez uniquement le nom, pas le lien complet.",
  changesAreSaved: "Les modifications ont été enregistrées.",
  errorSavingChanges: "Erreur lors de l'enregistrement des modifications.",
  xUsername: "{platform} nom d'utilisateur",
  websiteLink: "Lien du site web",
  youtubeChannel: "Chaîne Youtube",
  podcastRssLink: "Lien RSS du Podcast",
  nostrPubKey: "Clé Publique Nostr",
  rumbleLiveStreamApi: "API de diffusion en direct Rumble",
  rumbleLiveStreamApiHelp:
    "API de diffusion en direct Rumble provenant de {guide}. XMRChat utilise cette URL pour récupérer les diffusions en direct actuelles de votre chaîne.",
  thisGuide: "ce guide",

  // OBS
  obsDescription: "Widget et paramètres OBS.",
  settingsAreUpdated: "Les paramètres ont été mis à jour.",
  errorUpdatingSettings: "Erreur lors de la mise à jour des paramètres",
  toUseXMRchatsOnOBS:
    "Pour utiliser XMRChat sur OBS, copiez le lien vers la page OBS et ajoutez-le dans 'Navigateur' des Sources OBS.",
  copyOBSLink: "Copier le Lien de la Page OBS",
  obsPageSettings: "Paramètres de la Page OBS",
  preventMessagesFromFading: "Empêcher le fondu des messages",
  preventMessagesFromFadingDescription:
    "Lorsqu'il est actif, garde les derniers pourboires à l'écran, sinon chaque message est affiché pendant 60 secondes.",
  playSound: "Jouer un Son",
  playSoundDescription:
    "Joue un son sur la page OBS lorsqu'un nouveau pourboire apparaît.",
  playSoundDescriptionLocal:
    "Si vous testez cette fonctionnalité localement dans votre navigateur, après avoir ouvert l'onglet obs, assurez-vous de cliquer quelque part sur la page. Sinon, le navigateur ne jouera pas de son en raison de l'absence d'interactions avec l'onglet ouvert.",
  autoShowTips: "Afficher les pourboires automatiquement",
  autoShowTipsDescription:
    "Si activé, les pourboires seront affichés automatiquement sur la page OBS pendant 60 secondes.",

  // INTEGRATIONS PAGE
  integrations: "Intégrations",
  integrationsTitle: "Intégrations",
  integrationsDes: "Gérez vos intégrations",
  notConnected: "Non connecté.",
  waitingForVerification: "En attente de vérification.",
  connected: "Connecté.",
  connect: "Connecter",
  disconnect: "Déconnecter",
  simplexDescription: "Le premier messager sans identifiants utilisateur.",
  simplexIntegration: "Intégration SimpleX",
  enterYourSimplexLink:
    "Saisissez votre lien de connexion SimpleX, puis cliquez sur « Connecter ». Le compte XMRChat enverra une demande de connexion à votre compte SimpleX. Après avoir accepté la demande, vous recevrez un code. Entrez ce code pour finaliser la connexion.",
  simplexIsConnectedTo: "SimpleX est connecté au compte « {name} ».",
  acceptRequestInSimplex:
    "Acceptez la demande de connexion dans l’application SimpleX et entrez le code reçu.",
  confirmCode: "Confirmer le code",
  success: "Succès",
  openSimplexAndAccept:
    "Ouvrez l’application SimpleX sur votre appareil et acceptez la connexion du compte XMRChat.",
  error: "Erreur",
  simplexIsConnected: "SimpleX est connecté.",
  simplexDisconnected: "SimpleX est déconnecté.",
  simplexLink: "Lien SimpleX",
  signalDescription:
    "Dites « bonjour » à une expérience de messagerie différente. Un accent inattendu sur la confidentialité, avec toutes les fonctionnalités attendues.",
  signalIsConnected: "Signal est connecté.",
  signalIsDisconnected: "Signal est déconnecté.",
  signalIntegration: "Intégration Signal",
  signalIsConnectedTo: "Signal est connecté au compte {number}.",
  enterCodeinSignalApp: "Entrez le code envoyé à votre application Signal.",
  enterSignalNumOrId:
    "Entrez votre numéro de téléphone ou ID Signal. Un code vous sera envoyé pour vérification.",
  signalPhoneNumOrId: "Numéro de téléphone ou ID Signal",
  sendCode: "Envoyer le code",
  code: "Code",

  // NOTIFICATIONS-PREFRENCES PAGE
  notifications: "Notifications",
  manageYourNotifs: "Gérez vos notifications",
  comingSoon: "Bientôt disponible",
  featureAvailableSoon: "Cette fonctionnalité sera bientôt disponible.",
  minNotifsThreshold: "Seuil minimum de notification",
  minNotifsThresholdHelp:
    "Montant minimum de pourboire en XMR déclenchant une notification.",
  connectInIntegrations: "Connectez-vous dans {integrations} pour activer.",
  dailySummaryTimeHelp: "Heure d’envoi du résumé quotidien des notifications.",
  notifsPreferencesSaved: "Préférences de notifications enregistrées.",
  newTip: "Nouveau pourboire",
  receiveNotifsWhenTipReceived:
    "Recevoir une notification lors de la réception d’un nouveau pourboire",
  dailySummary: "Résumé quotidien",
  receiveDailySummary: "Recevoir un résumé quotidien de vos pourboires",
  receiveNotifsViaEmail: "Recevoir les notifications par email",
  receiveNotifsViaSimplex: "Recevoir les notifications via SimpleX",
  receiveNotifsViaSignal: "Recevoir les notifications via Signal",

  // HEAD
  head: {
    description:
      "Spectateurs, envoyez des messages et des pourboires facilement et en toute confidentialité. Streamers, gardez presque tous vos pourboires au lieu d'en donner 30 à 50 % aux géants de la tech.",
    title: "Envoyez un message et un pourboire avec Monero",
    XMRChatTip: "XMRChat - Donnez un pourboire à {path} avec Monero",
    tip: "Donner un pourboire à {path}",
  },
  moneroSuperchats: "Superchats Monero : XMRChat",
  emailVerification: "Vérification de l’e-mail",
  forgotPassword: "Mot de passe oublié",
  signUp: "S’inscrire",

  // LIVE STREAMS
  liveNow: "En direct maintenant",
  noStreamersLive: "Aucun streamer n'est en direct pour le moment.",
  liveOn: "En direct sur",

  // COHOSTS
  cohost: "Cohôte",
  cohostPage: "Page du cohôte",
  cohostDes: "Gérer {path} xmrchats",
  inviteCohosts: "Inviter des cohôtes",
  noCohosts: "Vous n’avez pas encore de cohôtes",
  cohostsCanHelpYou:
    "Les cohôtes sont des utilisateurs qui peuvent vous aider à gérer vos xmrchats.",
  youCanInviteCohosts:
    "Vous pouvez inviter des cohôtes avec le bouton ci-dessous.",
  removeYourselfFromCohost:
    "Êtes-vous sûr de vouloir vous retirer des cohôtes ? Vous devrez être invité de nouveau pour redevenir cohôte.",
  youRemovedFromCohost: "Vous avez été retiré des cohôtes de la page.",
  removeFromCohost: "Retirer des cohôtes",
  removeCohost: "Retirer le cohôte",
  removeThisCohost: "Êtes-vous sûr de vouloir retirer ce cohôte ?",
  cohostRemoved: "Cohôte retiré",
  invitationCancelled: "Invitation annulée",
  expired: "Expiré",
  expires: "expire",
  pending: "en attente",

  // TIP TIERS
  tipTiers: "Niveaux de pourboires",
  minAmount: "Montant min. :",
  close: "Fermer",
  minXMR: "Min. (XMR)",
  color: "Couleur",
  sound: "Son",
  wantToDeleteTier: "Voulez-vous vraiment supprimer ce niveau ?",
  deleteTier: "Supprimer le niveau",
  tierDeleted: "Niveau supprimé",
  createTier: "Créer un niveau",
  createNewTier: "Créer un nouveau niveau",
  edit: "Modifier",
  delete: "Supprimer",
  pageTierUpdated: "Niveau mis à jour.",
  pageTierCreated: "Niveau créé.",
  minAmountXMR: "Montant min. (XMR)",
  description: "Description",
  soundOBS: "Son (OBS)",
  uploaded: "Téléversé :",
  clear: "Effacer",
  save: "Enregistrer",
  editTier: "Modifier le niveau",
  editTierDetails: "Modifier les détails du niveau",
  manageYourTipTiers: "Gérer vos niveaux de pourboires",

  // TIP LIST
  tipList: {
    reply: "Réponse :",
    replyToTip: "Répondre au pourboire :",
    private: "Privé :",
    obs: "OBS :",
    message: "Message :",
  },
  reply: "Répondre",
  replyColors: "Couleurs de la réponse",
  backgroundColor: "Couleur d'arrière-plan",
  textColor: "Couleur du texte",
  repliedMessagePreview: "Aperçu du message répondu",
  action: "Action",
  premium: "Premium",
};
