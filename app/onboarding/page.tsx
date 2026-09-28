import {redirect} from 'next/navigation';
import {getUser} from '@/lib/auth';

export const metadata={title:'Website onboarding',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';

export default async function WebsiteOnboardingEntry(){
 const user=await getUser();
 if(!user)redirect('/auth?mode=signup&next=%2Fprojects%2Fnew');
 redirect('/projects/new');
}
