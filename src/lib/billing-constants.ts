// Pioneer Plan Pricing — Marketing-Site copy source.
// Public website copy prices the plan per internal user.

export const PIONEER_PRICE_EUR = 149;
export const PIONEER_COMPARE_AT_EUR = 249;
export const PIONEER_LIMIT = 100;
export const PIONEER_LOOKUP_KEY = 'shortselect_pioneer_monthly_v1';

export const STANDARD_PRICE_EUR = 249;
export const STANDARD_LOOKUP_KEY = 'shortselect_standard_monthly_v1';

export const TRIAL_DAYS = 30;

export const SLOT_STATUS_ENDPOINT =
  'https://aztqhtluvomqnxdavjxp.supabase.co/functions/v1/get-pioneer-slot-status';

// Deprecated — historisch (Founders Deal beendet 2026-05-30 mit AGB v1.2).
// NICHT loeschen: wird in AGB §4b Abs. 5 (historischer Hinweis) referenziert.
/** @deprecated Founders Deal ended with AGB v1.2. Use PIONEER_* constants. */
export const FOUNDERS_DEAL_PRICE_EUR_DEPRECATED = 89;
/** @deprecated */
export const FOUNDERS_DEAL_LIMIT_DEPRECATED = 100;
