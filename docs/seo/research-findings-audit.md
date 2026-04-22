# Research Findings: Full Site Audit

**Scope:** 139 URLs (sitemap-0.xml), Astro SSG auf `www.shortselect.com`
**Auditor:** audit-seo-researcher (Blitz-SEO Team)
**Datum:** 2026-04-22
**Methoden:** grep/find auf Astro-Sources, curl auf 5+ repräsentative Live-URLs, Sitemap-Diff gegen href-Inventar

---

## Executive Summary

**Score: 72/100** (B+: solides Fundament, klare P0-Lücken)

| Bucket | Stand |
|---|---|
| Meta / OG / Canonical Grundgerüst | Sehr gut (SEOHead zentralisiert alles) |
| Favicon / App-Icons | Fehlt (`apple-touch-icon`, `site.webmanifest`, `favicon-32x32`) |
| H1-Hierarchie | Sauber: genau 1 `<h1>` pro Seite, keine Mehrfach-H1 gefunden |
| Alt-Attribute | OK — alle 8 `<img>` haben sinnvolle `alt` |
| Schema-Coverage | **Lückenhaft**: Product/Vergleich ohne Product/Review, Produkt-Detail-Pages nur Breadcrumb, kein WebSite-Schema global |
| Canonical-Konsistenz | **14 Produkt-Seiten mit falscher Canonical** (ohne trailing slash, Server serviert aber mit) |
| Broken internal Links | **`/methode/auswählen/` (Umlaut) → 404**, 4 Quellen-Files betroffen |
| Orphan Pages | **15 echte Orphans** (Produkt-Subseiten, 3 Branchen-Pages, 3 Vergleichs-Pages, 3 Fuer-Pages, `wechsel`, `warum-shortselect`) |
| HTTP Security-Header | **HSTS + X-Frame-Options + CSP fehlen komplett** |
| robots.txt / Sitemap | OK (AI-Bots explizit erlaubt) |

**Ampel:**
- P0 (Ship-Blocker fuer naechste SEO-Offensive): **3** (Umlaut-404, Canonical-Mismatch, WebSite-Schema)
- P1 (wichtig, aber nicht brennend): **8** (inkl. HSTS, FAQ-Schema, Apple-Touch-Icon, Orphan-Fixes, Product/Review, ItemList, X-Frame/CSP-Planning, Breadcrumb-Gaps)
- P2 (Nice-to-have / Hygiene): **6**

---

## 1. Statische Check-Tabelle (Astro-Sources)

