# Homepage Mobile-Responsive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `src/pages/index.astro` (Marketing-Homepage) fully responsive on mobile devices (375 px – 768 px) without changing the Desktop appearance.

**Architecture:** Approach 1 — Minimal Eingriff. Alle Mobile-Anpassungen werden als zusätzliche `@media (max-width: 768px)` und `@media (max-width: 480px)` Override-Blöcke in einem konsolidierten Mobile-Block am Ende des bestehenden `<style is:global>` eingefügt. Desktop-CSS bleibt unverändert. Zusätzlich wird ein Hamburger-Menü mit Full-Screen-Overlay (Vanilla-JS, kein Framework) implementiert.

**Tech Stack:** Astro 6, Tailwind CSS 4 (für Komponenten — auf der Homepage ist nur das Inline-`<style is:global>` relevant), Vanilla JavaScript für Overlay-Interaktivität, Chrome Headless für Screenshot-basierte visuelle Checks.

**Repo:** `yusufesntrk/shortselect-marketing` (lokal: `~/shortselect/marketing/`) — **NICHT** project-spark!

**Spec Reference:** `docs/superpowers/specs/2026-05-14-homepage-mobile-responsive-design.md`

---

## File Structure

Es wird **genau eine Datei modifiziert**: `src/pages/index.astro`

Die Änderungen verteilen sich auf drei Abschnitte dieser Datei:

| Abschnitt | Aktuelle Zeilen | Was passiert |
|---|---|---|
| `<style is:global>` (vor `</style>` Zeile 2464) | bei Zeile ~2453 | Neuer "MOBILE OVERRIDES" Block wird inkrementell aufgebaut (Task 4–13) |
| Nav-Markup (`<nav class="fc-nav">` Zeile 2469–2552) | 2469–2552 | Hamburger-Button wird in `.fc-nav-right` eingefügt (Task 2) |
| Nach `</nav>` (Zeile 2553) | 2553 | Neuer `<aside id="mobile-nav-overlay">` Block wird eingefügt (Task 2) |
| `<script is:inline>` (Zeile 3518) | 3518–3873 | Hamburger-JS am Ende des bestehenden Script-Blocks angehängt (Task 3) |

**Reihenfolge der Tasks:** Erst Struktur (Branch, Baseline, Nav-HTML, Nav-JS), dann sektionsweise CSS-Mobile-Treatments von oben nach unten in der Seite. So baut sich das Mobile-Verhalten in nachvollziehbaren Schritten auf.

---

## Pre-Implementation Setup

**Working Directory für ALLE Tasks:** `~/shortselect/marketing/`

```bash
cd ~/shortselect/marketing
```

Falls du im falschen Repo bist (`project-spark`): SOFORT abbrechen.

---

### Task 1: Branch + Baseline-Screenshots

**Files:**
- Create: `.playwright-tmp/baseline/` (gitignored)

- [ ] **Step 1: Verify clean working tree**

```bash
cd ~/shortselect/marketing && git status
```

Expected: Clean tree on `main`, only untracked `mockup-sourcing.html` (existing). If dirty: stash or commit first.

- [ ] **Step 2: Create feature branch**

```bash
cd ~/shortselect/marketing && git checkout -b fix/homepage-mobile-responsive
```

Expected: `Switched to a new branch 'fix/homepage-mobile-responsive'`

- [ ] **Step 3: Ensure `.playwright-tmp` is gitignored**

```bash
cd ~/shortselect/marketing && grep -q "^\.playwright-tmp" .gitignore || echo ".playwright-tmp/" >> .gitignore
```

Then verify:
```bash
cd ~/shortselect/marketing && cat .gitignore
```

Expected: `.playwright-tmp/` is in the file.

- [ ] **Step 4: Start dev server in background**

```bash
cd ~/shortselect/marketing && npm run dev > /tmp/marketing-dev.log 2>&1 &
sleep 6
curl -sf http://localhost:4321/ > /dev/null && echo "Dev server up" || echo "FAIL"
```

Expected: `Dev server up`. If FAIL: check `/tmp/marketing-dev.log`.

- [ ] **Step 5: Create baseline screenshot directory**

```bash
mkdir -p ~/shortselect/marketing/.playwright-tmp/baseline
mkdir -p ~/shortselect/marketing/.playwright-tmp/after
```

- [ ] **Step 6: Take baseline screenshots for 4 viewports**

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE=~/shortselect/marketing/.playwright-tmp/baseline
URL="http://localhost:4321/"

"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --screenshot="$BASE/mobile-375.png" \
  --window-size=375,5000 --force-device-scale-factor=1 "$URL"

"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --screenshot="$BASE/mobile-393.png" \
  --window-size=393,5000 --force-device-scale-factor=1 "$URL"

"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --screenshot="$BASE/tablet-768.png" \
  --window-size=768,5000 --force-device-scale-factor=1 "$URL"

"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --screenshot="$BASE/desktop-1440.png" \
  --window-size=1440,3000 --force-device-scale-factor=1 "$URL"

ls -la "$BASE"
```

Expected: 4 PNG files, all > 100 KB.

- [ ] **Step 7: Visual sanity check of baseline-mobile**

Read the file using the Read tool: `~/shortselect/marketing/.playwright-tmp/baseline/mobile-375.png`

Confirm visually:
- Page renders (not blank)
- Layout is obviously broken (horizontal scroll, oversized H1, side-by-side grids on mobile) — this is the **expected** broken state
- Note: full-page-height screenshot captures everything including the long page

- [ ] **Step 8: Commit .gitignore change only**

```bash
cd ~/shortselect/marketing && git add .gitignore && git commit -m "chore: gitignore .playwright-tmp for visual diff screenshots"
```

Expected: 1 file changed.

---

### Task 2: Hamburger Markup + Mobile-Nav-Overlay HTML + Base CSS

**Files:**
- Modify: `src/pages/index.astro` (Nav-Markup + Style-Block)

**Goal:** Add the hamburger button, the mobile-nav-overlay aside-element, and the base CSS (no media-queries yet — those come in Task 4). After this task, hamburger + overlay exist in DOM and CSS, but are not interactive yet.

- [ ] **Step 1: Read current `.fc-nav-right` markup**

Use Read tool to inspect `~/shortselect/marketing/src/pages/index.astro` lines 2548–2555 to confirm current structure:

```html
        <div class="fc-nav-right">
          <a href="https://app.shortselect.com/login" class="nav-cta-ghost">Login</a>
          <a href="/demo" class="nav-cta-primary">Demo buchen</a>
        </div>
      </div>
    </nav>
```

- [ ] **Step 2: Insert hamburger button into `.fc-nav-right`**

Use the Edit tool. Find the existing `.fc-nav-right` block at line ~2548 and replace:

OLD:
```html
        <div class="fc-nav-right">
          <a href="https://app.shortselect.com/login" class="nav-cta-ghost">Login</a>
          <a href="/demo" class="nav-cta-primary">Demo buchen</a>
        </div>
