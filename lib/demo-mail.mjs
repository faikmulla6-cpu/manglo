import {createHash,createHmac,randomBytes,randomUUID} from 'node:crypto'
import {mkdir,readFile,writeFile,rename,readdir,unlink,stat} from 'node:fs/promises'
import path from 'node:path'
import {DEMO_RECIPIENT,dataDirectory,loadMailToken,mailboxId} from './demo-mail-config.mjs'

const zones=new Set(['Europe/London','Asia/Kolkata','Europe/Dublin','Europe/Paris','America/New_York','America/Los_Angeles','Asia/Dubai','Australia/Sydney'])
export class DemoError extends Error { constructor(status,message){super(message);this.status=status} }
const fail=(message)=>{throw new DemoError(400,message)}
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))

function localParts(instant,zone) {
  return Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date(instant)).filter(p=>p.type!=='literal').map(p=>[p.type,p.value]))
}

export function validateDemo(body,now=Date.now()) {
  if (!body || typeof body!=='object' || Array.isArray(body)) fail('Please send a valid demo request.')
  if (body.website) fail('Your request could not be submitted.')
  const result={}
  for (const [key,min,max] of [['name',2,100],['email',5,254],['company',0,160],['message',10,4000],['date',10,10],['time',5,5],['timezone',1,80],['request_id',36,36]]) {
    const value=body[key] ?? ''
    if (typeof value!=='string' || value.trim().length<min || value.trim().length>max || value.includes('\0')) fail(`Please check the ${key.replace('_',' ')} field.`)
    result[key]=value.trim()
  }
  if (!/^[^@\s<>,;]+@[^@\s<>,;]+\.[^@\s<>,;]+$/.test(result.email)) fail('Please enter a valid email address.')
  if (['name','email','company'].some(key=>/[\r\n]/.test(result[key]))) fail('Name, email, and business name must each be on one line.')
  if (body.consent!==true) fail('Please agree to be contacted about this request.')
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(result.request_id)) fail('Please reload the page and try again.')
  if (!zones.has(result.timezone) || !/^\d{4}-\d{2}-\d{2}$/.test(result.date) || !/^\d{2}:\d{2}$/.test(result.time)) fail('Please enter a valid date, time, and timezone.')
  const [year,month,day]=result.date.split('-').map(Number),[hour,minute]=result.time.split(':').map(Number)
  if (hour>23 || minute>59 || month<1 || month>12 || day<1 || day>31) fail('Please enter a valid date and time.')
  const wall=Date.UTC(year,month-1,day,hour,minute)
  let instant=wall
  for (let index=0;index<3;index++) {
    const p=localParts(instant,result.timezone)
    instant+=wall-Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute)
  }
  const p=localParts(instant,result.timezone)
  if (`${p.year}-${p.month}-${p.day}`!==result.date || `${p.hour}:${p.minute}`!==result.time) fail('That date or local time is not valid. Please choose another time.')
  if (instant<=now) fail('Please choose a future date and time.')
  result.requested_utc=new Date(instant).toISOString()
  result.consent=true
  return result
}

export function buildDemoNotification(data) {
  const reference=data.request_id.slice(0,8)
  const text=`New Manglo Studio demo request\nReference: ${reference}\n\nName: ${data.name}\nEmail: ${data.email}\nBusiness: ${data.company||'Not supplied'}\n\nPreferred date: ${data.date}\nPreferred time: ${data.time}\nTimezone: ${data.timezone}\nUTC: ${data.requested_utc}\n\nProject message:\n${data.message}\n\nVisitor agreed to contact about this request. Reply directly to ${data.email} to arrange the demo. The requested time is a preference, not a calendar booking.`
  const html=`<!doctype html><html><body style="margin:0;background:#f0f4fa;font-family:Arial,sans-serif;color:#173252"><table role="presentation" style="width:100%;padding:35px 15px"><tr><td align="center"><table role="presentation" style="width:100%;max-width:600px;background:#fff;border:1px solid #dce5f1;border-radius:14px"><tr><td style="padding:28px;background:#10223e;color:white;border-radius:14px 14px 0 0"><small>MANGLO STUDIO · DEMO ENQUIRY</small><h1 style="font-size:25px;margin:16px 0 5px">A new conversation starts here.</h1><p style="color:#b4ccf2;font-size:13px">Reference ${escape(reference)}</p></td></tr><tr><td style="padding:28px"><h2 style="font-size:19px">${escape(data.name)}</h2><p><a href="mailto:${encodeURIComponent(data.email)}">${escape(data.email)}</a><br>${escape(data.company||'Business not supplied')}</p><hr style="border:0;border-top:1px solid #e1e8f2"><h3 style="font-size:15px">Preferred availability</h3><p>${escape(data.date)} at ${escape(data.time)}<br>${escape(data.timezone)}<br><small>UTC: ${escape(data.requested_utc)}</small></p><h3 style="font-size:15px">Their project</h3><p style="white-space:pre-wrap;line-height:1.7">${escape(data.message)}</p><p style="font-size:12px;color:#647b99">The visitor agreed to be contacted about this request. Reply to their email above to confirm a time. No calendar slot has been reserved.</p></td></tr></table></td></tr></table></body></html>`
  return {to:[DEMO_RECIPIENT],displayName:'Manglo Studio enquiries',subject:`New Manglo Studio demo request [${reference}]`,text,html}
}

