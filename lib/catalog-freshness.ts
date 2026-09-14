const HOUR=3_600_000;

export function catalogMaxAgeHours(){
 const configured=Number(process.env.CATALOG_ORDER_MAX_AGE_HOURS||24);
 return Number.isFinite(configured)?Math.max(1,Math.min(72,configured)):24;
}

export function catalogFreshAfter(now=Date.now()){
 return new Date(now-catalogMaxAgeHours()*HOUR);
}

export function serviceIsFresh(lastSyncedAt:Date,now=Date.now()){
 return lastSyncedAt.getTime()>=now-catalogMaxAgeHours()*HOUR;
}
