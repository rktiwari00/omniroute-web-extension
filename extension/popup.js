// Omniroute-LIMPAKUS Popup Controller

const I18N = {
  en: {
    detectedNode: 'DETECTED NODE',
    analyzingTab: 'Analyzing current tab…',
    openSupported: 'Open a supported platform and sign in.',
    authorizeCopy: 'AUTHORIZE AND COPY',
    openPlatform: 'Open platform',
    localOnly: 'LOCAL ONLY // ZERO EXFIL',
    searchPlatform: 'Search platform…',
    settings: 'SETTINGS',
    localProcessing: 'Credentials are processed only on this device.',
    localSecurityNoticeTitle: 'LOCAL SECURITY NOTICE',
    localSecurityNoticeText1: 'Temporary cookies and authorization headers may be stored locally for up to 10 minutes during provider detection.',
    localSecurityNoticeText2: 'Copied credentials remain on your clipboard until replaced. Paste immediately into OmniRoute and overwrite the clipboard afterwards.',
    clearCapturedData: 'Clear captured data',
    dataClearedSuccess: 'Temporary captured data cleared.',
    dataClearedError: 'Could not clear temporary data.',
    requestingAccess: 'Requesting access to selected domain…',
    selectPlatformPrompt: 'Please select a platform.',
    permissionNotGranted: 'Domain permission was not granted.',
    platformOpenedPrompt: 'Platform opened. Sign in and click “AUTHORIZE AND COPY” again.',
    credentialCopied: 'Credential copied. Paste it directly into OmniRoute.',
    couldNotCopy: 'Could not copy credential.',
    activeTabError: 'Could not identify the active tab.',
    extraDataTitle: 'Additional details',
    extraDataLabel: 'Additional value',
    cancelBtn: 'Cancel',
    continueBtn: 'Continue',
    errNotFound1PSID: 'Could not find __Secure-1PSID. Please sign in to Gemini and refresh the page.',
    errNotFoundToken: 'Could not find token cookie.',
    errNotFoundCookies: 'Could not find cookies. Please refresh the page or send a message.',
    errNotFoundSession: 'Could not find session cookie.',
    errNotFoundCookie: 'Could not find {cookie}.',
    errNotFoundStorage: 'Could not find {keys} in local storage.',
    errOperationCancelled: 'Operation cancelled.',
    errCapturedToken: 'Access token not yet captured. Please refresh the page or send a message.',
    errQwenToken: 'Could not find token or tongyi_sso_ticket.',
    errT3Required: 'Both convex-session-id and full Cookie are required.',
    errM365Token: 'Chathub WebSocket access_token not yet captured.',
    errM365Segment: 'Missing Chathub segment.',
    errMissingFields: 'Missing: {fields}.',
    errUnsupportedMethod: 'Method not yet supported.',
    supportedPlatformsAria: 'Supported platforms',
    innerEmailTitle: 'Inner.ai account email',
    innerEmailText: 'OmniRoute requires the token followed by the email used in Inner.ai.',
    emailLabel: 'Email',
    m365PathPrompt: 'Copy the specific Chathub path segment present in the WebSocket URL.',
    m365PathLabel: 'Chathub Segment',
    updaterTitle: 'OmniRoute Updater',
    updaterCheckNow: 'Check Now',
    updaterChecking: 'Checking for updates...',
    updaterServerTitle: 'OmniRoute Server',
    updaterExtensionTitle: 'Web Extension',
    updaterUpToDate: 'Up to date',
    updaterUpdateAvailable: 'Update Available',
    updaterServerOffline: 'Server Offline',
    updaterCopyCommand: 'Copy Update Command',
    updaterCopied: 'Copied!',
    updaterDownload: 'Download Latest Release',
    updaterSettings: 'Settings',
    updaterClose: 'Close',
  },
  pt_PT: {
    detectedNode: 'NODE DETETADO',
    analyzingTab: 'A analisar o separador…',
    openSupported: 'Abre uma plataforma suportada e inicia sessão.',
    authorizeCopy: 'INJETAR ACESSO E COPIAR',
    openPlatform: 'Abrir plataforma',
    localOnly: 'LOCAL ONLY // ZERO EXFIL',
    searchPlatform: 'Pesquisar plataforma…',
    settings: 'SETTINGS',
    localProcessing: 'As credenciais são processadas apenas neste dispositivo.',
    localSecurityNoticeTitle: 'AVISO DE SEGURANÇA LOCAL',
    localSecurityNoticeText1: 'Cookies temporários e cabeçalhos de autorização podem ser guardados localmente até 10 minutos durante a deteção de fornecedores.',
    localSecurityNoticeText2: 'As credenciais copiadas permanecem na área de transferência até serem substituídas. Cola imediatamente no OmniRoute e limpa a área de transferência.',
    clearCapturedData: 'Limpar dados capturados',
    dataClearedSuccess: 'Dados temporários capturados eliminados.',
    dataClearedError: 'Não foi possível limpar os dados temporários.',
    requestingAccess: 'A pedir acesso apenas ao domínio selecionado…',
    selectPlatformPrompt: 'Seleciona uma plataforma.',
    permissionNotGranted: 'A permissão do domínio não foi concedida.',
    platformOpenedPrompt: 'Plataforma aberta. Inicia sessão e volta a clicar em “INJETAR ACESSO E COPIAR”.',
    credentialCopied: 'Credencial copiada. Cola diretamente no OmniRoute.',
    couldNotCopy: 'Não foi possível copiar.',
    activeTabError: 'Não foi possível identificar o separador ativo.',
    extraDataTitle: 'Dados adicionais',
    extraDataLabel: 'Valor adicional',
    cancelBtn: 'Cancelar',
    continueBtn: 'Continuar',
    errNotFound1PSID: 'Não encontrei __Secure-1PSID. Inicia sessão no Gemini e atualiza a página.',
    errNotFoundToken: 'Não encontrei o cookie token.',
    errNotFoundCookies: 'Não encontrei cookies. Atualiza a página ou envia uma mensagem.',
    errNotFoundSession: 'Não encontrei o cookie de sessão.',
    errNotFoundCookie: 'Não encontrei {cookie}.',
    errNotFoundStorage: 'Não encontrei {keys} no armazenamento local.',
    errOperationCancelled: 'Operação cancelada.',
    errCapturedToken: 'Ainda não capturei o access_token. Atualiza a página ou envia uma mensagem.',
    errQwenToken: 'Não encontrei token nem tongyi_sso_ticket.',
    errT3Required: 'É necessário convex-session-id e o Cookie completo.',
    errM365Token: 'Ainda não capturei o access_token do WebSocket Chathub.',
    errM365Segment: 'Falta o segmento Chathub.',
    errMissingFields: 'Faltam: {fields}.',
    errUnsupportedMethod: 'Método ainda não suportado.',
    supportedPlatformsAria: 'Plataformas suportadas',
    innerEmailTitle: 'Email da conta Inner.ai',
    innerEmailText: 'O OmniRoute exige o token seguido do email usado no Inner.ai.',
    emailLabel: 'Email',
    m365PathPrompt: 'Copia o segmento específico do caminho Chathub presente no URL do WebSocket.',
    m365PathLabel: 'Segmento Chathub',
    updaterTitle: 'Atualizador OmniRoute',
    updaterCheckNow: 'Verificar Agora',
    updaterChecking: 'A verificar atualizações...',
    updaterServerTitle: 'Servidor OmniRoute',
    updaterExtensionTitle: 'Extensão Web',
    updaterUpToDate: 'Atualizado',
    updaterUpdateAvailable: 'Atualização Disponível',
    updaterServerOffline: 'Servidor Offline',
    updaterCopyCommand: 'Copiar Comando de Atualização',
    updaterCopied: 'Copiado!',
    updaterDownload: 'Descarregar Versão Recente',
    updaterSettings: 'Definições',
    updaterClose: 'Fechar',
  },
  es: {
    detectedNode: 'NODO DETECTADO',
    analyzingTab: 'Analizando la pestaña…',
    openSupported: 'Abre una plataforma compatible e inicia sesión.',
    authorizeCopy: 'AUTORIZAR Y COPIAR',
    openPlatform: 'Abrir plataforma',
    localOnly: 'SOLO LOCAL // CERO EXFILTRACIÓN',
    searchPlatform: 'Buscar plataforma…',
    settings: 'SETTINGS',
    localProcessing: 'Las credenciales se procesan únicamente en este dispositivo.',
    localSecurityNoticeTitle: 'AVISO DE SEGURIDAD LOCAL',
    localSecurityNoticeText1: 'Las cookies temporales y cabeceras de autorización pueden guardarse localmente hasta 10 minutos.',
    localSecurityNoticeText2: 'Las credenciales copiadas permanecen en el portapapeles hasta reemplazarlas. Pégalas de inmediato en OmniRoute.',
    clearCapturedData: 'Limpiar datos capturados',
    dataClearedSuccess: 'Datos temporales capturados eliminados.',
    dataClearedError: 'No se pudieron limpiar los datos temporales.',
    requestingAccess: 'Solicitando acceso al dominio seleccionado…',
    selectPlatformPrompt: 'Selecciona una plataforma.',
    permissionNotGranted: 'No se concedió el permiso para el dominio.',
    platformOpenedPrompt: 'Plataforma abierta. Inicia sesión y haz clic de nuevo en “AUTORIZAR Y COPIAR”.',
    credentialCopied: 'Credencial copiada. Pégala directamente en OmniRoute.',
    couldNotCopy: 'No se pudo copiar la credencial.',
    activeTabError: 'No se pudo identificar la pestaña activa.',
    extraDataTitle: 'Detalles adicionales',
    extraDataLabel: 'Valor adicional',
    cancelBtn: 'Cancelar',
    continueBtn: 'Continuar',
    errNotFound1PSID: 'No se encontró __Secure-1PSID. Inicia sesión en Gemini y recarga la página.',
    errNotFoundToken: 'No se encontró la cookie token.',
    errNotFoundCookies: 'No se encontraron cookies. Recarga la página o envía un mensaje.',
    errNotFoundSession: 'No se encontró la cookie de sesión.',
    errNotFoundCookie: 'No se encontró {cookie}.',
    errNotFoundStorage: 'No se encontró {keys} en el almacenamiento local.',
    errOperationCancelled: 'Operación cancelada.',
    errCapturedToken: 'Aún no se ha capturado el access_token. Recarga la página.',
    errQwenToken: 'No se encontró el token ni tongyi_sso_ticket.',
    errT3Required: 'Se requieren convex-session-id y la Cookie completa.',
    errM365Token: 'Aún no se ha capturado el token WebSocket de Chathub.',
    errM365Segment: 'Falta el segmento Chathub.',
    errMissingFields: 'Faltan: {fields}.',
    errUnsupportedMethod: 'Método aún no compatible.',
    supportedPlatformsAria: 'Plataformas compatibles',
    innerEmailTitle: 'Correo de la cuenta Inner.ai',
    innerEmailText: 'OmniRoute requiere el token seguido del correo usado en Inner.ai.',
    emailLabel: 'Correo',
    m365PathPrompt: 'Copia el segmento de ruta Chathub en la URL del WebSocket.',
    m365PathLabel: 'Segmento Chathub',
    updaterTitle: 'Actualizador OmniRoute',
    updaterCheckNow: 'Comprobar ahora',
    updaterChecking: 'Buscando actualizaciones...',
    updaterServerTitle: 'Servidor OmniRoute',
    updaterExtensionTitle: 'Extensión Web',
    updaterUpToDate: 'Actualizado',
    updaterUpdateAvailable: 'Actualización disponible',
    updaterServerOffline: 'Servidor sin conexión',
    updaterCopyCommand: 'Copiar comando de actualización',
    updaterCopied: '¡Copiado!',
    updaterDownload: 'Descargar última versión',
    updaterSettings: 'Configuración',
    updaterClose: 'Cerrar',
  },
  de: {
    detectedNode: 'ERKANNTES KNOTENPUNKT',
    analyzingTab: 'Aktueller Tab wird analysiert…',
    openSupported: 'Unterstützte Plattform öffnen und anmelden.',
    authorizeCopy: 'AUTORISIEREN & KOPIEREN',
    openPlatform: 'Plattform öffnen',
    localOnly: 'NUR LOKAL // ZERO EXFIL',
    searchPlatform: 'Plattform suchen…',
    settings: 'SETTINGS',
    localProcessing: 'Zugangsdaten werden nur auf diesem Gerät verarbeitet.',
    localSecurityNoticeTitle: 'LOKALER SICHERHEITSHINWEIS',
    localSecurityNoticeText1: 'Temporäre Cookies und Autorisierungs-Header können bis zu 10 Minuten lokal gespeichert werden.',
    localSecurityNoticeText2: 'Kopierte Anmeldedaten verbleiben in der Zwischenablage, bis sie überschrieben werden.',
    clearCapturedData: 'Erfasste Daten löschen',
    dataClearedSuccess: 'Temporär erfasste Daten wurden gelöscht.',
    dataClearedError: 'Temporäre Daten konnten nicht gelöscht werden.',
    requestingAccess: 'Zugriff auf gewählte Domain wird angefordert…',
    selectPlatformPrompt: 'Bitte eine Plattform auswählen.',
    permissionNotGranted: 'Domain-Berechtigung wurde nicht erteilt.',
    platformOpenedPrompt: 'Plattform geöffnet. Bitte anmelden und erneut auf „AUTORISIEREN & KOPIEREN“ klicken.',
    credentialCopied: 'Anmeldedaten kopiert. Direkt in OmniRoute einfügen.',
    couldNotCopy: 'Anmeldedaten konnten nicht kopiert werden.',
    activeTabError: 'Aktiver Tab konnte nicht identifiziert werden.',
    extraDataTitle: 'Zusätzliche Angaben',
    extraDataLabel: 'Zusätzlicher Wert',
    cancelBtn: 'Abbrechen',
    continueBtn: 'Fortfahren',
    errNotFound1PSID: '__Secure-1PSID wurde nicht gefunden. Bitte bei Gemini anmelden und Seite aktualisieren.',
    errNotFoundToken: 'Token-Cookie nicht gefunden.',
    errNotFoundCookies: 'Keine Cookies gefunden. Bitte Seite aktualisieren.',
    errNotFoundSession: 'Sitzungs-Cookie nicht gefunden.',
    errNotFoundCookie: '{cookie} nicht gefunden.',
    errNotFoundStorage: '{keys} nicht im lokalen Speicher gefunden.',
    errOperationCancelled: 'Vorgang abgebrochen.',
    errCapturedToken: 'Access_Token noch nicht erfasst.',
    errQwenToken: 'Token oder tongyi_sso_ticket nicht gefunden.',
    errT3Required: 'Sowohl convex-session-id als auch vollständiges Cookie erforderlich.',
    errM365Token: 'Chathub WebSocket access_token noch nicht erfasst.',
    errM365Segment: 'Chathub-Pfadsegment fehlt.',
    errMissingFields: 'Fehlend: {fields}.',
    errUnsupportedMethod: 'Methode noch nicht unterstützt.',
    supportedPlatformsAria: 'Unterstützte Plattformen',
    innerEmailTitle: 'Inner.ai E-Mail',
    innerEmailText: 'OmniRoute benötigt das Token gefolgt von der Inner.ai E-Mail.',
    emailLabel: 'E-Mail',
    m365PathPrompt: 'Spezifisches Chathub-Segment aus der WebSocket-URL kopieren.',
    m365PathLabel: 'Chathub-Segment',
    updaterTitle: 'OmniRoute Updater',
    updaterCheckNow: 'Jetzt prüfen',
    updaterChecking: 'Suche nach Updates...',
    updaterServerTitle: 'OmniRoute Server',
    updaterExtensionTitle: 'Web-Erweiterung',
    updaterUpToDate: 'Auf dem neuesten Stand',
    updaterUpdateAvailable: 'Update verfügbar',
    updaterServerOffline: 'Server offline',
    updaterCopyCommand: 'Update-Befehl kopieren',
    updaterCopied: 'Kopiert!',
    updaterDownload: 'Neueste Version herunterladen',
    updaterSettings: 'Einstellungen',
    updaterClose: 'Schließen',
  },
  fr: {
    detectedNode: 'NŒUD DÉTECTÉ',
    analyzingTab: 'Analyse de l’onglet actif…',
    openSupported: 'Ouvrez une plateforme prise en charge et connectez-vous.',
    authorizeCopy: 'AUTORISER ET COPIER',
    openPlatform: 'Ouvrir la plateforme',
    localOnly: 'LOCAL UNIQUEMENT // ZÉRO EXFIL',
    searchPlatform: 'Rechercher une plateforme…',
    settings: 'SETTINGS',
    localProcessing: 'Les identifiants sont traités uniquement sur cet appareil.',
    localSecurityNoticeTitle: 'AVIS DE SÉCURITÉ LOCALE',
    localSecurityNoticeText1: 'Les cookies et en-têtes d’autorisation temporaires peuvent être conservés jusqu’à 10 minutes.',
    localSecurityNoticeText2: 'Les identifiants copiés restent dans le presse-papiers jusqu’à leur remplacement.',
    clearCapturedData: 'Effacer les données capturées',
    dataClearedSuccess: 'Données temporaires capturées effacées.',
    dataClearedError: 'Impossible d’effacer les données temporaires.',
    requestingAccess: 'Demande d’accès au domaine sélectionné…',
    selectPlatformPrompt: 'Veuillez sélectionner une plateforme.',
    permissionNotGranted: 'L’autorisation du domaine n’a pas été accordée.',
    platformOpenedPrompt: 'Plateforme ouverte. Connectez-vous puis cliquez à nouveau sur « AUTORISER ET COPIER ».',
    credentialCopied: 'Identifiant copié. Collez-le directement dans OmniRoute.',
    couldNotCopy: 'Impossible de copier l’identifiant.',
    activeTabError: 'Impossible d’identifier l’onglet actif.',
    extraDataTitle: 'Informations supplémentaires',
    extraDataLabel: 'Valeur supplémentaire',
    cancelBtn: 'Annuler',
    continueBtn: 'Continuer',
    errNotFound1PSID: '__Secure-1PSID introuvable. Veuillez vous connecter à Gemini et actualiser.',
    errNotFoundToken: 'Cookie token introuvable.',
    errNotFoundCookies: 'Cookies introuvables. Veuillez actualiser la page.',
    errNotFoundSession: 'Cookie de session introuvable.',
    errNotFoundCookie: '{cookie} introuvable.',
    errNotFoundStorage: '{keys} introuvable dans le stockage local.',
    errOperationCancelled: 'Opération annulée.',
    errCapturedToken: 'Access_token non encore capturé. Actualisez la page.',
    errQwenToken: 'Token ou tongyi_sso_ticket introuvable.',
    errT3Required: 'convex-session-id et Cookie complet requis.',
    errM365Token: 'Access_token WebSocket Chathub non encore capturé.',
    errM365Segment: 'Segment Chathub manquant.',
    errMissingFields: 'Manquant : {fields}.',
    errUnsupportedMethod: 'Méthode pas encore prise en charge.',
    supportedPlatformsAria: 'Plateformes prises en charge',
    innerEmailTitle: 'E-mail du compte Inner.ai',
    innerEmailText: 'OmniRoute nécessite le jeton suivi de l’e-mail utilisé sur Inner.ai.',
    emailLabel: 'E-mail',
    m365PathPrompt: 'Copiez le segment de chemin Chathub présent dans l’URL WebSocket.',
    m365PathLabel: 'Segment Chathub',
    updaterTitle: 'Mise à jour OmniRoute',
    updaterCheckNow: 'Vérifier maintenant',
    updaterChecking: 'Recherche de mises à jour...',
    updaterServerTitle: 'Serveur OmniRoute',
    updaterExtensionTitle: 'Extension Web',
    updaterUpToDate: 'À jour',
    updaterUpdateAvailable: 'Mise à jour disponible',
    updaterServerOffline: 'Serveur hors ligne',
    updaterCopyCommand: 'Copier la commande de mise à jour',
    updaterCopied: 'Copié !',
    updaterDownload: 'Télécharger la dernière version',
    updaterSettings: 'Paramètres',
    updaterClose: 'Fermer',
  },
  it: {
    detectedNode: 'NODO RILEVATO',
    analyzingTab: 'Analisi della scheda corrente…',
    openSupported: 'Apri una piattaforma supportata ed effettua l’accesso.',
    authorizeCopy: 'AUTORIZZA E COPIA',
    openPlatform: 'Apri piattaforma',
    localOnly: 'SOLO LOCALE // ZERO EXFIL',
    searchPlatform: 'Cerca piattaforma…',
    settings: 'SETTINGS',
    localProcessing: 'Le credenziali vengono elaborate solo su questo dispositivo.',
    localSecurityNoticeTitle: 'AVVISO DI SICUREZZA LOCALE',
    localSecurityNoticeText1: 'I cookie temporanei e le intestazioni di autorizzazione possono essere memorizzati localmente fino a 10 minuti.',
    localSecurityNoticeText2: 'Le credenziali copiate rimangono negli appunti fino alla sostituzione. Incolla subito in OmniRoute.',
    clearCapturedData: 'Cancella dati acquisiti',
    dataClearedSuccess: 'Dati temporanei acquisiti cancellati.',
    dataClearedError: 'Impossibile cancellare i dati temporanei.',
    requestingAccess: 'Richiesta di accesso al dominio selezionato…',
    selectPlatformPrompt: 'Seleziona una piattaforma.',
    permissionNotGranted: 'L’autorizzazione per il dominio non è stata concessa.',
    platformOpenedPrompt: 'Piattaforma aperta. Accedi e fai nuovamente clic su “AUTORIZZA E COPIA”.',
    credentialCopied: 'Credenziale copiata. Incollala direttamente in OmniRoute.',
    couldNotCopy: 'Impossibile copiare la credenziale.',
    activeTabError: 'Impossibile identificare la scheda attiva.',
    extraDataTitle: 'Dettagli aggiuntivi',
    extraDataLabel: 'Valore aggiuntivo',
    cancelBtn: 'Annulla',
    continueBtn: 'Continua',
    errNotFound1PSID: '__Secure-1PSID non trovato. Accedi a Gemini e aggiorna la pagina.',
    errNotFoundToken: 'Cookie token non trovato.',
    errNotFoundCookies: 'Cookie non trovati. Aggiorna la pagina o invia un messaggio.',
    errNotFoundSession: 'Cookie di sessione non trovato.',
    errNotFoundCookie: '{cookie} non trovato.',
    errNotFoundStorage: '{keys} non trovato nella memoria locale.',
    errOperationCancelled: 'Operazione annullata.',
    errCapturedToken: 'Access_token non ancora acquisito. Aggiorna la pagina.',
    errQwenToken: 'Token o tongyi_sso_ticket non trovato.',
    errT3Required: 'Sono necessari sia convex-session-id che il Cookie completo.',
    errM365Token: 'Access_token WebSocket Chathub non ancora acquisito.',
    errM365Segment: 'Segmento Chathub mancante.',
    errMissingFields: 'Mancante: {fields}.',
    errUnsupportedMethod: 'Metodo non ancora supportato.',
    supportedPlatformsAria: 'Piattaforme supportate',
    innerEmailTitle: 'Email dell’account Inner.ai',
    innerEmailText: 'OmniRoute richiede il token seguito dall’email utilizzata su Inner.ai.',
    emailLabel: 'Email',
    m365PathPrompt: 'Copia il segmento del percorso Chathub presente nell’URL del WebSocket.',
    m365PathLabel: 'Segmento Chathub',
    updaterTitle: 'Aggiornamento OmniRoute',
    updaterCheckNow: 'Controlla ora',
    updaterChecking: 'Controllo aggiornamenti...',
    updaterServerTitle: 'Server OmniRoute',
    updaterExtensionTitle: 'Estensione Web',
    updaterUpToDate: 'Aggiornato',
    updaterUpdateAvailable: 'Aggiornamento disponibile',
    updaterServerOffline: 'Server non in linea',
    updaterCopyCommand: 'Copia comando di aggiornamento',
    updaterCopied: 'Copiato!',
    updaterDownload: 'Scarica ultima versione',
    updaterSettings: 'Impostazioni',
    updaterClose: 'Chiudi',
  }
};

