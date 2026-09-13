import {redirect} from 'next/navigation';
import {getUser} from '@/lib/auth';
import OrderForm from '@/app/dashboard/OrderForm';
import styles from './order-premium.module.css';

export const metadata={title:'Place an order',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';

export default async function OrderPage({searchParams}:{searchParams:Promise<{service?:string}>}){
 const params=await searchParams;
 const destination=params.service?`/order?service=${encodeURIComponent(params.service)}`:'/order';
 const user=await getUser();
 if(!user)redirect(`/auth?next=${encodeURIComponent(destination)}`);
 return <main className={styles.premiumOrder}>
  <div className="container">
   <div className={styles.orderHeading}><span>LIVE MARKETPLACE</span><h1>New order</h1><p>Discover a service, verify the exact limits and price, then confirm once.</p></div>
   <OrderForm initialServiceId={params.service} walletPaise={Number(user.walletPaise)}/>
  </div>
 </main>;
}
