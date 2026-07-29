export default {
  validations: {
    required: "Campo requerido",
    email: "Correo electrónico inválido",
    numberic: "Debe ser un número",
    minLength: "Debe tener al menos {length} caracteres.",
    maxLength: "No debe tener más de {length} caracteres.",
    minValue: "Debe ser al menos {value}.",
    sameAs: "Debe ser igual a {otherName}",
    someFieldsAreIncorrect: "Algunos campos no están llenados correctamente.",
    url: "El enlace es inválido.",
    notUrl: "No debe ser un enlace.",
    streamerSlug:
      "El camino puede contener solo letras minúsculas, números, guiones bajos y guiones.",
    moneroPrimaryAddress:
      "La dirección principal es inválida. Debe comenzar con {characters}.",
  },

  account: "Cuenta",
  logout: "Cerrar sesión",
  login: "Iniciar sesión",
  send: "Enviar",
  loginFailed: "Error de inicio de sesión",
  email: "Correo electrónico",
  search: "Buscar",
  password: "Contraseña",
  confirm: "Confirmar",
  reconnect: "Reconectar",
  confirmPassword: "Confirmar contraseña",
  signupInstead: "Registrarse en su lugar",
  loginInstead: "Iniciar sesión en su lugar",
  signup: "Registrarse",
  signupFailed: "Error en el registro",
  signupSuccessfull: "Registro exitoso",
  noItems: "Sin elementos",
  signupSuccessfullDescription:
    "Por favor, siga el enlace enviado a su correo electrónico para verificar su cuenta.",
  forgetPassword: "¿Olvidó su contraseña?",
  loginDescription:
    "Inicie sesión en su cuenta para acceder a su página de visualización.",
  resetPassword: "Restablecer contraseña",
  enterYourNewPassword: "Ingrese su nueva contraseña",
  passwordResetFailed: "Error al restablecer la contraseña",
  passwordUpdated: "Su contraseña se ha actualizado correctamente.",
  weSentYouAnEmail:
    "Hemos enviado un correo electrónico a {email}, por favor siga el enlace en el correo electrónico para restablecer su contraseña.",
  changeEmail: "Cambiar correo electrónico",
  enterEmailToResetPassword:
    "Ingrese su correo electrónico para restablecer su contraseña.",
  creatorLogin: "Inicio de sesión de creador",
  goToHomePage: "Ir a la página principal",
  searchCreators: {
    title: "Buscar Creadores",
    description: "Busca creadores con páginas públicas en xmrchat.",
  },
  typePageName: "Escribe el nombre de la página...",
  contactUs: "Contáctanos",
  here: "aquí",
  backToHome: "Volver al inicio",
  somethingWentWrong: "¡Algo salió mal!",

  xmrchat: "XMRChat",
  heroDescription: "De propinas en criptomonedas a sus streamers favoritos.",
  findCreators: "Encontrar creadores",
  creatorsStartHere: "Los creadores comienzan aquí",

  FAQ: {
    title: "Preguntas frecuentes",
    whyTipWithXMRChat: "¿Por qué dar propinas con XMRChat?",
    howToUseXMRChat: "¿Cómo usar XMRChat?",
    whyUseMonero: "¿Por qué XMRChat usa Monero?",
    whereToGetMonero: "¿Dónde obtener Monero?",
  },

  earnMore: {
    title: "Gane más",
    description:
      "YouTube cobra 30-50% por Superchats. Rumble 20% por Rants. Con XMRChat, recibe el 100% de sus propinas XMR de los fans, directamente a su billetera Monero.",
  },
  censorshipResistant: {
    title: "Resistente a la censura",
    description:
      "Aceptar propinas de Monero le permite tener un ingreso que no está directamente conectado a las grandes tecnológicas y las violaciones de políticas arbitrarias.",
  },
  corruptionResistant: {
    title: "Resistente a la corrupción",
    description:
      "Muchos regímenes confiscan o congelan cuentas bancarias de enemigos políticos. Monero le permite ser su propio banco con control total de sus finanzas.",
  },
  private: {
    title: "Privado",
    description:
      "Los espectadores pueden dar propinas de forma anónima, sin preocuparse de que los empleadores u otros conozcan sus donaciones.",
  },
  quickAndEasy: {
    title: "Rápido y fácil",
    description:
      "No es necesario que los espectadores creen una cuenta, verifiquen su correo electrónico o ingresen información de la tarjeta de crédito. Los fanáticos van a su página de propinas, escriben su nombre, mensaje, monto y envían su propina XMR.",
  },
  openSource: {
    title: "Código abierto",
    description:
      "XMRChat es de código abierto. Puede revisar el código en {github}.",
  },

  lowFees: {
    title: "Bajas tarifas",
    description:
      "Las tarifas de transacción de Monero son de unos pocos centavos como máximo.",
  },
  privateMonero: {
    title: "Privado",
    description:
      "Si bien la mayoría de las criptomonedas usan libros de contabilidad abiertos, Monero oculta los datos de las transacciones. El remitente, el receptor y los montos de las transacciones no se revelan al observar la cadena de bloques.",
  },
  accepted: {
    title: "Aceptado",
    description:
      "Evite la molestia de vender su criptomoneda en un intercambio centralizado. Compre bienes y servicios directamente de comerciantes que aceptan Monero en {xmrbazaar} y {monerica}.",
  },
  andMore: {
    title: "Y más",
    description: "Obtenga más información sobre Monero en {getmonero}.",
  },
  forContentCreators: {
    title: "Para Creadores de Contenido",
    description: {
      main: `Haz clic en el botón "Los creadores comienzan aquí". Crea una cuenta XMRChat. Crea una Página de Propinas. Haz saber a tu audiencia la URL de tu página de propinas.`,
      tutorialLink:
        "Alex Anarcho tiene un excelente tutorial sobre cómo usar XMRChat en {youtube}.",
      ifStreamyard: "Si usas Streamyard:",
      ifOBS: "Si usas OBS:",
      ifLiveJoiner: "Si utiliza LiveJoiner:",
      streamyard: `Ve al elemento del menú "Editar página de propinas". Asegúrate de haber añadido tu nombre de usuario de canal de Twitch. Al iniciar el stream en Streamyard, añade Twitch como destino. El bot XMRChat (xmr-chat en Twitch) enviará el mensaje de propina en Twitch y podrás mostrarlo en tu pantalla desde Streamyard. El logo del bot xmrchat se ve mejor con la configuración "Minimal".`,
      obs: `Ve al elemento del menú "OBS". Haz clic en "Copiar enlace de página OBS". Añade una fuente de navegador en OBS y pega el enlace.`,
      liveJoiner:
        "Seleccione XMRChat de la lista de plataformas compatibles e introduzca la ruta o URL de su página de propinas de XMRChat.",
    },
  },
  forFans: {
    title: "Para Fans",
    description:
      "Ve a la URL de la página de propinas de tu creador de contenido. Escribe tu nombre de usuario y mensaje, elige el monto de la propina, luego envía. Aparecerá un diálogo con los detalles de la propina. Tu xmrchat se mostrará en la página del streamer después de enviar la propina.",
  },
  whereToGetMonero: {
    cakeWallet:
      "Compre o intercambie otras criptomonedas por Monero en {cakeWallet}.",
    stealthex:
      "Intercambie otras criptomonedas por Monero (XMR) en {stealthex} y otros en {kycnot}.",
    haveno: "Compre Monero sin KYC en {haveno}.",
    kraken: "Compre Monero con KYC en {kraken}.",
    xmrbazaar: "Venda artículos o servicios por Monero en {xmrbazaar}.",
    gupax: "Mínele con {gupax}.",
    kunoAnneMedia:
      "Cree una recaudación de fondos de Monero en {kunoAnneMedia}.",
    monerica:
      "Acepte Monero en su negocio y aparezca en las páginas {monerica} y {monerodirectory} y en el mapa de listados comerciales en {xmrbazaar} y {bankexit}.",
  },

  // TIP PAGE
  tipName: "Nombre",
  tipAmount: "Monto",
  tipMessage: "Mensaje",
  tipPrivate: "Privado",
  tipDate: "Fecha",
  tipUpdated: "¡Consejo actualizado!",
  tipPrivateTooltip:
    "El nombre y el mensaje solo serán visibles para el streamer.",
  tipCoin: "Moneda",
  tipCoinPlaceholder: "XMR",
  sendTip: "Enviar propina",
  tipCreationFailed: "Error al crear la propina",
  tipNamePlaceholder: "Ingrese el nombre",
  tipAmountPlaceholder: "Ingrese el monto",
  tipMessagePlaceholder: "Ingrese el mensaje",
  tipPrivatePlaceholder: "Privado",
  tipSwapUnavailable: "El intercambio no está disponible actualmente.",
  tipSwapMinimum: "Mínimo {min} para intercambiar",
  tipMinimum: "Mínimo {min}",
  recentTips: "Propinas recientes",
  tipDisplayValueTooltip: "Mostrar valores de propina en XMR o {fiat}",
  noRecentTips: "¡No hay propinas recientes!",
  pageDeactivatedAlert:
    "Tu página ha sido desactivada y no es visible al público. Por favor, contacta con el soporte para más información.",
  tipPrivateMessage: "Mensaje privado",
  tipWalletWarningTitle: "No dé propina con la billetera del streamer.",
  tipWalletWarningDescription:
    "Evite enviar propinas con la billetera registrada en la página. El cambio devuelto infla la cantidad que vemos recibida.",
  tipWalletMinimum:
    "Envíe un mínimo de {minimumAmount} XMR a la siguiente dirección para que se muestre su xmrchat.",
  partialAmountReceived:
    "{partialAmount} recibido hasta ahora, por favor envíe el resto {remainingAmount}.",
  openInMyWallet: "Abrir en mi billetera",
  cancel: "Cancelar",
  copyAddress: "Copiar dirección",
  waitingForPayment: "Esperando el pago",

  // CONTACT US PAGE
  contactUsDescription: "Contáctanos si tienes preguntas o comentarios.",
  contactUsForm: "Formulario de Contacto",
  contactUsFormDescription: "Contáctanos si tienes preguntas o comentarios.",
  contactUsFormButton: "Contactar",
  emailUsDirectly: "Envíanos un correo directamente",
  followUsOnTwitter: "Síguenos en Twitter",
  twitter: "Twitter",

  // CREATE PAGE
  createPage: "Crear página",
  getStartedCreatingPage: "Empieza creando tu página de streamer",
  home: "Inicio",
  logo: "Logo",
  logoRatio: "Proporción 1:1",
  bannerImage: "Imagen de banner",
  bannerImageBestRatio: "Lo mejor es subirlo en proporción 3:1",
  yourId: "Tu ID",
  pageSlug: "Slug de la página",
  moneroPrmReciveAddress: "Dirección principal para recibir Monero",
  prmMoneroReciveAdressBegin:
    "Las direcciones principales de recepción de Monero comienzan con {characters}.",
  moneroSecretViewKey: "Clave de vista secreta de Monero",
  weNeedSecretViewKey:
    "Necesitamos la clave de vista secreta para ver las transacciones entrantes de los espectadores. {whereToFind}",
  whereToFindViewKey: "¿Dónde encontrar la clave de vista?",
  twitchChannelName: "Nombre del canal de Twitch",
  nameOfYourTwitchChannel:
    "Nombre de tu canal de Twitch. Se usa para mostrar propinas en Stream con el bot de Twitch xmr_chat.",
  optional: "Opcional",
  minTipAmount: "Monto mínimo de propina (XMR)",
  tipPageAmountFormat: "Formato de cantidad en la página de propinas",
  determinesDefaultValue:
    "Determina el valor predeterminado seleccionado para el formato de cantidad en tu página de propinas.",
  messageAmountFormat: "Formato de cantidad del mensaje",
  determinesAmountInObsAndTwitch:
    "Determina el formato de cantidad mostrado en OBS y Twitch.",
  publicPage: "Página pública (se muestra en la búsqueda de creadores).",
  continue: "Continuar",
  clickToUpload: "Haz clic para subir",
  pageCreatedSuccessfully: "¡Página creada con éxito!",
  slugReservedUntil: "Tu slug está reservado hasta ",
  note: "Nota",
  pageUpdated: "¡Página actualizada!",
  loading: "Cargando",
  available: "Disponible",
  unavailable: "No disponible",
  fiatUnit: "Unidad de moneda",
  tipExpiration: "Caducidad de la propina",
  tipExpirationHelp:
    "Las propinas se eliminarán automáticamente después del tiempo especificado.",
  tipExpirationWarning:
    "Al cambiar la caducidad, se eliminarán todos los xmrchats anteriores a la duración seleccionada.",
  never: "Nunca",
  xDays: "{count} Día | {count} Días",
  xMonths: "{count} Mes | {count} Meses",
  fiatUnitHelp:
    "Unidad de moneda usada para mostrar propinas cuando el modo de visualización de propinas es en moneda.",
  paymentIsExpired:
    "El pago ha expirado. Si ya realizaste el pago, por favor contacta al soporte.",
  pageReservationExpired: "La reserva de la página ha expirado.",
  paymentCheckingDis: "La verificación de pago se ha desconectado.",
  ifPaymentMade: "Si el pago ya se realizó, aparecerá en la lista de propinas.",
  bioHelp:
    "Se mostrará en la página de propinas y en los resultados de búsqueda.",

  // STREAMER MENU
  menu: "Menú",
  myXmrchats: "Mis xmrchats",
  editTipPage: "Editar Página de Propinas",
  accounts: "Cuentas",
  tipPage: "Página de Propinas",
  contentLinks: "Enlaces de Contenido",
  obs: "OBS",
  show: "Mostrar",
  hide: "Ocultar",
  youDontHavePage: "No tienes una página aún",
  getStartedByCreatingPage: "Comienza creando una página para ti mismo",
  createNewPage: "Crear Nueva Página",

  // ACCOUNT PAGE
  changePassword: "Cambiar Contraseña",
  updateYourLoginPassword: "Actualizar su contraseña de inicio de sesión",
  currentPassword: "Contraseña actual",
  newPassword: "Nueva contraseña",
  repeatNewPassword: "Repetir nueva contraseña",
  contactSupportForEmailChange:
    "Contacta al soporte para cambiar tu dirección de correo electrónico.",

  // EDIT PAGE
  editPage: "Editar Página",
  customizeYourTipPage: "Personalice su página de propinas.",
  errorCreatingUpdatingPage: "Error al crear/actualizar la página",
  tipAmountSuggestions: "Sugerencias de Monto de Propina",
  pageWillBeAvailableAt: "Su página estará disponible en {url}",
  noSuggestedAmountsAdded:
    "No hay montos sugeridos agregados, haga clic en el botón de abajo para agregar nuevos niveles.",
  addTier: "Agregar Nivel",
  remove: "Eliminar",
  name: "Nombre",
  amountUSD: "Monto (USD)",
  amountFiat: "Monto ( {fiat} )",

  // CONTENT LINKS
  brandName: "Nombre de la Marca",
  brandNameHelp: "Nombre de la marca/contenido. Puede ser diferente del slug.",
  searchTerms: "Términos de Búsqueda",
  searchTermsHelp:
    "La búsqueda de creadores devolverá resultados basados en el slug de la página, nombre y palabras clave en esta lista.",
  contentLinksDescription:
    "Nombre, Términos de Búsqueda y Enlaces de Contenido",
  contentLinksSecondDescription:
    "Enlaces a sus páginas sociales o sitios web. Para restablecer un valor, deje el campo vacío.",
  saveChanges: "Guardar Cambios",
  notUrlWithMessage: "Solo ingrese el nombre, no el enlace completo.",
  changesAreSaved: "Los cambios se guardaron.",
  errorSavingChanges: "Error al guardar los cambios.",
  xUsername: "{platform} nombre de usuario",
  websiteLink: "Enlace del sitio web",
  youtubeChannel: "Canal de Youtube",
  podcastRssLink: "Enlace RSS del Podcast",
  nostrPubKey: "Clave Pública de Nostr",
  rumbleLiveStreamApi: "API de transmisiones en vivo de Rumble",
  rumbleLiveStreamApiHelp:
    "API de transmisiones en vivo de Rumble de {guide}. XMRChat utiliza esta URL para obtener las transmisiones en vivo actuales de tu canal.",
  thisGuide: "esta guía",

  // OBS
  obsDescription: "Widget y configuración de OBS.",
  settingsAreUpdated: "La configuración se actualizó.",
  errorUpdatingSettings: "Error al actualizar la configuración",
  toUseXMRchatsOnOBS:
    "Para usar XMRChat en OBS, copie el enlace a la página de OBS y agréguelo en 'Navegador' de Fuentes de OBS.",
  copyOBSLink: "Copiar Enlace de Página OBS",
  obsPageSettings: "Configuración de Página OBS",
  preventMessagesFromFading: "Evitar que los mensajes se desvanezcan",
  preventMessagesFromFadingDescription:
    "Cuando está activo, mantiene los últimos consejos en la pantalla, de lo contrario, cada mensaje se muestra durante 60 segundos.",
  playSound: "Reproducir Sonido",
  playSoundDescription:
    "Reproduce un sonido en la página de OBS cuando aparece un nuevo consejo.",
  playSoundDescriptionLocal:
    "Si está probando esta funcionalidad localmente en su navegador, después de abrir la pestaña obs, asegúrese de hacer clic en algún lugar de la página. De lo contrario, el navegador no reproducirá el sonido debido a la falta de interacciones con la pestaña abierta.",
  autoShowTips: "Mostrar consejos automáticamente",
  autoShowTipsDescription:
    "Si está activo, los consejos se mostrarán automáticamente en la página de OBS durante 60 segundos.",

  // INTEGRATIONS PAGE
  integrations: "Integraciones",
  integrationsTitle: "Integraciones",
  integrationsDes: "Administra tus integraciones",
  notConnected: "No conectado.",
  waitingForVerification: "Esperando verificación.",
  connected: "Conectado.",
  connect: "Conectar",
  disconnect: "Desconectar",
  simplexDescription: "El primer mensajero sin ID de usuario.",
  simplexIntegration: "Integración con SimpleX",
  enterYourSimplexLink:
    "Introduce tu enlace de conexión de SimpleX y haz clic en conectar. La cuenta de XMRChat enviará una solicitud de conexión a tu cuenta de SimpleX. Después de aceptar la solicitud, recibirás un código. Introduce el código para completar la conexión.",
  simplexIsConnectedTo: 'SimpleX está conectado a la cuenta "{name}".',
  acceptRequestInSimplex:
    "Acepta la solicitud de conexión en la app de SimpleX e introduce el código que recibas.",
  confirmCode: "Confirmar código",
  success: "Éxito",
  openSimplexAndAccept:
    "Abre la app de SimpleX en tu dispositivo y acepta la conexión desde la cuenta de XMRChat.",
  error: "Error",
  simplexIsConnected: "SimpleX está conectado.",
  simplexDisconnected: "SimpleX desconectado.",
  simplexLink: "Enlace de SimpleX",
  signalDescription:
    "Di 'hola' a una experiencia de mensajería diferente. Un enfoque inesperado en la privacidad, combinado con todas las funciones que esperas.",
  signalIsConnected: "Signal está conectado.",
  signalIsDisconnected: "Signal está desconectado.",
  signalIntegration: "Integración con Signal",
  signalIsConnectedTo: "Signal está conectado a la cuenta {number}.",
  enterCodeinSignalApp: "Introduce el código enviado a tu app de Signal.",
  enterSignalNumOrId:
    "Introduce tu número de teléfono o ID de Signal. Enviaremos un código a ese número para verificarlo.",
  signalPhoneNumOrId: "Número de teléfono o ID de Signal",
  sendCode: "Enviar código",
  code: "Código",

  // NOTIFICATIONS-PREFERENCES PAGE
  notifications: "Notificaciones",
  manageYourNotifs: "Administra tus notificaciones",
  comingSoon: "Próximamente",
  featureAvailableSoon: "Esta función estará disponible pronto.",
  minNotifsThreshold: "Límite mínimo de notificación",
  minNotifsThresholdHelp:
    "La cantidad mínima de propina en XMR que activará una notificación.",
  connectInIntegrations: "Conéctate en {integrations} para activar.",
  dailySummaryTimeHelp:
    "Hora en la que se enviarán las notificaciones del resumen diario.",
  notifsPreferencesSaved: "Preferencias de notificación guardadas.",
  newTip: "Nueva propina",
  receiveNotifsWhenTipReceived:
    "Recibir notificaciones cuando se reciba una nueva propina",
  dailySummary: "Resumen diario",
  receiveDailySummary: "Recibir un resumen diario de tus propinas",
  receiveNotifsViaEmail: "Recibir notificaciones por correo electrónico",
  receiveNotifsViaSimplex: "Recibir notificaciones por SimpleX",
  receiveNotifsViaSignal: "Recibir notificaciones por Signal",

  // HEAD
  head: {
    description:
      "Espectadores, envíen mensajes y propinas con facilidad y privacidad. Streamers, conserven casi todas sus propinas en lugar de dar el 30-50% a las grandes tecnológicas.",
    title: "Mensajea y da propina con Monero",
    XMRChatTip: "XMRChat - Da propina a {path} con Monero",
    tip: "Dar propina a {path}",
  },
  moneroSuperchats: "Superchats Monero : XMRChat",
  emailVerification: "Verificación de correo electrónico",
  forgotPassword: "¿Olvidaste tu contraseña?",
  signUp: "Registrarse",

  // LIVE STREAMS
  liveNow: "En directo ahora",
  noStreamersLive: "No hay streamers en directo ahora mismo.",
  liveOn: "En directo en",

  // COHOSTS
  cohost: "Cohost",
  cohostPage: "Página de cohost",
  cohostDes: "Gestionar {path} xmrchats",
  inviteCohosts: "Invitar cohosts",
  noCohosts: "Aún no tienes cohosts",
  cohostsCanHelpYou:
    "Los cohosts son usuarios que pueden ayudarte a gestionar tus xmrchats.",
  youCanInviteCohosts: "Puedes invitar cohosts usando el botón de abajo.",
  removeYourselfFromCohost:
    "¿Seguro que quieres eliminarte como cohost de la página? Necesitarás ser invitado nuevamente para ser cohost otra vez.",
  youRemovedFromCohost: "Has sido eliminado como cohost de la página.",
  removeFromCohost: "Eliminar de cohost",
  removeCohost: "Eliminar cohost",
  removeThisCohost: "¿Seguro que quieres eliminar este cohost?",
  cohostRemoved: "Cohost eliminado",
  invitationCancelled: "Invitación cancelada",
  expired: "Expirado",
  expires: "expira",
  pending: "pendiente",

  // TIP TIERS
  tipTiers: "Niveles de propina",
  minAmount: "Monto mínimo:",
  close: "Cerrar",
  minXMR: "Mín. (XMR)",
  color: "Color",
  sound: "Sonido",
  wantToDeleteTier: "¿Seguro que quieres eliminar este nivel?",
  deleteTier: "Eliminar nivel",
  tierDeleted: "Nivel eliminado",
  createTier: "Crear nivel",
  createNewTier: "Crear nuevo nivel",
  edit: "Editar",
  delete: "Eliminar",
  pageTierUpdated: "Nivel actualizado.",
  pageTierCreated: "Nivel creado.",
  minAmountXMR: "Monto mínimo (XMR)",
  description: "Descripción",
  soundOBS: "Sonido (OBS)",
  uploaded: "Subido:",
  clear: "Limpiar",
  save: "Guardar",
  editTier: "Editar nivel",
  editTierDetails: "Editar detalles del nivel",
  manageYourTipTiers: "Gestiona tus niveles de propinas",

  // TIP LIST
  tipList: {
    reply: "Respuesta:",
    replyToTip: "Responder a la propina:",
    private: "Privado:",
    obs: "OBS:",
    message: "Mensaje:",
  },
  reply: "Responder",
  replyColors: "Colores de la respuesta",
  backgroundColor: "Color de fondo",
  textColor: "Color del texto",
  repliedMessagePreview: "Vista previa del mensaje respondido",
  action: "Acción",
  premium: "Premium",
};
