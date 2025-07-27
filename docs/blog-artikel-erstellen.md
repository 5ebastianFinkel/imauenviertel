# Anleitung: Blog-Artikel erstellen

Diese umfassende Anleitung erklärt, wie neue Blog-Artikel für die Website des Kleingartenvereins "Im Auenviertel" erstellt werden.

## Übersicht

Blog-Artikel werden als Markdown- oder MDX-Dateien im Verzeichnis `src/content/blog/` gespeichert. Jeder Artikel ist eine eigene Datei mit spezifischen Metadaten im Frontmatter-Bereich und dem eigentlichen Inhalt in Markdown.

## Dateistruktur

### Speicherort
Alle Blog-Artikel werden im folgenden Verzeichnis gespeichert:
```
src/content/blog/
```

### Dateinamen-Konvention
Verwenden Sie aussagekräftige Dateinamen in Kleinbuchstaben mit Bindestrichen:
- ✅ Gut: `heckenschnitt.md`
- ✅ Gut: `neues-zur-gemeinschaftsarbeit.md`
- ✅ Gut: `sommerfest-2025.mdx` (für MDX-Dateien)
- ❌ Vermeiden: `Artikel1.md` oder `2025-07-05.md`

### Dateitypen
- `.md` - Standard Markdown-Dateien
- `.mdx` - MDX-Dateien (Markdown mit React-Komponenten)

## Frontmatter-Felder

Jede Blog-Datei beginnt mit einem Frontmatter-Block zwischen `---` Markierungen:

```markdown
---
draft: false
title: "Titel des Artikels"
image: {
  src: "URL oder Pfad zum Bild",
  alt: "Alternativtext für das Bild"
}
publishDate: "2025-01-25"
author: "Autorname"
category: "Kategorie"
tags: [Tag1, Tag2, Tag3]
---
```

### Pflichtfelder

| Feld | Typ | Beschreibung | Beispiel |
|------|-----|--------------|----------|
| `draft` | boolean | Entwurfsstatus (false = veröffentlicht) | `false` |
| `title` | string | Titel des Artikels | `"Neuerungen bei der Gemeinschaftsarbeit"` |
| `image` | object | Titelbild mit src und alt | siehe unten |
| `publishDate` | string | Veröffentlichungsdatum (YYYY-MM-DD) | `"2025-01-25"` |
| `category` | string | Artikel-Kategorie | `"Mitteilung"` |
| `tags` | array | Liste von Schlagwörtern | `[Gemeinschaftsarbeit, Vorstand]` |

### Image-Objekt
```yaml
image: {
  src: "https://example.com/bild.jpg",  # oder "../../assets/bild.webp"
  alt: "Beschreibung des Bildes"
}
```

### Optionale Felder

| Feld | Typ | Beschreibung | Standard | Beispiel |
|------|-----|--------------|----------|----------|
| `author` | string | Name des Autors | `"Im Auenviertel"` | `"Der Vorstand"` |

## Kategorien

Verwenden Sie eine der folgenden Kategorien:
- **Mitteilung** - Offizielle Vereinsmitteilungen
- **Bericht** - Berichte über Veranstaltungen oder Aktivitäten
- **Ankündigung** - Ankündigungen kommender Events
- **Information** - Allgemeine Informationen

## Markdown-Syntax Übersicht

### Überschriften
```markdown
# Überschrift 1
## Überschrift 2
### Überschrift 3
#### Überschrift 4
##### Überschrift 5
###### Überschrift 6
```

### Textformatierung
```markdown
**Fetter Text**
*Kursiver Text*
***Fett und kursiv***
~~Durchgestrichener Text~~
```

### Listen

#### Ungeordnete Listen
```markdown
- Erster Punkt
- Zweiter Punkt
  - Unterpunkt
  - Noch ein Unterpunkt
- Dritter Punkt

* Alternative mit Sternchen
* Zweiter Punkt
```

#### Geordnete Listen
```markdown
1. Erster Punkt
2. Zweiter Punkt
   1. Unterpunkt
   2. Noch ein Unterpunkt
3. Dritter Punkt
```

### Links
```markdown
[Linktext](https://example.com)
[Link zu einer anderen Seite](/dates)
[Link mit Titel](https://example.com "Titel beim Hover")
```

### Bilder
```markdown
![Alt-Text](bildurl.jpg)
![Lokales Bild](../../assets/meinbild.webp)
![Bild mit Titel](bild.jpg "Titel beim Hover")
```