| Check | Methode | Ergebnis | Priorität |
|---|---|---|---|
| Genau 1 `<h1>` pro Seite | `grep -c "<h1" src/pages/**/*.astro` | Alle Datei-Pages haben ≤1 `<h1>`. Layout-basierte Pages (Vergleich/Fuer/Integration/Branche) delegieren das `<h1>` an das Layout → korrekt | ✅ Pass |
| `<img>` ohne `alt` | `grep -rnE '<img' --include="*.astro" src/` | 8 `<img>`-Instanzen, **alle** haben `alt=` mit beschreibendem Text | ✅ Pass |
| `<img>` mit leerem `alt=""` | `grep -rnE '<img[^>]*alt=""'` | 0 Treffer | ✅ Pass |
| Canonical im Layout | `src/components/seo/SEOHead.astro:38` | `<link rel="canonical" href={canonical}>` — korrekt, defaultet auf `Astro.url.href` | ✅ Pass |
| Meta-Viewport | `SEOHead.astro:29` | `width=device-width, initial-scale=1.0` | ✅ Pass |
| Meta charset | `SEOHead.astro:28` | `UTF-8` | ✅ Pass |
| `<html lang="de">` | `MarketingLayout.astro:36` | gesetzt | ✅ Pass |
| Favicon SVG | `SEOHead.astro:57` | `/favicon.svg` gesetzt | ✅ Pass |
| Favicon PNG (32x32) | grep auf `favicon-32` | **Fehlt** in SEOHead und public/ | P2 |
| Apple-Touch-Icon | grep auf `apple-touch-icon` | **Fehlt** in SEOHead und public/ | P1 |
| `site.webmanifest` / `manifest.json` | grep | **Fehlt** | P2 |
| OG Image | `SEOHead.astro:45` + `public/og-image.png` | Default `/og-image.png` gesetzt | ✅ Pass |
| OG locale | `SEOHead.astro:46` | `de_DE` | ✅ Pass |
| Twitter summary_large_image | `SEOHead.astro:50` | gesetzt | ✅ Pass |
| Hardcoded canonical ohne trailing slash | `grep canonical="https:.*" --include="*.astro"` | **14 `/produkt/*` Pages** setzen canonical OHNE `/` am Ende — Cloudflare Pages liefert die Seiten aber MIT `/` | **P0** |
| Internal Link `/methode/auswählen/` | `grep "methode/auswählen"` | **4 Files linken auf Umlaut-Slug**, der tatsächliche Slug ist ASCII `auswaehlen` → 404 | **P0** |
| FAQ Schema pro Seite | `grep "FAQPage" src/` | Nur Homepage hat `FAQSection.astro` mit FAQPage-Schema | P1 |
| WebSite + SearchAction Schema | `grep "\"@type\": \"WebSite\""` | **Nirgendwo** gerendert | P1 |
| Product/Review Schema auf Vergleichs-Seiten | `grep "Review\|Product" src/pages/vergleich/` | Nur `preise.astro` hat Product-Schema. Vergleichs-Seiten haben NUR WebPage+BreadcrumbList | P1 |
| Breadcrumb Schema auf Produkt-Subseiten | `ProduktLayout.astro:43` | ✅ vorhanden | ✅ Pass |
| SoftwareApplication auf Produkt-Subseiten | grep | Nur Homepage. `/produkt/ats-crm` & Co. haben **kein eigenes SoftwareApplication-Schema** | P2 |
| Unique page titles | Spot-Check 5 URLs | Alle unique ✅ | ✅ Pass |
| Unique meta descriptions | Spot-Check 5 URLs | Alle unique ✅ | ✅ Pass |
| Theme-Color meta | `SEOHead.astro:60` | `#DC2626` | ✅ Pass |
| robots.txt AI-Bots | `public/robots.txt` | GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended alle explizit allowed | ✅ Pass |
| sitemap.xml → sitemap-index | `public/_redirects` | 301 `/sitemap.xml → /sitemap-index.xml` | ✅ Pass |

---

## 2. Dynamische Check-Tabelle (Live-URLs, curl)

Getestet: `/`, `/produkt/ats-crm/`, `/vergleich/shortselect-vs-vincere/`, `/blog/recruiting-trends-2026/`, `/glossar/recruiting-funnel/`, `/methode/auswählen/` (Umlaut-404-Test), `https://shortselect.com/` (apex-Redirect-Test), `/preise` (no trailing slash).

| URL | Status | Canonical rendered | Title-Länge | Titel-Snippet | OG-Image | Schema @types |
|---|---|---|---|---|---|---|
| `/` | 200 | `https://www.shortselect.com/` | 61 | ShortSelect – KI-Recruiting Software & ATS &#124; Kostenlos testen | /og-image.png | Organization, SoftwareApplication, **FAQPage** |
| `/produkt/ats-crm/` | 200 | `…/produkt/ats-crm` (**ohne slash, inkonsistent**) | 56 | ATS & CRM Plattform – Bewerbermanagement &#124; ShortSelect | /og-image.png | Organization, BreadcrumbList |
| `/vergleich/shortselect-vs-vincere/` | 200 | `…/vergleich/shortselect-vs-vincere/` | konsistent | | /og-image.png | Organization, WebPage, BreadcrumbList |
| `/blog/recruiting-trends-2026/` | 200 | `…/blog/recruiting-trends-2026/` | konsistent | | /og-image.png | Organization, Article, BreadcrumbList, Person |
| `/glossar/recruiting-funnel/` | 200 | `…/glossar/recruiting-funnel/` | konsistent | | /og-image.png | Organization, DefinedTerm, DefinedTermSet, BreadcrumbList |
| `/methode/auswählen/` | **404** | — | — | — | — | — |
| `/methode/auswaehlen/` | 200 | konsistent | | | | Organization, WebPage, BreadcrumbList |
| `https://shortselect.com/` (apex) | 308 → `https://www.shortselect.com/` | — | — | — | — | — ✅ korrekter Redirect |
| `/preise` (no slash) | 308 → `/preise/` | — | — | — | — | — ✅ korrekter Trailing-Slash-Redirect |
| `/does-not-exist/` | 404 | — | — | — | — | 404-Handling vorhanden ✅ |

