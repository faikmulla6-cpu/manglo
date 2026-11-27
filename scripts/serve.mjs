import http from 'node:http'
import {readFile,stat} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {createDemoHandler} from '../lib/demo-mail.mjs'
const root=path.resolve(fileURLToPath(new URL('../dist/',import.meta.url)))
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.woff2':'font/woff2','.ico':'image/x-icon'}
const demo=createDemoHandler()
const server=http.createServer(async(req,res)=>{
  try {
    if(await demo(req,res)) return
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{Allow:'GET, HEAD'});res.end();return}
    const url=new URL(req.url,'http://localhost')
    const pathname=decodeURIComponent(url.pathname)
    if(pathname.includes('\\'))throw Error('Invalid path')
    const redirect=location=>{res.writeHead(308,{Location:location+url.search,'Cache-Control':'no-cache'});res.end()}
    if(['/studio','/studio/','/studio.html','/studio/studio.html','/studio/index.html'].includes(pathname)){redirect('/');return}
    if(pathname.startsWith('/studio/')){redirect('/'+pathname.slice('/studio/'.length).replace(/^\/+/,''));return}
    if(['/privacy','/privacy/'].includes(pathname)){redirect('/privacy.html');return}
    if(['/contact','/contact/'].includes(pathname)){res.writeHead(308,{Location:'/'+url.search+'#book-demo'});res.end();return}
    if(['/about','/about/'].includes(pathname)){res.writeHead(308,{Location:'/'+url.search+'#founder'});res.end();return}
    if(pathname.split(/[\\/]/).some(segment=>segment.startsWith('.'))) throw Error('Invalid path')
    let file=path.resolve(root,'.'+pathname)
    if(!file.startsWith(root+path.sep)&&file!==root) throw Error('Invalid path')
    try {if((await stat(file)).isDirectory())file=path.join(file,'index.html')}catch{}
    const retired=/^\/(?:journal|playbook|guides|tools|editorial-standards|terms)(?:\/|$)/.test(pathname)||['/feed.xml','/ads.txt'].includes(pathname)
    let data
    try {if(retired)throw Error('Retired route');data=await readFile(file)} catch {
      file=path.join(root,'404.html');data=await readFile(file)
      res.statusCode=retired?410:404
      res.setHeader('X-Robots-Tag','noindex, follow')
    }
    res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream')
    res.setHeader('X-Content-Type-Options','nosniff')
    res.setHeader('Referrer-Policy','strict-origin-when-cross-origin')
    res.setHeader('Cache-Control',res.statusCode===200&&pathname.startsWith('/react-assets/')?'public, max-age=31536000, immutable':'no-cache')
    res.end(req.method==='HEAD'?undefined:data)
  } catch {if(!res.headersSent)res.writeHead(400);res.end('Bad request')}
})
server.listen(process.env.PORT===undefined?4173:Number(process.env.PORT),process.env.HOST||'0.0.0.0',()=>console.log(`Manglo server listening on port ${server.address().port}`))
