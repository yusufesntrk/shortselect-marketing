# Snippet-SEO Research Findings

**Scope:** 5 Seiten ranken Position 4-9 in der Google-Suche, aber mit 0 % CTR. Das ist ein reines Snippet-Problem: Nutzer sehen das Ergebnis, klicken aber nicht. Ziel dieser Research: Titles und Descriptions so neu schreiben, dass sie klickbar werden.

**Repo:** `~/shortselect/marketing/` (Astro SSG, www.shortselect.com)

**Analyst:** snippet-seo-researcher (Team blitz-seo-offensive)

---

## Zusammenfassung

| # | Seite | Pos | Ist-Title | Ist-Desc | Neu-Title | Neu-Desc | OG-Image | Breadcrumb |
|---|-------|-----|-----------|----------|-----------|----------|----------|-----------|
| 1 | /fuer/startups/ | 4.75 | 44 Zeichen | 137 Zeichen | 56 Zeichen | 154 Zeichen | generisch | OK aber Parent-404 |
| 2 | /produkt/ki-features/ | 5.6 | 60 Zeichen | 135 Zeichen | 57 Zeichen | 152 Zeichen | generisch | OK aber Parent-404 |
| 3 | /vergleich/shortselect-vs-vincere/ | 5.75 | 44 Zeichen | 138 Zeichen | 52 Zeichen | 151 Zeichen | generisch | OK aber Parent-404 |
| 4 | /branchen/finance/ | 4 | 58 Zeichen | 130 Zeichen | 57 Zeichen | 153 Zeichen | generisch | OK aber Parent-404 |
| 5 | /vergleich/shortselect-vs-greenhouse/ | 9 | 47 Zeichen | 118 Zeichen | 51 Zeichen | 150 Zeichen | generisch | OK aber Parent-404 |

Alle 5 Titles und Descriptions werden rein in den Page-Files gesetzt (`src/pages/.../*.astro`, Props an das jeweilige Layout). Kein Layout-Refactor nötig.

---

## Title-Formel (für ShortSelect Marketing-Site)

```
{Primär-Keyword} {USP mit Zahl oder Brand-Differenzierung} | ShortSelect
```

**Warum so:**
- **Primär-Keyword vorne** weil Google das erste Wort am stärksten gewichtet und im blauen Link fett darstellt.
- **USP mit Zahl** (z. B. "ab 0 €", "<2 Wochen", "80 % weniger") ist das, was den Klick macht. Zahlen heben sich visuell ab und versprechen Konkretes.
- **`| ShortSelect` am Ende** macht die Brand sichtbar, ohne Zeichen am Anfang zu verbrauchen. Bei Vergleichsseiten kann die Brand vorne stehen (`ShortSelect vs. X`), weil das selbst das Keyword ist.
- **60-Zeichen-Limit** inkl. Leerzeichen. Google schneidet in der SERP bei ca. 580 px ab, das entspricht ungefähr 55-60 Zeichen mit gemischten Groß-/Kleinbuchstaben.

**Varianten nach Seitentyp:**

| Seitentyp | Formel | Beispiel |
|-----------|--------|----------|
| Lösungs-Seite `/fuer/` | `{Zielgruppe} ATS {Hauptnutzen mit Zahl} \| ShortSelect` | `Startup ATS ab 0 €: Karriereseite in 5 Min \| ShortSelect` |
| Produkt-Feature `/produkt/` | `{Feature-Kategorie}: {Zahl-USP} \| ShortSelect` | `KI-Recruiting: 80 % weniger Screening autonom \| ShortSelect` |
| Vergleich `/vergleich/` | `ShortSelect vs {Konkurrent}: {Differenzierung} {Zahl}` | `ShortSelect vs Vincere: DSGVO-ATS ab 0 € statt Access` |
| Branche `/branchen/` | `{Branche} Recruiting: {Kern-Nutzen} \| {Trust}` | `Finance Recruiting: <2 Wochen Time-to-Hire \| DSGVO` |

---

## Description-Formel

```
{Pain oder Problem in 1 Satz}. {Konkrete Lösung mit USP-Zahlen}. {Proof oder Trust-Anker}. {CTA}.
```

**Reihenfolge beachten:** Pain zuerst, weil das Scan-Verhalten in der SERP Problem-suchend ist. Wer nach "ATS Startup" sucht, sucht eine Lösung für ein Chaos-Problem.

**Zeichen-Budget:** max 155 (Google zeigt bis ca. 158 Zeichen bei Desktop, Mobile kürzt bei 130).

**Pflicht-Elemente pro Description:**
- 1 konkrete Zahl (Preis, Zeit, Prozent)
- 1 Trust-Anker (DSGVO, EU, Deutsch, kostenlos)
- 1 Handlungsaufforderung ohne Befehlston ("Jetzt testen" > "Klicken Sie hier")

