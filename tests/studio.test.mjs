import {test,before,after} from 'node:test'
import assert from 'node:assert/strict'
import {spawn} from 'node:child_process'
import {once} from 'node:events'
import {auditSite} from '../scripts/site-audit.mjs'
import {auditLinks} from '../scripts/link-audit.mjs'

let server,base
before(async()=>{
 server=spawn(process.execPath,['scripts/serve.mjs'],{cwd:new URL('../',import.meta.url),env:{...process.env,PORT:'0',HOST:'127.0.0.1'},stdio:['ignore','pipe','pipe']})
 let output=''
 base=await new Promise((resolve,reject)=>{
  const timer=setTimeout(()=>reject(Error('Preview server did not start')),10000)
  server.once('error',error=>{clearTimeout(timer);reject(error)})
  server.stdout.on('data',chunk=>{output+=chunk;const port=output.match(/listening on port (\d+)/)?.[1];if(port){clearTimeout(timer);resolve('http://127.0.0.1:'+port)}})
  server.once('exit',()=>{clearTimeout(timer);reject(Error('Preview server exited before startup'))})
 })
})
after(async()=>{if(server&&server.exitCode===null){const exited=once(server,'exit');server.kill();await exited}})

test('domain root serves indexable Studio with working compiled app and portrait',async()=>{
 const response=await fetch(base+'/'),html=await response.text()
 assert.equal(response.status,200)
 assert.ok(html.includes('<title>Manglo Studio'))
 assert.ok(html.includes('rel="canonical" href="https://manglo.shop/"'))
 assert.equal(response.headers.get('x-robots-tag'),null)
 assert.ok(!html.includes('noindex'))
 const entry=html.match(/<script[^>]+src="([^"]+)"/)?.[1]
 assert.ok(entry.startsWith('/react-assets/'))
 const bundle=await fetch(base+entry);assert.equal(bundle.status,200);assert.match(bundle.headers.get('content-type'),/javascript/)
 assert.match(bundle.headers.get('cache-control'),/immutable/)
 const portrait=await fetch(base+'/assets/faik-cutout.webp');assert.equal(portrait.status,200);assert.equal(portrait.headers.get('content-type'),'image/webp')
 assert.equal((await fetch(base+'/privacy.html')).status,200)
})
test('old Studio URLs redirect to root and preserve query strings without leaving the domain',async()=>{
 for(const path of ['/studio','/studio/','/studio.html','/studio/index.html']){
  const response=await fetch(base+path+'?source=old',{redirect:'manual'})
  assert.equal(response.status,308);assert.equal(response.headers.get('location'),'/?source=old')
 }
 const concept=await fetch(base+'/studio/plumbing.html',{redirect:'manual'});assert.equal(concept.headers.get('location'),'/plumbing.html')
 const malicious=await fetch(base+'/studio///example.com',{redirect:'manual'});assert.equal(malicious.headers.get('location'),'/example.com')
 assert.equal((await fetch(base+'/studio/%5cexample.com',{redirect:'manual'})).status,400)
})
test('retired article and tool URLs return Gone while useful contact and privacy links redirect',async()=>{
 for(const path of ['/journal/','/journal/ai/','/playbook/','/playbook/resize-photo-in-pixels-without-stretching/','/guides/prepare-product-images/','/tools/image-resizer/','/feed.xml','/ads.txt']){
  const response=await fetch(base+path)
  assert.equal(response.status,410,path);assert.match(response.headers.get('x-robots-tag'),/noindex/)
  assert.ok((await response.text()).includes('Manglo Studio'))
 }
 for(const [path,target]of [['/contact/','/#book-demo'],['/about/','/#founder'],['/privacy/','/privacy.html']])assert.equal((await fetch(base+path,{redirect:'manual'})).headers.get('location'),target)
 assert.equal((await fetch(base+'/missing-page')).status,404)
 assert.equal((await fetch(base+'/.env')).status,400)
 const health=await fetch(base+'/api/demo/health');assert.equal(health.status,200);assert.equal(typeof (await health.json()).mail_configured,'boolean')
})
test('production metadata and local links pass the Studio release audits',async()=>{
 const site=await auditSite(),links=await auditLinks()
 assert.equal(site.passed,true,JSON.stringify(site.failures))
 assert.equal(links.passed,true,JSON.stringify(links.broken))
})
