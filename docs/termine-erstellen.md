# Anleitung: Neue Termine erstellen

Diese Anleitung erklärt, wie neue Termine für die Website des Kleingartenvereins "Im Auenviertel" erstellt werden.

## Übersicht

Termine werden als Markdown-Dateien im Verzeichnis `src/content/dates/` gespeichert. Jeder Termin ist eine eigene Datei mit spezifischen Metadaten im Frontmatter-Bereich.

## Dateistruktur

### Speicherort
Alle Termine werden im folgenden Verzeichnis gespeichert:
```
src/content/dates/
```

### Dateinamen-Konvention
Verwenden Sie aussagekräftige Dateinamen in Kleinbuchstaben mit Bindestrichen:
- ✅ Gut: `sommerfest-juli.md`
- ✅ Gut: `gemeinschaftsarbeit-april.md`
- ❌ Vermeiden: `Termin1.md` oder `2025-07-05.md`

## Frontmatter-Felder

Jede Termin-Datei beginnt mit einem Frontmatter-Block zwischen `---` Markierungen:

```markdown
---
draft: false
title: "Titel des Termins"
date: "2025-MM-TT"
description: "Optionale Beschreibung des Termins"
duration: 2
---
```

### Pflichtfelder

| Feld | Typ | Beschreibung | Beispiel |
|------|-----|--------------|----------|
| `draft` | boolean | Entwurfsstatus (false = veröffentlicht) | `false` |
| `title` | string | Titel des Termins | `"Sommerfest"` |
| `date` | string | Datum im Format YYYY-MM-DD | `"2025-07-05"` |

### Optionale Felder

| Feld | Typ | Beschreibung | Standard | Beispiel |
|------|-----|--------------|----------|----------|
| `description` | string | Ausführliche Beschreibung | - | `"Unser jährliches Sommerfest!"` |
| `duration` | number | Dauer in Stunden | 1 | `3` |

## Beispiele

### Beispiel 1: Einfacher Termin
```markdown
---
draft: false
title: "Mitgliederversammlung"
date: "2025-05-17"
---
```

### Beispiel 2: Termin mit Beschreibung
```markdown
---
draft: false
title: "Sommerfest"
date: "2025-07-05"
description: "Unser jährliches Sommerfest! Die genaue Uhrzeit wird noch bekannt gegeben. Freut euch auf ein gemütliches Beisammensein mit Grillen und guter Stimmung."
---
```

### Beispiel 3: Termin mit Dauer
```markdown
---
draft: false
title: "Gemeinschaftsarbeit"
date: "2025-04-05"
description: "Frühjahrs-Gemeinschaftsarbeit von 10:00 bis 13:00 Uhr. Vorbereitung der Anlage für die neue Gartensaison. Bitte Gartengeräte mitbringen."
duration: 3
---
```

## Schritt-für-Schritt Anleitung

1. **Neue Datei erstellen**
   - Navigieren Sie zu `src/content/dates/`
   - Erstellen Sie eine neue `.md` Datei mit aussagekräftigem Namen

2. **Frontmatter hinzufügen**
   - Beginnen Sie die Datei mit `---`
   - Fügen Sie die Pflichtfelder hinzu
   - Ergänzen Sie optionale Felder nach Bedarf
   - Schließen Sie mit `---`

3. **Speichern und Testen**
   - Speichern Sie die Datei
   - Starten Sie den Entwicklungsserver: `pnpm dev`
   - Prüfen Sie die Termine-Seite unter `/dates`

## Best Practices

### Titel
- Verwenden Sie kurze, prägnante Titel
- Vermeiden Sie überflüssige Informationen im Titel
- Beispiele: "Sommerfest", "Gemeinschaftsarbeit", "Mitgliederversammlung"

### Beschreibungen
- Geben Sie wichtige Details wie Uhrzeit und Ort an
- Erwähnen Sie, was Teilnehmer mitbringen sollen
- Halten Sie die Beschreibung informativ aber kurz
- Verwenden Sie eine freundliche, einladende Sprache

### Datum
- Verwenden Sie immer das Format YYYY-MM-DD
- Stellen Sie sicher, dass das Datum korrekt ist
- Vergangene Termine werden automatisch ausgeblendet

### Dauer
- Die Dauer wird in Stunden angegeben
- Verwenden Sie Dezimalzahlen für halbe Stunden (z.B. 2.5 für 2,5 Stunden)
- Standard ist 1 Stunde, wenn nicht angegeben

## Anzeige auf der Website

Die Termine werden auf der `/dates` Seite angezeigt mit:
- Titel des Termins
- Formatiertes Datum (z.B. "Samstag, 5. Juli 2025")
- Beschreibung (falls vorhanden)
- Kalender-Button zum Herunterladen als ICS-Datei

Nur Termine mit:
- `draft: false` (veröffentlicht)
- Datum in der Zukunft

werden auf der Website angezeigt.

## Häufige Fehler vermeiden

1. **Falsches Datumsformat**
   - ❌ `date: "05.07.2025"`
   - ✅ `date: "2025-07-05"`

2. **Fehlende Anführungszeichen**
   - ❌ `title: Sommerfest`
   - ✅ `title: "Sommerfest"`

3. **Vergessenes draft-Feld**
   - Ohne `draft: false` wird der Termin nicht angezeigt

4. **Falsche Einrückung**
   - Alle Felder müssen auf derselben Ebene sein
   - Keine zusätzlichen Leerzeichen vor den Feldnamen

## Kalender-Integration

Jeder Termin kann als ICS-Datei heruntergeladen werden. Die ICS-Datei enthält:
- Titel des Events
- Datum und Uhrzeit (standardmäßig 10:00 Uhr)
- Dauer (aus dem `duration` Feld)
- Beschreibung (falls vorhanden)
- Ort: "Kleingartenverein Im Auenviertel"

Besucher können diese Dateien in ihre Kalender-Apps importieren.