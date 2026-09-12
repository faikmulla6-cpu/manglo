const endpoint=process.env.SMM_API_URL?.trim()||'';
const key=process.env.SMM_API_KEY?.trim()||'';

export class ProviderError extends Error{
 constructor(message:string,public readonly retryable=false){super(message);this.name='ProviderError'}
}

function configuredEndpoint(){
 if(!endpoint||!key)throw new ProviderError('Provider is not configured');
 let url:URL;try{url=new URL(endpoint)}catch{throw new ProviderError('Provider endpoint is invalid')}
 if(url.protocol!=='https:')throw new ProviderError('Provider endpoint must use HTTPS');
 return url.toString();
}

async function call(body:Record<string,string|number>){
 const url=configuredEndpoint();
 const controller=new AbortController();
 const timer=setTimeout(()=>controller.abort(),20_000);
 try{
  const params=new URLSearchParams({key});
  for(const [name,value] of Object.entries(body))params.set(name,String(value));
  const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded','Accept':'application/json'},body:params,cache:'no-store',signal:controller.signal});
  if(!response.ok)throw new ProviderError(`Provider returned HTTP ${response.status}`,response.status>=500||response.status===429);
  const data=await response.json().catch(()=>{throw new ProviderError('Provider returned an invalid response',true)});
  if(data?.error)throw new ProviderError(String(data.error),false);
  return data;
 }catch(error){
  if(error instanceof ProviderError)throw error;
  if((error as Error)?.name==='AbortError')throw new ProviderError('Provider request timed out',true);
  throw new ProviderError('Provider is temporarily unavailable',true);
 }finally{clearTimeout(timer)}
}

export async function providerServices(){
 if((process.env.SMM_RATE_CURRENCY||'INR').toUpperCase()!=='INR')throw new ProviderError('MANGLO pricing requires provider rates in INR');
 const result=await call({action:'services'});
 if(!Array.isArray(result))throw new ProviderError('Provider returned an invalid service list',true);
 return result;
}

export async function providerAdd(service:string,link:string,quantity:number){
 const result=await call({action:'add',service,link,quantity});
 if(!result?.order)throw new ProviderError('Provider did not return an order ID',true);
 return {order:String(result.order)};
}

export async function providerStatus(order:string){return call({action:'status',order})}
export async function providerRefill(order:string){return call({action:'refill',order})}
export async function providerBalance(){return call({action:'balance'})}
export function providerConfigured(){return Boolean(endpoint&&key)}
