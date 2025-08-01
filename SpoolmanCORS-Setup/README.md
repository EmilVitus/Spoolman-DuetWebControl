# 🔧 Spoolman CORS Setup Guide

Denne mappe indeholder filer til at opsætte en Nginx reverse proxy der tilføjer CORS headers til Spoolman API, så DuetWebControl plugin kan forbinde fra browseren.

## ❓ **Hvorfor Er Dette Nødvendigt?**

Web browsere blokerer CORS (Cross-Origin Resource Sharing) requests af sikkerhedsmæssige årsager. Da DWC plugin kører i browseren og Spoolman kører på en anden server/port, skal vi tilføje CORS headers for at tillade kommunikation.

**Uden CORS Setup:** `Failed to fetch` fejl i browser konsollen
**Med CORS Setup:** ✅ Plugin kan forbinde til Spoolman API

## 📋 **Forudsætninger**

- Docker og Docker Compose installeret
- Ubuntu server eller tilsvarende Linux system
- Adgang til netværk ports 7912 og 7913

## 🚀 **Quick Setup**

### **1. Download Filer**
```bash
# Option A: Clone hele repository
git clone https://github.com/EmilVitus/Spoolman-DuetWebControl.git
cd Spoolman-DuetWebControl/SpoolmanCORS-Setup/

# Option B: Download kun CORS setup filer
mkdir spoolman-cors
cd spoolman-cors
# Download nginx.conf, docker-compose.yml fra GitHub
```

### **2. Start Services**
```bash
# Første gang - opret data mappe
mkdir -p data

# Start Spoolman + Nginx CORS proxy
docker-compose up -d

# Check status
docker-compose ps
```

### **3. Verificer Setup**
```bash
# Test Spoolman direkte (standard port)
curl http://localhost:7912/api/v1/info

# Test CORS proxy (brug denne i DWC plugin!)
curl http://localhost:7913/api/v1/info
```

## 🔍 **Service Oversigt**

| Service | Port | URL | Formål |
|---------|------|-----|--------|
| **spoolman** | 7912 | `http://server-ip:7912` | Standard Spoolman API |
| **nginx-cors** | 7913 | `http://server-ip:7913` | **CORS proxy - brug denne i plugin!** |

## ⚙️ **Konfiguration**

### **Port Ændringer**
Hvis du skal bruge andre ports, rediger `docker-compose.yml`:

```yaml
services:
  spoolman:
    ports:
      - "YOUR_SPOOLMAN_PORT:8000"
  
  nginx-cors:
    ports:
      - "YOUR_CORS_PORT:7913"
```

### **Timezone**
Juster timezone i `docker-compose.yml`:
```yaml
environment:
  - TZ=Europe/Copenhagen  # Ændr til din timezone
```

### **CORS Security (Valgfrit)**
For øget sikkerhed kan du begrænse CORS til specifikke origins i `nginx.conf`:

```nginx
# I stedet for "*" (alle origins)
add_header Access-Control-Allow-Origin "http://your-dwc-ip" always;
```

## 🐛 **Troubleshooting**

### **Port Allerede I Brug**
```bash
# Check hvad der bruger porten
sudo netstat -tulpn | grep :7913
sudo lsof -i :7913

# Stop konflikterende service eller ændr port
```

### **Permission Denied på Data Mappe**
```bash
# Fix permissions på data folder
sudo chown -R 1000:1000 ./data
chmod -R 755 ./data
```

### **Nginx Configuration Fejl**
```bash
# Test nginx config
docker exec spoolman-cors-nginx-cors-1 nginx -t

# Check nginx logs
docker logs spoolman-cors-nginx-cors-1
```

### **Spoolman Ikke Tilgængelig**
```bash
# Check Spoolman status
docker logs spoolman-cors-spoolman-1

# Restart services
docker-compose restart
```

## 📊 **Logging og Monitoring**

### **View Logs**
```bash
# Alle services
docker-compose logs -f

# Kun nginx
docker-compose logs -f nginx-cors

# Kun spoolman
docker-compose logs -f spoolman
```

### **Resource Usage**
```bash
# Docker stats
docker stats

# Disk usage af volumes
du -sh ./data
```

## 🔄 **Maintenance**

### **Update Spoolman**
```bash
# Pull seneste image
docker-compose pull

# Restart med nye images
docker-compose up -d
```

### **Backup Data**
```bash
# Backup Spoolman database
tar -czf spoolman-backup-$(date +%Y%m%d).tar.gz ./data

# Restore fra backup
tar -xzf spoolman-backup-YYYYMMDD.tar.gz
```

### **Clean Up**
```bash
# Stop og fjern containers
docker-compose down

# Fjern volumes (ADVARSEL: sletter data!)
docker-compose down -v
```

## 🌐 **Netværk Setup**

### **Firewall Rules**
Hvis du bruger ufw eller anden firewall:
```bash
# Tillad adgang til CORS proxy port
sudo ufw allow 7913

# Tillad adgang til standard Spoolman port (valgfrit)
sudo ufw allow 7912
```

### **Router Port Forwarding**
For adgang udefra (ikke anbefalet for sikkerhed):
- Forward port 7913 til din server IP
- Brug kun hvis nødvendigt og med forsigtige CORS settings

## 🔒 **Sikkerhed**

### **Recommended CORS Settings**
For produktion, begrænse CORS til specifikke IPs:

```nginx
# Tillad kun dit lokale netværk
add_header Access-Control-Allow-Origin "http://192.168.1.0/24" always;

# Eller specifik DWC IP
add_header Access-Control-Allow-Origin "http://192.168.1.100" always;
```

### **HTTPS Support (Avanceret)**
For HTTPS setup, se [Nginx SSL documentation](https://nginx.org/en/docs/http/configuring_https_servers.html).

## 📞 **Support**

Hvis du oplever problemer med CORS setup:

1. **Check Docker Status:** `docker-compose ps`
2. **Check Logs:** `docker-compose logs -f`
3. **Test Connectivity:** `curl http://server-ip:7913/api/v1/info`
4. **Browser Console:** Check for CORS fejl i F12 console
5. **GitHub Issues:** [Rapporter problemer](https://github.com/EmilVitus/Spoolman-DuetWebControl/issues)

---

**CORS Setup Complete! 🎉 Nu kan DWC plugin forbinde til Spoolman via port 7913.**