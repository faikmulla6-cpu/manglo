import {db} from './db';

const DAY=86_400_000;
const CUSTOMER_SAMPLE=20_000;
const EVENT_SAMPLE=50_000;

type RetentionPoint={days:number;mature:number;retained:number;rate:number|null};
type Touch={source:string;campaign:string};

function touchLabel(source:string|null,referrerHost:string|null){
 const clean=(source||'').trim();
 if(clean)return clean;
 const ref=(referrerHost||'').trim();
 return ref||'Direct / unknown';
}
function campaignLabel(value:string|null){return value?.trim()||'(none)'}
function moneyNumber(value:bigint|null|undefined){return Number(value||0n)}
function percentile(values:number[],p:number){
 if(!values.length)return 0;
 const sorted=[...values].sort((a,b)=>a-b);
 const index=Math.min(sorted.length-1,Math.max(0,Math.ceil(sorted.length*p)-1));
 return sorted[index];
}
function retention(customers:CustomerEconomics[],days:number,now:number):RetentionPoint{
 const mature=customers.filter(customer=>now-customer.firstOrderAt.getTime()>=days*DAY);
 const retained=mature.filter(customer=>customer.orders.some((order,index)=>index>0&&order.createdAt.getTime()-customer.firstOrderAt.getTime()<=days*DAY)).length;
 return {days,mature:mature.length,retained,rate:mature.length?retained/mature.length*100:null};
}
function cohortKey(date:Date){return `${date.getUTCFullYear()}-${String(date.getUTCMonth()+1).padStart(2,'0')}`}
function cohortLabel(key:string){
 const [year,month]=key.split('-').map(Number);
 return new Intl.DateTimeFormat('en-IN',{month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(Date.UTC(year,month-1,1)));
}

type CustomerEconomics={
 userId:string;firstOrderAt:Date;orders:{createdAt:Date;chargedPaise:number;providerCostPaise:number}[];
 revenue:number;margin:number;rewardCost:number;contribution:number;touch:Touch;
};

export async function getLifecycleAnalytics(){
 const now=Date.now();
 const [orders,events,referrals]=await Promise.all([
  db.order.findMany({
   where:{status:'COMPLETED'},
   select:{userId:true,chargedPaise:true,providerCostPaise:true,createdAt:true},
   orderBy:{createdAt:'asc'},take:CUSTOMER_SAMPLE,
  }),
  db.analyticsEvent.findMany({
   where:{userId:{not:null}},
   select:{userId:true,source:true,campaign:true,referrerHost:true,createdAt:true},
   orderBy:{createdAt:'asc'},take:EVENT_SAMPLE,
  }),
  db.referral.findMany({select:{referredUserId:true,referrerRewardPaise:true,rewardedAt:true}}).catch(()=>[]),
 ]);

 const firstTouch=new Map<string,Touch>();
 for(const event of events){
  if(!event.userId||firstTouch.has(event.userId))continue;
  firstTouch.set(event.userId,{source:touchLabel(event.source,event.referrerHost),campaign:campaignLabel(event.campaign)});
 }
 const rewardByUser=new Map<string,number>();
 for(const referral of referrals){
  if(!referral.rewardedAt)continue;
  rewardByUser.set(referral.referredUserId,(rewardByUser.get(referral.referredUserId)||0)+moneyNumber(referral.referrerRewardPaise));
 }

 const byUser=new Map<string,CustomerEconomics['orders']>();
 for(const order of orders){
  if(order.providerCostPaise===null)continue;
  const rows=byUser.get(order.userId)||[];
  rows.push({createdAt:order.createdAt,chargedPaise:Number(order.chargedPaise),providerCostPaise:Number(order.providerCostPaise)});
  byUser.set(order.userId,rows);
 }
 const customers:CustomerEconomics[]=[];
 for(const [userId,userOrders] of byUser){
  userOrders.sort((a,b)=>a.createdAt.getTime()-b.createdAt.getTime());
  const revenue=userOrders.reduce((sum,order)=>sum+order.chargedPaise,0);
  const margin=userOrders.reduce((sum,order)=>sum+order.chargedPaise-order.providerCostPaise,0);
  const rewardCost=rewardByUser.get(userId)||0;
  customers.push({userId,firstOrderAt:userOrders[0].createdAt,orders:userOrders,revenue,margin,rewardCost,contribution:margin-rewardCost,touch:firstTouch.get(userId)||{source:'Direct / unknown',campaign:'(none)'}});
 }

 const totalRevenue=customers.reduce((sum,customer)=>sum+customer.revenue,0);
 const totalMargin=customers.reduce((sum,customer)=>sum+customer.margin,0);
 const totalRewards=customers.reduce((sum,customer)=>sum+customer.rewardCost,0);
 const totalContribution=customers.reduce((sum,customer)=>sum+customer.contribution,0);
 const totalOrders=customers.reduce((sum,customer)=>sum+customer.orders.length,0);
 const repeatCustomers=customers.filter(customer=>customer.orders.length>=2).length;
 const customerCount=customers.length;
 const repeatRate=customerCount?repeatCustomers/customerCount*100:0;
 const retentionPoints=[7,30,90].map(days=>retention(customers,days,now));
 const contributionValues=customers.map(customer=>customer.contribution);

 const cohortMap=new Map<string,CustomerEconomics[]>();
 for(const customer of customers){const key=cohortKey(customer.firstOrderAt);const rows=cohortMap.get(key)||[];rows.push(customer);cohortMap.set(key,rows)}
 const cohorts=[...cohortMap.entries()].sort(([a],[b])=>b.localeCompare(a)).slice(0,6).map(([key,rows])=>{
  const points=[7,30,90].map(days=>retention(rows,days,now));
  const contribution=rows.reduce((sum,row)=>sum+row.contribution,0);
  return{key,label:cohortLabel(key),customers:rows.length,repeatRate:rows.length?rows.filter(row=>row.orders.length>=2).length/rows.length*100:0,avgContribution:rows.length?contribution/rows.length:0,retention7:points[0],retention30:points[1],retention90:points[2]};
 });

 const sourceMap=new Map<string,{source:string;campaign:string;customers:CustomerEconomics[]}>();
 for(const customer of customers){
  const key=`${customer.touch.source}\u0000${customer.touch.campaign}`;
  const row=sourceMap.get(key)||{source:customer.touch.source,campaign:customer.touch.campaign,customers:[]};row.customers.push(customer);sourceMap.set(key,row);
 }
 const acquisition=[...sourceMap.values()].map(group=>{
  const revenue=group.customers.reduce((sum,customer)=>sum+customer.revenue,0);
  const contribution=group.customers.reduce((sum,customer)=>sum+customer.contribution,0);
  const orders=group.customers.reduce((sum,customer)=>sum+customer.orders.length,0);
  const repeat=group.customers.filter(customer=>customer.orders.length>=2).length;
  const mature30=group.customers.filter(customer=>now-customer.firstOrderAt.getTime()>=30*DAY);
  let contribution30=0;
  for(const customer of mature30){
   const cutoff=customer.firstOrderAt.getTime()+30*DAY;
   const margin30=customer.orders.filter(order=>order.createdAt.getTime()<=cutoff).reduce((sum,order)=>sum+order.chargedPaise-order.providerCostPaise,0);
   contribution30+=margin30-customer.rewardCost;
  }
  const breakEvenCac=mature30.length?contribution30/mature30.length:(group.customers.length?contribution/group.customers.length:0);
  return{source:group.source,campaign:group.campaign,customers:group.customers.length,orders,revenue,contribution,repeatRate:group.customers.length?repeat/group.customers.length*100:0,breakEvenCac,safeCac:Math.max(0,breakEvenCac*.7),cacBasis:mature30.length?'30-day matured':'realized to date',mature30:mature30.length};
 }).sort((a,b)=>b.contribution-a.contribution||b.customers-a.customers).slice(0,20);

 return{
  sampled:orders.length>=CUSTOMER_SAMPLE||events.length>=EVENT_SAMPLE,
  customers:customerCount,totalOrders,totalRevenue,totalMargin,totalRewards,totalContribution,repeatCustomers,repeatRate,
  avgRevenueLtv:customerCount?totalRevenue/customerCount:0,
  avgContributionLtv:customerCount?totalContribution/customerCount:0,
  avgOrdersPerCustomer:customerCount?totalOrders/customerCount:0,
  medianContributionLtv:percentile(contributionValues,.5),
  retention:retentionPoints,cohorts,acquisition,
 };
}
