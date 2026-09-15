import './globals.css';
import './account.css';
import './trust.css';
import './founder.css';
import './dashboard/commerce-compat.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnalyticsProvider from '@/components/AnalyticsProvider';
import {company} from '@/lib/company';

const BRAND_ICON='/manglo-icon.png?v=b7aa1a27';
const DEFAULT_TITLE='MANGLO — Social Media Growth Services Marketplace';
const DEFAULT_DESCRIPTION='Compare live Instagram, YouTube, TikTok and other social media growth services on MANGLO. Review current customer rates, limits, provider-reported timing and order protections before you buy.';

export const metadata:Metadata={
 metadataBase:new URL(process.env.NEXT_PUBLIC_APP_URL||'https://manglo.shop'),
 applicationName:'MANGLO',
 title:{default:DEFAULT_TITLE,template:'%s | MANGLO'},
 description:DEFAULT_DESCRIPTION,
 icons:{icon:[{url:BRAND_ICON,type:'image/png'}]},
 openGraph:{siteName:'MANGLO',title:DEFAULT_TITLE,description:DEFAULT_DESCRIPTION,type:'website'},
 twitter:{card:'summary',title:DEFAULT_TITLE,description:'Jo chahiye, Manglo. Compare live social growth services, review current pricing and order with clear checks.'},
 robots:{index:true,follow:true,googleBot:{index:true,follow:true,'max-snippet':-1,'max-image-preview':'large','max-video-preview':-1}}
};

export default function RootLayout({children}:{children:React.ReactNode}){
 const origin=process.env.NEXT_PUBLIC_APP_URL||'https://manglo.shop';
 const organization={
  '@context':'https://schema.org',
  '@type':'Organization',
  '@id':`${origin}/#organization`,
  name:'MANGLO',
  legalName:company.legalName,
  url:origin,
  logo:`${origin}/manglo-icon.png`,
  email:company.supportEmail,
  sameAs:['https://www.instagram.com/manglo.shop/'],
  founder:{
   '@type':'Person',
   name:'Faik Hameed Mulla',
   sameAs:['https://x.com/faikmulla','https://www.instagram.com/myself.fm/'],
  },
  contactPoint:{
   '@type':'ContactPoint',
   contactType:'customer support',
   email:company.supportEmail,
   areaServed:'IN',
   availableLanguage:['English'],
  },
 };
 return <html lang="en-IN"><body className="site-body"><AnalyticsProvider/><Header/>{children}<Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organization)}}/></body></html>;
}
