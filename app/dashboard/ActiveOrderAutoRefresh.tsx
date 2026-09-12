'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function ActiveOrderAutoRefresh({active}:{active:boolean}){
 const router=useRouter();
 useEffect(()=>{
  if(!active)return;
  const timer=window.setInterval(()=>router.refresh(),30_000);
  return ()=>window.clearInterval(timer);
 },[active,router]);
 return null;
}