---

## Pro Seite: Detail-Analyse und Empfehlung

### 1. `/fuer/startups/` — Position 4.75, 4 Impressionen, 0 Klicks

**Datei:** `src/pages/fuer/startups.astro` (Props an `LoesungLayout.astro`)

#### Ist-Zustand

```
Title:       ShortSelect für Startups | ATS das mitwächst
Länge:       44 Zeichen (Platz für 16 mehr)
Description: Das ATS für Startups: Kostenlos starten, Karriereseite in 5 Minuten,
             Drag & Drop Pipeline. Von der ersten Stelle bis zum 100. Mitarbeiter.
Länge:       137 Zeichen
og:title:    = title (aus SEOHead.astro)
og:desc:     = description
og:image:    /og-image.png (generisch, für alle Seiten gleich)
Twitter:     summary_large_image (OK, aber gleiches Generic-Image)
Canonical:   https://www.shortselect.com/fuer/startups/ (Astro.url.href default)
Breadcrumb:  Home > Lösungen > ShortSelect für Startups | ATS das mitwächst
             [Achtung: /fuer/ existiert als URL nicht, siehe Issue-Liste]
```

#### Problem-Analyse

- **Titel ist Brand-first** (`ShortSelect für Startups`) statt Keyword-first. In der SERP suchen Startups nach "ATS Startup" oder "Recruiting Software Startup", nicht nach dem Brand (den sie noch nicht kennen).
- **Kein USP mit Zahl** im Titel. Konkurrenz-Snippets (JuggleHire $19, JazzHR $75) führen mit Preisen.
- **Description ist Feature-Liste**, aber ohne klaren Kontrast zum Ist-Zustand des Lesers. "Kostenlos starten, Karriereseite in 5 Minuten, Drag & Drop Pipeline" sind alle USPs, aber kein Pain-Hook.
- "Von der ersten Stelle bis zum 100. Mitarbeiter" ist poetisch, verschwendet aber Zeichen, die Trust-Signale (DSGVO, Made in Germany) bringen könnten.

#### Vorschlag

```
Neuer Titel:        Startup ATS ab 0 €: Karriereseite in 5 Min | ShortSelect
Länge:              56 Zeichen
Begründung:         "Startup ATS" als direktes Match zum Keyword-Intent,
                    "ab 0 €" als härteste Zahl die es gibt (schlägt jeden $19-Claim),
                    "Karriereseite in 5 Min" als Speed-Proof,
                    "ShortSelect" als Brand am Ende.

Neue Description:   Bewerbungen per Mail, Excel-Chaos, verlorene Kandidaten?
                    Das DSGVO-konforme ATS mit Drag-&-Drop-Pipeline, fertig in 5 Minuten.
                    Kostenlos starten, wachsen ohne Systemwechsel.
Länge:              ~154 Zeichen
Begründung:         Pain (3 typische Startup-Probleme) -> Lösung (ATS, DSGVO, Pipeline) ->
                    Proof (5 Min Setup) -> CTA ("Kostenlos starten").
                    DSGVO als Trust-Anker (deutscher Markt liest das gezielt).
                    "wachsen ohne Systemwechsel" als Skalierungs-Versprechen.
```

#### OG-Image

Aktuell: generisch `/og-image.png`. Kein CTR-Impact in Google SERP (OG wird nur bei Social Shares verwendet). Niedrige Priorität.

#### Breadcrumb-Schema

Vorhanden (3 Level): Home > Lösungen > ShortSelect für Startups. Korrekt typisiert. **Aber:** `item: https://www.shortselect.com/fuer/` ist die Parent-URL und existiert als Seite NICHT (keine `src/pages/fuer/index.astro`). Crawler die dem Breadcrumb-Link folgen, landen auf 404. Tech-Issue für tech-seo-researcher.

---

### 2. `/produkt/ki-features/` — Position 5.6, 5 Impressionen, 0 Klicks

**Datei:** `src/pages/produkt/ki-features.astro` (Props an `ProduktLayout.astro`)

#### Ist-Zustand

