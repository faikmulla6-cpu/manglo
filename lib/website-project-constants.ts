export const WEBSITE_PROJECT_ASSET_BUCKET='website-project-assets';
export const WEBSITE_PROJECT_MAX_FILE_BYTES=6*1024*1024;
export const WEBSITE_PROJECT_MAX_ASSETS=60;

export const WEBSITE_PROJECT_STATUS=[
 'DRAFT',
 'INFORMATION_RECEIVED',
 'DESIGN_DEVELOPMENT',
 'CLIENT_REVIEW',
 'FINAL_CHANGES',
 'READY_TO_LAUNCH',
 'LIVE',
] as const;

export const WEBSITE_PROJECT_STATUS_LABELS:Record<(typeof WEBSITE_PROJECT_STATUS)[number],string>={
 DRAFT:'Onboarding in progress',
 INFORMATION_RECEIVED:'Information Received',
 DESIGN_DEVELOPMENT:'Design & Development',
 CLIENT_REVIEW:'Client Review',
 FINAL_CHANGES:'Final Changes',
 READY_TO_LAUNCH:'Ready to Launch',
 LIVE:'Live',
};

export const WEBSITE_PROJECT_PRIMARY_CTAS=[
 'WhatsApp','Call','Book Appointment','Request Quote','Visit Store','Buy Product','Contact Form',
] as const;

export const WEBSITE_PROJECT_STYLES=[
 'Premium / Luxury','Modern / Minimal','Bold','Elegant','Friendly','Corporate','You decide for me',
] as const;

export const WEBSITE_PROJECT_ASSET_KINDS=[
 'LOGO','BUSINESS_PHOTO','WORK_PHOTO','DOCUMENT',
] as const;

export const WEBSITE_PROJECT_ASSET_LABELS:Record<(typeof WEBSITE_PROJECT_ASSET_KINDS)[number],string>={
 LOGO:'Logo',
 BUSINESS_PHOTO:'Business / shop photos',
 WORK_PHOTO:'Work / product / service photos',
 DOCUMENT:'Menu / price list / brochure',
};
