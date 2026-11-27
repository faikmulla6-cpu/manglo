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
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)
    if(pathname==='/studio'){res.writeHead(308,{Location:'/studio/'});res.end();return}
    if(pathname.split(/[\\/]/).some(segment=>segment.startsWith('.'))) throw Error('Invalid path')
    let file=path.resolve(root,'.'+pathname)
    if(!file.startsWith(root+path.sep)&&file!==root) throw Error('Invalid path')
    try {if((await stat(file)).isDirectory())file=path.join(file,'index.html')}catch{}
    let data
    try {data=await readFile(file)} catch {file=path.join(root,'404.html');data=await readFile(file);res.statusCode=404}
    res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream')
    res.setHeader('X-Content-Type-Options','nosniff')
    res.setHeader('Referrer-Policy','strict-origin-when-cross-origin')
    res.setHeader('Cache-Control',pathname.startsWith('/studio/react-assets/')?'public, max-age=31536000, immutable':'no-cache')
    if(pathname.startsWith('/studio/'))res.setHeader('X-Robots-Tag','noindex, follow')
    res.end(req.method==='HEAD'?undefined:data)
  } catch {if(!res.headersSent)res.writeHead(400);res.end('Bad request')}
})
server.listen(Number(process.env.PORT)||4173,process.env.HOST||'0.0.0.0',()=>console.log(`Manglo server listening on port ${server.address().port}`))
