# Wettbewerbs-Content-Analyse: ATS- und Recruiting-Software-Blogs

Stand 14.09.2026. Angefragt wurden 34 Anbieter, 33 davon haben Daten geliefert
(Personio blockt vollständig). Ergebnis: 17.927 auswertbare Beiträge, davon 4.856 auf
Deutsch. Gegenübergestellt sind die 96 eigenen Blogbeiträge auf www.shortselect.com.

## Warum das gemacht wurde

Der Blog-Backlog in `docs/seo/blog-backlog.md` ist leer: 30 Themen abgearbeitet, 0 offen.
Der jüngste eigene Beitrag datiert auf den 04.09.2026, die Drei-Tage-Routine hat also
seit zehn Tagen nichts mehr zu veröffentlichen. Diese Erhebung liefert die Grundlage,
um den Backlog nicht aus dem Bauch, sondern aus der belegten Themenlage neu zu füllen.

## Methode

1. **Artikel-URLs sammeln.** Je Anbieter über robots.txt und Sitemap-Index, bei Anbietern
   ohne Sitemap über den RSS-Feed mit Seiten-Parameter (onlyfy) oder über die
   Übersichtsseite (Starhunter). Vincere sitzt hinter einer Cloudflare-Challenge, dort kam
   die URL-Liste über einen Text-Proxy und die Titel über den Exa-Index.
2. **Bereinigen.** Sprachvarianten derselben URL zusammengeführt (bei DACH-Anbietern
   gewinnt die deutsche Fassung), Tag-, Kategorie-, Autoren-, Archiv- und
   Danke-Seiten entfernt. 21.525 Roh-URLs wurden so zu 18.010 Artikel-Kandidaten.
3. **Metadaten je Beitrag holen.** Titel, Meta-Description, H1, H2-Gliederung,
   Veröffentlichungsdatum und Wortzahl. Höchstens zwei gleichzeitige Anfragen je Domain.
4. **Auswerten.** Anbieter-Profile, 28 Themen-Cluster über Muster in Titel, Slug und
   Beschreibung, N-Gramme aus deutschen Titeln, Abgleich gegen die eigenen 96 Beiträge.

Werkzeuge liegen in `tools/`, der Lauf ist wiederholbar (siehe unten).

## Was diese Erhebung NICHT ist

Ehrlich gesagt, damit niemand die Zahlen überdehnt:

- **Kein Suchvolumen, keine Rankings.** Gemessen wurde Angebot, nicht Nachfrage und nicht
  Erfolg. Dass ein Anbieter ein Thema 80 mal bespielt, heißt nicht, dass es Traffic bringt.
- **Personio fehlt vollständig.** Deren Seite antwortet auf alles mit einem
  Vercel-Sicherheits-Check (HTTP 429), auch über Proxy. Als Lücke stehen gelassen.
- **Bei vier Anbietern ließ sich kein Datum auslesen** (Manatal 912, Teamtailor 215,
  Helix 145, Starhunter 10 Beiträge). Deren Frische ist unbekannt, nicht etwa null.
- **Die Sprach-Erkennung ist eine Heuristik.** Titel ohne eindeutige Signale können
  falsch einsortiert sein. Die Größenordnungen tragen, einzelne Zeilen nicht unbedingt.
- **Wortzahlen sind grob** aus dem sichtbaren Seitentext geschätzt, inklusive etwas
  Navigationsrest. Für Vergleiche zwischen Anbietern taugen sie, als absolute Zahl nicht.

## Die Lage in Zahlen

