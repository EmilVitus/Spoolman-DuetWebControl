# Spoolman CORS Setup V3 + Filament Tracker

**Complete server-side solution for Spoolman with CORS support and automatic filament tracking.**

## 🚀 Features

- **Spoolman Server** - Filament spool management system
- **CORS Proxy** - Nginx reverse proxy with CORS headers for DuetWebControl
- **🆕 Filament Tracker** - Server-side automatic filament usage tracking
- **Docker Compose** - One-command setup for all services
- **Persistent Storage** - Data and tracking state preserved across restarts

## 📋 Prerequisites

- Docker and Docker Compose installed
- RepRapFirmware printer accessible on network
- DuetWebControl running on printer or separate host

## ⚡ Quick Setup

### 1. Download and Extract
Download `SpoolmanCORS-Setup-V3.zip` and extract to your server.

### 2. Configure Printer IP
Edit `docker-compose.yml` and update the RRF_URL:
```yaml
environment:
  - RRF_URL=http://192.168.1.100   # Change to your printer's IP
```

### 3. Start Services
```bash
docker-compose up -d
```

### 4. Verify Services
```bash
docker-compose ps
```

All services should show "Up" status.

## 🔧 Service Details

### Spoolman Server
- **Internal Port:** 8000 
- **External Port:** 7912
- **Web Interface:** `http://your-server:7912`
- **Database:** SQLite with automatic backups

### CORS Proxy 
- **External Port:** 7913
- **Purpose:** Adds CORS headers for browser compatibility
- **DWC Plugin URL:** `http://your-server:7913`

### 🆕 Filament Tracker Service
- **Purpose:** Automatic server-side filament usage tracking
- **Polling:** Monitors RRF extruder positions every 30 seconds
- **Sync:** Automatically updates Spoolman when filament is used
- **State:** Persistent tracking data across restarts

## ⚙️ Configuration

### Tracking Service Environment Variables

Edit `docker-compose.yml` to customize tracking behavior:

```yaml
environment:
  # RepRapFirmware Configuration
  - RRF_URL=http://192.168.1.100   # Your printer's IP address
  
  # Tracking Settings
  - POLL_INTERVAL=30              # Seconds between position checks
  - AUTO_SYNC=true                # Automatically sync to Spoolman
  
  # Advanced (usually don't need to change)
  - SPOOLMAN_URL=http://spoolman:8000
  - STATE_FILE=/data/tracker_state.json
```

### Tracking Configuration
The tracker automatically detects active spool assignments from your DWC plugin configuration. Simply:

1. Configure spools in DWC plugin (connect to `http://your-server:7913`)
2. The tracker service will automatically start tracking configured extruders
3. Usage is synced to Spoolman automatically during printing

## 📊 Monitoring

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f spoolman-tracker
docker-compose logs -f spoolman  
docker-compose logs -f nginx-cors
```

### Check Service Health
```bash
# Health status
docker-compose ps

# Detailed tracking state
docker exec spoolman-filament-tracker cat /data/tracker_state.json
```

## 🔄 Updates

### Update Spoolman
```bash
docker-compose pull spoolman
docker-compose up -d spoolman
```

### Update Tracker Service
```bash
docker-compose build --no-cache spoolman-tracker
docker-compose up -d spoolman-tracker
```

## 🚨 Troubleshooting

### Tracker Not Working
1. **Check RRF URL:** Ensure `RRF_URL` is correct in docker-compose.yml
2. **Network Access:** Verify server can reach your printer
3. **View Logs:** `docker-compose logs spoolman-tracker`

### DWC Plugin Connection Issues
1. **Use CORS Proxy:** Connect to port 7913, not 7912
2. **Check Firewall:** Ensure ports 7912 and 7913 are open
3. **View Nginx Logs:** `docker-compose logs nginx-cors`

### Common Log Messages
- `📊 RRF positions: [0.0, 0.0, 0.0, 0.0]` - Successfully reading positions
- `🎯 Updated active spools from DWC state` - Configuration sync working
- `✅ Synced T0: 25.50mm to spool #123` - Successful filament sync

## 📚 Integration with DWC Plugin

The tracking service is designed to work seamlessly with **DuetWebControl Spoolman Plugin v0.5.0+**:

1. **Install Plugin:** Install DWC plugin and connect to `http://your-server:7913`
2. **Configure Spools:** Select spools for each extruder in the plugin
3. **Automatic Tracking:** Server-side service automatically tracks usage
4. **Real-time Updates:** Plugin shows server tracking status

## 🛡️ Security Notes

- **Default CORS:** Allows all origins (`*`) for maximum compatibility
- **Production Use:** Consider restricting CORS origins for security
- **Firewall:** Only expose ports 7912 and 7913 as needed

## 📞 Support

- **Plugin Issues:** [GitHub Issues](https://github.com/EmilVitus/Spoolman-DuetWebControl/issues)
- **Spoolman Issues:** [Spoolman GitHub](https://github.com/Donkie/Spoolman)
- **Docker Issues:** Check Docker and Docker Compose documentation

---
**Spoolman CORS Setup V3** - Part of the DuetWebControl Spoolman Plugin project  
License: GPL-3.0 | Author: Emil Vitus