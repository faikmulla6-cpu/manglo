import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CreditCard,
  Facebook,
  FileText,
  Gift,
  Headphones,
  Instagram,
  LockKeyhole,
  MoreHorizontal,
  Music2,
  PlayCircle,
  Search,
  Send,
  ShieldCheck,
  Wallet,
  X,
  Youtube,
} from 'lucide-react';
import {db} from '@/lib/db';
import {catalogFreshAfter} from '@/lib/catalog-freshness';
import {presentService} from '@/lib/catalog';
import FeatureSection from '@/components/ui/feature-section';
import styles from './CommerceHome.module.css';

export const revalidate=300;

export const metadata={
  alternates:{canonical:'/'},
  title:{absolute:'MANGLO — Social Media Growth Services Marketplace'},
  description:'Compare live Instagram, YouTube, TikTok and other social media growth services on MANGLO. See current rates, limits and provider-reported timing before you order.',
  openGraph:{title:'MANGLO — Social Media Growth Services Marketplace',description:'A clearer alternative to traditional SMM panels: compare live social media growth services, current customer pricing and order protections.',url:'/',type:'website'},
};

const platformMeta=[
  {name:'Instagram',icon:Instagram,copy:'Followers, views & more',tone:'instagram'},
  {name:'YouTube',icon:Youtube,copy:'Views, subscribers & more',tone:'youtube'},
  {name:'TikTok',icon:Music2,copy:'Followers, likes & more',tone:'tiktok'},
  {name:'Telegram',icon:Send,copy:'Members, views & more',tone:'telegram'},
  {name:'Facebook',icon:Facebook,copy:'Followers, page growth & more',tone:'facebook'},
  {name:'X',icon:X,copy:'Followers, engagement & more',tone:'x'},
] as const;

