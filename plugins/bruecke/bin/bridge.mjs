// Startet die Brücke (mcp-remote) zum zentralen MCP-Server und führt den Login bei Keycloak im Browser durch.
// stdout gehört dem MCP-Protokoll, alles andere geht nach stderr.
//
// Einstellungen (Umgebung oder Datei ~/.mcp-bruecke/bruecke.env mit Zeilen NAME=Wert, die Umgebung hat Vorrang):
//   MCP_URL          https-Adresse des Servers, endet auf /mcp (Standard: https://mcp.localhost/mcp)
//   OAUTH_CLIENT_ID  Client-ID in Keycloak (Standard: claude-desktop)
//   CA_CERT          Pfad zum Zertifikat der internen CA, falls nötig (Standard: ~/.mcp-bruecke/ca.crt, wenn vorhanden)
import { spawn, spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

if (Number(process.versions.node.split(".")[0]) < 20) {
  console.error(`Node 20 oder neuer nötig, gefunden ${process.versions.node}.`);
  process.exit(1);
}

const env = { ...process.env };
const file = process.env.BRUECKE_ENV ?? join(homedir(), ".mcp-bruecke", "bruecke.env");
if (existsSync(file)) {
  for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
    const m = /^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/.exec(line);
    if (m && !line.trim().startsWith("#") && env[m[1]] === undefined) env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, "$2");
  }
}

const url = env.MCP_URL ?? "https://mcp.localhost/mcp";
const clientId = env.OAUTH_CLIENT_ID ?? "claude-desktop";
const defaultCa = join(homedir(), ".mcp-bruecke", "ca.crt");
const ca = env.CA_CERT ?? (existsSync(defaultCa) ? defaultCa : undefined);
if (ca) {
  if (!existsSync(ca)) {
    console.error(`Zertifikatsdatei nicht gefunden: ${ca}`);
    process.exit(1);
  }
  env.NODE_EXTRA_CA_CERTS = ca;
}

// Beim ersten Start die Abhängigkeiten installieren (braucht Zugriff auf die npm-Registry)
if (!existsSync(join(root, "node_modules", "mcp-remote"))) {
  const npm = process.platform === "win32" ? "npm.cmd" : "npm";
  const result = spawnSync(npm, ["ci", "--omit=dev", "--no-audit", "--no-fund"], { cwd: root, stdio: ["ignore", 2, 2], shell: process.platform === "win32" });
  if (result.status !== 0) {
    console.error("npm ci ist fehlgeschlagen.");
    process.exit(1);
  }
}

console.error(`Brücke zu ${url} (Client ${clientId}${ca ? `, Zertifikat ${ca}` : ""})`);
const child = spawn(
  process.execPath,
  [join(root, "node_modules", "mcp-remote", "dist", "proxy.js"), url, "--static-oauth-client-info", JSON.stringify({ client_id: clientId })],
  { cwd: root, env, stdio: "inherit" },
);
child.on("exit", (code, signal) => process.exit(signal ? 1 : (code ?? 0)));
