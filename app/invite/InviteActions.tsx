'use client';

import {useState} from 'react';
import {Check,Copy,Share2} from 'lucide-react';
import styles from './invite.module.css';

export default function InviteActions({link}:{link:string}){
 const [copied,setCopied]=useState(false);
 async function copy(){try{await navigator.clipboard.writeText(link);setCopied(true);setTimeout(()=>setCopied(false),1800)}catch{}}
 async function share(){
  if(navigator.share){try{await navigator.share({title:'MANGLO',text:'Try MANGLO with my invite link.',url:link});return}catch{}}
  await copy();
 }
 return <div className={styles.actions}>
  <button type="button" className={styles.primary} onClick={share}><Share2 size={16}/> Share invite</button>
  <button type="button" className={styles.secondary} onClick={copy}>{copied?<Check size={16}/>:<Copy size={16}/>} {copied?'Copied':'Copy link'}</button>
 </div>;
}
