import { LegalLayout, ConfigValue } from './LegalLayout';
import { LEGAL_CONFIG } from './legalConfig';

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions">
      <p>
        These Terms &amp; Conditions govern your use of {LEGAL_CONFIG.appName}, {LEGAL_CONFIG.appDescription}.
        By creating an account or using {LEGAL_CONFIG.appName}, you agree to these terms.
      </p>

      <div className="legal-callout">
        <p>
          <strong>This implementation is not a substitute for review by a qualified lawyer</strong> for the
          business's actual jurisdiction, business model, contracts, data flows, and users.
        </p>
      </div>

      <h2>1. Acceptance of terms</h2>
      <p>
        By registering an account, signing in, or using {LEGAL_CONFIG.appName}, you confirm that you have read
        and accepted these Terms. If you do not agree, do not use {LEGAL_CONFIG.appName}.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        {LEGAL_CONFIG.appName} is intended for adults. You must be at least 18 years old to create an account.
        {LEGAL_CONFIG.appName} is not directed at children and does not knowingly collect data from children.
      </p>

      <h2>3. Your account</h2>
      <ul>
        <li>You are responsible for maintaining the security of your account, including your password and any sessions.</li>
        <li>You can change your password at any time in Settings, and revoke other sessions if you suspect unauthorized access.</li>
        <li>You are responsible for all activity that occurs under your account.</li>
        <li>If you use Google sign-in, the security of your Google account is your responsibility.</li>
      </ul>

      <h2>4. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use {LEGAL_CONFIG.appName} for any unlawful purpose.</li>
        <li>Attempt to access another user's data or impersonate another user.</li>
        <li>Attempt to disrupt, overload, or reverse-engineer the service.</li>
        <li>Use the Agent or any AI feature to generate harmful, misleading, or unlawful content.</li>
        <li>Share your account credentials with others.</li>
      </ul>

      <h2>5. Your content</h2>
      <p>
        You retain ownership of all content you create in {LEGAL_CONFIG.appName} (tasks, goals, notes,
        memories, decisions, etc.). You are responsible for the accuracy and legality of your content.
      </p>
      <p>
        {LEGAL_CONFIG.appName} does not claim ownership of your content. Your content is stored in your account
        and is not shared with other users. You can export or delete your content at any time.
      </p>

      <h2>6. AI-generated output</h2>
      <p>
        The {LEGAL_CONFIG.appName} Agent (AURA) provides AI-generated responses and may propose actions (e.g.,
        creating tasks, modifying records). Important limitations:
      </p>
      <ul>
        <li><strong>AI output is not guaranteed or authoritative.</strong> The Agent may make mistakes, misinterpret your intent, or produce inaccurate suggestions.</li>
        <li><strong>Proposed changes require your approval</strong> for modifications to existing records. The Agent may create new records directly (depending on your settings), but you can enable "Confirm creates" in Settings to require approval for all changes.</li>
        <li><strong>You are responsible for reviewing AI-generated content</strong> before accepting it.</li>
        <li><strong>The Agent does not provide professional advice</strong> — it is a productivity tool, not a source of legal, medical, financial, or other professional guidance.</li>
      </ul>

      <h2>7. Intellectual property</h2>
      <p>
        {LEGAL_CONFIG.appName}, including its design, code, icons, and branding, is the property of{' '}
        <ConfigValue value={LEGAL_CONFIG.businessName} />. You may not copy, modify, or redistribute the
        application itself without permission.
      </p>

      <h2>8. Service availability</h2>
      <p>
        {LEGAL_CONFIG.appName} is provided "as is" and "as available." We do not guarantee uninterrupted or
        error-free service. We may modify, suspend, or discontinue features at any time without notice.
      </p>

      <h2>9. Third-party services</h2>
      <p>
        {LEGAL_CONFIG.appName} integrates with third-party services:
      </p>
      <ul>
        <li><strong>Google</strong> — for optional sign-in and optional AI Agent functionality. Google's terms and privacy policy apply to your use of these services.</li>
      </ul>
      <p>
        We are not responsible for the practices of third-party providers. Your use of third-party services is
        governed by their respective terms and policies.
      </p>

      <h2>10. Disclaimer</h2>
      <p>
        {LEGAL_CONFIG.appName} is a productivity tool. It is not a substitute for professional advice. We do not
        warrant that the service will meet your requirements or that it will be error-free. AI-generated
        output may be inaccurate and should not be relied upon without verification.
      </p>

      <h2>11. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, <ConfigValue value={LEGAL_CONFIG.businessName} /> shall not be
        liable for any indirect, incidental, special, or consequential damages arising from your use of{' '}
        {LEGAL_CONFIG.appName}, including data loss, lost productivity, or AI-generated errors.
      </p>

      <h2>12. Termination</h2>
      <p>
        You can delete your account at any time in Settings → Account. Account deletion permanently removes
        all your data. We may suspend or terminate your account if you violate these Terms.
      </p>

      <h2>13. Dispute resolution and governing law</h2>
      <p>
        These Terms are governed by the laws of <ConfigValue value={LEGAL_CONFIG.governingLaw} />. Any disputes
        arising from these Terms or your use of {LEGAL_CONFIG.appName} shall be resolved in accordance with
        the laws of that jurisdiction, unless otherwise required by applicable consumer protection laws.
      </p>

      <h2>14. Changes to these terms</h2>
      <p>
        We may update these Terms from time to time. The effective date and last updated date at the top of
        this page indicate when they were last revised. Continued use of {LEGAL_CONFIG.appName} after a change
        constitutes acceptance of the updated Terms.
      </p>

      <h2>15. Contact</h2>
      <p>
        For questions about these Terms, contact us at <ConfigValue value={LEGAL_CONFIG.contactEmail} />.
      </p>
    </LegalLayout>
  );
}
