// Phase 1: Artikel-URLs je Anbieter einsammeln (Sitemap oder Listing-Crawl).
// Ausgabe: data/urls.json
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { get, expandSitemap, extractLinks, sleep, tag, decode } from './lib.mjs';
import { TARGETS } from './targets.mjs';

const OUT = new URL('./data/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const only = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const liste = only.length ? TARGETS.filter((t) => only.includes(t.key)) : TARGETS;

const SITEMAP_KANDIDATEN = [
  '/sitemap.xml', '/sitemap_index.xml', '/sitemap-index.xml', '/wp-sitemap.xml',
  '/sitemaps.xml', '/blog/sitemap.xml', '/blog/sitemap_index.xml', '/post-sitemap.xml',
  '/sitemap/sitemap-index.xml', '/blog/rss.xml', '/blog/feed/', '/feed/', '/rss.xml',
];

function sauber(u) {
  try {
    const x = new URL(u);
    return x.origin + x.pathname;
  } catch { return null; }
}

function registrierbar(t, loc) {
  let u;
  try { u = new URL(loc); } catch { return false; }
  const apex = t.host.replace(/^www\./, '').split('.').slice(-2).join('.');
  if (!u.hostname.endsWith(apex)) return false;
  const p = u.pathname;
  if (!t.pfad.test(p)) return false;
  if (/\.(jpg|jpeg|png|gif|svg|pdf|webp|mp4|zip)$/i.test(p)) return false;
  if (/\/(tag|tags|category|kategorie|categories|author|autor|page|seite|feed|amp)(\/|$)/i.test(p)) return false;
  if (/\/(comments|wp-json|wp-content)\//i.test(p)) return false;
  if (p.split('/').filter(Boolean).length < 2) return false;
  return true;
}

async function viaSitemap(t) {
  let quellen = t.sitemaps ? [...t.sitemaps] : [];
  if (!quellen.length) {
    const robots = await get(`https://${t.host}/robots.txt`);
    if (robots.status < 400 && robots.body) {
      for (const line of robots.body.split('\n')) {
        const m = line.match(/^\s*sitemap:\s*(\S+)/i);
        if (m) quellen.push(m[1].trim());
      }
    }
  }
  if (!quellen.length) {
    for (const c of SITEMAP_KANDIDATEN) {
      const r = await get(`https://${t.host}${c}`, { timeout: 15 });
      if (r.status < 400 && /<(urlset|sitemapindex|rss|feed)[\s>]/i.test(r.body || '')) { quellen.push(`https://${t.host}${c}`); break; }
    }
  }

  const seen = new Set();
  const roh = [];
  for (const sm of quellen.slice(0, 6)) roh.push(...(await expandSitemap(sm, { seen })));
  return { quellen: quellen.slice(0, 6), xmlDocs: seen.size, roh };
}

async function viaListing(t) {
  const cfg = t.listing;
  const gefunden = new Map();
  let leerlauf = 0;
  for (let i = 0; i < cfg.maxSeiten; i++) {
    const url = i === 0 ? cfg.seed : cfg.seite(i);
    const r = await get(url, { timeout: 20 });
    if (r.status >= 400 || !r.body) { leerlauf++; if (leerlauf >= 2) break; continue; }
    const links = extractLinks(r.body, url, t.pfad);
    const vorher = gefunden.size;
    for (const l of links) {
      const c = sauber(l);
      if (c && registrierbar(t, c)) gefunden.set(c, { loc: c, lastmod: '' });
    }
    if (gefunden.size === vorher) { leerlauf++; if (leerlauf >= 2) break; } else leerlauf = 0;
    await sleep(400);
  }
  return { quellen: [cfg.seed], xmlDocs: 0, roh: [...gefunden.values()] };
}

async function viaFeed(t) {
  // WordPress-Feeds beherrschen ?paged=N. Laeuft bis eine Seite nichts Neues bringt.
  const cfg = t.feed;
  const map = new Map();
  let leerlauf = 0;
  for (let i = 1; i <= cfg.maxSeiten; i++) {
    const r = await get(cfg.seite(i), { timeout: 20 });
    if (r.status >= 400 || !/<item[\s>]/i.test(r.body || '')) { leerlauf++; if (leerlauf >= 2) break; continue; }
    const items = tag(r.body, 'item');
    const vorher = map.size;
    for (const b of items) {
      const loc = decode(tag(b, 'link')[0] || '');
      if (!loc) continue;
      map.set(loc.split('?')[0], {
        loc: loc.split('?')[0],
        lastmod: decode(tag(b, 'pubDate')[0] || ''),
        title: decode(tag(b, 'title')[0] || ''),
        desc: decode((tag(b, 'description')[0] || '').replace(/<[^>]+>/g, ' ')).slice(0, 400),
      });
    }
    if (map.size === vorher) { leerlauf++; if (leerlauf >= 2) break; } else leerlauf = 0;
    await sleep(350);
  }
  return { quellen: [cfg.seite(1)], xmlDocs: 0, roh: [...map.values()] };
}

const ergebnis = [];
for (const t of liste) {
  process.stdout.write(`${t.key.padEnd(16)} `);
  const res = t.quelle === 'listing' ? await viaListing(t)
    : t.quelle === 'feed' ? await viaFeed(t)
    : await viaSitemap(t);
  const map = new Map();
  for (const e of res.roh) {
    const c = sauber(e.loc);
    if (!c || !registrierbar(t, c)) continue;
    if (!map.has(c)) map.set(c, { url: c, lastmod: e.lastmod || '', titel: e.title || '', meta: e.desc || '' });
  }
  const eintrag = {
    key: t.key, name: t.name, host: t.host, gruppe: t.gruppe,
    quelle: t.quelle || 'sitemap', sitemapQuellen: res.quellen, xmlDocs: res.xmlDocs,
    rohTreffer: res.roh.length, urls: [...map.values()],
    hinweis: t.hinweis || '',
  };
  ergebnis.push(eintrag);
  console.log(`${String(eintrag.urls.length).padStart(5)} Artikel   (roh ${res.roh.length}, ${res.quellen.length} Quellen)${t.hinweis ? '  << ' + t.hinweis : ''}`);
}

// Bei Teil-Laeufen die bestehende Datei mergen statt ueberschreiben
const pfad = OUT + 'urls.json';
let alle = ergebnis;
if (only.length && existsSync(pfad)) {
  const vorhanden = JSON.parse(readFileSync(pfad, 'utf8'));
  const byKey = new Map(vorhanden.map((e) => [e.key, e]));
  for (const e of ergebnis) byKey.set(e.key, e);
  alle = [...byKey.values()];
}
writeFileSync(pfad, JSON.stringify(alle, null, 2));
console.log('\nSumme Artikel:', alle.reduce((a, r) => a + r.urls.length, 0), '->', pfad);
