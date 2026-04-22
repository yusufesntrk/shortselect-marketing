# SEO-Offensive — Research-Findings (Konsolidiert)

**Team:** `blitz-seo-offensive`
**Phase:** 1 — Deep Research (abgeschlossen 2026-04-22)
**Repo:** `~/shortselect/marketing/` (Astro SSG, 139 Seiten, Cloudflare Pages)

---

## Quelldateien (Details)

- [`research-findings-tech.md`](./research-findings-tech.md) — Canonical, Redirects, Security-Headers, Sitemap, Schema-Basis (27 KB)
- [`research-findings-content.md`](./research-findings-content.md) — Recruiting-Funnel-Cluster, FAQ, interne Verlinkung (24 KB)
- [`research-findings-snippet.md`](./research-findings-snippet.md) — 5 Title/Description-Paare mit Formeln (29 KB)
- [`research-findings-audit.md`](./research-findings-audit.md) — Full Site Audit 139 URLs, Score 72/100 (22 KB)
- [`research-findings-competitor.md`](./research-findings-competitor.md) — 12 Konkurrenten, Top-10 Content-Gaps, SERP-Analyse (24 KB)

---

## Konsolidierte P0-Liste (Ship-Blocker)

| # | Issue | Owner-Domain | Quelle |
|---|---|---|---|
| P0.1 | **14 Produkt-Seiten: Canonical ohne Trailing-Slash, Server liefert MIT Slash** — exakt derselbe Root-Cause wie GSC-Bug auf `/glossar/recruiting-funnel` (51 vs 6 Impressions) | Tech | tech-seo §3, audit §1 |
| P0.2 | **`/methode/auswählen/` ist live 404** — 4 Source-Files linken auf Umlaut statt ASCII-Slug `auswaehlen` | Tech/Audit | audit §2 |
| P0.3 | **`trailingSlash: 'always'` fehlt in `astro.config.mjs`** — muss gesetzt werden, damit Astro konsistent generiert | Tech | tech-seo §4 |
| P0.4 | **HSTS + X-Frame + Permissions-Policy fehlen** in `public/_headers` | Tech | tech-seo §5, audit §2.1 |
| P0.5 | **5 Breadcrumb-Parents (`/vergleich/`, `/fuer/`, `/produkt/`, `/branchen/`, `/methode/`) liefern 404** — BreadcrumbList-Schema zeigt auf 404 → ~45 Seiten verlieren Breadcrumb-Rich-Snippet | Tech/Content | tech-seo §6b |
| P0.6 | **Recruiting-Funnel-Artikel = 79 Wörter** (Ziel 2500+, Konkurrenz 1800–3500) + **kein FAQPage-Schema** + **0 interne Blog-Links** | Content | content-seo §0–§3 |
| P0.7 | **5 Top-10-Seiten mit 0% CTR** — neue Titles/Descriptions verfügbar (alle ≤60/≤155 Zeichen) | Snippet | snippet-seo §1–§5 |
| P0.8 | **Neue Commercial-Landing-Pages fehlen**: "DSGVO-konforme Recruitingsoftware" + "CRM für Personalberater" + "Performance Recruiting Funnel Deep-Dive" | Content | competitor §C1-3 |

---

## Konsolidierte P1-Liste (Next-Wave)

| # | Issue | Owner-Domain |
|---|---|---|
| P1.1 | 15 Orphan-Pages (3 Branchen, 3 Personas, 8 Produkt-Subseiten, 3 Vergleiche, wechsel, warum-shortselect) | Audit |
| P1.2 | WebSite + SearchAction Schema global fehlt (Sitelinks-Searchbox unmöglich) | Tech |
| P1.3 | `sameAs`-Links in Organization-Schema (LinkedIn, Xing, etc.) fehlen | Tech |
| P1.4 | FAQPage-Schema auf allen 10 Glossar-Einträgen fehlt (nicht nur Recruiting-Funnel) | Content |
| P1.5 | Product/Review-Schema auf 12 Vergleichs-Seiten fehlt | Tech |
| P1.6 | `/glossar/quality-of-hire` Pos 16 → mit Ausbau realistisch Top 5 | Content |
| P1.7 | Apple-Touch-Icon fehlt | Audit |

---

## Konsolidierte P2-Liste (Hygiene)

- SoftwareApplication-Schema auf Produkt-Subseiten
- Sitemap priority/changefreq/lastmod
- robots.txt: Bingbot, Applebot-Extended, CCBot explizit erlauben
- favicon-32x32.png + site.webmanifest
- 7 weitere P2-Items (siehe Detail-Files)

---

## Inkonsistenzen zwischen Researchern (zu klären)

1. **Apex→www Redirect-Status:**
   - `tech-seo` (Code-Review): "redirected NICHT"
   - `audit-seo` (Live-curl): "308 → www funktioniert ✅"
   - **Auflösung:** Live-Test ist autoritativ → funktioniert bereits. P0.1 aus tech-seo-Liste gestrichen.

---

## Content-Roadmap (aus competitor §Top-10)

**Top 10 Content-Pieces priorisiert (3–6 Monate Outlook):**

1. Recruiting-Funnel-Cluster Hauptartikel ausbauen (P0 — Basis für alle Varianten)
2. Performance-Recruiting-Funnel Deep-Dive (P0 — keine DE-Seite füllt heute)
3. DSGVO-konforme Recruitingsoftware Landing (P0 — Commercial Intent)
4. CRM für Personalberater Landing (P0 — Headhunter-Positioning)
5. Quality of Hire Glossar + Rechner (P1 — aktuell Pos 16)
6. Bewerbermanagement-Software Pillar-Page (P1 — bündelt 12 Vergleiche)
7. Recruiting-KPIs Pillar (P1)
8. Candidate Experience Long-Form (P1)
9. Stellenbeschreibungs-Vorlagen-Cluster (P2)
10. Social Recruiting Funnel Ratgeber (P2)

---

## Cross-Domain Dependencies

| Änderung in | betrifft | Kommentar |
|---|---|---|
| `SEOHead.astro` (Canonical-Normalisierung) | alle Seiten | Tech-SEO + Snippet-SEO müssen sich koordinieren |
| `[slug].astro` (Glossar-Template, FAQ-Schema) | 10 Glossar-Einträge | Content-SEO + Audit-SEO Schema-Matrix |
| `_headers` (Security-Headers) | alle Seiten | nur Tech-SEO |
| Hub-Pages anlegen (`/vergleich/`, `/fuer/` etc.) | Tech + Content | Doppel-Nutzen: Breadcrumb-Fix + Content-Keywords |

---

## Geschätzter Implementation-Aufwand pro Paket

| Paket | Aufwand (Solo) | Aufwand (Parallel-Team) |
|---|---|---|
| Tech-P0 (Canonical, Redirects, Headers, 404-Fix) | ~4h | ~2h |
| Content-P0 (Recruiting-Funnel-Ausbau + FAQ + interne Links) | ~12h | ~6h |
| Snippet-P0 (5 Title/Desc-Edits) | ~30min | ~30min |
| Hub-Pages x5 | ~6h | ~3h |
| Commercial-Landings (DSGVO + CRM für Personalberater) | ~16h | ~8h |
| **Summe** | **~38h** | **~19h** |

---

**Status Phase 1:** ✅ alle 5 Tasks `completed`, alle Researcher idle und stand-by für Phase 3.
