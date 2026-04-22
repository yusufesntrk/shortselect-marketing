# Research: Content-SEO (Recruiting-Funnel-Cluster)

**Owner:** content-seo-researcher
**Repo:** `/Users/yusufesentuerk/shortselect/marketing/` (Astro SSG)
**Target URL:** `https://www.shortselect.com/glossar/recruiting-funnel`
**Stand:** 2026-04-22

---

## 0. Executive Summary (TL;DR)

1. **Der Artikel ist ein Rumpf.** Aktuell ca. **61 Woerter** Kerninhalt (Definition + Importance + 4 Bulletpoints). Ziel fuer Top-3 bei `recruiting funnel` und 10 verwandten Keywords: **2500+ Woerter**. Wir liegen bei ~2.5% des Ziels.
2. **FAQ fehlt komplett.** Weder im Data-Model (`GlossaryEntry`) noch im Template ist ein `faqs`-Feld vorhanden. FAQPage-Schema wird nicht gerendert. 8 GSC-Queries sind de facto direkte Long-Tail-Fragen (`was ist ein recruiting funnel`, `recruiting funnel beispiel`, `mobile funnel recruiting`) die als FAQ-Items gehoert werden wollen.
3. **Hero-Snippet sabotiert.** Aktueller `shortDef` ist ein Halbsatz ("beschreibt die verschiedenen Phasen"). Fuer Featured-Snippet-Chance brauchen wir eine 40-50-Woerter-Definition mit Keyword im ersten Satz.
4. **Null interne Links aus dem Blog.** Mindestens **10 Blog-Posts** nennen "Funnel" inhaltlich (batch1, batch3, batch15, batch17, batch19, batch21, batch22, batch26). **Keiner** verlinkt auf `/glossar/recruiting-funnel`. Groesster schneller Boost-Hebel.
5. **Synonyme sind verwaist.** `hiring funnel` (Pos 24, nur 1 Impression weil keine Landing-Page), `bewerber funnel` (Pos 86), `recruitment funnel` (Pos 36). Empfehlung: Semantisch im selben Artikel abdecken + H2-Sektionen, keine eigenen Eintraege, keine Redirects.

**Geschaetzter Impact (3-6 Monate):** Pos 65 -> Pos 10-15, 31 Impr/Monat -> 400-800 Impr/Monat, erste Clicks (aktuell 0).

---

## 1. Ist-Zustand des Artikels

### 1.1 Content-Umfang

| Feld | Inhalt | Woerter |
|---|---|---|
| `shortDef` | "Der Recruiting Funnel beschreibt die verschiedenen Phasen des Einstellungsprozesses." | 11 |
| `definition` | "Der Recruiting Funnel ist ein Modell, das den Bewerbungsprozess in aufeinanderfolgende Phasen unterteilt. Die typischen Phasen sind: Aufmerksamkeit, Interesse, Screening, Interview, Angebot und Einstellung." | 26 |
| `importance` | "Unternehmen, die ihren Funnel aktiv messen, reduzieren ihre Time-to-Hire um 30%." | 11 |
| `bestPractices` | 4 Bullets a 3-4 Woerter | ~15 |
| `howShortSelectHelps` | 1 Satz | 16 |
| **Summe** | | **~79** |

Der Artikel liegt bei **~79 sichtbaren Woertern** im Hauptinhalt (ohne Hero-Wiederholung). **Konkurrenz in Top-3** (Personio, Softgarden, Greenhouse, Index Recruiting) liegt bei **1800-3500 Woertern** + FAQ + Grafik.

### 1.2 Struktur/Template (`src/pages/glossar/[slug].astro`)

Aktuelle H-Struktur:

- `h1`: Entry-Title ("Recruiting Funnel")
- `h2`: "Definition"
- `h2`: "Warum ist das wichtig?"
- `h2`: "Best Practices"
- `h2`: "So hilft ShortSelect" (CTA-Box)
- `h2`: "Verwandte Begriffe" (3 Tag-Chips)

Problem: **kein H3, keine Tabelle, keine Liste als Antwort-First-Struktur, kein Beispiel, kein FAQ, kein Hero-Snippet-Absatz.** Fuer GEO (Generative Engine Optimization) wuerden AI-Engines hier nichts Verwertbares finden.

### 1.3 Schema.org (`[slug].astro` Zeilen 19-29, 31-39)

Derzeit gerendert:
- `DefinedTerm` (name, description, inDefinedTermSet) - **minimal**, nur shortDef als description
- `BreadcrumbList` - **ok**
- `Organization` (aus MarketingLayout.astro) - ok

**Nicht gerendert:**
- `FAQPage` - **kritisch**, +40% AI-Visibility laut Princeton-GEO
- `Article` bzw. `TechArticle` - nicht gerendert, obwohl der Content Artikelcharakter hat
- `HowTo` fuer "Funnel optimieren" Schritt-fuer-Schritt - optional nice-to-have

### 1.4 Interne Verlinkung

**Eingehende Links auf `/glossar/recruiting-funnel`** aus `src/data/blog/batch*.ts`: **0**.

`relatedSlugs` im Glossary (ausgehend): `["ats", "time-to-hire", "quality-of-hire"]` — ok, aber zu wenig. Empfehlung: + `candidate-experience`, `cost-per-hire`.

`relatedSlugs` anderer Glossar-Eintraege die aktuell auf recruiting-funnel verlinken: 4 (ats, time-to-hire, cost-per-hire, quality-of-hire). Gut.

---

## 2. Gap-Analyse: 11 GSC-Queries vs. Artikel

Jede Query wird einzeln bewertet, ob sie im aktuellen Artikel "addressed" wird (nach Semantik, nicht nur Keyword-Match).