let currentLang = 'en';

function t(key, fallback = '', replacements = {}) {
  const langDict = I18N[currentLang] || I18N.en;
  let text = langDict[key] || chrome.i18n.getMessage(key) || I18N.en[key] || fallback || key;
  for (const [k, v] of Object.entries(replacements)) {
    text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    text = text.replace(new RegExp(`\\$${k.toUpperCase()}\\$`, 'g'), v);
  }
  return text;
}

function applyLocalization() {
  const setText = (selector, key, fallback) => {
    const element = document.querySelector(selector);
    if (!element) return;
    element.textContent = t(key, fallback);
  };

  setText('#detectedLabel', 'detectedNode', 'DETECTED NODE');
  if (!selected) {
    setText('#detectedName', 'analyzingTab', 'Analyzing current tab…');
    setText('#detectedHint', 'openSupported', 'Open a supported platform and sign in.');
  }
  setText('#copyLabel', 'authorizeCopy', 'AUTHORIZE AND COPY');
  setText('#openBtn', 'openPlatform', 'Open platform');
  setText('#localOnlyLabel', 'localOnly', 'LOCAL ONLY // ZERO EXFIL');
  setText('#securityNoticeTitle', 'localSecurityNoticeTitle', 'LOCAL SECURITY NOTICE');
  setText('#securityNoticeText1', 'localSecurityNoticeText1', 'Temporary cookies and authorization headers may be stored locally for up to 10 minutes during provider detection.');
  setText('#securityNoticeText2', 'localSecurityNoticeText2', 'Copied credentials remain on your clipboard until replaced. Paste immediately into OmniRoute and overwrite the clipboard afterwards.');
    setText('#clearDataBtn', 'clearCapturedData', 'Clear captured data');
  setText('#modalUpdaterTitle', 'updaterTitle', 'OmniRoute Updater');
  setText('#serverCardTitle', 'updaterServerTitle', 'OmniRoute Server');
  setText('#extCardTitle', 'updaterExtensionTitle', 'Web Extension');
  setText('#checkNowText', 'updaterCheckNow', 'Check Now');
  setText('#copyCmdText', 'updaterCopyCommand', 'Copy Update Command');
  setText('#downloadExtText', 'updaterDownload', 'Download Latest Release');
  setText('#openSettingsText', 'updaterSettings', 'Settings');
  if (latestUpdateInfo) {
    renderUpdaterUI(latestUpdateInfo);
  }

  const searchInput = document.querySelector('#searchInput');
  if (searchInput) {
    searchInput.placeholder = t('searchPlatform', 'Search platform…');
  }

  const providerList = document.querySelector('#providerList');
  if (providerList) {
    providerList.setAttribute('aria-label', t('supportedPlatformsAria', 'Supported platforms'));
  }

  const dialogTitle = document.querySelector('#dialogTitle');
  if (dialogTitle && !dialogTitle.dataset.custom) {
    dialogTitle.textContent = t('extraDataTitle', 'Additional details');
  }

  const dialogCancel = document.querySelector('#dialogCancel');
  if (dialogCancel) {
    dialogCancel.textContent = t('cancelBtn', 'Cancel');
  }

  const dialogSubmit = document.querySelector('#dialogSubmit');
  if (dialogSubmit) {
    dialogSubmit.textContent = t('continueBtn', 'Continue');
  }

  const langSelect = document.querySelector('#langSelect');
  if (langSelect) {
    langSelect.value = currentLang;
  }
}

