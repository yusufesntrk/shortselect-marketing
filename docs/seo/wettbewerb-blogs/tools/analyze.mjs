// Phase 3: Auswertung. Anbieter-Profile, Themen-Cluster, N-Gramme, Luecken
// gegen den eigenen Blog. Ausgabe: data/analyse.json + Konsolenbericht.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const DIR = new URL('./data/', import.meta.url).pathname;

const posts = readFileSync(DIR + 'posts.jsonl', 'utf8').split('\n')
  .filter((l) => l.trim()).map((l) => { try { return JSON.parse(l); } catch { return null; } })
  .filter(Boolean);

const eigene = existsSync(DIR + 'eigene-posts.json')
  ? JSON.parse(readFileSync(DIR + 'eigene-posts.json', 'utf8')) : [];

// --- Hilfen ---------------------------------------------------------------
const text = (p) => `${p.titel || ''} ${p.h1 || ''} ${p.slug || ''} ${p.meta || ''}`.toLowerCase();
const jahr = (p) => {
  const d = (p.datum || '').trim();
  if (!d) return '';
  const m = d.match(/(\d{4})-(\d{2})/);
  if (m) return `${m[1]}-${m[2]}`;
  // RFC-822 aus RSS (z. B. "Mon, 01 Sep 2026 08:00:00 +0000")
  const t = Date.parse(d);
  if (!Number.isNaN(t)) {
    const dt = new Date(t);
    const jahrZahl = dt.getUTCFullYear();
    if (jahrZahl >= 2005 && jahrZahl <= 2030) return `${jahrZahl}-${String(dt.getUTCMonth() + 1).padStart(2, '0')}`;
  }
  return '';
};

const DE_LOCALE = new Set(['de', 'at', 'ch', 'de-de']);
const FREMD_LOCALE = new Set(['fr', 'es', 'it', 'nl', 'da', 'sv', 'no', 'fi', 'pl', 'pt', 'tr', 'el', 'cs', 'hu', 'ro', 'ja', 'ko', 'zh', 'ru', 'id', 'th', 'vi', 'ar', 'he', 'hi', 'ms', 'sk', 'sl', 'hr', 'bg', 'et', 'lv', 'lt']);

function istDeutsch(p) {
  if (DE_LOCALE.has(p.locale)) return true;
  if (FREMD_LOCALE.has(p.locale)) return false;
  const t = `${p.titel || ''} ${p.meta || ''}`.toLowerCase();
  if (!t.trim()) return false;
  const de = /(\bder\b|\bdie\b|\bdas\b|\bund\b|\bfür\b|\bfuer\b|\bmit\b|\bvon\b|\bsie\b|\bwie\b|\bwas\b|\bnicht\b|\bwerden\b|\bmehr\b|\bbei\b|\bein\b|\beine\b|\bist\b|\bsind\b|\bzum\b|\bzur\b|\büber\b|ä|ö|ü|ß)/g;
  const en = /(\bthe\b|\band\b|\bfor\b|\bwith\b|\byour\b|\bhow\b|\bwhat\b|\bto\b|\bof\b|\bin\b|\bare\b|\bbest\b|\byou\b|\bis\b|\ba\b|\bon\b|\bthat\b|\bby\b|\bwhy\b|\bwhen\b)/g;
  const dz = (t.match(de) || []).length;
  const ez = (t.match(en) || []).length;
  // Ohne jedes deutsche Signal ist es nicht deutsch. Gleichstand bei 0 zaehlte vorher faelschlich als deutsch.
  return dz > 0 && dz >= ez;
}

// Archiv-, Autoren- und Uebersichtsseiten, die durch den URL-Filter geschluepft sind
function istArtikel(p) {
  const t = (p.titel || p.h1 || '');
  if (!t) return false;
  if (/\b(archives?|archiv)\s*[|·-]/i.test(t)) return false;
  if (/^(page|seite)\s*\d+/i.test(t)) return false;
  return true;
}

