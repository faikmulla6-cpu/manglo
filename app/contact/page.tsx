import Link from 'next/link';
import {ArrowRight, Clock3, Mail, MapPin, MessageCircle, Phone} from 'lucide-react';
import {company} from '@/lib/company';

export const metadata={title:'Contact MANGLO',description:'Start a website project with MANGLO or get support for an existing MANGLO Growth Marketplace account.'};

export default function Page(){
  return <main className="company-page">
    <section className="company-hero"><div className="legal-container">
      <span className="kicker">CONTACT MANGLO</span>
      <h1>New project or existing customer?</h1>
      <p>For website design and development, send us your project brief. Existing Growth Marketplace customers can continue to use account-linked support.</p>
      <div className="hero-actions"><Link className="btn btn-primary" href="/#project">Start a website project <ArrowRight size={17}/></Link><Link className="btn btn-ghost" href="/dashboard">Marketplace support</Link></div>
    </div></section>
    <section className="legal-container contact-grid">
      <article><Mail/><span>Email</span><a href={`mailto:${company.supportEmail}`}>{company.supportEmail}</a><small>General enquiries and project follow-up</small></article>
      {company.supportPhone&&<article><Phone/><span>Phone</span><a href={`tel:${company.supportPhone}`}>{company.supportPhone}</a><small>During published support hours</small></article>}
      <article><Clock3/><span>Support hours</span><b>{company.supportHours}</b><small>Response times can vary during holidays</small></article>
      {company.address&&<article><MapPin/><span>Business address</span><b>{company.address}</b><small>{company.legalName}</small></article>}
    </section>
    <section className="legal-container response-note"><MessageCircle/><div><h2>Keep sensitive credentials private</h2><p>For both project enquiries and support, never send passwords, OTPs, card details, CVV, payment-app PINs, API secrets or production credentials through a contact message.</p></div></section>
  </main>;
}
