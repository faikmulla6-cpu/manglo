import {readFile,stat} from 'node:fs/promises'
import {resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
const root=new URL('../dist/',import.meta.url)
export async function auditSite(){
 const failures=[]
 const fail=(check,detail)=>failures.push({check,detail})
 const html=await readFile(new URL('index.html',root),'utf8')
 if(!/<title>Manglo Studio[^<]+<\/title>/.test(html))fail('title','Studio must be the homepage')
 if(!html.includes('rel="canonical" href="https://manglo.shop/"'))fail('canonical','Homepage canonical must be the root URL')
 if(!html.includes('property="og:url" content="https://manglo.shop/"'))fail('sharing','Open Graph URL must be the root URL')
 if(!html.includes('name="robots" content="index,follow,max-image-preview:large"')||html.includes('noindex'))fail('indexability','Homepage must be indexable')
 if(!html.includes('<html lang="en-GB">')||!html.includes('name="viewport"'))fail('accessibility','Language and viewport required')
 const description=html.match(/name="description" content="([^"]+)"/)?.[1]
 if(!description||description.length<55||description.length>180)fail('description','Descriptive homepage metadata required')
 if(!html.includes('id="root"')||!html.includes('/react-assets/'))fail('frontend','Compiled React app required at root')
 if(/\/studio\/|\/journal\/|\/playbook\//.test(html))fail('old_paths','Homepage must not use the retired site paths')
 if(/adsbygoogle|googlesyndication|ca-pub-/.test(html))fail('ads','Retired advertising metadata or code found')
 for(const [,json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))try{JSON.parse(json)}catch{fail('schema','Invalid JSON-LD')}
 const sitemap=await readFile(new URL('sitemap.xml',root),'utf8')
 const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1])
 if(urls.length!==1||urls[0]!=='https://manglo.shop/')fail('sitemap','Only the real studio homepage belongs in the sitemap')
 const robots=await readFile(new URL('robots.txt',root),'utf8')
 if(!robots.includes('Sitemap: https://manglo.shop/sitemap.xml')||!robots.includes('Disallow: /api/'))fail('robots','Correct sitemap and private API exclusion required')
 for(const old of ['studio','journal','playbook','guides','tools','feed.xml','ads.txt']){
  try{await stat(new URL(old,root));fail('retired_output',old+' must not be deployed')}catch(error){if(error.code!=='ENOENT')throw error}
 }
 for(const file of ['privacy.html','plumbing.html','roofing.html','electrical.html','404.html']){
  const page=await readFile(new URL(file,root),'utf8')
  if(!page.includes('noindex'))fail('supporting_pages',file+' should remain noindex')
  if(page.includes('/studio/'))fail('supporting_links',file+' still points to /studio/')
 }
 return {mode:'STUDIO_BUILD_AUDIT',audited:6,passed:failures.length===0,failures}
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const result=await auditSite();console.log(JSON.stringify(result,null,2));if(!result.passed)process.exitCode=1
}
