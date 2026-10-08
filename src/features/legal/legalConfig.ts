/**
 * Legal configuration — single source of truth for business details used across
 * Privacy Policy, Terms, Refunds, and Cookies pages.
 *
 * Every value below is EMPTY by default. Replace each with real business information
 * before public launch. When a value is empty, the legal pages render a clean
 * "to be provided before launch" note instead of fabricated information.
 *
 * DO NOT ship to production with empty values.
 */
export const LEGAL_CONFIG = {
  // ── Business identity ──
  businessName: '',
  businessAddress: '',
  companyRegistration: '',

  // ── Contact ──
  contactEmail: '',
  supportEmail: '',
  grievanceOfficer: '',
  grievanceEmail: '',

  // ── Legal ──
  governingLaw: '',

  // ── Dates (ISO format) ──
  effectiveDate: '2026-10-08',
  lastUpdated: '2026-10-08',

  // ── App identity ──
  appName: 'LifeOS',
  appDescription: 'a personal life operating system for capturing, planning, acting, measuring, reflecting, and learning across life domains',
} as const;

/**
 * Returns true if a config value is still a placeholder (empty or bracketed).
 * Used to render a clean pending note on legal pages.
 */
export function isPlaceholder(value: string): boolean {
  return !value || (value.startsWith('[') && value.endsWith(']'));
}
