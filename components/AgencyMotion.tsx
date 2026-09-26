'use client';

import {useEffect,useRef} from 'react';
import styles from '@/app/AgencyEditorial.module.css';

export default function AgencyMotion(){
 const progressRef=useRef<HTMLDivElement>(null);
 const glowRef=useRef<HTMLDivElement>(null);

 useEffect(()=>{
  const root=document.documentElement;
  const scope=document.querySelector<HTMLElement>('[data-agency-home]');
  if(!scope)return;

  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer=window.matchMedia('(pointer:fine)').matches;
  root.dataset.agencyMotion='ready';

  const revealNodes=[...scope.querySelectorAll<HTMLElement>('[data-reveal]')];
  if(reduce){
   revealNodes.forEach(node=>node.dataset.visible='true');
  }

  const observer=reduce?null:new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
    if(entry.isIntersecting){
     const node=entry.target as HTMLElement;
     node.dataset.visible='true';
     observer?.unobserve(node);
    }
   });
  },{rootMargin:'0px 0px -8% 0px',threshold:.12});

  revealNodes.forEach((node,index)=>{
   node.style.setProperty('--reveal-delay',`${Math.min((index%4)*45,135)}ms`);
   observer?.observe(node);
  });

  let scrollFrame=0;
  function updateProgress(){
   const max=Math.max(document.documentElement.scrollHeight-window.innerHeight,1);
   const value=Math.min(Math.max(window.scrollY/max,0),1);
   progressRef.current?.style.setProperty('--scroll-progress',String(value));
   scrollFrame=0;
  }
  function onScroll(){
   if(scrollFrame)return;
   scrollFrame=requestAnimationFrame(updateProgress);
  }
  updateProgress();
  window.addEventListener('scroll',onScroll,{passive:true});

  const hero=scope.querySelector<HTMLElement>('[data-hero-interactive]');
  const tilt=scope.querySelector<HTMLElement>('[data-tilt]');
  let pointerFrame=0;

  function onPointerMove(event:PointerEvent){
   if(reduce||!finePointer||!hero)return;
   cancelAnimationFrame(pointerFrame);
   pointerFrame=requestAnimationFrame(()=>{
    const glow=glowRef.current;
    if(glow){
     glow.style.transform=`translate3d(${event.clientX-180}px,${event.clientY-180}px,0)`;
     glow.style.opacity='1';
    }

    if(tilt){
     const rect=tilt.getBoundingClientRect();
     const px=(event.clientX-rect.left)/rect.width-.5;
     const py=(event.clientY-rect.top)/rect.height-.5;
     tilt.style.setProperty('--tilt-x',`${(-py*3.2).toFixed(2)}deg`);
     tilt.style.setProperty('--tilt-y',`${(px*4.5).toFixed(2)}deg`);
     tilt.style.setProperty('--tilt-lift','-4px');
    }
   });
  }

  function resetTilt(){
   if(glowRef.current)glowRef.current.style.opacity='0';
   if(tilt){
    tilt.style.setProperty('--tilt-x','0deg');
    tilt.style.setProperty('--tilt-y','0deg');
    tilt.style.setProperty('--tilt-lift','0px');
   }
  }

  const magneticNodes=[...scope.querySelectorAll<HTMLElement>('[data-magnetic]')];
  const magneticCleanup=magneticNodes.map(node=>{
   function move(event:PointerEvent){
    if(reduce||!finePointer)return;
    const rect=node.getBoundingClientRect();
    const dx=(event.clientX-(rect.left+rect.width/2))*.12;
    const dy=(event.clientY-(rect.top+rect.height/2))*.12;
    node.style.setProperty('--mag-x',`${dx.toFixed(2)}px`);
    node.style.setProperty('--mag-y',`${dy.toFixed(2)}px`);
   }
   function leave(){
    node.style.setProperty('--mag-x','0px');
    node.style.setProperty('--mag-y','0px');
   }
   node.addEventListener('pointermove',move);
   node.addEventListener('pointerleave',leave);
   return()=>{node.removeEventListener('pointermove',move);node.removeEventListener('pointerleave',leave)};
  });

  hero?.addEventListener('pointermove',onPointerMove);
  hero?.addEventListener('pointerleave',resetTilt);

  return()=>{
   cancelAnimationFrame(scrollFrame);
   cancelAnimationFrame(pointerFrame);
   observer?.disconnect();
   window.removeEventListener('scroll',onScroll);
   hero?.removeEventListener('pointermove',onPointerMove);
   hero?.removeEventListener('pointerleave',resetTilt);
   magneticCleanup.forEach(cleanup=>cleanup());
   delete root.dataset.agencyMotion;
  };
 },[]);

 return <>
  <div ref={progressRef} className={styles.scrollProgress} aria-hidden="true"/>
  <div ref={glowRef} className={styles.pointerGlow} aria-hidden="true"/>
 </>;
}