### Zitate
```markdown
> Dies ist ein Zitat
> Es kann mehrere Zeilen haben
>
> > Verschachtelte Zitate sind auch möglich
```

### Code

#### Inline-Code
```markdown
Verwenden Sie `npm install` um Pakete zu installieren.
```

#### Code-Blöcke
````markdown
```javascript
function gruss() {
  console.log("Hallo Kleingärtner!");
}
```

```bash
pnpm dev
```
````

### Tabellen
```markdown
| Spalte 1 | Spalte 2 | Spalte 3 |
|----------|----------|----------|
| Zeile 1  | Daten    | Mehr Daten |
| Zeile 2  | Daten    | Mehr Daten |

| Links | Zentriert | Rechts |
|:------|:---------:|-------:|
| Text  | Text      | Text   |
```

### Horizontale Linien
```markdown
---
***
___
```

### Aufgabenlisten
```markdown
- [x] Erledigte Aufgabe
- [ ] Offene Aufgabe
- [ ] Noch eine offene Aufgabe
```

### Fußnoten
```markdown
Dies ist ein Text mit einer Fußnote[^1].

[^1]: Dies ist die Fußnote.
```

## Erweiterte Markdown-Features

### HTML in Markdown
Sie können HTML direkt in Markdown verwenden:
```markdown
<div class="hinweis">
  <p>Dies ist ein wichtiger Hinweis!</p>
</div>

<mark>Hervorgehobener Text</mark>
```

### Details/Summary (Aufklappbare Bereiche)
```markdown
<details>
<summary>Klicken Sie hier für mehr Informationen</summary>

Hier steht der versteckte Inhalt, der beim Klicken angezeigt wird.

</details>
```

## MDX-Features

MDX-Dateien unterstützen alle Markdown-Features plus React-Komponenten:

### Import von Komponenten
```mdx
---
# Frontmatter wie gewohnt
---

import MeineKomponente from '../../components/MeineKomponente.astro';

# Mein Artikel

Normaler Markdown-Text.

<MeineKomponente prop="wert" />
```

## Bilder verwenden

### Externe Bilder (URLs)
```yaml
image: {
  src: "https://images.unsplash.com/photo-123...",
  alt: "Beschreibung des Bildes"
}
```

### Lokale Bilder
1. Speichern Sie Bilder im Ordner `src/assets/`
2. Verwenden Sie relative Pfade:
```yaml
image: {
  src: "../../assets/mein-bild.webp",
  alt: "Beschreibung des Bildes"
}
```

### Bilder im Artikel
```markdown
![Weg mit geschnittener Hecke](../../assets/Ergebnis_Heckenschnitt.webp)
```

**Empfohlene Bildformate:**
- `.webp` - Beste Komprimierung und Qualität
- `.jpg` / `.jpeg` - Für Fotos
- `.png` - Für Grafiken mit Transparenz

## Schritt-für-Schritt Anleitung

1. **Neue Datei erstellen**
   - Navigieren Sie zu `src/content/blog/`
   - Erstellen Sie eine neue `.md` oder `.mdx` Datei

2. **Frontmatter hinzufügen**
   ```markdown
   ---
   draft: false
   title: "Ihr Artikeltitel"
   image: {
     src: "bildurl",
     alt: "Bildbeschreibung"
   }
   publishDate: "2025-01-30"
   author: "Der Vorstand"
   category: "Mitteilung"
   tags: [Vereinsleben, Information]
   ---
   ```

3. **Inhalt schreiben**
   - Verwenden Sie Markdown-Syntax
   - Strukturieren Sie mit Überschriften
   - Fügen Sie Bilder und Links ein

4. **Speichern und Testen**
   - Speichern Sie die Datei
   - Starten Sie den Entwicklungsserver: `pnpm dev`
   - Prüfen Sie den Artikel unter `/blog`

## Beispiele

### Beispiel 1: Einfacher Bericht
```markdown
---
draft: false
title: "Erfolgreicher Heckenschnitt"
image: {
  src: "../../assets/hecke.webp",
  alt: "Geschnittene Hecke"
}
publishDate: "2025-05-14"
category: "Bericht"
tags: [Gemeinschaftsarbeit, Heckenschnitt]
---

## Gemeinsam geschafft!

Am vergangenen Samstag haben wir mit vielen fleißigen Helfern die Hecken geschnitten.

![Ergebnis](../../assets/ergebnis.webp)

Vielen Dank an alle Helfer!
```

