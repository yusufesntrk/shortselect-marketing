import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const distDir = join(repoRoot, 'dist');
const siteUrl = 'https://www.shortselect.com';

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function readDist(path) {
  return readFileSync(join(distDir, path), 'utf8');
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : fullPath;
  });
}

function metaContent(html, selector) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = html.match(new RegExp(`<meta ${escapedSelector} content="([^"]*)"`, 'i'));
  return match?.[1] ?? '';
}

function pageTitle(html) {
  return html.match(/<title>(.*?)<\/title>/i)?.[1] ?? '';
}

function jsonLdBlocks(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gis)]
    .map((match) => JSON.parse(match[1]));
}

function schemaContainsKey(value, key) {
  if (!value || typeof value !== 'object') return false;
  if (Object.prototype.hasOwnProperty.call(value, key)) return true;
  return Object.values(value).some((nested) => {
    if (Array.isArray(nested)) return nested.some((item) => schemaContainsKey(item, key));
    return schemaContainsKey(nested, key);
  });
}

function assertNoAggregateRating(html, label) {
  const blocks = jsonLdBlocks(html);
  assert(
    blocks.every((block) => !schemaContainsKey(block, 'aggregateRating')),
    `${label} must not include aggregateRating structured data`,
  );
}

assert(existsSync(distDir), 'dist/ must exist. Run npm run build before this test.');

assert(existsSync(join(distDir, 'llms.txt')), 'dist/llms.txt must exist');

const robots = readDist('robots.txt');
[
  'Googlebot',
  'Bingbot',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'ClaudeBot',
  'anthropic-ai',
  'Claude-User',
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'CCBot',
].forEach((bot) => {
  assert(robots.includes(`User-agent: ${bot}`), `robots.txt must explicitly mention ${bot}`);
  const group = robots.match(new RegExp(`User-agent: ${bot}\\n([\\s\\S]*?)(?=\\nUser-agent:|\\nSitemap:|$)`))?.[1] ?? '';
  ['/dashboard/', '/client/', '/auth'].forEach((path) => {
    assert(group.includes(`Disallow: ${path}`), `${bot} must keep ${path} disallowed`);
  });
});
const sitemapLines = robots.split(/\r?\n/).filter((line) => line.trim().startsWith('Sitemap:'));
assert(sitemapLines.length === 1, 'robots.txt must contain exactly one Sitemap directive');
assert(
  sitemapLines[0].trim() === `Sitemap: ${siteUrl}/sitemap-index.xml`,
  'robots.txt Sitemap directive must point only to sitemap-index.xml',
);

const sitemapIndex = readDist('sitemap-index.xml');
assert(sitemapIndex.includes(`${siteUrl}/sitemap-0.xml`), 'sitemap-index.xml must reference sitemap-0.xml');

const sitemap = readDist('sitemap-0.xml');
['/agb/', '/datenschutz/', '/impressum/'].forEach((path) => {
  assert(!sitemap.includes(`${siteUrl}${path}`), `sitemap must not include ${path}`);
});

[
  ['agb/index.html', '/agb/'],
  ['datenschutz/index.html', '/datenschutz/'],
  ['impressum/index.html', '/impressum/'],
].forEach(([file, path]) => {
  const html = readDist(file);
  assert(
    metaContent(html, 'name="robots"') === 'noindex, follow',
    `${path} must keep noindex, follow robots meta`,
  );
});

const blogFiles = walk(join(distDir, 'blog')).filter((file) => {
  const rel = relative(join(distDir, 'blog'), file);
  return rel.endsWith('index.html') && !/^(index\.html|\d+\/index\.html)$/.test(rel);
});
assert(blogFiles.length > 0, 'expected built blog article pages');

blogFiles.forEach((file) => {
  const html = readFileSync(file, 'utf8');
  const rel = relative(distDir, file);
  const title = pageTitle(html);
  const description = metaContent(html, 'name="description"');

  assert(title.length > 0, `${rel} must have a title`);
  assert(title.length <= 63, `${rel} title must be shortened to 63 chars or less, got ${title.length}`);
  assert(description.length > 0, `${rel} must have a meta description`);
  assert(
    description.length >= 125 && description.length <= 158,
    `${rel} description must be shortened into SEO range 125-158 chars, got ${description.length}`,
  );
  assert(metaContent(html, 'property="og:type"') === 'article', `${rel} must use og:type article`);
});

assertNoAggregateRating(readDist('index.html'), '/');
assertNoAggregateRating(readDist('preise/index.html'), '/preise/');

const homeHtml = readDist('index.html');
const globalCssFile = readdirSync(join(distDir, '_astro')).find((file) => /^global\..*\.css$/.test(file));
assert(globalCssFile, 'dist/_astro must include a built global CSS file');
const globalCss = readDist(join('_astro', globalCssFile));
assert(homeHtml.includes('<html lang="de" class="no-js">'), 'HTML must start with no-js fallback class');
assert(
  homeHtml.includes("document.documentElement.classList.remove('no-js')") &&
    homeHtml.includes("document.documentElement.classList.add('js')"),
  'HTML must switch from no-js to js when scripts run',
);
assert(
  globalCss.includes('.no-js [data-reveal]') &&
    globalCss.includes('.no-js .reveal-item') &&
    globalCss.includes('opacity:1!important') &&
    /transform:(none|translateY\(0\))!important/.test(globalCss),
  'global CSS must reveal animated content when JavaScript is disabled',
);
assert(
  homeHtml.includes('setTimeout(function()') &&
    (
      homeHtml.includes("if (!el.classList.contains('revealed')) reveal(el);") ||
      homeHtml.includes("if (!el.classList.contains('in')) el.classList.add('in');")
    ),
  'HTML must include delayed reveal fallback for non-intersected elements',
);

console.log(`SEO remediation dist checks passed for ${blogFiles.length} blog articles.`);
