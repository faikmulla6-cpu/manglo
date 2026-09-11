'use client';

import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).catch(() => null);
    setMessage('If that email is registered, a secure recovery link has been sent.');
    setBusy(false);
  }

  return <main className="auth-wrap"><div className="auth-card"><span className="kicker">ACCOUNT RECOVERY</span><h1>Reset your password</h1><p className="auth-intro">Enter your MANGLO account email. We’ll send a secure recovery link if the account exists.</p>{message?<div className="notice">{message}</div>:null}<form onSubmit={submit}><div className="field"><label htmlFor="forgot-email">Email</label><input id="forgot-email" name="email" type="email" autoComplete="email" required/></div><button className="btn btn-primary" type="submit" disabled={busy}>{busy?'Sending…':'Send recovery link'}</button></form><a className="btn btn-ghost" href="/auth">Back to login</a></div></main>;
}
