# 📈 Changelog

Alle vigtige ændringer til dette projekt vil være dokumenteret i denne fil.

Formatet er baseret på [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
og dette projekt følger [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Advanced tracking settings
- Print job integration
- Material cost calculations

## [0.5.0] - 2025-01-11

### 🚀 **MAJOR: Server-Side Filament Tracking**
- 🐍 **Python Tracking Service** - Komplet server-side automatisk filament tracking
- 🐳 **Docker Integration** - SpoolmanCORS-Setup-V3 med Spoolman + CORS + Tracking service
- ⚡ **24/7 Automatisk Tracking** - Ingen browser afhængighed, kører kontinuerligt
- 📊 **Real-time RRF Integration** - Poller RepRapFirmware extruder positioner hver 30 sekunder
- 🔄 **Auto-sync til Spoolman** - Automatisk opdatering af filament forbrug i Spoolman database

### Added
- 📱 **Server Status Monitoring** - DWC plugin viser server tracking status og sidste opdatering
- 💾 **Persistent Tracking State** - Tracking data gemmes og overlever genstart
- 🔧 **Environment Configuration** - RRF_URL, POLL_INTERVAL, AUTO_SYNC konfiguration
- 🩺 **Health Checks** - Docker health monitoring af tracking service
- 📋 **Comprehensive Documentation** - README, setup guide og troubleshooting for V3

### Changed
- ❌ **Removed Client-Side Tracking** - Fjernet browser-baseret tracking (start/stop knapper)
- 🔄 **UI Redesign** - Server tracking status erstatter gamle tracking controls
- 📊 **Real-time Status Display** - Sidst opdateret tidsstempel og service tilstand
- 🎨 **Color-Coded Status** - Grøn = aktiv, rød = fejl, gul = inaktiv

### Technical
- 🐍 `spoolman_tracker.py` - Async Python service med aiohttp
- 🐳 Docker Compose setup med 3 services (Spoolman + CORS + Tracker)
- 📡 RRF API integration via `/rr_model?key=move`
- 💾 JSON state persistence i Docker volume
- 🔄 30-sekunder polling interval med konfigurerbar timeout

### Breaking Changes
- 🚨 **Kræver SpoolmanCORS-Setup-V3** - Tracking funktionalitet kræver ny Docker setup
- 🚨 **Client tracking fjernet** - Gamle tracking knapper er erstattet med server status

## [0.4.9] - 2025-01-11

### Fixed
- 🛠️ **Dropdown reset bug** - Sprog dropdown hopper ikke længere tilbage til "auto" når besked forsvinder
- 🎨 **Layout interference** - Sprog besked flyttet under dropdown for at undgå layout påvirkninger
- ⚡ **Vue reactivity** - Forbedret stabilitet i dropdown value binding

### Changed
- 📱 Sprog success besked vises nu under dropdown i stedet for over

## [0.4.8] - 2025-01-11

### Added
- 🎨 **Forbedret UX design** - Sprog indstillinger flyttet over debug info for bedre prioritering
- 💬 **Separate besked system** - `languageMessage` adskilt fra `successMessage` for bedre organisation

### Changed
- 🌐 Sprog sektion placeret før debug sektion for bedre brugeroplevelse
- 📊 Visual hierarchy forbedret med sprog først, debug sidst

## [0.4.7] - 2025-01-11

### Fixed
- 🌈 **Farve navn oversættelse** - Farve navne viser nu korrekt "Rød" i stedet for "color_rød"
- 🔧 **Translation context** - Løst 'this' binding problem i `getColorName` funktion
- 🎨 **Color display** - Forbedret farve navn visning med korrekt sprog support

### Technical
- 📝 Tilføjet `translateFn` parameter til `getColorName` for korrekt context

## [0.4.6] - 2025-01-11

### Added
- 🌐 **Komplette oversættelser** - Alle status beskeder nu oversat (dansk/engelsk)
- 🌈 **Farve navn oversættelser** - Alle standard farver (rød, blå, grøn, osv.) oversat
- 📊 **Status meddelelser** - "Using spools from demo/server" beskeder oversat

### Fixed
- 📝 Manglende translation keys tilføjet for fuld sprog support

## [0.4.5] - 2025-01-11

### Fixed
- 🔧 **Critical JavaScript fejl** - Løst "TypeError: can't access property 't', this is undefined"
- 🎯 **Vue render context** - Ændret `this.t()` til `self.t()` i render callbacks
- ⚡ **Plugin stabilitet** - Plugin fungerer nu stabilt uden JavaScript fejl

### Technical
- 🛠️ Korrekt `this` context håndtering i Vue render funktion

## [0.4.4] - 2025-01-11

### Added
- 🔄 **Vue reactivity system** - `languageRevision` counter for at force re-evaluation af oversættelser
- ⚡ **Øjeblikkelig sprog skift** - Sprog ændres nu uden side reload

### Fixed
- 🌐 **Sprog switching** - Sproget skifter nu korrekt uden at lave tom plugin tab
- 🔄 **Translation updates** - Alle tekster opdateres øjeblikkeligt ved sprog skift

### Technical
- 📊 `languageRevision` trigger system implementeret

## [0.4.3] - 2025-01-11

### Attempted Fix
- 🔄 Fjernet alle page reload attempts for sprog switching
- ⚡ Prøvede kun `$forceUpdate()` for UI opdateringer

### Issues
- ❌ Oversættelser opdaterede ikke korrekt uden reload

## [0.4.2] - 2025-01-11

### Attempted Fix  
- 🔄 Controlled page reload med `window.location.href`
- 💾 `spoolman_language_changing` flag for reload state tracking

### Issues
- ❌ Plugin tab blev stadig tom efter reload

## [0.4.1] - 2025-01-11

### Attempted Fix
- 🔄 Fjernet `location.reload()` fra sprog switching
- ⚡ Prøvede direkte `$forceUpdate()` i stedet

### Issues  
- ❌ Ingen automatisk reload, sprog skiftede ikke synligt

## [0.4.0] - 2025-01-11

### Added
- 🌐 **Multi-language support** - Dansk og Engelsk sprog support
- 🎛️ **Sprog dropdown** - Automatisk, Dansk og English valgmuligheder  
- 🔄 **Dynamic language switching** - Skift sprog uden at genstarte plugin
- 📝 **Komplet oversættelse system** - Alle UI elementer oversat
- 🇩🇰 **Dansk som standard** - Browser locale detection med dansk fallback

### Technical Features
- 🛠️ Vue.js reactivity system til sprog opdateringer
- 💾 localStorage persistence af sprog valg
- 🌍 `getCurrentLanguage()` helper funktion
- 📊 `t(key)` translation helper med fallback logic

### Changed
- 🎨 UI opdateret til v0.4.0 med homepage link til GitHub repository

## [0.3.5] - 2025-08-01

### Added
- ✨ **Reorganiseret UI layout** - Filament tracking nu øverst for bedre workflow
- 🔧 **Proper spacing** mellem UI sektioner
- 📄 **Komplet GitHub dokumentation** - README, INSTALLATION, CONTRIBUTING
- 🐳 **CORS Setup guide** med Docker Compose løsning

### Fixed
- 🔧 Fjernet duplikeret "Klar til brug" boks
- 📏 Tilføjet manglende mellemrum mellem sektioner
- 🏠 Fjernet homepage link fra plugin manifest for cleaner installation

### Changed
- 📊 Filament tracking sektion flyttet til toppen
- ✅ Connection status flyttet ned over debug sektion
- 🎨 Forbedret visuelt layout og organisation

## [0.3.4] - 2025-08-01

### Fixed
- 🔧 Fjernet duplikeret Connection Status boks i UI
- 📝 Opdateret LICENSE med korrekt forfatter navn (Emil Vitus)

## [0.3.3] - 2025-08-01

### Added
- 🎨 Omorganiseret UI layout for bedre brugeroplevelse
- 📊 Filament tracking flyttet øverst for lettere adgang

### Changed
- 🚫 Fjernet homepage link fra plugin.json for cleaner installation

## [0.3.2] - 2025-07-31

### Added
- 🎨 **Farve emoji support** - Filament farver vises som emoji i dropdown (🟥🟩🟦🟨🟧🟪⚫⚪🟫)
- 🎨 **Farve cirkler** - Visuel farve indikator ved siden af filament navne
- 📝 **Intelligent dropdown naming** - Prioriteter Producer - SpoolName format
- 💾 **Cross-device sync forbedringer** - Bedre håndtering af device sync

### Fixed
- 🎨 Dropdown viser nu korrekt "Producer - SpoolName" rækkefølge
- 🎨 Farve cirkler bruger nu korrekt hex værdier
- 📱 Forbedret tekst læsbarhed med mørkere farver på lys baggrund
- 🔄 Auto-connect loader nu korrekt spools efter reload

### Changed
- 📊 Tracking display unit rettet fra "g" til "mm" for korrekt visning

## [0.3.1] - 2025-07-31

### Added
- 📊 **Manuel filament opdatering** - Mulighed for at justere forbrug manuelt
- 🔄 **Sync enheder knap** - Manuel refresh fra andre enheder
- 🎨 **Farve visualisering** - Hex farve koder og farve navne vist

### Fixed
- 🔄 Dropdown resetter nu korrekt efter eject filament
- 💾 Cross-device sync virker nu korrekt via Spoolman comment felter
- 📱 Auto-connect bevarer nu valgte filament efter reload

### Changed
- 🎨 Forbedret UI med bedre farve kontrast og læsbarhed

## [0.3.0] - 2025-07-31

### Added
- 📊 **Filament Tracking System** - Automatisk tracking af filament forbrug
- ⏱️ **Real-time RRF integration** - Henter extruder positioner fra RepRapFirmware
- 🔄 **Start/Stop tracking** - Manuel kontrol over tracking proces
- 📡 **Sync til Spoolman** - Opdater Spoolman database med forbrug
- 💾 **Cross-device sync** - Gem plugin state i Spoolman for sync mellem enheder

### Technical
- 🔌 RRF machine model integration via `/rr_model?key=move`
- ⏲️ 10 sekunder polling interval for tracking
- 💾 Plugin state gemt i Spoolman comment felt som JSON

## [0.2.9] - 2025-07-31

### Fixed
- 📝 Dropdown viser nu "Producer - SpoolName" i stedet for "SpoolName - Producer"

## [0.2.8] - 2025-07-31

### Added
- 🏭 **Producer navne** genindført i dropdown menu ved siden af spool navne

### Fixed
- 📝 Dropdown prioriterer nu spool navn over materiale navn korrekt

## [0.2.7] - 2025-07-31

### Changed
- 📝 **Dropdown prioritering** - Viser nu spool navn i stedet for materiale i dropdown

### Fixed
- 🎨 Farve navne håndtering for spools uden matchende farve navn

## [0.2.6] - 2025-07-31

### Added
- 🎨 **Farve cirkler** ved siden af filament navne i info bokse
- 🌈 **Farve navn mapping** - Konverterer hex koder til læsbare farve navne

### Fixed
- 🎨 Farve cirkler viser nu korrekt farve i stedet for hvid
- 📝 Forbedret farve navn visning for filament uden color_hex

## [0.2.0] - 2025-07-31

### Added
- 🔄 **Sync enheder knap** - Manuel refresh knap til at synce fra andre enheder
- 💾 **Forbedret persistence** - Plugin husker nu forbindelse og indstillinger efter reload
- 🎯 **Auto-connect funktion** - Automatisk genopkobling til sidste kendte konfiguration

### Fixed
- 🎨 **Tekst læsbarhed** - Ændret hvid tekst til mørk grå for bedre kontrast på lys baggrund
- 🔄 **Dropdown reset** - Eject filament resetter nu korrekt dropdown til "Vælg filament..."

### Changed
- 🎨 Forbedret farve kontrast i filament info bokse

## [0.1.7] - 2025-07-31

### Fixed
- 📦 Fjernet store header boks for mere kompakt layout
- 🔄 Dropdown menu resetter nu korrekt efter eject filament

## [0.1.6] - 2025-07-31

### Added
- 💾 **localStorage persistence** - Plugin husker nu indstillinger mellem browser sessions
- 🔄 **Auto-reload funktionalitet** - Indstillinger genindlæses automatisk

### Fixed
- 🔌 Forbedret forbindelseshåndtering og error recovery

## [0.1.5] - 2025-07-31

### Added
- 🌐 **Nginx CORS support** - Fungerer nu med Nginx reverse proxy på port 7913
- 📋 **CORS setup guide** - Detaljerede instruktioner til CORS konfiguration

### Fixed
- 🔌 CORS fejl løst via Nginx proxy løsning
- 🐛 Forbedret error handling og bruger feedback

## [0.1.0] - 2025-07-31

### Added
- 🎉 **Initial release** af Spoolman DuetWebControl Integration
- 🔧 **E3D Toolchanger support** - Support til 4 hotends (T0-T3)
- 🔌 **Spoolman API integration** - Direkte kommunikation med Spoolman server
- 🎭 **Demo mode** - Test funktionalitet uden Spoolman server
- 📊 **Filament management** - Vælg og administrer filament per hotend
- ⏏️ **Eject funktionalitet** - Fjern filament fra hotends
- 🎨 **Vue.js render system** - Moderne reactive UI komponenter
- 🧭 **Navigation integration** - Plugin tab i DWC sidebar

### Technical Features
- Vue 2.x kompatibilitet med DWC
- Render function baseret UI (ingen templates)
- RepRapFirmware integration ready
- CORS forberedt (kræver proxy setup)
- localStorage settings persistence
- Responsive design til mobile enheder

---

## Legend

- 🎉 Major new features
- ✨ Minor new features  
- 🔧 Improvements
- 🐛 Bug fixes
- 🔒 Security fixes
- 📝 Documentation
- 🎨 UI/UX improvements
- 📊 Tracking/analytics
- 💾 Data/storage
- 🌐 Network/connectivity
- ⚡ Performance
- 🚫 Removals