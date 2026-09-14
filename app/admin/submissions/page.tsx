import Link from 'next/link';
import {requireAdmin} from '@/lib/admin';
import {db} from '@/lib/db';
import SubmissionResolutionControl from './SubmissionResolutionControl';
import styles from './SubmissionReview.module.css';

export const dynamic='force-dynamic';
export const metadata={title:'Submission review',robots:{index:false,follow:false}};
const money=(paise:bigint)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(Number(paise)/100);
const dateTime=(value:Date)=>new Intl.DateTimeFormat('en-IN',{dateStyle:'medium',timeStyle:'short'}).format(value);

export default async function SubmissionReviewPage(){
 await requireAdmin();
 const cutoff=new Date(Date.now()-2*60_000);
 const orders=await db.order.findMany({
  where:{status:'QUEUED',providerOrderId:null,createdAt:{lte:cutoff}},
  include:{user:{select:{name:true,email:true}},service:{select:{providerServiceId:true,platform:true,name:true}}},
  orderBy:{createdAt:'asc'},take:100,
 });
 return <main className={styles.page}>
  <header className={styles.top}><div><span>PRIVATE OPERATIONS · FINANCIAL EXCEPTIONS</span><h1>Submission review</h1><p>These orders were charged locally but have no verified supplier order ID. Never retry them blindly. Check the supplier dashboard using the destination, service and quantity, then either attach the verified supplier order ID or refund the MANGLO wallet.</p></div><Link className={styles.back} href="/admin">Back to operations</Link></header>
  {orders.length?<div className={styles.warning}>Resolve only after checking the supplier dashboard. “Attach verified ID” continues tracking the existing supplier order. “Refund wallet” is idempotent and should only be used when you confirmed the supplier did not accept the submission.</div>:null}
  <section className={styles.panel}>{orders.length?<div className={styles.table}><table><thead><tr><th>MANGLO order</th><th>Customer</th><th>Service</th><th>Destination</th><th>Quantity / charge</th><th>Queued since</th><th>Resolution</th></tr></thead><tbody>{orders.map(order=><tr key={order.id}><td><b>#{order.publicId}</b><small>{order.providerStatus||'No supplier confirmation'}</small></td><td><b>{order.user.name}</b><small>{order.user.email}</small></td><td><b>{order.service.name}</b><small>{order.service.platform} · ID {order.service.providerServiceId}</small></td><td><small>{order.link}</small></td><td><b>{order.quantity.toLocaleString('en-IN')}</b><small>{money(order.chargedPaise)}</small></td><td>{dateTime(order.createdAt)}</td><td><SubmissionResolutionControl publicId={order.publicId}/></td></tr>)}</tbody></table></div>:<div className={styles.empty}><b>No uncertain submissions</b><p>There are currently no charged orders waiting for supplier-ID verification.</p></div>}</section>
 </main>;
}
