import crypto from 'crypto';
import {NextRequest,NextResponse} from 'next/server';
import {getUser} from '@/lib/auth';
import {db} from '@/lib/db';
import {createClient} from '@/lib/supabase/server';
import {assertSameOrigin} from '@/lib/security';
import {
 WEBSITE_PROJECT_ASSET_BUCKET,
 WEBSITE_PROJECT_ASSET_KINDS,
 WEBSITE_PROJECT_MAX_ASSETS,
 WEBSITE_PROJECT_MAX_FILE_BYTES,
} from '@/lib/website-project-constants';

export const runtime='nodejs';

const ALLOWED_MIME=new Set([
 'image/jpeg',
 'image/png',
 'image/webp',
 'image/heic',
 'image/heif',
 'application/pdf',
]);

function response(body:unknown,status=200){
 return NextResponse.json(body,{status,headers:{'Cache-Control':'no-store'}});
}

function safeName(name:string){
 const cleaned=name.toLowerCase().replace(/[^a-z0-9._-]+/g,'-').replace(/^-+|-+$/g,'').slice(-100);
 return cleaned||'asset';
}

async function signedUrl(path:string){
 const supabase=await createClient();
 const {data,error}=await supabase.storage.from(WEBSITE_PROJECT_ASSET_BUCKET).createSignedUrl(path,60*60);
 if(error||!data?.signedUrl)return null;
 return data.signedUrl;
}

export async function GET(_req:NextRequest,{params}:{params:Promise<{id:string}>}){
 const user=await getUser();
 if(!user)return response({error:'Authentication required.'},401);
 const {id}=await params;
 const project=await db.websiteProject.findFirst({where:{publicId:id,userId:user.id},select:{id:true}});
 if(!project)return response({error:'Project not found.'},404);
 const assets=await db.websiteProjectAsset.findMany({where:{projectId:project.id},orderBy:{createdAt:'asc'}});
 const items=await Promise.all(assets.map(async asset=>({...asset,signedUrl:await signedUrl(asset.path)})));
 return response({assets:items});
}

export async function POST(req:NextRequest,{params}:{params:Promise<{id:string}>}){
 try{assertSameOrigin(req)}catch{return response({error:'Invalid request origin.'},403)}
 const user=await getUser();
 if(!user)return response({error:'Authentication required.'},401);
 const contentLength=Number(req.headers.get('content-length')||0);
 if(contentLength>WEBSITE_PROJECT_MAX_FILE_BYTES+512*1024)return response({error:'Upload is too large.'},413);
 const {id}=await params;

 const project=await db.websiteProject.findFirst({where:{publicId:id,userId:user.id},select:{id:true,publicId:true}});
 if(!project)return response({error:'Project not found.'},404);

 const form=await req.formData().catch(()=>null);
 if(!form)return response({error:'Invalid upload.'},400);
 const kindValue=String(form.get('kind')||'');
 const file=form.get('file');
 if(!WEBSITE_PROJECT_ASSET_KINDS.includes(kindValue as (typeof WEBSITE_PROJECT_ASSET_KINDS)[number]))return response({error:'Invalid asset type.'},400);
 if(!(file instanceof File))return response({error:'Choose a file to upload.'},400);
 if(!ALLOWED_MIME.has(file.type))return response({error:'Unsupported file type.'},400);
 if(file.size<=0||file.size>WEBSITE_PROJECT_MAX_FILE_BYTES)return response({error:'Each file must be 6 MB or smaller.'},400);
 if(kindValue!=='DOCUMENT'&&file.type==='application/pdf')return response({error:'Photos and logos must be image files.'},400);
 const assetCount=await db.websiteProjectAsset.count({where:{projectId:project.id}});
 if(kindValue!=='LOGO'&&assetCount>=WEBSITE_PROJECT_MAX_ASSETS)return response({error:'This project has reached the 60-file upload limit. Contact MANGLO if you need to send more.'},409);

 const path=user.id+'/'+project.publicId+'/'+crypto.randomUUID()+'-'+safeName(file.name);
 const bytes=new Uint8Array(await file.arrayBuffer());
 const supabase=await createClient();
 const {error:uploadError}=await supabase.storage.from(WEBSITE_PROJECT_ASSET_BUCKET).upload(path,bytes,{
  upsert:false,
  contentType:file.type,
  cacheControl:'3600',
 });
 if(uploadError)return response({error:'Upload failed. Please try again.'},502);

 try{
  const asset=await db.websiteProjectAsset.create({
   data:{
    projectId:project.id,
    kind:kindValue as (typeof WEBSITE_PROJECT_ASSET_KINDS)[number],
    bucket:WEBSITE_PROJECT_ASSET_BUCKET,
    path,
    originalName:file.name.slice(0,180),
    mimeType:file.type,
    sizeBytes:file.size,
   },
  });

  if(kindValue==='LOGO'){
   const old=await db.websiteProjectAsset.findMany({where:{projectId:project.id,kind:'LOGO',id:{not:asset.id}},select:{id:true,path:true}});
   if(old.length){
    await supabase.storage.from(WEBSITE_PROJECT_ASSET_BUCKET).remove(old.map(item=>item.path)).catch(()=>undefined);
    await db.websiteProjectAsset.deleteMany({where:{id:{in:old.map(item=>item.id)}}});
   }
  }

  const url=await signedUrl(path);
  return response({ok:true,asset:{...asset,signedUrl:url}},201);
 }catch(error){
  await supabase.storage.from(WEBSITE_PROJECT_ASSET_BUCKET).remove([path]).catch(()=>undefined);
  console.error('Website project asset registration failed',error instanceof Error?error.message:'unknown');
  return response({error:'Uploaded file could not be registered.'},500);
 }
}

export async function DELETE(req:NextRequest,{params}:{params:Promise<{id:string}>}){
 try{assertSameOrigin(req)}catch{return response({error:'Invalid request origin.'},403)}
 const user=await getUser();
 if(!user)return response({error:'Authentication required.'},401);
 const {id}=await params;
 const assetId=req.nextUrl.searchParams.get('assetId')?.trim()||'';
 if(!assetId||assetId.length>120)return response({error:'Asset not found.'},404);

 const asset=await db.websiteProjectAsset.findFirst({
  where:{id:assetId,project:{publicId:id,userId:user.id}},
  select:{id:true,path:true,bucket:true},
 });
 if(!asset)return response({error:'Asset not found.'},404);

 const supabase=await createClient();
 const {error}=await supabase.storage.from(asset.bucket).remove([asset.path]);
 if(error)return response({error:'Could not delete the uploaded file.'},502);
 await db.websiteProjectAsset.delete({where:{id:asset.id}});
 return response({ok:true});
}