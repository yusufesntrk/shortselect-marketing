// Diagnose: zeigt die haeufigsten Pfad-Praefixe einer Domain, damit das Blog-Muster stimmt.
// Aufruf: node inspect.mjs <sitemap-url> [weitere...]
import { gunzipSync } from 'node:zlib';

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

async function get(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 25000);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal, redirect: 'follow',
      headers: {
        'user-agent': UA,
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'accept-language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
        'accept-encoding': 'gzip, deflate, br',
        'cache-control': 'no-cache',
        'sec-fetch-dest': 'document', 'sec-fetch-mode': 'navigate', 'sec-fetch-site': 'none',
        'upgrade-insecure-requests': '1',
      },
    });
    const buf = Buffer.from(await res.arrayBuffer());
    let body = (buf[0] === 0x1f && buf[1] === 0x8b) ? gunzipSync(buf).toString('utf8') : buf.toString('utf8');
    return { status: res.status, url: res.url, body };
  } catch (e) { return { status: 0, error: String(e.message || e), body: '' }; }
  finally { clearTimeout(t); }
}

const tag = (xml, name) => { const o = []; const re = new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'gi'); let m; while ((m = re.exec(xml))) o.push(m[1]); return o; };
const dec = (s) => s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/&amp;/g, '&').trim();

async function collect(url, seen = new Set(), depth = 0) {
  if (depth > 3 || seen.has(url) || seen.size > 150) return [];
  seen.add(url);
  const r = await get(url);
  if (!r.body) { if (depth === 0) console.log(`  ! ${url} -> status ${r.status} ${r.error || ''}`); return []; }
  const xml = r.body;
  if (/<sitemapindex/i.test(xml)) {
    const kids = tag(xml, 'sitemap').map((b) => dec(tag(b, 'loc')[0] || '')).filter(Boolean);
    if (depth === 0) console.log(`  index mit ${kids.length} Kindern`);
    const out = [];
    for (const k of kids.slice(0, 60)) out.push(...(await collect(k, seen, depth + 1)));
    return out;
  }
  const urls = tag(xml, 'url').map((b) => dec(tag(b, 'loc')[0] || '')).filter(Boolean);
  if (urls.length) return urls;
  const items = [...tag(xml, 'item'), ...tag(xml, 'entry')];
  return items.map((b) => dec(tag(b, 'link')[0] || '') || (b.match(/<link[^>]*href="([^"]+)"/i)?.[1] ?? '')).filter(Boolean);
}

for (const sm of process.argv.slice(2)) {
  console.log(`\n### ${sm}`);
  const urls = await collect(sm);
  console.log(`  ${urls.length} URLs gesamt`);
  const counts = new Map();
  for (const u of urls) {
    try {
      const p = new URL(u).pathname.split('/').filter(Boolean);
      const key = '/' + p.slice(0, Math.min(2, p.length - 1 || 1)).join('/');
      counts.set(key, (counts.get(key) || 0) + 1);
    } catch {}
  }
  [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 14)
    .forEach(([k, v]) => console.log(`   ${String(v).padStart(5)}  ${k}/`));
  const sample = urls.filter((u) => /blog|artikel|ressourc|resource|wissen|magazin|lexikon|insight|news|guide|learn/i.test(u)).slice(0, 4);
  sample.forEach((s) => console.log(`   z.B. ${s}`));
}
