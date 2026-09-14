import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const fail=[];
const note=[];
const sourceRoots=['app','components','lib'];
const textExt=new Set(['.ts','.tsx','.js','.jsx','.mjs','.css','.html','.md']);

function exists(rel){return fs.existsSync(path.join(root,rel));}
function walk(rel){
  const abs=path.join(root,rel);
  if(!fs.existsSync(abs))return [];
  const out=[];
  for(const entry of fs.readdirSync(abs,{withFileTypes:true})){
    const child=path.join(rel,entry.name);
    if(entry.isDirectory())out.push(...walk(child));
    else out.push(child.replaceAll('\\','/'));
  }
  return out;
}
function checkPng(rel){
  if(!exists(rel)){fail.push(`Missing required asset: ${rel}`);return;}
  const data=fs.readFileSync(path.join(root,rel));
  const sig='89504e470d0a1a0a';
  if(data.length<24||data.subarray(0,8).toString('hex')!==sig){
    fail.push(`Invalid PNG file: ${rel}`);return;
  }
  const width=data.readUInt32BE(16),height=data.readUInt32BE(20);
  if(!width||!height)fail.push(`Invalid PNG dimensions: ${rel}`);
  else note.push(`${rel}: ${width}x${height}, ${Math.round(data.length/1024)} KiB`);
}

checkPng('public/manglo-icon.png');
checkPng('public/manglo-logo.png');

const requiredPages=[
  'app/page.tsx','app/services/page.tsx','app/auth/page.tsx','app/auth/forgot/page.tsx',
  'app/auth/update-password/page.tsx','app/dashboard/page.tsx','app/order/page.tsx','app/invite/page.tsx',
  'app/about/page.tsx','app/trust/page.tsx','app/contact/page.tsx','app/privacy/page.tsx',
  'app/terms/page.tsx','app/refund/page.tsx'
];
const requiredApis=[
  'app/api/health/route.ts','app/api/auth/login/route.ts','app/api/auth/register/route.ts',
  'app/api/auth/logout/route.ts','app/api/auth/forgot-password/route.ts','app/api/auth/update-password/route.ts',
  'app/api/payments/create/route.ts','app/api/payments/reconcile/route.ts','app/api/payments/verify/route.ts',
  'app/api/payments/webhook/route.ts','app/api/orders/create/route.ts','app/api/orders/status/route.ts',
  'app/api/orders/reconcile/route.ts','app/api/services/route.ts','app/api/services/sync/route.ts',
  'app/api/support/route.ts','app/api/profile/route.ts','app/api/order-draft/route.ts'
];
for(const rel of [...requiredPages,...requiredApis])if(!exists(rel))fail.push(`Missing required route file: ${rel}`);

const files=sourceRoots.flatMap(walk).filter(rel=>textExt.has(path.extname(rel)));
const assetPattern=/\/(?:[A-Za-z0-9_.-]+\/)*[A-Za-z0-9_.-]+\.(?:png|jpe?g|webp|svg)(?:\?[^\s'"`)]+)?/gi;
for(const rel of files){
  const text=fs.readFileSync(path.join(root,rel),'utf8');
  if(text.includes('manglo-hero-art.png'))fail.push(`Forbidden asset reference in ${rel}: manglo-hero-art.png`);
  for(const match of text.matchAll(assetPattern)){
    const pathname=match[0].split('?')[0];
    const local=`public${pathname}`;
    if(!exists(local))fail.push(`Missing static asset referenced by ${rel}: ${pathname}`);
  }
}

// Guard the expected MANGLO asset roles so accidental swaps fail CI.
const dashboardPolish=exists('app/dashboard/dashboard-polish.css')?fs.readFileSync(path.join(root,'app/dashboard/dashboard-polish.css'),'utf8'):'';
if(!dashboardPolish.includes("manglo-logo.png"))fail.push('Dashboard hero must reference public/manglo-logo.png');
const brandFiles=['components/Header.tsx','components/Footer.tsx','app/layout.tsx'];
for(const rel of brandFiles){
  if(!exists(rel)||!fs.readFileSync(path.join(root,rel),'utf8').includes('manglo-icon.png')){
    fail.push(`${rel} must reference public/manglo-icon.png`);
  }
}

if(fail.length){
  console.error('\nMANGLO surface verification FAILED');
  for(const item of [...new Set(fail)])console.error(`- ${item}`);
  process.exit(1);
}
console.log('MANGLO surface verification passed.');
for(const item of note)console.log(`- ${item}`);
console.log(`- ${requiredPages.length} core pages checked`);
console.log(`- ${requiredApis.length} critical API routes checked`);
console.log(`- ${files.length} source files scanned for static asset integrity`);
