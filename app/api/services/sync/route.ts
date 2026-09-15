import {NextRequest,NextResponse} from 'next/server';
import {cronAuthorized} from '@/lib/cron';
import {CatalogSyncError,syncSupplierCatalog} from '@/lib/service-sync';

export async function POST(req:NextRequest){
 if(!cronAuthorized(req))return NextResponse.json({error:'Unauthorized'},{status:401});

 try{
  const result=await syncSupplierCatalog();
  return NextResponse.json(result,{headers:{'Cache-Control':'no-store'}});
 }catch(error){
  if(error instanceof CatalogSyncError){
   return NextResponse.json({error:error.message,...error.details},{status:error.status,headers:{'Cache-Control':'no-store'}});
  }
  console.error('Supplier sync failed',error instanceof Error?error.message:'unknown');
  return NextResponse.json({error:'Supplier synchronization failed. Existing catalog was preserved.'},{status:502,headers:{'Cache-Control':'no-store'}});
 }
}
