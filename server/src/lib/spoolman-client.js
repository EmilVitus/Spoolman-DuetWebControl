function sanitizeBaseUrl(url) {
  return (url ?? "").trim().replace(/\/+$/, "");
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Spoolman request failed (${response.status}): ${body}`);
  }
  return response.json();
}

export function createSpoolmanClient(baseUrl) {
  const sanitized = sanitizeBaseUrl(baseUrl);
  const apiBase = `${sanitized}/api/v1`;

  return {
    isConfigured() {
      return Boolean(sanitized);
    },
    async info() {
      return requestJson(`${apiBase}/info`);
    },
    async health() {
      return requestJson(`${apiBase}/health`);
    },
    async getSpools() {
      return requestJson(`${apiBase}/spool`);
    },
    async useSpoolLengthMm(spoolId, lengthMm) {
      return requestJson(`${apiBase}/spool/${spoolId}/use`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ use_length: lengthMm })
      });
    }
  };
}