```

NEW:
```html
        <div class="fc-nav-right">
          <a href="https://app.shortselect.com/login" class="nav-cta-ghost">Login</a>
          <a href="/demo" class="nav-cta-primary">Demo buchen</a>
          <button class="fc-nav-burger" type="button" aria-label="Menü öffnen" aria-expanded="false" aria-controls="mobile-nav-overlay">
            <span></span><span></span><span></span>
          </button>
        </div>
```

- [ ] **Step 3: Insert mobile-nav-overlay aside after `</nav>`**

Use the Edit tool. Locate the `</nav>` tag (line ~2553) right before the HERO section comment. Replace:

OLD:
```html
    </nav>

    <!-- HERO centered -->
```

NEW:
```html
    </nav>

    <!-- Mobile Nav Overlay (only visible <= 768px, controlled via JS) -->
    <aside id="mobile-nav-overlay" class="fc-mob-nav" hidden role="dialog" aria-modal="true" aria-label="Hauptmenü">
      <div class="fc-mob-nav-head">
        <a href="/" class="fc-mob-nav-logo">
          <span class="text-grad">ShortSelect</span>
        </a>
        <button class="fc-mob-nav-close" type="button" aria-label="Menü schließen">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <nav class="fc-mob-nav-body">
        <!-- Produkt -->
        <div class="fc-mob-acc">
          <button class="fc-mob-acc-trigger" type="button" aria-expanded="false">
            Produkt
            <svg class="fc-mob-acc-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="fc-mob-acc-panel">
            <a href="/produkt/ats-crm" class="fc-mob-link">ATS &amp; CRM</a>
            <a href="/produkt/karriereseite" class="fc-mob-link">Karriereseite</a>
            <a href="/produkt/ki-features" class="fc-mob-link">KI-Features</a>
            <a href="/produkt/automatisierung" class="fc-mob-link">Automatisierung</a>
            <a href="/produkt/multiposting" class="fc-mob-link">Multiposting</a>
            <a href="/produkt/compliance" class="fc-mob-link">DSGVO &amp; Compliance</a>
          </div>
        </div>

        <!-- Lösungen -->
        <div class="fc-mob-acc">
          <button class="fc-mob-acc-trigger" type="button" aria-expanded="false">
            Lösungen
            <svg class="fc-mob-acc-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="fc-mob-acc-panel">
            <a href="/fuer/personalvermittlung" class="fc-mob-link">Personalvermittlung</a>
            <a href="/fuer/startups" class="fc-mob-link">Startups</a>
            <a href="/fuer/enterprise" class="fc-mob-link">Enterprise</a>
            <a href="/branchen/it-recruiting" class="fc-mob-link">IT-Recruiting</a>
            <a href="/branchen/finance" class="fc-mob-link">Finance &amp; Banking</a>
            <a href="/branchen/healthcare" class="fc-mob-link">Healthcare</a>
          </div>
        </div>

        <!-- Vergleich -->
        <div class="fc-mob-acc">
          <button class="fc-mob-acc-trigger" type="button" aria-expanded="false">
            Vergleich
            <svg class="fc-mob-acc-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="fc-mob-acc-panel">
            <a href="/vergleich/shortselect-vs-personio" class="fc-mob-link">vs. Personio</a>
            <a href="/vergleich/shortselect-vs-softgarden" class="fc-mob-link">vs. Softgarden</a>
            <a href="/vergleich/shortselect-vs-bullhorn" class="fc-mob-link">vs. Bullhorn</a>
            <a href="/vergleich/shortselect-vs-greenhouse" class="fc-mob-link">vs. Greenhouse</a>
            <a href="/vergleich/shortselect-vs-vincere" class="fc-mob-link">vs. Vincere</a>
            <a href="/vergleich/shortselect-vs-teamtailor" class="fc-mob-link">vs. Teamtailor</a>
            <a href="/vergleich/beste-ats-software" class="fc-mob-link">Beste ATS 2026</a>
          </div>
        </div>

        <!-- Flat-Links -->
        <a href="/job-selling" class="fc-mob-link flat highlight">Sell the Job</a>
        <a href="/preise" class="fc-mob-link flat">Preise</a>
        <a href="/kunden" class="fc-mob-link flat">Kunden</a>
        <a href="/blog" class="fc-mob-link flat">Blog</a>
        <a href="/ressourcen" class="fc-mob-link flat">Ressourcen</a>
      </nav>

      <div class="fc-mob-nav-foot">
        <a href="https://app.shortselect.com/login" class="fc-mob-cta-ghost">Login</a>
        <a href="/demo" class="fc-mob-cta-primary">Demo buchen</a>
      </div>
    </aside>

    <!-- HERO centered -->
