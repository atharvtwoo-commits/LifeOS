import { useState, useEffect } from 'react';
import { useAuth } from '../../core/auth';
import { api, ApiError } from '../../api/client';
import { Alert, Badge, BubbleIcon, Button, Field, Input, PageHeader, Row, Surface, Switch, LoadingState } from '../../ui/primitives';
import { Icon } from '../../ui/Icon';
import type { IconName } from '../../ui/Icon';
import { Overlay } from '../../ui/overlay';
import { useToast } from '../../ui/overlay';

type SectionId = 'appearance' | 'agent' | 'notifications' | 'privacy' | 'data' | 'account';
const SECTIONS: { id: SectionId; title: string; sub: string; icon: IconName }[] = [
  { id: 'appearance', title: 'Appearance', sub: 'Theme, density, motion', icon: 'palette' },
  { id: 'agent', title: 'AI / AURA', sub: 'Gemini key, enable, quota', icon: 'agent' },
  { id: 'notifications', title: 'Notifications', sub: 'Reminders and summaries', icon: 'bell' },
  { id: 'privacy', title: 'Privacy', sub: 'Control what LifeOS knows', icon: 'lock' },
  { id: 'data', title: 'Data', sub: 'Export, import, delete', icon: 'database' },
  { id: 'account', title: 'Account', sub: 'Profile and sign-in', icon: 'user' },
];

