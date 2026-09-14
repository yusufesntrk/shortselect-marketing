// Phase 4: Export. CSVs plus Rohmaterial fuer den Redaktionsplan.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const DIR = new URL('./data/', import.meta.url).pathname;
const OUT = new URL('./export/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const posts = readFileSync(DIR + 'posts.jsonl', 'utf8').split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l));
const analyse = JSON.parse(readFileSync(DIR + 'analyse.json', 'utf8'));
const eigene = JSON.parse(readFileSync(DIR + 'eigene-posts.json', 'utf8'));

const csvFeld = (v) => {
  const s = String(v ?? '').replace(/\r?\n/g, ' ').replace(/"/g, '""');
  return /[",;]/.test(s) ? `"${s}"` : s;
};
const csv = (kopf, zeilen) => [kopf.join(';'), ...zeilen.map((z) => z.map(csvFeld).join(';'))].join('\n') + '\n';

// 1) Anbieter-Profile
writeFileSync(OUT + 'anbieter-profile.csv', csv(
  ['anbieter', 'gruppe', 'artikel', 'davon_deutsch', 'median_woerter', 'juengster_beitrag', 'aeltester_beitrag', 'beitraege_letzte_12_monate'],
  analyse.profile.map((p) => [p.name || p.key, p.gruppe, p.anzahl, p.deutsch, p.medianWoerter, p.juengster, p.aeltester, p.letzte12Monate]),
));

// 2) Themen-Cluster
writeFileSync(OUT + 'themen-cluster.csv', csv(
  ['cluster', 'wettbewerb_deutsch', 'wettbewerb_gesamt', 'median_woerter_de', 'eigene_beitraege', 'luecke', 'top_anbieter'],
  Object.entries(analyse.clusterDeutsch)
    .sort((a, b) => b[1].anzahl - a[1].anzahl)
    .map(([name, c]) => [
      name, c.anzahl, analyse.clusterAlle[name].anzahl, c.medianWoerter,
      analyse.clusterEigen[name],
      c.anzahl - analyse.clusterEigen[name] * 8 > 0 ? 'ja' : 'nein',
      c.topAnbieter.map(([k, n]) => `${k}:${n}`).join(' '),
    ]),
));

// 3) Vollkorpus, deutschsprachig
const DE_LOCALE = new Set(['de', 'at', 'ch', 'de-de']);
const FREMD = new Set('fr es it nl da sv no fi pl pt tr el cs hu ro ja ko zh ru id th vi ar he hi ms sk sl hr bg et lv lt'.split(' '));
function istDeutsch(p) {
  if (DE_LOCALE.has(p.locale)) return true;
  if (FREMD.has(p.locale)) return false;
  const t = `${p.titel || ''} ${p.meta || ''}`.toLowerCase();
  if (!t.trim()) return false;
  const de = (t.match(/(\bder\b|\bdie\b|\bdas\b|\bund\b|\bfür\b|\bmit\b|\bvon\b|\bsie\b|\bwie\b|\bwas\b|\bnicht\b|\bwerden\b|\bmehr\b|\bbei\b|\bein\b|\bist\b|\bzum\b|\bzur\b|ä|ö|ü|ß)/g) || []).length;
  const en = (t.match(/(\bthe\b|\band\b|\bfor\b|\bwith\b|\byour\b|\bhow\b|\bwhat\b|\bto\b|\bof\b|\bin\b|\bare\b|\bbest\b|\byou\b|\bis\b|\ba\b|\bon\b|\bthat\b|\bby\b)/g) || []).length;
  return de > 0 && de >= en;
}
const istArtikel = (p) => (p.titel || p.h1) && !/\b(archives?|archiv)\s*[|·-]/i.test(p.titel || '');
const deutschSet = new Set(posts.filter((p) => !p.fehler && istArtikel(p) && istDeutsch(p)));
const deutsch = [...deutschSet];
writeFileSync(OUT + 'artikel-deutsch.csv', csv(
  ['anbieter', 'gruppe', 'titel', 'datum', 'woerter', 'url'],
  deutsch.map((p) => [p.name || p.key, p.gruppe, p.titel || p.h1, (p.datum || '').slice(0, 10), p.woerter, p.url]),
));

// 4) Vollkorpus komplett
writeFileSync(OUT + 'artikel-alle.csv', csv(
  ['anbieter', 'gruppe', 'sprache', 'titel', 'datum', 'woerter', 'url'],
  posts.filter(istArtikel).map((p) => [
    p.name || p.key, p.gruppe, deutschSet.has(p) ? 'de' : 'en/andere',
    p.titel || p.h1, (p.datum || '').slice(0, 10), p.woerter, p.url,
  ]),
));

// 5) Rohmaterial fuer den Redaktionsplan:
//    deutschsprachige Wettbewerber-Titel je Cluster, die bei uns fehlen
const eigenText = eigene.map((e) => `${e.titel} ${e.slug}`.toLowerCase()).join(' | ');
const CLUSTER_RE = analyse.clusterDeutsch;
const vorschlag = [];
for (const [name, c] of Object.entries(CLUSTER_RE).sort((a, b) => b[1].anzahl - a[1].anzahl)) {
  const eigen = analyse.clusterEigen[name];
  if (c.anzahl < 8) continue;
  vorschlag.push({ cluster: name, wettbewerb: c.anzahl, eigene: eigen, medianWoerter: c.medianWoerter, beispiele: c.beispiele });
}
writeFileSync(OUT + 'redaktions-rohmaterial.json', JSON.stringify({ vorschlag, luecken: analyse.luecken, eigenText: eigene.length }, null, 2));

console.log('geschrieben nach', OUT);
console.log(' anbieter-profile.csv          ', analyse.profile.length, 'Zeilen');
console.log(' themen-cluster.csv            ', Object.keys(analyse.clusterDeutsch).length, 'Zeilen');
console.log(' artikel-deutsch.csv           ', deutsch.length, 'Zeilen');
console.log(' artikel-alle.csv              ', posts.filter(istArtikel).length, 'Zeilen');
console.log(' redaktions-rohmaterial.json   ', vorschlag.length, 'Cluster');
