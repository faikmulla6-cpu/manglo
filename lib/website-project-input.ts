import {z} from 'zod';
import {
 WEBSITE_PROJECT_PRIMARY_CTAS,
 WEBSITE_PROJECT_STYLES,
} from './website-project-constants';

const text=(max:number)=>z.string().trim().max(max);
const urlish=(max=500)=>z.string().trim().max(max);

export const WebsiteServiceSchema=z.object({
 id:text(80),
 name:text(120),
 description:text(1000).optional().default(''),
 price:text(120).optional().default(''),
});

export const WebsiteTestimonialSchema=z.object({
 id:text(80),
 quote:text(1200),
 reviewer:text(120).optional().default(''),
});

export const WebsiteProjectDraftSchema=z.object({
 businessName:text(140).nullable().optional(),
 contactPerson:text(120).nullable().optional(),
 category:text(120).nullable().optional(),
 description:text(1400).nullable().optional(),
 phone:text(40).nullable().optional(),
 whatsapp:text(40).nullable().optional(),
 businessEmail:z.union([z.string().trim().email().max(180),z.literal('')]).nullable().optional(),
 existingWebsite:urlish().nullable().optional(),
 instagram:urlish().nullable().optional(),
 facebook:urlish().nullable().optional(),
 socialLinks:z.array(urlish()).max(12).optional(),
 address:text(1000).nullable().optional(),
 city:text(120).nullable().optional(),
 region:text(120).nullable().optional(),
 country:text(120).nullable().optional(),
 mapsUrl:urlish().nullable().optional(),
 noCustomerFacingLocation:z.boolean().optional(),
 openingDays:z.array(text(16)).max(7).optional(),
 openingTime:text(20).nullable().optional(),
 closingTime:text(20).nullable().optional(),
 services:z.array(WebsiteServiceSchema).max(40).optional(),
 pricingNotes:text(2000).nullable().optional(),
 primaryCta:z.union([z.enum(WEBSITE_PROJECT_PRIMARY_CTAS),z.literal('')]).nullable().optional(),
 about:text(3000).nullable().optional(),
 mustInclude:text(2500).nullable().optional(),
 mustAvoid:text(2500).nullable().optional(),
 preferredColors:text(300).nullable().optional(),
 preferredStyle:z.union([z.enum(WEBSITE_PROJECT_STYLES),z.literal('')]).nullable().optional(),
 inspirationSites:z.array(urlish()).max(10).optional(),
 testimonials:z.array(WebsiteTestimonialSchema).max(30).optional(),
 googleBusinessProfile:urlish().nullable().optional(),
 existingDomain:text(240).nullable().optional(),
 domainProvider:text(120).nullable().optional(),
 additionalInstructions:text(3000).nullable().optional(),
 currentStep:z.number().int().min(1).max(6).optional(),
}).strict();

export function assertWebsiteProjectReady(project:{
 businessName:string|null;
 contactPerson:string|null;
 category:string|null;
 phone:string|null;
 whatsapp:string|null;
 services:unknown;
 primaryCta:string|null;
}){
 const missing:string[]=[];
 if(!project.businessName?.trim())missing.push('Business name');
 if(!project.contactPerson?.trim())missing.push('Contact person');
 if(!project.category?.trim())missing.push('Business category');
 if(!project.phone?.trim()&&!project.whatsapp?.trim())missing.push('Phone or WhatsApp');
 const services=Array.isArray(project.services)?project.services:[];
 if(!services.some(item=>Boolean(item)&&typeof item==='object'&&typeof (item as {name?:unknown}).name==='string'&&Boolean((item as {name:string}).name.trim())))missing.push('Main services');
 if(!project.primaryCta?.trim())missing.push('Primary website action');
 return missing;
}