// --- Themen-Cluster (DE + EN Muster) --------------------------------------
const CLUSTER = {
  'ATS-Grundlagen': /\b(ats|applicant tracking|bewerbermanagement|bewerbermanagementsystem|bewerbermanagement-software|recruiting.?software|recruiting.?system|hr.?software)\b/,
  'Recruiting-CRM': /\b(recruiting.?crm|recruitment crm|candidate relationship|crm f(ü|ue)r|talent crm|kandidatenbeziehung)\b/,
  'KI & Automatisierung': /\b(ki|k(ü|ue)nstliche intelligenz|\bai\b|artificial intelligence|automatisierung|automation|automate|chatgpt|gpt|llm|agent|agents|machine learning|algorithm)\b/,
  'Active Sourcing': /\b(sourcing|active sourcing|direktansprache|boolean|x-?ray|talent sourcing|kandidatensuche|candidate search|passive candidates|passive kandidaten|linkedin recruiter|xing talentmanager)\b/,
  'Matching & Screening': /\b(matching|match.?score|screening|vorauswahl|lebenslauf|cv.?parsing|resume|shortlist|pre.?screening|eignungsdiagnostik)\b/,
  'Kennzahlen & Analytics': /\b(kpi|kennzahl|metrics?|analytics|time.?to.?(fill|hire)|cost.?per.?hire|quality of hire|reporting|dashboard|conversion|funnel|benchmark)\b/,
  'Employer Branding': /\b(employer brand|arbeitgebermarke|arbeitgeberattraktivit|employer value|evp|unternehmenskultur|company culture|arbeitgeberbewertung)\b/,
  'Stellenanzeige & Multiposting': /\b(stellenanzeige|stellenausschreibung|job.?ad|job posting|job description|stellenbeschreibung|multiposting|jobb(ö|oe)rse|job board|indeed|stepstone|google for jobs|anzeigentext)\b/,
  'Karriereseite': /\b(karriereseite|karriere.?website|career (site|page)|karriereportal|bewerbungsformular|application form)\b/,
  'Candidate Experience': /\b(candidate experience|bewerbererlebnis|bewerbererfahrung|candidate journey|bewerbungsprozess|absage|rejection|ghosting|feedback an bewerber)\b/,
  'Interview & Auswahl': /\b(interview|vorstellungsgespr(ä|ae)ch|bewerbungsgespr(ä|ae)ch|interviewfragen|interview questions|strukturiertes interview|assessment|probearbeit|video.?interview)\b/,
  'Onboarding': /\b(onboarding|einarbeitung|preboarding|erste(r|n)? arbeitstag|new hire)\b/,
  'DSGVO & Compliance': /\b(dsgvo|gdpr|datenschutz|compliance|agg|antidiskriminierung|ai act|ki.?verordnung|aufbewahrungsfrist|l(ö|oe)schfrist|einwilligung|consent|privacy)\b/,
  'Zeitarbeit & Personaldienstleistung': /\b(zeitarbeit|arbeitnehmer(ü|ue)berlassung|personaldienstleist|staffing (agency|firm|industry)|temp(orary)? staffing|leiharbeit|a(ü|ue)g|contractor|contingent)\b/,
  'Headhunting & Executive Search': /\b(headhunt|personalberat|executive search|direct search|retained search|boutique (search|firm)|recruitment agency|personalvermittl|recruiting.?agentur)\b/,
  'Agenturgeschäft & Vertrieb': /\b(business development|neukunden|kundengewinnung|vertrieb|sales|cold call|kaltakquise|pitch|honorar|fee|margin|provision|placement|umsatz|revenue|pricing|angebot an kunden)\b/,
  'Talent Pool & Nurturing': /\b(talent.?pool|kandidatenpool|nurturing|talent pipeline|re.?engage|wiederansprache|bewerberpool|datenbank pflegen)\b/,
  'Diversity & Inklusion': /\b(diversity|diversit(ä|ae)t|inclusion|inklusion|unconscious bias|anonymisiert|gender|dei\b|barrierefrei)\b/,
  'New Work & Remote': /\b(remote|hybrid|homeoffice|home office|new work|work.?life|vier.?tage|4.?day|flexible arbeit)\b/,
  'Vergleiche & Alternativen': /\b(alternative|alternativen|vergleich|\bvs\b|versus|best \d|top \d|beste[nrs]? |besten |comparison|review|software ausw(ä|ae)hlen|auswahlkriterien|buyers? guide)\b/,
  'Branchen-Recruiting': /\b(it.?recruiting|tech recruiting|healthcare|pflege|gesundheitswesen|handwerk|logistik|gastronomie|finance recruiting|engineering|produktion|einzelhandel|hospitality|blue.?collar|high.?volume)\b/,
  'Recruiting-Prozess': /\b(recruiting.?prozess|hiring process|einstellungsprozess|workflow|pipeline|stages|prozess optimier|effizien|durchlaufzeit|hiring plan|personalplanung)\b/,
  'Gehalt & Vergütung': /\b(gehalt|verg(ü|ue)tung|salary|compensation|entgelttransparenz|pay transparency|benefits)\b/,
  'Arbeitsrecht': /\b(arbeitsrecht|k(ü|ue)ndigung|arbeitsvertrag|probezeit|befristung|labor law|employment law|betriebsrat|mindestlohn)\b/,
  'Trends & Studien': /\b(trends? 20\d\d|studie|report 20\d\d|umfrage|survey|prognose|zukunft des recruit|future of (recruit|work|hiring)|state of)\b/,
  'Fachkräftemangel': /\b(fachkr(ä|ae)ftemangel|talent shortage|skills gap|arbeitsmarkt|labor (market|shortage)|demografisch|bewerbermangel)\b/,
  'Mitarbeiterbindung': /\b(retention|mitarbeiterbindung|fluktuation|turnover|engagement|mitarbeiterzufriedenheit|exit interview)\b/,
  'Recruiting-Marketing': /\b(recruiting.?marketing|performance recruiting|social recruiting|recruiting kampagne|ads|tiktok|instagram|facebook|zielgruppe|funnel marketing)\b/,
};

