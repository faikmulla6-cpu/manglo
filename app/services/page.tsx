import {db} from '@/lib/db';
import {fallbackServices,presentService} from '@/lib/catalog';
import ServicesBrowser from './ServicesBrowser';

export const metadata={title:'Service Marketplace',description:'Search live MANGLO services by platform, category or service ID. Review current customer rates, limits and provider-reported timing before ordering.'};

export default async function Services({searchParams}:{searchParams:Promise<{platform?:string;q?:string;filter?:string}>}){
 const params=await searchParams;
 const rows=await db.service.findMany({where:{active:true},orderBy:[{score:'desc'},{platform:'asc'}]}).catch(()=>[]);
 const services=rows.length?rows.map(service=>presentService({...service,providerRatePaisePerThousand:Number(service.providerRatePaisePerThousand),retailRatePaisePerThousand:Number(service.retailRatePaisePerThousand),lastSyncedAt:service.lastSyncedAt.toISOString()})):fallbackServices();
 return <ServicesBrowser services={services} initialPlatform={params.platform||'All'} initialQuery={params.q||''} initialFilter={params.filter||'Recommended'}/>;
}
