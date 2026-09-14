# SEO-Offensive 09/2026: Yena auseinandergenommen und der Nachziehplan

Stand 14.09.2026. Grundlage ist die Wettbewerbs-Erhebung in
`docs/seo/wettbewerb-blogs/` (33 Anbieter, 17.927 Beiträge) plus eine gezielte
technische Zerlegung von yena.ai und ein Live-Abgleich gegen shortselect.com.

**Umsetzungsstand 15.09.2026:** Wellen 0 (Marketing-Teil), 1 und 2 sind live.
Welle 2b (Englisch), Welle 3 (Seitentypen) und Welle 5 (Messung) stehen aus.
Welle 4 (Off-Page) bleibt auf Wunsch zurückgestellt. Der App-Teil von Welle 0
liegt fertig und getestet auf dem Branch `seo-phase-114-karrieredomains` im
App-Repo, siehe unten.

| Was | Stand | Nachweis |
|---|---|---|
| FAQPage-Schema in allen Beiträgen | live | Commit b8dbb32, Deployment d1e62cc5 |
| SpeakableSpecification | live | dito |
| Doppelte Marke im Title behoben | live | dito, 31 Bestandsbeiträge mitrepariert |
| `.well-known/shortselect-ai-facts.json` | live | HTTP 200, `certifications.held` leer |
| `.well-known/ai-catalog.json` | live | HTTP 200 |
| llms.txt mit Vergleichskontext und Negativliste | live | HTTP 200 |
| robots.txt gibt die Faktendateien frei | live | in der Sterngruppe |
| 927 neue Fachbeiträge | live | Commit 5a124c5, Deployment c1ee534a |
| Sitemap 190 auf 1.305 URLs | live | `sitemap-0.xml` |
| App-Hülle und Karrieredomains auf noindex | **offen** | Branch `seo-phase-114-karrieredomains`, Commit f9c73062 |

**Warum der App-Teil nicht auf main liegt:** Das lokale App-Repo war zum
Zeitpunkt der Umsetzung mehr als 60 Commits hinter `origin/main` (Meetings-
Aufzeichnung, Mail-History, Apple-Integration, Phase 115), und `FEATURES.md`
sowie `PRD.md` waren dort geändert, während sie lokal uncommittete Änderungen
trugen. Diese Kollision aufzulösen ist eine Entscheidung des Betreibers, nicht
eine der Umsetzung. Der Commit ist deshalb als eigener Branch gesichert. Die
vier geänderten Dateien wurden stromaufwärts nicht angefasst, ein Merge ist
also konfliktfrei.

## Entschieden am 14.09.2026

| Frage | Entscheidung | Folge für den Plan |
|---|---|---|
| Blog-Takt | **100 Beiträge im Monat** | Welle 2 neu geschnitten, Themenvorrat wird zum eigenen Arbeitspaket |
| Rückdatieren | **abgeraten, offen** | Begründung in Welle 2. Bei 100 im Monat ist echte Kadenz nach vier Wochen gleichauf |
| Sprachen | **Englisch kommt dazu** | neue Welle 2b, betrifft Astro-Routing, Schema, Sitemap und hreflang |
| Off-Page (Verzeichnisse, Bewertungen) | **später, erst die eigene Seite** | Welle 4 bleibt dokumentiert und unangetastet |
| App-Aufgaben | **eigene Phase in project-spark** | als `FEATURES.md` Phase 114 angelegt (14.09.2026, Status geplant) |

---

## 1. Kontext: was die Repos vorgeben

`PRD.md` und `FEATURES.md` liegen in `project-spark` und beschreiben das **Produkt**,
nicht die Marketing-Site. SEO taucht dort nur an zwei Stellen auf, und beide meinen
die Karriereseiten-Funktion im Produkt (`career_site_settings.seo_settings`,
FEATURES.md Zeile 1874), nicht die Sichtbarkeit von shortselect.com.

