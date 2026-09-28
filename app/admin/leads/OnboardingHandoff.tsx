'use client';

import {useState} from 'react';
import {Check,Copy,ExternalLink} from 'lucide-react';
import styles from './AgencyLeads.module.css';

const onboardingPath='/onboarding';

function buildMessage(origin:string){
 return `Perfect 👍

We can now move forward with your final website.

To keep everything organised, we use MANGLO for our website projects.

Please create your account using the link below and start the short website onboarding form:

${origin}${onboardingPath}

There you'll be able to add your business details, services, contact information, social links, logo, photos and anything else you'd like us to use on your website.

You don't have to complete everything at once — your progress will be saved and you can continue anytime.

Once you submit the details, we'll have everything organised in one place and can begin building your final website specifically around your business. 🚀`;
}

export default function OnboardingHandoff(){
 const [copied,setCopied]=useState(false);

 async function copy(){
  const origin=window.location.origin;
  await navigator.clipboard.writeText(buildMessage(origin));
  setCopied(true);
  window.setTimeout(()=>setCopied(false),1800);
 }

 return <div className={styles.handoff}>
  <button type="button" onClick={()=>void copy()}>{copied?<Check size={13}/>:<Copy size={13}/>} {copied?'Copied':'Copy onboarding handoff'}</button>
  <a href={onboardingPath} target="_blank" rel="noreferrer">Open onboarding <ExternalLink size={12}/></a>
 </div>;
}
