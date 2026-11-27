import {readFile,writeFile,mkdir,stat} from 'node:fs/promises'
import {execFileSync} from 'node:child_process'
import path from 'node:path'
import os from 'node:os'
import {fileURLToPath} from 'node:url'

export const DEMO_RECIPIENT = 'faik@manglo.shop'
export const DEFAULT_MAILBOX = 'AC0e7a966a7f7d8666eab4e0600058'
const root=path.dirname(fileURLToPath(new URL('../package.json',import.meta.url)))
export const dataDirectory=()=>{
  const fallback=process.env.NODE_ENV==='production'?path.join(os.homedir(),'.manglo','demo'):path.join(root,'private-data','demo')
  const directory=path.resolve(process.env.MANGLO_DATA_DIR || fallback)
  for (const name of ['dist','studio','public_html']) {
    const publicRoot=path.join(root,name)
    if (directory===publicRoot || directory.startsWith(publicRoot+path.sep)) throw new Error('Mail data must be outside public website directories')
  }
  return directory
}
let cached={mtime:0,token:''}

function powershell(command,options={}) {
  return execFileSync('powershell.exe',['-NoProfile','-NonInteractive','-Command',command],{encoding:'utf8',windowsHide:true,stdio:['pipe','pipe','pipe'],...options}).trim()
}

export async function loadMailToken() {
  if (process.env.HOSTINGER_MAIL_API_TOKEN?.trim()) return process.env.HOSTINGER_MAIL_API_TOKEN.trim()
  const file=path.join(dataDirectory(),process.platform==='win32'?'mail-token.dpapi':'mail-token')
  let info
  try {info=await stat(file)} catch {return ''}
  if (cached.mtime===info.mtimeMs && cached.token) return cached.token
  try {
    const token=process.platform==='win32'
      ? powershell('Add-Type -AssemblyName System.Security; $b=[Convert]::FromBase64String([IO.File]::ReadAllText($env:MANGLO_TOKEN_FILE)); [Console]::Out.Write([Text.Encoding]::UTF8.GetString([Security.Cryptography.ProtectedData]::Unprotect($b,$null,[Security.Cryptography.DataProtectionScope]::CurrentUser)))',{env:{...process.env,MANGLO_TOKEN_FILE:file}})
      : (await readFile(file,'utf8')).trim()
    cached={mtime:info.mtimeMs,token}
    return token
  } catch {return ''}
}

export async function saveMailToken(token) {
  const directory=dataDirectory()
  await mkdir(directory,{recursive:true,mode:0o700})
  if (process.platform==='win32') {
    const encrypted=powershell('Add-Type -AssemblyName System.Security; $s=[Console]::In.ReadToEnd(); $b=[Text.Encoding]::UTF8.GetBytes($s); [Console]::Out.Write([Convert]::ToBase64String([Security.Cryptography.ProtectedData]::Protect($b,$null,[Security.Cryptography.DataProtectionScope]::CurrentUser)))',{input:token})
    await writeFile(path.join(directory,'mail-token.dpapi'),encrypted,{mode:0o600})
  } else {
    await writeFile(path.join(directory,'mail-token'),token,{mode:0o600})
  }
  cached={mtime:0,token:''}
}

export function mailboxId() {
  const id=process.env.HOSTINGER_MAILBOX_RESOURCE_ID?.trim() || DEFAULT_MAILBOX
  if (!/^AC[a-zA-Z0-9]+$/.test(id)) throw new Error('Invalid mailbox configuration')
  return id
}

export async function verifyMailToken(token,{fetchImpl=fetch}={}) {
  const response=await fetchImpl('https://api.mail.hostinger.com/api/v1/me',{headers:{Authorization:`Bearer ${token}`,Accept:'application/json'},signal:AbortSignal.timeout(15000)})
  if (!response.ok) throw new Error(`Hostinger rejected the token (HTTP ${response.status}). Check that it is a Mail API token, not a hosting API token.`)
  const result=await response.json()
  const mailbox=result.data?.mailboxes?.find(item=>item.address?.toLowerCase()===DEMO_RECIPIENT)
  if (!mailbox) throw new Error(`This token cannot access ${DEMO_RECIPIENT}. Select that mailbox when creating the token.`)
  if (mailbox.resourceId!==mailboxId()) throw new Error('The verified mailbox ID does not match HOSTINGER_MAILBOX_RESOURCE_ID. Check the server configuration.')
  return {address:mailbox.address,resourceId:mailbox.resourceId}
}