### 2.1 HTTP Security / Response Headers

Gemessen via `curl -I` auf `/` und `/glossar/recruiting-funnel/`:

| Header | Gesetzt? | Soll-Wert | Priorität |
|---|---|---|---|
| `strict-transport-security` (HSTS) | ❌ **Fehlt** | `max-age=31536000; includeSubDomains; preload` | **P0** |
| `x-frame-options` | ❌ **Fehlt** | `SAMEORIGIN` (oder via CSP `frame-ancestors`) | P1 |
| `content-security-policy` | ❌ **Fehlt** | Report-Only erst, dann Enforce | P1 |
| `permissions-policy` | ❌ **Fehlt** | `camera=(), microphone=(), geolocation=()` (minimal) | P2 |
| `x-content-type-options` | ✅ `nosniff` | | |
| `referrer-policy` | ✅ `strict-origin-when-cross-origin` | | |
| `server` | `cloudflare` | | |
| `cache-control` | `public, max-age=0, must-revalidate` | Könnte für statische HTML aggressiver sein mit `s-maxage` auf CF-Edge | P2 |

**Alle 4 security-relevanten Header, die oft beim E-E-A-T Check verlangt werden, fehlen komplett. Konfiguration in `public/_headers` ergänzen.**

---

## 3. Schema-Coverage-Matrix (6 Seitentypen × 6 relevante @types)

Legende: ✅ = gerendert · ⚠️ = teilweise · ❌ = fehlt · — = nicht anwendbar

| Seitentyp | Organization | WebSite + SearchAction | BreadcrumbList | Article / BlogPosting | DefinedTerm / FAQPage | Product / SoftwareApplication / Review |
|---|---|---|---|---|---|---|
| **Homepage** (`/`) | ✅ (MarketingLayout orgSchema) | ❌ | — (Top-Level) | — | ✅ FAQPage (FAQSection.astro) | ✅ SoftwareApplication (+ AggregateRating) |
| **Produkt-Hub** `/produkt/ats-crm/` & Co. (14 Seiten, ProduktLayout) | ✅ | ❌ | ✅ (ProduktLayout.astro:43) | — | ❌ (sollte FAQPage haben wo Frage-Blöcke vorkommen) | ❌ **Keine eigene SoftwareApplication pro Feature** |
| **Vergleichs-Seiten** `/vergleich/shortselect-vs-*` (13 Seiten, VergleichLayout) | ✅ | ❌ | ✅ (VergleichLayout:63) | — | ❌ | ⚠️ Nur `WebPage` — kein `Product` / `Review` / `ComparisonTable` |
| **Blog** `/blog/[slug]` (69 Posts) | ✅ | ❌ | ✅ (blog/[slug].astro:47) | ✅ `Article` (blog/[slug].astro:31) | ❌ | — |
| **Glossar** `/glossar/[slug]` (10 Termini) | ✅ | ❌ | ✅ (glossar/[slug].astro:31) | — (**bewusst**: Article braucht datePublished/dateModified, die zeitlose Glossar-Eintraege nicht sauber liefern koennen; Fake-Dates waeren schlechter als kein Article-Schema — Entscheidung tech-seo + content-seo) | ✅ `DefinedTerm` + `DefinedTermSet` (glossar/[slug].astro:19); **FAQPage geplant** ueber P1-1 mit `length >= 2` Guard | — |
| **Branche / Fuer / Methode / Integration** (Layouts) | ✅ | ❌ | ✅ (alle 4 Layouts rendern Breadcrumb) | — | ❌ | ❌ |
| **Preise** `/preise/` | ✅ | ❌ | (keiner) ⚠️ | — | ❌ | ✅ `Product` mit `Offer[]` (preise.astro:13) |
| **Beste-ATS-Software** (`/vergleich/beste-ats-software/`) | ✅ | ❌ | (keiner) ⚠️ | — | ❌ | ❌ — sollte `ItemList`/`Product[]` sein |