// --- Stoppwoerter fuer N-Gramme -------------------------------------------
const STOP = new Set((
  'der die das den dem des ein eine einen einer eines und oder aber wie was wer wo wann warum ' +
  'für fuer mit von vom zu zum zur im in am an auf aus bei bis durch gegen ohne um über ueber unter ' +
  'ist sind war waren sein seine ihr ihre ihren sie es man wir du ich als auch noch nur schon mehr ' +
  'so dass daß nicht kein keine mehr alle allen beim nach vor sich dabei damit dafür dafuer worauf ' +
  'the a an and or but how what who where when why for with from to of in on at by as is are was were ' +
  'be been being this that these those you your we our it its they their he she can will do does did ' +
  'not no more most best top new your s t re ll ve don isn ' +
  'blog artikel post beitrag guide leitfaden tipps tipp teil ' +
  'nbsp amp').split(/\s+/));

function ngrams(titel, n) {
  const w = titel.toLowerCase()
    .replace(/[^a-zäöüß0-9\s-]/g, ' ')
    .split(/\s+/).filter((x) => x.length > 2 && !STOP.has(x) && !/^\d+$/.test(x));
  const out = [];
  for (let i = 0; i + n <= w.length; i++) out.push(w.slice(i, i + n).join(' '));
  return out;
}

// --- Auswertung -----------------------------------------------------------
const gueltig = posts.filter((p) => !p.fehler && (p.titel || p.h1) && istArtikel(p));
const deutsch = gueltig.filter(istDeutsch);

// 1) Anbieter-Profile
const anbieter = new Map();
for (const p of gueltig) {
  if (!anbieter.has(p.key)) anbieter.set(p.key, { key: p.key, name: p.name, gruppe: p.gruppe, posts: [] });
  anbieter.get(p.key).posts.push(p);
}
const profile = [...anbieter.values()].map((a) => {
  const w = a.posts.map((p) => p.woerter).filter((x) => x > 100).sort((x, y) => x - y);
  const monate = a.posts.map(jahr).filter(Boolean).sort();
  const letzte12 = new Set();
  const grenze = new Date(); grenze.setMonth(grenze.getMonth() - 12);
  const grenzeStr = grenze.toISOString().slice(0, 7);
  let neu = 0;
  for (const p of a.posts) { const m = jahr(p); if (m && m >= grenzeStr) { neu++; letzte12.add(m); } }
  return {
    key: a.key, name: a.name, gruppe: a.gruppe,
    anzahl: a.posts.length,
    deutsch: a.posts.filter(istDeutsch).length,
    medianWoerter: w.length ? w[Math.floor(w.length / 2)] : 0,
    juengster: monate[monate.length - 1] || '',
    aeltester: monate[0] || '',
    letzte12Monate: neu,
    proMonat: letzte12.size ? +(neu / 12).toFixed(1) : 0,
  };
}).sort((a, b) => b.anzahl - a.anzahl);

