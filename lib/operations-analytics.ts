import {db} from './db';

export async function getOperationsAnalytics(days=30){
 const since=new Date(Date.now()-days*86_400_000);
 const orders=await db.order.findMany({
  where:{createdAt:{gte:since}},
  select:{userId:true,status:true,chargedPaise:true,providerCostPaise:true,service:{select:{providerServiceId:true,platform:true,name:true}}},
  orderBy:{createdAt:'desc'},take:5000,
 });
 const users=new Map<string,number>();
 const platforms=new Map<string,{platform:string;orders:number;completed:number;refunded:number;gross:number;cost:number}>();
 const services=new Map<string,{providerServiceId:string;name:string;platform:string;orders:number;completed:number;refunded:number;gross:number;cost:number}>();
 let completed=0,refunded=0,gross=0,cost=0;
 for(const order of orders){
  users.set(order.userId,(users.get(order.userId)||0)+1);
  const platform=platforms.get(order.service.platform)||{platform:order.service.platform,orders:0,completed:0,refunded:0,gross:0,cost:0};
  const service=services.get(order.service.providerServiceId)||{providerServiceId:order.service.providerServiceId,name:order.service.name,platform:order.service.platform,orders:0,completed:0,refunded:0,gross:0,cost:0};
  platform.orders++;service.orders++;
  if(order.status==='COMPLETED'){
   completed++;platform.completed++;service.completed++;
   const charged=Number(order.chargedPaise);const provider=Number(order.providerCostPaise??0);
   gross+=charged;cost+=provider;platform.gross+=charged;platform.cost+=provider;service.gross+=charged;service.cost+=provider;
  }
  if(order.status==='REFUNDED'){refunded++;platform.refunded++;service.refunded++}
  platforms.set(platform.platform,platform);services.set(service.providerServiceId,service);
 }
 const repeatCustomers=[...users.values()].filter(count=>count>=2).length;
 const margin=gross-cost;
 return {
  days,sampled:orders.length>=5000,totalOrders:orders.length,completed,refunded,gross,cost,margin,
  marginPct:gross>0?margin/gross*100:0,
  completionRate:orders.length?completed/orders.length*100:0,
  refundRate:orders.length?refunded/orders.length*100:0,
  repeatCustomers,
  platforms:[...platforms.values()].map(item=>({...item,margin:item.gross-item.cost,marginPct:item.gross?(item.gross-item.cost)/item.gross*100:0})).sort((a,b)=>b.gross-a.gross),
  topServices:[...services.values()].map(item=>({...item,margin:item.gross-item.cost,marginPct:item.gross?(item.gross-item.cost)/item.gross*100:0})).sort((a,b)=>b.gross-a.gross||b.orders-a.orders).slice(0,10),
 };
}
