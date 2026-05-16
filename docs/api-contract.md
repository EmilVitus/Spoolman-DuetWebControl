# Bridge server API contract (`/api/v1`)

## `GET /info`

Returns service identity and discovery hints.

## `GET /health`

Returns liveness and tracking heartbeat fields.

## `GET /settings?browserLocale=<locale>`

Returns persisted settings and language resolution result:

- `settings`
- `resolvedLanguage`
- `messages`

## `PUT /settings`

Partial update of settings. Supports:

- `language`: `auto|en|da`
- `spoolmanBaseUrl`: string
- `hotendCount`: integer `1..16`
- `toolSpoolMap`: object
- `rrf`: object (`baseUrl`, `password`, `pollIntervalMs`)

## `GET /status`

Returns runtime tracking state and a settings summary.

## `POST /tracking/start`
## `POST /tracking/stop`
## `POST /tracking/poll-now`

Tracking lifecycle and manual poll trigger.

## `GET /spools`

Proxy endpoint for Spoolman checks and spool list:

- `info`
- `health`
- `spools`

## `PUT /tools/:toolId/spool`
## `DELETE /tools/:toolId/spool`

Assign/unassign spool IDs to tool IDs (e.g. `T0`, `T1`).

## `GET /discovery`

Returns discovery method metadata:

- mDNS hostname suggestion (`spoolman-bridge.local`)
- manual fallback instruction
