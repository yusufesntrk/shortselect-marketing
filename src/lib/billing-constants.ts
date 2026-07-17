// [BILLING-CONSTANTS-SYNC]
// Pro Plan Pricing — Marketing-Site copy source.
// Twin von ~/shortselect/project-spark/src/lib/billing-constants.ts (App-Repo).
// Public website copy prices the plan per internal user.

// === PRO PLAN (aktiv, Neukunden-Tarif seit 2026-07) ===
export const PRO_PRICE_MONTHLY_EUR = 199;
/** Jahresabo: 9 x 199 = 1.791 € netto pro User/Jahr, Vorauszahlung. */
export const PRO_PRICE_ANNUAL_EUR = 1791;
/**
 * Effektiver Monatspreis bei Jahresabrechnung (1.791 / 12 = 149,25 €).
 * Anzeige-Konvention (Close-CRM-Style): Jahresplan wird als Preis pro
 * User/Monat "bei jährlicher Abrechnung" beworben; die Jahressumme steht
 * nur dezent im Kleingedruckten.
 */
export const PRO_ANNUAL_EFFECTIVE_MONTHLY_EUR = PRO_PRICE_ANNUAL_EUR / 12;
export const PRO_ANNUAL_MONTHS_FREE = 3;
export const PRO_MONTHLY_LOOKUP_KEY = 'shortselect_pro_monthly_v1';
export const PRO_ANNUAL_LOOKUP_KEY = 'shortselect_pro_annual_v1';
/** Jahresabo: Kuendigungsfrist in Monaten zum Ende der Vertragslaufzeit (AGB §7). */
export const ANNUAL_NOTICE_MONTHS = 6;
export const ANNUAL_TERM_MONTHS = 12;

export const TRIAL_DAYS = 14;

// === PIONEER PLAN (DEPRECATED, Neuverkauf geschlossen 2026-07 mit AGB v1.3) ===
// NICHT loeschen: wird in AGB §4b (Bestandsschutz-Klauseln) referenziert.
/** @deprecated Pro Plan hat Pioneer ersetzt (Neukunden). Nur fuer Legacy-Copy. */
export const PIONEER_PRICE_EUR = 149;
/** @deprecated */
export const PIONEER_COMPARE_AT_EUR = 300;
/** @deprecated */
export const PIONEER_LIMIT = 100;
/** @deprecated */
export const PIONEER_LOOKUP_KEY = 'shortselect_pioneer_monthly_v1';

/** @deprecated Pro Plan hat Standard ersetzt (Neukunden). */
export const STANDARD_PRICE_EUR = 300;
/** @deprecated */
export const STANDARD_LOOKUP_KEY = 'shortselect_standard_monthly_v1';

/** @deprecated Endpoint bleibt live (Legacy-Badges), wird auf /preise nicht mehr genutzt. */
export const SLOT_STATUS_ENDPOINT =
  'https://aztqhtluvomqnxdavjxp.supabase.co/functions/v1/get-pioneer-slot-status';

// Deprecated — historisch (Founders Deal beendet 2026-05-30 mit AGB v1.2).
// NICHT loeschen: wird in AGB §4b Abs. 5 (historischer Hinweis) referenziert.
/** @deprecated Founders Deal ended with AGB v1.2. */
export const FOUNDERS_DEAL_PRICE_EUR_DEPRECATED = 89;
/** @deprecated */
export const FOUNDERS_DEAL_LIMIT_DEPRECATED = 100;
