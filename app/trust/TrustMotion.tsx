'use client';

import {useEffect} from 'react';

export default function TrustMotion(){
  useEffect(()=>{
    const items=[...document.querySelectorAll<HTMLElement>('[data-trust-reveal]')];
    if(!('IntersectionObserver' in window)){
      items.forEach(item=>item.dataset.trustVisible='true');
      return;
    }
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries){
        if(entry.isIntersecting){
          (entry.target as HTMLElement).dataset.trustVisible='true';
          observer.unobserve(entry.target);
        }
      }
    },{threshold:.12,rootMargin:'0px 0px -5% 0px'});
    items.forEach(item=>observer.observe(item));
    return()=>observer.disconnect();
  },[]);
  return null;
}