```

- [ ] **Step 4: Add base CSS for hamburger button + mobile-nav-overlay at end of `<style is:global>`**

Use Edit tool. Find `</style>` at line ~2464. Insert these styles immediately BEFORE the existing `@media (max-width: 880px)` block (which starts around line 2454). Locate the existing block:

```css
  @media (max-width: 880px) {
    .abs-main-row { grid-template-columns: 1fr; }
```

Replace OLD:
```css
  .abs-source-stepstone { background: #0073e6; }

  @media (max-width: 880px) {
```

NEW:
```css
  .abs-source-stepstone { background: #0073e6; }

  /* === HAMBURGER + MOBILE NAV OVERLAY (base styles, always loaded) === */
  .fc-nav-burger {
    display: none; /* hidden on desktop; shown via @media in Task 4 */
    background: transparent;
    border: 0;
    width: 44px;
    height: 44px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
    padding: 0;
    margin-left: 4px;
  }
  .fc-nav-burger span {
    display: block;
    width: 22px;
    height: 2px;
    background: #0a0a0e;
    border-radius: 2px;
    transition: transform 200ms ease, opacity 200ms ease;
  }

  .fc-mob-nav[hidden] { display: none; }
  .fc-mob-nav {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba(255,255,255,0.98);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    display: flex;
    flex-direction: column;
    transform: translateX(100%);
    transition: transform 280ms cubic-bezier(0.32, 0.72, 0, 1);
  }
  .fc-mob-nav.is-open { transform: translateX(0); }

  .fc-mob-nav-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    position: sticky;
    top: 0;
    background: rgba(255,255,255,0.98);
    z-index: 2;
  }
  .fc-mob-nav-logo {
    font-family: 'Poppins';
    font-weight: 700;
    font-size: 19px;
    letter-spacing: -0.03em;
    text-decoration: none;
  }
  .fc-mob-nav-close {
    background: transparent;
    border: 0;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #0a0a0e;
  }

  .fc-mob-nav-body {
    flex: 1;
    overflow-y: auto;
    padding: 12px 0;
  }
  .fc-mob-acc-trigger {
    width: 100%;
    background: transparent;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    font-size: 17px;
    font-weight: 600;
    color: #0a0a0e;
    cursor: pointer;
    font-family: inherit;
    text-align: left;
  }
  .fc-mob-acc-caret {
    transition: transform 200ms ease;
  }
  .fc-mob-acc-trigger[aria-expanded="true"] .fc-mob-acc-caret {
    transform: rotate(180deg);
  }
  .fc-mob-acc-panel {
    max-height: 0;
    overflow: hidden;
    transition: max-height 240ms ease-out;
  }
  .fc-mob-acc-panel.is-open {
    max-height: 600px;
  }
  .fc-mob-link {
    display: block;
    padding: 14px 40px;
    font-size: 15px;
    color: #525252;
    text-decoration: none;
    border-radius: 8px;
    transition: background 150ms ease;
    min-height: 44px;
  }
  .fc-mob-link:hover, .fc-mob-link:focus-visible {
    background: rgba(239,68,68,0.05);
    color: #ef4444;
  }
  .fc-mob-link.flat {
    padding: 16px 24px;
    font-size: 17px;
    font-weight: 600;
    color: #0a0a0e;
  }
  .fc-mob-link.flat.highlight {
    color: #ef4444;
  }

  .fc-mob-nav-foot {
    display: flex;
    gap: 10px;
    padding: 16px 20px;
    border-top: 1px solid rgba(0,0,0,0.06);
    position: sticky;
    bottom: 0;
    background: rgba(255,255,255,0.98);
  }
  .fc-mob-cta-ghost, .fc-mob-cta-primary {
    flex: 1;
    text-align: center;
    padding: 14px 16px;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 700;
    font-size: 15px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .fc-mob-cta-ghost {
    border: 2px solid rgba(0,0,0,0.1);
    color: #0a0a0e;
    background: transparent;
  }
  .fc-mob-cta-primary {
    background: #ef4444;
    color: white;
    box-shadow: 0 4px 0 #b91c1c;
  }

  body.no-scroll { overflow: hidden; }

  /* === MOBILE OVERRIDES (≤768px) — populated by subsequent tasks === */
  @media (max-width: 768px) {
    /* Tasks 4–13 add rules here */
  }

  /* === SMALL MOBILE OVERRIDES (≤480px) — populated by subsequent tasks === */
  @media (max-width: 480px) {
    /* Tasks 4–13 add rules here */
  }

  @media (max-width: 880px) {
```

- [ ] **Step 5: Run dev-server check (should still load without errors)**

```bash
sleep 2 && curl -sf http://localhost:4321/ > /dev/null && echo "OK" || echo "FAIL"
```

Expected: `OK`. If `FAIL`: check `/tmp/marketing-dev.log` for Astro compile errors.

- [ ] **Step 6: Take screenshot to verify nothing is visually broken on desktop**

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --screenshot=~/shortselect/marketing/.playwright-tmp/after/task2-desktop-1440.png \
  --window-size=1440,1200 --force-device-scale-factor=1 \
  "http://localhost:4321/"
```

Read the file `~/shortselect/marketing/.playwright-tmp/after/task2-desktop-1440.png` and confirm: Desktop nav looks identical to baseline. Hamburger NOT visible (hidden by default).

- [ ] **Step 7: Commit**

```bash
cd ~/shortselect/marketing && git add src/pages/index.astro && git commit -m "feat(homepage): hamburger button + mobile-nav-overlay markup + base CSS

Adds DOM/CSS structure for mobile nav. Not interactive yet (JS in next task).
Desktop unchanged — hamburger hidden by default."
```

Expected: 1 file changed, ~200 insertions.

---

### Task 3: Hamburger Nav JavaScript

**Files:**
- Modify: `src/pages/index.astro` (`<script is:inline>` block ends near line 3873; append before `</script>`)

**Goal:** Wire up the hamburger to open/close the overlay, ESC handler, body-scroll-lock, accordion toggle, focus management.

- [ ] **Step 1: Locate the end of the existing `<script is:inline>` block**

Use Bash to find the closing `</script>` tag for the existing script:

```bash
cd ~/shortselect/marketing && grep -nE "^  </script>" src/pages/index.astro 2>&1
```

Expected: returns a line near 3873.

- [ ] **Step 2: Append mobile-nav JS just before that `</script>`**

Use Edit tool. Find the last few lines before the script closer (read with Read tool first to get context, then use a unique anchor line). Replace OLD:

OLD (find the last line of existing script logic — likely an unrelated closer; you'll need to read lines 3860–3873 to confirm. Use a 3-line anchor from the actual file):

Strategy: Insert the new code immediately AFTER the last existing logic line and BEFORE `  </script>`. Read lines 3865–3874 first with the Read tool, then write an Edit using the last 2 existing lines + the new code as new_string.

Pseudo-example of the Edit pattern (adapt `LAST_TWO_LINES_VERBATIM` to whatever is actually there):

OLD:
```
LAST_TWO_LINES_VERBATIM
  </script>
```

NEW:
```
LAST_TWO_LINES_VERBATIM

  // === MOBILE NAV OVERLAY ===
  (function initMobileNav() {
    const burger = document.querySelector('.fc-nav-burger');
    const overlay = document.getElementById('mobile-nav-overlay');
    const closeBtn = overlay && overlay.querySelector('.fc-mob-nav-close');
    if (!burger || !overlay || !closeBtn) return;

    const accTriggers = overlay.querySelectorAll('.fc-mob-acc-trigger');

    function openOverlay() {
      overlay.removeAttribute('hidden');
      // Force reflow so transition runs from translateX(100%)
      // eslint-disable-next-line no-unused-expressions
      overlay.offsetHeight;
      overlay.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('no-scroll');
      // Focus the close button for a11y
      setTimeout(() => closeBtn.focus(), 50);
    }

    function closeOverlay() {
      overlay.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
      // Hide after transition finishes
      setTimeout(() => {
        overlay.setAttribute('hidden', '');
        // Collapse all accordions
        accTriggers.forEach(t => {
          t.setAttribute('aria-expanded', 'false');
          const panel = t.nextElementSibling;
          if (panel) panel.classList.remove('is-open');
        });
      }, 300);
    }

    burger.addEventListener('click', openOverlay);
    closeBtn.addEventListener('click', closeOverlay);

    // ESC key closes
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
        closeOverlay();
      }
    });

    // Accordion toggle (only one open at a time)
    accTriggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const isOpen = trigger.getAttribute('aria-expanded') === 'true';
        // Close all
        accTriggers.forEach((t) => {
          t.setAttribute('aria-expanded', 'false');
          const p = t.nextElementSibling;
          if (p) p.classList.remove('is-open');
        });
        // Open this one if it was closed
        if (!isOpen) {
          trigger.setAttribute('aria-expanded', 'true');
          const panel = trigger.nextElementSibling;
          if (panel) panel.classList.add('is-open');
        }
      });
    });

    // Submenu-link click closes overlay (clean state transition)
    overlay.querySelectorAll('.fc-mob-link').forEach((link) => {
      link.addEventListener('click', () => {
        // Don't preventDefault — let the navigation happen
        // Just close the overlay first
        closeOverlay();
      });
    });
  })();
  </script>
```

- [ ] **Step 3: Reload dev server and verify no JS console errors**

```bash
sleep 2 && curl -sf http://localhost:4321/ > /dev/null && echo "OK" || echo "FAIL"
```

Then in a browser (or via Playwright if set up), open `http://localhost:4321/` and check DevTools Console — should be **no errors**. If you have Playwright MCP, you can spawn:

```bash
# Quick console-error check via headless chrome with --enable-logging
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --enable-logging --v=1 --window-size=375,800 --force-device-scale-factor=1 \
  --screenshot=/tmp/console-test.png "http://localhost:4321/" 2>&1 | grep -iE "error|warning" | head -10
```

Expected: No Astro/JS errors. Some Chromium warnings (e.g. GPU) are OK.

- [ ] **Step 4: Verify hamburger is still hidden on desktop**

Take desktop screenshot:
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars \
  --screenshot=~/shortselect/marketing/.playwright-tmp/after/task3-desktop-1440.png \
  --window-size=1440,800 --force-device-scale-factor=1 "http://localhost:4321/"
```

Read the PNG. Expected: Nav looks identical to baseline-desktop-1440, NO hamburger visible.

- [ ] **Step 5: Commit**

```bash
cd ~/shortselect/marketing && git add src/pages/index.astro && git commit -m "feat(homepage): hamburger overlay JS (open/close, ESC, accordion, scroll-lock)"
```

---

### Task 4: Nav Mobile `@media (max-width: 768px)`

**Files:**
- Modify: `src/pages/index.astro` (inside the `MOBILE OVERRIDES (≤768px)` block from Task 2)

**Goal:** On `≤ 768px`: hide desktop nav-menu, show hamburger, compact CTA, reduce nav height.

- [ ] **Step 1: Find the empty `@media (max-width: 768px)` block from Task 2 and add nav-rules**

Use Edit tool. Find:

OLD:
```css
  /* === MOBILE OVERRIDES (≤768px) — populated by subsequent tasks === */
  @media (max-width: 768px) {
    /* Tasks 4–13 add rules here */
  }
```

NEW:
```css
  /* === MOBILE OVERRIDES (≤768px) — populated by subsequent tasks === */
  @media (max-width: 768px) {
    /* --- Nav --- */
    .fc-nav { padding: 12px 0; }
    .fc-nav-inner { padding: 0 16px; }
    .fc-nav-menu { display: none; }
    .fc-nav-burger { display: flex; }
    .fc-nav-right .nav-cta-ghost { display: none; }
    .fc-nav-right .nav-cta-primary {
      font-size: 13px;
      padding: 10px 16px;
    }
    /* Shorter CTA text on mobile via attr-trick: */
    .fc-nav-right .nav-cta-primary::before {
      content: 'Demo';
      display: none; /* default desktop — text comes from HTML */
    }
  }
```

Note: We keep the HTML text "Demo buchen" intact. For a truly compact mobile-CTA you'd swap text via `font-size` reduction or alternative approach. For this minimal-eingriff version, **just reducing font-size + padding** is sufficient.

Simpler alternative (drop the `::before` trick): use just the font-size/padding reduction.

Final NEW (cleaner):
```css
  /* === MOBILE OVERRIDES (≤768px) — populated by subsequent tasks === */
  @media (max-width: 768px) {
    /* --- Nav --- */
    .fc-nav { padding: 12px 0; }
    .fc-nav-inner { padding: 0 16px; }
    .fc-nav-menu { display: none; }
    .fc-nav-burger { display: flex; }
    .fc-nav-right { gap: 6px; }
    .fc-nav-right .nav-cta-ghost { display: none; }
    .fc-nav-right .nav-cta-primary {
      font-size: 13px;
      padding: 10px 14px;
    }
  }
```

- [ ] **Step 2: Take after-screenshot mobile-375**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars \
  --screenshot=~/shortselect/marketing/.playwright-tmp/after/task4-mobile-375.png \
  --window-size=375,800 --force-device-scale-factor=1 "http://localhost:4321/"
```

- [ ] **Step 3: Visual check**

Read `~/shortselect/marketing/.playwright-tmp/after/task4-mobile-375.png`. Expected:
- Nav: Logo left, hamburger right, NO desktop menu links, "Demo buchen" button compact (or hidden + replaced — verify it still shows)
- Below the nav: the hero is still broken (H1 too big, glow overflow) — that's fine, we fix in Task 5
- NO horizontal scroll on the nav-row itself

If horizontal-overflow remains in the nav: re-check `.fc-nav-inner` padding.

- [ ] **Step 4: Manual interaction test (open/close hamburger)**

In a real browser (or via Playwright if available), open `http://localhost:4321/` at 375 px, click hamburger:
- Overlay slides in from right ✓
- Click "Produkt" accordion → expands ✓
- Click another accordion → first closes, new opens ✓
- Click any submenu link → overlay closes + navigates ✓
- Click X → overlay closes ✓
- Press ESC → overlay closes ✓
- While open: page body does not scroll ✓

If any fails: debug JS in Task 3 before continuing.

- [ ] **Step 5: Desktop regression check**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars \
  --screenshot=~/shortselect/marketing/.playwright-tmp/after/task4-desktop-1440.png \
  --window-size=1440,800 --force-device-scale-factor=1 "http://localhost:4321/"
```

Read it. Expected: identical to baseline-desktop-1440 nav region.

- [ ] **Step 6: Commit**

```bash
cd ~/shortselect/marketing && git add src/pages/index.astro && git commit -m "feat(homepage): nav mobile @media — hide desktop links, show hamburger ≤768px"
```

---

### Task 5: Hero Mobile

**Files:**
- Modify: `src/pages/index.astro` (extend the ≤768 + ≤480 blocks)

**Goal:** Hero stays readable on mobile: H1 scales down, subline reflows, CTAs stack, decorations hide.

- [ ] **Step 1: Inspect current hero CSS**

```bash
cd ~/shortselect/marketing && grep -nE "\.fc-hero|fc-hero-deco|fc-hero-inner|fc-pill" src/pages/index.astro | head -25
```

Note line numbers around 320–410 where hero styles live. Confirm the key rules:
- `.fc-hero` (padding)
- `.fc-hero h1` (font-size 60px expected — verify)
- `.fc-hero .lead` (font-size 19px)
- `.fc-hero .actions` (gap, flex)
- `.fc-hero-deco-dot.d1..d4`
- `.fc-hero-glow` or similar (the 900×900 blur)

- [ ] **Step 2: Read lines 340–410 to confirm exact selectors used**

Use Read tool: `~/shortselect/marketing/src/pages/index.astro` lines 320–420.

You will see styles like `.fc-hero h1 { font-size: 60px; ... }`, `.fc-hero .lead { ... }`, `.fc-hero .actions { ... }`. Note any decorative-element selectors that exist (e.g. `.fc-hero-glow`, `.fc-hero-deco-dot`, `.fc-hero-deco-star`).

- [ ] **Step 3: Add hero rules to the ≤768 block**

Use Edit tool. Find the existing ≤768 block (now has Nav rules from Task 4) and append hero rules. Replace:

OLD:
```css
    .fc-nav-right .nav-cta-primary {
      font-size: 13px;
      padding: 10px 14px;
    }
  }
```

NEW:
```css
    .fc-nav-right .nav-cta-primary {
      font-size: 13px;
      padding: 10px 14px;
    }

    /* --- Hero --- */
    .fc-hero { padding: 60px 0 40px; }
    .fc-hero-inner { padding: 0 20px; }
    .fc-hero h1 { font-size: 36px; line-height: 1.05; }
    .fc-hero .lead { font-size: 16px; max-width: 100%; margin-top: 20px; }
    .fc-hero .actions { flex-direction: column; gap: 12px; margin-top: 28px; }
    .fc-hero .actions .fc-btn,
    .fc-hero .actions .fc-btn-ghost { width: 100%; justify-content: center; }
    .fc-hero-glow { display: none; }
    .fc-hero-deco-dot { opacity: 0.3; }
    .fc-hero-deco-star { opacity: 0.4; font-size: 16px; }
    .fc-pill { font-size: 12px; padding: 6px 12px; }
  }
```

Note: If the actual selectors differ (e.g. `.fc-hero-glow` doesn't exist — the bg-radial-gradient is on `.fc-hero` itself), adjust selectors to whatever truly exists. Use Read on lines 320–360 to verify.

- [ ] **Step 4: Add ≤480 hero refinements**

Find the existing ≤480 block (still empty from Task 2) and replace:

OLD:
```css
  /* === SMALL MOBILE OVERRIDES (≤480px) — populated by subsequent tasks === */
  @media (max-width: 480px) {
    /* Tasks 4–13 add rules here */
  }
```

NEW:
```css
  /* === SMALL MOBILE OVERRIDES (≤480px) — populated by subsequent tasks === */
  @media (max-width: 480px) {
    /* --- Hero --- */
    .fc-hero { padding: 50px 0 30px; }
    .fc-hero-inner { padding: 0 16px; }
    .fc-hero h1 { font-size: 30px; }
    .fc-hero .lead { font-size: 15px; margin-top: 16px; }
    .fc-hero-deco-dot { display: none; }
    .fc-hero-deco-star { display: none; }
  }
```

- [ ] **Step 5: Screenshots**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars \
  --screenshot=~/shortselect/marketing/.playwright-tmp/after/task5-mobile-375.png \
  --window-size=375,900 --force-device-scale-factor=1 "http://localhost:4321/"

"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars \
  --screenshot=~/shortselect/marketing/.playwright-tmp/after/task5-mobile-393.png \
  --window-size=393,900 --force-device-scale-factor=1 "http://localhost:4321/"

"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars \
  --screenshot=~/shortselect/marketing/.playwright-tmp/after/task5-desktop-1440.png \
  --window-size=1440,900 --force-device-scale-factor=1 "http://localhost:4321/"
```

- [ ] **Step 6: Visual check (read all 3 PNGs)**

Read the PNGs. Expected:
- 375: H1 fits without overflow, lead text wraps, CTAs stack vertically, no glow-overflow
- 393: similar, slightly more breathing room
- 1440: hero looks identical to baseline-desktop-1440

If any selector didn't take effect: re-inspect the actual CSS rule names and adjust.

- [ ] **Step 7: Commit**

```bash
cd ~/shortselect/marketing && git add src/pages/index.astro && git commit -m "feat(homepage): hero mobile — H1 scaling, CTA stack, deco hide"
```

---

### Task 6: "So funktioniert's" Cards (`.fc-how-cards`) Mobile

**Files:**
- Modify: `src/pages/index.astro` (extend ≤768 block)

- [ ] **Step 1: Read current `.fc-how-cards` styles**

```bash
cd ~/shortselect/marketing && grep -nE "fc-how-cards|\.fc-how-card[^s]" src/pages/index.astro | head
```

Confirm line 523 area: `.fc-how-cards { grid-template-columns: repeat(3, 1fr); padding: 0 32px; gap: 20px; ... }` and the individual card rules.

- [ ] **Step 2: Append how-cards rules to ≤768 block**

Edit. Find the end of the Hero section in the ≤768 block:

OLD:
```css
    .fc-pill { font-size: 12px; padding: 6px 12px; }
  }
```

NEW:
```css
    .fc-pill { font-size: 12px; padding: 6px 12px; }

    /* --- "So funktioniert's" Cards --- */
    .fc-how-head { padding: 0 20px; }
    .fc-how-cards {
      grid-template-columns: 1fr;
      gap: 16px;
      padding: 0 20px;
      margin-top: 40px;
    }
  }
```

- [ ] **Step 3: Screenshot + check**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars \
  --screenshot=~/shortselect/marketing/.playwright-tmp/after/task6-mobile-375.png \
  --window-size=375,5000 --force-device-scale-factor=1 "http://localhost:4321/"
```

Read PNG. Expected: 3 cards stacked vertically (not side-by-side), each card full-width minus 20px padding.

- [ ] **Step 4: Commit**

```bash
cd ~/shortselect/marketing && git add src/pages/index.astro && git commit -m "feat(homepage): how-cards mobile — stack 3-col to 1-col ≤768"
```

---

### Task 7: Bento-Grid (`.fc-bento`) Mobile

**Files:**
- Modify: `src/pages/index.astro` (extend ≤768 block)

**Goal:** 6-col bento grid collapses to 1 col on mobile.

- [ ] **Step 1: Read current Bento styles**

```bash
cd ~/shortselect/marketing && sed -n '630,730p' src/pages/index.astro
```

Note `.fc-bento { grid-template-columns: repeat(6, 1fr); grid-auto-rows: 220px; }` and the individual `.fc-bento-card` grid-column/grid-row span rules.

- [ ] **Step 2: Append Bento rules to ≤768 block**

Edit. Find the end of how-cards rules:

OLD:
```css
    .fc-how-cards {
      grid-template-columns: 1fr;
      gap: 16px;
      padding: 0 20px;
      margin-top: 40px;
    }
  }
```

NEW:
```css
    .fc-how-cards {
      grid-template-columns: 1fr;
      gap: 16px;
      padding: 0 20px;
      margin-top: 40px;
    }

    /* --- Bento Grid --- */
    .fc-bento {
      grid-template-columns: 1fr;
      grid-auto-rows: auto;
      gap: 16px;
      padding: 0 20px;
    }
    .fc-bento > * {
      grid-column: auto !important;
      grid-row: auto !important;
      min-height: 200px;
    }
    .fc-bento-head { padding: 0 20px; }
  }
```

Note: The `!important` overrides apply because individual `.fc-bento-card.span-X` rules may have higher specificity. If after inspection you find the bento-card classes use direct selectors like `.fc-bento .b-hero`, `.fc-bento .b-feature`, list those explicitly. The wildcard `.fc-bento > *` is a safe catch-all.

- [ ] **Step 3: Screenshot full-page mobile**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars \
  --screenshot=~/shortselect/marketing/.playwright-tmp/after/task7-mobile-375-full.png \
  --window-size=375,6000 --force-device-scale-factor=1 "http://localhost:4321/"
```

- [ ] **Step 4: Visual check**

Read PNG. Expected: Bento section now shows 1 card per row, each ~200px high or auto-fit content. NO horizontal overflow.

- [ ] **Step 5: Commit**

```bash
cd ~/shortselect/marketing && git add src/pages/index.astro && git commit -m "feat(homepage): bento mobile — 6-col grid collapses to 1-col ≤768"
```

---

### Task 8: Stats-Grid (`.fc-stats-grid`) Mobile

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Append stats rules to ≤768 block**

Edit. After the bento rules, append:

OLD:
```css
    .fc-bento-head { padding: 0 20px; }
  }
```

NEW:
```css
    .fc-bento-head { padding: 0 20px; }

    /* --- Stats Grid --- */
    .fc-stats-head { padding: 0 20px; }
    .fc-stats-grid {
      grid-template-columns: 1fr;
      gap: 18px;
      padding: 0 20px;
      margin-top: 40px;
    }
  }
```

- [ ] **Step 2: Screenshot + check**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars \
  --screenshot=~/shortselect/marketing/.playwright-tmp/after/task8-mobile-375.png \
  --window-size=375,6500 --force-device-scale-factor=1 "http://localhost:4321/"
```

Read. Expected: stats stacked 1-per-row.

- [ ] **Step 3: Commit**

```bash
cd ~/shortselect/marketing && git add src/pages/index.astro && git commit -m "feat(homepage): stats-grid mobile — 3-col to 1-col ≤768"
```

---

### Task 9: Agents-vs-Features (`.fc-avf-*`) Mobile

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Verify selectors**

```bash
cd ~/shortselect/marketing && grep -nE "fc-avf-(grid|card|head)" src/pages/index.astro | head
```

Confirm `.fc-avf-grid { grid-template-columns: 1fr 1fr; }` at ~line 1033–1041.

- [ ] **Step 2: Append AVF rules to ≤768 block**

Edit. After stats rules:

OLD:
```css
    .fc-stats-grid {
      grid-template-columns: 1fr;
      gap: 18px;
      padding: 0 20px;
      margin-top: 40px;
    }
  }
```

NEW:
```css
    .fc-stats-grid {
      grid-template-columns: 1fr;
      gap: 18px;
      padding: 0 20px;
      margin-top: 40px;
    }

    /* --- Agents-vs-Features --- */
    .fc-avf { padding: 60px 0; }
    .fc-avf-head { padding: 0 20px; margin-bottom: 32px; }
    .fc-avf-grid {
      grid-template-columns: 1fr;
      padding: 0 20px;
      gap: 20px;
    }
  }