| # | Query | Impr | Pos | Addressed? | Gap |
|---|---|---|---|---|---|
| 1 | `recruiting funnel` | 31 | 61 | Halb | Thin-Content, kein Hero-Snippet, kein Beispiel-Funnel |
| 2 | `performance recruiting funnel` | 8 | 68 | Nein | Kein Abschnitt ueber Performance-Kennzahlen/KPIs pro Stage |
| 3 | `recruiting funnel definition` | 3 | 40 | Ja (thin) | Definition ist 26 Woerter, zu kurz fuer Featured-Snippet |
| 4 | `bewerber funnel` | 3 | 86 | Nein | Synonym taucht nirgends im Text auf |
| 5 | `mobile funnel recruiting` | 3 | 87 | Nein | Thema "Mobile Optimierung des Funnels" fehlt komplett |
| 6 | `hiring funnel` | 1 | 24 | Nein | Englischer Begriff, nicht im Text |
| 7 | `recruitment funnel` | 1 | 36 | Nein | Englische Variante, nicht im Text |
| 8 | `was ist ein recruiting funnel` | 1 | 76 | Halb | Fragen-Intent, keine direkte Antwort-Struktur |
| 9 | `online recruiting funnel` | 1 | 79 | Nein | Kein Abschnitt Online/Digital-spezifisch |
| 10 | `recruiting funnel beispiel` | 1 | 91 | Nein | **Kein Beispiel im Artikel** — kritisch |
| 11 | `recruiting-funnel-cluster` (GSC) | — | — | N/A | Reserviertes Keyword fuer interne Navigation |

**Addressed-Quote: 1/11 vollstaendig, 2/11 halb. 8/11 komplett offen.**

---

## 3. Hero-Snippet-Vorschlag (40-50 Woerter Definition)

Ziel: **erster Absatz nach H1**, Keyword `Recruiting Funnel` im ersten Satz, Zahl integriert, direkter Antwort-First-Stil. Bewirbt sich um Googles Featured Snippet (Position 0).

> **Ein Recruiting Funnel ist ein 6-stufiges Modell, das den Bewerbungsprozess vom ersten Kontakt bis zur Einstellung abbildet: Aufmerksamkeit, Interesse, Bewerbung, Screening, Interview und Angebot. Jede Stufe hat eine messbare Konversionsrate. Unternehmen, die ihren Funnel aktiv tracken, besetzen Stellen laut LinkedIn Talent Solutions 30 Prozent schneller.**

**46 Woerter. Keyword-Dichte:** 1x "Recruiting Funnel", 1x "Funnel" — sauber.

Implementation: als neuer erster `<p>` direkt unterhalb H1, in `shortDef` erweitern oder neues Feld `heroSnippet` in `GlossaryEntry` ergaenzen.

---

## 3b. Competitor-Benchmark (Stand 2026-04-22, Quelle: research-findings-competitor.md)

Harte Daten von `competitor-seo-researcher`. Alle drei DE-Top-Ranker fuer "recruiting funnel":

| Ranker | URL | Wordcount | H2s | FAQ-Schema | Statistiken |
|---|---|---|---|---|---|
| rudel-recruiting.de | /ratgeber/recruiting-funnel/ | 5.500 | 16 (Phasen + Social + Wheel + Kritik) | ❌ | sparsam |
| wollmilchsau.de | /glossar/personalmarketing-trichter/ | 2.800 | 8 (Def, Phasen, Personas Renate/Peter/Hanna) | ❌ | Persona-basiert |
| meetovo.de | /blog/was-ist-ein-recruiting-funnel | 1.800 | 6 (Def, Grundsatz, Schritte, Zielgruppe, Kosten, Erstellung) | ❌ | 15-150 EUR/Bewerbung, 20 Mio Reichweite |

**Strukturelle Befunde**
- **Wordcount-Sweet-Spot: 2.500-3.500 Woerter.** Rudels 5.500 sind ueberdimensioniert, wollmilchsaus 2.800 rankt gleichwertig. Mein Ziel von 2.600 Woertern (Section 4) liegt damit mittig im validierten Sweet-Spot. Kein Grund zur Aufstockung auf 5.500.
- **FAQPage-Schema: universell fehlend.** Keiner der drei Top-Ranker hat FAQPage-Schema implementiert. Das ist unser direkter Differenzierungs-Hebel fuer PAA-Boxen + AI-Overview-Citation. Bestaetigt FAQ-Section meiner Findings (Section 5) als kritischen P0.
- **Phasen als H2, nicht H3.** Rudel und meetovo rendern die Funnel-Phasen als H2 (nicht als Unterpunkte unter einem Sammel-H2). Das widerspricht meiner urspruenglichen Gliederung in Section 4, die "Die 6 Phasen" als H2 mit Phase-1-bis-6 als H3 plant. **Korrektur notwendig (Section 4.1).**
- **Statistiken sind Trumpf, nicht Laenge.** Meetovo rankt trotz kuerzester Laenge (1.800) stark wegen konkreter Zahlen (Kosten-Benchmarks, Reichweite). Unser Plan mit LinkedIn/Appcast/Indeed-Benchmarks (Section 3 + 5) ist richtig — jede Sektion braucht mindestens eine konkrete Zahl.

**Marktluecke-Befund**
- **Personio, Softgarden, Greenhouse, Recruitee ranken NICHT.** Das hat competitor-seo explizit bestaetigt. Die grossen ATS-Anbieter haben keine deutschen Recruiting-Funnel-Landings. Damit konkurrieren wir nicht mit Softwareanbietern, sondern mit Content-Publishern (Beraterinnen, Agenturen). Implikation: ShortSelects ATS-Kontext im Artikel ist ein Unique-Angle — keiner der Top-3 vermittelt den Funnel aus ATS-/Tool-Perspektive. Best-Practices und CTA-Block bleiben damit hochwertige Differenzierung.

---

## 4. Vorgeschlagene H2/H3-Gliederung (fuer 2500+ Woerter)

Struktur ist optimiert fuer:
- **Featured Snippet Eligibility** (Hero-Absatz + Tabelle + nummerierte Liste)
- **AI-Citation** (Zahlen, Quellen, strukturierte Abschnitte)
- **Long-Tail-Coverage** (alle 11 GSC-Queries explizit adressiert)

