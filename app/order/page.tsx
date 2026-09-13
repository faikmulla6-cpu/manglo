import {redirect} from 'next/navigation';
import {getUser} from '@/lib/auth';
import OrderForm from '@/app/dashboard/OrderForm';
import styles from './order-premium.module.css';

export const metadata={title:'Review order',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';

type Params={service?:string;quantity?:string;link?:string;quote?:string};
function finiteInt(value:string|undefined,min=0){if(!value)return undefined;const parsed=Number(value);return Number.isInteger(parsed)&&parsed>=min?parsed:undefined}

export default async function OrderPage({searchParams}:{searchParams:Promise<Params>}){
 const params=await searchParams;
 const query=new URLSearchParams();
 if(params.service)query.set('service',params.service);
 if(params.quantity)query.set('quantity',params.quantity);
 if(params.link)query.set('link',params.link);
 if(params.quote)query.set('quote',params.quote);
 const destination=query.size?`/order?${query.toString()}`:'/order';
 const user=await getUser();
 if(!user)redirect(`/auth?next=${encodeURIComponent(destination)}`);
 const quantity=finiteInt(params.quantity,1);
 const expectedCharge=finiteInt(params.quote,0);
 const prepared=Boolean(params.service&&quantity&&params.link&&expectedCharge!==undefined);
 return <main className={styles.premiumOrder}>
  <div className="container">
   <div className={styles.orderHeading}><span>{prepared?'MANGLO AI · FINAL REVIEW':'SERVICE MARKETPLACE'}</span><h1>{prepared?'Review prepared order':'New order'}</h1><p>{prepared?'Verify the exact live service, destination, quantity and wallet charge before submission.':'Select a service, verify the exact limits and price, then confirm once.'}</p></div>
   <OrderForm initialServiceId={params.service} initialQuantity={quantity} initialLink={params.link||''} initialExpectedChargePaise={expectedCharge} walletPaise={Number(user.walletPaise)}/>
  </div>
 </main>;
}