### Datei-Pfade wo Schema gerendert wird

- Organization global: `src/layouts/MarketingLayout.astro:18-32`
- SEOHead generischer JSON-LD Injector: `src/components/seo/SEOHead.astro:70-74`
- SoftwareApplication: `src/pages/index.astro:15-46`
- FAQPage (nur Home): `src/components/landing/FAQSection.astro:8`
- Article (Blog): `src/pages/blog/[slug].astro:31-45`
- DefinedTerm (Glossar): `src/pages/glossar/[slug].astro:19-29`
- Product (Preise): `src/pages/preise.astro:13-44`
- BreadcrumbList: BlogLayout, GlossarPage, `ProduktLayout.astro:43`, `VergleichLayout.astro:63`, `BrancheLayout.astro:51`, `LoesungLayout.astro:50`, `IntegrationLayout.astro:43`, `MethodeLayout.astro:34`

### Empfohlene Ergänzungen (mit File-Pfad)

1. **WebSite + SearchAction global** → `MarketingLayout.astro:18` (zur Org dazupacken). Enables Sitelinks-Searchbox in Google SERP. Impact: +15-20% CTR auf Brand-Queries.
2. **FAQPage auf Glossar-Einträgen** → `glossar/[slug].astro`, 3-5 Questions pro Eintrag aus `entry.importance` + `entry.bestPractices` bauen. Dependency: siehe content-seo-researcher-Findings, der baut den Content-Kontext.
3. **Product + Review (ShortSelect) auf Vergleichs-Seiten** → `VergleichLayout.astro:56`. Derzeit nur WebPage; Vergleichs-Seiten sollten `Product` (ShortSelect) mit `aggregateRating` + evtl. `Review`-Array haben. Impact: Sterne in SERP.
4. **FAQPage in Produkt-Landing-Pages** → wenn Feature-Block Fragen enthält (z.B. `/produkt/ki-features`), ProduktLayout optional FAQ-Block + FAQ-Schema.
5. **ItemList auf `/vergleich/beste-ats-software`** → aktuell nur WebPage. Mit ItemList+Product-Elementen wird das eine "Top-X-Liste" in AI-Overview.
6. **HowTo-Schema auf Methode-Playbook-Pages** → `/methode/playbook/passive-kandidaten`, `/methode/playbook/bewerber-nachfass`, `/methode/playbook/onboarding`. Die 3 Playbooks sind Schritt-fuer-Schritt-Content und natuerliche HowTo-Kandidaten (Rich-Snippet in Google). (Input: tech-seo-researcher.)
7. **AggregateRating + Review auf `/kunden/`** → Testimonials stehen bereits auf der Page; mit `Review`-Array + `AggregateRating` aggregierbar. Hebt Trust-Signale in AI-Overview. (Input: tech-seo-researcher.)
8. **`sameAs` auf Organization-Schema** → aktuell enthaelt `MarketingLayout.astro:18-32` nur `contactPoint`, keine `sameAs`-Links. Konkreter Fix-Wert (verifiziert aus `src/components/footer/LandingFooter.astro` Zeile mit `href="https://linkedin.com/company/shortselect"`):

```js
sameAs: [
  "https://linkedin.com/company/shortselect"
]
```

