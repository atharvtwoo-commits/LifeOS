import { LegalLayout, ConfigValue } from './LegalLayout';
import { LEGAL_CONFIG, isPlaceholder } from './legalConfig';

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>
        This Privacy Policy explains what information {LEGAL_CONFIG.appName} collects, why it is collected,
        how it is used, and the controls you have over your data. It reflects the actual implementation of
        the application as of {LEGAL_CONFIG.effectiveDate}.
      </p>

      <div className="legal-callout">
        <p>
          <strong>This implementation is not a substitute for review by a qualified lawyer</strong> for the
          business's actual jurisdiction, business model, contracts, data flows, and users.
        </p>
      </div>

      <h2>1. Who operates {LEGAL_CONFIG.appName}</h2>
      <p>
        {LEGAL_CONFIG.appName} is operated by <ConfigValue value={LEGAL_CONFIG.businessName} />.
        {!isPlaceholder(LEGAL_CONFIG.businessAddress) && (
          <> Our address is <ConfigValue value={LEGAL_CONFIG.businessAddress} />.</>
        )}
      </p>
      <p>
        For privacy questions, contact us at <ConfigValue value={LEGAL_CONFIG.contactEmail} />.
      </p>

      <h2>2. What information we collect</h2>

      <h3>Account information</h3>
      <ul>
        <li><strong>Email address</strong> — used to identify your account and send you service-related communications if needed. Required at sign-up.</li>
        <li><strong>Name</strong> — used for personalization (e.g., greeting you by name). Required at sign-up.</li>
        <li><strong>Password</strong> — stored as a cryptographic hash (scrypt). We never store or see your plain-text password. Required at sign-up.</li>
      </ul>

      <h3>Google sign-in data (optional)</h3>
      <ul>
        <li>If you choose Google sign-in, Google shares your <strong>name, email address, and profile picture URL</strong> with us. We use these to create or link your account. Google does not share your Google password with us.</li>
      </ul>

      <h3>Content you create</h3>
      <ul>
        <li>Tasks, goals, projects, milestones, deadlines, calendar events, habits, notes, captured thoughts, memories, decisions, accomplishments, reviews, experiments, and other records you create within {LEGAL_CONFIG.appName}.</li>
        <li>This data is <strong>user-created and optional</strong>. You decide what to enter. The application does not function without some of this data (e.g., tasks need a title), but you are never required to enter specific content.</li>
      </ul>

      <h3>Agent (AI) messages</h3>
      <ul>
        <li>If you use the {LEGAL_CONFIG.appName} Agent (AURA), your messages to the Agent and the Agent's responses are stored in your account as conversation history.</li>
        <li>Agent is <strong>opt-in</strong> — it requires you to add your own AI API key in Settings. If you do not configure it, no Agent data is created.</li>
      </ul>

      <h3>AI API key (Bring Your Own Key)</h3>
      <ul>
        <li>If you configure the Agent, you provide a Gemini API key. This key is <strong>encrypted at rest</strong> (AES-256-GCM) and is never returned to the browser after storage. Only a 4-character hint is shown to you.</li>
      </ul>

      <h3>Settings and preferences</h3>
      <ul>
        <li>Timezone (auto-detected from your browser), theme preference, density, motion preference, notification settings, and privacy settings.</li>
        <li>Recent search queries (up to 8, stored in your settings, auto-rotated).</li>
      </ul>

      <h3>Automatically collected technical data</h3>
      <ul>
        <li><strong>Session token</strong> — a random token stored as a SHA-256 hash. Used to keep you logged in for up to 30 days.</li>
        <li><strong>User-Agent string</strong> — the first 200 characters of your browser's User-Agent, stored with your session for security purposes.</li>
      </ul>

      <h3>What we do NOT collect</h3>
      <ul>
        <li>We do not use analytics or tracking services.</li>
        <li>We do not use advertising SDKs or marketing pixels.</li>
        <li>We do not collect device identifiers, IP addresses for tracking, or behavioral profiles.</li>
        <li>We do not use third-party error monitoring or crash reporting services.</li>
        <li>We do not send promotional or marketing emails.</li>
      </ul>

      <h2>3. Why and how we use your data</h2>
      <ul>
        <li><strong>To provide the service</strong> — your account, tasks, goals, and all content you create are stored and displayed to you. This is the core purpose of {LEGAL_CONFIG.appName}.</li>
        <li><strong>To authenticate you</strong> — email/password or Google OAuth is used to verify your identity and keep your session.</li>
        <li><strong>To power the Agent (if enabled)</strong> — if you configure the Agent, a summary of your active goals, deadlines, memories, and capacity is sent to the AI provider (see Section 5) along with your message. The Agent also reads specific records on demand through tools (e.g., listing tasks, reading notes) — but only if you have not disabled these in Settings → Privacy.</li>
        <li><strong>To improve your experience</strong> — settings like timezone and theme are used to display content correctly.</li>
        <li><strong>For security</strong> — session tokens and User-Agent strings help us detect and prevent unauthorized access. Rate limiting protects against brute-force attacks.</li>
      </ul>

      <h2>4. Storage and retention</h2>
      <p>
        Your data is stored in a SQLite database on the server running {LEGAL_CONFIG.appName}. All data is
        scoped to your account — no other user can access your data.
      </p>
      <ul>
        <li><strong>Account data and content</strong> — retained until you delete your account. You can delete your account at any time in Settings → Account, which permanently deletes all your data.</li>
        <li><strong>Sessions</strong> — retained for up to 30 days or until you log out. You can revoke other sessions in Settings.</li>
        <li><strong>Agent conversations</strong> — retained until you delete your account or delete individual conversations.</li>
        <li><strong>AI API key</strong> — retained until you delete it in Settings. Stored encrypted; never returned to the browser.</li>
      </ul>

      <h2>5. Third-party processors</h2>

      <h3>Google (authentication)</h3>
      <ul>
        <li><strong>Purpose:</strong> Google sign-in (optional alternative to email/password).</li>
        <li><strong>Data shared:</strong> Your name, email, and profile picture URL (received from Google). Google OAuth scopes: <code>openid</code>, <code>email</code>, <code>profile</code>.</li>
        <li><strong>Provider privacy policy:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.</li>
        <li><strong>Consent:</strong> You choose Google sign-in explicitly. If you use email/password instead, no data is shared with Google for authentication.</li>
      </ul>

      <h3>Google Gemini API (AI Agent — Bring Your Own Key)</h3>
      <ul>
        <li><strong>Purpose:</strong> Powers the {LEGAL_CONFIG.appName} Agent (AURA) if you configure it.</li>
        <li><strong>Data shared:</strong> Your message to the Agent, a context summary (active goals, deadlines, memories, capacity), and tool results (e.g., task lists, project details) are sent to the AI provider's API endpoint.</li>
        <li><strong>Your API key:</strong> The request is authenticated with <em>your own</em> Gemini API key. {LEGAL_CONFIG.appName} does not have a server-side AI key by default. You can review Google's API data handling at <a href="https://developers.google.com/gemini" target="_blank" rel="noopener noreferrer">Google Gemini API documentation</a> and <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.</li>
        <li><strong>Can you avoid it:</strong> Yes. The Agent is entirely optional. If you do not add an API key, no data is sent to any AI provider. You can also disable the Agent in Settings.</li>
        <li><strong>Privacy controls:</strong> In Settings → Privacy, you can control whether the Agent reads your memories and notes. These settings are respected by the Agent's context-building logic.</li>
      </ul>

      <h3>Integration framework (not functional)</h3>
      <ul>
        <li>{LEGAL_CONFIG.appName} has a framework for integrations (Google Calendar, Outlook, Gmail, Google Drive), but the OAuth connection flows are <strong>not implemented</strong>. No data is sent to any integration provider. No integration is active.</li>
      </ul>

      <h2>6. Cookies and local storage</h2>
      <p>
        {LEGAL_CONFIG.appName} uses two cookies, both strictly necessary for authentication and security:
      </p>
      <ul>
        <li><strong>lifeos_session</strong> — keeps you logged in. HttpOnly, SameSite=Lax, 30-day max-age. Without this cookie, you cannot stay logged in.</li>
        <li><strong>lifeos_oauth_state</strong> — protects against CSRF during Google OAuth. HttpOnly, SameSite=Lax, 10-minute max-age. Deleted after the OAuth flow completes.</li>
      </ul>
      <p>
        {LEGAL_CONFIG.appName} uses <strong>localStorage</strong> for one purpose: remembering whether your sidebar is collapsed or expanded (<code>lifeos:sidebar</code>). This is a UI preference and does not contain personal data.
      </p>
      <p>
        We do <strong>not</strong> use analytics cookies, advertising cookies, tracking pixels, or any non-essential cookies. No cookie consent banner is shown because no non-essential cookies or tracking technologies are used.
      </p>
      <p>
        For more details, see our <a href="/cookies">Cookie &amp; Storage Policy</a>.
      </p>

      <h2>7. Security measures</h2>
      <p>We take the following measures to protect your data:</p>
      <ul>
        <li>Passwords are hashed using scrypt — we never store or transmit plain-text passwords.</li>
        <li>Session tokens are stored as SHA-256 hashes — a stolen database does not reveal valid session tokens.</li>
        <li>AI API keys are encrypted at rest using AES-256-GCM.</li>
        <li>Authentication cookies are HttpOnly (not accessible via JavaScript) and SameSite=Lax.</li>
        <li>Rate limiting protects login and registration endpoints against brute-force attacks.</li>
        <li>All data is user-scoped — user IDs are never accepted from the client; they are resolved from the session cookie.</li>
      </ul>
      <p>
        <strong>We do not claim that {LEGAL_CONFIG.appName} is "100% secure" or "unhackable."</strong> No system
        can guarantee perfect security. We implement reasonable safeguards and will work to address any
        vulnerabilities reported to us.
      </p>

      <h2>8. Your rights</h2>
      <p>You have the following rights regarding your data:</p>
      <ul>
        <li><strong>Access:</strong> You can view all your data within {LEGAL_CONFIG.appName}. You can also export all your data as a JSON file via Settings → Data → Export.</li>
        <li><strong>Correction:</strong> You can edit your name in Settings → Account. You can edit any content you have created (tasks, goals, notes, etc.) at any time.</li>
        <li><strong>Deletion:</strong> You can delete individual records, archive them, or permanently delete your entire account (including all data) in Settings → Account.</li>
        <li><strong>Withdrawal of consent:</strong> You can disable the Agent, delete your AI API key, revoke sessions, and delete your account at any time.</li>
        <li><strong>Data portability:</strong> You can export all your data as a JSON file and import it into another {LEGAL_CONFIG.appName} instance.</li>
      </ul>

      <h2>9. India / DPDP Act, 2023</h2>
      <p>
        If you are located in India, the Digital Personal Data Protection Act, 2023 and the Digital Personal
        Data Protection Rules, 2025 may apply to your use of {LEGAL_CONFIG.appName}. We provide this notice
        and the controls described above to help you exercise your rights as a data principal.
      </p>
      <ul>
        <li><strong>Notice:</strong> This Privacy Policy serves as the notice required under the DPDP Act, identifying the personal data collected, the purposes of collection, and the mechanisms for exercising your rights.</li>
        <li><strong>Consent:</strong> By creating an account, you consent to the collection and processing of your data as described in this policy. You can withdraw consent by deleting your account.</li>
        <li><strong>Grievance:</strong> If you have a grievance, contact us at <ConfigValue value={LEGAL_CONFIG.grievanceEmail} />. {!isPlaceholder(LEGAL_CONFIG.grievanceOfficer) && (<>Our grievance officer is <ConfigValue value={LEGAL_CONFIG.grievanceOfficer} />.</>)}</li>
        <li><strong>Children's data:</strong> {LEGAL_CONFIG.appName} is not directed at children under 18 and does not knowingly collect data from children. If you believe a child has provided data, contact us and we will delete it.</li>
      </ul>
      <p>
        <strong>Note:</strong> Some DPDP Rules requirements depend on the commencement date and specific business
        circumstances. Items not yet implemented are flagged in our internal audit. This policy will be
        updated as requirements take effect.
      </p>

      <h2>10. International transfers</h2>
      <p>
        If you use Google sign-in or the AI Agent, your data is processed by Google in accordance with
        Google's privacy policy and terms. Google may process data in countries other than your own. For
        all other data, {LEGAL_CONFIG.appName} stores it on the server where the application is deployed.
        The specific location depends on the hosting configuration.
      </p>

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The effective date and last updated date at the
        top of this page indicate when it was last revised. Material changes will be reflected in the last
        updated date. Continued use of {LEGAL_CONFIG.appName} after a change constitutes acceptance of the
        updated policy.
      </p>

      <h2>12. Contact</h2>
      <p>
        For privacy questions, data requests, or grievances, contact us at:
      </p>
      <ul>
        <li>Email: <ConfigValue value={LEGAL_CONFIG.contactEmail} /></li>
        {!isPlaceholder(LEGAL_CONFIG.grievanceEmail) && (
          <li>Grievance: <ConfigValue value={LEGAL_CONFIG.grievanceEmail} /></li>
        )}
      </ul>
    </LegalLayout>
  );
}
