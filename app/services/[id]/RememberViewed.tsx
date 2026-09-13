'use client';
import {useEffect} from 'react';
export default function RememberViewed({serviceId}:{serviceId:string}){
 useEffect(()=>{try{const parsed=JSON.parse(localStorage.getItem('manglo_recent_services')||'[]');const current=Array.isArray(parsed)?parsed.filter(Boolean):[];const next=[serviceId,...current.filter((id:string)=>id!==serviceId)].slice(0,8);localStorage.setItem('manglo_recent_services',JSON.stringify(next))}catch{}},[serviceId]);
 return null;
}