async function setLanguage(lang) {
  if (I18N[lang]) {
    currentLang = lang;
  } else {
    currentLang = 'en';
  }
  try {
    await chrome.storage.local.set({ userLanguage: currentLang });
  } catch {}
  document.documentElement.lang = currentLang;
  applyLocalization();
  if (providers.length) {
    render($('#searchInput')?.value || '');
  }
}

async function clearCapturedData() {
  try {
    await chrome.runtime.sendMessage({ type: 'CLEAR_CAPTURED_DATA' });
    try { await chrome.storage.session.clear(); } catch {}
    setStatus(t('dataClearedSuccess', 'Temporary captured data cleared.'), 'success');
  } catch (e) {
    setStatus(t('dataClearedError', 'Could not clear temporary data.'), 'error');
  }
}

let providers = [];
let selected = null;
let activeTab = null;

const $ = (s) => document.querySelector(s);
const list = $('#providerList');
const statusBox = $('#status');
const detectedName = $('#detectedName');
const detectedHint = $('#detectedHint');
const copyBtn = $('#copyBtn');
const openBtn = $('#openBtn');

function setStatus(text, type = 'neutral') {
  statusBox.textContent = text;
  statusBox.className = `status ${type}`;
}

function hostMatches(host, domains) {
  if (!host || !domains) return false;
  const h = String(host).toLowerCase();
  return domains.some(d => {
    const cd = String(d).toLowerCase().replace(/^\./, '');
    return h === cd || h.endsWith('.' + cd);
  });
}

