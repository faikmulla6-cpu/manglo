'use client';

import {FormEvent, useState} from 'react';
import {ArrowRight, CheckCircle2, Loader2, ShieldCheck} from 'lucide-react';

type State =
  | {kind:'idle'}
  | {kind:'loading'}
  | {kind:'success'; reference:string}
  | {kind:'error'; message:string};

export default function AgencyInquiryForm(){
  const [state,setState]=useState<State>({kind:'idle'});

  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(state.kind==='loading') return;
    setState({kind:'loading'});

    const form=event.currentTarget;
    const data=new FormData(form);
    const payload={
      name:String(data.get('name')||''),
      email:String(data.get('email')||''),
      phone:String(data.get('phone')||''),
      company:String(data.get('company')||''),
      currentWebsite:String(data.get('currentWebsite')||''),
      service:String(data.get('service')||''),
      budget:String(data.get('budget')||''),
      timeline:String(data.get('timeline')||''),
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
      if(!response.ok) throw new Error(body?.error||'We could not submit your brief.');
      setState({kind:'success',reference:body.reference||'RECEIVED'});
      form.reset();
    }catch(error){
      setState({kind:'error',message:error instanceof Error?error.message:'We could not submit your brief.'});
    }
  }

  return <form className="agency-form" onSubmit={submit}>
    <div className="agency-form-head">
      <div><span>PROJECT BRIEF</span><h3>Start the conversation</h3></div>
      <ShieldCheck size={24}/>
    </div>

    {state.kind==='success' && <div className="agency-form-alert success"><CheckCircle2/><div><b>Brief received.</b><span>Reference: {state.reference}. We’ll review the details you shared and reply using your contact information.</span></div></div>}
    {state.kind==='error' && <div className="agency-form-alert error"><div><b>Submission failed.</b><span>{state.message}</span></div></div>}

    <div className="agency-form-split">
      <label><span>Your name *</span><input name="name" autoComplete="name" required maxLength={80} placeholder="Your name"/></label>
      <label><span>Email *</span><input name="email" type="email" autoComplete="email" required maxLength={160} placeholder="you@company.com"/></label>
    </div>

    <div className="agency-form-split">
      <label><span>Phone / WhatsApp</span><input name="phone" autoComplete="tel" maxLength={30} placeholder="+91 …"/></label>
      <label><span>Company / brand</span><input name="company" autoComplete="organization" maxLength={120} placeholder="Optional"/></label>
    </div>

    <label><span>What do you need? *</span>
      <select name="service" required defaultValue="">
        <option value="" disabled>Select a service</option>
        <option value="full-stack">Complete website — frontend + backend</option>
        <option value="frontend">Frontend only</option>
        <option value="landing-redesign">Landing page / redesign</option>
        <option value="existing-product">Improve an existing product</option>
        <option value="not-sure">Not sure yet</option>
      </select>
    </label>
    <div className="agency-form-split">
      <label><span>Budget range</span>
        <select name="budget" defaultValue="">
          <option value="">Let’s discuss</option>
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

    <label><span>Current website</span><input name="currentWebsite" inputMode="url" maxLength={240} placeholder="https://… (optional)"/></label>
    <label><span>Tell us about the project *</span><textarea name="message" required minLength={20} maxLength={3000} rows={6} placeholder="What are you building, who is it for, and what should the website help your business achieve?"/></label>

    <label className="agency-honeypot" aria-hidden="true"><span>Middle name</span><input name="middleName" tabIndex={-1} autoComplete="off"/></label>

    <button className="btn btn-primary btn-lg agency-submit" type="submit" disabled={state.kind==='loading'}>
      {state.kind==='loading'?<><Loader2 className="agency-spinner" size={18}/> Sending brief</>:<>Send project brief <ArrowRight size={18}/></>}
    </button>
    <small className="agency-form-note">Please don’t include passwords, API keys, payment credentials or other secrets in your brief.</small>
  </form>;
}