export default function SettingsPage() {
  const { user, settings, saveSettings, logout } = useAuth();
  const toast = useToast();
  const [open, setOpen] = useState<SectionId | null>(null);
  const [, setSaving] = useState(false);
  const [exportUrl, setExportUrl] = useState<string | null>(null);

  const patch = async (p: Record<string, unknown>, msg: string) => {
    setSaving(true);
    try { await saveSettings(p); toast(msg); } catch { toast('Could not save. Try again.'); }
    finally { setSaving(false); }
  };

  const doExport = async () => {
    try {
      const res = await fetch('/api/export', { credentials: 'same-origin', headers: { 'x-lifeos': '1' } });
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      setExportUrl(URL.createObjectURL(blob));
      toast('Export ready');
    } catch { toast('Export failed'); }
  };

  return (
    <>
      <PageHeader eyebrow="Settings" title="Make it yours" />
      <Surface pad="none">
        <ul className="list divided stagger">
          {SECTIONS.map((s) => (
            <li key={s.id}><Row leading={<BubbleIcon name={s.icon} tone="graphite" />} title={s.title} subtitle={s.sub} trailing={<Icon name="chevron-right" className="chev" />} onClick={() => setOpen(s.id)} /></li>
          ))}
        </ul>
      </Surface>
      <p className="faint small" style={{ marginTop: 16 }}>LifeOS · {user?.email}</p>
      <nav className="settings-legal-links" aria-label="Legal pages" style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: '4px 16px' }}>
        <a href="/privacy" className="link small">Privacy Policy</a>
        <a href="/terms" className="link small">Terms</a>
        <a href="/refunds" className="link small">Refunds</a>
        <a href="/cookies" className="link small">Cookies</a>
      </nav>

      <Overlay open={open === 'appearance'} onClose={() => setOpen(null)} title="Appearance" footer={<Button onClick={() => setOpen(null)}>Done</Button>}>
        <div className="appearance-section">
          <div className="caption" style={{ marginBottom: 8 }}>App Theme</div>
          <div className="theme-options">
            <button type="button" className={`theme-option${settings.theme === 'dark' ? ' active' : ''}`} onClick={() => patch({ theme: 'dark' }, 'Theme: Dark')}>
              <div className="theme-preview theme-preview-dark" />
              <span>Dark</span>
            </button>
            <button type="button" className={`theme-option${settings.theme === 'light' ? ' active' : ''}`} onClick={() => patch({ theme: 'light' }, 'Theme: Light')}>
              <div className="theme-preview theme-preview-light" />
              <span>Light</span>
            </button>
          </div>
        </div>
        <div className="detail-grid" style={{ marginTop: 20 }}>
          <Row as="div" title="Density" subtitle="Comfortable or compact" trailing={
            <select className="input" value={settings.density} onChange={(e) => patch({ density: e.target.value }, 'Density updated')}>
              <option value="comfortable">Comfortable</option><option value="compact">Compact</option>
            </select>} />
          <Row as="div" title="Motion" subtitle="System, reduced, or full" trailing={
            <select className="input" value={settings.motion} onChange={(e) => patch({ motion: e.target.value }, 'Motion updated')}>
              <option value="system">System</option><option value="reduced">Reduced</option><option value="full">Full</option>
            </select>} />
        </div>
      </Overlay>

      <Overlay open={open === 'agent'} onClose={() => setOpen(null)} title="AI / AURA" footer={<Button onClick={() => setOpen(null)}>Done</Button>}>
        <ByokSettings />
        <div className="detail-grid" style={{ marginTop: 20 }}>
          <Row as="div" title="Enable AURA" subtitle="Turn the Agent on or off" trailing={<Switch label="Enable AURA" checked={settings.agent.enabled} onChange={(v) => patch({ agent: { ...settings.agent, enabled: v } }, v ? 'AURA enabled 🧠' : 'AURA disabled')} />} />
          <Row as="div" title="Confirm creates" subtitle="Ask before creating new records" trailing={<Switch label="Confirm creates" checked={settings.agent.confirmCreates} onChange={(v) => patch({ agent: { ...settings.agent, confirmCreates: v } }, 'Updated')} />} />
        </div>
      </Overlay>

      <Overlay open={open === 'notifications'} onClose={() => setOpen(null)} title="Notifications" footer={<Button onClick={() => setOpen(null)}>Done</Button>}>
        <div className="detail-grid">
          {Object.entries(settings.notifications).filter(([k]) => k !== 'maxPerDay').map(([k, v]) => (
            <Row as="div" key={k} title={k.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())} trailing={<Switch label={k} checked={v as boolean} onChange={(val) => patch({ notifications: { ...settings.notifications, [k]: val } }, 'Updated')} />} />
          ))}
        </div>
      </Overlay>

      <Overlay open={open === 'privacy'} onClose={() => setOpen(null)} title="Privacy" footer={<Button onClick={() => setOpen(null)}>Done</Button>}>
        <div className="detail-grid">
          <Row as="div" title="Agent uses memory" subtitle="Let the Agent read your memories" trailing={<Switch label="Agent uses memory" checked={settings.privacy.agentUsesMemory} onChange={(v) => patch({ privacy: { ...settings.privacy, agentUsesMemory: v } }, 'Updated')} />} />
          <Row as="div" title="Agent reads notes" subtitle="Let the Agent read your notes" trailing={<Switch label="Agent reads notes" checked={settings.privacy.agentMayReadNotes} onChange={(v) => patch({ privacy: { ...settings.privacy, agentMayReadNotes: v } }, 'Updated')} />} />
        </div>
      </Overlay>

      <Overlay open={open === 'data'} onClose={() => setOpen(null)} title="Data" footer={<Button onClick={() => setOpen(null)}>Done</Button>}>
        <div className="detail-grid">
          <Row as="div" title="Export my data" subtitle="Download all your LifeOS data as JSON" trailing={<Button icon="download" onClick={doExport}>Export</Button>} />
          {exportUrl && <a href={exportUrl} download="lifeos-export.json" className="link small">Download export</a>}
        </div>
      </Overlay>

      <Overlay open={open === 'account'} onClose={() => setOpen(null)} title="Account" footer={<Button onClick={() => setOpen(null)}>Done</Button>}>
        <AccountSection user={user} logout={logout} />
      </Overlay>
    </>
  );
}

