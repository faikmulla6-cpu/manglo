import {NextRequest,NextResponse} from 'next/server';
import {db} from '@/lib/db';
import {normalizeReferralCode} from '@/lib/referrals';

export const dynamic='force-dynamic';

export async function GET(req:NextRequest,{params}:{params:Promise<{code:string}>}){
 const {code:raw}=await params;const code=normalizeReferralCode(raw);
 const referrer=code?await db.user.findUnique({where:{referralCode:code},select:{id:true}}).catch(()=>null):null;
 const target=new URL('/',req.url);
 if(referrer){target.searchParams.set('utm_source','referral');target.searchParams.set('utm_medium','invite');target.searchParams.set('utm_campaign',code)}
 const response=NextResponse.redirect(target);
 if(referrer)response.cookies.set('manglo_referral',code,{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',maxAge:30*24*60*60});
 return response;
}