### Beispiel 2: Ausführliche Mitteilung mit Fragen und Antworten
```markdown
---
draft: false
title: "Neuerungen bei der Gemeinschaftsarbeit - FAQ"
image: {
  src: "https://images.unsplash.com/photo-...",
  alt: "Gartenarbeit"
}
publishDate: "2025-01-25"
author: "Der Vorstand"
category: "Mitteilung"
tags: [Gemeinschaftsarbeit, Vorstand, FAQ]
---

## Wichtige Änderungen für 2025

Die Organisation der Gemeinschaftsarbeit wurde überarbeitet. Hier finden Sie Antworten auf häufige Fragen.

### Warum wurde die Organisation umgestellt?

Auf Wunsch vieler Mitglieder wurden die Arbeitszeiten angepasst:
- **Vorher:** 4 Stunden pro Termin
- **Neu:** 3 Stunden pro Termin (10-13 Uhr)

### Wie viele Termine gibt es?

Es gibt weiterhin vier reguläre Termine:

| Monat | Datum | Uhrzeit |
|-------|-------|---------|
| April | 05.04. | 10-13 Uhr |
| Juni | 07.06. | 10-13 Uhr |
| August | 02.08. | 10-13 Uhr |
| Oktober | 04.10. | 10-13 Uhr |

> **Wichtig:** Zusätzlich gibt es einen Sonderarbeitstermin im Februar.

### Weitere Informationen

<details>
<summary>Klicken Sie hier für detaillierte Regelungen</summary>

- Pro Parzelle sind 8 Pflichtstunden zu leisten
- Die Stunden können auf die Termine verteilt werden
- Mindestens 3 Termine müssen besucht werden

</details>
```

## Best Practices

### Titel
- Prägnant und aussagekräftig
- Vermeiden Sie zu lange Titel
- Nutzen Sie Substantive statt Verben

### Bilder
- Verwenden Sie aussagekräftige Alt-Texte
- Optimieren Sie Bildgrößen (max. 1-2 MB)
- Bevorzugen Sie WebP-Format
- Wählen Sie Bilder, die zum Thema passen

### Tags
- Verwenden Sie 2-5 relevante Tags
- Nutzen Sie bestehende Tags wieder
- Schreiben Sie Tags in Substantivform
- Beispiele: Gemeinschaftsarbeit, Sommerfest, Vorstand

### Inhalt
- Strukturieren Sie mit Überschriften
- Nutzen Sie kurze Absätze
- Verwenden Sie Listen für Aufzählungen
- Fügen Sie relevante Bilder ein
- Schreiben Sie in aktivem, freundlichem Ton

## Anzeige auf der Website

Blog-Artikel werden auf der `/blog` Seite angezeigt mit:
- Vorschaubild
- Kategorie
- Titel
- Veröffentlichungsdatum
- Autor
- Textvorschau

Nur Artikel mit:
- `draft: false` (veröffentlicht)
- `publishDate` in der Vergangenheit

werden auf der Website angezeigt.

## Häufige Fehler vermeiden

1. **Falsches Datumsformat**
   - ❌ `publishDate: "25.01.2025"`
   - ✅ `publishDate: "2025-01-25"`

2. **Fehlende Bildangaben**
   - ❌ `image: "bild.jpg"`
   - ✅ `image: { src: "bild.jpg", alt: "Beschreibung" }`

3. **Tags als String statt Array**
   - ❌ `tags: "Gemeinschaftsarbeit, Vorstand"`
   - ✅ `tags: [Gemeinschaftsarbeit, Vorstand]`

4. **Relative Pfade ohne korrekte Ebenen**
   - ❌ `![Bild](assets/bild.jpg)`
   - ✅ `![Bild](../../assets/bild.jpg)`

5. **Fehlende Leerzeile nach Überschriften**
   ```markdown
   ## Überschrift
   
   Text beginnt hier (Leerzeile dazwischen)
   ```

## Tipps für gute Artikel

1. **Einleitung schreiben**
   - Fassen Sie das Wichtigste in 2-3 Sätzen zusammen
   - Wecken Sie Interesse für den Artikel

2. **Visuell aufbereiten**
   - Nutzen Sie Bilder zur Auflockerung
   - Verwenden Sie Tabellen für Übersichten
   - Setzen Sie Listen für Aufzählungen ein

3. **Call-to-Action**
   - Laden Sie zur Teilnahme ein
   - Verweisen Sie auf weitere Informationen
   - Geben Sie Kontaktmöglichkeiten an

4. **Korrekturlesen**
   - Prüfen Sie Rechtschreibung und Grammatik
   - Testen Sie alle Links
   - Kontrollieren Sie die Bildanzeige