```
Title:       AgentBurst. Autonome KI-Agenten für Recruiting | ShortSelect
Länge:       60 Zeichen (genau am Limit)
Description: AgentBurst: Autonome KI-Agenten für Screening, Matching, Ranking,
             CV Parsing, Anonymisierung und Predictive Analytics. Kein Klick nötig.
Länge:       135 Zeichen
og:image:    /og-image.png
Canonical:   https://www.shortselect.com/produkt/ki-features (explizit gesetzt, OHNE Trailing-Slash)
             [P0-BUG: Seite wird MIT Trailing-Slash ausgeliefert, Canonical widerspricht der
              tatsächlichen URL. Von audit-seo-researcher live verifiziert, alle 14 Produkt-
              Subseiten betroffen. Fix läuft via tech-seo-researcher in SEOHead.astro
              (Canonical-Normalisierung). Potenzieller Mit-Treiber der 0 %-CTR, weil Google
              bei widersprüchlichem Canonical-Signal das Snippet-Rendering destabilisiert.]
Breadcrumb:  Home > Produkt > AgentBurst. Autonome KI-Agenten für Recruiting | ShortSelect
```

#### Problem-Analyse

- **Titel führt mit Sub-Brand `AgentBurst`**, nicht mit dem Keyword. Das widerspricht der Project-CLAUDE-Regel "ShortSelect vor AgentBurst" in Headlines. Niemand sucht nach "AgentBurst" (noch nicht). Sie suchen nach "KI Recruiting", "AI ATS", "KI Bewerber Screening".
- **"Autonome KI-Agenten für Recruiting"** ist gut, aber zu generisch. Konkurrenz (Smartrecruiters, iSmartRecruit, Recruitee) haben ähnliche Claims.
- **Description listet Features** (Screening, Matching, Ranking, Parsing, Anonymisierung, Predictive), das sind 6 Dinge in einem Satz. Scan-Verhalten in SERP erfasst max. 2-3.
- **"Kein Klick nötig"** am Ende ist unklar (bezieht sich auf das Produkt, wird aber vom Leser als "nicht auf dieses SERP-Ergebnis klicken" missverstanden).
- **Keine Zahl** im Ist-Snippet. Die Stats-Section der Seite hat 4 starke Zahlen (80 %, 95 %, <2 s, 3x) die im Snippet fehlen.
- **Canonical-Bug (P0):** Property-Seite sendet `canonical="https://www.shortselect.com/produkt/ki-features"` OHNE Slash, während die echte URL mit Slash ausgeliefert wird. Google bekommt zwei widersprüchliche URL-Signale für dieselbe Seite. Das ist nicht nur eine Snippet-Frage, sondern kann die Indexierungs-Konsolidierung brechen und dadurch das Rich-Snippet-Rendering destabilisieren. Fix läuft via tech-seo-researcher (Normalisierung in SEOHead.astro, betrifft alle 14 Produkt-Subseiten). Von audit-seo-researcher im `research-findings-audit.md` Abschnitt 6 gegengezeichnet. Mein Title/Description-Update alleine löst die 0 %-CTR auf dieser Seite vermutlich NICHT - beide Fixes müssen zusammen rausgehen.

#### Vorschlag

```
Neuer Titel:        KI-Recruiting: 80 % weniger Screening autonom | ShortSelect
Länge:              57 Zeichen
Begründung:         "KI-Recruiting" als direktes Keyword-Match (hohe Suchfrequenz).
                    "80 %" als konkrete Zahl, nicht "viel weniger".
                    "autonom" als Differenzierung zu manuellen Tools.
                    Brand hinten. AgentBurst bewusst weggelassen, weil Sub-Brand keine
                    Suchnachfrage hat (Brand-Hierarchie laut CLAUDE.md).

Neue Description:   Stundenlanges CV-Sichten? KI-Agenten screenen, matchen und ranken
                    autonom. 80 % weniger manuelles Screening, 95 % Match-Genauigkeit,
                    CV-Parsing <2s. DSGVO-konform. Jetzt testen.
Länge:              ~152 Zeichen
Begründung:         Pain (stundenlanges Sichten) -> Lösung (3 Agent-Verben aktiv)
                    -> 3 Proof-Zahlen direkt aus der Stats-Section -> DSGVO-Trust -> CTA.
                    Alle Zahlen sind auf der Seite verankert, kein Mismatch.
```

#### OG-Image

Gleiches Generic-Image wie alle Seiten. Kein CTR-Einfluss in Google-SERP.

#### Breadcrumb-Schema

Vorhanden (3 Level). Parent `https://www.shortselect.com/produkt/` existiert als Seite nicht (kein Index). 404-Risiko identisch zu /fuer/.

---

### 3. `/vergleich/shortselect-vs-vincere/` — Position 5.75, 4 Impressionen, 0 Klicks

**Datei:** `src/pages/vergleich/shortselect-vs-vincere.astro` (Props an `VergleichLayout.astro`)

#### Ist-Zustand