| Anbieter | Segment | Beiträge | davon deutsch | Median Wörter | Stand |
|---|---|---|---|---|---|
| Bullhorn | International, Staffing | 2.726 | 241 | 1.227 | aktiv |
| Yena | DACH, Agentur | 2.318 | 296 | 1.637 | aktiv |
| Workable | International, ATS | 1.811 | 26 | 1.380 | aktiv |
| Factorial | DACH, HR-Suite | 1.366 | 1.328 | 1.604 | aktiv |
| SmartRecruiters | International, ATS | 948 | 96 | 886 | aktiv |
| Manatal | International, Staffing | 912 | 0 | 2.903 | Datum unbekannt |
| Recruitee | DACH, HR-Suite | 776 | 250 | 2.293 | aktiv |
| Recruit CRM | International, Staffing | 774 | 3 | 2.050 | aktiv |
| Greenhouse | International, ATS | 658 | 26 | 1.038 | aktiv |
| Sprad | DACH, Agentur | 652 | 455 | 2.394 | aktiv |
| onlyfy by XING | DACH, HR-Suite | 649 | 649 | 1.122 | aktiv |
| Talention | DACH, HR-Suite | 618 | 613 | 754 | verlangsamt, letzter 03/2026 |
| Crelate | International, Staffing | 450 | 0 | 1.292 | aktiv |
| Recruiterflow | International, Staffing | 391 | 0 | 1.634 | aktiv |
| Loxo | International, Staffing | 368 | 0 | 1.039 | aktiv |
| Lever | International, ATS | 316 | 0 | 1.095 | aktiv |
| Breezy HR | International, ATS | 295 | 0 | 1.817 | aktiv |
| d.vinci | DACH, HR-Suite | 223 | 221 | **6.259** | aktiv |
| Vincere | International, Staffing | 222 | 0 | k. A. | aktiv |
| Teamtailor | International, ATS | 215 | 10 | 377 | Datum unbekannt |
| rexx systems | DACH, HR-Suite | 210 | 210 | 952 | verlangsamt, letzter 05/2026 |
| JobAdder | International, Staffing | 159 | 0 | 1.324 | aktiv |
| Helix (vormals concludis) | DACH, HR-Suite | 145 | 24 | 755 | Glossar, Datum unbekannt |
| Coveto | DACH, Agentur | 132 | 132 | 778 | aktiv |
| Pinpoint | International, ATS | 129 | 0 | 1.256 | aktiv |
| Leonar | DACH, Agentur | 97 | 80 | 2.844 | aktiv |
| eRecruiter | DACH, Agentur | 95 | 95 | 1.625 | verlangsamt, letzter 04/2026 |
| Ashby | International, ATS | 94 | 0 | 1.243 | aktiv |
| softgarden | DACH, HR-Suite | 73 | 73 | 458 | aktiv |
| JOIN | DACH, HR-Suite | 60 | 15 | 1.544 | aktiv |
| zvoove | DACH, Agentur | 28 | 0 | 685 | aktiv, reine Pressemeldungen |
| Starhunter | DACH, Agentur | 10 | 10 | 846 | Datum unbekannt |
| GuideCom | DACH, HR-Suite | 7 | 7 | 856 | verlangsamt, letzter 04/2026 |
| **ShortSelect** | **DACH, Agentur** | **96** | **96** | k. A. | **letzter 04.09.2026** |

Der Median deutschsprachiger Wettbewerber-Beiträge liegt bei 1.366 Wörtern, das
75er-Perzentil bei 1.983. Die eigene Backlog-Regel von 1.200 bis 1.800 Wörtern liegt damit
im Feld, aber nicht darüber.

## Fünf Befunde, die Konsequenzen haben

### 1. Yena greift exakt die eigene Zielgruppe an, in elf Sprachen

Yena hat 2.318 Beiträge, verteilt auf elf Sprachfassungen mit jeweils übersetzten Slugs:
Englisch 493, Deutsch 296, Polnisch 240, Französisch 240, Spanisch 196, Portugiesisch 193,
Lettisch 156, Niederländisch 153, Estnisch 151, Litauisch 149, Schwedisch 51. Von den 296
deutschen Beiträgen tragen 288 die Jahreszahl 2026 im Titel oder Slug.

Entscheidender als die Menge ist das Vokabular. Eine Auswahl echter Titel:

```
Leere Shortlist: Machbarkeit des Suchauftrags prüfen
Kandidatenübergabe zwischen Personalberatungen planen
Off-Limits-Listen im Executive Search richtig pflegen
Suchmandat bei Hiring Freeze kontrolliert pausieren
Doppelansprache vermeiden: CRM-Regeln für Beratungen
Kandidatenfreigabe vor Kundenvorstellung dokumentieren
Kundenportal-Zugriffsprüfung für Personalberater DACH
Kandidatenauskunft sicher aus dem ATS nach Art. 15 DSGVO
```

Das ist nicht generischer HR-Content, das ist der Arbeitsalltag einer Personalberatung,
und es deckt sich Wort für Wort mit dem, was ShortSelect kann (Kundenportal, Talent Pool,
CRM, Speicherfristen). Yena besetzt gerade die Longtail-Fragen, für die ShortSelect die
Antwort im Produkt hat, aber keinen Text.

### 2. onlyfy (XING) fährt eine reine Frageform-Strategie

649 Beiträge, alle deutsch, alle aus den letzten zwölf Monaten, und **97 Prozent davon
sind als Frage formuliert** (627 von 649). Beispiele: „Wie migriert man von einem ATS zum
anderen?", „Was ist Cloud-ATS vs. On-Premise-ATS?", „Welche Rollen und Berechtigungen
braucht ein Recruiting-Team im ATS?".

