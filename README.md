# mcp-bruecke

Plugin-Marketplace mit dem Plugin **bruecke**. Es startet auf dem Rechner des Nutzers per `npx` eine lokale Brücke ([`mcp-remote`](https://www.npmjs.com/package/mcp-remote)) zu einem zentralen MCP-Server im eigenen Netz. Die Anmeldung läuft über Keycloak im Browser.

Dieses Repository enthält nur die Brücke. Es enthält keinen Server, keine Zugangsdaten und keine Daten. Ohne einen erreichbaren MCP-Server tut das Plugin nichts.

## Installation

Claude Desktop: Marketplace hinzufügen mit `StefanStadler/mcp-bruecke`, dann das Plugin `bruecke` installieren.

Claude Code:

```
/plugin marketplace add StefanStadler/mcp-bruecke
/plugin install bruecke@mcp-bruecke
```

Voraussetzungen: Node 20 oder neuer (liefert `npx`). Beim ersten Start lädt `npx` das Paket `mcp-remote` aus der npm-Registry.

## Einstellungen

Die Brücke liest drei Umgebungsvariablen. Sind sie nicht gesetzt, gelten die Standardwerte:

| Name | Bedeutung | Standard |
| --- | --- | --- |
| `MCP_URL` | https-Adresse des Servers, endet auf `/mcp` | `https://mcp.localhost/mcp` |
| `OAUTH_CLIENT_ID` | Client-ID in Keycloak | `claude-desktop` |
| `CA_CERT` | Pfad zum Zertifikat der internen CA, falls nötig | leer |

Die Standardwerte gehören zu einer lokalen Testumgebung und müssen angepasst werden. Programme mit Oberfläche sehen Variablen aus der Shell oft nicht (macOS). Dann gehören die Werte fest in die Datei `plugins/bruecke/.mcp.json` des eigenen Marketplace-Forks.

Es gibt bewusst keine Skript-Datei im Plugin: In unseren Tests schlug das Synchronisieren in der Claude-Desktop-App fehl, sobald das Plugin eine JavaScript-Datei enthielt.

## Lizenz

Alle Rechte vorbehalten, siehe [LICENSE](LICENSE).
