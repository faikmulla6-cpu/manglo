import {db} from './db';

const DAY=86_400_000;
const ORDER_SAMPLE=20_000;
const EVENT_SAMPLE=50_000;
const PAID_WINDOW_DAYS=30;

type RetentionPoint={days:number;mature:number;retained:number;rate:number|null};
type Touch={source:string;campaign:string};
type Reward={amount:number;rewardedAt:Date};
type CustomerEconomics={
 userId:string;firstOrderAt:Date;orders:{createdAt:Date;chargedPaise:number;providerCostPaise:number}[];
 revenue:number;margin:number;rewardCost:number;rewardedAt:Date|null;contribution:number;touch:Touch;
};

function touchLabel(source:string|null,referrerHost:string|null){
 const clean=(source||'').trim();if(clean)return clean;
 const ref=(referrerHost||'').trim();return ref||'Direct / unknown';
}
function campaignLabel(value:string|null){return value?.trim()||'(none)'}
function normalizedKey(value:string){return value.trim().toLowerCase()}
function acquisitionKey(source:string,campaign:string){return `${normalizedKey(source)}\u0000${normalizedKey(campaign)}`}
function moneyNumber(value:bigint|null|undefined){return Number(value||0n)}
function percentile(values:number[],p:number){
 if(!values.length)return 0;
 const sorted=[...values].sort((a,b)=>a-b);const index=Math.min(sorted.length-1,Math.max(0,Math.ceil(sorted.length*p)-1));return sorted[index];
}
function retention(customers:CustomerEconomics[],days:number,now:number):RetentionPoint{
 const mature=customers.filter(customer=>now-customer.firstOrderAt.getTime()>=days*DAY);
 const retained=mature.filter(customer=>customer.orders.some((order,index)=>index>0&&order.createdAt.getTime()-customer.firstOrderAt.getTime()<=days*DAY)).length;
 return {days,mature:mature.length,retained,rate:mature.length?retained/mature.length*100:null};
}
function cohortKey(date:Date){return `${date.getUTCFullYear()}-${String(date.getUTCMonth()+1).padStart(2,'0')}`}
function cohortLabel(key:string){const [year,month]=key.split('-').map(Number);return new Intl.DateTimeFormat('en-IN',{month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(Date.UTC(year,month-1,1)))}
function groupCacEconomics(customers:CustomerEconomics[],now:number){
 const revenue=customers.reduce((sum,customer)=>sum+customer.revenue,0);
 const contribution=customers.reduce((sum,customer)=>sum+customer.contribution,0);
 const orders=customers.reduce((sum,customer)=>sum+customer.orders.length,0);
 const repeat=customers.filter(customer=>customer.orders.length>=2).length;
 const mature30=customers.filter(customer=>now-customer.firstOrderAt.getTime()>=30*DAY);let contribution30=0;
 for(const customer of mature30){
  const cutoff=customer.firstOrderAt.getTime()+30*DAY;
  const margin30=customer.orders.filter(order=>order.createdAt.getTime()<=cutoff).reduce((sum,order)=>sum+order.chargedPaise-order.providerCostPaise,0);
  const reward30=customer.rewardedAt&&customer.rewardedAt.getTime()<=cutoff?customer.rewardCost:0;contribution30+=margin30-reward30;
 }
 const breakEvenCac=mature30.length?contribution30/mature30.length:(customers.length?contribution/customers.length:0);
 return{revenue,contribution,orders,repeat,breakEvenCac,safeCac:Math.max(0,breakEvenCac*.7),cacBasis:mature30.length?'30-day matured':'realized to date',mature30:mature30.length};
}

export async function getLifecycleAnalytics(){
 const now=Date.now();const paidSince=new Date(now-PAID_WINDOW_DAYS*DAY);paidSince.setUTCHours(0,0,0,0);
 const orders=await db.order.findMany({
  where:{status:'COMPLETED'},
  select:{userId:true,chargedPaise:true,providerCostPaise:true,createdAt:true},
  orderBy:{createdAt:'desc'},take:ORDER_SAMPLE,
 });
 orders.reverse();
 const userIds=[...new Set(orders.map(order=>order.userId))];
 const [events,referrals,spendRows]=await Promise.all([
  userIds.length?db.analyticsEvent.findMany({
   where:{userId:{in:userIds}},
   select:{userId:true,source:true,campaign:true,referrerHost:true,createdAt:true},
   orderBy:{createdAt:'asc'},take:EVENT_SAMPLE,
  }):Promise.resolve([]),
  userIds.length?db.referral.findMany({where:{referredUserId:{in:userIds}},select:{referredUserId:true,referrerRewardPaise:true,rewardedAt:true}}).catch(()=>[]):Promise.resolve([]),
  db.marketingSpendDaily.findMany({where:{date:{gte:paidSince}},orderBy:{date:'asc'},take:5000}).catch(()=>[]),
 ]);

 const firstTouch=new Map<string,Touch>();
 for(const event of events){
  if(!event.userId||firstTouch.has(event.userId))continue;
  firstTouch.set(event.userId,{source:touchLabel(event.source,event.referrerHost),campaign:campaignLabel(event.campaign)});
 }
 const rewardByUser=new Map<string,Reward>();
 for(const referral of referrals){if(referral.rewardedAt)rewardByUser.set(referral.referredUserId,{amount:moneyNumber(referral.referrerRewardPaise),rewardedAt:referral.rewardedAt})}

 const byUser=new Map<string,CustomerEconomics['orders']>();let unpricedCompletedOrders=0;
 for(const order of orders){
  if(order.providerCostPaise===null){unpricedCompletedOrders++;continue}
  const rows=byUser.get(order.userId)||[];rows.push({createdAt:order.createdAt,chargedPaise:Number(order.chargedPaise),providerCostPaise:Number(order.providerCostPaise)});byUser.set(order.userId,rows);
 }
 const customers:CustomerEconomics[]=[];
 for(const [userId,userOrders] of byUser){
  userOrders.sort((a,b)=>a.createdAt.getTime()-b.createdAt.getTime());
  const revenue=userOrders.reduce((sum,order)=>sum+order.chargedPaise,0);
  const margin=userOrders.reduce((sum,order)=>sum+order.chargedPaise-order.providerCostPaise,0);
  const reward=rewardByUser.get(userId);const rewardCost=reward?.amount||0;
  customers.push({userId,firstOrderAt:userOrders[0].createdAt,orders:userOrders,revenue,margin,rewardCost,rewardedAt:reward?.rewardedAt||null,contribution:margin-rewardCost,touch:firstTouch.get(userId)||{source:'Direct / unknown',campaign:'(none)'}});
 }

 const totalRevenue=customers.reduce((sum,customer)=>sum+customer.revenue,0);
 const totalMargin=customers.reduce((sum,customer)=>sum+customer.margin,0);
 const totalRewards=customers.reduce((sum,customer)=>sum+customer.rewardCost,0);
 const totalContribution=customers.reduce((sum,customer)=>sum+customer.contribution,0);
 const totalOrders=customers.reduce((sum,customer)=>sum+customer.orders.length,0);
 const repeatCustomers=customers.filter(customer=>customer.orders.length>=2).length;
 const customerCount=customers.length;const repeatRate=customerCount?repeatCustomers/customerCount*100:0;
 const retentionPoints=[7,30,90].map(days=>retention(customers,days,now));const contributionValues=customers.map(customer=>customer.contribution);

 const cohortMap=new Map<string,CustomerEconomics[]>();
 for(const customer of customers){const key=cohortKey(customer.firstOrderAt);const rows=cohortMap.get(key)||[];rows.push(customer);cohortMap.set(key,rows)}
 const cohorts=[...cohortMap.entries()].sort(([a],[b])=>b.localeCompare(a)).slice(0,6).map(([key,rows])=>{
  const points=[7,30,90].map(days=>retention(rows,days,now));const contribution=rows.reduce((sum,row)=>sum+row.contribution,0);
  return{key,label:cohortLabel(key),customers:rows.length,repeatRate:rows.length?rows.filter(row=>row.orders.length>=2).length/rows.length*100:0,avgContribution:rows.length?contribution/rows.length:0,retention7:points[0],retention30:points[1],retention90:points[2]};
 });

 const sourceMap=new Map<string,{source:string;campaign:string;customers:CustomerEconomics[]}>();
 for(const customer of customers){const key=acquisitionKey(customer.touch.source,customer.touch.campaign);const row=sourceMap.get(key)||{source:customer.touch.source,campaign:customer.touch.campaign,customers:[]};row.customers.push(customer);sourceMap.set(key,row)}
 const acquisitionFull=[...sourceMap.entries()].map(([key,group])=>{
  const economics=groupCacEconomics(group.customers,now);
  return{key,source:group.source,campaign:group.campaign,customers:group.customers.length,orders:economics.orders,revenue:economics.revenue,contribution:economics.contribution,repeatRate:group.customers.length?economics.repeat/group.customers.length*100:0,breakEvenCac:economics.breakEvenCac,safeCac:economics.safeCac,cacBasis:economics.cacBasis,mature30:economics.mature30};
 });
 const acquisition=acquisitionFull.sort((a,b)=>b.contribution-a.contribution||b.customers-a.customers).slice(0,20);
 const acquisitionByKey=new Map(acquisitionFull.map(row=>[row.key,row]));

 const spendMap=new Map<string,{source:string;campaign:string;spend:number;impressions:number;clicks:number;days:Set<string>}>();
 for(const row of spendRows){
  const key=acquisitionKey(row.source,row.campaign);const current=spendMap.get(key)||{source:row.source,campaign:row.campaign,spend:0,impressions:0,clicks:0,days:new Set<string>()};
  current.spend+=Number(row.spendPaise);current.impressions+=Number(row.impressions);current.clicks+=Number(row.clicks);current.days.add(row.date.toISOString().slice(0,10));spendMap.set(key,current);
 }
 const paidRows=[...spendMap.entries()].map(([key,spend])=>{
  const group=sourceMap.get(key);const cohort=(group?.customers||[]).filter(customer=>customer.firstOrderAt>=paidSince);
  const revenue=cohort.reduce((sum,customer)=>sum+customer.revenue,0);const contribution=cohort.reduce((sum,customer)=>sum+customer.contribution,0);
  const customers=cohort.length;const actualCac=customers?spend.spend/customers:null;const revenueRoas=spend.spend?revenue/spend.spend:null;const contributionRoas=spend.spend?contribution/spend.spend:null;
  const guardrail=acquisitionByKey.get(key);const breakEvenCac=guardrail?.breakEvenCac||0;const safeCac=guardrail?.safeCac||0;
  let status='Learning';
  if(spend.spend>0&&!customers)status='No acquired customers';
  else if(actualCac!==null&&breakEvenCac>0&&actualCac>=breakEvenCac)status='Above break-even';
  else if(actualCac!==null&&safeCac>0&&actualCac>safeCac)status='Above safe CAC';
  else if(actualCac!==null&&safeCac>0&&actualCac<=safeCac)status='Within guardrail';
  const daysWithSpend=spend.days.size;const avgDailySpend=daysWithSpend?spend.spend/daysWithSpend:0;let recommendedDailySpend:number|null=null;let budgetAction='Need 7 spend days + 3 customers';
  if(daysWithSpend>=7&&customers>=3&&actualCac!==null&&breakEvenCac>0){
   let factor=1;budgetAction='Hold';
   if(actualCac>=breakEvenCac||(contributionRoas!==null&&contributionRoas<1)){factor=.5;budgetAction='Cut 50%'}
   else if(actualCac>safeCac){factor=.75;budgetAction='Reduce 25%'}
   else if(actualCac<=safeCac*.8&&(contributionRoas||0)>=1.5){factor=1.2;budgetAction='Scale 20%'}
   else if(actualCac<=safeCac){factor=1.1;budgetAction='Scale 10%'}
   recommendedDailySpend=Math.round(avgDailySpend*factor);
  }
  return{source:spend.source,campaign:spend.campaign,spend:spend.spend,impressions:spend.impressions,clicks:spend.clicks,daysWithSpend,customers,revenue,contribution,netAfterAds:contribution-spend.spend,actualCac,revenueRoas,contributionRoas,breakEvenCac,safeCac,status,avgDailySpend,recommendedDailySpend,budgetAction};
 }).sort((a,b)=>b.spend-a.spend);
 const paidSpend=paidRows.reduce((sum,row)=>sum+row.spend,0);const paidRevenue=paidRows.reduce((sum,row)=>sum+row.revenue,0);const paidContribution=paidRows.reduce((sum,row)=>sum+row.contribution,0);const paidCustomers=paidRows.reduce((sum,row)=>sum+row.customers,0);

 return{
  sampled:orders.length>=ORDER_SAMPLE||events.length>=EVENT_SAMPLE||spendRows.length>=5000,unpricedCompletedOrders,
  customers:customerCount,totalOrders,totalRevenue,totalMargin,totalRewards,totalContribution,repeatCustomers,repeatRate,
  avgRevenueLtv:customerCount?totalRevenue/customerCount:0,avgContributionLtv:customerCount?totalContribution/customerCount:0,
  avgOrdersPerCustomer:customerCount?totalOrders/customerCount:0,medianContributionLtv:percentile(contributionValues,.5),
  retention:retentionPoints,cohorts,acquisition,
  paidMedia:{periodDays:PAID_WINDOW_DAYS,spend:paidSpend,customers:paidCustomers,revenue:paidRevenue,contribution:paidContribution,netAfterAds:paidContribution-paidSpend,actualCac:paidCustomers?paidSpend/paidCustomers:null,revenueRoas:paidSpend?paidRevenue/paidSpend:null,contributionRoas:paidSpend?paidContribution/paidSpend:null,rows:paidRows},
 };
}
