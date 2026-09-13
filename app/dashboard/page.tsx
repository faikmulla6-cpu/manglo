import {Suspense} from 'react';
import {redirect} from 'next/navigation';
import {getUser} from '@/lib/auth';
import {db} from '@/lib/db';
import {trustworthyServiceName} from '@/lib/catalog';
import {reconcileProviderOrder} from '@/lib/order-reconciliation';
import DashboardShell from './DashboardShell';
import PaymentReturnStatus from './PaymentReturnStatus';
import ActiveOrderAutoRefresh from './ActiveOrderAutoRefresh';

export const metadata={title:'My account',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';
const ABANDONED_MS=30*60*1000;

export default async function Dashboard(){
 const user=await getUser();if(!user)redirect('/auth?next=%2Fdashboard');
 const activeOrders=await db.order.findMany({where:{userId:user.id,status:{in:['QUEUED','PROCESSING']},providerOrderId:{not:null}},select:{id:true},orderBy:{createdAt:'desc'},take:10}).catch(()=>[]);
 if(activeOrders.length)await Promise.allSettled(activeOrders.map(order=>reconcileProviderOrder(order.id)));
 await db.orderDraft.deleteMany({where:{userId:user.id,expiresAt:{lte:new Date()}}}).catch(()=>undefined);
 const [freshUser,orders,ledger,favorites,tickets,draft]=await Promise.all([
  db.user.findUnique({where:{id:user.id}}),
  db.order.findMany({where:{userId:user.id},include:{service:true},orderBy:{createdAt:'desc'},take:50}),
  db.walletLedger.findMany({where:{userId:user.id},orderBy:{createdAt:'desc'},take:50}),
  db.favorite.findMany({where:{userId:user.id},include:{service:true},orderBy:{createdAt:'desc'}}),
  db.supportTicket.findMany({where:{userId:user.id},orderBy:{createdAt:'desc'},take:20}),
  db.orderDraft.findUnique({where:{userId:user.id},include:{service:true}}).catch(()=>null)
 ]);
 const account=freshUser||user;const hasActiveOrders=orders.some(order=>order.status==='QUEUED'||order.status==='PROCESSING');
 const usableDraft=draft&&draft.service.active&&!draft.service.operatorDisabled?{service:trustworthyServiceName(draft.service.name),platform:draft.service.platform,quantity:draft.quantity,updatedAt:draft.updatedAt.toISOString(),abandoned:Date.now()-draft.updatedAt.getTime()>=ABANDONED_MS}:null;
 return <><ActiveOrderAutoRefresh active={hasActiveOrders}/><div style={{position:'fixed',top:14,left:'50%',transform:'translateX(-50%)',zIndex:200,width:'min(520px,calc(100% - 24px))',padding:0}}><Suspense fallback={null}><PaymentReturnStatus/></Suspense></div><DashboardShell user={{name:account.name,email:account.email,phone:account.phone||'',walletPaise:Number(account.walletPaise),createdAt:account.createdAt.toISOString()}} orders={orders.map(order=>({id:order.publicId,serviceId:order.service.id,service:trustworthyServiceName(order.service.name),platform:order.service.platform,status:order.status,quantity:order.quantity,chargedPaise:Number(order.chargedPaise),remains:order.remains,createdAt:order.createdAt.toISOString()}))} ledger={ledger.map(item=>({id:item.id,type:item.type,amountPaise:Number(item.amountPaise),balanceAfterPaise:Number(item.balanceAfterPaise),note:item.note,createdAt:item.createdAt.toISOString()}))} favorites={favorites.map(item=>({id:item.service.id,name:trustworthyServiceName(item.service.name),platform:item.service.platform,pricePaise:Number(item.service.retailRatePaisePerThousand)}))} tickets={tickets.map(ticket=>({id:ticket.publicId,category:ticket.category,subject:ticket.subject,status:ticket.status,createdAt:ticket.createdAt.toISOString()}))} draft={usableDraft}/></>;
}
