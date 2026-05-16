function sanitizeBaseUrl(url) {
  return (url ?? "").trim().replace(/\/+$/, "");
}

function normalizeExtruderPositions(payload) {
  const move = payload?.result ?? payload?.move ?? payload;

  if (Array.isArray(move?.extruders)) {
    return move.extruders.map((value) => Number(value) || 0);
  }

  if (Array.isArray(move?.axes)) {
    return move.axes.filter((axis) => axis?.letter === "E").map((axis) => Number(axis.machinePosition) || 0);
  }

  return [];
}

export function createRrfClient(config) {
  const baseUrl = sanitizeBaseUrl(config?.baseUrl);
  const password = config?.password ?? "";
  let sessionKey = "";

  async function connect() {
    if (!baseUrl) {
      throw new Error("RRF base URL is not configured");
    }

    const authQuery = password ? `?password=${encodeURIComponent(password)}&sessionKey=yes` : "?sessionKey=yes";
    const response = await fetch(`${baseUrl}/rr_connect${authQuery}`);
    if (!response.ok) {
      throw new Error(`RRF connect failed (${response.status})`);
    }
    const payload = await response.json();
    sessionKey = payload?.sessionKey ?? "";
  }

  async function fetchMoveModel() {
    if (!baseUrl) {
      throw new Error("RRF base URL is not configured");
    }

    if (!sessionKey) {
      await connect();
    }

    const headers = sessionKey ? { "X-Session-Key": sessionKey } : {};
    const response = await fetch(`${baseUrl}/rr_model?key=move`, { headers });
    if (response.status === 401 || response.status === 403) {
      sessionKey = "";
      await connect();
      return fetchMoveModel();
    }
    if (!response.ok) {
      throw new Error(`RRF rr_model failed (${response.status})`);
    }

    const payload = await response.json();
    return {
      raw: payload,
      extruderPositions: normalizeExtruderPositions(payload)
    };
  }

  return {
    connect,
    fetchMoveModel
  };
}
