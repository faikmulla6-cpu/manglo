import {db} from './db';

export const ANALYTICS_EVENTS=[
 'PAGE_VIEW','SERVICE_SEARCH','SERVICE_VIEW','FAVORITE_TOGGLED','AUTH_STARTED','AUTH_SUCCESS','SIGNUP_SUBMITTED',
 'ORDER_REVIEW','ORDER_ATTEMPT','ORDER_PLACED','REORDER_STARTED','WALLET_TOPUP_STARTED','WALLET_TOPUP_PAID','AI_OPENED','SUPPORT_OPENED'
] as const;
export type AnalyticsEventName=(typeof ANALYTICS_EVENTS)[number];

type Scalar=string|number|boolean|null;
type Input={
 event:AnalyticsEventName;userId?:string|null;anonymousId?:string|null;sessionId?:string|null;path?:string|null;
 source?:string|null;medium?:string|null;campaign?:string|null;content?:string|null;term?:string|null;referrerHost?:string|null;
 metadata?:Record<string,Scalar>|null;uniqueKey?:string|null;
};

function text(value:unknown,max:number){return typeof value==='string'?value.trim().slice(0,max)||null:null}
function metadata(value:Record<string,Scalar>|null|undefined){
 if(!value)return undefined;
 const out:Record<string,Scalar>={};
 for(const [key,raw] of Object.entries(value).slice(0,20)){
  const cleanKey=key.replace(/[^a-zA-Z0-9_.-]/g,'').slice(0,48);
  if(!cleanKey)continue;
  out[cleanKey]=typeof raw==='string'?raw.slice(0,180):raw;
 }
 return out;
}

export async function recordAnalytics(input:Input){
 try{
  await db.analyticsEvent.create({data:{
   userId:input.userId||null,anonymousId:text(input.anonymousId,80),sessionId:text(input.sessionId,80),event:input.event,
   path:text(input.path,240),source:text(input.source,120),medium:text(input.medium,120),campaign:text(input.campaign,160),
   content:text(input.content,160),term:text(input.term,160),referrerHost:text(input.referrerHost,180),metadata:metadata(input.metadata),uniqueKey:text(input.uniqueKey,180),
  }});
  return true;
 }catch(error:any){
  if(error?.code==='P2002')return false;
  console.warn('[analytics]',error instanceof Error?error.message:'record failed');
  return false;
 }
}

export async function linkAnonymousAnalytics(userId:string,anonymousId?:string|null){
 const id=text(anonymousId,80);if(!id)return;
 try{
  const linked=await db.analyticsEvent.updateMany({where:{anonymousId:id,userId:null},data:{userId}});
  if(linked.count>0)await db.user.update({where:{id:userId},data:{analyticsLinkedAt:new Date()}}).catch(()=>undefined);
 }catch(error){console.warn('[analytics-link]',error instanceof Error?error.message:'link failed')}
}
