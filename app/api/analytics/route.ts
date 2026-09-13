import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {assertSameOrigin} from '@/lib/security';
import {getUser} from '@/lib/auth';
import {ANALYTICS_EVENTS,linkAnonymousAnalytics,recordAnalytics} from '@/lib/analytics';

const scalar=z.union([z.string().max(180),z.number().finite(),z.boolean(),z.null()]);
const Body=z.object({
 event:z.enum(ANALYTICS_EVENTS),anonymousId:z.string().max(80).optional(),sessionId:z.string().max(80).optional(),path:z.string().max(240).optional(),
 source:z.string().max(120).optional(),medium:z.string().max(120).optional(),campaign:z.string().max(160).optional(),content:z.string().max(160).optional(),term:z.string().max(160).optional(),referrerHost:z.string().max(180).optional(),
 metadata:z.record(z.string(),scalar).optional(),
});

export async function POST(req:NextRequest){
 try{
  assertSameOrigin(req);
  const input=Body.parse(await req.json());
  const user=await getUser();
  if(user&&input.anonymousId)await linkAnonymousAnalytics(user.id,input.anonymousId);
  await recordAnalytics({...input,userId:user?.id||null});
  return NextResponse.json({ok:true},{headers:{'Cache-Control':'no-store'}});
 }catch(error:any){
  if(error?.issues)return NextResponse.json({error:'Invalid analytics event'},{status:400});
  return NextResponse.json({error:'Unable to record event'},{status:400});
 }
}
