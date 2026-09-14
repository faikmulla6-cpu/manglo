import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {db} from '@/lib/db';
import {requireAdminApi} from '@/lib/admin-ops';
import {cleanText} from '@/lib/security';

const Body=z.object({
 source:z.string().min(1).max(120),
 campaign:z.string().min(1).max(160),
 date:z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
 spendPaise:z.number().int().min(0).max(100_000_000_000),
 impressions:z.number().int().min(0).max(Number.MAX_SAFE_INTEGER).default(0),
 clicks:z.number().int().min(0).max(Number.MAX_SAFE_INTEGER).default(0),
 currency:z.literal('INR').default('INR'),
 externalCampaignId:z.string().max(200).optional().nullable(),
});

export async function POST(req:NextRequest){
 try{
  const admin=await requireAdminApi(req);if(!admin)return NextResponse.json({error:'Not found'},{status:404});
  const input=Body.parse(await req.json());
  const source=cleanText(input.source,120).toLowerCase();
  const campaign=cleanText(input.campaign,160);
  if(!source||!campaign)return NextResponse.json({error:'Source and campaign are required.'},{status:400});
  const date=new Date(`${input.date}T00:00:00.000Z`);
  if(Number.isNaN(date.getTime()))return NextResponse.json({error:'Invalid spend date.'},{status:400});
  const tomorrow=new Date();tomorrow.setUTCHours(24,0,0,0);
  if(date>=tomorrow)return NextResponse.json({error:'Spend date cannot be in the future.'},{status:400});
  const externalCampaignId=input.externalCampaignId?cleanText(input.externalCampaignId,200):null;

  const saved=await db.$transaction(async tx=>{
   const existing=await tx.marketingSpendDaily.findUnique({where:{source_campaign_date:{source,campaign,date}}});
   const row=await tx.marketingSpendDaily.upsert({
    where:{source_campaign_date:{source,campaign,date}},
    create:{source,campaign,date,spendPaise:BigInt(input.spendPaise),impressions:BigInt(input.impressions),clicks:BigInt(input.clicks),currency:'INR',externalCampaignId},
    update:{spendPaise:BigInt(input.spendPaise),impressions:BigInt(input.impressions),clicks:BigInt(input.clicks),currency:'INR',externalCampaignId},
   });
   await tx.adminAuditLog.create({data:{
    adminEmail:admin.email.trim().toLowerCase(),action:existing?'MARKETING_SPEND_UPDATED':'MARKETING_SPEND_RECORDED',entityType:'MarketingSpendDaily',entityId:row.id,
    before:existing?{source:existing.source,campaign:existing.campaign,date:existing.date.toISOString().slice(0,10),spendPaise:Number(existing.spendPaise),impressions:Number(existing.impressions),clicks:Number(existing.clicks)}:undefined,
    after:{source:row.source,campaign:row.campaign,date:row.date.toISOString().slice(0,10),spendPaise:Number(row.spendPaise),impressions:Number(row.impressions),clicks:Number(row.clicks)},
   }});
   return row;
  });

  return NextResponse.json({ok:true,source:saved.source,campaign:saved.campaign,date:saved.date.toISOString().slice(0,10),spendPaise:Number(saved.spendPaise)},{headers:{'Cache-Control':'no-store'}});
 }catch(error:any){
  console.error('[admin-marketing-spend]',error instanceof Error?error.message:'unknown');
  return NextResponse.json({error:error?.issues?'Check the campaign spend fields.':'Unable to save campaign spend.'},{status:400});
 }
}
