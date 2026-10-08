# LifeOS — Legal / Privacy / Accessibility / Trust & Safety Audit

**Audit date:** 2026-10-08
**Auditor:** Base44 AI (automated code audit)
**Branch:** atharv-oct-08

> **This implementation is not a substitute for review by a qualified lawyer** for the business's actual jurisdiction, business model, contracts, data flows, and users.

---

## A. IMPLEMENTED — What was fixed

### Legal pages created
- `/privacy` — Privacy Policy reflecting actual data flows, with configuration placeholders for business details
- `/terms` — Terms & Conditions with governing law placeholder
- `/refunds` — Refund & Cancellation Policy (no paid services exist; policy states terms will apply when paid services launch)
- `/cookies` — Cookie & Storage Policy documenting that only strictly necessary cookies are used (no consent banner needed)
- All pages display effective date and last updated date
- All pages are accessible without authentication
- All pages are linked from: login page (Terms + Privacy), Settings page (all four), and each other (footer)

### Privacy controls added
- Account deletion UI in Settings → Account (password + typed confirmation, permanent deletion)
- Password change UI in Settings → Account
- Session revocation UI in Settings → Account ("Revoke other sessions")
- Legal links in Settings page footer

### Marketing claims fixed
- "Encrypted · Private · Yours" → "Your data · Your control · Exportable" (the original "Encrypted" was misleading — user content in the SQLite database is not encrypted at rest; only passwords, sessions, and AI keys are hashed/encrypted)

### Accessibility fixes
- Light theme `--text-3` contrast fixed: `#8a8a94` → `#64646e` (was 3.2:1 on light bg, now ≥4.7:1 on all light surfaces — passes WCAG 2.2 AA)
- Dark theme `--text-3` contrast improved: `#80808d` → `#8a8a96` (was 4.19:1 on surface-3, now ≥4.7:1 — passes WCAG 2.2 AA)
- Legal pages use semantic HTML (h1/h2/h3, ul/li, nav, header, footer)
- Legal pages have skip-to-content equivalent (back link is first focusable element)
- Auth form has privacy notice with links to Terms and Privacy Policy

---

## B. DATA INVENTORY — What personal data the app handles

| Data category | Example | Source | Purpose | Required/Optional | Storage | Processor | Retention | User control | Legal basis | Risk | Action |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Email | user@example.com | User registration | Account identification, authentication | Required | SQLite `users.email` | LifeOS server | Until account deletion | Profile edit, account deletion | Consent (registration) | Low | None |
| Name | John Doe | User registration | Personalization, greeting | Required | SQLite `users.name` | LifeOS server | Until account deletion | Profile edit, account deletion | Consent (registration) | Low | None |
| Password (hashed) | (scrypt hash) | User registration | Authentication | Required | SQLite `users.password_hash` (scrypt) | LifeOS server | Until account deletion | Password change, account deletion | Contract (service provision) | Low | None |
| Session token (hashed) | (SHA-256 hash) | Server-issued | Session management | Required (auto) | SQLite `sessions.token_hash` | LifeOS server | 30 days or logout | Logout, revoke sessions | Legitimate interest (security) | Low | None |
| User-Agent | Mozilla/5.0... | HTTP header | Session security | Required (auto, truncated 200 chars) | SQLite `sessions.user_agent` | LifeOS server | 30 days | Logout | Security | Low | None |
| Timezone | Asia/Calcutta | Browser Intl API | Date/time display | Required (auto-detected, configurable) | SQLite `users.settings` JSON | LifeOS server | Until account deletion | Settings | Consent | Low | None |
| Google OAuth profile | name, email, picture URL | Google API | Authentication (alternative) | Optional | SQLite `users.provider`, `provider_id`, `picture` | LifeOS server + Google | Until account deletion | Account deletion | Consent (OAuth) | Medium | None |
| User content (tasks, goals, projects, milestones, deadlines, events, habits, notes, memories, decisions, accomplishments, reviews, experiments, etc.) | "Buy groceries" | User input | Core app functionality | Optional (user-created) | SQLite (user-scoped tables) | LifeOS server | Until deletion/archival | Edit, archive, delete, export | Contract (service provision) | Medium | None |
| Agent messages | "Plan my week" | User input to Agent | AI conversation | Optional (opt-in) | SQLite `messages` table | LifeOS server | Until deletion | Delete conversation, account deletion | Consent (opt-in) | Medium | None |
| AI API key (BYOK) | AIza... | User input (Settings) | AI Agent functionality | Optional (opt-in) | SQLite `ai_keys.key_enc` (AES-256-GCM encrypted) | LifeOS server | Until key deletion | Delete key in Settings | Consent (opt-in) | Medium | None |
| Activity log | "Task completed" | Server (auto) | Timeline, audit trail | Auto-generated | SQLite `activity` table | LifeOS server | Until account deletion | Account deletion | Legitimate interest | Low | None |
| Settings/preferences | theme, density, motion | User input | UI customization | Optional | SQLite `users.settings` JSON | LifeOS server | Until account deletion | Settings | Consent | Low | None |
| Recent searches | "groceries" | User search queries | Search history | Optional (max 8, auto-rotated) | SQLite `users.settings` JSON | LifeOS server | Until account deletion | Settings (auto-cleared) | Consent | Low | None |
| Sidebar preference | "collapsed" | User toggle | UI state | Optional | `localStorage` | Browser | Until cleared | Toggle sidebar | Consent | Low | None |