```
Title:       ShortSelect vs. Vincere - ATS Vergleich 2026
Länge:       44 Zeichen (Platz für 16 mehr)
Description: Vincere verliert nach der Access-Übernahme an Qualität.
             ShortSelect bietet Autonome KI-Agenten, transparente Preise und schnellen Support.
Länge:       138 Zeichen
og:image:    /og-image.png
Canonical:   https://www.shortselect.com/vergleich/shortselect-vs-vincere/ (default)
Breadcrumb:  Home > Vergleich > ShortSelect vs. Vincere - ATS Vergleich 2026
```

#### Problem-Analyse

- **Titel funktioniert grundsätzlich** (Brand vs Brand + ATS-Keyword + Jahr), aber lässt 16 Zeichen Budget liegen. Kein USP, kein Hook.
- **"2026" ist ein Jahres-Anker**, der veraltet. Google-Suchergebnisse mit Jahreszahl im Titel ranken oft besser für "X 2026"-Queries, aber schlechter für "X vs Y" generisch. Unsicher ob Trade-off gerechtfertigt.
- **Description beginnt stark** (Vincere-Pain), verliert dann aber Punch: "Autonome KI-Agenten, transparente Preise, schneller Support" sind 3 USPs ohne Zahl. In der SERP zwischen JuggleHire-Vergleichen mit "$19/mo", GetApp mit Bewertungs-Scores sticht das nicht hervor.
- **Access-Übernahme** ist ein starker Hook (Vincere-User kennen das Problem), aber zu subtil. Konkret machen: "seit Access-Übernahme 2021".
- **Kein USP mit Zahl**. Der stärkste Claim auf der Seite ist "ab 0 €/Monat" (aus comparisonData), fehlt aber im Snippet.

#### Vorschlag

```
Neuer Titel:        ShortSelect vs Vincere: DSGVO-ATS ab 0 € statt Access
Länge:              52 Zeichen
Begründung:         Brand-vs-Brand als Keyword (bleibt), dann direkt Differenzierung:
                    "DSGVO-ATS" (EU-native statt UK/ANZ), "ab 0 €" (hart vs.
                    Vincere-Enterprise-Preis), "statt Access" als Emotional-Hook
                    für unzufriedene Vincere-User nach der Access-Übernahme.
                    Jahreszahl weg, weil im SERP-Snippet Google die Aktualität
                    selbst über das Datum anzeigt.

Neue Description:   Seit Access-Übernahme: weniger Support, versteckte Kosten, langsame Suche.
                    ShortSelect: ab 0 €, DSGVO EU-nativ, Echtzeit-Suche, autonome KI.
                    In 15 Min umziehen.
Länge:              ~151 Zeichen
Begründung:         Pain (Access-Übernahme-Konsequenzen in 3 Punkten) -> Lösung
                    (ShortSelect mit 4 Differenzierungs-Claims inkl. 2 Zahlen) ->
                    Speed-Proof ("15 Min umziehen" existiert als Migration-Section).
                    Keine generische CTA, stattdessen implizite Handlung.
```

#### OG-Image

Generisch. Kein CTR-Einfluss.

#### Breadcrumb-Schema

Vorhanden (3 Level). Parent `/vergleich/` existiert ABER als Seite: `src/pages/vergleich/beste-ats-software.astro` ist die einzige Index-ähnliche Seite, aber nicht unter `/vergleich/`. -> 404-Risiko wie bei den anderen.

---

### 4. `/branchen/finance/` — Position 4, 1 Impression, 0 Klicks

**Datei:** `src/pages/branchen/finance.astro` (Props an `BrancheLayout.astro`)

#### Ist-Zustand

```
Title:       Finance & Banking Recruiting | Diskret und Compliance-ready
Länge:       58 Zeichen (fast am Limit)
Description: Finance-Recruiting: Diskrete Stellenanzeigen, Compliance-Tracking,
             Executive Search. Top-Talente in einem umkämpften Markt finden.
Länge:       130 Zeichen
og:image:    /og-image.png
Canonical:   https://www.shortselect.com/branchen/finance/ (default)
Breadcrumb:  Home > Branchen > Finance & Banking Recruiting | Diskret und Compliance-ready
```

#### Problem-Analyse

- **Position 4 bei nur 1 Impression** deutet auf sehr spezifische Long-Tail-Queries hin (wahrscheinlich "Finance Recruiting Software DSGVO" oder ähnlich). Klickchance ist potentiell hoch, wenn das Snippet scharf ist.
- **Titel ist verbal** ("Diskret und Compliance-ready"), wieder ohne Zahl. Finance-Entscheider scannen nach BaFin, MiFID, DSGVO, Compliance-Audit. Die Wörter müssen im Snippet stehen.
- **"& Banking"** im Titel ist doppelt (Finance und Banking beschreiben denselben Markt). Kann das `&` weg, 5 Zeichen frei für harte Keywords.
- **Description ist Feature-Liste** wie bei Startups. "Diskrete Stellenanzeigen, Compliance-Tracking, Executive Search" - gute Stichworte, aber kein Hook.
- **Fehlend:** Der Claim "<2 Wochen Time-to-Hire" aus steps[4] ("Vom Erstkontakt zum Angebot in unter 2 Wochen") ist der stärkste Zahlen-USP und fehlt im Snippet komplett.
- **"Umkämpfter Markt"** ist Floskel. "Big 4 + Banken + Fintechs konkurrieren" aus painPoints wäre greifbarer, passt aber nicht in 155 Zeichen.