const moneyRate=(paise:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(paise/100);

async function homepageData(){
  try{
    const freshAfter=catalogFreshAfter();
    const liveWhere={active:true,operatorDisabled:false,lastSyncedAt:{gte:freshAfter}};
    const [rows,recentCompleted,totalLiveServices,platformRows,completedOrders,lowestInstagramViews]=await Promise.all([
      db.service.findMany({
        where:liveWhere,
        orderBy:[{score:'desc'},{platform:'asc'}],
        take:240,
        select:{
          id:true,providerServiceId:true,platform:true,category:true,name:true,description:true,averageTime:true,
          retailRatePaisePerThousand:true,min:true,max:true,refill:true,cancel:true,score:true,lastSyncedAt:true,
        },
      }),
      db.order.findMany({where:{status:'COMPLETED'},select:{serviceId:true},orderBy:{createdAt:'desc'},take:1500}),
      db.service.count({where:liveWhere}),
      db.service.findMany({where:liveWhere,select:{platform:true},distinct:['platform']}),
      db.order.count({where:{status:'COMPLETED'}}),
      db.service.findFirst({
        where:{...liveWhere,platform:'Instagram',OR:[{name:{contains:'view',mode:'insensitive'}},{category:{contains:'view',mode:'insensitive'}}]},
        orderBy:[{retailRatePaisePerThousand:'asc'},{score:'desc'}],
        select:{id:true,providerServiceId:true,name:true,retailRatePaisePerThousand:true,score:true},
      }),
    ]);

    const completedByService=new Map<string,number>();
    for(const order of recentCompleted)completedByService.set(order.serviceId,(completedByService.get(order.serviceId)||0)+1);

    const services=rows.map(row=>presentService({
      ...row,
      retailRatePaisePerThousand:Number(row.retailRatePaisePerThousand),
      lastSyncedAt:row.lastSyncedAt.toISOString(),
      completedCount:completedByService.get(row.id)||0,
    }));

    const ranked=[...services].sort((a,b)=>(b.completedCount-a.completedCount)||(b.score-a.score));
    const preferred=['Instagram','YouTube','TikTok','Telegram'];
    const featured=preferred.map(platform=>ranked.find(service=>service.platform===platform)).filter(Boolean) as typeof services;
    for(const service of ranked){
      if(featured.length>=4)break;
      if(!featured.some(item=>item.id===service.id))featured.push(service);
    }

    const instagramViewsOffer=lowestInstagramViews?{
      id:lowestInstagramViews.id,
      providerServiceId:lowestInstagramViews.providerServiceId,
      name:lowestInstagramViews.name,
      ratePaise:Number(lowestInstagramViews.retailRatePaisePerThousand),
      score:lowestInstagramViews.score,
    }:null;

    return {services,featured,totalLiveServices,platformCount:platformRows.length,completedOrders,instagramViewsOffer};
  }catch(error){
    console.error('[homepage-data]',error instanceof Error?error.message:'homepage data unavailable');
    return {services:[],featured:[],totalLiveServices:0,platformCount:0,completedOrders:0,instagramViewsOffer:null};
  }
}

function PlatformGlyph({name}:{name:string}){
  const meta=platformMeta.find(item=>item.name===name);
  if(!meta)return <MoreHorizontal size={21}/>;
  const Icon=meta.icon;
  return <Icon size={21}/>;
}

export default async function Home(){
  const data=await homepageData();
  const previewServices=data.featured.slice(0,3);
  const origin=process.env.NEXT_PUBLIC_APP_URL||'https://manglo.shop';
  const websiteSchema={
    '@context':'https://schema.org',
    '@graph':[
      {'@type':'WebSite','@id':`${origin}/#website`,url:origin,name:'MANGLO',alternateName:'MANGLO Social Media Growth Marketplace',publisher:{'@id':`${origin}/#organization`}},
      {'@type':'WebPage','@id':`${origin}/#webpage`,url:origin,name:'MANGLO — Social Media Growth Services Marketplace',description:'Compare live social media growth services, current customer rates, limits and provider-reported timing before ordering.',isPartOf:{'@id':`${origin}/#website`},about:{'@id':`${origin}/#organization`}},
    ],
  };

  return <main className={styles.home}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteSchema)}}/>
    <section className={styles.hero}>
      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>JO CHAHIYE, MANGLO.</span>
          <h1>Growth services,<br/><em>made simple.</em></h1>
          <p>MANGLO is a clearer alternative to traditional SMM panels: compare live Instagram, YouTube, TikTok and other social media growth services before you spend.{data.instagramViewsOffer?<> Instagram Views currently start at <strong>{moneyRate(data.instagramViewsOffer.ratePaise)} per 1,000</strong> in the live catalog.</>:null}</p>

          <form className={styles.heroSearch} action="/services" method="get">
            <Search size={19}/>
            <input name="q" aria-label="Search MANGLO services" placeholder="Search Instagram followers, YouTube views, service ID…"/>
            <button type="submit">Search</button>
          </form>

          <div className={styles.heroActions}>
            <Link className={styles.primaryCta} href="/services">Compare live services <ArrowRight size={15}/></Link>
            <a className={styles.secondaryCta} href="#how-it-works"><PlayCircle size={17}/> How MANGLO works</a>
          </div>

          <div className={styles.assurance}>
            <span><ShieldCheck size={16}/>Server-validated orders</span>
            <span><Wallet size={16}/>Wallet-based checkout</span>
            <span><FileText size={16}/>Transparent service terms</span>
            <span><Headphones size={16}/>Order-linked support</span>
          </div>
        </div>

        <div className={styles.heroVisual} aria-label="MANGLO live marketplace preview">
          <div className={styles.appFrame}>
            <aside className={styles.appRail}>
              <div className={styles.miniBrand}><span>M</span><b>MANGLO</b></div>
              <div className={`${styles.railItem} ${styles.activeRail}`}>Home</div>
              <div className={styles.railItem}>Orders</div>
              <div className={styles.railItem}>Wallet</div>
              <div className={styles.railItem}>Favorites</div>
              <div className={styles.railItem}>Support</div>
            </aside>
            <div className={styles.appMain}>
              <div className={styles.appTop}><div className={styles.appSearch}><Search size={13}/> Search services…</div><span className={styles.avatar}>M</span></div>
              <div className={styles.appIntro}><div><small>LIVE MARKETPLACE</small><h3>Find the right service<br/>for your growth</h3></div><div className={styles.platformDots}>{platformMeta.map(item=><span key={item.name} className={styles[item.tone]}><PlatformGlyph name={item.name}/></span>)}</div></div>
              <div className={styles.previewLabel}><b>Live picks</b><Link href="/services">View all <ArrowRight size={11}/></Link></div>
              <div className={styles.previewCards}>{previewServices.length?previewServices.map(service=><Link href={`/services?q=${encodeURIComponent(service.providerServiceId)}`} key={service.id} className={styles.previewCard}><span className={`${styles.previewIcon} ${styles[(platformMeta.find(item=>item.name===service.platform)?.tone)||'neutral']}`}><PlatformGlyph name={service.platform}/></span><b>{service.name}</b><small>{moneyRate(service.retailRatePaisePerThousand)} / 1K</small></Link>):<Link href="/services" className={styles.previewEmpty}>Open the live catalog <ArrowRight size={13}/></Link>}</div>
            </div>
          </div>

          <div className={styles.orderStat}><span>Live services</span><strong>{data.totalLiveServices.toLocaleString('en-IN')}</strong><small><BadgeCheck size={12}/> Fresh catalog</small><div><i/><i/><i/><i/></div></div>
          <div className={styles.peopleCard}><span className={styles.people}><i>M</i><i>G</i><i>+</i></span><div><b>Real catalog.<br/>Real outcomes.</b><small>{data.completedOrders.toLocaleString('en-IN')} provider-confirmed completed order{data.completedOrders===1?'':'s'}</small></div></div>
        </div>
      </div>
    </section>

    <section className={styles.trustStrip}><div className={`container ${styles.trustStripInner}`}>
      <article><BadgeCheck size={18}/><div><b>{data.totalLiveServices.toLocaleString('en-IN')} live services</b><small>Fresh active listings across {data.platformCount.toLocaleString('en-IN')} platforms.</small></div></article>
      <article><Instagram size={18}/><div><b>{data.instagramViewsOffer?`Instagram Views from ${moneyRate(data.instagramViewsOffer.ratePaise)} / 1K`:'Live Instagram services'}</b><small>{data.instagramViewsOffer?'Current catalog rate; availability can change.':'Compare current rates in the marketplace.'}</small></div></article>
      <article><BarChart3 size={18}/><div><b>{data.completedOrders.toLocaleString('en-IN')} completed orders</b><small>Counted from real provider-confirmed MANGLO outcomes.</small></div></article>
      <article><ShieldCheck size={18}/><div><b>Supplier health monitored</b><small>Recent outcomes can change recommendations and availability.</small></div></article>
    </div></section>

    <FeatureSection/>

    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionTitleRow}><div><span>CHOOSE YOUR PLATFORM</span><h2>Start with where you actually want to grow.</h2><p>Browse live marketplace listings by platform instead of memorising supplier IDs or panel categories.</p></div><Link href="/services">Explore all platforms <ArrowRight size={14}/></Link></div>
        <div className={styles.platformGrid}>{platformMeta.map(item=>{const Icon=item.icon;return <Link href={`/services?platform=${encodeURIComponent(item.name)}`} key={item.name} className={styles.platformCard}><span className={`${styles.bigPlatformIcon} ${styles[item.tone]}`}><Icon size={28}/></span><b>{item.name}</b><small>{item.copy}</small><ArrowRight className={styles.platformArrow} size={14}/></Link>})}<Link href="/services" className={styles.platformCard}><span className={`${styles.bigPlatformIcon} ${styles.neutral}`}><MoreHorizontal size={28}/></span><b>More</b><small>Explore the full live catalog</small><ArrowRight className={styles.platformArrow} size={14}/></Link></div>
      </div>
    </section>

    <section className={styles.sectionCompact}>
      <div className="container">
        <div className={styles.sectionTitleRow}><div><span>LIVE PRICE DISCOVERY</span><h2>See current prices before you commit.</h2><p>These cards come from the fresh catalog, not a hard-coded promotion table. Availability and rates can change with supplier conditions.</p></div><Link href="/services">View all services <ArrowRight size={14}/></Link></div>
        <div className={styles.serviceGrid}>{data.featured.length?data.featured.map((service,index)=><Link key={service.id} href={`/services?q=${encodeURIComponent(service.providerServiceId)}`} className={styles.serviceCard}>
          <div className={styles.serviceTop}><span className={`${styles.servicePlatform} ${styles[(platformMeta.find(item=>item.name===service.platform)?.tone)||'neutral']}`}><PlatformGlyph name={service.platform}/></span><span className={styles.liveBadge}>{service.refill?'Refill listed':index===0&&service.completedCount>0?'Most completed':'Live service'}</span></div>
          <h3>{service.name}</h3>
          <p>{service.category}</p>
          <strong>{moneyRate(service.retailRatePaisePerThousand)} <small>/ 1K</small></strong>
          <div className={styles.serviceFacts}><span>ID {service.providerServiceId}</span><span>Min {service.min.toLocaleString('en-IN')}</span></div>
          <span className={styles.roundArrow}><ArrowRight size={15}/></span>
        </Link>):<div className={styles.catalogUnavailable}><b>Live service cards are temporarily unavailable.</b><p>Use the marketplace to retry the fresh catalog.</p><Link href="/services">Open services <ArrowRight size={14}/></Link></div>}</div>
      </div>
    </section>

    <section id="how-it-works" className={styles.section}>
      <div className="container">
        <div className={styles.sectionTitleRow}><div><span>HOW ORDERING WORKS</span><h2>From discovery to tracking in four clear steps.</h2><p>MANGLO rechecks the live terms and wallet charge before an order is submitted.</p></div><span className={styles.handNote}>Simple.<br/>Fast. Secure. ↘</span></div>
        <div className={styles.steps}>
          <article><span>01</span><div className={styles.stepIcon}><Search size={20}/></div><h3>Find a service</h3><p>Search or browse live services across your favourite platforms.</p></article>
          <article><span>02</span><div className={styles.stepIcon}><FileText size={20}/></div><h3>Read the details</h3><p>Review current rate, quantity limits, timing and provider-listed terms.</p></article>
          <article><span>03</span><div className={styles.stepIcon}><CreditCard size={20}/></div><h3>Place your order</h3><p>Approve the exact MANGLO Wallet charge before submission.</p></article>
          <article><span>04</span><div className={styles.stepIcon}><BarChart3 size={20}/></div><h3>Track your order</h3><p>Follow processing, completion and wallet outcomes from your account.</p></article>
        </div>
      </div>
    </section>

    <section className={styles.trustSection}>
      <div className={`container ${styles.trustGrid}`}>
        <div className={styles.trustCopy}><span>TRUST & SAFETY</span><h2>Low prices matter more when the order system is accountable.</h2><p>MANGLO combines live pricing with server-side validation, supplier-health monitoring, wallet records, order tracking and support tied to the actual transaction.</p><Link href="/trust">See how MANGLO protects orders <ArrowRight size={14}/></Link></div>
        <div className={styles.trustCards}>
          <article><span><LockKeyhole size={19}/></span><div><b>Protected payments</b><p>Wallet funding is completed through Cashfree hosted checkout.</p></div></article>
          <article><span><FileText size={19}/></span><div><b>Transparent terms</b><p>Current service rates, limits and provider information stay visible.</p></div></article>
          <article><span><BarChart3 size={19}/></span><div><b>Outcome-based monitoring</b><p>Recent completions and failures feed supplier-health signals.</p></div></article>
          <article><span><Headphones size={19}/></span><div><b>Order-linked support</b><p>Open a support request and attach the relevant order for context.</p></div></article>
        </div>
      </div>
    </section>

    <section className={styles.inviteSection}><div className={`container ${styles.inviteBanner}`}><div><span>INVITE & EARN</span><h2>Grow together. Earn together.</h2><p>Invite a friend. Referral rewards are credited only after a qualifying completed order.</p></div><div className={styles.giftArt}><i>₹</i><span><Gift size={62}/></span><i>+</i></div><Link href="/invite">Invite friends <ArrowRight size={14}/></Link></div></section>

    <section className={styles.faqSection}>
      <div className={`container ${styles.faqGrid}`}>
        <div className={styles.faqIntro}><span>FAQ</span><h2>Know what happens<br/>before you order.</h2><p>Clear answers about pricing, delivery, wallet funding and support.</p><Link href="/faq">Browse all FAQs <ArrowRight size={14}/></Link></div>
        <div className={styles.faqList}>
          <details><summary>How do I know what I will be charged?</summary><p>The current customer rate is shown in the live catalog. MANGLO calculates the exact wallet charge from your quantity and validates it again before submission.</p></details>
          <details><summary>Why can a service price change?</summary><p>MANGLO uses synchronized supplier data. Availability and rates can change, so the transaction flow rechecks the current service and exact charge before accepting the order.</p></details>
          <details><summary>How long does delivery take?</summary><p>Provider-reported timing is shown where available. It is an estimate, not a guaranteed completion time.</p></details>
          <details><summary>What happens if a provider cancels or fails an eligible order?</summary><p>MANGLO reconciles the provider outcome and eligible failed or cancelled service orders are restored to the MANGLO Wallet through the recorded refund flow.</p></details>
        </div>
      </div>
    </section>

    <section className={styles.finalCta}><div className="container"><div className={styles.finalCtaCard}><div><span>START SMALL. COMPARE FIRST.</span><h2>See the live price, limits and service context before you spend.</h2></div><div><Link className={styles.primaryCta} href="/services">Compare services <ArrowRight size={14}/></Link><Link className={styles.finalSecondary} href="/about">Why MANGLO exists</Link></div></div></div></section>
  </main>;
}
