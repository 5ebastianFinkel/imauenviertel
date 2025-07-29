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
startTime: "HH:MM"
endTime: "HH:MM"
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
| `startTime` | string | Startzeit im Format HH:MM | - | `"10:00"` |
| `endTime` | string | Endzeit im Format HH:MM | - | `"13:00"` |
| `description` | string | Ausführliche Beschreibung | - | `"Unser jährliches Sommerfest!"` |
| `duration` | number | Dauer in Stunden (nur wenn endTime nicht angegeben) | 1 | `3` |

**Hinweis:** 
- Wenn weder `startTime` noch `endTime` angegeben sind, wird der Termin als ganztägig behandelt.
- Wenn nur `startTime` angegeben ist, wird `duration` verwendet, um die Endzeit zu berechnen.
- Wenn sowohl `startTime` als auch `endTime` angegeben sind, wird `duration` ignoriert.

## Beispiele

### Beispiel 1: Ganztägiger Termin
```markdown
---
draft: false
title: "Tag der offenen Tür"
date: "2025-05-17"
description: "Besucher sind herzlich willkommen, unsere Anlage zu besichtigen."
---
```

### Beispiel 2: Termin mit Start- und Endzeit
```markdown
---
draft: false
title: "Gemeinschaftsarbeit"
date: "2025-04-05"
startTime: "10:00"
endTime: "13:00"
description: "Frühjahrs-Gemeinschaftsarbeit. Vorbereitung der Anlage für die neue Gartensaison. Bitte Gartengeräte mitbringen."
---
```

### Beispiel 3: Termin mit Startzeit und Dauer
```markdown
---
draft: false
title: "Mitgliederversammlung"
date: "2025-05-17"
startTime: "19:00"
duration: 2
description: "Jährliche Mitgliederversammlung im Vereinsheim."
---
```

### Beispiel 4: Mehrtägiger ganztägiger Termin
```markdown
---
draft: false
title: "Sommerfest"
date: "2025-07-05"
description: "Unser jährliches Sommerfest! Freut euch auf ein gemütliches Beisammensein mit Grillen und guter Stimmung."
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

### Zeitangaben
- Verwenden Sie das 24-Stunden-Format für `startTime` und `endTime` (z.B. "14:00" für 14 Uhr)
- Für ganztägige Termine lassen Sie `startTime` und `endTime` weg
- Bei Terminen mit unbekannter Endzeit verwenden Sie `startTime` mit `duration`

### Dauer
- Die Dauer wird in Stunden angegeben
- Verwenden Sie Dezimalzahlen für halbe Stunden (z.B. 2.5 für 2,5 Stunden)
- Standard ist 1 Stunde, wenn nicht angegeben
- Wird nur verwendet, wenn `endTime` nicht angegeben ist

## Anzeige auf der Website

Die Termine werden auf der `/dates` Seite angezeigt mit:
- Titel des Termins
- Formatiertes Datum (z.B. "Samstag, 5. Juli 2025")
- Zeitangabe:
  - Bei Terminen mit Zeiten: "10:00 Uhr - 13:00 Uhr"
  - Bei ganztägigen Terminen: "Ganztägig"
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

2. **Falsches Zeitformat**
   - ❌ `startTime: "10:00 Uhr"`
   - ❌ `startTime: "10.00"`
   - ✅ `startTime: "10:00"`

3. **Fehlende Anführungszeichen**
   - ❌ `title: Sommerfest`
   - ✅ `title: "Sommerfest"`

4. **Vergessenes draft-Feld**
   - Ohne `draft: false` wird der Termin nicht angezeigt

5. **Falsche Einrückung**
   - Alle Felder müssen auf derselben Ebene sein
   - Keine zusätzlichen Leerzeichen vor den Feldnamen

6. **Inkonsistente Zeitangaben**
   - ❌ `startTime: "14:00"` mit `endTime: "13:00"` (Endzeit vor Startzeit)
   - ✅ `startTime: "13:00"` mit `endTime: "14:00"`

## Kalender-Integration

Jeder Termin kann als ICS-Datei heruntergeladen werden. Die ICS-Datei enthält:
- Titel des Events
- Datum und Zeitangaben:
  - Bei ganztägigen Terminen: Als Ganztagesevent
  - Bei Terminen mit Zeiten: Mit korrekter Start- und Endzeit in der Zeitzone Europe/Berlin
- Beschreibung (falls vorhanden)
- Automatische Anpassung an Sommer-/Winterzeit

Die generierten ICS-Dateien sind kompatibel mit allen gängigen Kalender-Apps (Outlook, Google Calendar, Apple Calendar, etc.) und zeigen die Termine in der korrekten lokalen Zeit an.