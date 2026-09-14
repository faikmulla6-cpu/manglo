import crypto from 'crypto';

export class CompromisedPasswordError extends Error {
  constructor(){super('Choose a password that has not appeared in known data breaches.');this.name='CompromisedPasswordError'}
}

export class PasswordSecurityUnavailableError extends Error {
  constructor(){super('Password security verification is temporarily unavailable. Please try again shortly.');this.name='PasswordSecurityUnavailableError'}
}

export function validatePasswordShape(password:string){
  if(password.length<12||password.length>128)throw new Error('PASSWORD_LENGTH');
  if(/^\s+$/.test(password))throw new Error('PASSWORD_WEAK');
}

export async function assertPasswordNotCompromised(password:string){
  validatePasswordShape(password);
  const hash=crypto.createHash('sha1').update(password,'utf8').digest('hex').toUpperCase();
  const prefix=hash.slice(0,5),suffix=hash.slice(5);
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),4_000);
  try{
    const response=await fetch(`https://api.pwnedpasswords.com/range/${prefix}`,{
      headers:{'User-Agent':'MANGLO-Password-Security/1.0','Add-Padding':'true'},
      cache:'no-store',
      signal:controller.signal,
    });
    if(!response.ok)throw new PasswordSecurityUnavailableError();
    const body=await response.text();
    const compromised=body.split(/\r?\n/).some(line=>{
      const [candidate,count]=line.split(':');
      return candidate?.trim().toUpperCase()===suffix&&Number(count)>0;
    });
    if(compromised)throw new CompromisedPasswordError();
  }catch(error){
    if(error instanceof CompromisedPasswordError||error instanceof PasswordSecurityUnavailableError)throw error;
    throw new PasswordSecurityUnavailableError();
  }finally{clearTimeout(timer)}
}
