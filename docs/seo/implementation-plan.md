# SEO-Offensive — Implementation Plan (Phase 3)

**Team:** `blitz-seo-offensive`
**User-Entscheidungen:** Alle "beste Empfehlungen" angenommen (2026-04-22)
**Ziel-Sprint:** ~27h Parallel-Arbeit, 1 Cloudflare-Deploy

---

## Finale Scope-Entscheidungen

| # | Entscheidung | Gewählt |
|---|---|---|
| A1 | Umfang | **Option 2** + Hub-Pages (Tech + Snippet + Recruiting-Funnel + 5 Hub-Pages) |
| A2 | Glossar-FAQ-Reichweite | Template für alle 10 Einträge, Content nur Recruiting-Funnel |
| B1 | Synonym-Strategie | **Single-Page** — Hiring/Recruitment/Bewerber-Funnel im Haupt-Artikel als H2+FAQ |
| B2 | Hub-Pages | **Echte Hub-Pages** (5× 400–600 Wörter + Grid + CollectionPage-Schema) |
| B3 | Trailing-Slash | **`'always'`** in astro.config.mjs + SEOHead-Normalisierung + 14 Props entfernen |
| B4 | HSTS | **Vorsichtig** — `max-age=3600` erst, nach 1 Woche auf `31536000` |
| B5 | CSP | **Später** — nur HSTS + X-Frame + Permissions jetzt |
| C1 | Autor Recruiting-Funnel | **Yusuf Esentürk** (Person-Schema für E-E-A-T) |
| C2 | Funnel-Beispiel | **Recruiting-Agentur-Perspektive** |
| C3 | FAQ-Review | **Autonom** — Content-Agent schreibt, Yusuf reviewt am Ende |
| D1 | Team-Setup | tech, content, snippet ↻ + Hub-Pages splittet auf tech (Scaffolding) + content (Copy); competitor shutdown; audit als Phase-4-Validator |
| D2 | Validator | **1 Validator** (audit-seo-researcher) |
| E1 | Deploy | **Gebündelt** — 1 Commit, 1 Push |
| E2 | GSC-Reindex | **Ja** — Liste mit 12 URLs vorbereiten |

---

## Paket-Matrix: Wer ownt Was

| Paket | Owner | Files (Expected) | Abhängigkeit |
|---|---|---|---|
| **TECH-1** Canonical-Normalisierung | tech-seo | `astro.config.mjs`, `src/components/seo/SEOHead.astro`, 14× `src/pages/produkt/*.astro` (hardcoded-Prop Cleanup) | — |
| **TECH-2** Umlaut-404-Fix | tech-seo | `ressourcen.astro:21`, `methode/binden.astro:16`, `methode/smart-recruiting.astro:14`, `methode/anziehen.astro:108` | — |
| **TECH-3** Security-Headers | tech-seo | `public/_headers` (HSTS `max-age=3600`, X-Frame, Permissions-Policy) | — |
| **TECH-4** Schema-Basis | tech-seo | `src/layouts/MarketingLayout.astro` (WebSite+SearchAction, Organization sameAs) | — |
| **HUB-TECH** 5 Hub-Pages Scaffolding | tech-seo | 5× neue Files: `src/pages/vergleich/index.astro`, `fuer/index.astro`, `produkt/index.astro`, `branchen/index.astro`, `methode/index.astro` + `src/layouts/HubLayout.astro` (CollectionPage-Schema) | TECH-1 done (Trailing-Slash-Konsistenz) |
| **HUB-COPY** 5 Hub-Pages Content | content-seo | Content-Props für die 5 Files (Hero, Intro 400–600W, Grid-Items, FAQ) | HUB-TECH scaffold ready |
| **CONTENT-1** Recruiting-Funnel-Template | content-seo | `src/data/glossary.ts` (Interface erweitern: `faqs`, `heroSnippet`, `sections`, `author`), `src/pages/glossar/[slug].astro` (FAQPage-Schema + Sections-Rendering) | — |
| **CONTENT-2** Recruiting-Funnel-Content | content-seo | `src/data/glossary.ts` (Recruiting-Funnel-Entry: 2500+ Wörter, 8 FAQ, Hero-Snippet, Synonym-H2, Beispiel-Funnel Recruiting-Agentur) | CONTENT-1 done |
| **CONTENT-3** Interne Blog-Links | content-seo | 10+ Blog-Post-Files unter `src/data/blog/` — je 1 kontextueller Link auf `/glossar/recruiting-funnel/` | CONTENT-2 published (Anker-Content muss stehen) |
| **SNIPPET-1** 5 Title/Desc-Rewrites | snippet-seo | `src/pages/fuer/startups.astro`, `produkt/ki-features.astro`, `vergleich/shortselect-vs-vincere.astro`, `branchen/finance.astro`, `vergleich/shortselect-vs-greenhouse.astro` | — |

