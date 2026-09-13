import {redirect} from 'next/navigation';
import {getUser} from '@/lib/auth';
import {db} from '@/lib/db';
import OrderForm from '@/app/dashboard/OrderForm';
import styles from './order-premium.module.css';

export const metadata={title:'Review order',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';

type Params={service?:string;quantity?:string;link?:string;quote?:string;repeat?:string};
function finiteInt(value:string|undefined,min=0){if(!value)return undefined;const parsed=Number(value);return Number.isInteger(parsed)&&parsed>=min?parsed:undefined}

export default async function OrderPage({searchParams}:{searchParams:Promise<Params>}){
 const params=await searchParams;const query=new URLSearchParams();if(params.service)query.set('service',params.service);if(params.quantity)query.set('quantity',params.quantity);if(params.link)query.set('link',params.link);if(params.quote)query.set('quote',params.quote);if(params.repeat)query.set('repeat',params.repeat);const destination=query.size?`/order?${query.toString()}`:'/order';
 const user=await getUser();if(!user)redirect(`/auth?next=${encodeURIComponent(destination)}`);
 const repeat=params.repeat?await db.order.findFirst({where:{publicId:params.repeat,userId:user.id},select:{serviceId:true,quantity:true,link:true}}).catch(()=>null):null;
 const serviceId=repeat?.serviceId||params.service;const quantity=repeat?.quantity||finiteInt(params.quantity,1);const link=repeat?.link||params.link||'';const expectedCharge=repeat?undefined:finiteInt(params.quote,0);const prepared=Boolean(serviceId&&quantity&&link&&(repeat||expectedCharge!==undefined));
 return <main className={`${styles.premiumOrder} manglo-app`}><div className="container"><div className={styles.orderHeading}><span>{repeat?'MANGLO · QUICK REORDER':prepared?'MANGLO AI · FINAL REVIEW':'LIVE SERVICE ORDER'}</span><h1>{repeat?'Review your repeat order':prepared?'Review the prepared order':'Create order'}</h1><p>{repeat?'Your previous service, destination and quantity are ready. MANGLO reloads the live catalog and recalculates today’s wallet charge before you confirm.':prepared?'MANGLO has reloaded the service from the live catalog. Verify the destination, quantity and wallet charge before submission.':'Select a live service, review the current terms and confirm once.'}</p></div><OrderForm initialServiceId={serviceId} initialQuantity={quantity} initialLink={link} initialExpectedChargePaise={expectedCharge} walletPaise={Number(user.walletPaise)}/></div></main>;
}