```

- [ ] **Step 3: Screenshot + check**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars \
  --screenshot=~/shortselect/marketing/.playwright-tmp/after/task9-mobile-375.png \
  --window-size=375,7000 --force-device-scale-factor=1 "http://localhost:4321/"
```

Read. Expected: AVF "Lose" und "Win" Karten stapeln untereinander.

- [ ] **Step 4: Commit**

```bash
cd ~/shortselect/marketing && git add src/pages/index.astro && git commit -m "feat(homepage): agents-vs-features mobile — stack 2-col to 1-col ≤768"
```

---

### Task 10: AI-Features (`.fc-ai-*`) Mobile

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Append AI-features rules to ≤768 block**

OLD:
```css
    .fc-avf-grid {
      grid-template-columns: 1fr;
      padding: 0 20px;
      gap: 20px;
    }
  }
```

NEW:
```css
    .fc-avf-grid {
      grid-template-columns: 1fr;
      padding: 0 20px;
      gap: 20px;
    }

    /* --- AI-Features --- */
    .fc-ai-head { padding: 0 20px; margin-bottom: 40px; }
    .fc-ai-grid {
      grid-template-columns: 1fr;
      padding: 0 20px;
      gap: 16px;
    }
  }
```

- [ ] **Step 2: Screenshot + check**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars \
  --screenshot=~/shortselect/marketing/.playwright-tmp/after/task10-mobile-375.png \
  --window-size=375,7500 --force-device-scale-factor=1 "http://localhost:4321/"
