import {Suspense} from 'react';
import {redirect} from 'next/navigation';
import {getUser} from '@/lib/auth';
import {db} from '@/lib/db';
import {trustworthyServiceName} from '@/lib/catalog';
import DashboardShell from './DashboardShell';
import PaymentReturnStatus from './PaymentReturnStatus';

export const metadata={title:'My account',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';

export default async function Dashboard(){
 const user=await getUser();if(!user)redirect('/auth?next=%2Fdashboard');
 const [orders,ledger,favorites,tickets]=await Promise.all([
  db.order.findMany({where:{userId:user.id},include:{service:true},orderBy:{createdAt:'desc'},take:50}),
  db.walletLedger.findMany({where:{userId:user.id},orderBy:{createdAt:'desc'},take:50}),
  db.favorite.findMany({where:{userId:user.id},include:{service:true},orderBy:{createdAt:'desc'}}),
  db.supportTicket.findMany({where:{userId:user.id},orderBy:{createdAt:'desc'},take:20})
 ]);
 return <><div className="container payment-return"><Suspense fallback={null}><PaymentReturnStatus/></Suspense></div><DashboardShell user={{name:user.name,email:user.email,phone:user.phone||'',walletPaise:Number(user.walletPaise),createdAt:user.createdAt.toISOString()}} orders={orders.map(order=>({id:order.publicId,service:trustworthyServiceName(order.service.name),platform:order.service.platform,status:order.status,quantity:order.quantity,chargedPaise:Number(order.chargedPaise),remains:order.remains,createdAt:order.createdAt.toISOString()}))} ledger={ledger.map(item=>({id:item.id,type:item.type,amountPaise:Number(item.amountPaise),balanceAfterPaise:Number(item.balanceAfterPaise),note:item.note,createdAt:item.createdAt.toISOString()}))} favorites={favorites.map(item=>({id:item.service.id,name:trustworthyServiceName(item.service.name),platform:item.service.platform,pricePaise:Number(item.service.retailRatePaisePerThousand)}))} tickets={tickets.map(ticket=>({id:ticket.publicId,category:ticket.category,subject:ticket.subject,status:ticket.status,createdAt:ticket.createdAt.toISOString()}))}/></>;
}
