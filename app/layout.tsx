import './globals.css';
import './account.css';
import './trust.css';
import type {Metadata} from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const base=process.env.NEXT_PUBLIC_APP_URL||'https://manglo.shop';

export const metadata:Metadata={
  metadataBase:new URL(base),
  title:{default:'MANGLO — Professional Website Design & Development',template:'%s | MANGLO'},
  description:'MANGLO builds professional websites for founders and businesses, from premium frontend development to complete frontend + backend products.',
  keywords:['website development agency','frontend development','full stack website development','business website development','web design India'],
  icons:{icon:'/manglo-icon.png'},
  openGraph:{
    title:'MANGLO — Websites built to work',
    description:'Professional frontend and full-stack website development, with a live product track record.',
    type:'website',
    url:base,
  },
  twitter:{
    card:'summary',
    title:'MANGLO — Websites built to work',
    description:'Professional frontend and full-stack website development.',
  },
  robots:{index:true,follow:true},
};

export default function RootLayout({children}:{children:React.ReactNode}){
  const schema={
    '@context':'https://schema.org',
    '@type':'Organization',
    name:'MANGLO',
    url:base,
    logo:`${base}/manglo-icon.png`,
    description:'Website design and development studio offering frontend and full-stack builds.',
  };
  return <html lang="en-IN"><body><Header/>{children}<Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></body></html>;
}