```

- [ ] **Step 3: Commit**

```bash
cd ~/shortselect/marketing && git add src/pages/index.astro && git commit -m "feat(homepage): ai-features mobile — 3-col to 1-col ≤768"
```

---

### Task 11: Testimonials (`.fc-testi-*`) Mobile

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Append testimonial rules**

OLD:
```css
    .fc-ai-grid {
      grid-template-columns: 1fr;
      padding: 0 20px;
      gap: 16px;
    }
  }
```

NEW:
```css
    .fc-ai-grid {
      grid-template-columns: 1fr;
      padding: 0 20px;
      gap: 16px;
    }

    /* --- Testimonials --- */
    .fc-testi-head { padding: 0 20px; margin-bottom: 40px; }
    .fc-testi-grid {
      grid-template-columns: 1fr;
      padding: 0 20px;
      gap: 16px;
    }
  }
```

- [ ] **Step 2: Screenshot + check + commit**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars \
  --screenshot=~/shortselect/marketing/.playwright-tmp/after/task11-mobile-375.png \
  --window-size=375,8000 --force-device-scale-factor=1 "http://localhost:4321/"

cd ~/shortselect/marketing && git add src/pages/index.astro && git commit -m "feat(homepage): testimonials mobile — 3-col to 1-col ≤768"
```

