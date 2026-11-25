import { readdirSync } from 'node:fs';
import { test, expect } from '@playwright/test';

test('choose a plan, inspect a comparison and manage consent', async ({ page, isMobile }) => {
  await page.goto('/preise/');
  const cookies = page.getByRole('dialog', { name: 'Cookies' });
  await cookies.getByRole('button', { name: 'Ablehnen' }).click();
  await expect(cookies).toBeHidden();

  const annual = page.getByRole('button', { name: 'Jährlich', exact: true });
  const fourWeeks = page.getByRole('button', { name: 'Alle 4 Wochen', exact: true });
  const annualPrice = page.getByText('137,77 €', { exact: true });
  const cyclePrice = page.getByText('199 €', { exact: true }).first();
  await expect(annual).toHaveAttribute('aria-pressed', 'true');
  await expect(annualPrice).toBeVisible();
  await fourWeeks.click();
  await expect(fourWeeks).toHaveAttribute('aria-pressed', 'true');
  await expect(cyclePrice).toBeVisible();
  await expect(annualPrice).toBeHidden();
  await annual.focus();
  await page.keyboard.press('Enter');
  await expect(annualPrice).toBeVisible();
  await expect(cyclePrice).toBeHidden();

  const trialLink = page.locator('main a[href*="utm_content=pricing_main"]');
  await expect(trialLink).toHaveAccessibleName(/14 Tage kostenlos testen/);
  await expect(trialLink).toHaveAttribute('href', /^https:\/\/app\.shortselect\.com\/signup\?/);

  if (isMobile) {
    const menuButton = page.getByRole('button', { name: 'Menü öffnen' });
    const menu = page.getByRole('dialog', { name: 'Hauptmenü' });
    await menuButton.click();
    await expect(menu).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(menuButton).toBeFocused();

    await menuButton.click();
    await menu.getByText('Vergleich', { exact: true }).click();
    await menu.getByRole('link', { name: /Bullhorn/i }).click();
  } else {
    const comparisonMenu = page.getByRole('navigation', { name: 'Hauptnavigation' }).getByRole('button', { name: 'Vergleich' });
    await comparisonMenu.focus();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toHaveAttribute('href', /^\/vergleich\//);
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/vergleich\//);
    await page.locator('footer a[href="/vergleich/"]').click();
    await page.locator('main a[href="/vergleich/shortselect-vs-bullhorn/"]').first().click();
  }

  await expect(page).toHaveURL(/\/vergleich\/shortselect-vs-bullhorn\/$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Bullhorn/i);
  await expect(page.getByText('300+ Marketplace', { exact: true })).toBeVisible();
  const question = page.locator('summary').filter({ hasText: 'Für wen ist Bullhorn besser geeignet?' });
  await question.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByText(/Bullhorn passt besser für große Staffing-Unternehmen/)).toBeVisible();

  await expect(cookies).toBeHidden();
  await page.locator('footer [data-consent-open]').click();
  await expect(cookies).toBeVisible();
  await cookies.getByRole('button', { name: 'Ablehnen' }).click();
});

// Include every file-backed subpage and representative outputs of the dynamic routes.
// Wide comparison tables may scroll inside their own container.
const routes = readdirSync(new URL('../src/pages/', import.meta.url), { recursive: true })
  .filter(file => file.endsWith('.astro') && file !== 'index.astro' && !file.includes('['))
  .map(file => file === '404.astro' ? '/404.html' : '/' + file.replace(/\/index\.astro$/, '/').replace(/\.astro$/, '/'))
  .concat('/blog/', '/blog/2/', '/blog/10-hebel-fuer-besseres-hiring-mit-ats-und-crm/', '/glossar/ats/')
  .sort();

test.describe('server-rendered pages', () => {
  test.use({ javaScriptEnabled: false });

  test('show an unclipped heading and fit the viewport before scripts run', async ({ page }) => {
    test.setTimeout(90_000);
    for (const route of routes) {
      await test.step(route, async () => {
        const response = await page.goto(route);
        expect(route === '/404.html' ? [200, 404] : [200]).toContain(response.status());
        const navigation = page.getByRole('navigation', { name: 'Hauptnavigation' });
        await expect(navigation.getByRole('link', { name: 'ShortSelect', exact: true })).toBeVisible();
        const heading = page.locator('main h1');
        await expect(heading).toHaveCount(1);
        await expect(heading).toBeVisible();
        const metrics = await heading.evaluate(async (el) => {
          await document.fonts.ready;
          const range = document.createRange();
          range.selectNodeContents(el);
          const rect = range.getBoundingClientRect();
          return {
            visible: el.checkVisibility({ opacityProperty: true, visibilityProperty: true }),
            width: document.documentElement.clientWidth,
            scrollWidth: document.documentElement.scrollWidth,
            left: Math.round(rect.left),
            right: Math.round(rect.right),
          };
        });
        expect.soft(metrics.visible, route).toBe(true);
        expect.soft(metrics.scrollWidth, route).toBeLessThanOrEqual(metrics.width + 1);
        expect.soft(metrics.left, route).toBeGreaterThanOrEqual(-1);
        expect.soft(metrics.right, route).toBeLessThanOrEqual(metrics.width + 1);
      });
    }
  });
});