Das ist kein Zufall, das ist auf KI-Antworten gebaut. Fragen als H1 treffen die
Fan-Out-Anfragen, die ChatGPT, Perplexity und AI Overviews intern erzeugen. Von allen
untersuchten Anbietern im DACH-Raum ist onlyfy derjenige mit der klarsten GEO-Ausrichtung.

### 3. Die klassischen DACH-Anbieter schlafen, teilweise seit Monaten

Talention hat 618 Beiträge, aber seit März 2026 keinen neuen. rexx systems: 210 Beiträge,
letzter im Mai. eRecruiter: 95, letzter im April. GuideCom: 7, letzter im April.
softgarden hat überhaupt nur 73 Beiträge und einen Median von 458 Wörtern, für einen
Anbieter dieser Größe erstaunlich wenig.

Das heißt: die Autorität dieser Domains altert. Frische ist bei KI-Zitaten ein Signal
erster Ordnung. Ihre Bestandsartikel bleiben stark, aber neue Themen besetzen sie nicht.

### 4. Starhunter ist inhaltlich praktisch nicht vorhanden

Der Blog von Starhunter umfasst zehn Beiträge, ohne Paginierung, ohne weitere Seiten.
Auch der Joomla-Feed gibt nur neun Einträge her. Für einen Anbieter, der bei CETEO
abgelöst werden soll, ist das eine Randnotiz und kein Content-Wall. Die zehn Titel zielen
sauber auf Headhunter (CV-Parsing, KPIs, Boolean-Suche, E-Rechnung), aber die Menge trägt
keine Sichtbarkeit.

### 5. Zwei Cluster mit hoher Passung sind fast unbesetzt

Über alle 33 Anbieter hinweg finden sich auf Deutsch nur

- **54 Beiträge zu Headhunting und Executive Search**, davon 33 von Yena, und
- **11 Beiträge zu Personaldienstleistung und Zeitarbeit**, davon 6 von Yena.

ShortSelect hat in beiden Clustern **null** Beiträge. Gleichzeitig ist genau das die
Zielgruppe, die auf der Website adressiert wird. Nach dem Relevanz-Modell (nutzbare Kraft
= Autorität mal Relevanz) ist das die günstigste Fläche im ganzen Feld: geringe
Wettbewerbsdichte bei maximaler Passung.

Zum Vergleich die überlaufenen Cluster: KI im Recruiting 469 deutsche Beiträge,
ATS-Auswahl und Vergleiche 431, DSGVO und Recht 362, Active Sourcing 259.

## Wo ShortSelect blind ist

Deutschsprachige Wettbewerber-Beiträge je Cluster gegen eigene Abdeckung. Vollständig in
`themen-cluster.csv`.

| Cluster | Wettbewerb (DE) | eigene | Median Wörter | stärkste Anbieter |
|---|---|---|---|---|
| ATS-Grundlagen | 546 | 12 | 1.224 | onlyfy 210, Yena 76, Sprad 64 |
| Vergleiche und Alternativen | 485 | 8 | 1.983 | Sprad 127, Factorial 96, Yena 65 |
| KI und Automatisierung | 449 | 12 | 1.753 | Sprad 159, Yena 79, onlyfy 46 |
| DSGVO und Compliance | 402 | 4 | 1.759 | Sprad 136, Yena 95, onlyfy 90 |
| Active Sourcing | 239 | 2 | 1.715 | Yena 84, Sprad 60, Leonar 32 |
| Stellenanzeige und Multiposting | 230 | 6 | 864 | Recruitee 79, Talention 45 |
| Interview und Auswahl | 210 | 2 | 1.687 | Talention 43, Sprad 42, d.vinci 36 |
| Candidate Experience | 197 | 5 | 1.172 | onlyfy 65, Talention 30 |
| Kennzahlen und Analytics | 181 | 7 | 1.231 | onlyfy 86, Sprad 20 |
| Recruiting-Prozess | 152 | 1 | 1.510 | onlyfy 31, Sprad 30, Yena 26 |
| Matching und Screening | 112 | 5 | 1.633 | Sprad 32, Yena 30, onlyfy 24 |
| Agenturgeschäft und Vertrieb | 73 | 2 | 2.288 | Sprad 25, d.vinci 11, Leonar 8 |
| Employer Branding | 62 | 0 | 1.109 | Talention 13, Factorial 13 |
| Talent Pool und Nurturing | 51 | 2 | 1.300 | Talention 15, Sprad 13 |
| Karriereseite | 45 | 2 | 1.146 | Talention 18, onlyfy 8 |
| Recruiting-CRM | 43 | 1 | 1.599 | Yena 16, Leonar 8, Talention 8 |
| **Headhunting und Executive Search** | **54** | **0** | 1.946 | Yena 33, Sprad 8, Leonar 6 |
| **Personaldienstleistung und Zeitarbeit** | **11** | **0** | 1.695 | Yena 6, Factorial 3 |

