import { LegalLayout, ConfigValue } from './LegalLayout';
import { LEGAL_CONFIG } from './legalConfig';

export default function RefundsPage() {
  return (
    <LegalLayout title="Refund & Cancellation Policy">
      <p>
        This Refund &amp; Cancellation Policy explains the current billing model of {LEGAL_CONFIG.appName} and
        what terms will apply if paid services are introduced.
      </p>

      <div className="legal-callout">
        <p>
          <strong>This implementation is not a substitute for review by a qualified lawyer</strong> for the
          business's actual jurisdiction, business model, contracts, data flows, and users.
        </p>
      </div>

      <h2>1. Current billing model</h2>
      <p>
        As of {LEGAL_CONFIG.effectiveDate}, {LEGAL_CONFIG.appName} <strong>does not charge any fees</strong>.
        There are:
      </p>
      <ul>
        <li>No subscriptions or recurring payments.</li>
        <li>No paid plans or premium tiers.</li>
        <li>No in-app purchases.</li>
        <li>No payment processing.</li>
        <li>No trial periods that convert to paid plans.</li>
      </ul>
      <p>
        {LEGAL_CONFIG.appName} does not use any payment provider. No payment credentials are collected or
        stored by {LEGAL_CONFIG.appName}.
      </p>

      <h2>2. Cancellation</h2>
      <p>
        You can cancel your account at any time by deleting it in Settings → Account. Account deletion
        permanently removes all your data. Since there are no paid services, no cancellation fee or refund
        process applies.
      </p>

      <h2>3. When paid services are introduced</h2>
      <p>
        If {LEGAL_CONFIG.appName} introduces paid services in the future, a detailed refund and cancellation
        policy will be published here before any paid service launches. That policy will describe:
      </p>
      <ul>
        <li>Refund eligibility and timeframes.</li>
        <li>Cancellation procedures.</li>
        <li>Payment provider terms.</li>
        <li>Applicable consumer protection rights.</li>
      </ul>
      <p>
        <strong>No refund promises are made in this version of the policy</strong> because no paid services
        exist. Any refund terms will be determined and disclosed when paid services are introduced.
      </p>

      <h2>4. AI API key costs</h2>
      <p>
        If you use the {LEGAL_CONFIG.appName} Agent (AURA), you provide your own Gemini API key. Any costs
        associated with your use of the Gemini API are billed directly by Google to your Google account.
        {LEGAL_CONFIG.appName} does not process, collect, or refund these costs. You are responsible for
        managing your own API usage and billing with Google.
      </p>

      <h2>5. Contact</h2>
      <p>
        For questions about this policy, contact us at <ConfigValue value={LEGAL_CONFIG.contactEmail} />.
      </p>
    </LegalLayout>
  );
}
