// Phase 2: Metadaten je Artikel holen (Titel, Meta-Description, H1/H2, Datum, Wortzahl).
// Pro Domain hoechstens 2 gleichzeitige Anfragen mit Pause, global begrenzt.
// Schreibt fortlaufend nach data/posts.jsonl und kann jederzeit fortgesetzt werden.
import { readFileSync, writeFileSync, appendFileSync, existsSync } from 'node:fs';
import { get, extractMeta, sleep } from './lib.mjs';

const DIR = new URL('./data/', import.meta.url).pathname;
const ZIEL = DIR + 'posts.jsonl';

const PRO_DOMAIN = 2;      // gleichzeitige Anfragen je Anbieter
const PAUSE_MS = 220;      // Pause zwischen zwei Anfragen derselben Domain
const GLOBAL = 14;         // gleichzeitige Anfragen insgesamt

const anbieter = JSON.parse(readFileSync(DIR + 'kandidaten.json', 'utf8'));

// bereits Geholtes ueberspringen
const fertig = new Set();
if (existsSync(ZIEL)) {
  for (const line of readFileSync(ZIEL, 'utf8').split('\n')) {
    if (!line.trim()) continue;
    try { fertig.add(JSON.parse(line).url); } catch {}
  }
}

const nurKeys = process.argv.slice(2).filter((a) => !a.startsWith('-'));
const aufgaben = [];
for (const a of anbieter) {
  if (nurKeys.length && !nurKeys.includes(a.key)) continue;
  for (const u of a.urls) {
    if (fertig.has(u.url)) continue;
    aufgaben.push({ ...u, key: a.key, name: a.name, gruppe: a.gruppe });
  }
}

console.log(`offen: ${aufgaben.length}   bereits vorhanden: ${fertig.size}`);
if (!aufgaben.length) process.exit(0);

// nach Domain gruppieren, damit jede Domain ihre eigene Warteschlange bekommt
const proDomain = new Map();
for (const t of aufgaben) {
  if (!proDomain.has(t.key)) proDomain.set(t.key, []);
  proDomain.get(t.key).push(t);
}

let erledigt = 0, fehler = 0;
const start = Date.now();
const puffer = [];

function schreibe(satz) {
  puffer.push(JSON.stringify(satz));
  if (puffer.length >= 25) { appendFileSync(ZIEL, puffer.join('\n') + '\n'); puffer.length = 0; }
}

async function domainWorker(key, liste) {
  const laeufer = Array.from({ length: PRO_DOMAIN }, async () => {
    while (liste.length) {
      const t = liste.shift();
      if (!t) break;
      const r = await get(t.url, { timeout: 25, retries: 1 });
      if (r.status >= 200 && r.status < 400 && r.body && r.body.length > 500) {
        const m = extractMeta(r.body, t.url);
        schreibe({
          key: t.key, name: t.name, gruppe: t.gruppe, url: t.url, locale: t.locale || '', slug: t.slug || '',
          titel: t.titel || m.titel, meta: t.meta || m.meta, h1: m.h1, h2: m.h2,
          datum: m.datum || t.lastmod || '', woerter: m.woerter, status: r.status,
        });
      } else {
        fehler++;
        schreibe({ key: t.key, name: t.name, gruppe: t.gruppe, url: t.url, locale: t.locale || '', slug: t.slug || '',
          titel: t.titel || '', meta: t.meta || '', h1: '', h2: [], datum: t.lastmod || '', woerter: 0, status: r.status, fehler: true });
      }
      erledigt++;
      if (erledigt % 200 === 0) {
        const s = (Date.now() - start) / 1000;
        console.log(`${erledigt}/${aufgaben.length}  ${(erledigt / s).toFixed(1)}/s  Fehler ${fehler}  (${Math.round(s)}s)`);
      }
      await sleep(PAUSE_MS);
    }
  });
  await Promise.all(laeufer);
}

// Domains parallel, aber global gedeckelt
const keys = [...proDomain.keys()];
let idx = 0;
await Promise.all(Array.from({ length: Math.min(Math.ceil(GLOBAL / PRO_DOMAIN), keys.length) }, async () => {
  while (idx < keys.length) {
    const k = keys[idx++];
    await domainWorker(k, proDomain.get(k));
    console.log(`-- fertig: ${k}`);
  }
}));

if (puffer.length) appendFileSync(ZIEL, puffer.join('\n') + '\n');
console.log(`\nfertig. ${erledigt} geholt, ${fehler} Fehler, ${Math.round((Date.now() - start) / 1000)}s -> ${ZIEL}`);