/* ── BYOK (Bring Your Own Key) Settings ── */
interface KeyInfo { configured: boolean; provider: string; model: string; baseUrl: string; keyHint: string | null; status: string | null; testedAt: string | null }

function ByokSettings() {
  const toast = useToast();
  const [keyInfo, setKeyInfo] = useState<KeyInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);

  const load = () => {
    api.get<KeyInfo>('/ai/key').then((d) => { setKeyInfo(d); setShowInput(!d.configured); setLoading(false); }).catch(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!apiKey.trim()) return;
    setSaving(true);
    try {
      await api.post('/ai/key', { apiKey });
      setApiKey('');
      setShowInput(false);
      load();
      toast('Gemini key saved securely 🔒');
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'Could not save key.');
    } finally {
      setSaving(false);
    }
  };

  const test = async () => {
    setTesting(true);
    try {
      const r = await api.post<{ ok: boolean; model: string }>('/ai/test');
      toast(`Connected ✓ Model: ${r.model}`);
      load();
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'Connection failed.');
    } finally {
      setTesting(false);
    }
  };

  const disconnect = async () => {
    try {
      await api.del('/ai/key');
      load();
      toast('Key disconnected');
    } catch { toast('Could not disconnect.'); }
  };

  if (loading) return <div style={{ padding: 16 }}><LoadingState rows={2} label="Loading AI settings" /></div>;

  return (
    <div className="byok-section">
      <div className="byok-header">
        <div className="byok-provider">
          <span className="byok-provider-icon">✦</span>
          <div>
            <div className="byok-provider-name">AURA AI</div>
            <div className="muted small">Gemini · BYOK</div>
          </div>
        </div>
        {keyInfo?.configured ? (
          <Badge tone="ok">Connected ✓</Badge>
        ) : (
          <Badge>Not connected</Badge>
        )}
      </div>

      {keyInfo?.configured ? (
        <div className="byok-connected">
          <div className="byok-info-row">
            <span className="caption">Model</span>
            <span className="mono small">{keyInfo.model}</span>
          </div>
          <div className="byok-info-row">
            <span className="caption">Key</span>
            <span className="mono small">••••{keyInfo.keyHint}</span>
          </div>
          {keyInfo.testedAt && (
            <div className="byok-info-row">
              <span className="caption">Last tested</span>
              <span className="small">{new Date(keyInfo.testedAt).toLocaleString()}</span>
            </div>
          )}
          <div className="byok-actions">
            <Button size="sm" onClick={test} disabled={testing}>{testing ? 'Testing…' : 'Test Connection'}</Button>
            <Button size="sm" variant="secondary" onClick={() => setShowInput(true)}>Change Key</Button>
            <Button size="sm" variant="danger" onClick={disconnect}>Disconnect</Button>
          </div>
        </div>
      ) : null}

      {showInput && (
        <div className="byok-input-area">
          {!keyInfo?.configured && (
            <Alert tone="accent" icon="info">
              AURA uses your own Gemini API key (BYOK). Get one from{' '}
              <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="link">
                Google AI Studio
              </a>
              . Your key is stored encrypted and never exposed to the client.
            </Alert>
          )}
          <Field label="Gemini API Key" id="ai-key">
            <Input id="ai-key" type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="AIza…" autoComplete="off" />
          </Field>
          <div className="byok-actions">
            <Button size="sm" variant="primary" onClick={save} disabled={!apiKey.trim() || saving}>{saving ? 'Saving…' : 'Save Key'}</Button>
            {keyInfo?.configured && <Button size="sm" variant="ghost" onClick={() => setShowInput(false)}>Cancel</Button>}
          </div>
        </div>
      )}

      <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" className="link small" style={{ display: 'block', marginTop: 12 }}>
        → Get a Gemini API key from Google AI Studio
      </a>
    </div>
  );
}

