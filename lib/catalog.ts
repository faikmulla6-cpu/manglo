import rawCatalog from './provider-catalog.json';
import {retailRate} from './money';

export type CatalogSource={providerServiceId:string;category:string;name:string;rate:number;min:number;max:number;averageTime:string|null;refill:boolean;cancel:boolean};
export const providerCatalog=rawCatalog as CatalogSource[];
export const providerCatalogById=new Map(providerCatalog.map(item=>[item.providerServiceId,item]));

const promotional=/\b(best|cheapest|amazing|super|premium|guaranteed|guarantee|working(?:\s+good)?(?:\s+currently)?|updated?|hot|stable|safe|real|hq|high\s*quality)\b/gi;
const emoji=/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu;

function tidy(value:string){return value.replace(emoji,' ').replace(/\bworking\s+after\s+(?:the\s+)?update\b/gi,' ').replace(/100%\s*(?:non[- ]?drop|stable)/gi,'Provider-listed low-drop').replace(/non[- ]?drop/gi,'Provider-listed low-drop').replace(/\bR\s*(\d{1,3})\b/gi,'$1-day refill').replace(/refill\s*[-:]?\s*(\d{1,3})\s*days?/gi,'$1-day refill').replace(/\binstant\b/gi,'Fast start').replace(promotional,' ').replace(/\[\s*\]/g,' ').replace(/\[\s*([^\]]+?)\s*\]/g,' · $1').replace(/\s*[|•]+\s*/g,' · ').replace(/\s*·\s*·\s*/g,' · ').replace(/\s*\/\s*day\b/gi,'/day').replace(/\s+/g,' ').replace(/(?:\s*·\s*)+$/,'').trim()}
export function trustworthyServiceName(name:string){return tidy(name)||'Social media growth service'}
export function trustworthyCategory(category:string){return tidy(category)||'Other services'}

export function platformOf(category:string,name:string){
 const s=`${category} ${name}`.toLowerCase();
 const known=[['Instagram','instagram'],['YouTube','youtube'],['TikTok','tiktok'],['Telegram','telegram'],['Facebook','facebook'],['X','twitter'],['LinkedIn','linkedin'],['Spotify','spotify'],['SoundCloud','soundcloud'],['Pinterest','pinterest'],['Discord','discord'],['Twitch','twitch'],['Reddit','reddit'],['Snapchat','snapchat']];
 return known.find(([,needle])=>s.includes(needle))?.[0]||'Other';
}

export function serviceDescription(item:Pick<CatalogSource,'averageTime'|'min'|'max'|'refill'>){
 const timing=item.averageTime?`Provider-reported recent average completion time: ${item.averageTime}. `:'The provider has not published a recent average completion time. ';
 const refill=item.refill?'The provider currently lists refill support; eligibility and duration depend on the specific service terms. ':'No refill support is currently listed. ';
 return `${timing}Accepted quantity: ${item.min.toLocaleString('en-IN')} to ${item.max.toLocaleString('en-IN')}. ${refill}Timing, availability and results are estimates and are not guaranteed.`;
}

export function presentService<T extends {category:string;name:string}>(item:T){return {...item,category:trustworthyCategory(item.category),name:trustworthyServiceName(item.name)}}

export function fallbackServices(){return providerCatalog.map((source,index)=>{const item=presentService(source);const providerPaise=Math.max(1,Math.ceil(item.rate*100));return {id:`catalog-${item.providerServiceId}`,provider:'primary',providerServiceId:item.providerServiceId,platform:platformOf(item.category,item.name),category:item.category,name:item.name,description:serviceDescription(item),averageTime:item.averageTime,providerRatePaisePerThousand:providerPaise,retailRatePaisePerThousand:retailRate(providerPaise),min:item.min,max:item.max,refill:item.refill,cancel:item.cancel,active:true,score:80-(index%5),lastSyncedAt:new Date(0).toISOString()}})}
