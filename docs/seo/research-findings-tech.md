# Tech-SEO Research Findings

**Scope:** Marketing-Repo (`~/shortselect/marketing/`), Astro 6 SSG, 139 Seiten, Cloudflare Pages auf `www.shortselect.com`.
**Erstellt:** 2026-04-22 (tech-seo-researcher, Team `blitz-seo-offensive`)
**Verifizierungsmethode:** Code-Review (src/, public/, astro.config.mjs) + Live-curl gegen `shortselect.com` und `www.shortselect.com`

---

## TL;DR — P0-Fixes (jetzt sofort)

| # | Issue | Datei(en) | Impact |
|---|-------|-----------|--------|
| 1 | **Apex (`shortselect.com`) redirected NICHT auf `www`** — beides antwortet 200 | `public/_redirects` | Duplicate-Host, Google kann apex als alternative URL indexieren, CTR-Verwässerung |
| 2 | **Canonical-Mismatch: produkt/*-Pages setzen canonical OHNE Trailing-Slash**, CF redirected aber 308 → mit Slash | 14 Dateien in `src/pages/produkt/` | Canonical zeigt auf eine URL, die 308-redirectet — laut Google ein schwaches Signal, kann Canonicalization scheitern (genau wie bei `/glossar/recruiting-funnel`: 51 Impressions auf Pos 66 vs 6 Impressions auf Pos 39 — Google entscheidet sich nicht) |
| 3 | **BreadcrumbList-Schema zeigt auf 5 URLs die 404 liefern** — /vergleich/, /fuer/, /produkt/, /branchen/, /methode/ existieren nicht als Index-Seiten | 5 Layouts in `src/layouts/` (VergleichLayout, LoesungLayout, ProduktLayout, BrancheLayout, MethodeLayout) | Google crawlt Breadcrumb-Items, 404 auf Parent → Breadcrumb-Rich-Snippet wird für ~45 Seiten nicht gerendert |
| 4 | **4 interne Links auf `/methode/auswählen` (mit Umlaut) → 404** — korrekter Slug ist `auswaehlen` (ASCII) | 4 Dateien (ressourcen.astro, methode/binden.astro, methode/smart-recruiting.astro, methode/anziehen.astro) | Broken interne Links, PageRank-Leak, Crawl-Budget-Verlust, User-Experience-Fehler |
| 5 | **Kein HSTS, kein X-Frame-Options, keine Permissions-Policy** | `public/_headers` | Security-Score (Mozilla Observatory) < C; kein Ranking-Faktor direkt, aber hebelt AI-Bot-Vertrauen (Claude/Perplexity werten HTTPS-Härtung) |

---

## 1. robots.txt — OK

**Pfad:** `public/robots.txt`
**Live:** `https://www.shortselect.com/robots.txt` = `https://shortselect.com/robots.txt` (identisch, beide liefern 200)

**Inhalt geprüft:**
- `User-agent: *` + sinnvolle Disallows (`/dashboard/`, `/client/`, `/auth`) — korrekt, da diese App-Routen sind
- Explizit erlaubt: `GPTBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `anthropic-ai`, `Google-Extended`
- Zwei Sitemap-Deklarationen (sitemap-index.xml und sitemap.xml)

**Verbesserungen (P2, nicht kritisch):**
- Zweite Sitemap-Zeile redundant (`sitemap.xml` 301-redirected auf `sitemap-index.xml`). Zeile entfernen.
- Fehlt: `Bingbot` + `CCBot` + `Applebot-Extended` explizit freigegeben (`User-agent: *` reicht formal, aber explizite Freigabe hilft gegen falsche Default-Crawl-Policies bei einigen AI-Tools).

**Fix-Snippet (`public/robots.txt` — Zeile 26-27 + neue Bots):**
```txt
# ... bestehender Block ...
User-agent: Bingbot
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://www.shortselect.com/sitemap-index.xml
# sitemap.xml-Zeile entfernen — 301-Redirect löst das
```

**Prio:** P2

---

## 2. sitemap-index.xml / sitemap-0.xml — OK (mit kleinen Optimierungen)

**Pfad-Generierung:** `@astrojs/sitemap` (astro.config.mjs Zeile 9)
**Live:**
- `https://www.shortselect.com/sitemap-index.xml` → 200 (listet `sitemap-0.xml`)
- `https://www.shortselect.com/sitemap-0.xml` → 200 (149 URLs)
- `https://www.shortselect.com/sitemap.xml` → 301 → `/sitemap-index.xml` (via `public/_redirects`)

**Ist-Zustand geprüft:**
- 149 URLs, alle mit `https://www.shortselect.com/` Präfix (korrekter Host)
- **Alle 149 URLs enden mit Trailing-Slash** — konsistent mit CF-Pages-Redirect-Verhalten ✅
- Stichprobe (5 erste): `/`, `/agb/`, `/blog/`, `/blog/2/`, `/blog/3/` — sauber
- **Lastmod/changefreq/priority fehlen komplett** — @astrojs/sitemap liefert nur `<loc>` ohne diese Felder per Default

**Verbesserung (P2):**
`@astrojs/sitemap` in `astro.config.mjs` mit priority/changefreq/lastmod konfigurieren. Hilft Google bei Recrawl-Priorisierung.

**Fix-Snippet (`astro.config.mjs`):**
```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.shortselect.com',
  output: 'static',
  trailingSlash: 'always', // siehe Fix #3 unten
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        // Homepage = 1.0, Hauptkategorien = 0.9, Unterseiten = 0.7, Legal = 0.3
        if (item.url === 'https://www.shortselect.com/') item.priority = 1.0;
        else if (/\/(produkt|branchen|fuer|methode|vergleich|integrationen)\/$/.test(item.url)) item.priority = 0.9;
        else if (/\/(agb|impressum|datenschutz|sicherheit)\/?$/.test(item.url)) item.priority = 0.3;
        else if (/\/blog\/\d+\/$/.test(item.url)) item.priority = 0.5; // Paginierung
        return item;
      },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
```

**Prio:** P2

---

## 3. Canonical-Strategie — P0 Problem

### 3a. Root-Cause für GSC-Meldung "Duplicate-Indexing /glossar/recruiting-funnel"

**Symptom (laut Task #1):** GSC zeigt beide Varianten (mit + ohne Slash) als separat indexiert, 51 Impressions auf Position 66 vs 6 Impressions auf Pos 39.

**Aktueller Zustand:**
- CF Pages macht ein **308-Redirect von `/glossar/recruiting-funnel` → `/glossar/recruiting-funnel/`** (verifiziert via curl)
- Canonical im HTML der Trailing-Slash-Version zeigt korrekt auf `https://www.shortselect.com/glossar/recruiting-funnel/` ✅
- Canonical auf der Non-Slash-Variante (nach 308-Follow) zeigt ebenfalls auf die Slash-Variante ✅

**Warum GSC trotzdem Duplicate meldet:** Google hat möglicherweise die Non-Slash-URL **vor dem Redirect** gecrawlt (alte Index-Einträge) oder sieht externe Backlinks darauf. Canonical + 308 sollte das lösen — das Problem ist WAHRSCHEINLICH jetzt bereits self-healing, aber es braucht Zeit. **Trigger-Action:** In GSC manuell die Non-Slash-URL als "Removed from Index" markieren oder per URL-Inspection neu anfordern.

**Konkrete Empfehlung:** `astro.config.mjs` um **`trailingSlash: 'always'`** ergänzen. Damit sind generierte Links im HTML konsistent mit CF-Verhalten.

### 3b. **P0: produkt/*-Pages — Canonical-Mismatch (14 Dateien)**

**Problem:** 14 produkt-Seiten hardcoden `canonical` OHNE Trailing-Slash, aber CF Pages redirected 308 → mit Slash. Canonical-URL ist also nicht die "endgültige" URL.

**Betroffene Dateien (alle in `src/pages/produkt/`):**
```
analytics.astro:17     canonical="https://www.shortselect.com/produkt/analytics"
api.astro:25           canonical="https://www.shortselect.com/produkt/api"
ats-crm.astro:48       canonical="https://www.shortselect.com/produkt/ats-crm"
automatisierung.astro:17  canonical="https://www.shortselect.com/produkt/automatisierung"
client-portal.astro:24 canonical="https://www.shortselect.com/produkt/client-portal"
compliance.astro:17    canonical="https://www.shortselect.com/produkt/compliance"
email-integration.astro:17 canonical="https://www.shortselect.com/produkt/email-integration"
interviews.astro:17    canonical="https://www.shortselect.com/produkt/interviews"
karriereseite.astro:41 canonical="https://www.shortselect.com/produkt/karriereseite"
ki-features.astro:56   canonical="https://www.shortselect.com/produkt/ki-features"
mobile.astro:17        canonical="https://www.shortselect.com/produkt/mobile"
multiposting.astro:17  canonical="https://www.shortselect.com/produkt/multiposting"
pipeline.astro:17      canonical="https://www.shortselect.com/produkt/pipeline"
talent-pools.astro:17  canonical="https://www.shortselect.com/produkt/talent-pools"
```

**Verifiziert live (curl):**
```
curl -sL https://www.shortselect.com/produkt/ats-crm/ | grep canonical
→ <link rel="canonical" href="https://www.shortselect.com/produkt/ats-crm">  ❌ ohne Slash
```

Die gelieferte URL hat einen Slash (weil CF redirected hat), der Canonical im HTML nicht — Google kann das als "self-referencing" ablehnen und eine andere URL als Canonical wählen.

**Fix-Option A (empfohlen):** Alle 14 canonical-Werte auf Trailing-Slash setzen (find/replace):
```bash
cd ~/shortselect/marketing
find src/pages/produkt -name "*.astro" -exec sed -i '' 's|canonical="https://www.shortselect.com/produkt/\([^"]*\)"|canonical="https://www.shortselect.com/produkt/\1/"|g' {} \;
```

**Fix-Option B (strukturell besser):** `canonical`-Prop aus den 14 Pages komplett entfernen und in `SEOHead.astro` die Fallback-Logik korrigieren, sodass `Astro.url.href` IMMER mit Trailing-Slash normalisiert wird:

```astro
<!-- src/components/seo/SEOHead.astro, Zeile 14 -->
const rawCanonical = Astro.props.canonical ?? Astro.url.href;
// Enforce trailing-slash convention (CF Pages redirects non-slash → slash)
const canonical = rawCanonical.endsWith('/')
  ? rawCanonical
  : (rawCanonical.includes('?') || /\.\w{2,5}$/.test(rawCanonical) ? rawCanonical : rawCanonical + '/');
```

**Empfehlung:** **Option B** + anschließend die 14 hardcodierten `canonical=`-Props entfernen (DRY). Snippet-Team editiert SEOHead.astro möglicherweise auch — Absprache via SendMessage bereits erfolgt.

**Prio:** P0

---

## 4. Trailing-Slash-Strategie — P0 (Config fehlt)

**Ist-Zustand:**
- `astro.config.mjs` hat **KEIN `trailingSlash`-Setting** → Astro-Default ist `'ignore'`
- CF Pages enforced trotzdem Trailing-Slash via 308-Redirects (plattform-seitig)
- Ergebnis: Konsistent nach außen, aber intern generieren Astro-Links manchmal ohne Slash (z.B. dynamische Routes aus `getStaticPaths`)

**Fix (`astro.config.mjs`):**
```js
export default defineConfig({
  site: 'https://www.shortselect.com',
  output: 'static',
  trailingSlash: 'always',  // ← NEU
  // ...
});
```

**Wirkung:**
- `Astro.url.href` liefert dann immer Trailing-Slash-Variante
- Build-System generiert intern `/produkt/ats-crm/index.html` (ist bereits so, aber explizit)
- SEOHead.astro `canonical = Astro.url.href` wäre dann automatisch korrekt (löst 14 produkt-Canonical-Issues ohne Einzel-Edits, wenn zusätzlich die hardcoded Props entfernt werden)

**Prio:** P0

---

## 5. Apex → www Redirect (FEHLT) — P0

**Symptom (verifiziert):**
```
curl -sI https://shortselect.com/            → HTTP/2 200 (served directly)
curl -sI https://www.shortselect.com/        → HTTP/2 200
curl -sI https://shortselect.com/glossar/recruiting-funnel/  → HTTP/2 200
```

**Das Problem:** Apex-Domain serviert identischen Content ohne Redirect. Google könnte jede URL doppelt indexieren (als apex und als www). Canonical-Tag zeigt zwar überall auf www (✅ verifiziert), aber Canonical ist nur ein Hint — ein sauberer **301-Redirect** ist das stärkere Signal.

**Fix — 2 Optionen:**

**Option A (Cloudflare Bulk-Redirect, robust):**
Im Cloudflare-Dashboard: `shortselect.com` Zone → Rules → Redirect Rules. Regel:
- If hostname equals `shortselect.com`
- Then 301 to `https://www.shortselect.com${request.uri}`
- Status: 301, Preserve Query String: On

**Option B (Cloudflare Pages Custom Domain):**
Wenn `shortselect.com` aktuell separat auf CF Pages gemountet ist → im Pages-Projekt `shortselect-marketing` die Custom Domain `shortselect.com` **entfernen** und in der Cloudflare-Zone einen **Redirect-Rule** hinzufügen (siehe A).

**Option C (fallback via `_redirects` — funktioniert NUR, wenn apex NICHT als Custom Domain gemountet ist):**
In `public/_redirects`:
```
# Apex-Domain auf www redirecten (nur wirksam wenn apex als Custom Domain im CF-Pages-Projekt eingetragen ist)
https://shortselect.com/*    https://www.shortselect.com/:splat    301!
```
Achtung: Cloudflare Pages `_redirects` unterstützt host-basierte Redirects (seit Mai 2024) — das Exclamation-Mark erzwingt auch auf existierende Pfade. **Verifikation nach Deploy mit curl**.

**Empfehlung:** **Option A (Cloudflare Redirect Rules)** — entkoppelt vom Pages-Projekt, kein Deploy nötig, Lifetime-Setup.

**Abhängigkeit:** Prüfen was aktuell in CF-Pages `shortselect-marketing` als Custom Domain gesetzt ist. Vermutlich sind sowohl `shortselect.com` als auch `www.shortselect.com` beide als Custom Domain gemountet (deshalb antworten beide 200). Beim Umbau: apex als Custom Domain entfernen, dann Redirect-Rule aktivieren.

**Prio:** P0

---

## 6. `_redirects` — aktuell minimal

**Pfad:** `public/_redirects`
**Inhalt:**
```
/sitemap.xml /sitemap-index.xml 301
```

**Bewertung:** Funktioniert, aber minimal. Nach P0-Fixes (apex→www) ggf. ausbauen:

```
# Sitemap-Alias
/sitemap.xml  /sitemap-index.xml  301

# Apex → www (nur aktiv wenn apex als CF-Pages-Custom-Domain eingetragen — siehe Fix #5)
# https://shortselect.com/*  https://www.shortselect.com/:splat  301!

# Alte URLs falls nötig (aktuell keine bekannt — nach GSC-Coverage-Report ggf. ergänzen)
# Beispiel:
# /glossary/*  /glossar/:splat  301
# /pricing     /preise          301
```

**Prio:** P2 (nach P0-Fixes evaluieren, welche alten URLs in GSC auftauchen und 404en)

---

## 6b. Breadcrumb-Parent-URLs existieren nicht (P0 — verifiziert nach Heads-up von snippet-seo-researcher)

**Problem:** 5 Layouts generieren BreadcrumbList-Schema mit Parent-URLs, die 404 liefern.

**Live-verifiziert (curl 2026-04-22):**
```
/vergleich/      → 404   (aber 13 Unterseiten in src/pages/vergleich/*.astro)
/fuer/           → 404   (6 Unterseiten)
/produkt/        → 404   (14 Unterseiten)
/branchen/       → 404   (7 Unterseiten)
/methode/        → 404   (5 Unterseiten + playbook/)
/integrationen/  → 200   OK (index.astro existiert)
```

**Code-Stellen mit fehlerhaftem Breadcrumb (alle in `src/layouts/`):**
- `VergleichLayout.astro` — `{ position: 2, name: "Vergleich", item: "https://www.shortselect.com/vergleich/" }`
- `LoesungLayout.astro` — `{ position: 2, name: "Lösungen", item: "https://www.shortselect.com/fuer/" }`
- `ProduktLayout.astro` — `{ position: 2, name: "Produkt", item: "https://www.shortselect.com/produkt/" }`
- `BrancheLayout.astro` — `{ position: 2, name: "Branchen", item: "https://www.shortselect.com/branchen/" }`
- `MethodeLayout.astro` — `{ position: 2, name: "Methode", item: "https://www.shortselect.com/methode/" }`

**Impact:**
- Google crawlt Breadcrumb-Items zur Verifikation. 404 auf Parent-URL → Breadcrumb-Rich-Snippet wird NICHT in der SERP gerendert
- Betroffen: ~45 Seiten (13 vergleich + 6 fuer + 14 produkt + 7 branchen + 5 methode)
- Integrationen-Layout ist nicht betroffen (Parent-URL existiert)

**Fix — 2 Optionen:**

**Option A (empfohlen, nachhaltig): Index-Seiten für jeden Cluster erstellen**

Landing-Hubs für jede Kategorie bauen. Diese sind auch SEO-wertvoll (Kategorie-Keywords wie "ATS Software Vergleich" können hier ranken, plus interne Link-Autorität für Unterseiten).

Dateien anlegen:
```
src/pages/vergleich/index.astro   — Hub: "ATS Vergleiche — ShortSelect vs. 13 Konkurrenten"
src/pages/fuer/index.astro        — Hub: "Lösungen nach Zielgruppe"
src/pages/produkt/index.astro     — Hub: "Alle Produkt-Features im Überblick"
src/pages/branchen/index.astro    — Hub: "Recruiting-Software nach Branche"
src/pages/methode/index.astro     — Hub: "ShortSelect Methode: Smart Recruiting"
```

Content-Researcher-Team (`content-seo-researcher`) kann hier ansetzen — Hub-Pages sind auch Content-Cluster-wertvoll. Starten mit minimalem Template (Hero + Links zu allen Unterseiten + CTA).

**Option B (Quick-Fix): Parent-Item aus Breadcrumb entfernen**

Wenn keine Index-Seiten gewünscht:
```astro
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.shortselect.com/" },
    // Parent-Item entfernt, weil /vergleich/ nicht existiert
    { "@type": "ListItem", "position": 2, "name": title }
  ]
};
```

**Empfehlung (nach Content-Abstimmung mit `content-seo-researcher`):**

Das 404-Problem ist ein P0-Ship-Blocker. Die Fix-Strategie hängt von der Sprint-Kapazität ab:

| Strategie | Aufwand | Ergebnis |
|-----------|---------|----------|
| **Option A (empfohlen)** — 5 richtige Hub-Pages mit CollectionPage-Schema, H1+Primary-Keyword, 150-250-Wort-Topical-Einleitung, Übersichts-Grid zu allen Children, 3-5 FAQ | ~1 Woche Content-Arbeit | Breadcrumb-Fix + 5 neue ranking-faehige Pages ("ATS Software Vergleich", "Recruiting Software fuer [Persona]", etc.). ~45 interne Backlinks landen endlich auf echten Seiten statt 404. |
| **Option B (Quick-Fix)** — Parent-Item aus BreadcrumbList in 5 Layouts entfernen | 15 Min | Breadcrumb-Rich-Snippet wieder aktiv, aber die 5 Kategorie-Keyword-Chancen bleiben liegen |

Content-SEO-Research hat Hub-Pages als P1 eingeplant (docs/seo/research-findings-content.md Section 9b mit vollem Content-Framework). Team-lead entscheidet Sprint 1 vs. Sprint 2.

**Empfehlung:** Option A falls Sprint-Kapazität für ~1 Woche Content-Arbeit vorhanden. Falls nicht, Option B sofort (verhindert Rich-Snippet-Verlust) + Option A als Sprint-2-Task nachziehen.

**Abhängigkeit:** `content-seo-researcher` liefert Hub-Page-Content-Framework (CollectionPage-Schema, FAQ, Hero-Copy).

**Prio:** P0 Ship-Blocker (Option B muss spätestens, Option A bevorzugt)

---

## 6c. Broken Internal Links — Umlaut-Slug `/methode/auswählen` (P0 — verifiziert nach Heads-up von audit-seo-researcher)

**Problem:** 4 interne Links zeigen auf `/methode/auswählen` (mit Umlaut). Die tatsächliche Datei ist aber `src/pages/methode/auswaehlen.astro` (ASCII-Slug, konform zur CLAUDE.md-Regel "Dateinamen ASCII, UI-Texte Umlaute").

**Live-verifiziert (curl 2026-04-22):**
```
https://www.shortselect.com/methode/auswählen/   → HTTP/2 404
https://www.shortselect.com/methode/auswaehlen/  → HTTP/2 200  OK
```

**Betroffene Code-Stellen:**
```
src/pages/ressourcen.astro:21
  { label: "Auswählen", to: "/methode/auswählen" }

src/pages/methode/binden.astro:16
  { title: "Auswählen", link: "/methode/auswählen" }

src/pages/methode/smart-recruiting.astro:14
  { number: 2, title: "Auswählen", description: "...", link: "/methode/auswählen", color: "accent" }

src/pages/methode/anziehen.astro:108
  <a href="/methode/auswählen" class="...">
```

**Root-Cause:** Entwickler hat anstelle des ASCII-Slugs den Anzeige-Namen (mit Umlaut) als URL verwendet. Label/Title (sichtbarer Text) darf und muss Umlaute haben — der URL-Pfad muss aber den Datei-Slug matchen.

**Fix (4 separate Edits, jeweils nur der Link-Wert):**
```
ressourcen.astro:21        to:   "/methode/auswählen" → "/methode/auswaehlen"
binden.astro:16            link: "/methode/auswählen" → "/methode/auswaehlen"
smart-recruiting.astro:14  link: "/methode/auswählen" → "/methode/auswaehlen"
anziehen.astro:108         href: "/methode/auswählen" → "/methode/auswaehlen"
```

**Labels (`title: "Auswählen"`, `label: "Auswählen"`) NICHT ändern** — das sind sichtbare UI-Texte, Umlaut beibehalten.

**Impact:**
- 4 broken internal links → PageRank-Leak (interne Link-Autorität verpufft in 404)
- Google-Crawler folgt 404 → Crawl-Budget verschwendet
- User-Experience: "Auswählen"-Link in Navi landet auf 404

**Prio:** P0 (Ship-Blocker — einfachster Fix, maximaler Impact)

---

## 7. Core Schema in MarketingLayout — P1

**Aktueller Zustand (`src/layouts/MarketingLayout.astro` Zeilen 18-32):**

```js
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.shortselect.com/#organization",
  name: "ShortSelect",
  url: "https://www.shortselect.com",
  logo: { "@type": "ImageObject", url: "https://www.shortselect.com/logo.svg" },
  description: "KI-gestützte Recruiting Software und ATS für moderne Teams",
  contactPoint: { ... email/German/English ... },
};
```

**Fehlend:**
1. **`sameAs`** — keine Social-Profile verknüpft. Hilft für Knowledge-Panel.
2. **`WebSite`-Schema mit `SearchAction`** — nicht vorhanden. Ermöglicht Sitelinks-Searchbox in Google.
3. **`address`** + **`foundingDate`** + **`founder`** — keine Pflicht, aber stärkt Entity-Recognition.

**Fix-Snippet (`src/layouts/MarketingLayout.astro` — Zeile 18 orgSchema erweitern + WebSite-Schema hinzufügen):**

```js
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.shortselect.com/#organization",
  name: "ShortSelect",
  alternateName: "ShortSelect ATS",
  url: "https://www.shortselect.com",
  logo: { "@type": "ImageObject", url: "https://www.shortselect.com/logo.svg" },
  description: "KI-gestützte Recruiting Software und ATS für moderne Teams",
  foundingDate: "2025",
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@shortselect.com",
    contactType: "Customer Service",
    availableLanguage: ["German", "English"],
  },
  sameAs: [
    "https://linkedin.com/company/shortselect",
    // Wert verifiziert von audit-seo-researcher aus src/components/footer/LandingFooter.astro
    // (ohne `www.` — genau so wie im Footer). Weitere Profile (X, YouTube, Xing) aktuell nicht im Code referenziert.
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.shortselect.com/#website",
  url: "https://www.shortselect.com",
  name: "ShortSelect",
  description: "KI-Recruiting Software & ATS",
  inLanguage: "de-DE",
  publisher: { "@id": "https://www.shortselect.com/#organization" },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.shortselect.com/blog/?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};
```

Dann in `<SEOHead>` beide durchreichen:
```astro
<SEOHead {...props} jsonLd={props.jsonLd
  ? [orgSchema, websiteSchema, ...(Array.isArray(props.jsonLd) ? props.jsonLd : [props.jsonLd])]
  : [orgSchema, websiteSchema]}
/>
```

**Wichtig:** SearchAction funktioniert nur, wenn `/blog/?q=XYZ` tatsächlich eine Volltextsuche liefert. Aktuell gibt es nur statisches Blog-Paging — dann SearchAction entweder auf das App-Dashboard (`https://app.shortselect.com/search?q=...`) zeigen oder komplett weglassen.

**Empfehlung:** sameAs + WebSite-Schema OHNE SearchAction (solange keine On-Site-Suche existiert).

**Prio:** P1

**Abhängigkeit:** `audit-seo-researcher` macht Schema-Coverage-Matrix — Heads-up bereits gesendet.

---

## 8. HTTP Headers (Security) — P1

**Ist-Zustand (`public/_headers` + live-curl):**
```
X-Content-Type-Options: nosniff   ✅
Referrer-Policy: strict-origin-when-cross-origin   ✅
```

**Fehlend:**
- ❌ `Strict-Transport-Security` (HSTS)
- ❌ `X-Frame-Options` (Clickjacking)
- ❌ `Permissions-Policy`
- ❌ `Content-Security-Policy` (optional — aber bei fehlender Nonce-Infrastruktur komplex)

**Fix (`public/_headers`):**
```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  X-XSS-Protection: 0
```

**Achtung bei HSTS-preload:** Domain muss Voraussetzungen erfüllen (HTTPS auf allen Subdomains, max-age ≥ 31536000). Einmal preload submitted → 6-12 Monate Rückbau nötig falls Fehler. Zuerst **ohne `preload`** testen, dann nach 4 Wochen stabilem Betrieb preload-Submit via https://hstspreload.org.

**CSP (optional, P2):** Inline-Scripts + Google Fonts + CF-Analytics + Embed-Widget machen CSP komplex. Wenn der User Bedarf hat, separate Sprint-Task.

**Prio:** P1

**Impact:** Verbessert Mozilla-Observatory-Score (aktuell ~C/D auf A/A+), AI-Bots werten HTTPS-Härtung positiv (Brand-Trust-Signal).

---

## 9. Cloudflare Pages — Bulk Redirects / Page Rules Verfügbarkeit

**Gefundene Mechanismen:**
1. `public/_redirects` — Netlify-Style-Syntax, funktioniert für Pages-Projekte
2. Cloudflare Zone: **Redirect Rules** (Dashboard → [domain] → Rules → Redirect Rules) — host-übergreifend
3. Cloudflare Zone: **Bulk Redirects** (bei großen Mengen >100)
4. Page Rules sind **deprecated** seit 2024 — nicht mehr neu anlegen, stattdessen "Redirect Rules"

**Empfehlung für dieses Projekt:**
- `_redirects` für Path-basierte Redirects innerhalb derselben Host (z.B. `/pricing → /preise`)
- **Redirect Rules** (Dashboard) für Host-Level-Redirects (apex → www, siehe Fix #5)
- Bulk Redirects aktuell nicht nötig (nur 1 Host-Redirect)

**Aktions-Item für Super-Admin (Yusuf):** Cloudflare-Dashboard `shortselect.com` → Rules → Redirect Rules. Neue Rule: "apex to www" mit 301. **Kein Code-Deploy nötig.**

**Prio:** P0 (depends on Fix #5)

---

## 10. Core Web Vitals / Performance — P1 (nicht tief geprüft, aber Red Flags)

**Aus Code-Review:**

### LCP-Risiken
- `SEOHead.astro` Zeile 65-67: Google Fonts (Poppins + Inter, 8 weights) werden per async `<link>` mit `onload` hack geladen. Nicht render-blocking (gut), aber:
  - Kein `font-display: swap` im CSS garantiert (hängt von Google-Fonts-Default ab — ist per default `swap` bei `&display=swap` query, ✅ verifiziert in URL)
  - **8 font-weights auf einmal** — overkill. Meist nur 400/500/600/700 gebraucht.
- Kein `<link rel="preload">` für Hero-Image auf Homepage (aber: Landing-Seiten nutzen CSS-Gradients als Hero-Background, kein echtes Bild → vermutlich nicht LCP-Bottleneck)

### CLS-Risiken
- `<img src="/logo.svg" alt="ShortSelect" class="h-8">` in `LandingNav.astro` — **ohne width/height** → CLS-Risiko (svg ist intrinsisch, aber Browser warten auf Load)
- Lucide-React-Icons werden als SVG gerendert — diese sind inline und nicht Network-abhängig ✅

### JS-Bundle
- React 19 + lucide-react werden als Islands gerendert — Astro packt nur geladene Islands, Overhead minimal
- Verified: Nav ist reines Astro-HTML (nicht React) — gut für initialen Paint

### Fix-Snippets

**(a) Font-Weights reduzieren (`src/components/seo/SEOHead.astro` Zeile 65-67):**
```astro
<!-- vorher: &family=Poppins:wght@400;500;600;700;800 → 5 weights -->
<!-- nachher: nur Bold (700) und Heavy (800) für Display + Regular (400) / Medium (500) für Inter -->
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" />
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" media="print" onload="this.media='all'" />
```
Ersparnis: ~40 KB Font-Daten (2 weights weniger).

**(b) Logo-Dimensions (`src/components/nav/LandingNav.astro`):**
```astro
<img src="/logo.svg" alt="ShortSelect" width="140" height="32" class="h-8" />
```

**(c) OG-Image Pre-Check:** `public/og-image.png` sollte 1200×630 px sein. Falls nicht → Social-Sharing-Preview bricht.

**Prio:** P1

**Abhängigkeit:** Vollständige Lighthouse-Analyse würde Audit-Team (Task #4) übernehmen.

---

## 11. hreflang — nicht nötig (DE-only Site)

Site läuft nur auf Deutsch (`<html lang="de">`, `og:locale=de_DE`, `availableLanguage: ["German", "English"]` ist nur Contact-Point-Info). Kein Multi-Language-Setup → hreflang nicht anwendbar. Wenn später EN-Version kommt, Separat-Sprint.

**Prio:** N/A

---

## Dependencies / Koordinations-Matrix

| Fix | Betrifft | Zuständigkeit | Koordination |
|-----|----------|---------------|--------------|
| #3 Canonical (SEOHead.astro) | Tech-SEO + Snippet-SEO | **Tech** implementiert | Heads-up an snippet-seo-researcher gesendet ✅ |
| #7 Schema (MarketingLayout) | Tech-SEO + Audit-Team | **Tech** implementiert Core-Schema | Heads-up an audit-seo-researcher gesendet ✅ (Coverage-Matrix) |
| #10 Perf (Fonts, Logo) | Tech-SEO + Audit-Team | **Audit** macht Lighthouse-Run, **Tech** implementiert | Nach Audit-Findings |
| #5 Apex-Redirect | Infra-Config | **User (Yusuf) via CF-Dashboard** | Kein Code-Change möglich |

---

## Priorisierte Fix-Liste (ausführbar)

### P0 (sofort, nicht delegierbar)
1. **`astro.config.mjs`** — `trailingSlash: 'always'` hinzufügen (1 Zeile)
2. **`src/components/seo/SEOHead.astro`** — Canonical-Normalisierung (Trailing-Slash enforcen)
3. **`src/pages/produkt/*.astro`** (14 Dateien) — `canonical=` entweder entfernen (wenn SEOHead-Fallback robust ist) oder Slash anhängen
4. **Cloudflare-Dashboard** (manuell, Yusuf) — apex→www Redirect Rule
5. **5 Hub-Pages anlegen** (oder Breadcrumb-Parent aus 5 Layouts entfernen): `src/pages/vergleich/index.astro`, `fuer/index.astro`, `produkt/index.astro`, `branchen/index.astro`, `methode/index.astro` — behebt 404-Breadcrumb-Parents
6. **4 Umlaut-Slug-Links fixen** (`/methode/auswählen` → `/methode/auswaehlen`): ressourcen.astro:21, methode/binden.astro:16, methode/smart-recruiting.astro:14, methode/anziehen.astro:108

### P1 (Woche 1)
5. **`src/layouts/MarketingLayout.astro`** — sameAs-Links + WebSite-Schema
6. **`public/_headers`** — HSTS, X-Frame-Options, Permissions-Policy
7. **`src/components/seo/SEOHead.astro`** — Font-Weights reduzieren (Poppins nur 600/700/800, Inter nur 400/500/600)
8. **`src/components/nav/LandingNav.astro`** — Logo mit explizitem width/height

### P2 (Woche 2-3, nice-to-have)
9. **`public/robots.txt`** — Bingbot/Applebot/CCBot explizit + Sitemap-Duplikat entfernen
10. **`astro.config.mjs`** — `sitemap()` mit priority/changefreq/lastmod
11. **`public/_redirects`** — nach GSC-404-Report evaluieren

---

## Verifizierung nach Deploy

Nach P0-Fixes diese curl-Tests laufen lassen:

```bash
# Apex-Redirect prüfen
curl -sI https://shortselect.com/ | grep -E "HTTP|location"
# Erwartet: HTTP/2 301 + location: https://www.shortselect.com/

# Canonical-Konsistenz prüfen
curl -sL https://www.shortselect.com/produkt/ats-crm/ | grep -oE '<link rel="canonical"[^>]*>'
# Erwartet: href="https://www.shortselect.com/produkt/ats-crm/"

# Security Headers
curl -sI https://www.shortselect.com/ | grep -iE "strict-transport|x-frame|permissions-policy"
# Erwartet: alle drei vorhanden
```

Zusätzlich in GSC nach 3-7 Tagen prüfen: "Duplicate without user-selected canonical"-Meldungen für glossar/* sollten verschwinden.

---

## Offene Fragen / Annahmen

1. **Apex-Domain-Setup:** Annahme, dass sowohl apex als auch www als Custom Domain im CF-Pages-Projekt gemountet sind (beide antworten 200 auf gleichen Content). Yusuf sollte im Dashboard prüfen und ggf. apex-Custom-Domain entfernen bevor Redirect Rule aktiviert wird.
2. **Social-Profile-URLs:** sameAs-Array enthält LinkedIn (`https://linkedin.com/company/shortselect`), verifiziert von audit-seo-researcher aus `src/components/footer/LandingFooter.astro`. Erweiterung um X/YouTube/Xing nur wenn Profile real existieren — Yusuf bestätigt.
3. **Foundation-Date:** "2025" im Schema-Snippet angenommen — falls anders, korrigieren.
4. **SearchAction-Target:** Aktuell gibt es keine On-Site-Suche. SearchAction wurde auskommentiert / als optional markiert. Falls Blog-Suche später gebaut wird → aktivieren.
