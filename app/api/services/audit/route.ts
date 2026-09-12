import {NextRequest,NextResponse} from 'next/server';
import {providerServices} from '@/lib/provider';
import {db} from '@/lib/db';
import {normalizeSupplierServices,supplierCatalogAudit} from '@/lib/service-sync';

export const dynamic='force-dynamic';

export async function GET(req:NextRequest){
 if(req.headers.get('authorization')!==`Bearer ${process.env.CRON_SECRET}`)return NextResponse.json({error:'Unauthorized'},{status:401});
 try{
  const raw=await providerServices();
  const normalized=normalizeSupplierServices(raw);
  const audit=supplierCatalogAudit(normalized);
  const dbCount=await db.service.count({where:{provider:'primary'}}).catch(()=>0);
  return NextResponse.json({ok:true,writePerformed:false,currentDatabaseServices:dbCount,...audit},{headers:{'Cache-Control':'no-store'}});
 }catch(error){
  console.error('Supplier audit failed',error instanceof Error?error.message:'unknown');
  return NextResponse.json({error:'Supplier audit failed. No catalog changes were made.'},{status:502});
 }
}
