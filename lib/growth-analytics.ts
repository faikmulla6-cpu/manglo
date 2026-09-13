import {db} from './db';

function visitorKey(event:{userId:string|null;sessionId:string|null;anonymousId:string|null}){return event.userId?`u:${event.userId}`:event.sessionId?`s:${event.sessionId}`:event.anonymousId?`a:${event.anonymousId}`:null}
function metaString(value:unknown,key:string){if(!value||typeof value!=='object'||Array.isArray(value))return'';const raw=(value as Record<string,unknown>)[key];return typeof raw==='string'?raw:''}
function metaNumber(value:unknown,key:string){if(!value||typeof value!=='object'||Array.isArray(value))return 0;const raw=Number((value as Record<string,unknown>)[key]);return Number.isFinite(raw)?raw:0}

export async function getGrowthAnalytics(days=30){
 const since=new Date(Date.now()-days*86_400_000);const now=new Date();const abandonedBefore=new Date(Date.now()-30*60_000);
 const [events,recoverableDrafts,referrals]=await Promise.all([
  db.analyticsEvent.findMany({
   where:{createdAt:{gte:since}},
   select:{event:true,userId:true,anonymousId:true,sessionId:true,source:true,medium:true,campaign:true,referrerHost:true,metadata:true,createdAt:true},
   orderBy:{createdAt:'desc'},take:30000,
  }),
  db.orderDraft.count({where:{expiresAt:{gt:now},updatedAt:{lte:abandonedBefore},service:{is:{active:true,operatorDisabled:false}}}}).catch(()=>0),
  db.referral.findMany({where:{OR:[{createdAt:{gte:since}},{rewardedAt:{gte:since}}]},select:{createdAt:true,rewardedAt:true,referrerRewardPaise:true,qualifyingOrder:{select:{chargedPaise:true,providerCostPaise:true}}}}).catch(()=>[]),
 ]);
 events.reverse();
 const stageNames=['PAGE_VIEW','SERVICE_VIEW','ORDER_REVIEW','WALLET_TOPUP_STARTED','WALLET_TOPUP_PAID','ORDER_PLACED'] as const;
 const stageSets=new Map<string,Set<string>>(stageNames.map(name=>[name,new Set<string>()]));
 const userSource=new Map<string,string>();
 const sourceVisitors=new Map<string,Set<string>>();
 const sourceOrders=new Map<string,{orders:number;gross:number;users:Set<string>}>();
 const searches=new Map<string,number>();
 const preparedDrafts=new Set<string>();const recoveryOpened=new Set<string>();const recoveredCustomers=new Set<string>();const referralVisitors=new Set<string>();let referralPageViews=0;let recoveryOpens=0;let recoveredOrders=0;let recoveredGross=0;let reorderStarts=0;
 for(const event of events){
  const key=visitorKey(event);
  if(key&&stageSets.has(event.event))stageSets.get(event.event)!.add(key);
  const source=(event.source||event.referrerHost||'Direct / unknown').trim()||'Direct / unknown';
  if(key&&event.event==='PAGE_VIEW'){
   const set=sourceVisitors.get(source)||new Set<string>();set.add(key);sourceVisitors.set(source,set);
   if(event.source==='referral'){referralVisitors.add(key);referralPageViews++}
  }
  if(event.userId&&!userSource.has(event.userId))userSource.set(event.userId,source);
  if(event.event==='ORDER_PLACED'&&event.userId){
   const attributed=userSource.get(event.userId)||'Direct / unknown';
   const row=sourceOrders.get(attributed)||{orders:0,gross:0,users:new Set<string>()};row.orders++;row.gross+=metaNumber(event.metadata,'chargedPaise');row.users.add(event.userId);sourceOrders.set(attributed,row);
  }
  if(event.event==='SERVICE_SEARCH'){
   const term=metaString(event.metadata,'term');if(term&&term!=='[redacted]')searches.set(term,(searches.get(term)||0)+1);
  }
  if(event.event==='ORDER_DRAFT_READY'&&key)preparedDrafts.add(key);
  if(event.event==='ORDER_RECOVERY_OPENED'){recoveryOpens++;if(key)recoveryOpened.add(key)}
  if(event.event==='ORDER_RECOVERED'){recoveredOrders++;recoveredGross+=metaNumber(event.metadata,'chargedPaise');if(event.userId)recoveredCustomers.add(event.userId)}
  if(event.event==='REORDER_STARTED')reorderStarts++;
 }
 const stages=stageNames.map((event,index)=>{const visitors=stageSets.get(event)!.size;const previous=index===0?visitors:stageSets.get(stageNames[index-1])!.size;return{event,visitors,stepRate:previous?visitors/previous*100:0}});
 const sources=[...new Set([...sourceVisitors.keys(),...sourceOrders.keys()])].map(source=>{const visitors=sourceVisitors.get(source)?.size||0;const order=sourceOrders.get(source);return{source,visitors,orders:order?.orders||0,customers:order?.users.size||0,gross:order?.gross||0,conversionRate:visitors?(order?.users.size||0)/visitors*100:0}}).sort((a,b)=>b.orders-a.orders||b.visitors-a.visitors).slice(0,12);
 const signups=await db.user.count({where:{createdAt:{gte:since}}});
 const attributedReferrals=referrals.filter(item=>item.createdAt>=since);const rewardedReferrals=referrals.filter(item=>item.rewardedAt&&item.rewardedAt>=since);
 let referralRewardCost=0,referralOrderValue=0,referralGrossMargin=0;
 for(const referral of rewardedReferrals){const order=referral.qualifyingOrder;referralRewardCost+=Number(referral.referrerRewardPaise);if(order){const charged=Number(order.chargedPaise);const cost=Number(order.providerCostPaise||0);referralOrderValue+=charged;referralGrossMargin+=Math.max(0,charged-cost)}}
 return {days,eventsSampled:events.length>=30000,signups,stages,sources,topSearches:[...searches.entries()].map(([term,count])=>({term,count})).sort((a,b)=>b.count-a.count).slice(0,10),retention:{preparedCustomers:preparedDrafts.size,recoverableDrafts,recoveryOpens,recoveryVisitors:recoveryOpened.size,recoveredOrders,recoveredCustomers:recoveredCustomers.size,recoveredGross,recoveryRate:recoveryOpens?recoveredOrders/recoveryOpens*100:0,reorderStarts},referrals:{pageViews:referralPageViews,visitors:referralVisitors.size,attributedSignups:attributedReferrals.length,rewarded:rewardedReferrals.length,rewardCost:referralRewardCost,orderValue:referralOrderValue,grossMargin:referralGrossMargin,netContribution:referralGrossMargin-referralRewardCost,activationRate:attributedReferrals.length?rewardedReferrals.length/attributedReferrals.length*100:0}};
}
