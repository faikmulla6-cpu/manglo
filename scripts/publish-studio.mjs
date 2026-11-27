import {cp,readFile,writeFile} from 'node:fs/promises'
const source = new URL('../studio/site/',import.meta.url)
const output = new URL('../dist/studio/',import.meta.url)
await cp(new URL('assets/',source),new URL('assets/',output),{recursive:true})
for (const file of ['atelier.css','concept.css','plumbing.html','roofing.html','electrical.html','privacy.html']) {
  await cp(new URL(file,source),new URL(file,output))
}
const html=await readFile(new URL('index.html',output),'utf8')
await writeFile(new URL('studio.html',output),html)
console.log('Studio built at /studio/; existing toolkit routes preserved.')
