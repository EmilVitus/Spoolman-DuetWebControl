import os from "node:os";

export function getLanIPv4Addresses() {
  const addresses = [];
  const interfaces = os.networkInterfaces();

  for (const ifaceEntries of Object.values(interfaces)) {
    for (const entry of ifaceEntries ?? []) {
      if (entry.family === "IPv4" && !entry.internal) {
        addresses.push(entry.address);
      }
    }
  }

  return [...new Set(addresses)];
}

export function buildBridgeBaseUrls(port, addresses) {
  return addresses.map((address) => `http://${address}:${port}`);
}