function render(filter = '') {
  const q = filter.trim().toLowerCase();
  const filtered = providers.filter(p => (p.name + ' ' + (p.hint || '')).toLowerCase().includes(q));
  $('#countBadge').textContent = filtered.length;
  list.replaceChildren();

  for (const p of filtered) {
    const b = document.createElement('button');
    b.className = 'card' + (selected?.id === p.id ? ' active' : '');
    b.type = 'button';
    b.innerHTML = `<img class="provider-icon" src="assets/providers/${p.id}.svg" alt="">
      <div><strong>${p.name}</strong><span>${p.hint || ''}</span></div>`;
    b.addEventListener('click', () => selectProvider(p));
    list.appendChild(b);
  }
}

function selectProvider(p) {
  selected = p;
  detectedName.textContent = p.name;
  detectedHint.textContent = p.hint || '';
  openBtn.disabled = false;
  copyBtn.disabled = false;
  render($('#searchInput').value);
}

async function getTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id || !tab.url) throw new Error(t('activeTabError', 'Could not identify the active tab.'));
  return tab;
}

async function ensurePermission(p) {
  const origins = (p.domains || []).map(d => `https://${d.replace(/^\./, '')}/*`);
  if (Array.isArray(p.cookieDomains)) {
    p.cookieDomains.forEach(d => origins.push(`https://${d.replace(/^\./, '')}/*`));
  }
  if (p.id === 'gemini' || p.id === 'gemini-business' || p.mode === 'google_cookie') {
    origins.push('https://google.com/*', 'https://*.google.com/*', 'https://accounts.google.com/*');
  }
  const uniqueOrigins = Array.from(new Set(origins));
  const has = await chrome.permissions.contains({ origins: uniqueOrigins });
  if (has) return true;
  return await chrome.permissions.request({ origins: uniqueOrigins });
}

