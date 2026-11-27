import {randomUUID} from 'node:crypto'
import {loadMailToken,verifyMailToken,DEMO_RECIPIENT} from '../lib/demo-mail-config.mjs'
import {createDemoService} from '../lib/demo-mail.mjs'
try {
  const token=await loadMailToken()
  if(!token) throw new Error('Set HOSTINGER_MAIL_API_TOKEN or run npm run mail:setup first.')
  await verifyMailToken(token)
  const future=new Date(Date.now()+86400000)
  const result=await createDemoService()({name:'Manglo setup test',email:DEMO_RECIPIENT,company:'Manglo Studio',message:'SETUP TEST: verifies demo-request notification delivery. No real meeting requested.',date:future.toISOString().slice(0,10),time:'18:00',timezone:'Asia/Kolkata',consent:true,request_id:randomUUID()},'setup-test')
  console.log(`Hostinger accepted the test for ${DEMO_RECIPIENT}. Reference: ${result.reference}. Check the inbox to confirm receipt.`)
} catch(error) {console.error(error.message.startsWith('Set ')||error.status?error.message:'Mail test failed. Check token permissions and server configuration.');process.exitCode=1}
