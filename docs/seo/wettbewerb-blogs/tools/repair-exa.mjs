// Vincere sitzt hinter Cloudflare und ist weder per curl noch ueber r.jina.ai
// abrufbar. Exa liefert Titel und Datum aus seinem Cache. Was Exa nicht kennt,
// bekommt einen aus dem Slug abgeleiteten Titel, klar gekennzeichnet.
import { readFileSync, writeFileSync } from 'node:fs';

const DIR = new URL('./data/', import.meta.url).pathname;
const ZIEL = DIR + 'posts.jsonl';
const KEY = process.env.EXA_API_KEY;
if (!KEY) { console.error('EXA_API_KEY fehlt'); process.exit(1); }

const keys = process.argv.slice(2);
const zeilen = readFileSync(ZIEL, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l));
const offen = zeilen.filter((z) => z.fehler && keys.includes(z.key));
console.log('offen:', offen.length);

const titelAusSlug = (slug) => slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const gefunden = new Map();
for (let i = 0; i < offen.length; i += 40) {
  const teil = offen.slice(i, i + 40);
  const res = await fetch('https://api.exa.ai/contents', {
    method: 'POST',
    headers: { 'x-api-key': KEY, 'content-type': 'application/json' },
    body: JSON.stringify({ urls: teil.map((t) => t.url), text: false }),
  });
  if (!res.ok) { console.log('  Batch', i, 'HTTP', res.status); continue; }
  const j = await res.json();
  for (const r of j.results || []) {
    if (r.title) gefunden.set(r.url || r.id, { titel: r.title, datum: r.publishedDate || '' });
  }
  console.log(`  ${Math.min(i + 40, offen.length)}/${offen.length}  aus Exa: ${gefunden.size}`);
  await new Promise((r) => setTimeout(r, 600));
}

let ausExa = 0, ausSlug = 0;
const neu = zeilen.map((z) => {
  if (!(z.fehler && keys.includes(z.key))) return z;
  const t = gefunden.get(z.url) || gefunden.get(z.url.replace(/\/$/, '')) || gefunden.get(z.url + '/');
  if (t) {
    ausExa++;
    return { ...z, titel: t.titel.replace(/\s*\|\s*(Vincere|Access Vincere Evo).*$/i, '').trim(), datum: t.datum || z.datum, fehler: false, titelQuelle: 'exa' };
  }
  ausSlug++;
  return { ...z, titel: titelAusSlug(z.slug || ''), fehler: false, titelQuelle: 'slug' };
});

writeFileSync(ZIEL, neu.map((z) => JSON.stringify(z)).join('\n') + '\n');
console.log(`\nTitel aus Exa: ${ausExa}, aus Slug abgeleitet: ${ausSlug}`);