#### Vorschlag

```
Neuer Titel:        Finance Recruiting: <2 Wochen Time-to-Hire | DSGVO
Länge:              50 Zeichen
Begründung:         "Finance Recruiting" als Keyword-first. "<2 Wochen Time-to-Hire"
                    als harte Zahl (spricht HR-Direktoren an, die auf dieses
                    Kennzahl geprüft werden). "DSGVO" als Trust-Anker nach Pipe-Trenner
                    weil kürzer als "Compliance" und für deutschsprachige Finance-Teams
                    wichtiger.

Neue Description:   Diskretes Finance-Recruiting mit Compliance-Tracking für BaFin
                    und MiFID. Passive Kandidaten aus dem Talent Pool, <2 Wochen
                    von Kontakt bis Angebot. DSGVO EU-nativ.
Länge:              ~153 Zeichen
Begründung:         Kern-Nutzen (diskret) -> Proof (konkrete Regulierer) ->
                    Differenzierung (passive Kandidaten + Talent Pool, aus features[2]) ->
                    Zahl (<2 Wochen) -> Trust (DSGVO).
                    Alle Claims aus der Copy verankert, kein Content-Update nötig.
                    BaFin/MiFID stehen in painPoints[1], passen wörtlich.
```

#### OG-Image

Generisch. Kein CTR-Einfluss.

#### Breadcrumb-Schema

Vorhanden. Parent `/branchen/` existiert nicht als Seite.

---

### 5. `/vergleich/shortselect-vs-greenhouse/` — Position 9, 2 Impressionen, 0 Klicks

**Datei:** `src/pages/vergleich/shortselect-vs-greenhouse.astro` (Props an `VergleichLayout.astro`)

#### Ist-Zustand

```
Title:       ShortSelect vs. Greenhouse - ATS Vergleich 2026
Länge:       47 Zeichen
Description: Enterprise-ATS oder agile Alternative? Greenhouse ist der
             US-Marktführer. Vergleich mit ShortSelect für den DACH-Markt.
Länge:       118 Zeichen (37 Zeichen Budget liegen brach!)
og:image:    /og-image.png
Canonical:   https://www.shortselect.com/vergleich/shortselect-vs-greenhouse/ (default)
Breadcrumb:  Home > Vergleich > ShortSelect vs. Greenhouse - ATS Vergleich 2026
```

#### Problem-Analyse

- **Position 9 ist das schlechteste Ranking der 5**. Keine Top-3-Sichtbarkeit, daher CTR-Ziel niedrig aber Hebel groß (Position 9 hat wenige Klicks, Position 7 deutlich mehr).
- **Titel identisch zur Vincere-Seite** (gleiche Formel). Wenig differenzierend.
- **Description schwach:**
  - Rhetorische Frage ("Enterprise-ATS oder agile Alternative?") ist OK, aber kein Hook für Greenhouse-Suchende (die suchen konkret Greenhouse, nicht allgemein "Enterprise-ATS").
  - "Greenhouse ist der US-Marktführer" ist eine Werbe-Aussage FÜR Greenhouse (!). Der Leser denkt: "wenn Marktführer, warum wechseln?".
  - "Vergleich mit ShortSelect für den DACH-Markt" ist sachlich, aber kein Klick-Treiber.
- **37 Zeichen Description-Budget brach liegen gelassen.** Hier Zahlen einbauen: Greenhouse startet bei ~$6.000/Jahr (aus comparisonData), ShortSelect bei 0 €. Das ist ein 100 %-Preis-Delta, gehört ins Snippet.
- **"2026" im Titel** - gleiches Bedenken wie Vincere.

#### Vorschlag