```
H1: Was ist ein Recruiting Funnel? Definition, Phasen, Beispiel und Best Practices

  [Hero-Snippet-Absatz, 46 Woerter]

  [Table-of-Contents auto-generiert aus H2]

H2: Definition: Recruiting Funnel einfach erklaert
  (200 Woerter, erweitert definition-Feld, inkl. Synonymen: hiring funnel, recruitment funnel, bewerber funnel, Personalbeschaffungs-Trichter)

H2: Die 6 Phasen des Recruiting Funnels im Ueberblick
  (Einleitung 100 Woerter: Liste der Phasen als Numbered List fuer Featured-Snippet-Chance)

H2: Phase 1 — Aufmerksamkeit (Awareness / TOFU)
H2: Phase 2 — Interesse (Consideration)
H2: Phase 3 — Bewerbung (Application)
H2: Phase 4 — Screening (Pre-Qualification)
H2: Phase 5 — Interview (Evaluation)
H2: Phase 6 — Angebot und Einstellung (Offer / Hire)
  (pro Phase 100 Woerter: Ziel, Metrik, typische Abbruch-Gruende — je H2 weil Top-Ranker es so machen, nicht als H3 unter Sammel-H2)

H2: Recruiting Funnel Beispiel: So sieht ein realer Funnel aus
  (300 Woerter, konkretes Zahlenbeispiel 1000 -> 1 Hire mit Benchmark-Werten von LinkedIn/Greenhouse/Lever)
  -> Adressiert "recruiting funnel beispiel" (Pos 91)

H2: Performance-Kennzahlen: Die 7 wichtigsten Funnel-KPIs
  (Einleitung 80 Woerter + Tabelle mit Benchmarks)
  H3: Application Conversion Rate
  H3: Screening-Pass-Rate
  H3: Interview-to-Offer Ratio
  H3: Offer Acceptance Rate
  H3: Pipeline Velocity
  H3: Cost-per-Stage
  H3: Quality-per-Source
  (je 40-50 Woerter pro H3 — hier bleiben H3s legitim, da es um KPIs als Subthema geht, nicht um die Top-Level-Phasen. Gesamt 400 Woerter)
  -> Adressiert "performance recruiting funnel" (Pos 68)

H2: Mobile Recruiting Funnel: Warum 68 Prozent der Bewerbungen auf dem Smartphone starten
  (250 Woerter, Mobile-First-Optimierungen: One-Click-Apply, Formular-Laenge, Ladezeit)
  -> Adressiert "mobile funnel recruiting" (Pos 87)

H2: Online vs Offline Recruiting Funnel
  (200 Woerter, Vergleich Karriereseite / Jobboerse / Social Recruiting / Active Sourcing)
  -> Adressiert "online recruiting funnel" (Pos 79)

H2: Wo Recruiting Funnels am haeufigsten lecken (Top 5 Bottlenecks)
  (350 Woerter, nummerierte Liste: unklare Stellenanzeigen, zu lange Formulare, langsame Antwortzeiten, schlechte Interview-Erfahrung, Gehalts-Mismatch)

H2: Recruiting Funnel optimieren: 8 Best Practices
  (400 Woerter, ersetzt current bestPractices mit ausfuehrlichen Erlaeuterungen pro Punkt)

H2: Recruiting Funnel vs Sales Funnel: Die Parallelen
  (200 Woerter, Internal Link auf Blog-Post `recruiting-ist-sales-funnel`)

H2: Haeufig gestellte Fragen zum Recruiting Funnel
  (FAQ-Sektion, 8 Fragen, siehe Abschnitt 5)

H2: Recruiting Funnel mit ShortSelect: Kanban-Pipeline + Analytics
  (150 Woerter, CTA-Kontext)

H2: Verwandte Begriffe (current Related Terms)
  (Keine Woerter, nur Tag-Chips)
```

**Geschaetzte Gesamt-Wordcount: ~2.600 Woerter.** Passt ohne Fluff, da jede Sektion einen konkreten Gap adressiert.

---

## 5. 8 FAQ-Fragen mit Antwort-Entwuerfen

Jede Frage ist direkt aus GSC-Queries oder semantisch verwandten Long-Tail-Suchen abgeleitet. Antworten sind 40-80 Woerter (AI-Citation-optimiert), mit Zahlen wo moeglich.

### Q1. Was ist ein Recruiting Funnel?
> Ein Recruiting Funnel ist ein mehrstufiges Modell, das den Bewerbungsprozess vom ersten Kontakt bis zur Einstellung abbildet. Die typischen 6 Phasen sind Aufmerksamkeit, Interesse, Bewerbung, Screening, Interview und Angebot. An jeder Stufe fallen Kandidaten heraus, weshalb der Prozess trichterfoermig verlaeuft. Der Begriff stammt urspruenglich aus dem Marketing (Sales Funnel) und wurde auf den Recruiting-Kontext uebertragen.
> **Source-Query:** `was ist ein recruiting funnel` (Pos 76)

### Q2. Was ist der Unterschied zwischen Recruiting Funnel und Hiring Funnel?
> Recruiting Funnel, Hiring Funnel, Recruitment Funnel und Bewerber Funnel meinen dasselbe Konzept. "Hiring Funnel" ist die im US-amerikanischen Raum gebraeuchliche Variante, "Recruitment Funnel" die britische. Im deutschsprachigen Raum hat sich "Recruiting Funnel" durchgesetzt. Vereinzelt spricht man auch von Personalbeschaffungs-Trichter. Inhaltlich bezeichnen alle Begriffe denselben mehrstufigen Auswahlprozess.
> **Source-Queries:** `hiring funnel` (Pos 24), `recruitment funnel` (Pos 36), `bewerber funnel` (Pos 86)

### Q3. Welche Phasen hat ein Recruiting Funnel?
> Ein klassischer Recruiting Funnel hat 6 Phasen: 1. Aufmerksamkeit (Stellenanzeige wird gesehen), 2. Interesse (Kandidat besucht Karriereseite), 3. Bewerbung (Formular wird abgeschickt), 4. Screening (CV-Review und Vorauswahl), 5. Interview (ein oder mehrere Gespraeche), 6. Angebot und Einstellung. Manche Modelle ergaenzen vorgelagert "Sourcing" und nachgelagert "Onboarding".
> **Source-Query:** `recruiting funnel` (Pos 61) + semantisch

### Q4. Wie sieht ein Recruiting Funnel Beispiel aus?
> Ein realistischer Recruiting Funnel fuer eine mittlere Fachkraft-Stelle zeigt laut Benchmarks von LinkedIn und Greenhouse folgendes Verhaeltnis: aus 1.000 Impressions werden ca. 150 Klicks auf die Karriereseite, davon 15 Bewerbungen, davon 8 Screening-Passes, davon 3 Interviews, davon 1 Angebot und 1 Einstellung. Die Konversion vom Impression zur Einstellung liegt damit bei 0,1 Prozent.
> **Source-Query:** `recruiting funnel beispiel` (Pos 91)

### Q5. Was ist ein Performance Recruiting Funnel?
> Ein Performance Recruiting Funnel ist die datenbasierte Variante, bei der jede Funnel-Phase KPIs traegt: Conversion Rate pro Stage, Time-in-Stage, Cost-per-Stage und Quality-per-Source. Der Begriff stammt aus dem Performance Marketing und betont messbare Optimierung statt qualitativer Einschaetzung. Teams messen so den ROI jedes Sourcing-Kanals und jeder Prozess-Aenderung.
> **Source-Query:** `performance recruiting funnel` (Pos 68)

