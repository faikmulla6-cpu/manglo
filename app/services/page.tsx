import {db} from '@/lib/db';
import {presentService} from '@/lib/catalog';
import {catalogFreshAfter} from '@/lib/catalog-freshness';
import ServicesBrowser from './ServicesBrowser';

export const metadata={title:'Service Marketplace',description:'Search live MANGLO services by platform, category or service ID. Review current customer rates, limits and provider-reported timing before ordering.',alternates:{canonical:'/services'}};

export default async function Services({searchParams}:{searchParams:Promise<{platform?:string;q?:string;filter?:string;sort?:string;category?:string;refill?:string}>}){
 const params=await searchParams;
 const rows=await db.service.findMany({where:{active:true,operatorDisabled:false,lastSyncedAt:{gte:catalogFreshAfter()}},orderBy:[{score:'desc'},{platform:'asc'}]}).catch(error=>{console.error('[services-page]',error instanceof Error?error.message:'catalog unavailable');return[]});
 const services=rows.map(service=>presentService({...service,providerRatePaisePerThousand:Number(service.providerRatePaisePerThousand),retailRatePaisePerThousand:Number(service.retailRatePaisePerThousand),lastSyncedAt:service.lastSyncedAt.toISOString()}));
 return <ServicesBrowser services={services} initialPlatform={params.platform||'All'} initialQuery={params.q||''} initialSort={params.sort||params.filter||'Recommended'} initialCategory={params.category||'All'} initialRefill={params.refill==='1'||params.filter==='Refill'}/>;
}
