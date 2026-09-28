'use client';

import {useRef,useState} from 'react';
import {FileText,Image as ImageIcon,Loader2,Trash2,UploadCloud} from 'lucide-react';
import {WEBSITE_PROJECT_MAX_FILE_BYTES} from '@/lib/website-project-constants';
import styles from './ProjectOnboarding.module.css';

type Kind='LOGO'|'BUSINESS_PHOTO'|'WORK_PHOTO'|'DOCUMENT';
type Asset={id:string;kind:Kind;path:string;originalName:string;mimeType:string;sizeBytes:number;signedUrl:string|null};

const labels:Record<Kind,{title:string;copy:string;multiple:boolean}>={
 LOGO:{title:'Logo',copy:'PNG, JPG or WebP. Transparent PNG is ideal when available.',multiple:false},
 BUSINESS_PHOTO:{title:'Business / shop photos',copy:'Exterior, interior, team or workspace photos.',multiple:true},
 WORK_PHOTO:{title:'Work / product / service photos',copy:'Show the actual work, products or results customers should see.',multiple:true},
 DOCUMENT:{title:'Menu / price list / brochure',copy:'PDF or clear image files are supported.',multiple:true},
};

const allowed=new Set(['image/jpeg','image/png','image/webp','image/heic','image/heif','application/pdf']);

export default function ProjectAssetUploader({projectId,initialAssets,onCountChange}:{projectId:string;initialAssets:Asset[];onCountChange?:(count:number)=>void}){
 const [assets,setAssets]=useState(initialAssets);
 const [busy,setBusy]=useState<Kind|null>(null);
 const [message,setMessage]=useState('');
 const apiBase='/api/projects/'+projectId;
 const inputs=useRef<Record<string,HTMLInputElement|null>>({});

 async function upload(kind:Kind,files:FileList|File[]){
  const list=Array.from(files);
  if(!list.length||busy)return;
  setMessage('');
  const accepted=list.filter(file=>{
   if(!allowed.has(file.type)){setMessage('Unsupported file type. Use JPG, PNG, WebP, HEIC/HEIF or PDF.');return false}
   if(file.size>WEBSITE_PROJECT_MAX_FILE_BYTES){setMessage('Each file must be 6 MB or smaller.');return false}
   if(kind!=='DOCUMENT'&&file.type==='application/pdf'){setMessage('Photos and logos must be image files.');return false}
   return true;
  });
  if(!accepted.length)return;
  setBusy(kind);

  try{
   for(const file of accepted){
    const form=new FormData();
    form.set('kind',kind);
    form.set('file',file);
    const response=await fetch(apiBase+'/assets',{method:'POST',body:form});
    const body=await response.json().catch(()=>({}));
    if(!response.ok)throw new Error(body?.error||'Upload failed.');
    setAssets(current=>{
     const next=kind==='LOGO'?current.filter(asset=>asset.kind!=='LOGO'):current;
     const updated=[...next,body.asset];
     onCountChange?.(updated.length);
     return updated;
    });
   }
  }catch(error){
   setMessage(error instanceof Error?error.message:'Upload failed.');
  }finally{setBusy(null)}
 }

 async function remove(asset:Asset){
  if(busy)return;
  setMessage('');
  const response=await fetch(apiBase+'/assets?assetId='+encodeURIComponent(asset.id),{method:'DELETE'});
  const body=await response.json().catch(()=>({}));
  if(!response.ok){setMessage(body?.error||'Could not remove the file.');return}
  setAssets(current=>{
   const updated=current.filter(item=>item.id!==asset.id);
   onCountChange?.(updated.length);
   return updated;
  });
 }

 return <div className={styles.assetSection}>
  <div className={styles.assetNotice}><UploadCloud size={16}/><div><b>Upload original/high-quality files whenever possible.</b><span>Private project storage · maximum 6 MB per file · JPG, PNG, WebP, HEIC/HEIF and PDF.</span></div></div>
  {message?<div className={styles.uploadError}>{message}</div>:null}
  <div className={styles.assetGrid}>
   {(Object.keys(labels) as Kind[]).map(kind=>{
    const config=labels[kind],items=assets.filter(asset=>asset.kind===kind);
    return <section className={styles.dropCard} key={kind} onDragOver={event=>event.preventDefault()} onDrop={event=>{event.preventDefault();void upload(kind,event.dataTransfer.files)}}>
     <div className={styles.dropHead}><span>{kind==='DOCUMENT'?<FileText/>:<ImageIcon/>}</span><div><b>{config.title}</b><small>{config.copy}</small></div></div>
     <button type="button" className={styles.uploadButton} onClick={()=>inputs.current[kind]?.click()} disabled={busy!==null}>
      {busy===kind?<><Loader2 className={styles.spin} size={14}/> Uploading…</>:<><UploadCloud size={14}/> {config.multiple?'Add files':'Choose file'}</>}
     </button>
     <input ref={node=>{inputs.current[kind]=node}} className={styles.hiddenInput} type="file" multiple={config.multiple} accept={kind==='DOCUMENT'?'image/jpeg,image/png,image/webp,image/heic,image/heif,application/pdf':'image/jpeg,image/png,image/webp,image/heic,image/heif'} onChange={event=>{if(event.target.files)void upload(kind,event.target.files);event.currentTarget.value=''}}/>
     {items.length?<div className={styles.assetList}>{items.map(asset=><div className={styles.assetItem} key={asset.id}>
      {['image/jpeg','image/png','image/webp'].includes(asset.mimeType)&&asset.signedUrl?<img src={asset.signedUrl} alt=""/>:<span className={styles.fileIcon}><FileText size={16}/></span>}
      <div><b>{asset.originalName}</b><small>{Math.max(1,Math.round(asset.sizeBytes/1024))} KB</small></div>
      <button type="button" onClick={()=>void remove(asset)} aria-label={'Remove '+asset.originalName}><Trash2 size={14}/></button>
     </div>)}</div>:<small className={styles.emptyAsset}>Drag files here or use the button above.</small>}
    </section>;
   })}
  </div>
 </div>;
}