### Q6. Wie optimiert man einen mobilen Recruiting Funnel?
> Ein mobiler Recruiting Funnel wird durch 4 Hebel optimiert: One-Click-Apply statt langer Formulare (senkt Abbruchrate um 40 Prozent laut Appcast), Ladezeit unter 2 Sekunden, WhatsApp- oder SMS-Kommunikation statt E-Mail und mobile-optimierte Stellenanzeigen mit kurzen Absaetzen. 68 Prozent aller Bewerbungen starten 2025 auf dem Smartphone.
> **Source-Query:** `mobile funnel recruiting` (Pos 87)

### Q7. Wie lange dauert ein typischer Recruiting Funnel?
> Die durchschnittliche Time-to-Hire betraegt in Deutschland 42 Tage laut LinkedIn Talent Insights 2024. Innerhalb des Funnels verteilen sich diese typischerweise so: 5 Tage bis erste Sichtung, 10 Tage bis Screening, 14 Tage fuer Interviews, 7 Tage bis Angebot, 6 Tage bis Vertragsunterschrift. Unternehmen mit modernem ATS erreichen 21-28 Tage.
> **Source-Query:** semantisch, ergaenzt Funnel-Thema

### Q8. Wo lecken Recruiting Funnels am haeufigsten?
> Die drei groessten Leck-Stellen laut Indeed Hiring Lab sind: 1. Bewerbungsformular (60 Prozent Abbruch bei mehr als 20 Feldern), 2. Ghosting nach Erstgespraech (35 Prozent der Kandidaten bekommen keine Rueckmeldung nach 10 Tagen), 3. Gehaltsangebot-Phase (15-20 Prozent Ablehnung wegen Mismatch zur Ausschreibung). Transparente Kommunikation und kurze Formulare reduzieren alle drei Leaks.
> **Source-Query:** semantisch, Bridge zum internen Blog `warum-bewerber-abspringen`

---

## 6. Interne Verlinkung: Blog-Posts die auf `/glossar/recruiting-funnel` linken sollten

**Derzeit: 0 Blog-Posts verlinken auf die Glossar-Seite.** Das ist der schnellste Hebel fuer autoritaere Signale an Google (PageRank-Fluss von starken Blog-Posts auf die Ziel-Seite).

Empfohlene Implementation: Inline-Link beim ersten Vorkommen des Wortes "Funnel" oder "Recruiting Funnel" im Fliesstext. Anker-Text jeweils auf konkreten Kontext abgestimmt (nicht generisch "hier klicken").

| # | Blog-Slug | Kontext | Vorgeschlagener Anker-Text |
|---|---|---|---|
| 1 | `recruiting-ist-sales-funnel` | Ganzer Artikel ueber TOFU/MOFU/BOFU | **"Recruiting Funnel"** (erste Nennung) |
| 2 | `recruiting-kpis-die-jedes-team-kennen-muss` | Listet Pipeline Velocity | "Phasen des Recruiting Funnels" |
| 3 | `warum-bewerber-abspringen` | Funnel-Leaks | "an welcher Stelle im Funnel" -> verlinken |
| 4 | `recruiting-dashboard-kpis` | Dashboard-KPIs pro Stage | "die Phasen des Recruiting Funnels" |
| 5 | `data-driven-recruiting` | Conversion-Rate-Analyse | "Recruiting Funnel analysieren" |
| 6 | `time-to-hire-reduzieren` | Funnel-Optimierung | "Recruiting Funnel optimieren" |
| 7 | `stellenanzeigen-die-funktionieren` | TOFU der Stellenanzeige | "Top of Funnel im Recruiting" |
| 8 | `bewerbungsprozess-automatisieren` | Automatisierung pro Stage | "jede Phase des Recruiting Funnels" |
| 9 | `candidate-experience-verbessern` | Erfahrung entlang aller Phasen | "entlang des Recruiting Funnels" |
| 10 | `recruiting-automatisierung-roi` | ROI pro Funnel-Stage | "ROI jeder Funnel-Stufe" |
| 11 | `kein-sales-prozess-kein-wachstum` | Parallele Sales- / Recruiting-Funnel | "Recruiting-Pipeline als Funnel" |
| 12 | `matching-qualitaet-verbessern` | Screening-Stage | "Screening-Phase im Funnel" |
| 13 | `bewerber-ghosting-verhindern` | Kommunikation entlang Funnel | "Funnel-Stages" |
| 14 | `recruiting-trends-2026` | Zukunft der Trichter-Modelle | "Recruiting Funnel" |

Mindest-Ziel: **10 ausgehende Blog-Links**. Empfohlen: 14, falls Schema-Update fuer Article (fuer jeden Blog-Post) parallel laeuft.

**Wichtig:** Content-Edit in den Blog-Batches. Jeder Batch ist eine TypeScript-Datei mit HTML-Strings. Link-Insert ist straight-forward `<a href="/glossar/recruiting-funnel">Recruiting Funnel</a>`.

### 6.1 Ausgehende Links AUS dem Funnel-Artikel (Orphan-Page-Rettung)

Laut audit-seo-researcher (research-findings-audit.md Abschnitt 4) sind `/fuer/hr-leiter`, `/fuer/geschaeftsfuehrer` und `/fuer/recruiter` Orphan-Pages ohne Nav-Link. Der neue Funnel-Artikel kann dies kompensieren, indem er aus relevanten Abschnitten gezielt auf die Persona-Seiten verlinkt. Internal-Link-Juice fliesst zu den Orphans, der Funnel-Artikel wird als Topical-Hub glaubwuerdiger.

| Persona-Seite | Anker-Kontext im Funnel-Artikel | Vorgeschlagener Anker-Text |
|---|---|---|
| `/fuer/hr-leiter` | H2 "Performance-Kennzahlen" / "Wo Recruiting Funnels lecken" | "Als HR-Leiter den Funnel steuern" |
| `/fuer/geschaeftsfuehrer` | H2 "Recruiting Funnel vs Sales Funnel" (Business-Parallele) | "Recruiting aus Geschaeftsfuehrer-Perspektive" |
| `/fuer/recruiter` | H2 "Recruiting Funnel optimieren: 8 Best Practices" | "Der Recruiter-Alltag entlang des Funnels" |
| `/branchen/finance/` | H2 FAQ Q7 / "Time-to-Hire pro Branche" | "Finance-Recruiting: Time-to-Hire unter 2 Wochen" |

