'use client';

import {useEffect} from 'react';

export default function TermsMotion(){
 useEffect(()=>{
  const items=[...document.querySelectorAll<HTMLElement>('[data-terms-reveal]')];
  if(!('IntersectionObserver' in window)){
   items.forEach(item=>item.dataset.termsVisible='true');
   return;
  }
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
    if(entry.isIntersecting){
     (entry.target as HTMLElement).dataset.termsVisible='true';
     observer.unobserve(entry.target);
    }
   }
  },{threshold:.12,rootMargin:'0px 0px -5% 0px'});
  items.forEach(item=>observer.observe(item));
  return()=>observer.disconnect();
 },[]);
 return null;
}