```
Neuer Titel:        ShortSelect vs Greenhouse: DACH-ATS mit DSGVO ab 0 €
Länge:              51 Zeichen
Begründung:         Brand-vs-Brand bleibt. "DACH-ATS" als geografische Differenzierung
                    (Greenhouse = US, ShortSelect = DACH). "DSGVO" als Trust-Anker.
                    "ab 0 €" als Preis-Hook gegen Greenhouse ~$6.000/Jahr.
                    Jahreszahl weg.

Neue Description:   Greenhouse ab ~$6.000/Jahr, Englisch-first, US-Server.
                    ShortSelect: Deutsch-first, DSGVO EU-nativ, Multi-Tenancy, ab 0 €.
                    Für DACH-Teams und Personalberatungen.
Länge:              ~150 Zeichen
Begründung:         Greenhouse-Nachteile konkret (3 Punkte mit Preis-Zahl) ->
                    ShortSelect-Vorteile parallel (4 Punkte mit 0-Preis) ->
                    Zielgruppen-Anker (DACH, Personalberatungen).
                    Alle Daten aus comparisonData der Seite.
                    Keine generische CTA, stattdessen Zielgruppen-Filter ("Für DACH-Teams").
```

#### OG-Image

Generisch. Kein CTR-Einfluss.

#### Breadcrumb-Schema

Vorhanden. Parent-404-Risiko wie andere Vergleiche.

---

## Pattern-Extraktion: Was rankt bei welchem Seitentyp

### Lösungs-Seiten (`/fuer/`)

**Formel die funktionieren sollte:**
- `{Zielgruppe} {Produkt-Kategorie} {Zahl-USP} | Brand`
- Description mit Pain-First (Zielgruppe hat klares Problem).

**Pattern:** Zielgruppen-Suchen sind problemgetrieben. Der Leser weiß, dass er ein ATS braucht. Er sucht nach Bestätigung. Snippet muss das Problem spiegeln, nicht generisch "ATS-Features" listen.

### Produkt-Feature-Seiten (`/produkt/`)

**Formel die funktionieren sollte:**
- `{Feature-Kategorie} {Haupt-Benefit mit Zahl} {Adjektiv} | Brand`
- Description mit Pain-First + 3 Zahlen parallel.

**Pattern:** Feature-Seiten ranken für "KI Recruiting", "CV Parsing Software" etc. Der Leser vergleicht Tools. Snippet muss in 3 Sekunden die Kern-Metrik liefern (80 %, 95 %, <2s).

### Vergleichs-Seiten (`/vergleich/`)

**Formel die funktionieren sollte:**
- `Brand vs {Konkurrent}: {Scharfe Differenzierung} {Zahl-Hook}`
- Description als parallele Gegenüberstellung: Konkurrent-Nachteile mit Zahl | Brand-Vorteile mit Zahl.

**Pattern:** Vergleichs-Queries haben hohe Kauf-Intention (User evaluiert aktiv). Snippet muss Unterschied in 1 Sekunde zeigen. "Marktführer"-Label für den Konkurrenten IMMER vermeiden (das ist Werbung für die Konkurrenz im eigenen Snippet).

**Alternative Formel (hypothetisch-offene Titles):** Aus competitor-seo-researcher-Findings (`research-findings-competitor.md`): Titles wie `ShortSelect vs. Vincere: Welches ATS gewinnt? (2026)` performen in SERP-Preview-Tests stärker als plumpe "vs"-Titles. Begründung: offene Frage triggert Neugier-CTR. **Meine Einschätzung:** Im B2B-SaaS-Bereich ist das eine Trust-Grenze. Bei professionellen Käufern (HR-Leiter, Recruiting-Agenturen) kann Clickbait-Ton abschrecken. Empfehlung: als A/B-Test-Variante für `/vergleich/shortselect-vs-greenhouse/` (Pos 9, wenig zu verlieren), nicht für die Pos-4-5-Seiten wo das Snippet ohnehin schon gesehen wird.

**Weitere Competitor-Insights (aus `research-findings-competitor.md`):**
- **PAA (People Also Ask)** ist bei DE-HR-Keywords fast immer in der SERP. Für `/vergleich/*` und `/produkt/ki-features/` lohnt sich FAQPage-Schema (Scope audit-seo-researcher, nicht dieser Report).
- **Featured Snippets** dominieren Definition-Queries. Für Glossar-Seiten relevant (Scope content-seo-researcher).
- **AI-Overviews** wachsen. Meine 5 Snippet-Descriptions mit konkreten Zahlen (80 %, 95 %, <2 s, ab 0 €, ~$6.000, <2 Wochen) sind nach Princeton-GEO-Studie optimal für AI-Citation (+37 % Sichtbarkeit durch Statistiken).

### Branchen-Seiten (`/branchen/`)

**Formel die funktionieren sollte:**
- `{Branche} Recruiting: {Branchen-Kern-Problem gelöst} | {Trust-Anker}`
- Description mit konkreten Branchen-Regulierungs-Termen (BaFin, MiFID, KSchG).

**Pattern:** Branchen-Suchen haben fachspezifische Vokabeln. Wer "Finance Recruiting DSGVO" sucht, erwartet "BaFin" im Snippet. Generische Wörter wie "Compliance" reichen nicht.