Die größten absoluten Lücken (Active Sourcing 239 zu 2, Interview 210 zu 2,
Recruiting-Prozess 152 zu 1) sind nicht automatisch die besten Ziele. Active Sourcing ist
allerdings ein Sonderfall: es ist das Kernversprechen des Produkts und trotzdem mit zwei
Beiträgen belegt. Diese Kombination aus Produktrelevanz und Textlücke ist die teuerste im
ganzen Bild.

## Empfohlene Reihenfolge

Nach dem Grundsatz, einen Cluster ganz zu schließen statt überall zu streuen:

1. **Headhunting und Executive Search komplett besetzen** (Cluster fast leer, Passung
   maximal). Acht bis zehn Beiträge, die den Suchmandats-Lebenszyklus abdecken. Damit
   entsteht zugleich die Stützmasse für die Money Page `/ats-fuer-recruiting-agenturen/`.
2. **Active Sourcing auf Produkthöhe bringen.** Zwei eigene Beiträge stehen 239 gegenüber,
   obwohl AI-Sourcing das Alleinstellungsmerkmal ist. Sechs bis acht Beiträge.
3. **Personaldienstleistung und Zeitarbeit früh besetzen**, solange nur elf Beiträge im
   Markt sind und Yena gerade erst anfängt. Vier bis fünf Beiträge.
4. **Frageform als Titelmuster übernehmen**, wo es passt. onlyfys 97-Prozent-Quote ist ein
   belegter Hinweis darauf, wie DACH-Wettbewerb gerade auf KI-Antworten optimiert.
   Die Backlog-Regel „Frage-H2s" gibt es schon, die H1 sollte nachziehen.
5. **Jahreszahl im Titel prüfen.** Yena setzt 2026 in 288 von 296 deutschen Titeln. Das
   erzeugt Frische-Signale, verlangt aber einen jährlichen Aktualisierungszyklus. Nur
   übernehmen, wenn die Aktualisierung wirklich stattfindet, sonst altert es sichtbar.
6. **Keine Kraft in überlaufene Generik stecken.** ATS-Grundlagen mit 546 deutschen
   Beiträgen und onlyfy mit 210 allein ist als Kopf-Thema nicht zu gewinnen. Dort nur noch
   gezielt einzelne Longtail-Fragen mit Agentur-Bezug.

Der konkrete Vorschlag für den leeren Backlog liegt in `redaktionsplan-vorschlag.md`.

## Dateien

| Datei | Inhalt |
|---|---|
| `anbieter-profile.csv` | 33 Anbieter mit Menge, Sprache, Median-Wortzahl, Frische |
| `themen-cluster.csv` | 28 Cluster, Wettbewerbsdichte gegen eigene Abdeckung |
| `artikel-deutsch.csv` | 4.856 deutschsprachige Beiträge mit Titel, Datum, Wortzahl, URL |
| `artikel-alle.csv.gz` | Vollkorpus, 17.927 Beiträge inklusive englischsprachiger |
| `redaktionsplan-vorschlag.md` | 30 Backlog-Einträge, aus der Lückenanalyse abgeleitet |
| `tools/` | Die Skripte, mit denen die Erhebung wiederholbar ist |

## Wiederholen

```
cd docs/seo/wettbewerb-blogs/tools
node harvest.mjs              # Artikel-URLs je Anbieter sammeln
node normalize.mjs            # Sprachdubletten und Nicht-Artikel entfernen
node fetch-posts.mjs          # Metadaten holen, wiederaufnehmbar
EXA_API_KEY=... node repair-exa.mjs vincere smartrecruiters   # blockierte Anbieter
node analyze.mjs              # Profile, Cluster, N-Gramme
node luecken.mjs              # Rohmaterial für den Redaktionsplan
node report.mjs               # CSV-Exporte
```

Sinnvoller Rhythmus ist quartalsweise. `fetch-posts.mjs` überspringt, was schon in
`data/posts.jsonl` steht, ein erneuter Lauf holt also nur das Neue.
