import type {MetadataRoute} from 'next';
import {db} from '@/lib/db';

export default async function sitemap():Promise<MetadataRoute.Sitemap>{
 const base=process.env.NEXT_PUBLIC_APP_URL||'https://manglo.shop';
 const now=new Date();
 const staticPages=['','/services','/about','/trust','/contact','/terms','/privacy','/refund'].map(path=>({url:base+path,lastModified:now,changeFrequency:(path===''?'daily':'weekly') as 'daily'|'weekly',priority:path===''?1:path==='/services'?.9:.7}));
 const services=await db.service.findMany({where:{active:true},select:{providerServiceId:true,updatedAt:true},orderBy:{updatedAt:'desc'}}).catch(()=>[]);
 const servicePages=services.map(service=>({url:`${base}/services/${encodeURIComponent(service.providerServiceId)}`,lastModified:service.updatedAt,changeFrequency:'weekly' as const,priority:.55}));
 return [...staticPages,...servicePages];
}