**Data NOT collected:**
- IP addresses (not stored or logged)
- Device identifiers
- Behavioral profiles
- Analytics identifiers
- Location data
- Biometric data
- Payment credentials
- Contact lists
- File uploads

---

## C. THIRD PARTIES — Every actual provider found

| Provider | Purpose | Data shared | Receives personal data? | Privacy documentation | Consent needed? | Disclosed in Privacy Policy? |
|---|---|---|---|---|---|---|
| Google (OAuth) | Sign-in (optional) | Name, email, profile picture URL (received from Google) | Yes (Google already has this data) | [Google Privacy Policy](https://policies.google.com/privacy) | Yes (user chooses Google sign-in) | Yes |
| Google Gemini API | AI Agent (BYOK) | User message, context summary (goals, deadlines, memories, capacity), tool results | Yes (user's own API key, user's data sent to Google's API) | [Google Gemini API](https://developers.google.com/gemini) | Yes (user must configure own key; can avoid entirely) | Yes |
| Integration framework (Google Calendar, Outlook, Gmail, Google Drive) | NOT FUNCTIONAL | None — OAuth flows not implemented | No | N/A | N/A | Yes (disclosed as not functional) |

**No other third parties found:**
- No analytics providers
- No error monitoring (Sentry, Bugsnag, LogRocket)
- No payment providers
- No email service providers
- No CDN/CDN-hosted assets
- No embedded third-party content
- No advertising networks

---

## D. COOKIES / TRACKING — What exists and whether consent is needed

### Cookies (all first-party, all strictly necessary)

| Cookie | Purpose | Type | Lifetime | Classification | Consent required? |
|---|---|---|---|---|---|
| `lifeos_session` | Authentication | HttpOnly, SameSite=Lax | 30 days | Strictly necessary | No |
| `lifeos_oauth_state` | OAuth CSRF protection | HttpOnly, SameSite=Lax | 10 minutes | Strictly necessary | No |

### Local storage

| Key | Purpose | Contains personal data? | Classification |
|---|---|---|---|
| `lifeos:sidebar` | Sidebar collapse state | No | Strictly necessary (UI preference) |

### Session storage
None used.

### Tracking / analytics / advertising
**None found.** No Google Analytics, no gtag, no Facebook Pixel, no Hotjar, no Sentry, no LogRocket, no advertising SDKs, no marketing scripts.

### Consent mechanism
**No cookie consent banner implemented.** This is correct — only strictly necessary cookies are used, and consent is not required for strictly necessary cookies under ePrivacy/cookie regulations.

If non-essential cookies or tracking are added in the future, a consent mechanism must be implemented before they are loaded.

---

## E. LEGAL PAGES — Which pages were created

| Route | Page | Status |
|---|---|---|
| `/privacy` | Privacy Policy | IMPLEMENTED — reflects actual data flows |
| `/terms` | Terms & Conditions | IMPLEMENTED — governing law placeholder |
| `/refunds` | Refund & Cancellation Policy | IMPLEMENTED — no paid services; terms deferred |
| `/cookies` | Cookie & Storage Policy | IMPLEMENTED — documents strictly-necessary-only finding |

---

## F. ACCESSIBILITY — What was fixed and what remains

### Fixed
- Light theme `--text-3` contrast: 3.2:1 → ≥4.7:1 (WCAG 2.2 AA pass)
- Dark theme `--text-3` contrast: 4.19:1 → ≥4.7:1 (WCAG 2.2 AA pass)
- Legal pages use semantic HTML with proper heading hierarchy
- Auth form has accessible legal notice with links

### Already compliant (verified in code audit)
- Skip link to `#main` exists ✓
- `:focus-visible` outline (2px solid accent) on all elements ✓
- Focus trap in Overlay dialogs (Tab/Shift+Tab cycling, Escape to close, focus restoration) ✓
- ARIA roles: `role="dialog"`, `aria-modal`, `role="tablist"`, `role="tab"`, `role="switch"`, `role="checkbox"`, `role="progressbar", `role="menu"`, `role="menuitemradio"`, `role="radiogroup"`, `role="radio"` ✓
- `aria-label` on icon buttons (IconButton, brand toggle, close buttons) ✓
- `aria-live="polite"` on toast container and agent thread ✓
- `role="alert"` on error messages ✓
- `role="status"` on loading states ✓
- Reduced motion support via `prefers-reduced-motion` ✓
- Semantic HTML: `<button>`, `<nav>`, `<main>`, `<header>`, `<section>`, `<form>`, `<label>` ✓
- No clickable `<div>` where `<button>` is appropriate (Row component uses `<button>` when onClick is provided) ✓
- Progress bars have `aria-valuenow`, `aria-valuemin`, `aria-valuemax` ✓
- Form fields have `<label htmlFor>` associations ✓
- Form errors have `aria-invalid` and `aria-describedby` ✓

### Remaining (not blocking, but noted)
- Password show/hide toggle button has `tabIndex={-1}` (intentional design choice — not keyboard accessible, but the password field itself is)
- `select` elements use native `<select>` (accessible by default)
- No automated WCAG audit tool was run (manual code audit only)

---

## G. COPYRIGHT — Assets with verified provenance vs assets needing review

### Verified (original / system-provided)
- **All icons**: Custom SVG paths defined in `src/ui/Icon.tsx` — original work, no attribution required
- **Logo**: Custom SVG (purple rounded square with circle) — original
- **Auth background visuals** (NeuralField, ParticleField): Canvas-based procedural animations — original code
- **Google "G" icon**: Standard Google logo SVG used for sign-in button — Google brand asset, used in accordance with Google sign-in branding guidelines
- **Fonts**: System font stack (`ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`) — no web fonts loaded, no license issues
- **Favicon**: Inline SVG data URI — original

### No external images found
- No `<img>` tags in the application
- No image files in the repository (no PNG, JPG, SVG files in `src/` or `public/`)
- No stock images
- No illustrations (the "recycling illustration" mentioned in the audit request was not found in the codebase)

### Assets needing review
None identified. All visual assets are original code-generated SVG/canvas.

---

## H. MARKETING CLAIMS — Claims removed/changed

| Claim | Location | Action | Reason |
|---|---|---|---|
| "Encrypted · Private · Yours" | Login page brand footer | Changed to "Your data · Your control · Exportable" | "Encrypted" was misleading — user content in SQLite is not encrypted at rest; only passwords (scrypt), sessions (SHA-256), and AI keys (AES-256-GCM) are hashed/encrypted |

### Claims verified as accurate (retained)
- "Your personal operating system — capture, plan, act, measure, reflect and learn across every domain of life, powered by the LifeOS Agent." — accurate (all features exist)
- "Goals, projects & milestones with real measurement" — accurate
- "Calendar, capacity & deadline intelligence" — accurate
- "LifeOS Agent — your AI life operator with real tools" — accurate (Agent has real tools, BYOK model)
- "Start understanding your life today" — opinion/tagline, not a factual claim
- "Don't manage your life. Understand it." — opinion/tagline, not a factual claim

### No fake reviews/testimonials found
- No testimonials, reviews, star ratings, customer quotes, "trusted by" sections, user counts, logos, or success statistics exist in the codebase
- No fake adoption claims

---

## I. BUSINESS DETAILS — Missing information you must provide

All placeholders are in `src/features/legal/legalConfig.ts`. Replace before public launch:

| Placeholder | Description | Required for |
|---|---|---|---|
| `[LEGAL BUSINESS NAME — REQUIRED BEFORE PUBLIC LAUNCH]` | Legal name of the business/operator | Privacy Policy, Terms, footer copyright |
| `[BUSINESS ADDRESS — REQUIRED IF APPLICABLE]` | Business address | Privacy Policy (if required by jurisdiction) |
| `[COMPANY REGISTRATION NUMBER — REQUIRED IF APPLICABLE]` | Company registration number | Terms (if required by jurisdiction) |
| `[PRIVACY CONTACT EMAIL — REQUIRED]` | Email for privacy questions and data requests | Privacy Policy, Terms, Cookies, Refunds |
| `[SUPPORT CONTACT EMAIL — REQUIRED IF DIFFERENT]` | Email for support | Terms (if different from privacy contact) |
| `[GRIEVANCE OFFICER NAME — REQUIRED FOR INDIA/DPDP IF APPLICABLE]` | Name of grievance officer | Privacy Policy (DPDP compliance) |
| `[GRIEVANCE CONTACT EMAIL — REQUIRED FOR INDIA/DPDP IF APPLICABLE]` | Email for grievances | Privacy Policy (DPDP compliance) |
| `[GOVERNING LAW / JURISDICTION — CONFIGURE BEFORE LAUNCH]` | Governing law for Terms | Terms & Conditions |

---

## J. REFUNDS — Whether a refund policy is actually required

**No refund policy is required at this time.** LifeOS does not charge money:
- No subscriptions or recurring payments
- No paid plans or premium tiers
- No in-app purchases
- No payment processing
- No trial periods that convert to paid plans
- No payment provider integrated

The `/refunds` page accurately states that no paid services exist and that refund terms will be published before any paid service launches.

**Before introducing paid services:** A detailed refund/cancellation policy must be created matching the actual billing flow, payment provider terms, and applicable consumer protection laws (including India's Consumer Protection (E-Commerce) Rules, 2020 if applicable).

---

## K. FORM CONSENT — Which forms need consent/notice and how implemented

| Form | Purpose | Consent type | Implementation |
|---|---|---|---|
| Sign-up (register) | Account creation | Contract (necessary for service) | Privacy notice with links to Terms and Privacy Policy added below the form |
| Sign-in (login) | Authentication | Contract (necessary for service) | Privacy notice with links to Terms and Privacy Policy added below the form |
| Google sign-in | Authentication | Consent (user chooses OAuth) | Google button is explicit opt-in; privacy notice covers it |
| Capture (inbox) | Content creation | Contract (necessary for service) | No consent needed — user-created content for their own use |
| Entity forms (tasks, goals, etc.) | Content creation | Contract (necessary for service) | No consent needed — user-created content for their own use |
| Agent chat | AI interaction | Consent (opt-in, requires BYOK key) | Agent requires explicit API key configuration; can be disabled in Settings |
| BYOK key input | AI key storage | Consent (opt-in) | Explicit user action; key can be deleted; encrypted at rest |
| Settings (all) | Preferences | Consent | User-controlled toggles; no pre-checked optional consent boxes |

**No marketing consent checkboxes** are needed because no marketing emails or communications are sent.

---

## L. LEGAL RISKS — Ranked

### CRITICAL
1. **No governing law configured** — Terms reference a placeholder jurisdiction. Without a real governing law, the Terms are not legally enforceable. **NEEDS BUSINESS INPUT.**
2. **No business identity configured** — Privacy Policy, Terms, and footer reference placeholder business name. **NEEDS BUSINESS INPUT.**
3. **No privacy contact configured** — Users have no way to contact for privacy requests. **NEEDS BUSINESS INPUT.**

### HIGH
4. **DPDP grievance officer not configured** — If targeting Indian users, the DPDP Act may require a designated grievance officer. **NEEDS LEGAL REVIEW.**
5. **BYOK_SECRET default fallback** — `server/byok.mjs` uses a hardcoded default secret (`'lifeos-byok-default-secret-key-v1'`) if `BYOK_SECRET` env var is not set. This means AI keys encrypted at rest could be decrypted by anyone who knows the default. **NEEDS BUSINESS INPUT** — set `BYOK_SECRET` to a strong random value in production.
6. **COOKIE_SECURE not enforced** — The `Secure` flag on cookies is conditional on `COOKIE_SECURE=1` env var. In production (HTTPS), this should be set. **NEEDS BUSINESS INPUT.**
7. **No breach notification process** — The DPDP Act requires breach notification to affected users and the Data Protection Board. No process is documented. **NEEDS LEGAL REVIEW.**

### MEDIUM
8. **Data retention not automated** — Data is retained until account deletion, but there is no automated retention policy or scheduled cleanup. If a user abandons their account, data persists indefinitely. **NEEDS BUSINESS INPUT.**
9. **No data processing agreement with Google** — If acting as a data processor/controller under DPDP/GDPR, a data processing agreement with Google may be needed. **NEEDS LEGAL REVIEW.**
10. **AI provider data handling not verified** — The Privacy Policy states data is sent to Google Gemini API but does not verify Google's actual data retention or training policies for the user's specific API configuration. **NEEDS LEGAL REVIEW.**
11. **International transfer assessment** — If users are outside India, additional data protection regimes (GDPR, UK GDPR, CCPA/CPRA) may apply. Applicability depends on the business's targeting and operations. **NEEDS LEGAL REVIEW.**
12. **No age verification** — The Terms state users must be 18+, but no age verification mechanism exists. **NEEDS LEGAL REVIEW.**

### LOW
13. **No HTTPS enforcement in code** — HTTPS depends on the deployment configuration (reverse proxy). The code supports `Secure` cookies but does not enforce HTTPS redirects. **NEEDS BUSINESS INPUT.**
14. **Rate limiter is in-memory** — The auth rate limiter uses an in-memory Map, which resets on server restart. This is adequate for a single-instance deployment but not for multi-instance. **Technical risk, not legal.**

---

## M. NEEDS HUMAN/LAWYER REVIEW

The following issues cannot be safely decided from the codebase and require human/legal review:

1. **Governing law and jurisdiction** — Must be determined based on the business's actual legal entity, location, and target market.
2. **DPDP Act applicability and compliance** — Whether the DPDP Act, 2023 and DPDP Rules, 2025 apply depends on the business's operations and whether it is a "data fiduciary" under the Act. Specific requirements (notice format, consent management, grievance officer appointment, breach notification) depend on the business's classification and the Rules' commencement date.
3. **GDPR/UK GDPR applicability** — If LifeOS is offered to users in the EU/UK, GDPR/UK GDPR may apply regardless of where the business is located. This requires legal assessment of targeting and data flows.
4. **CCPA/CPRA applicability** — If LifeOS is offered to California residents, CCPA/CPRA may apply. Requires legal assessment.
5. **Consumer Protection (E-Commerce) Rules, 2020** — Applicability depends on whether LifeOS qualifies as an e-commerce entity under Indian law.
6. **Data processing agreements with Google** — Whether a DPA is needed depends on the business's role (controller/processor) and Google's terms.
7. **AI provider data handling** — Whether Google Gemini API uses user data for training, and the retention period, must be verified against Google's current API terms — not assumed.
8. **Children's data** — Whether the service is likely to attract users under 18 and what age verification (if any) is appropriate.
9. **Accessibility legal requirements** — Whether WCAG compliance is legally required in the target market (e.g., ADA in the US, accessibility laws in the EU) depends on the jurisdiction and service classification.
10. **BYOK_SECRET configuration** — A strong, unique `BYOK_SECRET` must be set in production. The default value must never be used in production.
11. **COOKIE_SECURE and HTTPS** — Production deployment must enforce HTTPS and set `COOKIE_SECURE=1`.
12. **Data retention policy** — A formal data retention schedule should be defined and documented, including for abandoned accounts.

---

## Applicable Law Audit

### India
| Law/Rules | Applicability | Status |
|---|---|---|
| Digital Personal Data Protection Act, 2023 | Likely applicable if targeting Indian users | PARTIALLY IMPLEMENTED — notice, consent, access/correction/deletion, withdrawal mechanisms implemented. Grievance officer, breach notification, and formal retention policy NEEDS LEGAL REVIEW. |
| Digital Personal Data Protection Rules, 2025 | Likely applicable if targeting Indian users | PARTIALLY IMPLEMENTED — standalone notice provided (Privacy Policy). Specific Rule requirements depend on commencement date. NEEDS LEGAL REVIEW. |
| Consumer Protection Act, 2019 | Potentially applicable if offering paid services | NOT APPLICABLE currently (no paid services). Will apply if paid services are introduced. |
| Consumer Protection (E-Commerce) Rules, 2020 | Potentially applicable if classified as e-commerce | UNKNOWN — NEEDS LEGAL REVIEW. |
| IT Act / cybersecurity requirements | Potentially applicable | PARTIALLY IMPLEMENTED — reasonable security safeguards in place (password hashing, encryption, rate limiting). Formal compliance NEEDS LEGAL REVIEW. |

### International
| Regime | Applicability | Status |
|---|---|---|
| GDPR / UK GDPR | May apply if targeting EU/UK users | UNKNOWN — depends on targeting and operations. If applicable, additional requirements include: DPO appointment, records of processing, DPIA, standard contractual clauses for international transfers. NEEDS LEGAL REVIEW. |
| ePrivacy / cookie requirements | May apply if targeting EU/UK users | IMPLEMENTED — only strictly necessary cookies used, no consent banner needed. If non-essential cookies are added, consent mechanism required. |
| CCPA / CPRA | May apply if targeting California users | UNKNOWN — depends on whether business meets CCPA thresholds. NEEDS LEGAL REVIEW. |
| Accessibility laws (ADA, EU EN 301 549) | May apply depending on target market | PARTIALLY IMPLEMENTED — WCAG 2.2 AA targeted. Formal compliance not certified. NEEDS LEGAL REVIEW. |

---

## Compliance Status Summary

| Area | Status |
|---|---|
| Privacy notice | IMPLEMENTED |
| Consent (registration) | IMPLEMENTED |
| Consent (Agent/AI) | IMPLEMENTED (opt-in, BYOK) |
| Data minimization | IMPLEMENTED — no unnecessary data collected |
| Access/correction/deletion | IMPLEMENTED — export, edit, delete account |
| Withdrawal of consent | IMPLEMENTED — disable agent, delete key, delete account |
| Grievance handling | PARTIALLY IMPLEMENTED — contact email placeholder; formal process NEEDS LEGAL REVIEW |
| Security safeguards | IMPLEMENTED — hashing, encryption, rate limiting, HttpOnly cookies |
| Breach notification | NOT IMPLEMENTED — NEEDS LEGAL REVIEW |
| Retention/deletion | PARTIALLY IMPLEMENTED — data deleted on account deletion; formal retention schedule NEEDS BUSINESS INPUT |
| Children's data | PARTIALLY IMPLEMENTED — Terms state 18+; no verification mechanism |
| Cookie consent | NOT APPLICABLE — only strictly necessary cookies |
| Analytics consent | NOT APPLICABLE — no analytics |
| Accessibility (WCAG 2.2 AA) | PARTIALLY IMPLEMENTED — contrast fixed, semantic HTML, ARIA, keyboard support; no automated audit |
| Marketing claims | IMPLEMENTED — misleading claims removed |
| Business details | NEEDS BUSINESS INPUT — all placeholders must be filled |
| Refund policy | IMPLEMENTED — no paid services; terms deferred |
