'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

type Scalar=string|number|boolean|null;
const FIRST_TOUCH='manglo_first_touch';
const ANON='manglo_analytics_id';
const SESSION='manglo_session_id';
let searchTimer:ReturnType<typeof setTimeout>|null=null;

function uuid(){try{return crypto.randomUUID()}catch{return `mg-${Date.now()}-${Math.random().toString(36).slice(2,12)}`}}
function storageId(storage:Storage,key:string){let id=storage.getItem(key);if(!id){id=uuid();storage.setItem(key,id)}return id}
function referrerHost(){try{return document.referrer?new URL(document.referrer).hostname.slice(0,180):''}catch{return''}}
function currentTouch(){const params=new URLSearchParams(location.search);return{source:params.get('utm_source')||'',medium:params.get('utm_medium')||'',campaign:params.get('utm_campaign')||'',content:params.get('utm_content')||'',term:params.get('utm_term')||'',referrerHost:referrerHost()}}
function firstTouch(){try{const existing=localStorage.getItem(FIRST_TOUCH);if(existing)return JSON.parse(existing);const value=currentTouch();localStorage.setItem(FIRST_TOUCH,JSON.stringify(value));return value}catch{return currentTouch()}}
function safeSearchTerm(value:string){const clean=value.trim().replace(/\s+/g,' ').slice(0,80);if(!clean)return'';if(/https?:\/\/|www\.|@|\//i.test(clean))return'[redacted]';return clean}

export function trackAnalytics(event:string,metadata?:Record<string,Scalar>){
 if(typeof window==='undefined'||location.pathname.startsWith('/admin'))return;
 try{
  const anonymousId=storageId(localStorage,ANON);const sessionId=storageId(sessionStorage,SESSION);const touch=firstTouch();
  fetch('/api/analytics',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'same-origin',keepalive:true,body:JSON.stringify({event,anonymousId,sessionId,path:location.pathname,...touch,metadata})}).catch(()=>{});
 }catch{}
}

export default function AnalyticsProvider(){
 const pathname=usePathname();
 useEffect(()=>{
  if(pathname.startsWith('/admin'))return;
  trackAnalytics('PAGE_VIEW');
  const detail=pathname.match(/^\/services\/([^/]+)$/);if(detail)trackAnalytics('SERVICE_VIEW',{serviceId:decodeURIComponent(detail[1])});
  if(pathname==='/order')trackAnalytics('ORDER_REVIEW');
  if(pathname==='/auth')trackAnalytics('AUTH_STARTED');
 },[pathname]);

 useEffect(()=>{
  function click(event:MouseEvent){
   if(location.pathname.startsWith('/admin'))return;
   const target=event.target as HTMLElement|null;const anchor=target?.closest?.('a[href]') as HTMLAnchorElement|null;if(!anchor)return;
   let url:URL;try{url=new URL(anchor.href,location.origin)}catch{return}if(url.origin!==location.origin)return;
   if(url.pathname.startsWith('/dashboard')&&url.searchParams.get('view')==='ai')trackAnalytics('AI_OPENED');
   if(url.pathname.startsWith('/dashboard')&&url.searchParams.get('view')==='support')trackAnalytics('SUPPORT_OPENED');
   if(url.pathname==='/order')trackAnalytics('ORDER_REVIEW',{serviceId:url.searchParams.get('service')||null});
  }
  function input(event:Event){
   if(location.pathname.startsWith('/admin'))return;
   const el=event.target as HTMLInputElement|null;if(!el||el.getAttribute('aria-label')!=='Search services')return;
   if(searchTimer)clearTimeout(searchTimer);searchTimer=setTimeout(()=>{const term=safeSearchTerm(el.value);if(term.length>=2)trackAnalytics('SERVICE_SEARCH',{term})},700);
  }
  document.addEventListener('click',click);document.addEventListener('input',input);
  return()=>{document.removeEventListener('click',click);document.removeEventListener('input',input);if(searchTimer)clearTimeout(searchTimer)};
 },[]);
 return null;
}
