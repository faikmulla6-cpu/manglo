import crypto from 'crypto';
import {db} from './db';
import {recordAnalytics} from './analytics';

export const REFERRAL_MIN_ORDER_PAISE=10_000n;
export const REFERRAL_REWARD_CAP_PAISE=1_000n;
const REFERRAL_MARGIN_SHARE_BPS=2_500n;

export function normalizeReferralCode(value:string|undefined|null){
 return (value||'').trim().toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,24);
}

function newReferralCode(){return `MG${crypto.randomBytes(5).toString('hex').toUpperCase()}`}

export async function ensureReferralCode(userId:string){
 const existing=await db.user.findUnique({where:{id:userId},select:{referralCode:true}});
 if(existing?.referralCode)return existing.referralCode;
 for(let i=0;i<6;i++){
  const code=newReferralCode();
  try{
   const updated=await db.user.updateMany({where:{id:userId,referralCode:null},data:{referralCode:code}});
   if(updated.count===1)return code;
   const current=await db.user.findUnique({where:{id:userId},select:{referralCode:true}});
   if(current?.referralCode)return current.referralCode;
  }catch(error:any){if(error?.code!=='P2002')throw error}
 }
 throw new Error('Unable to create referral code.');
}

export async function claimReferralForUser(userId:string,rawCode:string|undefined|null){
 const code=normalizeReferralCode(rawCode);if(!code)return null;
 const [referrer,referred]=await Promise.all([
  db.user.findUnique({where:{referralCode:code},select:{id:true,createdAt:true}}),
  db.user.findUnique({where:{id:userId},select:{id:true,createdAt:true}}),
 ]);
 if(!referrer||!referred||referrer.id===userId||referrer.createdAt>referred.createdAt)return null;
 try{
  const referral=await db.referral.create({data:{code,referrerId:referrer.id,referredUserId:userId}});
  await recordAnalytics({event:'REFERRAL_ATTRIBUTED',userId,path:'/auth',source:'referral',medium:'invite',campaign:code,uniqueKey:`referral:${referral.id}:attributed`});
  return referral;
 }catch(error:any){
  if(error?.code==='P2002')return db.referral.findUnique({where:{referredUserId:userId}});
  throw error;
 }
}

export async function rewardReferralForCompletedOrder(orderId:string){
 const result=await db.$transaction(async tx=>{
  const order=await tx.order.findUnique({where:{id:orderId},select:{id:true,publicId:true,userId:true,status:true,chargedPaise:true,providerCostPaise:true}});
  if(!order||order.status!=='COMPLETED'||order.chargedPaise<REFERRAL_MIN_ORDER_PAISE||order.providerCostPaise===null)return null;
  const referral=await tx.referral.findUnique({where:{referredUserId:order.userId}});
  if(!referral||referral.rewardedAt)return null;
  const firstEligible=await tx.order.findFirst({where:{userId:order.userId,status:'COMPLETED',chargedPaise:{gte:REFERRAL_MIN_ORDER_PAISE},providerCostPaise:{not:null}},orderBy:{createdAt:'asc'},select:{id:true,publicId:true,chargedPaise:true,providerCostPaise:true}});
  if(!firstEligible||firstEligible.id!==order.id||firstEligible.providerCostPaise===null)return null;
  const margin=firstEligible.chargedPaise-firstEligible.providerCostPaise;if(margin<=0n)return null;
  let reward=(margin*REFERRAL_MARGIN_SHARE_BPS+9_999n)/10_000n;if(reward>REFERRAL_REWARD_CAP_PAISE)reward=REFERRAL_REWARD_CAP_PAISE;if(reward<=0n)return null;
  const key=`referral:${referral.id}:referrer-reward`;
  const existing=await tx.walletLedger.findUnique({where:{idempotencyKey:key}});
  if(existing)return null;
  await tx.user.update({where:{id:referral.referrerId},data:{walletPaise:{increment:reward}}});
  const referrer=await tx.user.findUniqueOrThrow({where:{id:referral.referrerId},select:{walletPaise:true}});
  await tx.walletLedger.create({data:{userId:referral.referrerId,type:'ADJUSTMENT',amountPaise:reward,balanceAfterPaise:referrer.walletPaise,idempotencyKey:key,note:'Referral reward'}});
  await tx.referral.update({where:{id:referral.id},data:{qualifyingOrderId:firstEligible.id,referrerRewardPaise:reward,qualifiedAt:new Date(),rewardedAt:new Date()}});
  return{referrerId:referral.referrerId,rewardPaise:Number(reward),orderValuePaise:Number(firstEligible.chargedPaise),orderPublicId:firstEligible.publicId};
 },{isolationLevel:'Serializable',maxWait:5_000,timeout:10_000});
 if(result)await recordAnalytics({event:'REFERRAL_REWARDED',userId:result.referrerId,path:'/dashboard',uniqueKey:`referral-reward:${orderId}`,metadata:{rewardPaise:result.rewardPaise,orderValuePaise:result.orderValuePaise}});
 return result;
}
