// Phase 2b: fehlgeschlagene Abrufe nachholen.
//   modus 'langsam'  -> gleicher Weg, aber stark gedrosselt (gegen Rate-Limits, z. B. SmartRecruiters)
//   modus 'jina'     -> ueber r.jina.ai (gegen Cloudflare, z. B. Vincere)
// Aufruf: node repair.mjs <modus> <key> [key...]
import { readFileSync, writeFileSync } from 'node:fs';
import { get, extractMeta, decode, sleep, pool } from './lib.mjs';

const DIR = new URL('./data/', import.meta.url).pathname;
const ZIEL = DIR + 'posts.jsonl';
const [modus, ...keys] = process.argv.slice(2);
if (!modus || !keys.length) { console.error('Aufruf: node repair.mjs <langsam|jina> <key...>'); process.exit(1); }

const zeilen = readFileSync(ZIEL, 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l));
const kaputt = zeilen.filter((z) => z.fehler && keys.includes(z.key));
const behalten = zeilen.filter((z) => !(z.fehler && keys.includes(z.key)));
console.log(`nachzuholen: ${kaputt.length}  (Modus ${modus})`);
if (!kaputt.length) process.exit(0);

const KONKURRENZ = modus === 'jina' ? 1 : 2;   // jina drosselt ohne Schluessel hart
const PAUSE = modus === 'jina' ? 2800 : 2500;

function ausJina(md, url) {
  const titel = decode((md.match(/^Title:\s*(.+)$/m)?.[1] || '').replace(/\s*\|\s*Vincere.*$/i, ''));
  const koerper = md.split('Markdown Content:')[1] || md;
  const h2 = [...koerper.matchAll(/^#{2,3}\s+(.+)$/gm)].map((m) => decode(m[1])).filter((s) => s.length < 160).slice(0, 12);
  const h1 = decode(koerper.match(/^#\s+(.+)$/m)?.[1] || '');
  const datum = (koerper.match(/(\d{1,2}\.\s*\w+\s*20\d\d|\w+\s+\d{1,2},\s*20\d\d|20\d\d-\d\d-\d\d)/)?.[1] || '');
  const woerter = koerper.replace(/\[[^\]]*\]\([^)]*\)/g, ' ').split(/\s+/).filter((w) => w.length > 1).length;
  return { url, titel, h1, h2, datum, woerter };
}

let ok = 0, weiterhinKaputt = 0;
const neu = await pool(kaputt, async (z) => {
  const url = modus === 'jina' ? `https://r.jina.ai/${z.url}` : z.url;
  const r = await get(url, { timeout: 50, retries: 1 });
  await sleep(PAUSE);
  if (r.status >= 200 && r.status < 400 && r.body && r.body.length > 400) {
    const m = modus === 'jina' ? ausJina(r.body, z.url) : extractMeta(r.body, z.url);
    if (m.titel || m.h1) {
      ok++;
      return { ...z, titel: m.titel || z.titel, h1: m.h1, h2: m.h2, datum: m.datum || z.datum, woerter: m.woerter, status: r.status, fehler: false, quelle: modus };
    }
  }
  weiterhinKaputt++;
  return z;
}, KONKURRENZ, (d, n) => { if (d % 50 === 0) console.log(`  ${d}/${n}  ok ${ok}  offen ${weiterhinKaputt}`); });

writeFileSync(ZIEL, [...behalten, ...neu].map((z) => JSON.stringify(z)).join('\n') + '\n');
console.log(`\nrepariert ${ok}, weiterhin ohne Titel ${weiterhinKaputt}`);
