const translations = {
  en: {
    appTitle: "Spoolman Integration 0.5.0",
    appSubtitle: "Tracking runs on server side. Browser can be closed safely.",
    bridgeServer: "Bridge server",
    manualServerUrl: "Manual server URL",
    connect: "Connect",
    discoverServer: "Discover server",
    connectedPrefix: "Connected",
    notConnected: "Not connected",
    settings: "Settings",
    language: "Language",
    auto: "Auto",
    english: "English",
    danish: "Dansk",
    resolvedLanguage: "Resolved",
    spoolmanUrl: "Spoolman URL",
    rrfUrl: "RRF URL",
    rrfPassword: "RRF password",
    hotendCount: "Hotend count",
    saveSettings: "Save settings",
    refreshSpools: "Refresh spools",
    saving: "Saving settings...",
    saved: "Settings saved",
    toolToSpoolMapping: "Tool to spool mapping",
    notAssigned: "Not assigned",
    usageMeasured: "Measured",
    usageReported: "Reported",
    tracking: "Tracking",
    trackingRunning: "Tracking: Running",
    trackingStopped: "Tracking: Stopped",
    startTracking: "Start tracking",
    stopTracking: "Stop tracking",
    pleaseWait: "Please wait...",
    pollNow: "Poll now",
    lastPoll: "Last poll",
    never: "Never",
    searchingNetwork: "Searching local network for bridge server...",
    discoverFailed: "Could not discover server. Enter IP in Manual server URL and click Connect.",
    connectedBridge: "Connected to bridge server",
    invalidBridgeUrl: "Invalid bridge server URL. Use http://IP:9378",
    unreachableBridgeUrl: "Could not reach bridge server at {url}",
    enterValidUrl: "Enter a valid URL (e.g. http://192.168.86.85:9378).",
    trackingStartedMessage: "Tracking started.",
    trackingStoppedMessage: "Tracking stopped.",
    trackedUsageFormatMm: "{value} mm",
    trackedUsageFormatMeters: "{meters} m ({mm} mm)"
  },
  da: {
    appTitle: "Spoolman Integration 0.5.0",
    appSubtitle: "Tracking kører på serveren. Browseren kan lukkes sikkert.",
    bridgeServer: "Bridge server",
    manualServerUrl: "Manuel server-URL",
    connect: "Forbind",
    discoverServer: "Find server",
    connectedPrefix: "Forbundet",
    notConnected: "Ikke forbundet",
    settings: "Indstillinger",
    language: "Sprog",
    auto: "Auto",
    english: "English",
    danish: "Dansk",
    resolvedLanguage: "Aktivt sprog",
    spoolmanUrl: "Spoolman URL",
    rrfUrl: "RRF URL",
    rrfPassword: "RRF kodeord",
    hotendCount: "Antal hotends",
    saveSettings: "Gem indstillinger",
    refreshSpools: "Opdater spools",
    saving: "Gemmer indstillinger...",
    saved: "Indstillinger gemt",
    toolToSpoolMapping: "Tool til spool mapping",
    notAssigned: "Ikke tildelt",
    usageMeasured: "Målt",
    usageReported: "Rapporteret",
    tracking: "Tracking",
    trackingRunning: "Tracking: Kører",
    trackingStopped: "Tracking: Stoppet",
    startTracking: "Start tracking",
    stopTracking: "Stop tracking",
    pleaseWait: "Vent...",
    pollNow: "Poll nu",
    lastPoll: "Sidste poll",
    never: "Aldrig",
    searchingNetwork: "Søger på lokalt netværk efter bridge server...",
    discoverFailed: "Kunne ikke finde server automatisk. Indtast IP i Manuel server-URL og tryk Forbind.",
    connectedBridge: "Forbundet til bridge server",
    invalidBridgeUrl: "Ugyldig bridge server-URL. Brug http://IP:9378",
    unreachableBridgeUrl: "Kunne ikke nå bridge server på {url}",
    enterValidUrl: "Indtast en gyldig URL (f.eks. http://192.168.86.85:9378).",
    trackingStartedMessage: "Tracking startet.",
    trackingStoppedMessage: "Tracking stoppet.",
    trackedUsageFormatMm: "{value} mm",
    trackedUsageFormatMeters: "{meters} m ({mm} mm)"
  }
};

export function resolveLanguage(languageSetting, browserLocale) {
  if (languageSetting === "en" || languageSetting === "da") {
    return languageSetting;
  }

  if (!browserLocale) {
    return "en";
  }

  const normalized = browserLocale.toLowerCase();
  return normalized.startsWith("da") ? "da" : "en";
}

export function getMessages(language) {
  return translations[language] ?? translations.en;
}
