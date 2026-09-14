'use client';

import {useEffect} from 'react';

export default function RefundMotion(){
 useEffect(()=>{
  const items=[...document.querySelectorAll<HTMLElement>('[data-refund-reveal]')];
  if(!('IntersectionObserver' in window)){
   items.forEach(item=>item.dataset.refundVisible='true');
   return;
  }
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
    if(entry.isIntersecting){
     (entry.target as HTMLElement).dataset.refundVisible='true';
     observer.unobserve(entry.target);
    }
   }
  },{threshold:.12,rootMargin:'0px 0px -5% 0px'});
  items.forEach(item=>observer.observe(item));
  return()=>observer.disconnect();
 },[]);
 return null;
}