---

### Task 12: Sourcing-Showcase (`.abs-*`) ≤480 Extension

**Files:**
- Modify: `src/pages/index.astro` (extend ≤480 block)

**Goal:** The existing `@media (max-width: 880px)` block already handles tablet-down. Add ≤480 refinements for very-small mobiles.

- [ ] **Step 1: Find the ≤480 block (now has hero rules from Task 5)**

Locate it after the ≤768 block. The last rule in ≤480 is currently `.fc-hero-deco-star { display: none; }`.

- [ ] **Step 2: Append sourcing-showcase scale-down to ≤480 block**

Edit. Find:

OLD:
```css
    .fc-hero-deco-star { display: none; }
  }
```

NEW:
```css
    .fc-hero-deco-star { display: none; }

    /* --- Sourcing-Showcase scale-down --- */
    .abs-head h2 { font-size: 28px; }
    .abs-pipe-card {
      transform: scale(0.92);
      transform-origin: center top;
    }
    .abs-plat-bar { gap: 8px; }
    .abs-plat {
      padding: 8px 6px;
      font-size: 11px;
    }
  }
```

- [ ] **Step 3: Screenshot + check**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars \
  --screenshot=~/shortselect/marketing/.playwright-tmp/after/task12-mobile-375.png \
  --window-size=375,8500 --force-device-scale-factor=1 "http://localhost:4321/"