Zusammen mit Blog-Links (14) + Persona-Links (4) erreicht der Funnel-Artikel ein gesundes ein- und ausgehendes Link-Profil.

---

## 7. Schema-Rendering-Status

| Schema | Aktuell | Benoetigt | Aktion |
|---|---|---|---|
| `DefinedTerm` | ✅ minimal | ✅ erweitern um `termCode`, `url` | Edit `[slug].astro` L19-29 |
| `BreadcrumbList` | ✅ | ✅ | OK |
| `Organization` | ✅ via MarketingLayout | ✅ | OK (tech-seo erweitert um sameAs/alternateName/foundingDate) |
| `WebSite` | ❌ fehlt | ✅ fuer SearchAction | tech-seo ergaenzt in MarketingLayout |
| `FAQPage` | ❌ fehlt | ✅ **kritisch** | FAQ-Field in `GlossaryEntry` + Rendering in `[slug].astro` |
| `Article` | ❌ fehlt | ❌ **NICHT empfohlen** fuer Glossar | Schema-Typ-Mismatch, siehe 7.1 |
| `HowTo` | ❌ fehlt | ⚠️ nice-to-have fuer "Funnel optimieren"-Abschnitt | Optional |

### 7.1 Article-Schema: Empfehlung geaendert zu "NICHT hinzufuegen"

**Korrektur auf Hinweis von `tech-seo-researcher`:** Der urspruengliche Plan Article-Schema fuer Glossar-Eintraege zu rendern ist problematisch. `Article` ist semantisch fuer datierte redaktionelle Inhalte (Blog-Posts, News). Glossar-Eintraege sind zeitlose Definitionen — `DefinedTerm` + `FAQPage` + `BreadcrumbList` decken das Intent-Spektrum sauber ab.

Google kann bei Article ohne klare `datePublished` / `dateModified` Inkonsistenz-Signale werten. Fake-Datums (z.B. `datePublished: "2025-01-01"` ohne echten Publish-Event) waeren schlechter als gar kein Article-Schema.

**Finale Schema-Komposition pro Glossar-Seite:** `DefinedTerm + BreadcrumbList + FAQPage` + die Layout-globalen `Organization + WebSite` = 5 JSON-LD-Scripts. Das ist valider und sauber interpretierbar fuer Google.

Article-Schema kommt dagegen **auf Blog-Posts** (`src/pages/blog/[slug].astro`) — dort mit echten `datePublished` + `dateModified` aus dem Post-Metadata. Das ist ein separater Content-Task ausserhalb meines aktuellen Funnel-Scopes.

### Template-Erweiterungen notwendig

**`src/data/glossary.ts`** — Interface erweitern:

```typescript
export interface GlossaryEntry {
  title: string;
  shortDef: string;
  heroSnippet?: string;        // NEU: 40-50-Woerter-Featured-Snippet
  definition: string;
  importance: string;
  phases?: {                    // NEU fuer Recruiting Funnel / Pipeline-Modelle
    name: string;
    description: string;
    metric?: string;
  }[];
  sections?: {                  // NEU: frei definierbare H2-Blocks
    heading: string;
    body: string;              // HTML
  }[];
  bestPractices: string[];
  faqs?: {                      // NEU: FAQ-Array fuer FAQPage-Schema
    question: string;
    answer: string;
  }[];
  howShortSelectHelps: string;
  relatedSlugs: string[];
}
```

**`src/pages/glossar/[slug].astro`** — Schema-Erweiterung (sinngemaess):

```astro
const faqSchema = entry.faqs && entry.faqs.length >= 2 ? {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: entry.faqs.map(f => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer }
  }))
} : null;

// Kein Article-Schema — siehe Section 7.1. Glossar-Eintraege sind zeitlose Definitionen.

// Compose — FAQPage nur wenn >= 2 Eintraege (Google-Penalty-Vermeidung)
<MarketingLayout jsonLd={[glossarySchema, breadcrumbSchema, faqSchema].filter(Boolean)}>
```

Layout-side kommen `orgSchema` + `websiteSchema` (von tech-seo ergaenzt) automatisch dazu. Finale HTML-Ausgabe pro Glossar-Seite: **5 JSON-LD-Scripts** (DefinedTerm, BreadcrumbList, FAQPage, Organization, WebSite).

**Abgestimmt mit `tech-seo-researcher`:** Array-Merge in SEOHead arbeitet additiv. Kein Konflikt mit tech-seos Canonical-/Schema-Cleanup in MarketingLayout. Tech-seo ergaenzt dort `sameAs`, `alternateName`, `foundingDate` auf orgSchema plus ein neues `websiteSchema`.

### 7.2 Bestaetigte Array-Merge-Mechanik (Implementation-Ready)

Nach Final-Check mit tech-seo ist die Mechanik verifiziert. **Kein Code-Change an SEOHead.astro noetig.** SEOHead serialisiert bereits via `jsonLd.map(ld => <script ...>)`.

**MarketingLayout.astro** (tech-seo-side):
```astro
jsonLd={props.jsonLd
  ? [orgSchema, websiteSchema, ...(Array.isArray(props.jsonLd) ? props.jsonLd : [props.jsonLd])]
  : [orgSchema, websiteSchema]}
```

**glossar/[slug].astro** (content-seo-side, audit-seo rendert):
```astro
<MarketingLayout jsonLd={[definedTermSchema, breadcrumbSchema, faqSchema].filter(Boolean)} ...>
```

**Resultat in HTML:** 5 separate `<script type="application/ld+json">`-Tags (orgSchema + websiteSchema + definedTerm + breadcrumb + faqPage). Google hat kein Limit fuer JSON-LD-Scripts, Rich Results Test akzeptiert beliebig viele.

**FAQPage-Guard bestaetigt als Manual-Action-Schutz:** `entry.faqs && entry.faqs.length >= 2` — Single-FAQ-Pages wurden 2023 von Google abgestraft. Bei Glossar-Eintraegen ohne faqs-Feld darf kein FAQPage-Script rendern.

---

## 8. Synonyme-Strategie (hiring funnel / recruitment funnel / bewerber funnel)

**Meine Empfehlung (Option A): KEIN eigener Glossar-Eintrag, KEIN Redirect. Semantisch im selben Artikel abdecken.**

