'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

type Scalar=string|number|boolean|null;
type Payload={event:string;metadata?:Record<string,Scalar>};
const FIRST_TOUCH='manglo_first_touch';
const ANON='manglo_analytics_id';
const SESSION='manglo_session_id';

function uuid(){try{return crypto.randomUUID()}catch{return `mg-${Date.now()}-${Math.random().toString(36).slice(2,12)}`}}
function storageId(storage:Storage,key:string){let id=storage.getItem(key);if(!id){id=uuid();storage.setItem(key,id)}return id}
function referrerHost(){try{return document.referrer?new URL(document.referrer).hostname.slice(0,180):''}catch{return''}}
function currentTouch(){
 const params=new URLSearchParams(location.search);
 return {source:params.get('utm_source')||'',medium:params.get('utm_medium')||'',campaign:params.get('utm_campaign')||'',content:params.get('utm_content')||'',term:params.get('utm_term')||'',referrerHost:referrerHost()};
}
function firstTouch(){
 try{
  const existing=localStorage.getItem(FIRST_TOUCH);if(existing)return JSON.parse(existing);
  const value=currentTouch();localStorage.setItem(FIRST_TOUCH,JSON.stringify(value));return value;
 }catch{return currentTouch()}
}

export function trackAnalytics(event:string,metadata?:Record<string,Scalar>){
 if(typeof window==='undefined')return;
 try{
  const anonymousId=storageId(localStorage,ANON);const sessionId=storageId(sessionStorage,SESSION);const touch=firstTouch();
  fetch('/api/analytics',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',keepalive:true,body:JSON.stringify({event,anonymousId,sessionId,path:location.pathname,...touch,metadata})}).catch(()=>{});
 }catch{}
}

export default function AnalyticsProvider(){
 const pathname=usePathname();
 useEffect(()=>{trackAnalytics('PAGE_VIEW')},[pathname]);
 return null;
}
