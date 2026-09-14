import {Suspense} from 'react';
import {db} from '@/lib/db';
import {catalogFreshAfter} from '@/lib/catalog-freshness';
import AuthForm from './AuthForm';

export const metadata={title:'Log in',description:'Sign in to your MANGLO account to manage your wallet, orders, saved services and support.',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';

async function authPreviewData(){
 const liveServices=await db.service.count({where:{active:true,operatorDisabled:false,lastSyncedAt:{gte:catalogFreshAfter()}}}).catch(()=>null);
 return {liveServices};
}

export default async function Auth(){
 const data=await authPreviewData();
 return <Suspense fallback={null}><AuthForm liveServices={data.liveServices}/></Suspense>;
}
