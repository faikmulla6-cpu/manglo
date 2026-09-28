'use client';

import {useState} from 'react';
import styles from './AdminProjects.module.css';

const states=['INFORMATION_RECEIVED','DESIGN_DEVELOPMENT','CLIENT_REVIEW','FINAL_CHANGES','READY_TO_LAUNCH','LIVE'] as const;

export default function WebsiteProjectStatusControl({publicId,status}:{publicId:string;status:string}){
 const [value,setValue]=useState(status);
 const [message,setMessage]=useState('');
 const [busy,setBusy]=useState(false);

 async function update(next:string){
  if(next===value||busy)return;
  const previous=value;
  setValue(next);setBusy(true);setMessage('');
  try{
   const response=await fetch('/api/admin/website-projects/status',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({publicId,status:next})});
   const body=await response.json().catch(()=>({}));
   if(!response.ok)throw new Error(body?.error||'Update failed.');
   setMessage('Saved');
  }catch(error){
   setValue(previous);
   setMessage(error instanceof Error?error.message:'Update failed.');
  }finally{setBusy(false)}
 }

 return <div className={styles.statusControl}><select value={value} disabled={busy} onChange={event=>void update(event.target.value)} aria-label="Website project status">{states.map(state=><option value={state} key={state}>{state.replaceAll('_',' ')}</option>)}</select>{message?<small>{message}</small>:null}</div>;
}