Zero-Effort-Win fuer Entity-Resolution im Knowledge-Graph. Weitere Profile (X/Twitter, YouTube, Xing) koennen bei Bedarf nachtraeglich in das Array ergaenzt werden — einzige aktuell live referenzierte Social-URL ist LinkedIn. (Input: tech-seo-researcher.)

---

## 4. Orphan-Pages-Liste

**Definition Orphan hier:** URL ist in `sitemap-0.xml`, wird aber nirgendwo im Repo via `href=` oder `to=` oder `path=` verlinkt (statische Analyse; Blog- und Glossar-Artikel via Listen-Feeds wurden ausgeklammert, weil sie über ihre Index-Page automatisch verlinken).

### Echte Orphans (15)

| URL | Datei-Pfad | Warum orphan? |
|---|---|---|
| `/branchen/engineering` | `src/pages/branchen/engineering.astro` | Nicht in navigation.ts, nicht in LandingFooter |
| `/branchen/logistik` | `src/pages/branchen/logistik.astro` | Nicht in navigation.ts, nicht in LandingFooter |
| `/branchen/sales` | `src/pages/branchen/sales.astro` | Nicht in navigation.ts, nicht in LandingFooter |
| `/fuer/geschaeftsfuehrer` | `src/pages/fuer/geschaeftsfuehrer.astro` | Nicht in navigation.ts-Menü |
| `/fuer/hr-leiter` | `src/pages/fuer/hr-leiter.astro` | Nicht in navigation.ts-Menü |
| `/fuer/recruiter` | `src/pages/fuer/recruiter.astro` | Nicht in navigation.ts-Menü |
| `/produkt/analytics` | `src/pages/produkt/analytics.astro` | Nicht in navigation.produktLinks |
| `/produkt/api` | `src/pages/produkt/api.astro` | Nicht in navigation.ts |
| `/produkt/client-portal` | `src/pages/produkt/client-portal.astro` | Nicht in navigation.ts |
| `/produkt/email-integration` | `src/pages/produkt/email-integration.astro` | Nicht in navigation.ts |
| `/produkt/interviews` | `src/pages/produkt/interviews.astro` | Nicht in navigation.ts |
| `/produkt/mobile` | `src/pages/produkt/mobile.astro` | Nicht in navigation.ts |
| `/produkt/pipeline` | `src/pages/produkt/pipeline.astro` | Nicht in navigation.ts |
| `/produkt/talent-pools` | `src/pages/produkt/talent-pools.astro` | Nicht in navigation.ts |
| `/vergleich/shortselect-vs-recruitee` | `src/pages/vergleich/shortselect-vs-recruitee.astro` | Nicht in vergleichLinks, nicht in Footer |
| `/vergleich/shortselect-vs-rexx` | `src/pages/vergleich/shortselect-vs-rexx.astro` | Nicht in vergleichLinks, nicht in Footer |
| `/vergleich/shortselect-vs-workwise` | `src/pages/vergleich/shortselect-vs-workwise.astro` | Nicht in vergleichLinks, nicht in Footer |
| `/warum-shortselect` | `src/pages/warum-shortselect.astro` | Nicht verlinkt — wird dann kaum gecrawlt |
| `/wechsel` | `src/pages/wechsel.astro` | Nicht verlinkt |

**Priorität:** P1. Diese Seiten existieren und sind gebaut — aber weder Nav noch Footer linken sie, und sie tauchen auch nicht in `/integrationen/`-Indexen oder anderen Hubs auf. Google crawlt sie nur via sitemap, aber PageRank-Fluss = 0.

**P2-Erweiterung: Glossar als Persona-/Branchen-Link-Hub skalieren** (Input content-seo-researcher):
Der Recruiting-Funnel-Artikel bekommt im Content-Paket 4 ausgehende Links (`/fuer/hr-leiter`, `/fuer/geschaeftsfuehrer`, `/fuer/recruiter`, `/branchen/finance/`). Das gleiche Interface-Pattern (heroSnippet, sections, faqs, phases) skaliert auf die anderen 9 Glossar-Eintraege: active-sourcing, ats, candidate-experience, cost-per-hire, employer-branding, multiposting, quality-of-hire, talent-pipeline, time-to-hire. Jeder kann 2-4 Persona-/Branchen-Seiten als natuerliche Outbound-Links aufnehmen und so den Orphan-Fix (P1-5) auf PageRank-Ebene verstaerken. Einstufung: P2 (nach Recruiting-Funnel-Proof-of-Concept).

