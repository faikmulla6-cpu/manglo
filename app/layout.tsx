import './globals.css';
import './account.css';
import './trust.css';
import './founder.css';
import './dashboard/commerce-compat.css';
import type { Metadata } from 'next';
import {Manrope,Space_Grotesk} from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnalyticsProvider from '@/components/AnalyticsProvider';

const manrope=Manrope({subsets:['latin'],variable:'--font-manglo-body',display:'swap'});
const spaceGrotesk=Space_Grotesk({subsets:['latin'],variable:'--font-manglo-display',display:'swap'});

const BRAND_ICON='/manglo-icon.png?v=b7aa1a27';
const DEFAULT_TITLE='MANGLO — Website Design & Development Agency';
const DEFAULT_DESCRIPTION='MANGLO builds professional websites and web products for businesses and founders, from premium frontend development to complete frontend + backend builds.';

export const metadata:Metadata={
 metadataBase:new URL(process.env.NEXT_PUBLIC_APP_URL||'https://manglo.shop'),
 applicationName:'MANGLO',
 title:{default:DEFAULT_TITLE,template:'%s | MANGLO'},
 description:DEFAULT_DESCRIPTION,
 icons:{icon:[{url:BRAND_ICON,type:'image/png'}]},
 openGraph:{siteName:'MANGLO',title:DEFAULT_TITLE,description:DEFAULT_DESCRIPTION,type:'website'},
 twitter:{card:'summary',title:DEFAULT_TITLE,description:'Professional frontend and full-stack website development from MANGLO.'},
 robots:{index:true,follow:true,googleBot:{index:true,follow:true,'max-snippet':-1,'max-image-preview':'large','max-video-preview':-1}}
};

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en-IN" className={`${manrope.variable} ${spaceGrotesk.variable}`}><body className="site-body"><AnalyticsProvider/><Header/>{children}<Footer/></body></html>;
}
