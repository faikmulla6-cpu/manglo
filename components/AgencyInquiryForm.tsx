'use client';

import {FormEvent,useMemo,useState} from 'react';
import {ArrowRight,CheckCircle2,Loader2,ShieldCheck,Sparkles} from 'lucide-react';
import styles from '@/app/AgencyHome.module.css';

type State=
 |{kind:'idle'}
 |{kind:'loading'}
 |{kind:'success';reference:string}
 |{kind:'error';message:string};

const serviceLabels:Record<string,string>={
 'full-stack':'Complete website — frontend + backend',
 'frontend':'Frontend only',
 'landing-page':'Landing page',
 'redesign':'Website redesign',
 'product-improvement':'Improve an existing product',
 'not-sure':'Help me choose',
};

export default function AgencyInquiryForm(){
 const [state,setState]=useState<State>({kind:'idle'});
 const [service,setService]=useState('full-stack');

 const fit=useMemo(()=>{
  if(service==='frontend')return{title:'Frontend delivery',copy:'Best when your backend, API or product logic already exists and the main need is a polished interface.'};
  if(service==='landing-page')return{title:'Conversion-focused page',copy:'Best for a focused offer, launch, campaign or business page where clarity and response matter most.'};
  if(service==='redesign')return{title:'Redesign + rebuild',copy:'Best when the current website exists but the experience, performance or implementation needs a serious upgrade.'};
  if(service==='product-improvement')return{title:'Product improvement sprint',copy:'Best for an existing product that needs stronger UX, new flows, integrations or technical cleanup.'};
  if(service==='not-sure')return{title:'Scope discovery',copy:'Share the outcome you want. We can work out whether you need full-stack, frontend-only or a smaller focused build.'};
  return{title:'Full-stack product build',copy:'Best when you want one team to own the interface, backend, database, integrations and launch preparation.'};
 },[service]);

 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();
  if(state.kind==='loading')return;
  setState({kind:'loading'});
  const form=event.currentTarget;
  const data=new FormData(form);
  const payload={
   name:String(data.get('name')||''),
   email:String(data.get('email')||''),
   phone:String(data.get('phone')||''),
   company:String(data.get('company')||''),
   website:String(data.get('website')||''),
   service:String(data.get('service')||''),
   budget:String(data.get('budget')||''),
   timeline:String(data.get('timeline')||''),
   projectType:String(data.get('projectType')||''),
   message:String(data.get('message')||''),
   middleName:String(data.get('middleName')||''),
  };
  try{
   const response=await fetch('/api/agency/inquiries',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(payload),
   });
   const body=await response.json().catch(()=>({}));
   if(!response.ok)throw new Error(body?.error||'We could not submit your brief.');
   setState({kind:'success',reference:body.reference||'RECEIVED'});
   form.reset();
   setService('full-stack');
  }catch(error){
   setState({kind:'error',message:error instanceof Error?error.message:'We could not submit your brief.'});
  }
 }

 return <form className={styles.briefForm} onSubmit={submit}>
  <div className={styles.formHead}>
   <div><span>PROJECT BRIEF</span><h3>Start with the useful details.</h3></div>
   <ShieldCheck size={24}/>
  </div>

  <div className={styles.fitCard}>
   <span><Sparkles size={14}/> CURRENT FIT</span>
   <b>{fit.title}</b>
   <p>{fit.copy}</p>
  </div>

  {state.kind==='success'?<div className={[styles.formAlert,styles.formSuccess].join(' ')}><CheckCircle2/><div><b>Brief received.</b><span>Reference {state.reference}. Keep it for follow-up.</span></div></div>:null}
  {state.kind==='error'?<div className={[styles.formAlert,styles.formError].join(' ')}><div><b>Submission failed.</b><span>{state.message}</span></div></div>:null}

  <div className={styles.formSplit}>
   <label><span>Your name *</span><input name="name" autoComplete="name" required maxLength={80} placeholder="Your name"/></label>
   <label><span>Work email *</span><input name="email" type="email" autoComplete="email" required maxLength={160} placeholder="you@company.com"/></label>
  </div>

  <div className={styles.formSplit}>
   <label><span>Phone / WhatsApp</span><input name="phone" autoComplete="tel" maxLength={30} placeholder="+91 …"/></label>
   <label><span>Company / brand</span><input name="company" autoComplete="organization" maxLength={120} placeholder="Optional"/></label>
  </div>

  <label><span>What do you need? *</span>
   <select name="service" required value={service} onChange={event=>setService(event.target.value)}>
    {Object.entries(serviceLabels).map(([value,label])=><option value={value} key={value}>{label}</option>)}
   </select>
  </label>
  <div className={styles.formSplit}>
   <label><span>Project type</span>
    <select name="projectType" defaultValue="">
     <option value="">Select if useful</option>
     <option value="business-site">Business website</option>
     <option value="saas-mvp">SaaS / MVP</option>
     <option value="ecommerce">E-commerce experience</option>
     <option value="dashboard">Dashboard / internal tool</option>
     <option value="creator-brand">Creator / personal brand</option>
     <option value="other">Other</option>
    </select>
   </label>
   <label><span>Current website</span><input name="website" inputMode="url" maxLength={240} placeholder="https://… (optional)"/></label>
  </div>

  <div className={styles.formSplit}>
   <label><span>Budget range</span>
    <select name="budget" defaultValue="">
     <option value="">Let’s discuss scope first</option>
     <option value="under-25k">Under ₹25,000</option>
     <option value="25k-75k">₹25,000 – ₹75,000</option>
     <option value="75k-2l">₹75,000 – ₹2,00,000</option>
     <option value="2l-plus">₹2,00,000+</option>
    </select>
   </label>
   <label><span>Target timeline</span>
    <select name="timeline" defaultValue="">
     <option value="">Flexible</option>
     <option value="asap">As soon as practical</option>
     <option value="2-4-weeks">2–4 weeks</option>
     <option value="1-2-months">1–2 months</option>
     <option value="2m-plus">2+ months</option>
    </select>
   </label>
  </div>

  <label><span>What should this project achieve? *</span><textarea name="message" required minLength={20} maxLength={3000} rows={6} placeholder="Tell us what you are building, who it is for, what already exists, and what a successful result looks like."/></label>

  <label className={styles.honeypot} aria-hidden="true"><span>Middle name</span><input name="middleName" tabIndex={-1} autoComplete="off"/></label>

  <button className={styles.submitButton} type="submit" disabled={state.kind==='loading'}>
   {state.kind==='loading'?<><Loader2 className={styles.spinner} size={17}/> Sending brief</>:<>Send project brief <ArrowRight size={17}/></>}
  </button>
  <small className={styles.formNote}>Do not include passwords, API keys, production credentials, card details or other secrets.</small>
 </form>;
}
