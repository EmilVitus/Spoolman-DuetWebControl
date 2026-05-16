import { mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const serverDir = path.join(root, "server");
const distDir = path.join(root, "dist");
const outputZip = path.join(distDir, "spoolman-bridge-server-0.5.0.zip");

await mkdir(distDir, { recursive: true });
if (existsSync(outputZip)) {
  await rm(outputZip);
}

const includeList = ["src", "package.json", "Dockerfile"];
if (process.platform === "win32") {
  const command = `Compress-Archive -Path ${includeList.map((item) => `"${path.join(serverDir, item)}"`).join(",")} -DestinationPath "${outputZip}"`;
  const result = spawnSync("powershell", ["-NoProfile", "-Command", command], { stdio: "inherit" });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
} else {
  const result = spawnSync("zip", ["-r", outputZip, ...includeList], {
    cwd: serverDir,
    stdio: "inherit"
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log(`Server artifact created: ${outputZip}`);
