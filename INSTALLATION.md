# 📋 Detaljeret Installation Guide

Komplet step-by-step guide til installation af Spoolman DuetWebControl Integration.

## 📋 **Forudsætninger**

### **Hardware Krav:**
- ✅ 3D printer med RepRapFirmware 3.4+
- ✅ E3D Toolchanger eller kompatibelt multi-hotend system
- ✅ Op til 4 extrudere/hotends
- ✅ Netværksforbindelse til printeren

### **Software Krav:**
- ✅ DuetWebControl 3.6 eller nyere
- ✅ Moderne web browser (Chrome, Firefox, Edge, Safari)
- ✅ Spoolman server (valgfri for demo mode)

### **Netværk Setup:**
- ✅ Printer tilgængelig på netværk
- ✅ Spoolman server tilgængelig (hvis brugt)
- ✅ Stabil internetforbindelse

## 🚀 **Installation Metoder**

### **Metode 1: Fra GitHub Release (Anbefalet)**

1. **Download Plugin:**
   - Gå til [Releases](https://github.com/EmilVitus/Spoolman-DuetWebControl/releases)
   - Download seneste `SpoolmanPlugin-Vx.x.x.zip`

2. **Upload til DWC:**
   - Åbn DuetWebControl i browser
   - Gå til **Settings** (⚙️) → **General** → **Plugins**
   - Klik **Upload Plugin** knappen
   - Vælg downloaded ZIP fil
   - Vent på upload (kan tage 10-30 sekunder)

3. **Verificer Installation:**
   - Refresh browser siden (F5)
   - Se **Plugins** menu i navigation
   - Klik **Spoolman Integration**

### **Metode 2: Fra Kildekode**

1. **Clone Repository:**
   ```bash
   git clone https://github.com/EmilVitus/Spoolman-DuetWebControl.git
   cd Spoolman-DuetWebControl
   ```

2. **Upload Filer:**
   - Upload `plugin.json` via DWC Settings → Plugins
   - Upload `dwc/` mappe indhold til plugin directory

### **Metode 3: Manuel File Upload**

1. **Download Individuelle Filer:**
   - `plugin.json`
   - `dwc/js/Spoolman.4ea07003.js`
   - `dwc/css/Spoolman.css`

2. **Upload via DWC File Manager:**
   - Gå til **Jobs** → **File Management**
   - Naviger til `/opt/dsf/plugins/` (eller tilsvarende)
   - Opret `Spoolman/` mappe
   - Upload filer i korrekt struktur

## 🔧 **CORS Setup (Kritisk for Spoolman)**

Plugin kan ikke forbinde direkte til Spoolman server pga. CORS (Cross-Origin Resource Sharing) begrænsninger. Du skal opsætte en reverse proxy.

### **Quick Setup med Docker:**

1. **Opret Setup Mappe:**
   ```bash
   mkdir spoolman-cors
   cd spoolman-cors
   ```

2. **Download CORS Setup:**
   - Kopier filer fra [`SpoolmanCORS-Setup/`](./SpoolmanCORS-Setup/) mappen
   - Eller download fra repository

3. **Start Services:**
   ```bash
   docker-compose up -d
   ```

4. **Verificer Setup:**
   - Spoolman: `http://din-server-ip:7912`
   - CORS Proxy: `http://din-server-ip:7913` ← **Brug denne i plugin**

### **Manuel Nginx Setup:**

Se detaljeret guide i [`SpoolmanCORS-Setup/README.md`](./SpoolmanCORS-Setup/README.md).

## 🎯 **Første Gangs Konfiguration**

### **1. Åbn Plugin:**
- Refresh DWC siden (F5)
- Klik **Plugins** → **Spoolman Integration**
- Du skulle se plugin interface

### **2. Vælg Forbindelsestype:**

**Option A: Spoolman Server (Anbefalet)**
1. Klik **🔌 Forbind til Spoolman Server**
2. Indtast URL: `http://din-server-ip:7913` (bemærk port 7913!)
3. Klik **Test Forbindelse**
4. Vent på "✅ Forbindelse til Spoolman lykkedes!"

**Option B: Demo Mode (Til Test)**
1. Klik **🎭 Start med Demo Data**
2. Plugin indlæser test data med 5 filament spools
3. Alle funktioner virker, men data gemmes ikke

### **3. Vælg Filament:**
1. Du skulle nu se 4 toolhead konfigurationer (T0-T3)
2. Vælg filament fra dropdown for hver hotend du bruger
3. Se filament information og vægt

### **4. Test Tracking:**
1. Klik **▶️ Start Tracking** øverst
2. Plugin begynder at tracke extruder bevægelser
3. Udfør en test extrusion eller small print
4. Se om "Forbrugt denne session" opdateres

## 🔍 **Verifikation af Installation**

### **Plugin Indlæst Korrekt:**
- ✅ Plugin tab synlig i navigation
- ✅ Interface loader uden fejl
- ✅ Debug sektion viser "Plugin Status: Loaded and Functional ✅"

### **Spoolman Forbindelse:**
- ✅ "✅ Klar til brug" med antal spools
- ✅ Dropdown menus viser rigtige filament navne
- ✅ Farve cirkler matcher Spoolman data

### **Tracking Funktionalitet:**
- ✅ "🟢 Tracking Aktiv" når startet
- ✅ RRF connection (check browser console for RRF logs)
- ✅ Consumed filament opdateres ved extrusion

## 🐛 **Common Installation Issues**

### **"Plugin ikke fundet" Fejl**
**Problem:** Plugin ikke uploaded korrekt
**Løsning:**
1. Check at `plugin.json` er i rod af plugin folder
2. Restart DWC service: `sudo systemctl restart duetwebserver`
3. Clear browser cache og refresh

### **"Failed to fetch" ved Spoolman Test**
**Problem:** CORS ikke konfigureret
**Løsning:**
1. Verificer CORS proxy kører på port 7913
2. Test direkte: `curl http://din-server-ip:7913/api/v1/spool`
3. Check at Spoolman kører på port 7912

### **Blank/Tom Plugin Interface**
**Problem:** JavaScript fejl eller resource loading
**Løsning:**
1. Åbn browser konsol (F12)
2. Check for JavaScript fejl
3. Refresh siden og prøv igen
4. Verificer alle plugin filer er uploaded

### **Navigation Tab Mangler**
**Problem:** Route registrering fejlede
**Løsning:**
1. Check browser konsol for routing fejl
2. Restart DWC: Refresh siden eller restart service
3. Verificer plugin version kompatibilitet

### **RRF Connection Fejl i Tracking**
**Problem:** Kan ikke forbinde til printer for tracking
**Løsning:**
1. Verificer RRF URL i plugin kode (standard: `http://toolchanger`)
2. Ændr URL til din printer IP hvis nødvendigt
3. Check network connectivity mellem browser og printer

## 🔄 **Update Plugin**

### **Fra Ny Release:**
1. Download ny ZIP fra releases
2. Gå til DWC Settings → Plugins
3. Upload ny version (overskriver gamle filer)
4. Refresh browser siden

### **Fra Kildekode:**
1. Pull seneste changes: `git pull`
2. Upload opdaterede filer til DWC
3. Refresh browser

## 🏃‍♂️ **Performance Tips**

### **Browser Performance:**
- Brug moderne browser (Chrome/Firefox anbefalet)
- Close unused tabs for bedre memory usage
- Enable hardware acceleration i browser settings

### **Network Performance:**
- Brug wired connection til printer hvis muligt
- Reducer tracking interval hvis network er langsom
- Place Spoolman server på samme netværk som printer

### **Tracking Optimization:**
- Stop tracking når ikke i brug
- Brug manual opdatering for små jobs
- Sync til Spoolman efter hver print, ikke kontinuerligt

## 📞 **Få Hjælp**

Hvis du stadig har problemer efter at have fulgt denne guide:

1. **Check Common Issues:** Gennemgå troubleshooting sektion i README
2. **Browser Console:** Åbn F12 og check for fejl meddelelser
3. **GitHub Issues:** [Rapporter bugs](https://github.com/EmilVitus/Spoolman-DuetWebControl/issues)
4. **Community Discussion:** [GitHub Discussions](https://github.com/EmilVitus/Spoolman-DuetWebControl/discussions)

---

**Installation gennemført! 🎉 Du er nu klar til at bruge Spoolman integration.**