async function cookiesFor(p, activeTabUrl = null) {
  const out = [];
  const seen = new Set();
  const addCookie = (c) => {
    if (!c || !c.name) return;
    const key = `${c.name}|${c.domain}|${c.path}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push(c);
    }
  };

  // 1. Query by provider default URL
  if (p.url) {
    try {
      const arr = await chrome.cookies.getAll({ url: p.url });
      if (arr) arr.forEach(addCookie);
    } catch {}
  }

  // 2. Query by active tab URL if host matches
  if (activeTabUrl) {
    try {
      const u = new URL(activeTabUrl);
      if (hostMatches(u.hostname, p.domains)) {
        const arr = await chrome.cookies.getAll({ url: activeTabUrl });
        if (arr) arr.forEach(addCookie);
      }
    } catch {}
  }

  // 3. Collect all relevant domains to query
  const domainsToCheck = new Set(p.domains || []);
  if (Array.isArray(p.cookieDomains)) {
    p.cookieDomains.forEach(d => domainsToCheck.add(d));
  }

  // Special domains for Google / Gemini
  if (p.id === 'gemini' || p.id === 'gemini-business' || p.mode === 'google_cookie') {
    domainsToCheck.add('google.com');
    domainsToCheck.add('.google.com');
    domainsToCheck.add('gemini.google.com');
    domainsToCheck.add('accounts.google.com');
    domainsToCheck.add('business.gemini.google');
  }

  // Add parent root domains for multi-level subdomains
  for (const d of Array.from(domainsToCheck)) {
    const cleanD = d.replace(/^\./, '');
    const parts = cleanD.split('.');
    if (parts.length > 2) {
      domainsToCheck.add(parts.slice(-2).join('.'));
    }
  }

  for (const d of domainsToCheck) {
    const cleanD = d.replace(/^\./, '');
    try {
      const arr = await chrome.cookies.getAll({ domain: cleanD });
      if (arr) arr.forEach(addCookie);
    } catch {}
    try {
      const arr = await chrome.cookies.getAll({ domain: '.' + cleanD });
      if (arr) arr.forEach(addCookie);
    } catch {}
    try {
      const arr = await chrome.cookies.getAll({ url: `https://${cleanD}/` });
      if (arr) arr.forEach(addCookie);
    } catch {}
  }

  return out;
}

