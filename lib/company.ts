const value=(key:string,fallback:string)=>process.env[key]?.trim()||fallback;
export const company={
  legalName:value('NEXT_PUBLIC_LEGAL_NAME','MANGLO'),
  supportEmail:value('NEXT_PUBLIC_SUPPORT_EMAIL','support@manglo.shop'),
  supportPhone:value('NEXT_PUBLIC_SUPPORT_PHONE',''),
  address:value('NEXT_PUBLIC_BUSINESS_ADDRESS',''),
  supportHours:value('NEXT_PUBLIC_SUPPORT_HOURS','Monday–Saturday, 10:00 AM–7:00 PM IST'),
  effectiveDate:value('NEXT_PUBLIC_POLICY_EFFECTIVE_DATE','12 September 2026'),
};
