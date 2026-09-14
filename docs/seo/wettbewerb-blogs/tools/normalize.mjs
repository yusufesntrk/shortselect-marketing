// Phase 1b: Locale-Dubletten zusammenfuehren und Nicht-Artikel aussortieren.
// Aus urls.json wird kandidaten.json (das, was in Phase 2 wirklich geholt wird).
import { readFileSync, writeFileSync } from 'node:fs';

const DIR = new URL('./data/', import.meta.url).pathname;
const alle = JSON.parse(readFileSync(DIR + 'urls.json', 'utf8'));

const LOCALES = new Set(('de en us uk gb fr es it nl da sv no fi pl pt tr ja ko zh cs hu ro el bg hr sk sl et lv lt ru id th vi ar he hi ms be ch at au ca nz in sg za mx br ' +
  'de-de en-us en-gb fr-fr es-es nl-nl').split(' '));

// Slugs, die keine Artikel sind
const MUELL = /^(all|all-articles|index|blog|blogs|news|resources|ressourcen|glossary|glossar|category|categories|kategorie|tag|tags|blog-tags|author|autor|page|seite|search|suche|feed|rss|sitemap|archive|archiv|home|start|demo|pricing|preise|login|signup|register|kontakt|contact|impressum|imprint|datenschutz|privacy|privacy-policy|terms|terms-and-policies|terms-of-service|agb|cookie-policy|cookies|thank-you|thanks|danke|vielen-dank|vielen-dank-download|subscribe|newsletter|webinars|webinar|events|event|jobs|karriere|careers|team|about|about-us|ueber-uns|partner|partners|integrations|customers|kunden|referenzen|testimonials|press|presse|security|sicherheit|status|support|help|hilfe|faq)$/i;

const MUELL_TEIL = /(vielen-dank|thank-you|danke-fuer|download-bestaetigung|confirmation|whitepaper-download|-pdf$|^wp-|utm_)/i;

function zerlege(url) {
  const u = new URL(url);
  const segs = u.pathname.split('/').filter(Boolean);
  let locale = '';
  if (segs.length && LOCALES.has(segs[0].toLowerCase())) { locale = segs[0].toLowerCase(); segs.shift(); }
  const slug = segs[segs.length - 1] || '';
  return { locale, slug, rest: segs.join('/'), segs };
}

// Bewertung, welche Locale-Variante gewinnt
function localeRang(locale, gruppe) {
  const dach = gruppe.startsWith('dach');
  if (dach) {
    if (locale === 'de' || locale === 'de-de') return 0;
    if (locale === '') return 1;
    if (locale === 'at' || locale === 'ch') return 2;
    if (locale === 'en' || locale === 'us' || locale === 'uk' || locale === 'gb') return 3;
    return 4;
  }
  if (locale === '') return 0;
  if (locale === 'en' || locale === 'us') return 1;
  if (locale === 'uk' || locale === 'gb') return 2;
  if (locale === 'de') return 3;
  return 4;
}

const ausgabe = [];
let vorher = 0, nachher = 0;

for (const anbieter of alle) {
  vorher += anbieter.urls.length;
  const best = new Map(); // schluessel = rest-pfad ohne locale

  for (const e of anbieter.urls) {
    let z;
    try { z = zerlege(e.url); } catch { continue; }
    if (!z.slug) continue;
    if (MUELL.test(z.slug)) continue;
    if (MUELL_TEIL.test(z.slug)) continue;
    if (z.segs.length < 2) continue;          // z.B. /de/ratgeber/ ohne Artikel
    if (/^\d+$/.test(z.slug)) continue;        // reine Paginierung
    if (z.slug.length < 4) continue;

    const schluessel = z.rest.toLowerCase();
    const rang = localeRang(z.locale, anbieter.gruppe);
    const vorhanden = best.get(schluessel);
    if (!vorhanden || rang < vorhanden.rang) {
      best.set(schluessel, { ...e, locale: z.locale, slug: z.slug, rang });
    } else if (vorhanden && !vorhanden.titel && e.titel) {
      vorhanden.titel = e.titel; vorhanden.meta = e.meta;
    }
  }

  const urls = [...best.values()].map(({ rang, ...r }) => r);
  nachher += urls.length;
  ausgabe.push({ ...anbieter, urls, anzahlRoh: anbieter.urls.length, anzahl: urls.length });
}

writeFileSync(DIR + 'kandidaten.json', JSON.stringify(ausgabe, null, 2));

console.log('Anbieter'.padEnd(18), 'roh'.padStart(6), 'bereinigt'.padStart(10), '  Gruppe');
for (const a of ausgabe.sort((x, y) => y.anzahl - x.anzahl)) {
  console.log(a.key.padEnd(18), String(a.anzahlRoh).padStart(6), String(a.anzahl).padStart(10), '  ' + a.gruppe + (a.hinweis ? '  (' + a.hinweis + ')' : ''));
}
console.log('\nSumme roh:', vorher, '-> bereinigt:', nachher);