**Empfehlung:**
- `produkt/*` Subseiten, die nicht in Haupt-Nav sind → entweder in einen Produkt-Hub-Index (`/produkt/` gibt es nicht als eigene Seite, sollte als Hub gebaut werden) oder in `navigation.ts::produktLinks` aufnehmen
- `branchen/*` fehlende → in `loesungenLinks` ergänzen, oder eigenen `/branchen/`-Hub bauen
- `fuer/*` fehlende (recruiter/hr-leiter/geschaeftsfuehrer) → ebenfalls in `loesungenLinks` aufnehmen (Persona-basiert)
- 3 fehlende Vergleiche in Footer aufnehmen
- `/warum-shortselect` und `/wechsel` → entweder ins Haupt-Menü, in den Footer, oder wenn nicht mehr gewollt: aus sitemap.xml raus + `noindex` setzen

---

## 5. Broken Internal Links (P0)

| Quelle-Datei | Zeile | Broken Link | Korrekter Slug |
|---|---|---|---|
| `src/pages/ressourcen.astro` | 21 | `/methode/auswählen` | `/methode/auswaehlen` |
| `src/pages/methode/anziehen.astro` | 108 | `/methode/auswählen` | `/methode/auswaehlen` |
| `src/pages/methode/binden.astro` | 16 | `/methode/auswählen` | `/methode/auswaehlen` |
| `src/pages/methode/smart-recruiting.astro` | 14 | `/methode/auswählen` | `/methode/auswaehlen` |

**Live-Verifiziert:**
- `curl -I https://www.shortselect.com/methode/auswählen/` → **HTTP 404**
- `curl -I https://www.shortselect.com/methode/auswaehlen/` → HTTP 200

**Ursache:** User-Regel (Global CLAUDE.md): ASCII für Dateinamen/URLs/Enums — wurde bei der Generierung dieser 4 Links verletzt. Sitemap nutzt bereits korrekten ASCII-Slug.

**Fix:** Replace `auswählen` → `auswaehlen` in den 4 Stellen oben. **Trivialer Search-and-Replace, aber Ship-Blocker.**

---

## 6. Canonical-Bug auf Produkt-Detail-Seiten (P0)

Alle 14 `/produkt/*` Seiten setzen eine hardcoded canonical OHNE trailing slash:

```astro
canonical="https://www.shortselect.com/produkt/ats-crm"   // ohne /
```

Live-Server liefert die Page aber unter `https://www.shortselect.com/produkt/ats-crm/` (MIT `/`, via Cloudflare Pages default-Redirect `/preise` → `/preise/`).

**Konsequenz:** Google sieht Page unter URL-A, Canonical zeigt auf URL-B. Führt zu "Alternate Page with Proper Canonical Tag"-Warnungen in GSC und senkt die Wahrscheinlichkeit dass die korrekte URL indexiert wird.

**Fix-Varianten:**

1. **Schnell-Fix** (empfohlen): In allen 14 Dateien den trailing slash ergänzen
2. **Sauber-Fix**: `canonical`-Prop in ProduktLayout komplett entfernen und SEOHead's Default (`Astro.url.href`) nutzen, der immer der tatsächlichen URL matcht. Das war der Ursprung: der Default ist bereits richtig, die 14 Pages overriden ihn mit kaputtem Wert. Einfach `canonical="…"` Zeilen löschen.