// 2) Cluster
function clustern(menge) {
  const res = {};
  for (const [name, re] of Object.entries(CLUSTER)) {
    const treffer = menge.filter((p) => re.test(text(p)));
    const proAnbieter = {};
    for (const p of treffer) proAnbieter[p.key] = (proAnbieter[p.key] || 0) + 1;
    const w = treffer.map((p) => p.woerter).filter((x) => x > 100).sort((a, b) => a - b);
    res[name] = {
      anzahl: treffer.length,
      medianWoerter: w.length ? w[Math.floor(w.length / 2)] : 0,
      topAnbieter: Object.entries(proAnbieter).sort((a, b) => b[1] - a[1]).slice(0, 5),
      beispiele: treffer.slice(0, 6).map((p) => ({ titel: p.titel, key: p.key, url: p.url })),
    };
  }
  return res;
}
const clusterAlle = clustern(gueltig);
const clusterDeutsch = clustern(deutsch);

// eigene Abdeckung je Cluster
const eigeneTexte = eigene.map((e) => ({ titel: e.titel, slug: e.slug, h1: '', meta: '', key: 'shortselect' }));
const clusterEigen = {};
for (const [name, re] of Object.entries(CLUSTER)) {
  clusterEigen[name] = eigeneTexte.filter((p) => re.test(text(p))).length;
}

// 3) N-Gramme (deutsch, aus Titeln)
function topNgrams(menge, n, min = 3) {
  const z = new Map();
  for (const p of menge) for (const g of ngrams(p.titel || p.h1 || '', n)) z.set(g, (z.get(g) || 0) + 1);
  return [...z.entries()].filter(([, c]) => c >= min).sort((a, b) => b[1] - a[1]);
}
const ng1 = topNgrams(deutsch, 1, 5);
const ng2 = topNgrams(deutsch, 2, 3);
const ng3 = topNgrams(deutsch, 3, 3);

// eigene N-Gramme fuer den Abgleich
const eigenBegriffe = new Set();
for (const e of eigene) { for (const n of [1, 2]) for (const g of ngrams(e.titel, n)) eigenBegriffe.add(g); }

const luecken2 = ng2.filter(([g]) => !eigenBegriffe.has(g)).slice(0, 120);
const luecken1 = ng1.filter(([g]) => !eigenBegriffe.has(g)).slice(0, 120);

const analyse = {
  erzeugt: new Date().toISOString(),
  summe: { posts: posts.length, gueltig: gueltig.length, deutsch: deutsch.length, eigene: eigene.length },
  profile, clusterAlle, clusterDeutsch, clusterEigen,
  ngramme: { ein: ng1.slice(0, 150), zwei: ng2.slice(0, 200), drei: ng3.slice(0, 120) },
  luecken: { einWort: luecken1, zweiWort: luecken2 },
};
writeFileSync(DIR + 'analyse.json', JSON.stringify(analyse, null, 2));

// --- Bericht --------------------------------------------------------------
console.log(`\nPosts gesamt ${posts.length}, auswertbar ${gueltig.length}, davon deutsch ${deutsch.length}. Eigene Posts ${eigene.length}.\n`);

console.log('ANBIETER'.padEnd(18), 'Posts'.padStart(6), 'DE'.padStart(6), 'Median W'.padStart(9), 'juengst'.padStart(9), 'letzte12'.padStart(9));
for (const p of profile) {
  console.log(p.key.padEnd(18), String(p.anzahl).padStart(6), String(p.deutsch).padStart(6),
    String(p.medianWoerter).padStart(9), (p.juengster || '-').padStart(9), String(p.letzte12Monate).padStart(9));
}

console.log('\n\nTHEMEN-CLUSTER (deutschsprachige Wettbewerber-Posts vs. eigene Abdeckung)');
console.log('Cluster'.padEnd(34), 'DE-Posts'.padStart(9), 'Median W'.padStart(9), 'eigene'.padStart(7), '  Top-Anbieter');
const reihen = Object.entries(clusterDeutsch).sort((a, b) => b[1].anzahl - a[1].anzahl);
for (const [name, c] of reihen) {
  console.log(name.padEnd(34), String(c.anzahl).padStart(9), String(c.medianWoerter).padStart(9),
    String(clusterEigen[name]).padStart(7), '  ' + c.topAnbieter.map(([k, n]) => `${k}:${n}`).join(' '));
}

console.log('\n\nHAEUFIGSTE ZWEI-WORT-BEGRIFFE IN DEUTSCHEN WETTBEWERBER-TITELN (die uns fehlen)');
luecken2.slice(0, 50).forEach(([g, c], i) => console.log(String(i + 1).padStart(3), String(c).padStart(4), g));
