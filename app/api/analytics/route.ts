import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {getUser} from '@/lib/auth';
import {db} from '@/lib/db';
import {ANALYTICS_EVENTS,linkAnonymousAnalytics,recordAnalytics} from '@/lib/analytics';

const scalar=z.union([z.string().max(180),z.number().finite(),z.boolean(),z.null()]);
const Body=z.object({
 event:z.enum(ANALYTICS_EVENTS),anonymousId:z.string().max(80).optional(),sessionId:z.string().max(80).optional(),path:z.string().max(240).optional(),
 source:z.string().max(120).optional(),medium:z.string().max(120).optional(),campaign:z.string().max(160).optional(),content:z.string().max(160).optional(),term:z.string().max(160).optional(),referrerHost:z.string().max(180).optional(),
 metadata:z.record(z.string(),scalar).optional(),
});

function validOrigin(req:NextRequest){
 const origin=req.headers.get('origin');
 const app=process.env.NEXT_PUBLIC_APP_URL;
 if(!origin||!app)return false;
 try{return new URL(origin).origin===new URL(app).origin}catch{return false}
}

export async function POST(req:NextRequest){
 try{
  if(!validOrigin(req))return NextResponse.json({error:'Not allowed'},{status:403});
  const input=Body.parse(await req.json());
  const user=await getUser();
  if(!user&&!input.anonymousId&&!input.sessionId)return NextResponse.json({error:'Analytics identity required'},{status:400});

  const identity=input.sessionId||input.anonymousId||'';
  if(identity){
   const recent=await db.analyticsEvent.count({where:{sessionId:input.sessionId||undefined,anonymousId:input.sessionId?undefined:input.anonymousId,createdAt:{gte:new Date(Date.now()-60_000)}}});
   if(recent>=60)return NextResponse.json({ok:true,dropped:true},{status:202,headers:{'Cache-Control':'no-store'}});
  }

  if(user&&input.anonymousId)await linkAnonymousAnalytics(user.id,input.anonymousId);
  await recordAnalytics({...input,userId:user?.id||null});
  return NextResponse.json({ok:true},{headers:{'Cache-Control':'no-store'}});
 }catch(error:any){
  if(error?.issues)return NextResponse.json({error:'Invalid analytics event'},{status:400});
  return NextResponse.json({error:'Unable to record event'},{status:400});
 }
}