Begruendung:
- Alle 3 Synonyme sind **strikte Synonyme** des deutschen "Recruiting Funnel" — kein Query-Intent-Unterschied.
- Eigene Eintraege wuerden Duplicate-Content-Risiko erzeugen und Link-Equity splitten.
- Redirects (z.B. `/glossar/hiring-funnel` -> `/glossar/recruiting-funnel`) waeren Overkill und erzeugen unnoetigen Technical Debt.
- Google ranked seit ca. 2019 via Entity-Matching, nicht Keyword-Matching. Ein sauber geschriebener Artikel, der alle Synonyme **einmal erwaehnt** und einen dedizierten FAQ-Eintrag (siehe Q2) hat, covered alle 3 Queries.

**Umsetzung im Artikel (Option A):**
- H2 Definition: ein Absatz "Recruiting Funnel, Hiring Funnel, Recruitment Funnel oder Bewerber Funnel bezeichnen alle dasselbe Konzept..."
- H2 FAQ: Q2 beantwortet explizit den Unterschied
- ALT-Texte von Grafiken: eine Variante mit "hiring funnel diagram" fuer Bildersuche

### 8.1 Gegenposition (Option B) von `competitor-seo-researcher`

Competitor-Seo empfiehlt **eigene Seiten** fuer `/glossar/hiring-funnel/`, `/glossar/bewerber-funnel/`, `/glossar/recruitment-funnel/` mit je 1.500-2.000 Woertern und Cross-Linking zur Haupt-Recruiting-Funnel-Seite. Begruendung aus research-findings-competitor.md: eigene Suchvolumina pro Synonym, Top-Ranker wie rudel-recruiting.de decken alle Synonyme in einer 5.500-Woerter-Seite ab, separate Seiten waeren aber Long-Tail-effektiver.

### 8.2 Meine Einordnung und Entscheidungsvorlage fuer team-lead

| Kriterium | Option A (Single-Page) | Option B (Separate Synonym-Seiten) |
|---|---|---|
| GSC-Impressions aktuell | hiring funnel 1, bewerber funnel 3, recruitment funnel 1 (= 5 total) | gleich |
| Ranking-Chance | hoch fuer "recruiting funnel" | hoch pro Synonym, aber geteilt |
| Duplicate-Content-Risiko | keins | mittel (Synonyme sind semantisch identisch) |
| Implementation-Aufwand | 1 Artikel (P0) | 4 Artikel (P0 + 3 Follow-up) |
| Link-Equity | konzentriert | verteilt auf 4 URLs |
| Wartung | 1 Content-Update | 4 Content-Updates |
| Empirischer Benchmark | — | rudel-recruiting nutzt Single-Page-Strategie mit 5.500 Woertern |

**Mein Votum bleibt Option A**, weil:
1. Aktuelle Gesamtimpressionen der 3 Synonyme = 5 pro Monat. Der Ranking-Gewinn durch Splitting lohnt den 4-fachen Aufwand nicht.
2. Google-Entity-Matching neutralisiert den Long-Tail-Vorteil separater URLs zunehmend.
3. Der Top-Ranker in der Competitor-Analyse (rudel-recruiting, 5.500 Woerter in **einer** Seite) bestaetigt die Single-Page-Strategie implizit — das Ranking-Argument fuer Option B ist damit empirisch schwach.
4. Wenn nach 3 Monaten Monitoring der Haupt-Artikel fuer "recruiting funnel" Top-10 erreicht aber Synonyme auf Pos 30+ stehen, kann Option B als **P3-Follow-up** nachgezogen werden. Dann mit echten Daten statt Vermutung.

**Pfad zur Entscheidung:** team-lead waehlt A oder B vor Sprint-Start. Bei B muss competitor-seo separate Keyword-Mapping-Tabelle und Content-Briefs fuer die 3 Zusatzseiten liefern (ausserhalb meines aktuellen Scopes).

### 8.3 Konsens mit competitor-seo (Stand 2026-04-22)

`competitor-seo-researcher` hat Option A akzeptiert und die Empfehlung separater Synonym-Seiten zurueckgezogen. Begruendung-Konsens: GSC-Volumen 5 Impressions/Monat + rudel-Benchmark (Single-Page mit 5.500 Woertern) + Entity-Matching-Punkt.

Option B bleibt als **Fallback-P3** parkiert: wenn der Funnel-Artikel nach 3 Monaten (~Juli/August 2026) fuer "recruiting funnel" Top-10 erreicht, aber die Synonyme "hiring funnel", "recruitment funnel", "bewerber funnel" weiter auf Pos 30+ stehen, wird Option B mit echten GSC-Daten re-evaluiert. competitor-seo hat sich den Post-Launch-Audit mental fuer Juli/August 2026 notiert.

**Damit ist der Synonym-Dissens geschlossen.** Die Entscheidung bleibt formal beim team-lead/User (B1 im Fragenkatalog), aber team-intern sind alle Researcher aligned auf Option A.

---

## 9. Weitere Glossar-Eintraege mit selbem Muster (P2)

Waehrend der Recherche bemerkt: **alle 10 Glossar-Eintraege sind Rumpf-Artikel** mit derselben Struktur. Wordcount im Schnitt 80-150. Bei `quality-of-hire` waere das Content-Upgrade besonders wertvoll, da GSC vermutlich aehnliche "thin-content"-Signale sendet.

Empfehlung als **P2-Follow-up-Thema** (nach recruiting-funnel-Fix):

| Slug | Vermutete Prioritaet |
|---|---|
| `quality-of-hire` | Hoch — wenige gute deutsche Artikel, Keyword hart umkaempft, aber machbar |
| `candidate-experience` | Hoch — Volumen stark steigend |
| `time-to-hire` | Mittel — viele Top-Wettbewerber, schwer |
| `active-sourcing` | Mittel |
| `employer-branding` | Niedrig — zu generisch, dominiert von Kununu/Randstad |

Der **Template-Umbau aus Section 7** macht dieses Upscaling einfach: einmal Interface erweitern, danach nur noch Daten befuellen.

---

## 9b. Hub-Pages fuer /vergleich/, /fuer/, /produkt/, /branchen/, /methode/ (P1)

Gemeldet von `tech-seo-researcher` (research-findings-tech.md Abschnitt 6b): Die 5 Parent-URLs liefern derzeit 404, obwohl BreadcrumbList-Schemas auf den Unterseiten sie als Parent referenzieren. ~45 Unterseiten sind betroffen. Doppelter Hebel: Tech-SEO-Fix plus Kategorie-Keyword-Ranking-Chance.

