import { LegalLayout, ConfigValue } from './LegalLayout';
import { LEGAL_CONFIG } from './legalConfig';

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie & Storage Policy">
      <p>
        This Cookie &amp; Storage Policy explains what cookies and browser storage {LEGAL_CONFIG.appName} uses
        and why. It reflects the actual implementation as of {LEGAL_CONFIG.effectiveDate}.
      </p>

      <h2>1. Audit summary</h2>
      <p>
        We audited {LEGAL_CONFIG.appName} for cookies, local storage, session storage, tracking pixels,
        analytics scripts, advertising SDKs, and marketing scripts. Here is what we found:
      </p>
      <ul>
        <li><strong>No analytics or tracking cookies.</strong> We do not use Google Analytics, Facebook Pixel, Hotjar, or any other analytics or tracking service.</li>
        <li><strong>No advertising cookies.</strong> We do not use advertising SDKs or marketing pixels.</li>
        <li><strong>No third-party cookies.</strong> All cookies are first-party, set by {LEGAL_CONFIG.appName} itself.</li>
        <li><strong>No cookie consent banner.</strong> Because only strictly necessary cookies are used, no consent banner is shown. This is in accordance with ePrivacy and cookie regulations — consent is not required for strictly necessary cookies.</li>
      </ul>

      <h2>2. Cookies used</h2>

      <h3>lifeos_session (Strictly Necessary)</h3>
      <ul>
        <li><strong>Purpose:</strong> Keeps you logged in. Without this cookie, you would need to sign in on every page load.</li>
        <li><strong>Type:</strong> First-party, HttpOnly (not accessible via JavaScript), SameSite=Lax.</li>
        <li><strong>Lifetime:</strong> 30 days from login, or until you log out.</li>
        <li><strong>Classification:</strong> Strictly necessary. No consent required.</li>
      </ul>

      <h3>lifeos_oauth_state (Strictly Necessary)</h3>
      <ul>
        <li><strong>Purpose:</strong> Protects against cross-site request forgery (CSRF) during Google OAuth sign-in.</li>
        <li><strong>Type:</strong> First-party, HttpOnly, SameSite=Lax.</li>
        <li><strong>Lifetime:</strong> 10 minutes. Deleted immediately after the OAuth flow completes or fails.</li>
        <li><strong>Classification:</strong> Strictly necessary. No consent required.</li>
      </ul>

      <h2>3. Local storage</h2>
      <p>
        {LEGAL_CONFIG.appName} uses <strong>localStorage</strong> for one purpose:
      </p>
      <ul>
        <li><strong>lifeos:sidebar</strong> — stores whether your sidebar is collapsed or expanded. This is a UI preference and contains no personal data.</li>
      </ul>
      <p>
        {LEGAL_CONFIG.appName} does <strong>not</strong> use sessionStorage.
      </p>

      <h2>4. No tracking or advertising</h2>
      <p>
        We do not embed third-party tracking scripts, advertising networks, social media widgets, or
        marketing pixels. The only third-party services that may set cookies are:
      </p>
      <ul>
        <li><strong>Google</strong> — only if you use Google sign-in. Google may set its own cookies during the OAuth flow on Google's domains. These are governed by Google's privacy policy, not ours.</li>
      </ul>

      <h2>5. Managing cookies and storage</h2>
      <ul>
        <li><strong>Session cookie:</strong> Deleted when you log out or after 30 days. You can revoke other sessions in Settings.</li>
        <li><strong>OAuth state cookie:</strong> Deleted automatically within 10 minutes.</li>
        <li><strong>Local storage:</strong> You can clear your browser's local storage at any time. This will reset your sidebar to its default state.</li>
        <li><strong>Browser settings:</strong> You can control cookies in your browser settings. Blocking the session cookie will prevent you from staying logged in.</li>
      </ul>

      <h2>6. Why no consent banner?</h2>
      <p>
        Under the EU ePrivacy Directive and equivalent regulations in other jurisdictions, consent is not
        required for cookies that are strictly necessary for the service requested by the user. Since{' '}
        {LEGAL_CONFIG.appName} only uses strictly necessary cookies (authentication and security), no
        consent banner is shown.
      </p>
      <p>
        If {LEGAL_CONFIG.appName} introduces non-essential cookies (e.g., analytics) in the future, a consent
        mechanism will be implemented before those cookies are set, giving users the ability to accept, reject,
        and manage preferences.
      </p>

      <h2>7. Contact</h2>
      <p>
        For questions about this policy, contact us at <ConfigValue value={LEGAL_CONFIG.contactEmail} />.
      </p>
    </LegalLayout>
  );
}
