/**
 * Legal configuration — single source of truth for business details used across
 * Privacy Policy, Terms, Refunds, and Cookies pages.
 *
 * Every value below is a PLACEHOLDER. Replace each with real business information
 * before public launch. Values wrapped in [BRACKETS] are intentionally invalid
 * placeholders — they render visibly on the page so missing info is obvious.
 *
 * DO NOT ship to production with placeholder values.
 */
export const LEGAL_CONFIG = {
  // ── Business identity ──
  businessName: '[LEGAL BUSINESS NAME — REQUIRED BEFORE PUBLIC LAUNCH]',
  businessAddress: '[BUSINESS ADDRESS — REQUIRED IF APPLICABLE]',
  companyRegistration: '[COMPANY REGISTRATION NUMBER — REQUIRED IF APPLICABLE]',

  // ── Contact ──
  contactEmail: '[PRIVACY CONTACT EMAIL — REQUIRED]',
  supportEmail: '[SUPPORT CONTACT EMAIL — REQUIRED IF DIFFERENT]',
  grievanceOfficer: '[GRIEVANCE OFFICER NAME — REQUIRED FOR INDIA/DPDP IF APPLICABLE]',
  grievanceEmail: '[GRIEVANCE CONTACT EMAIL — REQUIRED FOR INDIA/DPDP IF APPLICABLE]',

  // ── Legal ──
  governingLaw: '[GOVERNING LAW / JURISDICTION — CONFIGURE BEFORE LAUNCH]',

  // ── Dates (ISO format) ──
  effectiveDate: '2026-10-08',
  lastUpdated: '2026-10-08',

  // ── App identity ──
  appName: 'LifeOS',
  appDescription: 'a personal life operating system for capturing, planning, acting, measuring, reflecting, and learning across life domains',
} as const;

/**
 * Returns true if a config value is still a placeholder.
 * Used to render visible warnings on legal pages.
 */
export function isPlaceholder(value: string): boolean {
  return value.startsWith('[') && value.endsWith(']');
}
