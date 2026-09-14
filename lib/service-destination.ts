type ServiceTarget={platform:string;category:string;name:string};

export type DestinationCheck={ok:true;providerLink:string}|{ok:false;error:string};

function hostEndsWith(host:string,domain:string){return host===domain||host.endsWith(`.${domain}`)}

export function validateServiceDestination(service:ServiceTarget,rawLink:string):DestinationCheck{
 let url:URL;
 try{url=new URL(rawLink)}catch{return{ok:false,error:'Enter a valid public destination URL.'}}
 if(!['http:','https:'].includes(url.protocol))return{ok:false,error:'Only public http(s) destination links are supported.'};
 const platform=service.platform.trim().toLowerCase();
 const intent=`${service.category} ${service.name}`.toLowerCase();
 const path=url.pathname.replace(/\/{2,}/g,'/');

 if(platform==='instagram'){
  if(!hostEndsWith(url.hostname.toLowerCase(),'instagram.com'))return{ok:false,error:'This Instagram service requires an instagram.com destination.'};
  const media=/^\/(p|reel|tv)\/[^/]+/i.test(path);
  const story=/^\/stories\/[^/]+/i.test(path);
  const blockedProfileRoots=new Set(['p','reel','tv','stories','explore','accounts','direct','about','developer']);
  const first=path.split('/').filter(Boolean)[0]?.toLowerCase()||'';
  const profile=Boolean(first&&!blockedProfileRoots.has(first));
  if(/\bfollowers?\b/.test(intent)&&!profile)return{ok:false,error:'Instagram follower services require a public profile URL, not a post or Reel link.'};
  if(/\bstor(?:y|ies)\b/.test(intent)&&!story)return{ok:false,error:'This Instagram story service requires a public Instagram story URL.'};
  if(!/\bfollowers?\b/.test(intent)&&!/(profile\s*(?:visit|view)|bio|account)/.test(intent)&&/(views?|likes?|comments?|shares?|saves?|impressions?|reach|reels?|posts?)/.test(intent)&&!media){
   return{ok:false,error:'This Instagram content service requires a public post or Reel URL.'};
  }
  url.search='';url.hash='';
  return{ok:true,providerLink:url.toString()};
 }

 if(platform==='youtube'){
  const host=url.hostname.toLowerCase();
  if(!(hostEndsWith(host,'youtube.com')||hostEndsWith(host,'youtu.be')))return{ok:false,error:'This YouTube service requires a youtube.com or youtu.be destination.'};
  const video=hostEndsWith(host,'youtu.be')||path.startsWith('/watch')||path.startsWith('/shorts/')||Boolean(url.searchParams.get('v'));
  const channel=path.startsWith('/@')||path.startsWith('/channel/')||path.startsWith('/c/')||path.startsWith('/user/');
  if(/\bsubscribers?\b/.test(intent)&&!channel)return{ok:false,error:'YouTube subscriber services require a channel URL.'};
  if(!/\bsubscribers?\b/.test(intent)&&/(views?|likes?|comments?|watch\s*time|shorts?)/.test(intent)&&!video)return{ok:false,error:'This YouTube content service requires a video or Shorts URL.'};
  return{ok:true,providerLink:url.toString()};
 }

 if(platform==='tiktok'){
  if(!hostEndsWith(url.hostname.toLowerCase(),'tiktok.com'))return{ok:false,error:'This TikTok service requires a tiktok.com destination.'};
  const video=/^\/@[^/]+\/video\/\d+/i.test(path);
  const profile=/^\/@[^/]+\/?$/i.test(path);
  if(/\bfollowers?\b/.test(intent)&&!profile)return{ok:false,error:'TikTok follower services require a profile URL.'};
  if(!/\bfollowers?\b/.test(intent)&&/(views?|likes?|comments?|shares?)/.test(intent)&&!video)return{ok:false,error:'This TikTok content service requires a TikTok video URL.'};
  return{ok:true,providerLink:url.toString()};
 }

 if(platform==='x'||platform==='twitter'){
  const host=url.hostname.toLowerCase();
  if(!(hostEndsWith(host,'x.com')||hostEndsWith(host,'twitter.com')))return{ok:false,error:'This X service requires an x.com or twitter.com destination.'};
  const post=/\/status\/\d+/i.test(path);
  const parts=path.split('/').filter(Boolean);
  const profile=parts.length===1&&parts[0].toLowerCase()!=='home';
  if(/\bfollowers?\b/.test(intent)&&!profile)return{ok:false,error:'X follower services require a profile URL.'};
  if(!/\bfollowers?\b/.test(intent)&&/(views?|likes?|retweets?|reposts?|comments?|replies?|bookmarks?)/.test(intent)&&!post)return{ok:false,error:'This X engagement service requires a post URL.'};
  return{ok:true,providerLink:url.toString()};
 }

 return{ok:true,providerLink:url.toString()};
}
