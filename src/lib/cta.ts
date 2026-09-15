// Einheitlicher Call-to-Action (Entscheidung Yusuf, 15.09.2026).
//
// Jeder Button, der in die Registrierung führt, trägt TRIAL_CTA_LABEL, und
// direkt darunter steht fett TRIAL_CTA_NOTE (Komponente ui/TrialCtaNote.astro).
// Nicht pro Seite umformulieren: die Einheitlichkeit ist der Zweck. Wer den
// Wortlaut ändert, ändert ihn hier, und er ändert sich auf allen Seiten.
import { TRIAL_DAYS } from './billing-constants';

export const TRIAL_CTA_LABEL = `${TRIAL_DAYS} Tage kostenlos testen`;
export const TRIAL_CTA_NOTE = 'Keine Kreditkarte notwendig.';

export const SIGNUP_URL = 'https://app.shortselect.com/signup';

/** Signup-Link mit UTM-Parametern. `content` benennt die Stelle (nav, hero, pricing, ...). */
export const signupUrl = (content: string) =>
  `${SIGNUP_URL}?utm_source=marketing&utm_medium=cta&utm_campaign=pro_plan&utm_content=${content}`;