async function atomicRecord(file,record) {
  const temporary=file+'.'+randomUUID()+'.tmp'
  await writeFile(temporary,JSON.stringify(record),{mode:0o600})
  await rename(temporary,file)
}

export function createDemoService({directory=dataDirectory(),getToken=loadMailToken,fetchImpl=fetch,now=Date.now}={}) {
  const records=path.join(directory,'requests'),rates=new Map(),salt=randomBytes(32)
  let cleanupAt=0
  return async function submit(body,ip='unknown') {
    const data=validateDemo(body,now())
    const token=await getToken()
    if (!token) throw new DemoError(503,`The demo form is temporarily unavailable. Please email ${DEMO_RECIPIENT} with your message and availability.`)
    await mkdir(records,{recursive:true,mode:0o700})
    if (now()-cleanupAt>3600000) {
      cleanupAt=now()
      for (const file of await readdir(records)) if (/^[0-9a-f-]{36}\.json$/.test(file)) {
        const target=path.join(records,file)
        try {if ((await stat(target)).mtimeMs<now()-90*86400000) await unlink(target)} catch {}
      }
    }
    const file=path.join(records,data.request_id+'.json')
    const digest=createHash('sha256').update(JSON.stringify(data)).digest('hex')
    const key=value=>createHmac('sha256',salt).update(value).digest('hex')
    for (const [id,rate] of rates) if (now()-rate.start>600000) rates.delete(id)
    const limits=[[key(ip),5],[key(data.email.toLowerCase()),3]]
    // Replays are resolved before consuming another rate-limit slot.
    try {
      const previous=JSON.parse(await readFile(file,'utf8'))
      if (previous.digest!==digest) throw new DemoError(409,'This request changed. Reload the page before submitting again.')
      if (previous.status==='accepted') return {reference:data.request_id.slice(0,8)}
      throw new DemoError(409,`This request is already processing or needs delivery review. Please email ${DEMO_RECIPIENT} and mention reference ${data.request_id.slice(0,8)}.`)
    } catch(error) {if (error.code!=='ENOENT') throw error}
    if (limits.some(([id,max])=>(rates.get(id)?.count||0)>=max)) throw new DemoError(429,`Too many requests. Please wait a few minutes or email ${DEMO_RECIPIENT}.`)
    const record={digest,status:'sending',created:new Date(now()).toISOString(),payload:data}
    try {await writeFile(file,JSON.stringify(record),{flag:'wx',mode:0o600})}
    catch(error) {if (error.code==='EEXIST') throw new DemoError(409,'This request is already processing. Please wait before submitting again.');throw error}
    for (const [id] of limits) {const rate=rates.get(id)||{start:now(),count:0};rates.set(id,{...rate,count:rate.count+1})}
    try {
      const response=await fetchImpl(`https://api.mail.hostinger.com/api/v1/mailboxes/${mailboxId()}/send`,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(buildDemoNotification(data)),signal:AbortSignal.timeout(25000)})
      if (!response.ok) throw new Error('Provider did not accept the request')
    } catch {
      record.status='needs_review'
      await atomicRecord(file,record)
      throw new DemoError(502,`We couldn’t confirm delivery. Please email ${DEMO_RECIPIENT} and mention reference ${data.request_id.slice(0,8)}.`)
    }
    record.status='accepted';await atomicRecord(file,record)
    return {reference:data.request_id.slice(0,8)}
  }
}

export function createDemoHandler(options={}) {
  const submit=createDemoService(options)
  return async function handle(req,res) {
    const url=new URL(req.url,'http://localhost')
    const json=(status,body)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(body))}
    if (url.pathname==='/api/demo/health') {json(200,{ok:true,mail_configured:Boolean(await (options.getToken||loadMailToken)())});return true}
    if (url.pathname!=='/api/demo') return false
    if (req.method!=='POST') {res.setHeader('Allow','POST');json(405,{error:'Please use the website demo form.'});return true}
    try {
      const port=req.socket.localPort
      const origins=new Set(['https://manglo.shop','https://www.manglo.shop',`http://localhost:${port}`,`http://127.0.0.1:${port}`])
      if (process.env.MANGLO_PUBLIC_ORIGIN) origins.add(new URL(process.env.MANGLO_PUBLIC_ORIGIN).origin)
      if (req.headers.origin && !origins.has(req.headers.origin)) throw new DemoError(403,'Please submit from the Manglo website.')
      if (req.headers['content-type']?.split(';')[0].trim()!=='application/json') throw new DemoError(415,'Please use the website form.')
      if (Number(req.headers['content-length'])>16000) throw new DemoError(413,'The request is too large.')
      const chunks=[];let size=0
      for await (const chunk of req) {size+=chunk.length;if (size>16000) throw new DemoError(413,'The request is too large.');chunks.push(chunk)}
      let body
      try {body=JSON.parse(Buffer.concat(chunks).toString('utf8'))} catch {throw new DemoError(400,'Please send a valid demo request.')}
      // Do not trust visitor-supplied X-Forwarded-For for rate limiting.
      json(200,await submit(body,req.socket.remoteAddress||'unknown'))
    } catch(error) {json(error instanceof DemoError?error.status:500,{error:error instanceof DemoError?error.message:`Your request could not be processed. Please email ${DEMO_RECIPIENT}.`})}
    return true
  }
}