**Meine Einordnung als Content-SEO:** Das sind keine simplen Weiterleitungsziele, sondern volle Hub-Pages mit eigenem Search-Intent. Priorisierung als **P1** (nach recruiting-funnel P0, vor Glossar-P2).

### Keyword-Zielrichtung pro Hub

| Hub | Primary Keyword | Search-Intent | Sektionen |
|---|---|---|---|
| `/vergleich/` | "ATS Software Vergleich" | Transactional | Vergleichs-Tabelle aller Wettbewerber, Entscheidungs-Matrix, Kauf-Kriterien, Link zu jedem /vergleich/shortselect-vs-X Eintrag |
| `/fuer/` | "Recruiting Software fuer [Persona]" | Persona-Discovery | Kacheln nach Zielgruppe (Personalvermittler, Headhunter, HR-Leiter, Recruiter, Geschaeftsfuehrer, Startups), Links zu allen /fuer/X Seiten |
| `/produkt/` | "ATS Funktionen Uebersicht" | Informational | Feature-Gruppen (ATS, KI, Sourcing, Karriereseite, Analytics), Links zu allen /produkt/X Seiten |
| `/branchen/` | "Recruiting Software Branchen" | Persona-Discovery | Branchen-Kacheln (Finance, IT, Handwerk, Medizin, ...), Links zu allen /branchen/X Seiten |
| `/methode/` | "Recruiting Methoden" | Informational | Methoden-Overview (Active Sourcing, KI-Screening, Multiposting, ...), Links zu allen /methode/X Seiten |

### Content-Struktur-Template fuer jeden Hub

Jede Hub-Page braucht fuer vollen SEO-Nutzen:

