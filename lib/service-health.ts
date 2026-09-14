import {db} from './db';

export const SERVICE_HEALTH_BASELINE_SCORE=80;
export const SERVICE_HEALTH_QUARANTINE_SCORE=60;
const WINDOW_DAYS=45;
const CONFIDENCE_SAMPLE=5;

export type ServiceHealth={
 score:number;
 total:number;
 completed:number;
 partial:number;
 failed:number;
 failureRate:number;
 shouldQuarantine:boolean;
};

function providerFailure(status:string,providerStatus:string|null){
 if(status==='CANCELED'||status==='FAILED')return true;
 if(status!=='REFUNDED')return false;
 return /cancel|fail|reject|error/i.test(providerStatus||'');
}

export function calculateServiceHealth(rows:{status:string;providerStatus:string|null}[]):ServiceHealth{
 let completed=0,partial=0,failed=0;
 for(const row of rows){
  if(row.status==='COMPLETED')completed++;
  else if(row.status==='PARTIAL')partial++;
  else if(providerFailure(row.status,row.providerStatus))failed++;
 }
 const total=completed+partial+failed;
 if(total===0)return{score:SERVICE_HEALTH_BASELINE_SCORE,total,completed,partial,failed,failureRate:0,shouldQuarantine:false};
 const observed=((completed+partial*.5)/total)*100;
 const confidence=Math.min(1,total/CONFIDENCE_SAMPLE);
 const score=Math.max(0,Math.min(100,Math.round(SERVICE_HEALTH_BASELINE_SCORE*(1-confidence)+observed*confidence)));
 const failureRate=failed/total;
 const shouldQuarantine=total>=2&&failed>=2&&failureRate>=.5&&score<SERVICE_HEALTH_QUARANTINE_SCORE;
 return{score,total,completed,partial,failed,failureRate,shouldQuarantine};
}

export async function refreshServiceHealth(serviceId:string){
 const since=new Date(Date.now()-WINDOW_DAYS*24*60*60*1000);
 const [service,rows]=await Promise.all([
  db.service.findUnique({where:{id:serviceId},select:{id:true,providerServiceId:true,score:true,active:true,operatorDisabled:true}}),
  db.order.findMany({where:{serviceId,createdAt:{gte:since},status:{in:['COMPLETED','PARTIAL','REFUNDED','CANCELED','FAILED']}},select:{status:true,providerStatus:true}}),
 ]);
 if(!service)return null;
 const health=calculateServiceHealth(rows);
 const autoPause=health.shouldQuarantine&&!service.operatorDisabled;
 await db.$transaction(async tx=>{
  await tx.service.update({where:{id:service.id},data:{score:health.score,...(autoPause?{active:false,operatorDisabled:true}:{})}});
  if(autoPause){
   await tx.adminAuditLog.create({data:{
    adminEmail:'system@manglo.shop',action:'SERVICE_AUTO_QUARANTINED',entityType:'Service',entityId:service.providerServiceId,
    before:{active:service.active,operatorDisabled:service.operatorDisabled,score:service.score},
    after:{active:false,operatorDisabled:true,score:health.score,completed:health.completed,partial:health.partial,failed:health.failed,failureRate:Number(health.failureRate.toFixed(4))},
   }});
  }
 });
 return{...health,autoPaused:autoPause};
}
