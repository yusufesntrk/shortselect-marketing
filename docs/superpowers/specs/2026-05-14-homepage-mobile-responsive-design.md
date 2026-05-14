# Homepage Mobile-Responsive Fix — Design

**Datum:** 2026-05-14
**Repo:** `yusufesntrk/shortselect-marketing`
**Branch (Ziel):** `fix/homepage-mobile-responsive`
**Scope:** Nur `src/pages/index.astro` (Marketing-Homepage, „cinematic redesign")
**Approach:** Punktuelle `@media (max-width: …)` Override-Blöcke (Minimal-Eingriff)

---

## 1. Problem

Die Homepage `src/pages/index.astro` ist 3874 Zeilen lang, enthält 314 custom `.fc-*` CSS-Klassen mit hardcoded Pixel-Werten und hat nur **2 `@media`-Breakpoints** für die gesamte Seite. Der cinematic redesign vom 2026-05-07 (`ffb923b`) wurde Desktop-First gebaut. Konsequenz: Auf Mobile-Devices (iPhone, Android) ist die Seite unbenutzbar — 3- und 6-spaltige Grids quetschen sich auf 375 px Viewport, H1 mit `font-size: 60px` überläuft, Nav-Dropdowns sind mit `min-width: 340px` breiter als der Bildschirm vieler Phones.

Viewport-Meta-Tag (`width=device-width, initial-scale=1.0`) ist gesetzt — Problem liegt 100 % im CSS.

Andere Marketing-Seiten (preise, kunden, ueber-uns, branchen/*, methode/*) verwenden Tailwind-Utilities mit `md:`/`lg:`-Prefixes und sind grundsätzlich responsive — sie sind nicht Teil dieses Fixes.

## 2. Ziel

Die Homepage funktioniert sauber und ansprechend auf Mobile-Devices ab **375 px Breite** (iPhone SE). Desktop-Optik bleibt **pixel-identisch**. Implementierung minimal-invasiv: zusätzliche `@media`-Override-Blöcke pro Sektion, keine Umstellung des bestehenden CSS-Systems.

## 3. Nicht-Ziele (Scope-Fence)

- Migration des `.fc-*` Custom-CSS auf Tailwind-Utilities → eigene Initiative
- Andere Marketing-Seiten (außer Homepage) → kein Fix in diesem Spec
- Performance-Refactors (Service-Worker, AVIF, Critical-CSS) → separat
- Astro View-Transitions → separat
- Bild-Optimierung über das hinaus, was beim Audit auffällt → separat

## 4. Breakpoint-Strategie

Zwei Mobile-Override-Stufen (Desktop bleibt Default):

| Breakpoint | Trigger | Zweck |
|---|---|---|
| `@media (max-width: 768px)` | Tablet & Mobile | Haupt-Refactor: Grids stapeln, Nav → Hamburger, Padding/Gaps reduziert |
| `@media (max-width: 480px)` | Klein-Mobile (iPhone SE 375, Android-Median 360, iPhone 15 Pro 393) | Weitere Font-Reduktion, Deko ausblenden |
| `@media (prefers-reduced-motion: reduce)` | A11y | Bereits vorhanden in `.abs-*` Block — ggf. um Hero-Floats erweitern |

Tablet-Landscape (1024 px) ist nicht eigener Breakpoint — Desktop-Layout funktioniert dort.

## 5. Per-Section Mobile-Treatments

### 5.1 Nav (`.fc-nav`)
- Desktop-Top-Level-Links + Dropdowns: `display: none` ab ≤768
- Hamburger-Button (3-Linien-Icon): nur ≤768 sichtbar
- CTA-Button: sichtbar, kompakter Text („Demo" statt „Demo buchen")
- Nav-Höhe: 64 → 56 px
- Detail: siehe Abschnitt 6 (Hamburger-Overlay)

### 5.2 Hero (`.fc-hero`)
- H1: `60px` → `36px` (≤768), `30px` (≤480)
- Subline: `19px` → `16px`, `max-width: 100%`
- CTA-Buttons: `flex-direction: column`, `width: 100%`, gap 12 px
- `.fc-hero-glow` (900 × 900 Blur-Kugel): `display: none` ab ≤768
- Floating Dots `d1`–`d4`: opacity 0.3 (≤768), `display: none` (≤480)
- Background-Grid: opacity 0.5 (≤768), `display: none` (≤480)
- Container-Padding: `0 32px` → `0 20px` (≤768) → `0 16px` (≤480)
- `max-width: 820px` bleibt, beschränkt nur Desktop

### 5.3 „So funktioniert's" Cards (`.fc-how-cards`)
- `grid-template-columns: repeat(3, 1fr)` → `1fr` ab ≤768
- Gap: `20px` → `16px`
- Card-Innen-Padding reduziert
- `padding: 0 32px` → `0 16px`

### 5.4 Bento-Grid (`.fc-bento`) — kritischste Sektion
- `grid-template-columns: repeat(6, 1fr)` → `1fr` ab ≤768
- `grid-auto-rows: 220px` → `auto`
- Alle einzelnen Bento-Cards (Heading-Card, Feature-Cards) behalten ihre Span-Definitionen für Desktop; auf Mobile spielt das keine Rolle, da nur 1 Spalte
- Card-Padding intern reduziert
- Spezialeffekte (Hover-Glows, Border-Gradients) bleiben — sind CSS-only, kein Mobile-Impact
- **Alle Bento-Cards bleiben sichtbar** — keine versteckten Inhalte

### 5.5 Stats-Grid (`.fc-stats-grid`)
- `repeat(3, 1fr)` → `1fr` ab ≤768
- ≤480: Padding stärker reduziert, Stats zentriert

### 5.6 Agents-vs-Features (`.fc-avf-*`)
- `1fr 1fr` → `1fr` ab ≤768
- Vergleichs-Cards stapeln vertikal
- Optionaler Trennlinien-Connector zwischen den Cards: `display: none` ≤768

### 5.7 AI-Features (`.fc-ai-*`)
- `repeat(3, 1fr)` → `1fr` ab ≤768
- Icons + Headlines bleiben
- Card-Padding reduziert

### 5.8 Testimonials (`.fc-testi-*`)
- `repeat(3, 1fr)` → `1fr` ab ≤768
- Stapeln (kein Karussell — Approach 1 minimal-eingriff)
- Padding reduziert

### 5.9 Sourcing-Showcase (`.abs-*`)
- Existierender Block `@media (max-width: 880px)` bleibt + erweitert:
  - `.abs-main-row`: `1fr 320px` → `1fr` ✓ existiert
  - `.abs-plat-bar`: `repeat(4, 1fr)` → `repeat(2, 1fr)` ✓ existiert
  - `.abs-head h2`: 36 px ✓ existiert
- Zusätzlich ≤480:
  - Animierte Pipeline + Score-Stamp: `transform: scale(0.85)` für Fit
  - Card-Padding der Plattform-Bar weiter reduziert
- `prefers-reduced-motion`-Block bleibt unverändert

### 5.10 CTA-Section (`.fc-cta`)
- Padding: `120px 32px` → `60px 16px`
- H2: `48px` → `28px`
- Buttons: `flex-direction: column`, `width: 100%`

### 5.11 FAQ (`.fc-faq-*`)
- Beim Bauen verifizieren — vermutlich nur Padding-Reduce nötig
- Falls Accordion-Items zu eng: Padding reduzieren

### 5.12 Footer (`LandingFooter.astro`)
- Komponente nutzt bereits Tailwind mit Breakpoints
- Quick-Verify; ggf. Mini-Touch-Up am Spacing
- Nicht Teil des Inline-CSS-Refactors

## 6. Hamburger Nav (Full-Screen Overlay)

### Trigger & Sichtbarkeit
- Hamburger-Icon: nur sichtbar ≤768 px
- Desktop-Nav-Links: nur sichtbar >768 px
- CTA-Button: bleibt in Top-Bar sichtbar (kompakt)

### Overlay-Verhalten
- Klick auf Hamburger → Full-Screen-Overlay slidet von rechts ein
- `position: fixed; inset: 0; z-index: 100`
- `background: rgba(255,255,255,0.98)` mit `backdrop-filter: blur(12px)`
- Slide-Animation: `transform: translateX(100%)` → `translateX(0)` mit `transition: transform 280ms cubic-bezier(0.32, 0.72, 0, 1)`
- Close-Icon (X) oben rechts
- Body-Scroll-Lock: `document.body.style.overflow = 'hidden'` während Overlay offen
- ESC-Key schließt Overlay
- Klick auf Submenu-Link: schließt Overlay explizit, dann navigiert (sauberer Statewechsel)

### Inhalts-Struktur
```
┌────────────────────────────┐
│ [Logo]              [✕]    │  Header (sticky top)
├────────────────────────────┤
│ Produkt              [v]   │  Accordion-Group
│   → ATS & CRM              │
│   → Karriereseite          │
│   → KI-Agenten             │
│                            │
│ Methode              [v]   │
│   → Anziehen / Auswählen…  │
│                            │
│ Branchen             [v]   │
│ Lösungen             [v]   │
│ Vergleich            [v]   │
│ Preise                     │  einfacher Link
│ Kunden                     │
│ Über uns                   │
├────────────────────────────┤
│ [ Login ] [ Demo buchen ]  │  Footer (sticky bottom)
└────────────────────────────┘
```

### Accordion-Verhalten
- Klick auf Caret klappt ein Submenu auf, schließt andere geöffnete
- Animation: `max-height: 0` → `max-height: 600px` (ausreichend für längstes Submenu) mit `transition: max-height 240ms ease-out`
- Caret-Icon rotiert um 180°

### Content-Source
- Submenu-Inhalte werden 1:1 aus den existierenden Desktop-Dropdowns gespiegelt (selbe Links, selbe Beschreibungen)
- Kein neuer Content nötig — nur Re-Use existierender Markup-Daten

### Accessibility
- Hamburger-Button: `aria-expanded`, `aria-controls="mobile-nav-overlay"`, `aria-label="Menü öffnen"`
- Overlay: `role="dialog"`, `aria-modal="true"`
- Accordion-Buttons: `aria-expanded`, `aria-controls`
- Focus-Trap: minimal (Tab springt nicht aus Overlay heraus solange offen)
- Erste Focus-Position beim Öffnen: Close-Button
- Touch-Targets: alle Links/Buttons `min-height: 44px`

### Implementation
- Vanilla JS in `<script is:inline>` am Ende von `index.astro` (konsistent mit existierendem Pattern)
- Kein Framework-Import, kein zusätzliches JS-Bundle
- Markup im Overlay als zusätzlicher `<aside>`-Block am Ende des `<body>`, vor `<script>`-Tags
- CSS-Block für Mobile-Nav direkt nach `.fc-nav`-Block im existierenden `<style is:global>`

## 7. Performance & Animation-Reduktion auf Mobile

### Ausblenden ≤768
- `.fc-hero-glow` (900×900 Blur) — GPU-teuer, optisch kaum wirksam auf Mobile
- Floating-Dots dimmen (Opacity 0.3)
- Hero-Background-Grid auf 0.5 Opacity

### Ausblenden ≤480
- Floating-Dots komplett `display: none`
- Background-Grid komplett `display: none`

### Animationen behalten
- `animate-gradient-shift` (CTA-Hover) — bleibt, kein Loop
- Pulse am `.fc-pill` Dot — bleibt (klein, billig)
- Hero-H1-Underline-SVG — bleibt (One-Shot)
- Bento Hover-Glows — bleibt (Touch tappt → kurzer Effekt, OK)
- Sourcing-Pipeline-Animation — bleibt, `animation-duration` × 1.5 für weniger jank

### Touch-Targets
- Alle interaktiven Elemente: `min-height: 44px` (iOS HIG / WCAG AA)
- CTAs bereits ~56 px ✓
- Nav-Overlay-Links: `padding: 16px 24px`

### `prefers-reduced-motion`
- Existierender Block (`.abs-*` Animationen aus) bleibt
- Erweitern um Floating-Hero-Shapes für Konsistenz

### `will-change`
- Beim Bauen auditen: falls irgendwo permanent gesetzt ohne aktive Animation → entfernen (Memory-Bloat auf Low-End)

## 8. Testing & QA

### Baseline-Screenshots vor Implementation
Playwright-Screenshots (headless) der aktuellen Homepage in folgenden Viewports, gespeichert in `.playwright-tmp/baseline/`:

- `375 × 812` (iPhone SE / 13 mini — Worst-Case)
- `393 × 852` (iPhone 15 Pro — Median)
- `768 × 1024` (iPad portrait — Tablet-Schwelle)
- `1440 × 900` (Desktop — Regressions-Kontrolle)

Full-Page-Screenshots, JPG/PNG. Werden nach erfolgreichem Merge gelöscht.

### Iterative Visual Checks während Bauen
Nach jeder refactored Sektion (Hero, Nav, How-Cards, Bento, Stats, Avf, AI, Testimonials, Sourcing, CTA):
1. `npm run dev` Build durchlassen
2. Playwright-Screenshot der refactored Sektion in 375/393/768
3. Read-Tool auf das PNG, visuell prüfen vs. Erwartung
4. Bei Fehler: fix vor nächster Sektion (Connected Chain)

### Funktionale Mobile-Checks
- Nav-Overlay öffnen via Hamburger → Slide-In-Animation läuft sauber
- Nav-Overlay schließen via X-Button → Slide-Out
- Nav-Overlay schließen via ESC-Key → schließt
- Body-Scroll-Lock: bei offenem Overlay → kein Page-Scroll möglich
- Accordion auf-/zuklappen → max-height-Animation läuft, nur eines gleichzeitig offen
- Touch-Targets ≥ 44 px (DevTools-Mobile-Mode Audit)
- Horizontal-Overflow-Check: `document.body.scrollWidth ≤ window.innerWidth` für jeden Viewport
- Anchor-Links (`#features`, FAQ) springen korrekt — nicht durch sticky Nav verdeckt

### Desktop-Regressions-Check
Nach allen Fixes: Screenshot 1440 × 900 vs. Baseline-Desktop-Screenshot → erwartet pixel-identisch. Falls Diff: blocking, fixen.

### Build-Sanity
- `npm run build` läuft ohne Astro-Compile-Error, ohne CSS-Syntax-Error
- Dev-Server lokal sichten

### Real-Device-Spot-Check (nicht-blockierend)
Nach Cloudflare-Preview-Deploy: kurzer Sicht-Check auf echtem iPhone. Touch-Feel und iOS-Safari-Quirks (z. B. Safe-Area, `vh`-Bug) sieht man nur live.

## 9. Risiken & Mitigationen

| Risiko | Wahrscheinlichkeit | Mitigation |
|---|---|---|
| Desktop bricht durch `@media`-Block (z. B. wegen CSS-Specifity) | niedrig | Baseline-Desktop-Screenshot + Pixel-Vergleich nach jeder Sektion |
| Hamburger-Overlay-JS bricht im Astro-Build (z. B. wegen `is:inline` Hoisting) | mittel | Smoke-Test im `npm run dev` direkt nach JS-Hinzufügen |
| Touch-Devices triggern unbeabsichtigte `:hover`-States auf Bento-Cards | niedrig | Verifikation auf realem iOS, ggf. `@media (hover: hover)` Wrapper |
| Body-Scroll-Lock bricht iOS Safari (bekannter Bug) | mittel | Standard-Fix: `position: fixed` + `top: -scrollY` Pattern, falls nötig |
| `max-height`-Accordion-Animation jankig bei langem Submenu | niedrig | Fallback: einfaches `display: none/block` ohne Animation, falls jank sichtbar |

## 10. Out-of-Scope (für eigene Tickets)

- Tailwind-Migration der `.fc-*` Klassen → Eigenes Refactor-Ticket
- Audit der anderen Marketing-Seiten auf Mobile-Tauglichkeit → Folge-Audit-Ticket
- Performance-Initiativen (AVIF-Bilder, Critical-CSS, Service-Worker) → Separates Performance-Sprint
- A11y-Audit-Komplett (Screen-Reader-Test, Color-Contrast) → Separates A11y-Ticket
- Karussell-Variante für Mobile-Testimonials (UX-Verbesserung) → Backlog

## 11. Deployment

- Branch: `fix/homepage-mobile-responsive` im **Marketing-Repo** (`yusufesntrk/shortselect-marketing`)
- Commits in sinnvollen Sektions-Chunks (z. B. „Hero mobile", „Nav overlay", „Bento mobile") — nicht alle 3000 Zeilen in einem Commit
- PR-Body: vor/nach Screenshots der 4 Viewports
- Nach Merge: Cloudflare Pages baut automatisch
- Spot-Check auf echtem iPhone gegen `www.shortselect.com`

---

**Geschätzter Aufwand:** Eine fokussierte Session, ~3–5 Stunden Implementation + iteratives Screenshotting.
