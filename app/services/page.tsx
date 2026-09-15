import {db} from '@/lib/db';
import {presentService} from '@/lib/catalog';
import {serviceIsFresh} from '@/lib/catalog-freshness';
import ServicesBrowser from './ServicesBrowser';

export const metadata={
 title:'Social Media Growth Services Marketplace',
 description:'Compare Instagram, YouTube, TikTok, Telegram, Facebook and other social media growth services on MANGLO. Review synchronized rates, quantity limits, provider-reported timing and reliability before ordering.',
 alternates:{canonical:'/services'},
 openGraph:{title:'Social Media Growth Services Marketplace | MANGLO',description:'Browse MANGLO’s synchronized catalog of social media growth services with customer pricing, limits, timing and reliability signals.',url:'/services',type:'website'},
 robots:{index:true,follow:true},
};

export default async function Services({searchParams}:{searchParams:Promise<{platform?:string;q?:string;filter?:string;sort?:string;category?:string;refill?:string}>}){
 const params=await searchParams;
 const rows=await db.service.findMany({where:{active:true,operatorDisabled:false},orderBy:[{score:'desc'},{platform:'asc'}]}).catch(error=>{console.error('[services-page]',error instanceof Error?error.message:'catalog unavailable');return[]});
 const services=rows.map(service=>presentService({...service,providerRatePaisePerThousand:Number(service.providerRatePaisePerThousand),retailRatePaisePerThousand:Number(service.retailRatePaisePerThousand),lastSyncedAt:service.lastSyncedAt.toISOString(),orderable:serviceIsFresh(service.lastSyncedAt)}));
 const latestSync=rows.reduce<Date|null>((latest,service)=>!latest||service.lastSyncedAt>latest?service.lastSyncedAt:latest,null);
 const orderableCount=services.reduce((count,service)=>count+(service.orderable?1:0),0);
 const catalogFresh=services.length>0&&orderableCount===services.length;
 return <ServicesBrowser services={services} catalogFresh={catalogFresh} catalogAsOf={latestSync?.toISOString()||null} orderableCount={orderableCount} initialPlatform={params.platform||'All'} initialQuery={params.q||''} initialSort={params.sort||params.filter||'Recommended'} initialCategory={params.category||'All'} initialRefill={params.refill==='1'||params.filter==='Refill'}/>;
}