const clean = (v) => String(v || '').trim().replace(/^Bearer\s+/i, '');

function cookieHeader(cookies) {
  return cookies
    .filter(c => c.name)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(c => `${c.name}=${c.value}`)
    .join('; ');
}

function cookieChunks(cookies, prefix) {
  return cookies
    .filter(c => c.name === prefix || c.name.startsWith(prefix + '.'))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function parseCookieString(str) {
  const result = [];
  if (!str) return result;
  const parts = str.split(';');
  for (const part of parts) {
    const idx = part.indexOf('=');
    if (idx > -1) {
      const name = part.slice(0, idx).trim();
      const value = part.slice(idx + 1).trim();
      if (name) {
        result.push({ name, value });
      }
    }
  }
  return result;
}

async function storageValues(keys) {
  if (!activeTab?.id) return {};
  try {
    const results = await chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      world: 'MAIN',
      args: [keys],
      func: (wanted) => {
        const result = {};
        for (const storage of [localStorage, sessionStorage]) {
          try {
            for (let i = 0; i < storage.length; i++) {
              const key = storage.key(i);
              if (!key) continue;
              if (wanted.some(w => key === w || key.toLowerCase().includes(w.toLowerCase()))) {
                let value = storage.getItem(key) || '';
                try {
                  const j = JSON.parse(value);
                  if (typeof j === 'string') value = j;
                  else if (j && typeof j === 'object') {
                    value = j.token || j.access_token || j.accessToken || j.value || value;
                  }
                } catch {}
                if (value && !result[key]) {
                  result[key] = String(value).trim().replace(/^Bearer\s+/i, '');
                }
              }
            }
          } catch {}
        }
        return result;
      }
    });
    return results?.[0]?.result || {};
  } catch (e) {
    console.warn('Scripting storage extraction error:', e);
    return {};
  }
}

async function captured(host) {
  try {
    return await chrome.runtime.sendMessage({ type: 'GET_CAPTURED', hostname: host });
  } catch {
    return null;
  }
}

async function askExtra(title, text, label, placeholder = '') {
  const dTitle = $('#dialogTitle');
  dTitle.textContent = title;
  dTitle.dataset.custom = 'true';
  $('#dialogText').textContent = text;
  $('#extraLabel').querySelector('span').textContent = label;
  $('#extraInput').value = '';
  $('#extraInput').placeholder = placeholder;
  const d = $('#extraDialog');
  d.showModal();
  return await new Promise((resolve) => {
    d.addEventListener('close', () => {
      delete dTitle.dataset.custom;
      resolve(d.returnValue === 'default' ? $('#extraInput').value.trim() : '');
    }, { once: true });
  });
}

