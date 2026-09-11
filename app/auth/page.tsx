import {Suspense} from 'react';import AuthForm from './AuthForm';
export default function Auth(){return <Suspense fallback={<main className="auth-wrap"><div className="auth-card">Loading…</div></main>}><AuthForm/></Suspense>}
