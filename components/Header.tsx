import {getUser} from '@/lib/auth';
import {isAdminEmail} from '@/lib/admin';
import HeaderNav from './HeaderNav';

export default async function Header(){
 const user=await getUser().catch(()=>null);
 const admin=isAdminEmail(user?.email);
 return <HeaderNav signedIn={Boolean(user)} admin={admin}/>;
}