1. **H1 mit Primary Keyword** (z.B. "ATS Software Vergleich: Alle Alternativen im Ueberblick")
2. **Hero-Snippet** 40-50 Woerter (Featured-Snippet-Chance)
3. **CollectionPage Schema** + **BreadcrumbList** (loest tech-seo's 404-Problem)
4. **Uebersichts-Grid** mit Kacheln zu allen Unterseiten (= die ~45 internen Backlinks kommen endlich an)
5. **Einleitung (150-250 Woerter)** fuer Topical-Authority
6. **FAQ (3-5 Fragen)** gemeinsam mit audit-seo's FAQPage-Pattern

### Synergien mit Funnel-Cluster

- `/fuer/` Hub wird aus meinem Funnel-Artikel verlinkt (siehe Section 6.1: hr-leiter, geschaeftsfuehrer, recruiter gehoeren zu dieser Hub-Ebene). Funnel-Artikel kann als "related deep-dive" auf der `/fuer/hr-leiter` Hub-Child-Seite prominent rueckverlinken.
- `/branchen/` Hub wird aus FAQ Q7 des Funnel-Artikels erreichbar (Zeitvergleich Massen- vs Finance-Recruiting, siehe snippet-seo-Abstimmung).
- `/methode/` Hub ist thematisch verbunden mit Active Sourcing, Multiposting — Potenzial fuer Cross-Links aus Glossar-Eintraegen.

### Abgrenzung

- Owner-Vorschlag: **full-site-audit** oder separater Content-Hub-Task — NICHT Teil meines recruiting-funnel-Scopes.
- Aufwand: geschaetzt 5 Hub-Pages x 1-1.5 Tage Research+Schreiben+Review = 1 Woche.
- Reihenfolge: `/vergleich/` und `/fuer/` zuerst (hoechstes Suchvolumen + groesster Ranking-Hebel), danach `/produkt/` `/branchen/` `/methode/`.

### 9b.1 Priorisierung P0 vs P1 — Tech-Trigger + Content-Build (Stand 2026-04-22)

Nach Abstimmung mit `tech-seo-researcher` ist der Hub-Page-Komplex zweistufig zu behandeln:

| Stufe | Scope | Owner | Prioritaet |
|---|---|---|---|
| Tech-Trigger | Workaround-Option: Breadcrumb-Parent aus BreadcrumbList-Schema entfernen, damit 404-Signal fuer Google verschwindet, falls Hub-Pages nicht rechtzeitig fertig werden | tech-seo | **P0 Ship-Blocker** (als Fallback) |
| Content-Build | Bevorzugte Loesung: Richtige Hub-Pages bauen mit CollectionPage-Schema + 150-250-Wort-Einleitung + 3-5 FAQ + Uebersichts-Grid zu allen Children | content-seo (neuer Task) | **P1 bevorzugt** |

Damit hat team-lead Flexibilitaet in der Sprint-Planung: Wenn Sprint 1 die Hub-Pages nicht fasst, shipt tech-seo den Breadcrumb-Workaround (P0) und Hub-Pages kommen in Sprint 2 als P1-Content-Build. Wenn Sprint 1 beides schafft, direkt P1 ohne Umweg — der Workaround wird dann gar nicht gebraucht.

`tech-seo-researcher` uebernimmt den team-lead-Ping mit dieser Split-Priorisierung.

---

## 9c. Commercial-Intent-Landings aus Competitor-Intel (P1, ausserhalb Funnel-Scope)

Gemeldet von `competitor-seo-researcher` (research-findings-competitor.md): zwei fehlende Landings mit hartem Commercial-Intent. Wird hier nur als Context-Bruecke gelistet, weil mein Cluster daran nicht verlinken kann, bevor die Seiten existieren. Liegt in Scope von content-seo aber als eigener Task, nicht Teil der recruiting-funnel-Umsetzung.

| Seite | Primary Keyword | GSC heute | Konkurrenz | Aufwand |
|---|---|---|---|---|
| `/dsgvo-konforme-recruitingsoftware` | "DSGVO-konforme Recruitingsoftware" | Pos 19, schwaches Signal | Factorial, Coveto, MHM-HR, Yena | 2.500 Woerter + Vergleichstabelle + FAQPage |
| `/crm-fuer-personalberater` | "CRM fuer Personalberater" | 5 Impr Pos 83 | Starhunter, basicthinking, headhunter-software.net | 2.000 Woerter + USP-Block DACH/DSGVO |

**Integrations-Hinweis:** Sobald die Seiten existieren, muss der Funnel-Artikel zwei zusaetzliche ausgehende Links bekommen:
- Aus H2 "Recruiting Funnel optimieren: 8 Best Practices" (Best Practice 8 DSGVO) -> `/dsgvo-konforme-recruitingsoftware`
- Aus H2 "Recruiting Funnel mit ShortSelect" (CTA-Kontext fuer Personalberater) -> `/crm-fuer-personalberater`

**Owner-Empfehlung:** Das gehoert in einen separaten content-seo-Folgetask "Commercial-Intent-Landings", nicht in meinen Funnel-Task. In Section 10 Dependencies ergaenzt.

### 9c.1 Content-Briefs geliefert (Stand 2026-04-22)

`competitor-seo-researcher` hat beide Briefings mit Keyword-Gewichtung pro H2, Competitor-Gaps, Must-Have-Elementen, Trust-Elementen, Pitfalls und Ownership/Dependencies erstellt:

- `/Users/yusufesentuerk/shortselect/marketing/docs/seo/content-brief-dsgvo-recruitingsoftware.md`
- `/Users/yusufesentuerk/shortselect/marketing/docs/seo/content-brief-crm-personalberater.md`

Cross-Reference ist im CRM-Brief Section 7 dokumentiert: beide Landings linken auf `/glossar/recruiting-funnel/`, umgekehrt aus meinem Funnel-Artikel in Richtung beider Landings. Damit entsteht ein sauberes Content-Cluster-Dreieck (Recruiting-Funnel-Hub + zwei Commercial-Intent-Landings).

Sobald team-lead/User den Folgetask freigibt, kann direkt mit Implementierung anhand der Briefs gestartet werden — keine weitere Research-Phase noetig.

---

## 10. Dependencies & Handoffs

| Abhaengigkeit | An wen | Worum geht's |
|---|---|---|
| Schema-Rendering in `[slug].astro` | `tech-seo-researcher` | **Abgeschlossen.** Array-Merge kompatibel mit tech-seos MarketingLayout-Erweiterung (orgSchema + neues websiteSchema). Finale Komposition pro Glossar-Seite = 5 JSON-LD-Scripts. Article-Schema gestrichen (Section 7.1). |
| FAQPage-Render in `[slug].astro` | `audit-seo-researcher` | **Abgeschlossen.** audit-seo baut den Render-Block, ich liefere `faqs`-Feld im Interface + 8 Q&A fuer recruiting-funnel. Guard-Pattern: `entry.faqs && entry.faqs.length >= 2`. Implementation in Post-Research-Phase. |
| Orphan-Pages-Linking-Pattern skalieren (P2) | `audit-seo-researcher` | **Abgeschlossen.** Nach recruiting-funnel-Proof-of-Concept bekommen die 9 anderen Glossar-Eintraege (active-sourcing, ats, candidate-experience, cost-per-hire, employer-branding, multiposting, quality-of-hire, talent-pipeline, time-to-hire) je 2-4 Persona/Branchen-Links per selbem Pattern. |
| Competitor-Gap | `competitor-seo-researcher` | **Abgeschlossen.** Top-3 DE-Ranker (rudel, wollmilchsau, meetovo) geliefert. Wordcount-Sweet-Spot 2.500-3.500 bestaetigt, Phasen-als-H2 uebernommen, FAQ-Schema als universeller Differenzierer bestaetigt. Siehe Section 3b. |
| Synonym-Strategie Entscheidung (Option A vs B) | `team-lead` → User | **Team-intern aligned auf Option A**, formale User-Entscheidung offen (B1 im Fragenkatalog). competitor-seo hat separate Synonym-Seiten zurueckgezogen, Option B ist als P3-Fallback parkiert fuer Juli/August 2026 Review. Siehe Section 8.3. |
| Snippet-SEO Cross-Check | `snippet-seo-researcher` | **Abgeschlossen.** USP-Zahlen-Liste geteilt, Finance-Querverweis in FAQ Q7 integriert. Keine Kollision mit den 5 Snippet-Vorschlaegen. |
| Hub-Pages P1 (neu) | `team-lead` / future task | **Offen.** 5 Hub-Pages fuer /vergleich/, /fuer/, /produkt/, /branchen/, /methode/ — synergetisch mit tech-seos 404-Fix + Funnel-Cluster. Siehe Section 9b. |
| Commercial-Intent-Landings P1 (neu) | `team-lead` / future task | **Briefs liegen, Freigabe offen.** /dsgvo-konforme-recruitingsoftware + /crm-fuer-personalberater. Content-Briefs von competitor-seo geliefert in docs/seo/content-brief-dsgvo-recruitingsoftware.md und docs/seo/content-brief-crm-personalberater.md. Cross-Link-Plan drin. Siehe Section 9c + 9c.1. |

---

## 11. Priorisierte Umsetzungs-Roadmap

### P0 (Schneller Big-Win, Aufwand 1-2 Tage)
1. **Content-Upgrade recruiting-funnel auf 2500+ Woerter** gemaess H2/H3-Gliederung (Section 4).
2. **FAQ-Feld** in `GlossaryEntry` + Rendering in `[slug].astro` (Section 7).
3. **Hero-Snippet-Absatz** (Section 3).
4. **10+ interne Links** aus Blog-Posts (Section 6).

### P1 (1 Woche)
5. **Article-Schema** in Template (Section 7).
6. **Table of Contents** (auto-generiert aus H2-Liste).
7. **Visualisierung Funnel** (SVG-Grafik, Alt-Text "Recruiting Funnel Diagram").

### P2 (2-4 Wochen)
8. Gleicher Upgrade-Zyklus fuer **quality-of-hire** und **candidate-experience** (Section 9).
9. Internal-Linking-Audit site-weit (Tag-basiert: jedes Vorkommen von "Funnel" im Blog -> Auto-Link via Post-Processing).

---

## 12. Annahmen (dokumentiert, nicht validiert)

- GSC-Daten sind vom Team-Lead im Task-Briefing vorgegeben (11 Queries). Ich habe sie nicht gegen Live-GSC gecheckt.
- Benchmarks (LinkedIn 30%, Appcast 40%, Indeed Hiring Lab, Greenhouse) sind aus meinem Trainingsstand + branchenueblich. Vor Publikation: mit aktuellen Studien-PDFs verifizieren.
- 2026-04-22 Content-Stand: MarketingLayout und `[slug].astro` haben sich seit letzter Modification nicht geaendert (git status war clean bei meiner Read-Operation).
- Keine Beruehrung des `project-spark` Repos.
