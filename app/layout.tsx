import './globals.css';
import './account.css';
import './trust.css';
import './founder.css';
import './dashboard/commerce-compat.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnalyticsProvider from '@/components/AnalyticsProvider';

const BRAND_ICON='/manglo-icon.png?v=b7aa1a27';

export const metadata:Metadata={
 metadataBase:new URL(process.env.NEXT_PUBLIC_APP_URL||'https://manglo.shop'),
 title:{default:'MANGLO — Social growth services, clearly managed',template:'%s | MANGLO'},
 description:'Search live social growth services, compare exact service IDs, customer rates and limits, fund your wallet through Cashfree hosted checkout, and track every MANGLO order from one account.',
 keywords:['social growth marketplace','social media services','Instagram services','YouTube services','TikTok services','Telegram services','MANGLO'],
 icons:{icon:[{url:BRAND_ICON,type:'image/png'}]},
 openGraph:{title:'MANGLO — Social growth services, clearly managed',description:'Live service discovery, transparent customer pricing, Cashfree-hosted wallet funding and supplier-linked order tracking in one account.',type:'website',url:'https://manglo.shop'},
 twitter:{card:'summary',title:'MANGLO — Social growth services, clearly managed',description:'Jo chahiye, Manglo. Search live services, review the exact terms, confirm the wallet charge and track your order.'},
 robots:{index:true,follow:true}
};

export default function RootLayout({children}:{children:React.ReactNode}){
 const origin=process.env.NEXT_PUBLIC_APP_URL||'https://manglo.shop';
 const schema={"@context":"https://schema.org","@type":"Organization","name":"MANGLO","url":origin,"logo":`${origin}${BRAND_ICON}`,"email":"support@manglo.shop"};
 return <html lang="en-IN"><body className="site-body"><AnalyticsProvider/><Header/>{children}<Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></body></html>
}
