import Link from 'next/link';
import {redirect} from 'next/navigation';
import {getUser} from '@/lib/auth';
import {db} from '@/lib/db';
import {ensureReferralCode,REFERRAL_MIN_ORDER_PAISE,REFERRAL_REWARD_CAP_PAISE} from '@/lib/referrals';
import InviteActions from './InviteActions';
import styles from './invite.module.css';

export const metadata={title:'Invite & earn',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';
const money=(paise:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(paise/100);

export default async function InvitePage(){
 const user=await getUser();if(!user)redirect('/auth?next=%2Finvite');
 const code=await ensureReferralCode(user.id);
 const referrals=await db.referral.findMany({where:{referrerId:user.id},select:{rewardedAt:true,referrerRewardPaise:true,qualifyingOrder:{select:{chargedPaise:true}}},orderBy:{createdAt:'desc'},take:1000});
 const visits=await db.analyticsEvent.count({where:{event:'PAGE_VIEW',source:'referral',campaign:code}}).catch(()=>0);
 const rewarded=referrals.filter(item=>item.rewardedAt);const earned=rewarded.reduce((sum,item)=>sum+Number(item.referrerRewardPaise),0);const orderValue=rewarded.reduce((sum,item)=>sum+Number(item.qualifyingOrder?.chargedPaise||0),0);
 const base=(process.env.NEXT_PUBLIC_APP_URL||'https://manglo.shop').replace(/\/$/,'');const link=`${base}/r/${code}`;
 return <main className={styles.page}><div className={styles.wrap}>
  <div className={styles.hero}><section className={styles.card}><span className={styles.kicker}>MANGLO REFERRALS</span><h1>Share MANGLO. Earn when friends become real customers.</h1><p className={styles.lead}>Your invite is attributed for 30 days. When a new customer joins through it and completes their first qualifying order of at least {money(Number(REFERRAL_MIN_ORDER_PAISE))}, you can earn up to {money(Number(REFERRAL_REWARD_CAP_PAISE))} in MANGLO wallet credit. Rewards are capped by the order’s realized margin so the program stays sustainable.</p><div className={styles.linkBox}><span>YOUR PRIVATE INVITE LINK</span><code>{link}</code></div><InviteActions link={link}/></section>
  <aside className={styles.side}><div><span>MAX REWARD PER QUALIFIED FRIEND</span><strong>{money(Number(REFERRAL_REWARD_CAP_PAISE))}</strong><p>Wallet credit is issued only after MANGLO confirms the qualifying order completed successfully.</p></div><p>No reward for signups, deposits, failed orders, refunded orders or self-referrals.</p></aside></div>
  <section className={styles.grid}><article className={styles.stat}><span>REFERRAL VISITS</span><strong>{visits.toLocaleString('en-IN')}</strong><small>First-party visits attributed to your code</small></article><article className={styles.stat}><span>REFERRED ACCOUNTS</span><strong>{referrals.length.toLocaleString('en-IN')}</strong><small>New accounts attributed at signup</small></article><article className={styles.stat}><span>REWARDED REFERRALS</span><strong>{rewarded.length.toLocaleString('en-IN')}</strong><small>Friends who completed a qualifying order</small></article><article className={styles.stat}><span>WALLET CREDIT EARNED</span><strong>{money(earned)}</strong><small>{money(orderValue)} qualifying order value</small></article></section>
  <section className={styles.how}><h2>How it works</h2><div className={styles.steps}><div className={styles.step}><b>1. Share your link</b><p>Your code is stored in a secure 30-day attribution cookie when a friend opens the invite.</p></div><div className={styles.step}><b>2. They become a customer</b><p>The referral is locked at new-account creation. Codes cannot be attached later to existing accounts or orders.</p></div><div className={styles.step}><b>3. Completed orders unlock rewards</b><p>MANGLO pays once, through the wallet ledger, only after a genuine qualifying order reaches completed status.</p></div></div><p className={styles.terms}>Referral rewards are promotional wallet credits, not cash withdrawals. Abuse, duplicate-account behavior or manipulation can make a referral ineligible. See the <Link href="/terms">Terms & Conditions</Link>.</p></section>
 </div></main>;
}