async function extract(p) {
  const cookies = await cookiesFor(p, activeTab?.url);

  async function findCookieValue(name, fallbacks = []) {
    const allNames = [name, ...fallbacks];
    for (const n of allNames) {
      const c = cookies.find(x => x.name === n);
      if (c && c.value) return c.value;
    }
    const domains = (p.domains || []).concat(p.cookieDomains || []);
    for (const d of domains) {
      const cap = await captured(d);
      if (cap?.cookie) {
        const parsed = parseCookieString(cap.cookie);
        for (const n of allNames) {
          const c = parsed.find(x => x.name === n);
          if (c && c.value) return c.value;
        }
      }
    }
    return null;
  }

  if (p.mode === 'cookie_value') {
    const val = await findCookieValue(p.cookie);
    if (!val) throw new Error(t('errNotFoundCookie', `Could not find ${p.cookie}.`, { cookie: p.cookie }));
    return val;
  }

  if (p.mode === 'cookie_value_prefix') {
    const chunks = cookieChunks(cookies, p.cookie);
    if (chunks.length) {
      return chunks.map(x => x.value).join('');
    }
    const val = await findCookieValue(p.cookie);
    if (val) return val;
    throw new Error(t('errNotFoundCookie', `Could not find ${p.cookie}.`, { cookie: p.cookie }));
  }

  if (p.mode === 'cookie_first') {
    for (const n of p.cookies) {
      const val = await findCookieValue(n);
      if (val) return val;
    }
    const cap = await captured(p.domains[0]);
    if (cap?.cookie) return cap.cookie;
    throw new Error(t('errNotFoundSession', 'Could not find session cookie.'));
  }

  if (p.mode === 'cookie_header') {
    const cap = await captured(p.domains[0]);
    const header = cap?.cookie || cookieHeader(cookies);
    if (!header) throw new Error(t('errNotFoundCookies', 'Could not find cookies. Please refresh the page or send a message.'));
    const missing = (p.required || []).filter(n => !header.includes(n + '=') && !cookies.some(c => c.name === n || c.name.startsWith(n + '.')));
    if (missing.length) throw new Error(t('errMissingFields', `Missing: ${missing.join(', ')}.`, { fields: missing.join(', ') }));
    return header;
  }

  if (p.mode === 'storage') {
    const vals = await storageValues(p.keys);
    const value = Object.values(vals)[0];
    if (!value) throw new Error(t('errNotFoundStorage', `Could not find ${p.keys.join(' / ')} in local storage.`, { keys: p.keys.join(' / ') }));
    return value;
  }

  if (p.mode === 'google_cookie') {
    let one = await findCookieValue('__Secure-1PSID');
    let ts = await findCookieValue('__Secure-1PSIDTS');
    let cc = await findCookieValue('__Secure-1PSIDCC');

    // Also check captured for Google domains
    if (!one) {
      for (const d of ['gemini.google.com', 'google.com', 'accounts.google.com']) {
        const cap = await captured(d);
        if (cap?.cookie) {
          const parsed = parseCookieString(cap.cookie);
          const fOne = parsed.find(c => c.name === '__Secure-1PSID');
          const fTs = parsed.find(c => c.name === '__Secure-1PSIDTS');
          const fCc = parsed.find(c => c.name === '__Secure-1PSIDCC');
          if (fOne) {
            one = fOne.value;
            if (fTs && !ts) ts = fTs.value;
            if (fCc && !cc) cc = fCc.value;
            break;
          }
        }
      }
    }

    // Fallback to __Secure-3PSID if __Secure-1PSID not found
    if (!one) {
      const three = await findCookieValue('__Secure-3PSID');
      const threeTs = await findCookieValue('__Secure-3PSIDTS');
      const threeCc = await findCookieValue('__Secure-3PSIDCC');
      if (three) {
        let res = `__Secure-3PSID=${three}`;
        if (threeTs) res += `; __Secure-3PSIDTS=${threeTs}`;
        if (threeCc) res += `; __Secure-3PSIDCC=${threeCc}`;
        return res;
      }
    }

    if (!one) {
      throw new Error(t('errNotFound1PSID', 'Could not find __Secure-1PSID. Please sign in to Gemini and refresh the page.'));
    }

    let result = `__Secure-1PSID=${one}`;
    if (ts) result += `; __Secure-1PSIDTS=${ts}`;
    if (cc) result += `; __Secure-1PSIDCC=${cc}`;
    return result;
  }

  if (p.mode === 'inner') {
    let token = await findCookieValue('token');
    if (!token) throw new Error(t('errNotFoundToken', 'Could not find token cookie.'));
    const email = await askExtra(
      t('innerEmailTitle', 'Inner.ai account email'),
      t('innerEmailText', 'OmniRoute requires the token followed by the email used in Inner.ai.'),
      t('emailLabel', 'Email'),
      'user@example.com'
    );
    if (!email) throw new Error(t('errOperationCancelled', 'Operation cancelled.'));
    return `${token} ${email}`;
  }

  if (p.mode === 'captured_token') {
    const cap = await captured(p.domains[0]);
    const token = cap?.accessToken || cap?.authorization;
    if (!token) throw new Error(t('errCapturedToken', 'Access token not yet captured. Please refresh the page or send a message.'));
    return clean(token);
  }

  if (p.mode === 'qwen') {
    const vals = await storageValues(['token']);
    const token = Object.values(vals)[0] || await findCookieValue('tongyi_sso_ticket');
    if (!token) throw new Error(t('errQwenToken', 'Could not find token or tongyi_sso_ticket.'));
    return token;
  }

  if (p.mode === 't3') {
    const vals = await storageValues(['convex-session-id']);
    const session = Object.values(vals)[0];
    const cap = await captured(p.domains[0]);
    const header = cap?.cookie || cookieHeader(cookies);
    if (!session || !header) throw new Error(t('errT3Required', 'Both convex-session-id and full Cookie are required.'));
    return `${session}\n${header}`;
  }

  if (p.mode === 'manual_m365') {
    const cap = await captured(p.domains[0]);
    const token = cap?.accessToken || '';
    const path = await askExtra(
      'Microsoft 365 Copilot',
      t('m365PathPrompt', 'Copy the specific Chathub path segment present in the WebSocket URL.'),
      t('m365PathLabel', 'Chathub Segment'),
      'e.g.: cid/... or path indicated by OmniRoute'
    );
    if (!token) throw new Error(t('errM365Token', 'Chathub WebSocket access_token not yet captured.'));
    if (!path) throw new Error(t('errM365Segment', 'Missing Chathub segment.'));
    return `${token} ${path}`;
  }

  throw new Error(t('errUnsupportedMethod', 'Method not yet supported.'));
}

async function copySelected() {
  try {
    copyBtn.disabled = true;
    setStatus(t('requestingAccess', 'Requesting access to selected domain…'));
    activeTab = await getTab();
    if (!selected) throw new Error(t('selectPlatformPrompt', 'Please select a platform.'));
    const ok = await ensurePermission(selected);
    if (!ok) throw new Error(t('permissionNotGranted', 'Domain permission was not granted.'));

    const currentHost = new URL(activeTab.url).hostname;
    if (!hostMatches(currentHost, selected.domains)) {
      await chrome.tabs.update(activeTab.id, { url: selected.url });
      setStatus(t('platformOpenedPrompt', 'Platform opened. Sign in and click “AUTHORIZE AND COPY” again.'));
      return;
    }

    const credential = await extract(selected);
    await navigator.clipboard.writeText(credential);
    setStatus(t('credentialCopied', 'Credential copied. Paste it directly into OmniRoute.'), 'success');
  } catch (e) {
    setStatus(e.message || t('couldNotCopy', 'Could not copy credential.'), 'error');
  } finally {
    copyBtn.disabled = false;
  }
}


let latestUpdateInfo = null;

