'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    const response = await fetch('/api/auth/update-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      setMessage(result.error || 'Unable to update password.');
      setBusy(false);
      return;
    }
    router.replace('/dashboard?password_updated=1');
    router.refresh();
  }

  return <main className="auth-wrap"><div className="auth-card"><span className="kicker">SECURE RECOVERY</span><h1>Choose a new password</h1><p className="auth-intro">Use at least 10 characters and avoid reusing a password from another service.</p>{message?<div className="notice danger">{message}</div>:null}<form onSubmit={submit}><div className="field"><label htmlFor="new-password">New password</label><input id="new-password" name="password" type="password" minLength={10} maxLength={128} autoComplete="new-password" required/></div><button className="btn btn-primary" type="submit" disabled={busy}>{busy?'Updating…':'Update password'}</button></form></div></main>;
}