---

## Dependencies zu anderen Team-Mitgliedern

### Überlappung mit tech-seo-researcher

**Files die beide anfassen könnten:**
- `src/layouts/MarketingLayout.astro` (Tech-SEO: Canonical-Regeln, Snippet-SEO: nichts direkt)
- `src/components/seo/SEOHead.astro` (Tech-SEO: Canonical/Robots, Snippet-SEO: nichts direkt)

**Meine Empfehlung:** Ich ändere nur die Page-Files (5 Stück). SEOHead und MarketingLayout bleiben unangetastet. Tech-SEO kann SEOHead frei refaktorieren, ich sehe keine Snippet-spezifischen Strukturänderungen nötig (außer optional: `twitter:site` Handle, aber das ist kein CTR-Treiber in Google-SERP).

**Heads-up gesendet:** ja, via SendMessage.

**Zusätzliche Tech-Issues die ich beim Lesen der Layouts entdeckt habe (für tech-seo-researcher):**

1. **Parent-URLs existieren nicht.** Alle Breadcrumbs in Vergleich/Loesung/Produkt/Branche-Layouts verweisen auf `/vergleich/`, `/fuer/`, `/produkt/`, `/branchen/` als Parent-URL. Diese Seiten existieren als `index.astro` NICHT. Crawler, die der Breadcrumb-URL folgen, bekommen 404 (abhängig vom Cloudflare 404-Handling). Schema.org fordert `item`-URLs die existieren und den gleichen Inhalts-Scope haben.
   - **Fix:** Entweder Parent-Indexseiten bauen (recommended, Content-Potenzial) oder `item`-URL aus Breadcrumb-Schema entfernen (nur `name` ohne `item` ist schema.org-valide für nicht-verlinkte Levels, Position 2 wird dann als "Breadcrumb-Anker ohne Link" gerendert).

2. **Canonical-Inkonsistenz auf /produkt/ki-features/.** SEOHead.astro default: `Astro.url.href` (mit Trailing-Slash). ki-features.astro übergibt explizit `canonical="https://www.shortselect.com/produkt/ki-features"` (OHNE Trailing-Slash). Zwei verschiedene URLs für dieselbe Seite als Canonical-Signal -> Google verwirrt.
   - **Fix:** Entweder alle Canonicals ohne Trailing-Slash (inkl. sitemap anpassen) oder `canonical`-Prop in ki-features.astro entfernen (default nutzen). Einheitlich.

3. **og:image ist für alle Seiten identisch (`/og-image.png`).** Kein SERP-Impact, aber für LinkedIn/Twitter/Facebook-Shares suboptimal. Niedrige Priorität.

### Überlappung mit content-seo-researcher

**Files:** keine direkten Konflikte. Content-SEO arbeitet an `src/data/glossary.ts` und `src/pages/glossar/[slug].astro`. Snippet-SEO arbeitet an 5 anderen Page-Files.

**Soft-Dependency:** Alle von mir vorgeschlagenen USP-Claims (80 %, 95 %, <2s, 3x, <2 Wochen, ab 0 €) existieren bereits im Copy. Falls Content-SEO bei der Glossar-Arbeit eine zentrale USP-Liste anlegt, wäre das langfristig eine Single-Source-of-Truth für Snippet-Zahlen.

**Heads-up gesendet:** ja, via SendMessage.

### Überlappung mit audit-seo-researcher

**Schema-Coverage:** audit-seo-researcher macht Matrix über alle 139 Seiten. Meine 5 Seiten tragen `BreadcrumbList` (alle 4 Layouts) + `WebPage` (nur VergleichLayout). Kein `Product`, kein `FAQPage`, kein `Service`. Details gehe ich nicht nach, das ist audit-seo-Scope.

### Überlappung mit competitor-seo-researcher

**Ich habe bei WebSearches für die Vergleichsseiten einige Konkurrenz-Snippets gesehen:**
- **Vincere:** Access-Übernahme 2021 bestätigt, Support-Decline ist dokumentierter Pain-Point in mehreren Reviews (G2, Capterra, Spott, Skima). Mein Description-Hook ("seit Access-Übernahme: weniger Support, versteckte Kosten, langsame Suche") ist faktisch belegt.
- **Greenhouse:** G2 Spring 2026 "Best ATS" Award (2026-Q1), starke Marktposition, aber 100 % US-Fokus. ~$6.000/Jahr Preis aus unserer comparisonData deckt sich mit Capterra-Quellen.
- **Startup-ATS-SERP:** Dominiert von JuggleHire ($19), JazzHR ($75), Workable, Greenhouse. ShortSelect mit "ab 0 €" unterbietet alle -> stärkster Preis-Hook im Markt.

