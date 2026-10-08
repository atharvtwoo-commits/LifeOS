import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LEGAL_CONFIG, isPlaceholder } from './legalConfig';
import './legal.css';

export function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="legal-page">
      <header className="legal-header">
        <Link to="/">← Back to {LEGAL_CONFIG.appName}</Link>
        <h1>{title}</h1>
        <p className="legal-dates">
          Effective {LEGAL_CONFIG.effectiveDate} · Last updated {LEGAL_CONFIG.lastUpdated}
        </p>
      </header>
      <div className="legal-body">{children}</div>
      <footer className="legal-footer">
        <nav className="legal-footer-links" aria-label="Legal pages">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms &amp; Conditions</Link>
          <Link to="/refunds">Refund &amp; Cancellation</Link>
          <Link to="/cookies">Cookie &amp; Storage</Link>
        </nav>
        <p className="legal-copyright">
          © {new Date().getFullYear().toString()} {isPlaceholder(LEGAL_CONFIG.businessName) ? LEGAL_CONFIG.businessName : LEGAL_CONFIG.businessName}. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

/** Renders a config value, showing a visible warning badge if it's still a placeholder. */
export function ConfigValue({ value }: { value: string }) {
  if (isPlaceholder(value)) return <span className="legal-placeholder">{value}</span>;
  return <strong>{value}</strong>;
}