function renderUpdaterUI(info) {
  if (!info) return;
  latestUpdateInfo = info;

  const btnText = $('#updaterBtnText');
  const btn = $('#updaterBtn');
  const serverVersion = $('#serverVersionText');
  const serverBadge = $('#serverStatusBadge');
  const copyCmdBtn = $('#copyUpdateCmdBtn');
  const extVersion = $('#extVersionText');
  const extBadge = $('#extStatusBadge');
  const downloadBtn = $('#downloadExtBtn');

  // Update header badge
  if (info.hasUpdate) {
    if (btn) {
      btn.className = 'updater-badge badge-update';
      btn.title = t('updaterUpdateAvailable', 'Update Available');
    }
    if (btnText) btnText.textContent = t('updaterUpdateAvailable', 'Update Available');
  } else {
    if (btn) {
      btn.className = 'updater-badge badge-ok';
      btn.title = t('updaterUpToDate', 'Up to date');
    }
    if (btnText) btnText.textContent = `v${info.extension?.current || '8.0.0'}`;
  }

  // Render Server Card
  if (info.server) {
    const s = info.server;
    if (s.status === 'update_available') {
      if (serverVersion) serverVersion.textContent = `v${s.current || '?'} → v${s.latest}`;
      if (serverBadge) {
        serverBadge.className = 'status-pill status-update';
        serverBadge.textContent = t('updaterUpdateAvailable', 'Update Available');
      }
      if (copyCmdBtn) copyCmdBtn.style.display = 'flex';
    } else if (s.status === 'server_offline') {
      if (serverVersion) serverVersion.textContent = s.latest ? `npm: v${s.latest}` : t('updaterServerOffline', 'Server Offline');
      if (serverBadge) {
        serverBadge.className = 'status-pill status-offline';
        serverBadge.textContent = t('updaterServerOffline', 'Server Offline');
      }
      if (copyCmdBtn) copyCmdBtn.style.display = 'flex';
    } else {
      if (serverVersion) serverVersion.textContent = `v${s.current || s.latest || '3.8.49'}`;
      if (serverBadge) {
        serverBadge.className = 'status-pill status-ok';
        serverBadge.textContent = t('updaterUpToDate', 'Up to date');
      }
      if (copyCmdBtn) copyCmdBtn.style.display = 'none';
    }
  }

  // Render Extension Card
  if (info.extension) {
    const e = info.extension;
    if (e.status === 'update_available') {
      if (extVersion) extVersion.textContent = `v${e.current} → v${e.latest}`;
      if (extBadge) {
        extBadge.className = 'status-pill status-update';
        extBadge.textContent = t('updaterUpdateAvailable', 'Update Available');
      }
      if (downloadBtn) {
        downloadBtn.style.display = 'inline-flex';
        downloadBtn.href = e.releaseUrl || 'https://github.com/rktiwari00/omniroute-web-extension/releases';
      }
    } else {
      if (extVersion) extVersion.textContent = `v${e.current || '8.0.0'}`;
      if (extBadge) {
        extBadge.className = 'status-pill status-ok';
        extBadge.textContent = t('updaterUpToDate', 'Up to date');
      }
      if (downloadBtn) downloadBtn.style.display = 'none';
    }
  }
}

async function runUpdaterCheck(forceRefresh = false) {
  const checkIcon = $('#checkNowIcon');
  const btn = $('#updaterBtn');
  if (checkIcon) checkIcon.classList.add('spinning');
  if (btn && forceRefresh) btn.classList.add('badge-checking');

  try {
    const settings = await chrome.storage.local.get(['omniroute_url', 'omniroute_api_key']);
    const omnirouteUrl = settings.omniroute_url || 'http://localhost:20128';
    const apiKey = settings.omniroute_api_key || '';

    if (typeof OmniRouteUpdater !== 'undefined') {
      const info = await OmniRouteUpdater.checkForUpdates({
        omnirouteUrl,
        apiKey,
        forceRefresh
      });
      renderUpdaterUI(info);
    }
  } catch (err) {
    console.warn('Updater check error:', err);
  } finally {
    if (checkIcon) checkIcon.classList.remove('spinning');
    if (btn) btn.classList.remove('badge-checking');
  }
}

async function init() {
  // Load saved language preference or default to English
  try {
    const stored = await chrome.storage.local.get('userLanguage');
    if (stored?.userLanguage && I18N[stored.userLanguage]) {
      currentLang = stored.userLanguage;
    } else {
      currentLang = 'en';
    }
  } catch {
    currentLang = 'en';
  }

  document.documentElement.lang = currentLang;
  applyLocalization();

  providers = await (await fetch('providers.json')).json();
  try {
    activeTab = await getTab();
  } catch (e) {
    console.warn('Tab detection:', e);
  }

  let host = '';
  if (activeTab?.url) {
    try { host = new URL(activeTab.url).hostname; } catch {}
  }

  selected = providers.find(p => hostMatches(host, p.domains)) || providers[0];

  // Run background update check if enabled
  try {
    const settings = await chrome.storage.local.get('auto_check_updates');
    if (settings.auto_check_updates !== false) {
      runUpdaterCheck(false);
    }
  } catch {}
  selectProvider(selected);
  render();
}

$('#copyBtn').addEventListener('click', copySelected);
$('#openBtn').addEventListener('click', () => selected && chrome.tabs.create({ url: selected.url }));
$('#searchInput').addEventListener('input', (e) => render(e.target.value));
$('#settingsBtn').addEventListener('click', () => chrome.runtime.openOptionsPage());
$('#privacyBtn').addEventListener('click', () => chrome.tabs.create({ url: chrome.runtime.getURL('privacy.html') }));
$('#clearDataBtn')?.addEventListener('click', clearCapturedData);
$('#langSelect')?.addEventListener('change', (e) => setLanguage(e.target.value));

$('#updaterBtn')?.addEventListener('click', () => {
  const modal = $('#updaterModal');
  if (!modal) return;
  const isHidden = modal.hasAttribute('hidden');
  if (isHidden) {
    modal.removeAttribute('hidden');
    if (!latestUpdateInfo) {
      runUpdaterCheck(false);
    }
  } else {
    modal.setAttribute('hidden', '');
  }
});

$('#closeUpdaterBtn')?.addEventListener('click', () => {
  $('#updaterModal')?.setAttribute('hidden', '');
});

$('#updaterModal')?.addEventListener('click', (e) => {
  if (e.target.id === 'updaterModal') {
    $('#updaterModal')?.setAttribute('hidden', '');
  }
});

$('#checkNowBtn')?.addEventListener('click', () => {
  runUpdaterCheck(true);
});

$('#copyUpdateCmdBtn')?.addEventListener('click', async () => {
  const cmd = (typeof OmniRouteUpdater !== 'undefined' && OmniRouteUpdater.UPDATE_COMMAND)
    ? OmniRouteUpdater.UPDATE_COMMAND
    : 'npm install -g omniroute@latest';
  await navigator.clipboard.writeText(cmd);
  const copyText = $('#copyCmdText');
  if (copyText) {
    const orig = copyText.textContent;
    copyText.textContent = t('updaterCopied', 'Copied!');
    setTimeout(() => { copyText.textContent = orig; }, 2000);
  }
});

$('#openSettingsBtn')?.addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

init().catch(e => setStatus(e.message, 'error'));