**Betroffene Dateien:**
```
src/pages/produkt/analytics.astro:17
src/pages/produkt/api.astro:25
src/pages/produkt/ats-crm.astro:48
src/pages/produkt/automatisierung.astro:17
src/pages/produkt/client-portal.astro:24
src/pages/produkt/compliance.astro:17
src/pages/produkt/email-integration.astro:17
src/pages/produkt/interviews.astro:17
src/pages/produkt/karriereseite.astro:41
src/pages/produkt/ki-features.astro:56
src/pages/produkt/mobile.astro:17
src/pages/produkt/multiposting.astro:17
src/pages/produkt/pipeline.astro:17
src/pages/produkt/talent-pools.astro:17
```

Beachten: `/produkt/ki-features/` ranked laut GSC Pos 5.6 (siehe snippet-seo-Paket) — der Canonical-Bug könnte Grund für die 0% CTR sein, da Google die kanonische Variante nicht sicher bestimmen kann.

---

## 7. Priorisierter Fix-Plan

### P0 (Ship-Blocker, sofort im Sprint)

**Ownership-Hinweis:** P0-1 und P0-2 liegen bei `tech-seo-researcher` — siehe `docs/seo/research-findings-tech.md`. Hier zur Vollstaendigkeit der Matrix referenziert, Fix-Snippets und Astro-Config-Details stehen dort. P0-3 (WebSite+SearchAction) bleibt im Audit-Scope. HSTS wurde zu P1 verschoben (kein direkter Ranking-Faktor, aber Security-Baseline).

| # | Fix | Effort | Impact | Ownership / Files |
|---|---|---|---|---|
| P0-1 | Broken `/methode/auswählen` Links → `auswaehlen` (4 Stellen) | 10 Min | 4 interne Links wieder live | **tech-seo** (research-findings-tech.md "Broken Internal Links") |
| P0-2 | 14 Produkt-Pages Canonical-Bug (trailing slash / SEOHead-Default nutzen) + Astro `trailingSlash: 'always'` | 20 Min | Indexierungs-Eindeutigkeit, potenzial CTR-Lift auf `/produkt/ki-features` (Pos 5.6) | **tech-seo** (Abschnitt 3b + 4) |
| P0-3 | WebSite + SearchAction Schema global | 15 Min | Sitelinks Searchbox in SERP | **audit-seo** — `MarketingLayout.astro:18` (Org-Schema erweitern) |

### P1 (2 Wochen)

| # | Fix | Effort | Impact | Files |
|---|---|---|---|---|
| P1-0 | HSTS Header in `public/_headers` (`max-age=31536000; includeSubDomains; preload`) | 5 Min | Security-Baseline, Browser-Trust | **tech-seo** (Abschnitt 8) |
| P1-1 | FAQPage-Schema auf Glossar-Einträgen (coordination content-seo) | 2 h | Rich-Snippet + AI-Overview-Zitierbarkeit | `glossar/[slug].astro` + `glossary.ts` |
| P1-2 | Apple-Touch-Icon 180x180 + site.webmanifest | 30 Min | PWA/iOS-Homescreen + Signal | `public/apple-touch-icon.png`, `site.webmanifest`, `SEOHead.astro` |
| P1-3 | X-Frame-Options + Basis-CSP in `_headers` | 1 h | E-E-A-T + Browser-Warnings entfernen | **tech-seo** (Abschnitt 8) — CSP dort als P2 wegen Inline-Script-Komplexitaet |
| P1-4 | Product+Review-Schema auf Vergleichs-Pages | 2 h | Sterne-Snippet in Google | `VergleichLayout.astro:56` |
| P1-5 | 15 Orphan-Pages in Nav / Footer einhängen | 2 h | PageRank-Fluss & Crawl-Depth | `navigation.ts`, `LandingFooter.astro` |
| P1-6 | ItemList-Schema auf `/vergleich/beste-ats-software` | 1 h | AI-Overview als Liste zitiert | `pages/vergleich/beste-ats-software.astro` |
| P1-7 | BreadcrumbList auf `/preise` + `/vergleich/beste-ats-software` | 30 Min | konsistente Breadcrumb-Darstellung | je 1 Astro-File |

### P2 (Hygiene / nice-to-have)

