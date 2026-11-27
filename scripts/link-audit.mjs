import {readFile,readdir,stat} from 'node:fs/promises'
import {resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
const root=new URL('../dist/',import.meta.url)
export async function auditLinks(){
 const broken=[];let references=0
 const pages=(await readdir(root)).filter(name=>name.endsWith('.html'))
 const sources=await Promise.all(pages.map(async file=>({file,text:await readFile(new URL(file,root),'utf8')})))
 for(const file of ['App.tsx','StudioContent.tsx','RequestFields.tsx'])sources.push({file:'studio/src/'+file,text:await readFile(new URL('../studio/src/'+file,import.meta.url),'utf8')})
 const check=async(file,href)=>{
  if(!href||href.startsWith('#')||/^(?:https?:|mailto:|tel:|data:)/.test(href))return
  const url=new URL(href,'https://manglo.shop/');if(url.pathname==='/api/demo')return
  references++
  const target=url.pathname==='/'?'index.html':decodeURIComponent(url.pathname).replace(/^\//,'')
  try{if(!(await stat(new URL(target,root))).isFile())throw Error('not a file')}catch{broken.push({file,path:href,issue:'missing_target'})}
 }
 for(const {file,text} of sources){
  for(const [,href]of text.matchAll(/(?:href|src)="([^"]+)"/g))await check(file,href)
  for(const [tag]of text.matchAll(/<img\b[^>]*>/g))if(!/\balt="[^"]*"/.test(tag))broken.push({file,path:'img',issue:'missing_alt'})
 }
 for(const asset of await readdir(new URL('react-assets/',root))){
  const text=await readFile(new URL('react-assets/'+asset,root),'utf8')
  if(!/\.(?:js|css)$/.test(asset))continue
  for(const [,href]of text.matchAll(/["'(](\/react-assets\/[^"'()\s]+)["')]/g))await check(asset,href)
 }
 return {checkedPages:pages.length,references,passed:broken.length===0,broken}
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const result=await auditLinks();console.log(JSON.stringify(result,null,2));if(!result.passed)process.exitCode=1
}