```

Read. Expected: Sourcing-Section's platform-bar fits without overflow, pipeline-card scaled, headline at 28px.

- [ ] **Step 4: Commit**

```bash
cd ~/shortselect/marketing && git add src/pages/index.astro && git commit -m "feat(homepage): sourcing-showcase ≤480 — scale-down for very-small mobile"
```

---

### Task 13: CTA (`.fc-close`) + FAQ (`.fc-faq-*`) Mobile

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Append CTA + FAQ rules to ≤768 block**

Find the end of Testimonials rules in ≤768. Replace:

OLD:
```css
    .fc-testi-grid {
      grid-template-columns: 1fr;
      padding: 0 20px;
      gap: 16px;
    }
  }
```

NEW:
```css
    .fc-testi-grid {
      grid-template-columns: 1fr;
      padding: 0 20px;
      gap: 16px;
    }

    /* --- CTA (Dark Close-Section) --- */
    .fc-close { padding: 60px 0; }
    .fc-close-inner { padding: 0 20px; }
    .fc-close h2 { font-size: 32px; line-height: 1.1; }
    .fc-close .lead { font-size: 15px; margin-top: 14px; }
    .fc-close .actions {
      flex-direction: column;
      gap: 12px;
      margin-top: 28px;
    }
    .fc-close .actions a { width: 100%; justify-content: center; }

    /* --- FAQ --- */
    .fc-faq { padding: 60px 0; }
    .fc-faq-head { padding: 0 20px; margin-bottom: 32px; }
    .fc-faq-head h2 { font-size: 32px; }
  }
```

- [ ] **Step 2: Append ≤480 CTA refinements**

Find end of ≤480 block (after sourcing-showcase rules from Task 12):

OLD:
```css
    .abs-plat {
      padding: 8px 6px;
      font-size: 11px;
    }
  }
```

NEW:
```css
    .abs-plat {
      padding: 8px 6px;
      font-size: 11px;
    }

    /* --- CTA (Dark Close-Section) ≤480 --- */
    .fc-close h2 { font-size: 26px; }
    .fc-faq-head h2 { font-size: 26px; }
  }
```

- [ ] **Step 3: Screenshot full page**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars \
  --screenshot=~/shortselect/marketing/.playwright-tmp/after/task13-mobile-375-full.png \
  --window-size=375,10000 --force-device-scale-factor=1 "http://localhost:4321/"
```

- [ ] **Step 4: Visual check entire mobile page**

Read PNG. Walk through every section top-to-bottom:
- Nav: hamburger visible, compact ✓
- Hero: H1 scales, CTAs stack, no glow ✓
- How-cards: 1-col ✓
- Bento: 1-col stacked ✓
- Stats: 1-col ✓
- Agents-vs-Features: cards stack ✓
- AI-Features: 1-col ✓
- Sourcing: scaled, no overflow ✓
- Testimonials: 1-col ✓
- CTA: stacked, padding reduced ✓
- FAQ: headline reduced ✓
- Footer: (next task verifies)

Look for ANY remaining horizontal-scroll/overflow. If any: track it down (probably a `width: NNNpx` or `min-width: NNNpx` somewhere — grep and add a ≤768 override).

- [ ] **Step 5: Commit**

```bash
cd ~/shortselect/marketing && git add src/pages/index.astro && git commit -m "feat(homepage): CTA + FAQ mobile — padding, font-size scaling"
```

---

### Task 14: Footer Verify + `prefers-reduced-motion` Extension

**Files:**
- Modify: `src/pages/index.astro` (only if Footer issues found)

- [ ] **Step 1: Inspect footer rendering at 375px**

The footer is included via `<LandingFooter />` component (Tailwind-based). Check the existing `task13-mobile-375-full.png` to verify the footer section renders correctly. If it does: no Footer changes needed; if it doesn't: open `src/components/footer/LandingFooter.astro` and check for missing `md:`/`sm:` Breakpoint-Prefixes (separate fix, document in PR).

- [ ] **Step 2: Extend `prefers-reduced-motion` block**

Find the existing block at ~line 2458:

```css
  @media (prefers-reduced-motion: reduce) {
    .abs-hero-card, .abs-hero-card *, .abs-plat, .abs-plat *, .abs-pipe-card, .abs-pipe-card *,
    .abs-crit, .abs-score-stamp, .abs-confetti, .abs-reject-x line, .abs-scan-beam {
      animation-duration: 0.01s !important; animation-iteration-count: 1 !important; transition-duration: 0.01s !important;
    }
  }
```

Replace with extended version:

OLD:
```css
  @media (prefers-reduced-motion: reduce) {
    .abs-hero-card, .abs-hero-card *, .abs-plat, .abs-plat *, .abs-pipe-card, .abs-pipe-card *,
    .abs-crit, .abs-score-stamp, .abs-confetti, .abs-reject-x line, .abs-scan-beam {
      animation-duration: 0.01s !important; animation-iteration-count: 1 !important; transition-duration: 0.01s !important;
    }
  }
```

NEW:
```css
  @media (prefers-reduced-motion: reduce) {
    .abs-hero-card, .abs-hero-card *, .abs-plat, .abs-plat *, .abs-pipe-card, .abs-pipe-card *,
    .abs-crit, .abs-score-stamp, .abs-confetti, .abs-reject-x line, .abs-scan-beam,
    .fc-hero-deco-dot, .fc-hero-deco-star, .fc-pill .dot,
    .fc-mob-nav, .fc-mob-acc-panel, .fc-mob-acc-caret {
      animation-duration: 0.01s !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01s !important;
    }
  }
```

- [ ] **Step 3: Commit**

```bash
cd ~/shortselect/marketing && git add src/pages/index.astro && git commit -m "feat(homepage): extend prefers-reduced-motion to hero deco + mobile nav"
```

---

### Task 15: Horizontal-Overflow Audit + Build Sanity

**Files:**
- Read-only

- [ ] **Step 1: Build production bundle**

```bash
cd ~/shortselect/marketing && npm run build 2>&1 | tail -30
```

Expected: Build completes without errors. Note any CSS/Astro warnings — none should be new.

- [ ] **Step 2: Serve production build and re-screenshot all viewports**

```bash
# Stop dev server first (if still running)
pkill -f "astro dev" || true

# Start preview
cd ~/shortselect/marketing && npm run preview > /tmp/marketing-preview.log 2>&1 &
sleep 6
curl -sf http://localhost:4321/ > /dev/null && echo "Preview up" || echo "FAIL"
```

