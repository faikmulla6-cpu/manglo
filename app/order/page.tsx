import {redirect} from 'next/navigation';
import {getUser} from '@/lib/auth';
import OrderForm from '@/app/dashboard/OrderForm';

export const metadata={title:'Place an order',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';

export default async function OrderPage({searchParams}:{searchParams:Promise<{service?:string}>}){
 const params=await searchParams;
 const destination=params.service?`/order?service=${encodeURIComponent(params.service)}`:'/order';
 const user=await getUser();
 if(!user)redirect(`/auth?next=${encodeURIComponent(destination)}`);
 return <main className="order-page"><div className="container order-page-grid"><aside><span className="kicker">MANGLO CHECKOUT</span><h1>A clearer way to grow.</h1><p>Your price is fixed before confirmation. Every order gets a tracking number, wallet record and order-linked support.</p><ul><li>Provider service ID shown upfront</li><li>Minimum and maximum validated automatically</li><li>Automatic wallet restoration if submission fails</li></ul></aside><OrderForm initialServiceId={params.service}/></div></main>;
}