/* ── Account section: profile, password, sessions, deletion ── */
function AccountSection({ user, logout }: { user: { name: string; email: string } | null; logout: () => Promise<void> }) {
  const toast = useToast();
  const [showPw, setShowPw] = useState(false);
  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [pwBusy, setPwBusy] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [delPw, setDelPw] = useState('');
  const [delConfirm, setDelConfirm] = useState('');
  const [delBusy, setDelBusy] = useState(false);

  const changePw = async () => {
    if (!curPw || !newPw) return;
    setPwBusy(true);
    try {
      await api.post('/auth/password', { current: curPw, next: newPw });
      toast('Password changed — all other sessions revoked');
      setCurPw(''); setNewPw(''); setShowPw(false);
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'Could not change password');
    } finally { setPwBusy(false); }
  };

  const revokeSessions = async () => {
    try {
      const r = await api.post<{ revoked: number }>('/auth/revoke-others', {});
      toast(`${r.revoked} other session${r.revoked === 1 ? '' : 's'} revoked`);
    } catch { toast('Could not revoke sessions'); }
  };

  const deleteAccount = async () => {
    setDelBusy(true);
    try {
      await api.post('/auth/delete', { password: delPw, confirm: delConfirm });
      toast('Account deleted');
      await logout();
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'Could not delete account');
      setDelBusy(false);
    }
  };

  return (
    <div className="detail-grid">
      <Row as="div" title={user?.name ?? ''} subtitle={user?.email ?? ''} />
      <Button variant="danger" icon="close" onClick={() => { logout(); }}>Sign out</Button>

      <div style={{ marginTop: 16 }}>
        <div className="caption" style={{ marginBottom: 8 }}>Change password</div>
        {!showPw ? (
          <Button size="sm" variant="ghost" icon="lock" onClick={() => setShowPw(true)}>Change password</Button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Input type="password" placeholder="Current password" value={curPw} onChange={(e) => setCurPw(e.target.value)} autoComplete="current-password" aria-label="Current password" />
            <Input type="password" placeholder="New password (min 8 chars)" value={newPw} onChange={(e) => setNewPw(e.target.value)} autoComplete="new-password" minLength={8} aria-label="New password" />
            <div style={{ display: 'flex', gap: 8 }}>
              <Button size="sm" variant="primary" onClick={changePw} disabled={pwBusy || !curPw || newPw.length < 8}>{pwBusy ? 'Changing…' : 'Change password'}</Button>
              <Button size="sm" variant="ghost" onClick={() => { setShowPw(false); setCurPw(''); setNewPw(''); }}>Cancel</Button>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 8 }}>
        <Button size="sm" variant="ghost" icon="close" onClick={revokeSessions}>Revoke other sessions</Button>
      </div>

      <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--line-atmos)' }}>
        <div className="caption" style={{ marginBottom: 8, color: 'var(--danger)' }}>Danger zone</div>
        {!showDel ? (
          <Button size="sm" variant="danger" icon="trash" onClick={() => setShowDel(true)}>Delete account permanently</Button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Alert tone="warn" icon="alert">This permanently deletes all your data — tasks, goals, notes, memories, and settings. This cannot be undone.</Alert>
            <Input type="password" placeholder="Your password" value={delPw} onChange={(e) => setDelPw(e.target.value)} autoComplete="current-password" aria-label="Password to confirm deletion" />
            <Input type="text" placeholder='Type DELETE to confirm' value={delConfirm} onChange={(e) => setDelConfirm(e.target.value)} aria-label="Type DELETE to confirm" />
            <div style={{ display: 'flex', gap: 8 }}>
              <Button size="sm" variant="danger" onClick={deleteAccount} disabled={delBusy || !delPw || delConfirm !== 'DELETE'}>{delBusy ? 'Deleting…' : 'Delete my account'}</Button>
              <Button size="sm" variant="ghost" onClick={() => { setShowDel(false); setDelPw(''); setDelConfirm(''); }}>Cancel</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
