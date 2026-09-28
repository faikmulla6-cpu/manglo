
'use client';

import Link from 'next/link';
import {useEffect,useMemo,useRef,useState} from 'react';
import {useRouter} from 'next/navigation';
import {ArrowLeft,ArrowRight,Check,CheckCircle2,Clock3,Plus,Save,Send,ShieldCheck,Trash2} from 'lucide-react';
import ProjectAssetUploader from './ProjectAssetUploader';
import {WEBSITE_PROJECT_PRIMARY_CTAS,WEBSITE_PROJECT_STYLES} from '@/lib/website-project-constants';
import styles from './ProjectOnboarding.module.css';

type ServiceItem={id:string;name:string;description:string;price:string};
type Testimonial={id:string;quote:string;reviewer:string};
type Asset={id:string;kind:'LOGO'|'BUSINESS_PHOTO'|'WORK_PHOTO'|'DOCUMENT';path:string;originalName:string;mimeType:string;sizeBytes:number;signedUrl:string|null};

type Draft={
 businessName:string;
 contactPerson:string;
 category:string;
 description:string;
 phone:string;
 whatsapp:string;
 businessEmail:string;
 existingWebsite:string;
 instagram:string;
 facebook:string;
 socialLinks:string[];
 address:string;
 city:string;
 region:string;
 country:string;
 mapsUrl:string;
 noCustomerFacingLocation:boolean;
 openingDays:string[];
 openingTime:string;
 closingTime:string;
 services:ServiceItem[];
 pricingNotes:string;
 primaryCta:string;
 about:string;
 mustInclude:string;
 mustAvoid:string;
 preferredColors:string;
 preferredStyle:string;
 inspirationSites:string[];
 testimonials:Testimonial[];
 googleBusinessProfile:string;
 existingDomain:string;
 domainProvider:string;
 additionalInstructions:string;
};

const stepNames=['Business','Location & hours','Services & content','Brand & media','Trust & final'] as const;
const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

function uid(prefix:string){
 return prefix+'-'+crypto.randomUUID();
}
function nonEmpty(values:string[]){return values.map(value=>value.trim()).filter(Boolean)}
function cleanDraft(draft:Draft){
 return {
  ...draft,
  socialLinks:nonEmpty(draft.socialLinks),
  inspirationSites:nonEmpty(draft.inspirationSites),
  services:draft.services.map(item=>({...item,name:item.name.trim(),description:item.description.trim(),price:item.price.trim()})),
  testimonials:draft.testimonials.map(item=>({...item,quote:item.quote.trim(),reviewer:item.reviewer.trim()})).filter(item=>item.quote),
 };
}

