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

Voraussetzungen: Node 22.15 oder neuer (liefert `npx` und kennt `NODE_USE_SYSTEM_CA`). Beim ersten Start lädt `npx` das Paket `mcp-remote` aus der npm-Registry.

## Einstellungen

Adresse und Client-ID stehen fest in [`plugins/bruecke/.mcp.json`](plugins/bruecke/.mcp.json) und gehören zu einer lokalen Testumgebung. Für den eigenen Einsatz die Datei anpassen (eigener Fork des Marketplace):

| Stelle | Bedeutung | Testwert |
| --- | --- | --- |
| drittes Argument | https-Adresse des Servers, endet auf `/mcp` | `https://mcp.localhost/mcp` |
| `client_id` im letzten Argument | Client-ID in Keycloak | `claude-desktop` |

Zertifikate: Node nutzt standardmäßig nicht den Zertifikatsspeicher des Betriebssystems. Die Variable `NODE_USE_SYSTEM_CA=1` schaltet das ein (ab Node 22.15 oder 24, bei älteren Versionen ohne Wirkung). Die Wurzelzertifikate einer internen CA müssen dann im Zertifikatsspeicher des Rechners als vertrauenswürdig stehen.

Es gibt bewusst keine Skript-Datei und keine Variablen im Plugin: In unseren Tests schlug das Synchronisieren in der Claude-Desktop-App fehl, sobald das Plugin eine JavaScript-Datei enthielt, und ob die App Variablen in `.mcp.json` auflöst, ist nicht belegt.

## Lizenz

Alle Rechte vorbehalten, siehe [LICENSE](LICENSE).
