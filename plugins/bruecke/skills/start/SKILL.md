---
name: start
description: Einstieg in das Plugin bruecke: prüft, ob die Verbindung zum zentralen MCP-Server steht, und erklärt die Anmeldung und Einrichtung, falls nicht. Verwenden bei der ersten Anfrage nach der Installation, bei "Brücke einrichten", "Anmeldung", "ist der Server erreichbar" oder wenn ein Werkzeug des Servers nicht gefunden wird.
---

# Verbindung und Anmeldung

Das Plugin startet auf diesem Rechner per `npx` eine Brücke (`mcp-remote`). Sie verbindet sich mit dem zentralen MCP-Server im eigenen Netz. Die Anmeldung läuft über Keycloak im Browser. Filter, Protokoll und Datenzugang liegen im Server, nicht auf diesem Rechner.

## Ablauf

1. **Verbindung prüfen.** `list_connect_clients` mit `limit` 3 aufrufen.
   - Werkzeug nicht vorhanden: Die Brücke startet nicht oder die Anmeldung steht noch aus. Mögliche Gründe: Node 20 oder neuer (mit `npx`) fehlt, `npx` kommt beim ersten Start nicht an die npm-Registry, das Zertifikat der internen CA ist im Systemspeicher nicht als vertrauenswürdig eingetragen (Fehler `unable to get local issuer certificate`) oder der Browser-Login wurde nicht abgeschlossen. Dem Nutzer das sagen, den Login im Browser abschließen und Claude neu starten lassen. Hier stoppen.
   - Fehler mit 401 oder 403: Der Nutzer ist angemeldet, hat aber keine Berechtigung. Die erforderliche Rolle in Keycloak prüfen lassen. Hier stoppen.
2. **Stand berichten.** Anzahl der Mandanten und ein Beispiel in zwei Zeilen.
3. **Weiter.** Fragen, was geprüft werden soll.

## Einstellungen

Adresse des Servers (endet auf `/mcp`) und Client-ID stehen fest in der `.mcp.json` des Plugins, als Testwerte. Zertifikate: Das Plugin setzt `NODE_EXTRA_CA_CERTS` auf das CA-Bündel der Desktop-App (`~/Library/Application Support/Claude/ca-bundle.pem`, nur macOS). Das Wurzelzertifikat der internen CA muss im Systemspeicher des Rechners als vertrauenswürdig stehen. Variablen aus der Shell erreichen den Plugin-Server nicht.

## Regeln

- Nur lesen. Das Plugin bucht nichts.
- Zahlen rechnen die Werkzeuge, nicht Claude. Ergebnisse unverändert wiedergeben.
- Tokens, Zugangsdaten und Zertifikate nie ausgeben.