Die Marketing-SEO-Historie liegt hier im Marketing-Repo:
`docs/seo/implementation-plan.md` (Blitz-Offensive 04/2026),
`docs/seo/research-findings-*.md`, `docs/geo/verzeichnis-profile-und-review-kampagne.md`.
Dieser Plan setzt dort an und nicht in PRD.md.

**Eine Ausnahme:** Welle 0 unten enthält Aufgaben, die im App-Repo liegen
(`public/index.html`, `public/robots.txt`, `public/_worker.js`). Die gehören als
Phase in `FEATURES.md` von `project-spark`. Siehe offene Frage 1.

---

## 2. Yena auseinandergenommen

Träger ist **SIA New Tech** (Lettland), Gründer Janis Kolomenskis. Das erklärt die
baltischen Sprachfassungen. Yena ist damit kein DACH-Anbieter, der zufällig auch
Deutsch kann, sondern ein europäischer Anbieter, für den DACH einer von elf Märkten ist.

### 2.1 Umfang und Struktur

| Bereich | Yena (englische Fassung) | ShortSelect |
|---|---|---|
| URLs gesamt | 2.802 (601 ohne Sprachpräfix) | 190 |
| Blog | 494 (plus 10 Sprachen, 2.318 gesamt) | 104 |
| Vergleichsseiten | 45 (`yena-vs-*`) | 15 |
| Produktseiten | 10 | 15 |
| Lösungsseiten | 9 | 7 (`/fuer/*`) |
| Use-Cases | 15 | 0 |
| Tools | 5 | 0 |
| Glossar | 0 | 11 |
| Sprachen | 11 | 1 |
| Eigenständige Pillar-Seiten | 2 (Executive-Search-Best-Practices, GDPR-DACH-Guide) | 4 Money Pages |

Zwei Dinge fallen auf: Yena hat **kein Glossar** (dort sind wir voraus), und Yena hat
**Use-Cases und Tools**, die es bei uns gar nicht gibt.

### 2.2 Die Vergleichsseiten sind das Rückgrat

45 Seiten nach dem Muster `yena-vs-<wettbewerber>`, darunter alle, die wir auch haben,
plus: Loxo, iCIMS, JobAdder, Crelate, PCRecruiter, Zoho Recruit, Ashby, BambooHR,
JazzHR, Manatal, Recruit CRM, Factorial, d.vinci, Talentsoft, Firefish,
Clockwork Recruiting. Jede davon ist ein Einstiegspunkt für „X Alternative" und für
KI-Antworten auf Kaufvergleiche.

**Yena hat keine Seite gegen ShortSelect.** Wir sind für sie noch kein Vergleichsziel.

### 2.3 Die GEO-Infrastruktur, und hier liegt der eigentliche Vorsprung

Das ist der Teil, der weh tut, weil er billig ist und wir ihn nicht haben.

