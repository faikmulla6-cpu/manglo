import readline from 'node:readline'
import {Writable} from 'node:stream'
import {saveMailToken,verifyMailToken} from '../lib/demo-mail-config.mjs'
if (!process.stdin.isTTY) {console.error('Run npm run mail:setup in an interactive terminal. Never paste a token into chat or a command argument.');process.exit(1)}
let muted=false
const output=new Writable({write(chunk,encoding,done){if(!muted) process.stdout.write(chunk);done()}})
const rl=readline.createInterface({input:process.stdin,output,terminal:true})
process.stdout.write('Hostinger Mail API token (input hidden): ');muted=true
rl.question('',async token=>{
  muted=false;rl.close();process.stdout.write('\n')
  try {
    if (!token.trim()) throw new Error('No token entered. Nothing saved.')
    const mailbox=await verifyMailToken(token.trim())
    await saveMailToken(token.trim())
    console.log(`Verified and saved locally for ${mailbox.address}.`)
    console.log('Also add HOSTINGER_MAIL_API_TOKEN in Hostinger environment variables. The local encrypted file is never deployed.')
  } catch(error) {console.error(/^(Hostinger|This token|The verified|No token)/.test(error.message)?error.message:'Verification failed. Check the token and connection. Nothing saved.');process.exitCode=1}
})