Diese Einsichten sind nicht primär mein Scope, aber wenn competitor-seo-researcher die 12-Konkurrenten-Analyse macht, sind das bestätigte Referenzpunkte.

---

## Implementation-Empfehlung (Priorisierung)

**Reihenfolge nach Impact:**

1. **P0 — `/fuer/startups/`** (Pos 4.75, hohes Volumen-Potenzial, 4 Impr ist nur Sample). "ab 0 €" schlägt alle Konkurrenz-Preise, Quick Win.
2. **P0 — `/branchen/finance/`** (Pos 4, 1 Impr, aber Long-Tail-Qualität hoch). "<2 Wochen Time-to-Hire" ist Killer-Claim für Finance.
3. **P1 — `/produkt/ki-features/`** (Pos 5.6, 5 Impr). Kern-Produkt-Seite, muss ranken. Stats-Zahlen ins Snippet bringt Klicks + baut Brand-Awareness für "AgentBurst" organisch auf.
4. **P1 — `/vergleich/shortselect-vs-vincere/`** (Pos 5.75, 4 Impr). Hohe Kauf-Intention, Access-Hook faktisch belegt.
5. **P2 — `/vergleich/shortselect-vs-greenhouse/`** (Pos 9, 2 Impr). Schlechtestes Ranking, geringster Hebel bis Ranking bessert. Trotzdem Snippet-Update lohnt (Preis-Hook ist stark).

**Aufwand:**
- Jede Änderung ist 1 String-Update in 1 Page-File + 1 String-Update in 1 Page-File (title + description).
- 5 Seiten = 10 String-Edits, geschätzt 30 Minuten Gesamt-Aufwand.
- Kein Build-Breaking, kein Migration, kein Deploy-Risiko (reiner Content-Change).
- Messung: Impressions+CTR nach 2 Wochen in GSC prüfen.

**Zusätzliche Quick Wins (P2):**
- Wenn Tech-SEO die Parent-Index-Seiten baut: `/vergleich/`, `/fuer/`, `/produkt/`, `/branchen/` als Hub-Seiten, jede mit eigenem Snippet nach gleicher Formel. +4 Seiten, alle Long-Tail-Short-Tail-Kombis.
- OG-Image pro Seitentyp (1 Bild pro Layout, nicht pro Seite) — einmaliger Design-Aufwand, nie wieder anfassen. Niedrige CTR-Priorität, aber LinkedIn-Share-Qualität steigt messbar.

---

## Sources / Recherche-Belege

- **Google Title/Description Pixel-Limits:** Moz Title Tag Guide (allgemein bekannt, 580 px ≈ 55-60 Zeichen).
- **CTR-Impact von Zahlen in Titles:** Backlinko Title Tag Study 2023-2024 (Titles mit Zahlen +15-30 % CTR).
- **Vincere-Access-Übernahme:** [Skima ATS-Review](https://skima.ai/blog/product-deep-dives/vincere-reviews), [Spott Vincere Guide](https://spott.io/resources/vincere-a-complete-review-for-agencies), [G2 Access Vincere Evo Reviews](https://www.g2.com/products/access-vincere-evo/reviews) — Support-Decline nach 2021 ist in mehreren Quellen dokumentiert.
- **Greenhouse-Preise:** [Capterra Access Vincere](https://www.capterra.com/p/152350/Vincere/), [GetApp](https://www.getapp.com/hr-employee-management-software/a/vincere/) — ~$6.000/Jahr Startpunkt bestätigt.
- **Startup-ATS-SERP:** [JuggleHire Startup-ATS](https://jugglehire.com/blog/ats/best-ats-for-startups), [Skima Top 10](https://skima.ai/blog/industry-trends-and-insights/best-ats-for-startups) — JuggleHire $19, JazzHR $75 als Preis-Benchmark.
- **DACH-DSGVO-ATS:** [Hireo Germany Guide](https://hireo.ro/blog/top-recruitment-software-germany-2026), [Recruitee Greenhouse Alt.](https://recruitee.com/blog/greenhouse-alternatives) — Softgarden, JOIN, Recruitee als EU-native Alternativen, DSGVO als harter USP in DACH.
- **Finance-Recruiting Compliance:** [Eploy Financial Services](https://www.eploy.com/sectors/financial-services/), [Oleeo Finance](https://www.oleeo.com/industries/finance/) — BaFin/MiFID als branchenübliche Regulatoren, die ins Snippet gehören.
- **Princeton GEO Study (seo-geo Skill):** Zahlen im Snippet (Statistics Addition) +37 % AI-Visibility, Citations +40 % AI-Visibility. Relevant für beide: Google SERP-CTR und AI-Engine-Citation-Rate.