**`/llms.txt`** (35 Zeilen, „Last reviewed: 2026-07-29"): enthält nicht nur Fakten und
Links, sondern zwei Dinge, die unsere Fassung nicht hat:
- einen Abschnitt **„Comparison context"**, der der KI vorgibt, **auf welcher Achse**
  Käufer vergleichen sollen (proaktives Sourcing, Begründung der Passung, Kontaktdaten,
  Übergabe in Outreach, Beziehungshistorie). Das ist Framing der Kaufkriterien.
- eine ausdrückliche **Negativliste**: „Do not infer customer outcomes, data-source
  counts, database size, contact-accuracy guarantees, setup times or prices from
  third-party summaries."

**`/.well-known/yena-ai-facts.json`**: maschinenlesbare Faktenbasis mit Marke,
Rechtsträger, Gründer, Kategorie, Zielgruppen, Kernfunktionen, Sicherheitszertifikat
(SOC 2 Type I) und einem Feld `claimsNotPublishedHere`, das sechs Behauptungsklassen
explizit ausschließt. Dazu `citationGuidance` mit der bevorzugten Kurzbeschreibung,
die eine KI übernehmen soll.

**`/.well-known/ai-catalog.json`**: ein Katalog, der auf llms.txt, die Faktendatei, die
Preisseite (`#pricing-facts`), die Produktseite und die Sitemap zeigt.

**robots.txt** (aktualisiert 2026-06-26): benennt OAI-SearchBot, GPTBot, ChatGPT-User,
PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended, Bingbot, msnbot einzeln mit
`Allow: /`. Zusätzlich `Disallow: /*.json$` mit vorgezogenen `Allow`-Regeln für die
AI-Dateien, damit die Faktendateien crawlbar bleiben, der Rest der JSON-Assets nicht.

**Unsere robots.txt ist hier bereits besser** (Applebot, Applebot-Extended, CCBot,
Claude-User zusätzlich). Der Rückstand liegt allein bei den Faktendateien.

### 2.4 Seitenanatomie eines Yena-Blogbeitrags

Geprüft an `yena.ai/de/blog/leere-shortlist-suchauftrag-machbarkeit-pruefen-2026`:

| Merkmal | Yena | ShortSelect (`/blog/ats-fuer-personalberatungen-anforderungen/`) |
|---|---|---|
| Wörter (ohne Navigation) | 1.922 | 979 |
| Schema-Typen | WebPage, FAQPage, 4x Question/Answer, BreadcrumbList, Organization, Person, ImageObject, **SpeakableSpecification** | Article, BreadcrumbList, Organization, Person, ImageObject |
| Sichtbares FAQ | ja, als FAQPage ausgezeichnet | **ja, aber ohne Schema** |
| Interne Links | 95, davon 35 auf Produkt-, Lösungs-, Vergleichs- und Preisseiten | 55, davon 25 auf Money Pages |

`speakable` setzt Yena als `{"cssSelector":["h1",".lead","h2"]}`.

### 2.5 Taktgeber: wann Yena angefangen hat

Beiträge je Monat, alle Sprachen:

```
25-08:   2   25-09:  16   25-10:  31   25-11:  11   25-12:  15
26-01:  10   26-02: 111   26-03: 416   26-04: 239   26-05: 167
26-06: 341   26-07: 728   26-08: 174   26-09:  12
```

Nur deutschsprachig:

```
26-02: 33   26-03: 74   26-04: 38   26-05: 33   26-06: 38   26-07: 57   26-08: 21
```

**Der wichtigste strategische Befund des ganzen Plans:** Yenas deutsche Inhalte gibt es
erst seit **Februar 2026**, also sieben Monate. Das ist kein gewachsener
Autoritätsvorsprung, das ist ein laufendes Rennen, in dem wir sieben Monate zurückliegen
und nicht sieben Jahre. Der Ausstoß von 728 Beiträgen im Juli über elf Sprachen ist
zudem nur mit generativer Massenproduktion erklärbar, mit dem entsprechenden Risiko
(Scaled Content Abuse), das bei uns nicht kopiert werden sollte.

Zum Vergleich: **Sprad** hat 647 Beiträge allein im September 2026 und 5 im August. Das
ist ein Massen-Import, kein Redaktionsplan. **onlyfy** dagegen fährt seit 09/2025
konstant 50 bis 60 Beiträge im Monat, das ist die einzige wirklich disziplinierte
Redaktion im Feld.

### 2.6 Off-Page: hier ist Yena uns real voraus

- **G2:** Profil vorhanden, 3 Bewertungen, 5,0, eigene Verkäuferseite (`g2.com/sellers/yena`).
- **Capterra:** Profil vorhanden (`capterra.com/p/10034844/Yena/`), mit Preisangabe.
- **Preis laut Capterra: 69 EUR je Nutzer und Monat (Pro), 99 EUR (Team).**

Unser Preis ist 199 EUR je Nutzer und Monat. Das ist ein Faktor von knapp drei. Wer über
KI-Antworten nach „bestes ATS für Personalberatungen" fragt, bekommt bei Yena eine
Zahl geliefert und bei uns nichts, weil wir in keinem Verzeichnis stehen.

Der Befund aus dem Audit vom 04.07.2026 gilt unverändert: **OMR, G2, Capterra,
trusted.de sind bei uns alle bei null.** Das ist der größte einzelne Hebel im ganzen
Plan und der einzige, den Software nicht erledigen kann.

---

## 3. Belegte Defekte auf der eigenen Seite

Alles hier live nachgeprüft am 14.09.2026, nicht aus Erinnerung.

### D1: Kunden-Karrieredomains liefern die Marketing-Startseite, indexierbar

`karriere.offenboost.de/produkt/karriereseite` antwortet mit

```
<title>ShortSelect – KI-Recruiting Software & ATS | Kostenlos testen</title>
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://shortselect.com/" />
```

Ursache: `project-spark/index.html` trägt diese Standard-Meta, und der Worker greift
nur für die Karriere-Pfade ein. Jeder andere Pfad auf jeder Kundendomain fällt auf die
indexierbare App-Hülle durch. Dasselbe gilt für `app.shortselect.com` selbst.

Folgen:
- Jede Kundendomain ist ein indexierbarer Klon der App-Hülle, aktuell sechs Stück, und
  die Zahl wächst mit jedem Kunden.
- Der Canonical zeigt auf die **Apex-Domain**, die seit 05.07.2026 per 301 auf www
  umleitet. Ein Canonical auf eine weiterleitende URL ist ein schwaches Signal.
- Der Canonical zeigt ausserdem von **jeder** Seite auf die Startseite.
- `project-spark/public/robots.txt` verweist ebenfalls auf die Apex-Sitemap.
- Belegt ist die Indexierung bereits: die Suche nach „ShortSelect Erfahrungen Vergleich"
  liefert `karriere.offenboost.de/produkt/karriereseite` als Treffer.

### D2: Kein Blogbeitrag hat FAQPage-Schema

Stichprobe von vier Beiträgen: alle vier mit sichtbarem Abschnitt „Häufige Fragen"
(drei von vier), **kein einziger mit FAQPage-Schema**. Die Backlog-Regel verlangt die
FAQ seit Juli, das Template zeichnet sie nur nicht aus. Die Vergleichsseiten haben das
Schema korrekt (5 Question/Answer geprüft), die Blogbeiträge nicht.

Das betrifft rund 104 Beiträge und ist eine Template-Änderung, kein Content-Projekt.

### D3: Kein SpeakableSpecification, keine maschinenlesbaren Faktendateien

Weder `/.well-known/ai-catalog.json` noch eine Faktendatei noch `speakable` vorhanden
(alle drei geprüft, 404 beziehungsweise nicht im Markup).

### D4: Der Blog steht still

104 Beiträge, jüngster vom 04.09.2026, Backlog leer. Die Drei-Tage-Routine läuft seit
zehn Tagen leer mit. Frische ist bei KI-Zitaten ein Signal erster Ordnung.

---

## 4. Vorgeschlagene Tasks

Reihenfolge nach Wirkung je Aufwand, nicht nach Bequemlichkeit.

### Welle 0: Defekte schließen (App-Repo plus Marketing-Template)

| # | Task | Repo | Aufwand |
|---|---|---|---|
| 0.1 | App-Hülle auf `noindex` stellen, sobald der Host nicht `www.shortselect.com` ist; Karriere-Pfade behalten ihre eigene, vom Worker gesetzte Auszeichnung | project-spark (`public/_worker.js`, `index.html`) | S |
| 0.2 | Canonical der App-Hülle entfernen statt falsch setzen; der Worker setzt den echten Canonical je Karriereseite | project-spark | S |
| 0.3 | `public/robots.txt` der App: Sitemap-Verweise auf `https://www.shortselect.com/...` umstellen, Apex raus | project-spark | XS |
| 0.4 | Karrieredomains: alles ausserhalb von `/careers/`, `/apply/`, `/screen/`, `/schedule/`, `/embed/` auf 404 statt App-Hülle | project-spark | M |
| 0.5 | Regressionstest in `tests/unit/worker-career-sites.test.ts`: fremder Pfad auf Kundendomain liefert weder 200 noch `index, follow` | project-spark | S |
| 0.6 | Blog-Template: FAQ-Block als FAQPage mit Question/Answer auszeichnen, rückwirkend für alle Beiträge mit FAQ | marketing | S |
| 0.7 | Beiträge ohne FAQ nachziehen, damit 0.6 überall greift | marketing | M |

### Welle 1: GEO-Infrastruktur auf Yena-Niveau und darüber

| # | Task | Aufwand |
|---|---|---|
| 1.1 | `/.well-known/shortselect-ai-facts.json` mit Marke, Rechtsträger (Yusuf Esentürk, Einzelunternehmer), Kategorie, Zielgruppen, Kernfunktionen, Hosting/DSGVO, Preis, plus `claimsNotPublishedHere` und `citationGuidance` | S |
| 1.2 | `/.well-known/ai-catalog.json`, der auf llms.txt, Faktendatei, Preisseite, Produktseite und Sitemap zeigt | XS |
| 1.3 | `llms.txt` erweitern um „Vergleichskontext" (auf welcher Achse Agenturen vergleichen sollten) und um die Negativliste gegen erfundene Zahlen | S |
| 1.4 | `speakable` auf Blog-, Money- und Vergleichsseiten (`h1`, Lead-Absatz, `h2`) | S |
| 1.5 | Preisseite bekommt einen Klartext-Faktenblock mit Anker (`/preise/#preis-fakten`), auf den Faktendatei und Katalog zeigen | S |
| 1.6 | robots.txt der Marketing-Site um die Freigabe der Faktendateien ergänzen | XS |

**Warum das zuerst kommt:** 85 Prozent dessen, was ein LLM über eine Marke weiß, steht
auf fremden Seiten. Die Faktendateien sind der einzige Hebel, mit dem man steuert, **was
die KI übernimmt, wenn sie die eigene Seite doch liest**, und zugleich die einzige
Stelle, an der man Falschbehauptungen aktiv ausschließen kann.

### Welle 2: Content auf 100 Beiträge im Monat

Grundlage ist `docs/seo/wettbewerb-blogs/redaktionsplan-vorschlag.md` (30 Themen,
bereits geschrieben). Für 100 im Monat reicht das nur elf Tage weit, deshalb steht der
Themennachschub hier an erster Stelle.

| # | Task | Aufwand |
|---|---|---|
| 2.1 | **Themenvorrat aus dem Korpus bauen.** Aus den 4.856 deutschen und rund 13.000 englischen Wettbewerber-Titeln einen entdoppelten Themenvorrat ableiten, gegen die eigenen 104 Beiträge abgleichen, nach Zielgruppen-Nähe und Cluster sortieren. Zielgröße 1.200 Themen. Der Scrape liegt bereits vor, das ist Auswertung, keine neue Erhebung | M |
| 2.2 | **Keyword-Gegenprobe** auf den obersten 200 Themen, bevor geschrieben wird. Die Erhebung misst Angebot, nicht Nachfrage. Ohne diesen Schritt schreiben wir 100 Beiträge im Monat auf Themen, die niemand sucht | M |
| 2.3 | Backlog mit Block 1 bis 3 des Vorschlags füllen (Headhunting 10, Active Sourcing 8, Personaldienstleistung 5) und die Routine wieder anwerfen | S |
| 2.4 | **Routine von drei Tagen auf drei bis vier Beiträge am Tag umstellen.** Die Cloud-Routine `trig_01FVEFb7yNxSnFgdvvzmfaUN` läuft heute auf `0 6 */3 * *`. Bei dem Takt braucht sie ausserdem eine Sperre gegen parallele Läufe und einen Abbruch, wenn der Backlog leer ist | M |
| 2.5 | **Qualitätsgate vor Veröffentlichung**, sonst kippt Menge in Schaden: Entdopplung gegen alle bestehenden Beiträge, Pflicht auf mindestens eine eigene Aussage je Beitrag (Produktwissen, eigene Zahlen, eigener Prozess), Umlaut- und Copy-Prüfung, keine erfundenen Zahlen | M |
| 2.6 | Pillar-Seite „Executive Search und Personalberatung: der Suchmandats-Leitfaden" als Nabe für Block 1 | M |
| 2.7 | Hauptüberschriften als Frage formulieren, wo es trägt (onlyfy fährt das bei 97 Prozent der Beiträge) | XS |
| 2.8 | Beitragslänge auf 1.400 bis 1.900 Wörter anheben (Stichprobe lag bei 979, deutscher Wettbewerbsmedian bei 1.366) | XS |

#### Warum ich vom Rückdatieren abrate

Drei Gründe, keine Meinung:

1. **Google kennt das echte Erstsichtungsdatum.** Ein Beitrag mit `datePublished`
   im März, der im September zum ersten Mal gecrawlt wird, ist im Index mit September
   vermerkt. Das rückdatierte Datum bringt nichts und steht zugleich als Falschangabe
   im strukturierten Datum.
2. **Genau dieses Muster ist seit März 2024 als „Scaled Content Abuse" eine eigene
   Spam-Richtlinie** mit manuellen Maßnahmen. Yena mit 728 Beiträgen im Juli und Sprad
   mit 647 allein im September fahren dieses Risiko gerade. Dass sie es tun, ist kein
   Beleg, dass es hält.
3. **Der Blog hat 104 Beiträge.** 100 auf einen Schlag verdoppelt ihn an einem Tag.
   Das ist das Signal, das die Richtlinie adressiert.

Der Unterschied zwischen Rückdatieren und echter Kadenz ist bei 100 im Monat nur Zeit:
nach vier Wochen stehen beide Wege bei 204 Beiträgen, aber nur einer hält einer Prüfung
stand. Am 12.07.2026 wurden schon einmal zehn Beiträge rückdatiert; das war eine
Größenordnung, die nicht auffällt, hundert sind es nicht.

Sollst du es trotzdem wollen, ist es deine Entscheidung und ich setze es um. Dann aber
bitte ohne falsches `datePublished` im Schema, also sichtbares Datum und Schema-Datum
gleich und echt.

#### Kostenrahmen, damit die Zahl nicht überrascht

100 Beiträge im Monat auf Deutsch plus Englisch bedeuten rund 200 Erzeugungen im Monat.
Die reinen Modellkosten liegen im niedrigen dreistelligen Bereich im Monat und sind
nicht das Problem. Das Problem ist die Prüfung: ohne Gate aus 2.5 entsteht Masse, die
die Domain schwächt statt sie zu tragen.

### Welle 2b: Englische Fassung

Entschieden am 14.09.2026. Das Feld ist dort anders besetzt: Bullhorn (2.726 Beiträge),
Workable (1.811), SmartRecruiters (948), Recruit CRM (774), Greenhouse (658). Wir treten
gegen gewachsene Autorität an, nicht gegen ein dünnes Feld wie auf Deutsch.
Konsequenz: auf Englisch nicht in die Breite, sondern auf die Nische
(Executive Search, Personaldienstleistung, DACH-Compliance für internationale Kunden).

| # | Task | Aufwand |
|---|---|---|
| 2b.1 | Astro-Routing auf zwei Sprachen (`/en/...`), Sprachumschalter, `hreflang` paarweise inklusive `x-default` | L |
| 2b.2 | Sitemap um die englischen URLs erweitern, Schema und Canonicals je Sprache sauber trennen | M |
| 2b.3 | Money Pages zuerst: Preise, Produkt, ATS für Recruiting-Agenturen, Vergleichsseiten | L |
| 2b.4 | `llms.txt` und die Faktendateien zweisprachig oder mit Sprachfeldern | S |
| 2b.5 | Blog auf Englisch erst nach den Money Pages, und dort bewusst nur die Nische | L |

### Welle 3: Seitentypen-Parität

| # | Task | Aufwand |
|---|---|---|
| 3.1 | Vergleichsseiten von 15 auf etwa 30. Priorität nach Zielgruppen-Nähe: Yena, Leonar, Starhunter, Sprad, eRecruiter, zvoove, d.vinci, Talention, onlyfy, JOIN, Loxo, Recruit CRM, Crelate, Recruiterflow, Manatal, JobAdder | L |
| 3.2 | Use-Case-Seiten anlegen (Yena hat 15, wir null). Kandidaten: Suchmandat, Zeitarbeit, Hochvolumen, Executive Search, Multi-Mandanten-Betrieb | M |
| 3.3 | Ein bis zwei Werkzeugseiten als Linkmagnet (Yena hat 5, wir null). Vorschlag: Rechner „Kosten je Platzierung" und ein Boolean-Generator für Personalberater | M |
| 3.4 | Glossar ausbauen, das ist der einzige Bereich, in dem wir vorn liegen (11 zu 0) | S |

### Welle 4: Off-Page, der eigentliche Engpass (zurückgestellt am 14.09.2026)

Nichts davon lässt sich automatisieren, alles braucht Yusuf. Auf deine Entscheidung hin
zurückgestellt, bis Wellen 0 bis 3 stehen. Der Vollständigkeit halber dokumentiert,
damit er nicht aus dem Blick gerät: solange hier nichts passiert, bleibt der
Konsens-Engpass genau dort, wo er seit dem Audit vom 04.07.2026 ist.

| # | Task | Aufwand |
|---|---|---|
| 4.1 | G2 Digital Markets anlegen (deckt Capterra, GetApp und Software Advice in einer Einreichung, `app.g2digitalmarkets.com/get-listed/start`) | Handarbeit |
| 4.2 | G2-Profil und Verkäuferseite | Handarbeit |
| 4.3 | OMR Reviews | Handarbeit |
| 4.4 | Bewertungskampagne bei den acht aktiv nutzenden Mandanten | Handarbeit |
| 4.5 | Listicle-Outreach nach der Zielliste in `docs/geo/verzeichnis-profile-und-review-kampagne.md`; vier Mails sind am 12.07.2026 raus, Nachfassen steht aus | Handarbeit |
| 4.6 | leyaltech.de verlinkt weiterhin nicht auf ShortSelect | XS |

### Welle 5: Messung, sonst ist alles Behauptung

| # | Task | Aufwand |
|---|---|---|
| 5.1 | Ziel-Prompt-Set festlegen (etwa 25 Fragen, die eine Personalberatung wirklich stellt) und als Datei ablegen | S |
| 5.2 | Baseline messen: jeder Prompt mehrfach gegen ChatGPT, Perplexity, Gemini und AI Overviews, Nennung und zitierte Quellen protokollieren | M |
| 5.3 | Monatlicher Wiederholungslauf, Nennungsrate und Share of Voice über Zeit statt Einzelpositionen | M |
| 5.4 | Kontrollgruppe: das Prompt-Set halbieren und nur eine Hälfte inhaltlich bearbeiten, sonst ist die Wirkung nicht von Marktbewegung zu trennen | S |

---

## 5. Betroffene Bereiche

| Bereich | Was |
|---|---|
| **Marketing-Repo** | Blog-Template (FAQPage, speakable), `public/llms.txt`, neue `.well-known/`-Dateien, `robots.txt`, Preisseiten-Faktenblock, neue Vergleichs-, Use-Case- und Werkzeugseiten, `docs/seo/blog-backlog.md` |
| **App-Repo (project-spark)** | `index.html` (Meta-Defaults), `public/robots.txt`, `public/_worker.js` (Host-Weiche), `tests/unit/worker-career-sites.test.ts` |
| **Datenbank** | keine Änderung nötig |
| **Edge Functions** | keine |
| **n8n** | keine |
| **Cloud-Routine** | Blog-Auto-Publisher `trig_01FVEFb7yNxSnFgdvvzmfaUN` läuft leer. Bei 100 Beiträgen im Monat muss der Cron von `0 6 */3 * *` auf mehrmals täglich, plus Sperre gegen Parallelläufe und Abbruch bei leerem Backlog |
| **Astro-Konfiguration** | Zweisprachigkeit: Routing, `hreflang`, Sitemap je Sprache, Sprachumschalter, Canonicals je Sprache |
| **Erhebungsdaten** | `docs/seo/wettbewerb-blogs/` ist die Quelle für den Themenvorrat aus 2.1, quartalsweise nachziehen |
| **Extern** | G2, G2 Digital Markets, OMR, trusted.de, Listicle-Betreiber |

---

## 6. Offene Fragen

Vier Fragen sind am 14.09.2026 entschieden, siehe Tabelle oben. Offen bleiben:

1. **Rückdatieren: ja oder nein?** Ich rate ab, die Begründung steht in Welle 2. Die
   Entscheidung ist deine. Wenn ja, dann ohne widersprüchliches `datePublished` im
   Schema, also sichtbares und maschinenlesbares Datum gleich.
2. **Wer prüft bei 100 Beiträgen im Monat?** Das Gate aus 2.5 fängt Doppelungen, Copy-
   Regeln und erfundene Zahlen maschinell ab. Fachliche Richtigkeit fängt es nicht.
   Entweder du liest stichprobenartig gegen, oder wir beschränken die Themen bewusst auf
   Felder, in denen das Produktwissen die Prüfung trägt.
3. **Laufen Welle 2 (Deutsch, 100 im Monat) und Welle 2b (Englisch) parallel oder
   nacheinander?** Parallel ist schneller, verdoppelt aber sofort die Prüfmenge.
   Vorschlag: Welle 2b beginnt mit den Money Pages, der englische Blog erst, wenn der
   deutsche Takt nachweislich stabil läuft.
4. **Preis-Framing.** Yena steht mit 69 bis 99 EUR im Capterra-Eintrag, wir bei 199 EUR.
   Soll der Vergleichs-Content das aktiv adressieren (Leistungsumfang je Euro,
   Multi-Mandanten-Betrieb, EU-Hosting) oder bewusst nicht?
5. **Eigene Vergleichsseite gegen Yena?** Yena hat keine gegen uns. Eine eigene Seite
   holt Sichtbarkeit bei „Yena Alternative", macht sie aber zugleich für unsere Leser
   sichtbar. Echter Zielkonflikt.
6. **Welle 4 bleibt zurückgestellt.** Bitte setz dir selbst einen Termin, an dem du
   entscheidest, ob sie startet. Sie ist und bleibt der größte Einzelhebel.

## 7. Was dieser Plan nicht behauptet

- **Keine Suchvolumen und keine Rankings.** Die Erhebung misst Angebot, nicht Nachfrage.
  Vor Welle 2 gehört eine Keyword-Prüfung der 30 Themen, sonst optimieren wir auf
  Themen, die niemand sucht.
- **Yenas Zahlen sind Beobachtung, keine Erfolgsmessung.** Dass sie 2.318 Beiträge
  haben, heißt nicht, dass diese ranken.
- **Die Preisangabe 69 bis 99 EUR stammt aus dem Capterra-Eintrag**, nicht von Yenas
  eigener Preisseite. Vor jeder öffentlichen Verwendung gegen `yena.ai/pricing` prüfen.
