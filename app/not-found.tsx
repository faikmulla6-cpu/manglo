import Link from 'next/link';
import {SearchX} from 'lucide-react';
import styles from './StatePage.module.css';
export default function NotFound(){return <main className={styles.state}><section className={styles.card}><span className={styles.icon}><SearchX size={20}/></span><h1>We couldn’t find that page.</h1><p>The service may have changed, become unavailable, or the link may be incorrect. You can return to the live marketplace and search again.</p><div className={styles.actions}><Link className={styles.primary} href="/services">Browse services</Link><Link className={styles.secondary} href="/">Go home</Link></div></section></main>}
