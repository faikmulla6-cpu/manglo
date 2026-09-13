import {BarChart3,Search,TrendingUp} from 'lucide-react';
import {getGrowthAnalytics} from '@/lib/growth-analytics';
import styles from './Ops.module.css';

const money=(paise:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(paise/100);
const labels:Record<string,string>={PAGE_VIEW:'Visitors',SERVICE_VIEW:'Service viewers',ORDER_REVIEW:'Order reviewers',WALLET_TOPUP_STARTED:'Top-up starters',WALLET_TOPUP_PAID:'Funded wallets',ORDER_PLACED:'Customers ordered'};

export default async function GrowthPanel(){
 const growth=await getGrowthAnalytics(30).catch(error=>{console.error('[operations:growth]',error);return null});
 return <section id="growth" className={styles.panel}>
  <div className={styles.panelHead}><div><span>GROWTH INTELLIGENCE · 30 DAYS</span><h2>Acquisition and conversion</h2></div><TrendingUp size={16}/></div>
  {!growth?<div className={styles.empty}><BarChart3/><b>Growth analytics unavailable</b><p>Ordering and operations are unaffected.</p></div>:<>
   <div className={styles.systemStrip}>{growth.stages.slice(0,4).map(stage=><article key={stage.event}><span>{labels[stage.event]||stage.event}</span><b>{stage.visitors.toLocaleString('en-IN')}</b><small>{stage.event==='PAGE_VIEW'?'Unique visitor/session identities':`${stage.stepRate.toFixed(1)}% from previous stage`}</small></article>)}</div>
   <div className={styles.gridTwo}>
    <div><div className={styles.panelHead}><div><span>FUNNEL</span><h2>From discovery to order</h2></div></div><div className={styles.tableWrap}><table><thead><tr><th>Stage</th><th>Unique</th><th>Step rate</th></tr></thead><tbody>{growth.stages.map(stage=><tr key={stage.event}><td><b>{labels[stage.event]||stage.event}</b></td><td>{stage.visitors.toLocaleString('en-IN')}</td><td>{stage.event==='PAGE_VIEW'?'—':`${stage.stepRate.toFixed(1)}%`}</td></tr>)}</tbody></table></div><p className={styles.foot}>{growth.signups} new account{growth.signups===1?'':'s'} created in this period.</p></div>
    <div><div className={styles.panelHead}><div><span>SEARCH INTENT</span><h2>What customers look for</h2></div><Search size={15}/></div>{growth.topSearches.length?<div className={styles.list}>{growth.topSearches.map(item=><article key={item.term}><span className={styles.iconBox}><Search size={13}/></span><div><b>{item.term}</b><small>Marketplace search</small></div><time>{item.count}</time></article>)}</div>:<div className={styles.empty}><Search/><b>No search data yet</b><p>Search terms appear here after customers use the marketplace.</p></div>}</div>
   </div>
   <div className={styles.panelHead}><div><span>ATTRIBUTION</span><h2>Traffic sources that reach orders</h2></div></div>
   {growth.sources.length?<div className={styles.tableWrap}><table><thead><tr><th>Source</th><th>Visitors</th><th>Ordering customers</th><th>Orders</th><th>Order value</th><th>Visitor → customer</th></tr></thead><tbody>{growth.sources.map(source=><tr key={source.source}><td><b>{source.source}</b></td><td>{source.visitors}</td><td>{source.customers}</td><td>{source.orders}</td><td>{money(source.gross)}</td><td>{source.conversionRate.toFixed(1)}%</td></tr>)}</tbody></table></div>:<div className={styles.empty}><TrendingUp/><b>No attribution data yet</b><p>UTM and referrer attribution will appear as new traffic arrives.</p></div>}
   {growth.eventsSampled?<p className={styles.foot}>Growth analytics are capped to the latest 30,000 events in the 30-day window.</p>:null}
  </>}
 </section>;
}
