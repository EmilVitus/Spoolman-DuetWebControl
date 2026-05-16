# Spoolman DuetWebControl Integration

Version `0.5.0` is a clean rewrite with a server-driven architecture:

- DWC plugin is a thin UI client.
- Filament tracking runs on the bridge server, not in the browser.
- All persistent settings are stored on the bridge server.
- Default language is English, with support for Auto/English/Dansk.
- Server discovery uses mDNS hostname (`spoolman-bridge.local`) with manual URL fallback.

## Repository layout

- `plugin/` DWC plugin payload (`plugin.json` + `dwc` assets)
- `server/` bridge server (tracking, storage, Spoolman/RRF integration)
- `scripts/` build helpers for plugin and server artifacts
- `docs/` migration and operations notes

## Requirements

- Node.js 20+ recommended
- Network access from bridge server to:
  - RepRapFirmware (`rr_connect`, `rr_model`)
  - Spoolman (`/api/v1`)

## Install

```bash
npm install
```

## Run bridge server

```bash
npm run start --workspace server
```

Server default: `http://0.0.0.0:9377`.

## Build artifacts

```bash
npm run build
```

This creates:

- `dist/Spoolman-0.5.0.zip` (DWC plugin)
- `dist/spoolman-bridge-server-0.5.0.zip` (server package)

## DWC plugin installation

1. Build plugin artifact.
2. In DWC open **Settings -> Plugins -> Install Plugin**.
3. Upload `dist/Spoolman-0.5.0.zip`.
4. Open **Job -> Spoolman** and connect/discover the bridge server.

## Server settings model

Stored in `server/data/settings.json`:

- `language`: `auto | en | da` (default `auto`)
- `spoolmanBaseUrl`: manual URL (required)
- `hotendCount`: integer >= 1 (UI supports 5+)
- `toolSpoolMap`: map (`T0`, `T1`, ...)
- `rrf.baseUrl`, `rrf.password`, `rrf.pollIntervalMs`

No browser cookies or localStorage are required for tracking or core configuration.