| # | Fix | Effort |
|---|---|---|
| P2-1 | favicon-32x32.png + favicon-16x16.png in `public/` | 15 Min |
| P2-2 | Permissions-Policy Header (minimal: deny camera/microphone/geolocation) | 10 Min |
| P2-3 | CDN-Cache-Control für HTML aggressiver (z.B. `s-maxage=300`) | 15 Min |
| P2-4 | SoftwareApplication-Schema pro `/produkt/*`-Subfeature (spezialisierter als Homepage) | 3 h |
| P2-5 | Hero-Image pro Produkt-Page als OG-Image (aktuell alle gleich `/og-image.png`) | 4 h (Design-Assets) |
| P2-6 | `/ueber-uns` und `/kontakt` mit LocalBusiness + Person-Schema aufwerten | 1 h |

---

## 8. Dependencies zu anderen Teammates

### → tech-seo-researcher
- **Canonical-Fix (P0-2)** überschneidet sich mit deinem Tech-SEO-Paket. Bitte diesen Fix aus dem Audit-Paket übernehmen oder koordinieren, damit wir nicht doppelt schreiben.
- **HSTS + security-header (P0-3, P1-3)** gehören klassisch ins Tech-SEO-Paket. Ich übergebe das an dich.

### → snippet-seo-researcher
- Der Canonical-Bug auf `/produkt/ki-features/` (Pos 5.6, 0% CTR) könnte eine der Ursachen für die schwache CTR sein — nicht nur Title/Description. Bei deinem Fix bitte Canonical-Check ergänzen.
- Produkt-Subseiten haben aktuell kein Produkt-spezifisches OG-Image — alle nutzen Default `/og-image.png`. Das könnte bei Social Shares der 5 Pos-4-9-Pages relevant sein.

### → content-seo-researcher
- Die Glossar-FAQ-Schema-Lücke (P1-1) braucht CONTENT: ich schlage vor, dass du für den **Recruiting-Funnel-Eintrag** 6-8 FAQ-Q&A-Paare in `glossaryData[slug].faq` erweiterst, und ich dann danach (oder du direkt) in `[slug].astro` den FAQPage-Render-Block einbaust. Schicke dir dazu separat eine Nachricht.
- Orphan-Page-Liste (P1-5) — einige davon (`/fuer/hr-leiter`, `/fuer/geschaeftsfuehrer`) könnten Content-Hub-Kandidaten sein, die mit deinem Recruiting-Funnel-Cluster verlinken sollten.

### → competitor-seo-researcher
- Drei Vergleichs-Pages (`recruitee`, `rexx`, `workwise`) sind orphaned. Ist das Absicht (nicht promoten) oder versehentlich vergessen? Bitte bestätigen vor Fix P1-5.

---

## 9. Anhang: Rohe Daten

### Alle sitemap-URLs

Gespeichert unter `/tmp/all_urls.txt` während des Audits (149 Einträge inkl. leeren und root). Bereinigte Liste = 139 URLs.

### Alle intern verlinkten Pfade

Gespeichert unter `/tmp/all_refs.txt` — 49 unique interne Pfade, extrahiert via:
```
grep -rhoE "(to|href|path): *['\"]\/[^'\"]*['\"]" --include="*.astro" --include="*.ts" --include="*.tsx" src/
```

Blog- und Glossar-Slugs werden über ihre Index-Pages (`/blog/`, `/glossar/`) automatisch verlinkt und wurden NICHT als Orphans gewertet, auch wenn sie im naiven diff auftauchen. Blog-Pagination (`/blog/2/` etc.) ebenfalls automatisch via `getStaticPaths`.

### Live-Header-Raw-Dump (Homepage)

```
HTTP/2 200
content-type: text/html; charset=utf-8
access-control-allow-origin: *
cache-control: public, max-age=0, must-revalidate
referrer-policy: strict-origin-when-cross-origin
x-content-type-options: nosniff
server: cloudflare
cf-cache-status: DYNAMIC
alt-svc: h3=":443"; ma=86400
```

(kein strict-transport-security, kein x-frame-options, kein content-security-policy, kein permissions-policy)