- [ ] **Step 3: Take final after-screenshots**

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
AFTER=~/shortselect/marketing/.playwright-tmp/after
URL="http://localhost:4321/"

"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --screenshot="$AFTER/final-mobile-375.png" \
  --window-size=375,10000 --force-device-scale-factor=1 "$URL"

"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --screenshot="$AFTER/final-mobile-393.png" \
  --window-size=393,10000 --force-device-scale-factor=1 "$URL"

"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --screenshot="$AFTER/final-tablet-768.png" \
  --window-size=768,10000 --force-device-scale-factor=1 "$URL"

"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --screenshot="$AFTER/final-desktop-1440.png" \
  --window-size=1440,3000 --force-device-scale-factor=1 "$URL"

ls -la "$AFTER"
```

- [ ] **Step 4: Visual side-by-side comparison vs baseline**

Read these PNG pairs and compare visually:

| Baseline | After | Expected |
|---|---|---|
| `baseline/mobile-375.png` | `after/final-mobile-375.png` | After: cleanly stacked, readable, no overflow. Baseline: cramped, broken. |
| `baseline/mobile-393.png` | `after/final-mobile-393.png` | Same as above. |
| `baseline/tablet-768.png` | `after/final-tablet-768.png` | After: similar to mobile (768 is at breakpoint edge), readable. |
| `baseline/desktop-1440.png` | `after/final-desktop-1440.png` | **Pixel-identical**. If different: regression — fix before merging. |

- [ ] **Step 5: Horizontal-overflow check via Chrome console**

Open `http://localhost:4321/` in a real Chrome browser at 375 px width (DevTools → Responsive mode). Open console, run:

```javascript
console.log('scrollWidth:', document.body.scrollWidth, '| innerWidth:', window.innerWidth);
console.log('Overflow?', document.body.scrollWidth > window.innerWidth);
```

Expected: `Overflow? false`. If `true`: an element is wider than viewport. Find it:

```javascript
[...document.querySelectorAll('*')].forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.right > window.innerWidth + 1) {
    console.log('Overflow culprit:', el, 'right:', rect.right);
  }
});
```

Fix any culprit by adding a ≤768 override for it.

- [ ] **Step 6: Stop preview server**

```bash
pkill -f "astro preview" || true
```

- [ ] **Step 7: (No commit yet — only if you had to fix something add a commit. Otherwise skip.)**

---

### Task 16: Final Sanity Pass + PR

**Files:**
- Read-only (and final push)

- [ ] **Step 1: Review the diff**

```bash
cd ~/shortselect/marketing && git log --oneline main..HEAD
```

Expected: ~13–15 commits, each scoped to one sectional area or task.

```bash
cd ~/shortselect/marketing && git diff --stat main..HEAD
```

Expected: `src/pages/index.astro` only (+ `.gitignore`). Insertions: ~400–500 lines (CSS + Markup + JS).

- [ ] **Step 2: Push branch**

```bash
cd ~/shortselect/marketing && git push -u origin fix/homepage-mobile-responsive
```

- [ ] **Step 3: Create PR with screenshots in body**

```bash
cd ~/shortselect/marketing && gh pr create --title "fix(homepage): mobile-responsive (375–768 px)" --body "$(cat <<'EOF'
## Summary

Macht die Homepage auf Mobile-Devices (375–768 px) nutzbar. Desktop-Optik unverändert.

- Hamburger-Menü mit Full-Screen-Overlay + Accordion-Submenus (Vanilla JS)
- Alle Grid-Layouts (Bento 6-Spalter, Stats/AI/Testimonials 3-Spalter, AVF 2-Spalter, How-Cards 3-Spalter) kollabieren auf 1 Spalte ≤768 px
- Hero: H1 60 → 36 → 30 px, CTAs stapeln, Glow + Floating-Dots ausgeblendet
- Sourcing-Showcase: Scale-Down auf ≤480 px
- `prefers-reduced-motion` erweitert um Hero-Deko und Mobile-Nav

## Approach

Approach 1 — punktuelle `@media (max-width: 768px)` und `@media (max-width: 480px)` Override-Blöcke. Desktop-CSS unverändert.

Spec: `docs/superpowers/specs/2026-05-14-homepage-mobile-responsive-design.md`

## Test plan

- [ ] Cloudflare-Preview-Deploy ansehen auf echtem iPhone (Safe-Area, Touch-Feel)
- [ ] Cloudflare-Build geht durch
- [ ] DevTools-Responsive-Mode 375/393/768 prüfen: kein horizontaler Scroll
- [ ] Desktop 1440: identisch zum aktuellen Live-Stand (kein Regression)
- [ ] Hamburger öffnen/schließen, Accordion testen, ESC, Body-Scroll-Lock

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 4: Note the PR URL**

After `gh pr create` prints the URL, post it back to the user with a one-line summary.

- [ ] **Step 5: Mention Cloudflare-Preview-Verify-Step in PR comment (optional)**

After Cloudflare Pages builds the preview, paste the preview-URL as a PR comment so QA can sight-check on a real iPhone.

- [ ] **Step 6: Cleanup local screenshot temp**

```bash
rm -rf ~/shortselect/marketing/.playwright-tmp/
```

Expected: directory gone; nothing left to commit.

---

## Self-Review Checklist (run after plan complete)

After all tasks done:
- [ ] All 16 tasks executed and committed
- [ ] PR opened and CI green (Cloudflare build success)
- [ ] Desktop pixel-comparison: identical
- [ ] Mobile 375 px: every section renders, no horizontal scroll
- [ ] Hamburger: opens, accordion toggles, ESC closes, body scroll locked while open
- [ ] No console errors on mobile or desktop
- [ ] `prefers-reduced-motion` honored (animations stopped)

If something fails:
- Add a hotfix-commit on the same branch
- Re-screenshot the affected area
- Force-update the PR with new diff

---

## Risks & Mitigations (from Spec, restated)

| Risk | Mitigation |
|---|---|
| `!important` in Task 7 bento-override conflicts with specific bento-card-rules | If wildcard doesn't take, list specific selectors (`.b-hero`, `.b-feature`, etc.) explicitly |
| Hamburger JS race with existing `<script is:inline>` block | JS appended at END of existing block, runs in same context — no race |
| iOS Safari body-scroll-lock bug | If discovered: switch to `position: fixed; top: -<scrollY>px` pattern (well-known fix) |
| Desktop regression | Each task ends with a desktop-screenshot regression check |
| Touch-targets too small | Base CSS sets `min-height: 44px` on all overlay buttons/links |

---

## Out-of-Scope (deferred to separate tickets)

- Migration `.fc-*` Custom-CSS → Tailwind-Utilities
- Audit/Fix anderer Marketing-Seiten (preise, kunden, branchen/*, etc.)
- Performance-Optimization (AVIF, Critical-CSS, Service-Worker)
- A11y-Vollaudit (Screen-Reader, Color-Contrast)
- Mobile-Testimonials-Karussell (UX-Enhancement)
