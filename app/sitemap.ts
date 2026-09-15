import type {MetadataRoute} from 'next';

export default function sitemap():MetadataRoute.Sitemap{
 const base=process.env.NEXT_PUBLIC_APP_URL||'https://manglo.shop';
 const pages=[
  {path:'',changeFrequency:'daily' as const,priority:1},
  {path:'/services',changeFrequency:'daily' as const,priority:.95},
  {path:'/about',changeFrequency:'monthly' as const,priority:.82},
  {path:'/trust',changeFrequency:'monthly' as const,priority:.82},
  {path:'/help',changeFrequency:'weekly' as const,priority:.78},
  {path:'/faq',changeFrequency:'weekly' as const,priority:.78},
  {path:'/contact',changeFrequency:'monthly' as const,priority:.68},
  {path:'/refund',changeFrequency:'monthly' as const,priority:.66},
  {path:'/terms',changeFrequency:'monthly' as const,priority:.62},
  {path:'/privacy',changeFrequency:'monthly' as const,priority:.62},
  {path:'/invite',changeFrequency:'monthly' as const,priority:.58},
 ];
 return pages.map(page=>({url:base+page.path,changeFrequency:page.changeFrequency,priority:page.priority}));
}
