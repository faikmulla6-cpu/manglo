import './globals.css';
import './account.css';
import './trust.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata:Metadata={
 metadataBase:new URL(process.env.NEXT_PUBLIC_APP_URL||'https://manglo.shop'),
 title:{default:'MANGLO — AI-assisted social growth marketplace',template:'%s | MANGLO'},
 description:'Tell MANGLO what you want to grow. MANGLO AI searches the live service catalog, compares exact IDs and rates, prepares wallet-aware quotes, and hands final execution to the verified MANGLO order engine.',
 keywords:['AI social growth marketplace','social media services','Instagram services','YouTube services','TikTok services','Telegram services','MANGLO AI'],
 icons:{icon:'/manglo-icon.png'},
 openGraph:{title:'MANGLO — AI-assisted social growth marketplace',description:'Conversational service discovery with live catalog data, wallet-aware quotes, Cashfree-hosted payments and supplier-linked order tracking.',type:'website',url:'https://manglo.shop'},
 twitter:{card:'summary',title:'MANGLO — AI-assisted social growth marketplace',description:'Jo chahiye, Manglo. Ask naturally, compare live services, review the quote, then confirm through MANGLO.'},
 robots:{index:true,follow:true},alternates:{canonical:'/'}
};

export default function RootLayout({children}:{children:React.ReactNode}){
 const origin=process.env.NEXT_PUBLIC_APP_URL||'https://manglo.shop';
 const schema={"@context":"https://schema.org","@type":"Organization","name":"MANGLO","url":origin,"logo":`${origin}/manglo-icon.png`};
 return <html lang="en-IN"><body className="site-body"><Header/>{children}<Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></body></html>
}
