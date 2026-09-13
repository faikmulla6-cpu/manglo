'use client';
import {AlertTriangle} from 'lucide-react';
import styles from './StatePage.module.css';
export default function ErrorPage({reset}:{error:Error&{digest?:string};reset:()=>void}){return <main className={styles.state}><section className={styles.card}><span className={styles.icon}><AlertTriangle size={20}/></span><h1>Something didn’t load correctly.</h1><p>Your account and transaction data have not been changed by this screen error. Try the page again, or return to the marketplace if the problem continues.</p><div className={styles.actions}><button className={styles.primary} onClick={reset}>Try again</button><a className={styles.secondary} href="/services">Browse services</a></div></section></main>}
