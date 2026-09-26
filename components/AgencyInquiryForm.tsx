'use client';

import {FormEvent,useMemo,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,Check,CheckCircle2,Loader2,ShieldCheck,Sparkles} from 'lucide-react';
import styles from '@/app/AgencyEditorial.module.css';

type State=
 |{kind:'idle'}
 |{kind:'loading'}
 |{kind:'success';reference:string}
 |{kind:'error';message:string};

const serviceLabels:Record<string,string>={
 'full-stack':'Complete product',
 'frontend':'Frontend only',
 'landing-page':'Landing experience',
 'redesign':'Website redesign',
 'product-improvement':'Product improvement',
 'not-sure':'Help me choose',
};

const steps=[
 ['01','Scope'],
 ['02','Context'],
 ['03','Contact'],
] as const;

export default function AgencyInquiryForm(){
 const [state,setState]=useState<State>({kind:'idle'});
 const [service,setService]=useState('full-stack');
 const [step,setStep]=useState(1);
 const formRef=useRef<HTMLFormElement>(null);

 const fit=useMemo(()=>{
  if(service==='frontend')return{title:'Frontend delivery',copy:'Best when your API or product logic already exists and the main need is a polished interface.'};
  if(service==='landing-page')return{title:'Focused launch experience',copy:'Best for an offer, launch or campaign where clarity and response matter most.'};
  if(service==='redesign')return{title:'Redesign + rebuild',copy:'Best when the current website exists but the experience or implementation needs a serious upgrade.'};
  if(service==='product-improvement')return{title:'Product improvement',copy:'Best for an existing product that needs stronger UX, new flows or technical cleanup.'};
  if(service==='not-sure')return{title:'Scope discovery',copy:'Share the outcome. We can work out the right engagement together.'};
  return{title:'Full product build',copy:'Best when you want one team to own interface, backend, data, integrations and launch preparation.'};
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
   setStep(1);
  }catch(error){
   setState({kind:'error',message:error instanceof Error?error.message:'We could not submit your brief.'});
  }
 }

 function go(stepNumber:number){
  setState(current=>current.kind==='error'?{kind:'idle'}:current);
  setStep(stepNumber);
  requestAnimationFrame(()=>formRef.current?.scrollIntoView({behavior:'smooth',block:'center'}));
 }

 return <form ref={formRef} className={styles.briefForm} onSubmit={submit}>
  <div className={styles.formHead}>
   <div><span>PROJECT BRIEF</span><h3>Start with what matters.</h3></div>
   <ShieldCheck size={23}/>
  </div>

  <div className={styles.formSteps} aria-label="Project brief progress">
   {steps.map(([number,label],index)=>{
    const value=index+1;
    return <button key={number} type="button" className={value===step?styles.formStepActive:styles.formStep} onClick={()=>value<step&&go(value)} disabled={value>step}>
     <b>{number}</b><span>{label}</span>
    </button>;
   })}
  </div>

  {state.kind==='success'?<div className={[styles.formAlert,styles.formSuccess].join(' ')}><CheckCircle2/><div><b>Brief received.</b><span>Reference {state.reference}. Keep it for follow-up.</span></div></div>:null}
  {state.kind==='error'?<div className={[styles.formAlert,styles.formError].join(' ')}><div><b>Submission failed.</b><span>{state.message}</span></div></div>:null}

  <input type="hidden" name="service" value={service}/>

  <section className={step===1?styles.formPanel:styles.formPanelHidden} aria-hidden={step!==1}>
   <div className={styles.panelIntro}><span>01 · SCOPE</span><h4>What are we helping you build?</h4><p>Choose the closest fit. This does not lock the project into a package.</p></div>
   <div className={styles.serviceChoices}>
    {Object.entries(serviceLabels).map(([value,label])=><button key={value} type="button" className={service===value?styles.serviceChoiceActive:styles.serviceChoice} onClick={()=>setService(value)}>
     <span>{service===value?<Check size={14}/>:null}</span><b>{label}</b>
    </button>)}
   </div>
   <div className={styles.fitCard}><span><Sparkles size={13}/> CURRENT FIT</span><b>{fit.title}</b><p>{fit.copy}</p></div>
   <div className={styles.formActions}><span/><button type="button" className={styles.nextButton} onClick={()=>go(2)}>Continue <ArrowRight size={15}/></button></div>
  </section>

  <section className={step===2?styles.formPanel:styles.formPanelHidden} aria-hidden={step!==2}>
   <div className={styles.panelIntro}><span>02 · CONTEXT</span><h4>What already exists?</h4><p>A little context helps us avoid asking you questions you already answered.</p></div>
   <div className={styles.formSplit}>
    <label><span>Project type</span><select name="projectType" defaultValue=""><option value="">Select if useful</option><option value="business-site">Business website</option><option value="saas-mvp">SaaS / MVP</option><option value="ecommerce">E-commerce experience</option><option value="dashboard">Dashboard / internal tool</option><option value="creator-brand">Creator / personal brand</option><option value="other">Other</option></select></label>
    <label><span>Current website</span><input name="website" inputMode="url" maxLength={240} placeholder="https://… (optional)"/></label>
   </div>
   <div className={styles.formSplit}>
    <label><span>Budget range</span><select name="budget" defaultValue=""><option value="">Discuss scope first</option><option value="under-25k">Under ₹25,000</option><option value="25k-75k">₹25,000 – ₹75,000</option><option value="75k-2l">₹75,000 – ₹2,00,000</option><option value="2l-plus">₹2,00,000+</option></select></label>
    <label><span>Target timeline</span><select name="timeline" defaultValue=""><option value="">Flexible</option><option value="asap">As soon as practical</option><option value="2-4-weeks">2–4 weeks</option><option value="1-2-months">1–2 months</option><option value="2m-plus">2+ months</option></select></label>
   </div>
   <div className={styles.formActions}><button type="button" className={styles.backButton} onClick={()=>go(1)}><ArrowLeft size={14}/> Back</button><button type="button" className={styles.nextButton} onClick={()=>go(3)}>Continue <ArrowRight size={15}/></button></div>
  </section>

  <section className={step===3?styles.formPanel:styles.formPanelHidden} aria-hidden={step!==3}>
   <div className={styles.panelIntro}><span>03 · CONTACT</span><h4>What should success look like?</h4><p>Give us enough to understand the outcome. No technical specification required.</p></div>
   <div className={styles.formSplit}>
    <label><span>Your name *</span><input name="name" autoComplete="name" required maxLength={80} placeholder="Your name"/></label>
    <label><span>Work email *</span><input name="email" type="email" autoComplete="email" required maxLength={160} placeholder="you@company.com"/></label>
   </div>
   <div className={styles.formSplit}>
    <label><span>Phone / WhatsApp</span><input name="phone" autoComplete="tel" maxLength={30} placeholder="+91 …"/></label>
    <label><span>Company / brand</span><input name="company" autoComplete="organization" maxLength={120} placeholder="Optional"/></label>
   </div>
   <label><span>What should this project achieve? *</span><textarea name="message" required minLength={20} maxLength={3000} rows={6} placeholder="What are you building, who is it for, what already exists, and what should be different when we are done?"/></label>
   <label className={styles.honeypot} aria-hidden="true"><span>Middle name</span><input name="middleName" tabIndex={-1} autoComplete="off"/></label>
   <div className={styles.formActions}><button type="button" className={styles.backButton} onClick={()=>go(2)}><ArrowLeft size={14}/> Back</button><button className={styles.submitButton} type="submit" disabled={state.kind==='loading'}>{state.kind==='loading'?<><Loader2 className={styles.spinner} size={16}/> Sending</>:<>Send project brief <ArrowRight size={16}/></>}</button></div>
   <small className={styles.formNote}>Never include passwords, API keys, production credentials or card details.</small>
  </section>
 </form>;
}
