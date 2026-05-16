const translations = {
  en: {
    connected: "Connected",
    disconnected: "Disconnected",
    saving: "Saving settings...",
    saved: "Settings saved",
    trackingRunning: "Tracking is running",
    trackingStopped: "Tracking is stopped"
  },
  da: {
    connected: "Forbundet",
    disconnected: "Ikke forbundet",
    saving: "Gemmer indstillinger...",
    saved: "Indstillinger gemt",
    trackingRunning: "Tracking kører",
    trackingStopped: "Tracking er stoppet"
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
