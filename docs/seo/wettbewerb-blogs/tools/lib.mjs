// Gemeinsamer Unterbau: curl-basierter Fetcher (Node-fetch wird von mehreren
// Anbietern geblockt, curl kommt durch), Sitemap-Parser, HTML-Extraktion.
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const exec = promisify(execFile);

export const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

export async function get(url, { timeout = 25, retries = 2 } = {}) {
  for (let i = 0; i <= retries; i++) {
    // Manche Server liefern kaputte Kompression (curl exit 23) -> zweiter Versuch ohne --compressed
    const komprimiert = i === 0 ? ['--compressed'] : [];
    try {
      const { stdout } = await exec('curl', [
        '-sL', ...komprimiert, '-m', String(timeout),
        '-A', UA,
        '-H', 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        '-H', 'Accept-Language: de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
        '-H', 'Upgrade-Insecure-Requests: 1',
        '-w', '\\n@@STATUS@@%{http_code}@@%{url_effective}',
        url,
      ], { maxBuffer: 64 * 1024 * 1024, timeout: (timeout + 8) * 1000 });
      const idx = stdout.lastIndexOf('\n@@STATUS@@');
      if (idx === -1) return { status: 0, body: stdout, url };
      const meta = stdout.slice(idx + 11).split('@@');
      return { status: Number(meta[0]) || 0, url: meta[1] || url, body: stdout.slice(0, idx) };
    } catch (e) {
      if (i === retries) return { status: 0, body: '', url, error: String(e.message || e).slice(0, 120) };
      await sleep(500 * (i + 1));
    }
  }
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const tag = (xml, name) => {
  const out = [];
  const re = new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'gi');
  let m;
  while ((m = re.exec(xml))) out.push(m[1]);
  return out;
};

export const decode = (s = '') =>
  s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;|&#x27;/gi, "'")
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/\s+/g, ' ')
    .trim();

// Sitemap (inkl. Index) rekursiv einsammeln. Liefert {loc,lastmod,title,desc}[]
export async function expandSitemap(url, { seen = new Set(), depth = 0, maxDocs = 150, onDoc } = {}) {
  if (depth > 3 || seen.has(url) || seen.size >= maxDocs) return [];
  seen.add(url);
  const r = await get(url);
  if (!r.body || r.status >= 400) return [];
  const xml = r.body;
  if (!/<(urlset|sitemapindex|rss|feed)[\s>]/i.test(xml)) return [];
  onDoc?.(url, xml);

  if (/<sitemapindex[\s>]/i.test(xml)) {
    const kids = tag(xml, 'sitemap').map((b) => decode(tag(b, 'loc')[0] || '')).filter(Boolean)
      .map((u) => (u.startsWith('http') ? u : new URL(u, url).href));
    kids.sort((a, b) => sitemapScore(b) - sitemapScore(a));
    const out = [];
    for (const k of kids.slice(0, 60)) out.push(...(await expandSitemap(k, { seen, depth: depth + 1, maxDocs, onDoc })));
    return out;
  }

  const urls = tag(xml, 'url');
  if (urls.length) {
    return urls.map((b) => ({
      loc: decode(tag(b, 'loc')[0] || ''),
      lastmod: decode(tag(b, 'lastmod')[0] || ''),
    })).filter((e) => e.loc);
  }

  const items = [...tag(xml, 'item'), ...tag(xml, 'entry')];
  return items.map((b) => ({
    loc: decode(tag(b, 'link')[0] || '') || (b.match(/<link[^>]*href="([^"]+)"/i)?.[1] ?? ''),
    lastmod: decode(tag(b, 'pubDate')[0] || tag(b, 'updated')[0] || tag(b, 'published')[0] || ''),
    title: decode(tag(b, 'title')[0] || ''),
    desc: decode((tag(b, 'description')[0] || tag(b, 'summary')[0] || '').replace(/<[^>]+>/g, ' ')).slice(0, 400),
  })).filter((e) => e.loc);
}

function sitemapScore(u) {
  let s = 0;
  if (/post|blog|artikel|article|insight|resource|ressourc|lexikon|wissen|magazin|guide|learn|ratgeber|recruitingspot|news/i.test(u)) s += 10;
  if (/page/i.test(u)) s += 3;
  if (/product|kategorie|category|\/tag|author|autor|\bjob|stelle|image|video|customer|company|profile/i.test(u)) s -= 8;
  return s;
}

// --- HTML-Extraktion -------------------------------------------------------
export function extractMeta(html, url) {
  const pick = (re) => decode(html.match(re)?.[1] || '');
  const ogTitle = pick(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i)
    || pick(/<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:title["']/i);
  const title = pick(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const desc = pick(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)
    || pick(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)
    || pick(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i);
  const h1 = decode((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '').replace(/<[^>]+>/g, ' '));
  const h2 = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)]
    .map((m) => decode(m[1].replace(/<[^>]+>/g, ' '))).filter((s) => s && s.length < 160).slice(0, 12);

  // Datum: JSON-LD zuerst, dann meta, dann time-Element
  let datum = '';
  const ld = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  for (const block of ld) {
    const m = block.match(/"datePublished"\s*:\s*"([^"]+)"/);
    if (m) { datum = m[1]; break; }
  }
  if (!datum) datum = pick(/<meta[^>]+property=["']article:published_time["'][^>]+content=["']([^"']*)["']/i);
  if (!datum) datum = pick(/<time[^>]+datetime=["']([^"']*)["']/i);

  // Wortzahl aus dem sichtbaren Text (grob, reicht fuer Tiefen-Vergleich)
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<nav[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<footer[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
  const woerter = decode(text).split(/\s+/).filter((w) => w.length > 1).length;

  return { url, titel: ogTitle || title, meta: desc, h1, h2, datum, woerter };
}

// Links aus einer Listing-Seite ziehen
export function extractLinks(html, base, pattern) {
  const out = new Set();
  for (const m of html.matchAll(/href=["']([^"'#]+)["']/gi)) {
    let u;
    try { u = new URL(m[1], base); } catch { continue; }
    const clean = u.origin + u.pathname.replace(/\/+$/, '/');
    if (pattern.test(u.pathname)) out.add(clean);
  }
  return [...out];
}

// Begrenzt nebenlaeufige Tasks
export async function pool(items, worker, concurrency = 6, onTick) {
  const results = [];
  let i = 0, done = 0;
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      try { results[idx] = await worker(items[idx], idx); } catch (e) { results[idx] = { fehler: String(e.message || e) }; }
      onTick?.(++done, items.length);
    }
  }));
  return results;
}
