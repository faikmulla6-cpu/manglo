'use client';

import {useEffect} from 'react';

export default function AboutMotion(){
 useEffect(()=>{
  const items=[...document.querySelectorAll<HTMLElement>('[data-about-reveal]')];
  if(!('IntersectionObserver' in window)){
   items.forEach(item=>item.dataset.aboutVisible='true');
   return;
  }
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
    if(entry.isIntersecting){
     (entry.target as HTMLElement).dataset.aboutVisible='true';
     observer.unobserve(entry.target);
    }
   }
  },{threshold:.13,rootMargin:'0px 0px -5% 0px'});
  items.forEach(item=>observer.observe(item));
  return()=>observer.disconnect();
 },[]);
 return null;
}
