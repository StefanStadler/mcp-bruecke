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

Voraussetzungen: macOS, Node 20 oder neuer (liefert `npx`), Claude Desktop. Beim ersten Start lädt `npx` das Paket `mcp-remote` aus der npm-Registry.

## Einstellungen

Adresse und Client-ID stehen fest in [`plugins/bruecke/.mcp.json`](plugins/bruecke/.mcp.json) und gehören zu einer lokalen Testumgebung. Für den eigenen Einsatz die Datei anpassen (eigener Fork des Marketplace):

| Stelle | Bedeutung | Testwert |
| --- | --- | --- |
| Adresse hinter `mcp-remote@0.15.2` | https-Adresse des Servers, endet auf `/mcp` | `https://mcp.localhost/mcp` |
| `client_id` am Ende | Client-ID in Keycloak | `claude-desktop` |

## Zertifikate

Node nutzt den Zertifikatsspeicher des Betriebssystems nicht von selbst. Auch `NODE_USE_SYSTEM_CA=1` und `--use-system-ca` halfen in unseren Tests auf macOS (Node 26) nicht. Das Plugin setzt deshalb `NODE_EXTRA_CA_CERTS` auf das CA-Bündel, das die Claude-Desktop-App selbst aus dem Systemspeicher schreibt (`~/Library/Application Support/Claude/ca-bundle.pem`). Die Wurzelzertifikate einer internen CA müssen dafür im Systemspeicher als vertrauenswürdig stehen. Dass die App dieses Bündel schreibt, haben wir nur in ihrem Log gesehen, es ist nicht dokumentiert und kann sich ändern. Der Pfad gilt nur für macOS.

## Hinweise

- Die App gibt Umgebungsvariablen aus der Shell oder aus `launchctl` nicht an Plugin-Server weiter. Der Server bekommt nur `PATH`, `HOME` und das, was in `.mcp.json` steht.
- Es gibt bewusst keine Skript-Datei im Plugin: In unseren Tests schlug das Synchronisieren in der Claude-Desktop-App fehl, sobald das Plugin eine JavaScript-Datei enthielt. Ob die App Variablen in `.mcp.json` auflöst, ist nicht belegt, deshalb steht alles fest in der Datei.

## Lizenz

Alle Rechte vorbehalten, siehe [LICENSE](LICENSE).
