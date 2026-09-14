// Phase 3b: Redaktions-Rohmaterial. Deutschsprachige Wettbewerber-Titel in den
// Clustern, die zur Zielgruppe von ShortSelect passen, plus bereinigte Lueckenbegriffe.
import { readFileSync, writeFileSync } from 'node:fs';

const DIR = new URL('./data/', import.meta.url).pathname;
const posts = readFileSync(DIR + 'posts.jsonl', 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const eigene = JSON.parse(readFileSync(DIR + 'eigene-posts.json', 'utf8'));

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

// Marken-, Personen- und Rubrik-Rauschen aus den N-Grammen fernhalten
const RAUSCHEN = /(factorial|recruitee|rexx|coveto|softgarden|sprad|yena|onlyfy|xing|talention|dvinci|d\.vinci|vinci|bullhorn|vincere|workable|greenhouse|lever|manatal|crelate|loxo|jobadder|breezy|ashby|pinpoint|teamtailor|smartrecruiters|recruitcrm|recruiterflow|leonar|erecruiter|guidecom|helix|starhunter|zvoove|join|personio|shortselect|salvi|virgili|ferrada|xavier|santiago|jaime|mora|play|ndash|uuml|auml|ouml|nbsp|partner|update|news|webinar|podcast|folge|episode|interview mit|zukunft personal|messe)/i;

const deutsch = posts.filter((p) => !p.fehler && (p.titel || p.h1) && istDeutsch(p)
  && !/\b(archives?|archiv)\s*[|·-]/i.test(p.titel || ''));

// Cluster, die zur Zielgruppe passen (Agenturen, Personalberatung, Personaldienstleister)
const ICP_CLUSTER = {
  'Headhunting & Executive Search': /\b(headhunt|personalberat|executive search|direct search|retained search|direktansprache|personalvermittl|recruiting.?agentur|suchauftrag|mandat|shortlist)\b/i,
  'Personaldienstleistung & Zeitarbeit': /\b(zeitarbeit|arbeitnehmer(ü|ue)berlassung|personaldienstleist|leiharbeit|a(ü|ue)g\b|temp|disposition|einsatzplanung)\b/i,
  'Active Sourcing': /\b(sourcing|boolean|x-?ray|kandidatensuche|passive kandidaten|linkedin recruiter|talentmanager|ansprache)\b/i,
  'Agenturgeschäft & Vertrieb': /\b(business development|neukunden|kundengewinnung|vertrieb|kaltakquise|akquise|honorar|provision|placement|umsatz|kundenbindung|auftraggeber|kunden gewinnen)\b/i,
  'Recruiting-CRM': /\b(recruiting.?crm|recruitment crm|candidate relationship|talent crm|kandidatenbeziehung|kundenbeziehung)\b/i,
  'ATS-Auswahl & Vergleiche': /\b(alternative|vergleich|\bvs\b|auswahlkriterien|software ausw(ä|ae)hlen|worauf achten|checkliste|migration|wechsel|einf(ü|ue)hrung)\b/i,
  'KI im Recruiting': /\b(\bki\b|k(ü|ue)nstliche intelligenz|\bai\b|automatisierung|agent|chatgpt|llm|matching|screening)\b/i,
  'DSGVO & Recht im Recruiting': /\b(dsgvo|datenschutz|agg|einwilligung|l(ö|oe)schfrist|aufbewahrung|ai act|ki.?verordnung|auftragsverarbeitung)\b/i,
  'Kennzahlen & Steuerung': /\b(kpi|kennzahl|time.?to.?(fill|hire)|cost.?per.?hire|reporting|auswertung|forecast|pipeline|quote)\b/i,
  'Talent Pool & Nurturing': /\b(talent.?pool|kandidatenpool|nurturing|wiederansprache|bewerberpool|datenbank)\b/i,
};

const eigenTitel = eigene.map((e) => (e.titel + ' ' + e.slug).toLowerCase());
const habenWir = (titel) => {
  const w = titel.toLowerCase().replace(/[^a-zäöüß0-9\s]/g, ' ').split(/\s+/).filter((x) => x.length > 4);
  if (w.length < 2) return false;
  return eigenTitel.some((e) => w.filter((x) => e.includes(x)).length >= Math.max(2, Math.ceil(w.length * 0.4)));
};

const ergebnis = {};
for (const [name, re] of Object.entries(ICP_CLUSTER)) {
  const treffer = deutsch.filter((p) => re.test(`${p.titel} ${p.slug} ${p.meta}`));
  const eigen = eigene.filter((e) => re.test(`${e.titel} ${e.slug}`)).length;

  // N-Gramme innerhalb des Clusters, ohne Marken-/Personenrauschen
  const z = new Map();
  const STOP = new Set('der die das den dem des ein eine einen einer und oder aber wie was wer wo wann warum für mit von vom zu zum zur im in am an auf aus bei bis durch gegen ohne um über unter ist sind war sein ihre ihr sie man wir als auch noch nur schon mehr dass nicht kein keine alle beim nach vor sich damit tipps teil the and for with your how what best top new'.split(' '));
  for (const p of treffer) {
    const w = (p.titel || '').toLowerCase().replace(/[^a-zäöüß0-9\s-]/g, ' ').split(/\s+/).filter((x) => x.length > 3 && !STOP.has(x));
    for (let i = 0; i + 2 <= w.length; i++) {
      const g = w.slice(i, i + 2).join(' ');
      if (RAUSCHEN.test(g)) continue;
      z.set(g, (z.get(g) || 0) + 1);
    }
  }

  const offeneTitel = treffer.filter((p) => !habenWir(p.titel || '')).sort((a, b) => (b.datum || '').localeCompare(a.datum || ''));

  ergebnis[name] = {
    wettbewerbDeutsch: treffer.length,
    eigene: eigen,
    anbieter: Object.entries(treffer.reduce((a, p) => (a[p.key] = (a[p.key] || 0) + 1, a), {})).sort((x, y) => y[1] - x[1]).slice(0, 6),
    begriffe: [...z.entries()].filter(([, c]) => c >= 2).sort((a, b) => b[1] - a[1]).slice(0, 25),
    offeneTitel: offeneTitel.slice(0, 40).map((p) => ({ titel: p.titel, anbieter: p.key, datum: (p.datum || '').slice(0, 10), woerter: p.woerter, url: p.url })),
  };
}

writeFileSync(DIR + 'icp-luecken.json', JSON.stringify(ergebnis, null, 2));

console.log('ICP-CLUSTER'.padEnd(36), 'DE-Wettbewerb'.padStart(14), 'eigene'.padStart(7), '  stärkste Anbieter');
for (const [n, c] of Object.entries(ergebnis).sort((a, b) => b[1].wettbewerbDeutsch - a[1].wettbewerbDeutsch)) {
  console.log(n.padEnd(36), String(c.wettbewerbDeutsch).padStart(14), String(c.eigene).padStart(7), '  ' + c.anbieter.map(([k, v]) => `${k}:${v}`).join(' '));
}
for (const [n, c] of Object.entries(ergebnis)) {
  console.log(`\n### ${n}  (${c.wettbewerbDeutsch} deutsche Wettbewerber-Beiträge, ${c.eigene} eigene)`);
  console.log('  Begriffe:', c.begriffe.slice(0, 12).map(([g, n2]) => `${g}(${n2})`).join(', ') || '-');
  c.offeneTitel.slice(0, 6).forEach((t) => console.log(`   - [${t.anbieter}] ${t.titel.slice(0, 92)}`));
}