**Reihenfolge-Regel:** TECH-1 muss fertig sein bevor HUB-TECH startet (Trailing-Slash-Konsistenz). Alle anderen Pakete laufen parallel.

---

## Verifikations-Schritte (pro Paket)

| Paket | Verifikation |
|---|---|
| TECH-1 | `curl -I https://www.shortselect.com/produkt/ats-crm/` → Status 200, `<link rel=canonical href=...ats-crm/>` (MIT Slash) |
| TECH-2 | `curl -I https://www.shortselect.com/methode/auswaehlen/` → 200; 4 Links geprüft (grep im Repo) |
| TECH-3 | `curl -I` → `strict-transport-security`, `x-frame-options`, `permissions-policy` vorhanden |
| TECH-4 | View-Source → `"@type":"WebSite"` + `SearchAction` JSON-LD präsent; `sameAs: [...]` mit min. 2 Links |
| HUB-TECH | `curl -I https://www.shortselect.com/vergleich/` → 200; Layout rendert H1 + CollectionPage-Schema |
| HUB-COPY | 5 Seiten haben je ≥400 Wörter, mind. 6 Grid-Items, mind. 3 FAQ-Items |
| CONTENT-1 | Glossary-Template rendert FAQPage + Person-Schema wenn Entry `faqs` + `author` hat |
| CONTENT-2 | `/glossar/recruiting-funnel/` hat ≥2500 Wörter (wordcount), 8 FAQ sichtbar, Hero-Absatz 40–50 Wörter, 2 Synonym-H2 |
| CONTENT-3 | `grep -r "/glossar/recruiting-funnel" src/data/blog/` → mind. 10 Treffer |
| SNIPPET-1 | Playwright: 5 URLs öffnen, `<title>` und `<meta name=description>` exakt gegen Soll-Werte prüfen |

---

## Was NICHT kaputt gehen darf

- **Homepage-Schema** (Organization, SoftwareApplication, FAQPage) — bleibt unberührt, neue Schemas nur ergänzen
- **Bestehende Vergleichsseiten (12×)** — nur die 2 mit Title/Desc-Edits anfassen
- **Blog-Posts** — nur 1 kontextueller Link einfügen, kein Text-Rewrite
- **Pricing/CTA-Bereiche** — nie anfassen
- **RLS/Auth-Routen** — sind App-Repo, hier irrelevant
- **Sitemap** — `@astrojs/sitemap` regeneriert automatisch nach neuen Seiten (Hub-Pages); manuell nichts bearbeiten

---

## Deploy & GSC-Reindex

**Nach allen Verifikationen grün:**

1. `cd ~/shortselect/marketing && git add -A && git commit -m "..." && git push origin main`
2. Cloudflare Pages Build abwarten (~2 min)
3. Live-Verifikation auf www.shortselect.com (alle 9 Verifikations-Checks nochmal)
4. GSC-Reindex für 12 URLs:
   - `/`
   - `/glossar/recruiting-funnel/`
   - `/vergleich/`, `/fuer/`, `/produkt/`, `/branchen/`, `/methode/` (neue Hubs)
   - `/fuer/startups/`, `/produkt/ki-features/`, `/vergleich/shortselect-vs-vincere/`, `/branchen/finance/`, `/vergleich/shortselect-vs-greenhouse/`

---

## Aufwand-Schätzung (Parallel)

| Paket | Zeit |
|---|---|
| TECH-1..4 | ~2h |
| HUB-TECH | ~1.5h |
| HUB-COPY | ~3h |
| CONTENT-1 | ~1.5h |
| CONTENT-2 | ~6h |
| CONTENT-3 | ~1h |
| SNIPPET-1 | ~30min |
| **Summe (parallel, kritischer Pfad)** | **~6h** (Content-2 dominiert) |

---

**Status:** Implementation-Plan written, Phase 3 ready to start pending User-OK.
