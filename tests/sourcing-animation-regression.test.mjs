import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const sourcePath = fileURLToPath(new URL('../src/pages/index.astro', import.meta.url));
const source = readFileSync(sourcePath, 'utf8');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function capture(pattern, message) {
  const match = source.match(pattern);
  assert(match, message);
  return match;
}

const clearClasses = capture(
  /absCard\.classList\.remove\(([^;]+)\);/,
  'the sourcing card cleanup must remove its transient state classes',
)[1];
const scoreClasses = capture(
  /absCard\.classList\.add\('scored',\s*p\.match\s*\?\s*'([^']+)'\s*:\s*'([^']+)'\);/,
  'the scored state must add explicit match and miss classes',
);
const confettiMatchClass = capture(
  /\.abs-hero-card\.scored\.([\w-]+)\s+\.abs-confetti\s*\{/,
  'the confetti rule must be scoped to the sourcing match state',
)[1];

assert(scoreClasses[1] === 'abs-match-card', 'matched sourcing profiles must use abs-match-card');
assert(scoreClasses[2] === 'abs-miss-card', 'rejected sourcing profiles must use abs-miss-card');
assert(
  clearClasses.includes("'abs-match-card'") && clearClasses.includes("'abs-miss-card'"),
  'cleanup must remove both namespaced sourcing score states',
);
assert(
  !clearClasses.includes("'match-card'") && !clearClasses.includes("'miss-card'"),
  'cleanup must not reuse the generic mini-card classes',
);
assert(
  confettiMatchClass === scoreClasses[1],
  'the confetti selector and JavaScript match-state class must stay synchronized',
);
assert(
  !source.includes('.abs-hero-card.scored.match-card'),
  'the sourcing hero must never use the generic match-card selector',
);
assert(
  !/\.abs-match-card\s*\{/.test(source),
  'abs-match-card must remain a state marker, not a standalone layout rule',
);

const miniCardCss = capture(
  /\.match-card\s*\{([\s\S]*?)\n\s*\}/,
  'the independent mini match-card animation must still exist',
)[1];
assert(/height:\s*70px/.test(miniCardCss), 'mini match cards must retain their 70px height');
assert(/display:\s*flex/.test(miniCardCss), 'mini match cards must retain their flex layout');
assert(/flex-direction:\s*column/.test(miniCardCss), 'mini match cards must remain column-oriented');
assert(
  /animation:\s*matchPulse\b/.test(miniCardCss),
  'mini match cards must retain the matchPulse animation',
);
assert(
  (source.match(/class="match-card(?:\s+m[23])?"/g) ?? []).length === 3,
  'the matching explainer must retain its three generic mini cards',
);

assert(
  /\.abs-hero-card\.filing\s*\{[^}]*animation:\s*abs-file-away\b/.test(source),
  'the sourcing filing state must keep using the abs-file-away animation',
);

console.log('Sourcing animation class-isolation regression checks passed.');