export default function ProjectOnboarding({projectId,initialProject,initialAssets}:{projectId:string;initialProject:Draft&{currentStep:number};initialAssets:Asset[]}){
 const router=useRouter();
 const apiBase='/api/projects/'+projectId;
 const [draft,setDraft]=useState<Draft>(()=>{
  const services=initialProject.services.length?initialProject.services:[{id:'service-1',name:'',description:'',price:''}];
  return {...initialProject,services,socialLinks:initialProject.socialLinks.length?initialProject.socialLinks:[''],inspirationSites:initialProject.inspirationSites.length?initialProject.inspirationSites:['']};
 });
 const [step,setStep]=useState(Math.min(6,Math.max(1,initialProject.currentStep||1)));
 const [saveState,setSaveState]=useState<'idle'|'saving'|'saved'|'error'>('idle');
 const [error,setError]=useState('');
 const [submitting,setSubmitting]=useState(false);
 const [assetCount,setAssetCount]=useState(initialAssets.length);
 const first=useRef(true);
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null);

 const completion=step>=6?100:Math.min(100,step*20);

 async function saveNow(nextStep=step){
  setSaveState('saving');
  const payload={...cleanDraft(draft),currentStep:nextStep};
  try{
   const response=await fetch(apiBase,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
   const body=await response.json().catch(()=>({}));
   if(!response.ok)throw new Error(body?.error||'Could not save your project.');
   setSaveState('saved');
   return true;
  }catch{
   setSaveState('error');
   return false;
  }
 }

 useEffect(()=>{
  if(first.current){first.current=false;return}
  if(submitting)return;
  if(timer.current)clearTimeout(timer.current);
  setSaveState('idle');
  timer.current=setTimeout(()=>{void saveNow(step)},850);
  return()=>{if(timer.current)clearTimeout(timer.current)};
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[draft,step,submitting]);

 function patch<K extends keyof Draft>(key:K,value:Draft[K]){
  setDraft(current=>({...current,[key]:value}));
 }

 function validate(current:number){
  const missing:string[]=[];
  if(current===1){
   if(!draft.businessName.trim())missing.push('Business name');
   if(!draft.contactPerson.trim())missing.push('Owner/contact person');
   if(!draft.category.trim())missing.push('Business category');
   if(!draft.phone.trim()&&!draft.whatsapp.trim())missing.push('Phone or WhatsApp');
  }
  if(current===3){
   if(!draft.services.some(item=>item.name.trim()))missing.push('At least one main service/product');
   if(!draft.primaryCta.trim())missing.push('Primary visitor action');
  }
  if(missing.length){setError('Please complete: '+missing.join(', ')+'.');return false}
  setError('');
  return true;
 }

 async function move(next:number){
  if(next>step&&step<=5&&!validate(step))return;
  if(timer.current)clearTimeout(timer.current);
  const saved=await saveNow(next);
  if(!saved){setError('We could not autosave this step. Please try again.');return}
  setStep(next);
  window.scrollTo({top:0,behavior:'smooth'});
 }

 async function submit(){
  if(!validate(1)||!validate(3))return;
  setSubmitting(true);setError('');
  if(timer.current)clearTimeout(timer.current);
  const saved=await saveNow(6);
  if(!saved){setError('Your final changes could not be saved. Please try again.');setSubmitting(false);return}
  const response=await fetch(apiBase+'/submit',{method:'POST'});
  const body=await response.json().catch(()=>({}));
  if(!response.ok){
   setError(body?.missing?.length?'Please complete: '+body.missing.join(', ')+'.':body?.error||'Could not submit the project.');
   setSubmitting(false);return;
  }
  router.replace('/projects/'+projectId);
  router.refresh();
 }

 function updateService(index:number,field:keyof ServiceItem,value:string){
  patch('services',draft.services.map((item,i)=>i===index?{...item,[field]:value}:item));
 }
 function updateTestimonial(index:number,field:keyof Testimonial,value:string){
  patch('testimonials',draft.testimonials.map((item,i)=>i===index?{...item,[field]:value}:item));
 }

 const saveLabel=saveState==='saving'?'Saving…':saveState==='saved'?'Saved':saveState==='error'?'Save failed':'Autosave on';
 const businessTitle=draft.businessName.trim()||'New website project';
 const activeServices=useMemo(()=>draft.services.filter(item=>item.name.trim()),[draft.services]);

 return <main className={styles.page}><div className={styles.shell}>
  <header className={styles.topbar}>
   <div><span className={styles.eyebrow}>MANGLO · WEBSITE PROJECT · {projectId}</span><h1>{businessTitle}</h1><p>Complete what you know now. Optional details can be added later.</p></div>
   <div className={styles.saveBox}><b><Save size={12}/> {saveLabel}</b><span>You can save and continue later.</span></div>
  </header>

  <div className={styles.progressWrap}><div className={styles.progressMeta}><span>{step===6?'Review your project':'Step '+step+' of 5'}</span><span>{completion}%</span></div><div className={styles.progress}><i style={{width:completion+'%'}}/></div></div>

  <nav className={styles.steps} aria-label="Website onboarding steps">
   {stepNames.map((name,index)=>{
    const value=index+1;
    const state=value===step?styles.stepActive:value<step?styles.stepDone:styles.step;
    return <button type="button" className={state} key={name} disabled={value>step} onClick={()=>value<step&&void move(value)}><b>{value<step?<Check size={12}/>:String(value).padStart(2,'0')}</b><span>{name}</span></button>;
   })}
  </nav>

  {error?<div className={styles.error}>{error}</div>:null}

  <div className={styles.layout}>
   <section className={styles.card}>
    {step===1?<><div className={styles.head}><span>STEP 01 · BUSINESS</span><h2>Tell us who we are building for.</h2><p>These are the core business details that anchor the website content and contact actions.</p></div>
     <div className={styles.grid2}>
      <label className={styles.field}><span>Business name <i className={styles.required}>*</i></span><input value={draft.businessName} onChange={e=>patch('businessName',e.target.value)} maxLength={140} placeholder="New Paras Ladies Tailor"/></label>
      <label className={styles.field}><span>Owner / contact person <i className={styles.required}>*</i></span><input value={draft.contactPerson} onChange={e=>patch('contactPerson',e.target.value)} maxLength={120} placeholder="Contact person"/></label>
      <label className={styles.field}><span>Business category <i className={styles.required}>*</i></span><input value={draft.category} onChange={e=>patch('category',e.target.value)} maxLength={120} placeholder="Tailor, salon, cafe, clinic…"/></label>
      <label className={styles.field}><span>Business email</span><input type="email" value={draft.businessEmail} onChange={e=>patch('businessEmail',e.target.value)} maxLength={180} placeholder="hello@business.com"/></label>
      <label className={styles.field}><span>Main phone <i className={styles.required}>*</i></span><input value={draft.phone} onChange={e=>patch('phone',e.target.value)} maxLength={40} inputMode="tel" placeholder="+91 …"/></label>
      <label className={styles.field}><span>WhatsApp number</span><input value={draft.whatsapp} onChange={e=>patch('whatsapp',e.target.value)} maxLength={40} inputMode="tel" placeholder="If different from phone"/></label>
     </div>
     <label className={styles.field}><span>Short business description</span><textarea value={draft.description} onChange={e=>patch('description',e.target.value)} maxLength={1400} placeholder="What does the business do, and what makes it useful or different?"/></label>
     <div className={styles.grid2}>
      <label className={styles.field}><span>Existing website / domain</span><input value={draft.existingWebsite} onChange={e=>patch('existingWebsite',e.target.value)} maxLength={500} placeholder="https://…"/></label>
      <label className={styles.field}><span>Instagram</span><input value={draft.instagram} onChange={e=>patch('instagram',e.target.value)} maxLength={500} placeholder="https://instagram.com/…"/></label>
      <label className={styles.field}><span>Facebook</span><input value={draft.facebook} onChange={e=>patch('facebook',e.target.value)} maxLength={500} placeholder="https://facebook.com/…"/></label>
     </div>
     <div className={styles.repeatList}>{draft.socialLinks.map((value,index)=><div className={styles.repeatCard} key={'social-'+index}><button className={styles.remove} type="button" onClick={()=>patch('socialLinks',draft.socialLinks.filter((_,i)=>i!==index))}><Trash2 size={13}/></button><label className={styles.field}><span>Other social link</span><input value={value} onChange={e=>patch('socialLinks',draft.socialLinks.map((item,i)=>i===index?e.target.value:item))} placeholder="LinkedIn, YouTube, X, etc."/></label></div>)}</div>
     <button className={styles.addButton} type="button" onClick={()=>patch('socialLinks',[...draft.socialLinks,''])}><Plus size={13}/> Add another social link</button>
    </>:null}

    {step===2?<><div className={styles.head}><span>STEP 02 · LOCATION & HOURS</span><h2>Where and when can customers reach you?</h2><p>If the business is online-only or does not receive customers at a physical location, you can skip the address.</p></div>
     <label className={styles.checkRow}><input type="checkbox" checked={draft.noCustomerFacingLocation} onChange={e=>patch('noCustomerFacingLocation',e.target.checked)}/><span>My business does not have a customer-facing location</span></label>
     {!draft.noCustomerFacingLocation?<><label className={styles.field}><span>Complete address</span><textarea value={draft.address} onChange={e=>patch('address',e.target.value)} maxLength={1000} placeholder="Shop / building, road, area, landmark…"/></label><div className={styles.grid3}>
      <label className={styles.field}><span>City</span><input value={draft.city} onChange={e=>patch('city',e.target.value)} maxLength={120}/></label>
      <label className={styles.field}><span>State / region</span><input value={draft.region} onChange={e=>patch('region',e.target.value)} maxLength={120}/></label>
      <label className={styles.field}><span>Country</span><input value={draft.country} onChange={e=>patch('country',e.target.value)} maxLength={120}/></label>
     </div><label className={styles.field}><span>Google Maps link</span><input value={draft.mapsUrl} onChange={e=>patch('mapsUrl',e.target.value)} maxLength={500} placeholder="https://maps.google.com/…"/></label></>:null}
     <label className={styles.field}><span>Business opening days</span></label>
     <div className={styles.days}>{days.map(day=><button type="button" key={day} className={draft.openingDays.includes(day)?styles.dayActive:styles.day} onClick={()=>patch('openingDays',draft.openingDays.includes(day)?draft.openingDays.filter(item=>item!==day):[...draft.openingDays,day])}>{day}</button>)}</div>
     <div className={styles.grid2}><label className={styles.field}><span>Opening time</span><input type="time" value={draft.openingTime} onChange={e=>patch('openingTime',e.target.value)}/></label><label className={styles.field}><span>Closing time</span><input type="time" value={draft.closingTime} onChange={e=>patch('closingTime',e.target.value)}/></label></div>
    </>:null}

    {step===3?<><div className={styles.head}><span>STEP 03 · SERVICES & WEBSITE CONTENT</span><h2>What should the website help customers understand and do?</h2><p>Add services one by one so we can turn them into clear sections instead of a single wall of text.</p></div>
     <div className={styles.repeatList}>{draft.services.map((service,index)=><article className={styles.repeatCard} key={service.id}><button className={styles.remove} type="button" disabled={draft.services.length===1} onClick={()=>patch('services',draft.services.filter((_,i)=>i!==index))}><Trash2 size={13}/></button><div className={styles.grid2}>
      <label className={styles.field}><span>Service / product name {index===0?<i className={styles.required}>*</i>:null}</span><input value={service.name} onChange={e=>updateService(index,'name',e.target.value)} maxLength={120} placeholder="e.g. Bridal blouse stitching"/></label>
      <label className={styles.field}><span>Price — optional</span><input value={service.price} onChange={e=>updateService(index,'price',e.target.value)} maxLength={120} placeholder="₹500 / Starting at ₹…"/></label>
     </div><label className={styles.field}><span>Description</span><textarea value={service.description} onChange={e=>updateService(index,'description',e.target.value)} maxLength={1000} placeholder="What should a customer know about this service?"/></label></article>)}</div>
     <button className={styles.addButton} type="button" onClick={()=>patch('services',[...draft.services,{id:uid('service'),name:'',description:'',price:''}])}><Plus size={13}/> Add another service</button>
     <label className={styles.field}><span>Any pricing notes</span><textarea value={draft.pricingNotes} onChange={e=>patch('pricingNotes',e.target.value)} maxLength={2000} placeholder="Optional pricing details, packages or anything we should know."/></label>
     <label className={styles.field}><span>Main action visitors should take <i className={styles.required}>*</i></span></label>
     <div className={styles.ctas}>{WEBSITE_PROJECT_PRIMARY_CTAS.map(cta=><button key={cta} type="button" className={draft.primaryCta===cta?styles.ctaActive:styles.cta} onClick={()=>patch('primaryCta',cta)}>{cta}</button>)}</div>
     <label className={styles.field}><span>About your business</span><textarea value={draft.about} onChange={e=>patch('about',e.target.value)} maxLength={3000} placeholder="History, experience, values, who you serve, or what customers should know."/></label>
     <div className={styles.grid2}><label className={styles.field}><span>Definitely include</span><textarea value={draft.mustInclude} onChange={e=>patch('mustInclude',e.target.value)} maxLength={2500} placeholder="Offers, sections, information or features that must appear."/></label><label className={styles.field}><span>Definitely do not include</span><textarea value={draft.mustAvoid} onChange={e=>patch('mustAvoid',e.target.value)} maxLength={2500} placeholder="Anything you do not want shown or mentioned."/></label></div>
    </>:null}

    {step===4?<><div className={styles.head}><span>STEP 04 · BRAND & MEDIA</span><h2>Give us the material that makes the website yours.</h2><p>Upload the real logo, shop/business photos, product/work photos and any useful brochure or menu.</p></div>
     <ProjectAssetUploader projectId={projectId} initialAssets={initialAssets} onCountChange={setAssetCount}/>
     <label className={styles.field}><span>Preferred colours</span><input value={draft.preferredColors} onChange={e=>patch('preferredColors',e.target.value)} maxLength={300} placeholder="e.g. navy + cream, or ‘you decide’"/></label>
     <label className={styles.field}><span>Preferred website style</span></label>
     <div className={styles.styles}>{WEBSITE_PROJECT_STYLES.map(style=><button type="button" key={style} className={draft.preferredStyle===style?styles.styleActive:styles.style} onClick={()=>patch('preferredStyle',style)}>{style}</button>)}</div>
     <div className={styles.repeatList}>{draft.inspirationSites.map((value,index)=><div className={styles.repeatCard} key={'site-'+index}><button className={styles.remove} type="button" onClick={()=>patch('inspirationSites',draft.inspirationSites.filter((_,i)=>i!==index))}><Trash2 size={13}/></button><label className={styles.field}><span>Website you like — optional</span><input value={value} onChange={e=>patch('inspirationSites',draft.inspirationSites.map((item,i)=>i===index?e.target.value:item))} placeholder="https://…"/></label></div>)}</div>
     <button className={styles.addButton} type="button" onClick={()=>patch('inspirationSites',[...draft.inspirationSites,''])}><Plus size={13}/> Add another inspiration site</button>
    </>:null}

    {step===5?<><div className={styles.head}><span>STEP 05 · TRUST & FINAL DETAILS</span><h2>Add the proof and final context.</h2><p>These details help us build trust correctly and prepare for launch without guessing.</p></div>
     <div className={styles.repeatList}>{draft.testimonials.map((item,index)=><article className={styles.repeatCard} key={item.id}><button className={styles.remove} type="button" onClick={()=>patch('testimonials',draft.testimonials.filter((_,i)=>i!==index))}><Trash2 size={13}/></button><label className={styles.field}><span>Approved customer review</span><textarea value={item.quote} onChange={e=>updateTestimonial(index,'quote',e.target.value)} maxLength={1200} placeholder="A review/testimonial you have permission to display."/></label><label className={styles.field}><span>Reviewer name — optional</span><input value={item.reviewer} onChange={e=>updateTestimonial(index,'reviewer',e.target.value)} maxLength={120}/></label></article>)}</div>
     <button className={styles.addButton} type="button" onClick={()=>patch('testimonials',[...draft.testimonials,{id:uid('review'),quote:'',reviewer:''}])}><Plus size={13}/> Add customer review</button>
     <div className={styles.grid2}>
      <label className={styles.field}><span>Google Business Profile link</span><input value={draft.googleBusinessProfile} onChange={e=>patch('googleBusinessProfile',e.target.value)} maxLength={500} placeholder="https://…"/></label>
      <label className={styles.field}><span>Existing domain</span><input value={draft.existingDomain} onChange={e=>patch('existingDomain',e.target.value)} maxLength={240} placeholder="yourbusiness.com"/></label>
      <label className={styles.field}><span>Domain provider — if known</span><input value={draft.domainProvider} onChange={e=>patch('domainProvider',e.target.value)} maxLength={120} placeholder="Hostinger, GoDaddy, Namecheap…"/></label>
     </div>
     <label className={styles.field}><span>Additional instructions / anything else we should know</span><textarea value={draft.additionalInstructions} onChange={e=>patch('additionalInstructions',e.target.value)} maxLength={3000} placeholder="Anything that did not fit above."/></label>
    </>:null}

    {step===6?<><div className={styles.head}><span>REVIEW YOUR PROJECT</span><h2>Everything in one place before we begin.</h2><p>Review the important details below. You can go back to any step before submitting.</p></div>
     <div className={styles.review}>
      <section className={styles.reviewSection}><div className={styles.reviewHead}><b>Business</b><button type="button" onClick={()=>void move(1)}>Edit</button></div><div className={styles.reviewGrid}><div className={styles.reviewItem}><span>Business</span><b>{draft.businessName||'—'}</b></div><div className={styles.reviewItem}><span>Contact person</span><b>{draft.contactPerson||'—'}</b></div><div className={styles.reviewItem}><span>Category</span><b>{draft.category||'—'}</b></div><div className={styles.reviewItem}><span>Phone / WhatsApp</span><b>{draft.phone||draft.whatsapp||'—'}</b></div></div></section>
      <section className={styles.reviewSection}><div className={styles.reviewHead}><b>Location & hours</b><button type="button" onClick={()=>void move(2)}>Edit</button></div><div className={styles.reviewGrid}><div className={styles.reviewItem}><span>Location</span><p>{draft.noCustomerFacingLocation?'No customer-facing location':[draft.address,draft.city,draft.region,draft.country].filter(Boolean).join(', ')||'Not supplied'}</p></div><div className={styles.reviewItem}><span>Opening days</span><b>{draft.openingDays.join(', ')||'Not supplied'}</b></div></div></section>
      <section className={styles.reviewSection}><div className={styles.reviewHead}><b>Services & website goal</b><button type="button" onClick={()=>void move(3)}>Edit</button></div><div className={styles.pillList}>{activeServices.length?activeServices.map(item=><span key={item.id}>{item.name}</span>):<span>No services added</span>}</div><div className={styles.reviewItem} style={{marginTop:10}}><span>Primary action</span><b>{draft.primaryCta||'—'}</b></div></section>
      <section className={styles.reviewSection}><div className={styles.reviewHead}><b>Brand & media</b><button type="button" onClick={()=>void move(4)}>Edit</button></div><div className={styles.reviewGrid}><div className={styles.reviewItem}><span>Style</span><b>{draft.preferredStyle||'You decide for me'}</b></div><div className={styles.reviewItem}><span>Secure files uploaded</span><b>{assetCount}</b></div></div></section>
      <section className={styles.reviewSection}><div className={styles.reviewHead}><b>Trust & final details</b><button type="button" onClick={()=>void move(5)}>Edit</button></div><div className={styles.reviewGrid}><div className={styles.reviewItem}><span>Approved reviews</span><b>{draft.testimonials.filter(item=>item.quote.trim()).length}</b></div><div className={styles.reviewItem}><span>Domain</span><b>{draft.existingDomain||'Not supplied'}</b></div></div>{draft.additionalInstructions?<div className={styles.reviewItem} style={{marginTop:10}}><span>Additional instructions</span><p>{draft.additionalInstructions}</p></div>:null}</section>
     </div>
     <div className={styles.notice}><CheckCircle2 size={16}/><div><b>Ready when you are.</b><div>After submission, this becomes a tracked MANGLO Website Project. You can still send files and follow progress from the project portal.</div></div></div>
    </>:null}

    <div className={styles.actions}>
     <div className={styles.actionsLeft}>{step>1?<button type="button" className={styles.button} onClick={()=>void move(step-1)} disabled={saveState==='saving'||submitting}><ArrowLeft size={14}/> Back</button>:<Link className={styles.button} href="/projects">Exit for now</Link>}</div>
     <div className={styles.actionsRight}>{step<6?<button type="button" className={styles.primary} onClick={()=>void move(step+1)} disabled={saveState==='saving'}>{step===5?'Review project':'Save & continue'} <ArrowRight size={14}/></button>:<button type="button" className={styles.submit} onClick={()=>void submit()} disabled={submitting||saveState==='saving'}>{submitting?<><Clock3 size={14}/> Submitting…</>:<>Submit project <Send size={14}/></>}</button>}</div>
    </div>
   </section>

   <aside className={styles.side}>
    <div className={styles.sideCard}><span>AUTOSAVE</span><b>Your work stays here.</b><p>You do not need to finish everything in one sitting. Return through My Projects anytime.</p></div>
    <div className={styles.sideCard}><span>PRIVACY</span><b>Private project files.</b><p>Uploaded assets use private storage. Other MANGLO customers cannot browse or access your project files.</p></div>
    <div className={styles.sideCard}><span>NEED HELP?</span><b>Not sure what to enter?</b><p>Complete the required details and leave anything uncertain blank. We can clarify it during project review.</p><Link href="/contact"><ShieldCheck size={12}/> Contact MANGLO</Link></div>
   </aside>
  </div>
 </div></main>;
}

