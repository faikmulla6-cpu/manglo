import './globals.css';
import './account.css';
import './trust.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata:Metadata={
 metadataBase:new URL(process.env.NEXT_PUBLIC_APP_URL||'https://manglo.shop'),
 title:{default:'MANGLO — Social growth, clearly managed',template:'%s | MANGLO'},
 description:'Discover live social growth services, review exact rates and limits, fund your wallet securely, and track every MANGLO order from one account.',
 keywords:['social growth marketplace','social media services','Instagram services','YouTube services','TikTok services','Telegram services','MANGLO'],
 icons:{icon:'/manglo-icon.png'},
 openGraph:{title:'MANGLO — Social growth, clearly managed',description:'Live service data, clear pricing, secure wallet funding and order-linked support in one customer experience.',type:'website',url:'https://manglo.shop'},
 twitter:{card:'summary',title:'MANGLO — Social growth, clearly managed',description:'Jo chahiye, Manglo. Search live services, review the terms, then order and track from one account.'},
 robots:{index:true,follow:true},
 alternates:{canonical:'/'}
};

export default function RootLayout({children}:{children:React.ReactNode}){
 const origin=process.env.NEXT_PUBLIC_APP_URL||'https://manglo.shop';
 const schema={"@context":"https://schema.org","@type":"Organization","name":"MANGLO","url":origin,"logo":`${origin}/manglo-icon.png`};
 return <html lang="en-IN"><body className="site-body"><Header/>{children}<Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></body></html>
}
