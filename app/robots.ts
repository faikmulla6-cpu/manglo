import type {MetadataRoute} from 'next';

export default function robots():MetadataRoute.Robots{
 const base=process.env.NEXT_PUBLIC_APP_URL||'https://manglo.shop';
 return{
  rules:{
   userAgent:'*',
   allow:'/',
   disallow:['/dashboard','/order','/auth','/admin','/api/','/r/'],
  },
  sitemap:`${base}/sitemap.xml`,
 };
}
