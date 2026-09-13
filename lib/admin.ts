import {notFound,redirect} from 'next/navigation';
import {getUser} from './auth';

function adminEmailSet(){
 return new Set((process.env.ADMIN_EMAILS||'').split(',').map(value=>value.trim().toLowerCase()).filter(Boolean));
}

export function isAdminEmail(email?:string|null){
 if(!email)return false;
 return adminEmailSet().has(email.trim().toLowerCase());
}

export async function requireAdmin(){
 const user=await getUser();
 if(!user)redirect('/auth?next=%2Fadmin');
 if(!isAdminEmail(user.email))notFound();
 return user;
}

export function adminConfigured(){return adminEmailSet().size>0}
