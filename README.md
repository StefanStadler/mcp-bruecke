# mcp-bruecke

Plugin-Marketplace mit dem Plugin **bruecke**. Es startet auf dem Rechner des Nutzers eine lokale Brücke ([`mcp-remote`](https://www.npmjs.com/package/mcp-remote)) zu einem zentralen MCP-Server im eigenen Netz. Die Anmeldung läuft über Keycloak im Browser.

Dieses Repository enthält nur die Brücke. Es enthält keinen Server, keine Zugangsdaten und keine Daten. Ohne einen erreichbaren MCP-Server tut das Plugin nichts.

## Installation

Claude Desktop: Marketplace hinzufügen mit `StefanStadler/mcp-bruecke`, dann das Plugin `bruecke` installieren.

Claude Code:

```
/plugin marketplace add StefanStadler/mcp-bruecke
/plugin install bruecke@mcp-bruecke
```

Voraussetzungen: Node 20 oder neuer. Beim ersten Start installiert das Plugin `mcp-remote` per `npm ci` und braucht dafür Zugriff auf die npm-Registry.

## Einstellungen

Umgebungsvariablen oder die Datei `~/.mcp-bruecke/bruecke.env` mit Zeilen `NAME=Wert` (die Umgebung hat Vorrang):

| Name | Bedeutung | Standard |
| --- | --- | --- |
| `MCP_URL` | https-Adresse des Servers, endet auf `/mcp` | `https://mcp.localhost/mcp` |
| `OAUTH_CLIENT_ID` | Client-ID in Keycloak | `claude-desktop` |
| `CA_CERT` | Zertifikat der internen CA, falls nötig | `~/.mcp-bruecke/ca.crt`, wenn vorhanden |

Die Standardwerte gehören zu einer lokalen Testumgebung und müssen angepasst werden.

## Lizenz

Alle Rechte vorbehalten.
