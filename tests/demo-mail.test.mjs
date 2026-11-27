import {test} from 'node:test'
import assert from 'node:assert/strict'
import {mkdtemp,readFile,readdir} from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import {randomUUID} from 'node:crypto'
import http from 'node:http'
import {validateDemo,buildDemoNotification,createDemoService,createDemoHandler} from '../lib/demo-mail.mjs'
import {verifyMailToken,DEFAULT_MAILBOX} from '../lib/demo-mail-config.mjs'
const now=()=>Date.parse('2026-11-27T12:00:00Z')
const request=(changes={})=>({name:'Alex Tester',email:'visitor@example.com',company:'Example',message:'Please help us build a website.',date:'2026-12-10',time:'15:30',timezone:'Asia/Kolkata',request_id:randomUUID(),consent:true,...changes})
const temporary=()=>mkdtemp(path.join(os.tmpdir(),'manglo-demo-test-'))
const rejectsStatus=(promise,status)=>assert.rejects(promise,error=>error.status===status)

test('availability converts local time and rejects impossible or past dates',()=>{
 assert.equal(validateDemo(request(),now()).requested_utc,'2026-12-10T10:00:00.000Z')
 for(const change of [{date:'2026-02-30'},{date:'2026-01-01'},{time:'25:00'},{date:'2027-03-28',time:'01:30',timezone:'Europe/London'},{consent:false},{website:'bot'},{email:'bad@address'},{name:'Alex\r\nInjected'}]) assert.throws(()=>validateDemo(request(change),now()),error=>error.status===400)
})
test('notification recipient is fixed and HTML escapes untrusted content',()=>{
 const mail=buildDemoNotification(validateDemo(request({name:'<script>Alex</script>',message:'<img src=x onerror=alert(1)>',to:'attacker@example.com'}),now()))
 assert.deepEqual(mail.to,['faik@manglo.shop'])
 assert.ok(!mail.html.includes('<script>'))
 assert.ok(mail.html.includes('&lt;img'))
 assert.ok(mail.text.includes('visitor@example.com'))
 assert.ok(mail.text.includes('Asia/Kolkata'))
})
test('provider receives authenticated fixed-recipient notification and accepted replay sends once',async()=>{
 const directory=await temporary();let calls=0
 const submit=createDemoService({directory,now,getToken:()=> 'synthetic-test-token',fetchImpl:async(url,options)=>{
  calls++;assert.ok(url.endsWith('/'+DEFAULT_MAILBOX+'/send'));assert.equal(options.headers.Authorization,'Bearer synthetic-test-token');assert.deepEqual(JSON.parse(options.body).to,['faik@manglo.shop']);return {ok:true}
 }})
 const body=request();const first=await submit(body);assert.deepEqual(await submit(body),first);assert.equal(calls,1)
 await rejectsStatus(submit({...body,message:'Changed project details.'}),409)
 assert.equal(JSON.parse(await readFile(path.join(directory,'requests',body.request_id+'.json'),'utf8')).status,'accepted')
})
test('parallel submissions and ambiguous provider failures never resend automatically',async()=>{
 const directory=await temporary();let release,calls=0
 const submit=createDemoService({directory,now,getToken:()=> 'synthetic-test-token',fetchImpl:async()=>{calls++;await new Promise(resolve=>release=resolve);throw Error('timeout')}})
 const body=request(),pending=submit(body)
 while(!release)await new Promise(resolve=>setTimeout(resolve,5))
 await rejectsStatus(submit(body),409);release();await rejectsStatus(pending,502);await rejectsStatus(submit(body),409);assert.equal(calls,1)
 const record=JSON.parse(await readFile(path.join(directory,'requests',body.request_id+'.json'),'utf8'));assert.equal(record.status,'needs_review')
})
test('unconfigured service stores no contact details and throttles repeated email',async()=>{
 const directory=await temporary()
 await rejectsStatus(createDemoService({directory,now,getToken:()=>''})(request()),503)
 assert.deepEqual(await readdir(directory),[])
 const submit=createDemoService({directory,now,getToken:()=> 'synthetic-test-token',fetchImpl:async()=>({ok:true})})
 for(let index=0;index<3;index++)await submit(request(),'test-ip')
 await rejectsStatus(submit(request(),'test-ip'),429)
})
test('token verification rejects wrong mailbox and accepts exact resource',async()=>{
 await assert.rejects(verifyMailToken('synthetic',{fetchImpl:async()=>({ok:true,json:async()=>({data:{mailboxes:[{address:'other@example.com',resourceId:DEFAULT_MAILBOX}]}})})}),/cannot access/)
 const fetchImpl=async()=>({ok:true,json:async()=>({data:{mailboxes:[{address:'faik@manglo.shop',resourceId:DEFAULT_MAILBOX}]}})})
 assert.equal((await verifyMailToken('synthetic',{fetchImpl})).resourceId,DEFAULT_MAILBOX)
})
test('HTTP endpoint enforces origin, JSON, method and honest setup status',async t=>{
 const directory=await temporary(),handle=createDemoHandler({directory,now,getToken:()=>''})
 const server=http.createServer((req,res)=>handle(req,res));await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));t.after(()=>new Promise(resolve=>server.close(resolve)))
 const url=`http://127.0.0.1:${server.address().port}`
 assert.deepEqual(await (await fetch(url+'/api/demo/health')).json(),{ok:true,mail_configured:false})
 assert.equal((await fetch(url+'/api/demo')).status,405)
 assert.equal((await fetch(url+'/api/demo',{method:'POST',headers:{Origin:'https://attacker.example','Content-Type':'application/json'},body:'{}'})).status,403)
 assert.equal((await fetch(url+'/api/demo',{method:'POST',body:'{}'})).status,415)
 assert.equal((await fetch(url+'/api/demo',{method:'POST',headers:{'Content-Type':'application/json'},body:'{'})).status,400)
 const result=await fetch(url+'/api/demo',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(request())});assert.equal(result.status,503);assert.match((await result.json()).error,/faik@manglo.shop/)
})
