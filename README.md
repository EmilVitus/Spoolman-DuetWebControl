# 🧵 Spoolman DuetWebControl Integration

En komplet filament management integration mellem [Spoolman](https://github.com/Donkie/Spoolman) og [DuetWebControl](https://github.com/Duet3D/DuetWebControl) designet til E3D Toolchanger systemer med op til 4 hotends.

![Version](https://img.shields.io/badge/version-0.3.5-blue)
![License](https://img.shields.io/badge/license-GPL--3.0-green)
![DWC](https://img.shields.io/badge/DWC-3.6+-orange)

## ✨ **Features**

- 🔧 **E3D Toolchanger Support**: Fuld support til 4 hotends (T0-T3)
- 📊 **Automatisk Filament Tracking**: Real-time tracking af filament forbrug
- 🌐 **Cross-Device Sync**: Sync filament valg på tværs af enheder via Spoolman
- 🎨 **Farve Visualisering**: Farve cirkler og emojis for nem identifikation  
- 🔄 **Auto-Connect**: Automatisk genopkobling og server discovery
- 🎭 **Demo Mode**: Test alle funktioner uden Spoolman server
- 📱 **Responsive Design**: Optimeret til både desktop og mobile enheder

## 🔧 **Systemkrav**

### **Hardware:**
- RepRapFirmware 3.4+ printer
- E3D Toolchanger (eller kompatibelt multi-tool system)
- Op til 4 hotends/extrudere

### **Software:**
- DuetWebControl 3.6+
- Spoolman server (valgfri - demo mode tilgængelig)
- Docker (hvis du bruger Nginx CORS proxy)

## 🚀 **Hurtig Installation**

### **1. Download Plugin**
Download seneste release fra [Releases](https://github.com/EmilVitus/Spoolman-DuetWebControl/releases) eller brug kildekoden.

### **2. Installer i DWC**
1. Åbn DuetWebControl i din browser
2. Gå til **Settings** → **General** → **Plugins**
3. Klik **Upload Plugin**
4. Vælg downloaded ZIP fil eller upload `plugin.json` + `dwc/` mappe
5. Restart DWC

### **3. CORS Setup (Vigtig!)**
For at bruge en rigtig Spoolman server skal du opsætte CORS. Se detaljeret guide i [`SpoolmanCORS-Setup/`](./SpoolmanCORS-Setup/).

**TL;DR:** Brug Nginx reverse proxy på port 7913 for at tilføje CORS headers til Spoolman.

## 📋 **Detaljeret Installation**

Se [`INSTALLATION.md`](./INSTALLATION.md) for komplet step-by-step guide.

## 🎯 **Brug**

### **Første Gang Setup**
1. Efter installation, åbn **Plugins** → **Spoolman Integration**
2. Vælg enten:
   - 🔌 **Forbind til Spoolman Server** (anbefalet)
   - 🎭 **Start med Demo Data** (til test)

### **Spoolman Server Setup**
1. Indtast din Spoolman URL (f.eks. `http://192.168.1.100:7913`)
2. Klik **Test Forbindelse**
3. Vælg filament for hver hotend (T0-T3)

### **Filament Tracking**
1. Vælg filament for de hotends du vil tracke
2. Klik **▶️ Start Tracking** i toppen
3. Plugin tracker automatisk extruder bevægelser
4. Brug **📡 Sync til Spoolman** for at opdatere vægt

### **Cross-Device Sync**
- Plugin gemmer automatisk dine filament valg i Spoolman
- Andre enheder synkroniserer automatisk når de forbinder
- Brug **🔄 Sync enheder** knappen til manuel sync

## 🔧 **Konfiguration**

### **RRF URL**
Plugin bruger standard RRF URL (`http://toolchanger`). Juster i koden hvis nødvendigt:
```javascript
rrfUrl: 'http://din-printer-ip' // Linje 40 i Spoolman.4ea07003.js
```

### **Tracking Interval**
Standard 10 sekunder. Juster i koden:
```javascript
setInterval(function() {
    self.trackFilamentUsage();
}, 10000); // 10000ms = 10 sekunder
```

## 🐛 **Troubleshooting**

### **"Failed to fetch" Fejl**
- **Problem**: CORS blokering fra browser
- **Løsning**: Opsæt Nginx CORS proxy (se [`SpoolmanCORS-Setup/`](./SpoolmanCORS-Setup/))

### **"Forbundet - ingen spools fundet"**
- **Problem**: Tom Spoolman database
- **Løsning**: Tilføj filament spools i Spoolman først

### **Tracking Rapporterer Forkerte Værdier**
- **Problem**: Extruder position resets under print
- **Løsning**: Undgå at resette extruder positioner mellem lag

### **Plugin Ikke Synlig**
- **Problem**: Navigation registrering fejlede
- **Løsning**: Check browser konsol (F12) for fejl, genstart DWC

## 🌐 **Demo Mode**

Test alle funktioner uden Spoolman server:
1. Klik **🎭 Start med Demo Data**
2. Plugin bruger mock data med 5 filament spools
3. Alle funktioner virker, men data gemmes ikke permanent

## 🔄 **Updates**

Plugin inkluderer automatisk version checking. Nye versioner kan downloades fra [Releases](https://github.com/EmilVitus/Spoolman-DuetWebControl/releases).

## 🤝 **Bidrag**

Bidrag er velkomne! Se venligst [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 **Licens**

Dette projekt er licenseret under GPL-3.0 License - se [LICENSE](./LICENSE) filen for detaljer.

## 🙏 **Anerkendelser**

- [Spoolman](https://github.com/Donkie/Spoolman) af Donkie
- [DuetWebControl](https://github.com/Duet3D/DuetWebControl) af Duet3D team
- [spoolman_rrf_integration](https://github.com/Superbrain8/spoolman_rrf_integration) for tracking inspiration

## 📞 **Support**

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/EmilVitus/Spoolman-DuetWebControl/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/EmilVitus/Spoolman-DuetWebControl/discussions)

---

**Made with ❤️ for the 3D printing community**