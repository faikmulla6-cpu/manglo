import './globals.css';
import './account.css';
import './trust.css';
import type { Metadata } from 'next';
import Header from '@/components/Header'; import Footer from '@/components/Footer';
export const metadata:Metadata={metadataBase:new URL(process.env.NEXT_PUBLIC_APP_URL||'https://manglo.example'),title:{default:'MANGLO — Grow on demand',template:'%s | MANGLO'},description:'Pick, order and track curated social growth services with clear pricing and a simple MANGLO Wallet.',keywords:['social media growth','Instagram services','YouTube growth','TikTok growth','Telegram services','digital growth marketplace'],icons:{icon:'/manglo-icon.png'},openGraph:{title:'MANGLO — Grow on demand',description:'Jo chahiye, Manglo. The modern social growth marketplace.',type:'website'},twitter:{card:'summary',title:'MANGLO — Grow on demand',description:'Jo chahiye, Manglo.'},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){const schema={"@context":"https://schema.org","@type":"Organization","name":"MANGLO","url":process.env.NEXT_PUBLIC_APP_URL||'https://manglo.example',"logo":`${process.env.NEXT_PUBLIC_APP_URL||'https://manglo.example'}/manglo-icon.png`};return <html lang="en-IN"><body><Header/>{children}<Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></body></html>}
