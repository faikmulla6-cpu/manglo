import test from 'node:test';import assert from 'node:assert/strict';import{readFile,stat}from'node:fs/promises';import vm from'node:vm';
const root=new URL('../dist/',import.meta.url);
test('every sitemap route exists and contains a visible heading without JavaScript',async()=>{const xml=await readFile(new URL('sitemap.xml',root),'utf8');const urls=[...xml.matchAll(/<loc>https:\/\/manglo.shop\/(.*?)<\/loc>/g)].map(m=>m[1]);assert.equal(urls.length,23);for(const route of urls){const html=await readFile(new URL(route+'index.html',root),'utf8');assert.match(html,/<h1\b[^>]*>/);assert.ok(html.includes(`href="https://manglo.shop/${route}"`));assert.ok(!html.includes('Cashfree'));}});
test('local links resolve to built files even when cache-busted',async()=>{const html=await readFile(new URL('index.html',root),'utf8');for(const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:\?[^"#]*)?(?:#[^"]*)?"/g)){const target=m[1];await stat(new URL(target.slice(1)+(target.endsWith('/')?'index.html':''),root));}});
test('image geometry preserves proportions, crops correctly and rejects excessive output',async()=>{const source=await readFile(new URL('app.js',root),'utf8');const start=source.indexOf('function draw('),end=source.indexOf('\nfunction encode',start);const operations=[];const sandbox={document:{createElement:()=>({width:0,height:0,getContext:()=>({drawImage:(...args)=>operations.push(args),fillRect(){}})})}};vm.createContext(sandbox);vm.runInContext(source.slice(start,end),sandbox);const bitmap={width:1600,height:1200};let result=sandbox.draw(bitmap,{resize:true,width:1000,height:1000,keep:true});assert.equal(result.width,1000);assert.equal(result.height,750);result=sandbox.draw(bitmap,{crop:true,ratio:1,x:.5,y:.5});assert.equal(result.width,1200);assert.equal(result.height,1200);assert.equal(operations.at(-1)[1],200);assert.throws(()=>sandbox.draw(bitmap,{resize:true,width:10000,height:10000}),/40 megapixels/);});
test('React hero assets are homepage-only while static routes stay independent',async()=>{
  const home=await readFile(new URL('index.html',root),'utf8');
  const tool=await readFile(new URL('tools/image-converter/index.html',root),'utf8');
  assert.match(home,/href="\/hero-2-1\.css\?v=20261106h"/);
  assert.match(home,/src="\/hero-2-1\.js\?v=20261106h"/);
  assert.equal([...home.matchAll(/src="\/hero-2-1\.js/g)].length,1);
  assert.doesNotMatch(tool,/hero-2-1\.(?:js|css)/);
  await stat(new URL('hero-2-1.css',root));
  await stat(new URL('hero-2-1.js',root));
  assert.match(home,/<h1 id="mg-home-title">Make good ideas/);
  assert.match(home,/id="tools"/);
  assert.match(home,/id="manglo-chat-root"/);
  assert.match(home,/MANGLO STUDIO \/ AN EASIER WAY TO WORK/);
  assert.doesNotMatch(home,/class="mg-tool-grid"/);
});
test('browser hero bundle does not depend on Node process environment variables',async()=>{
  const hero=await readFile(new URL('hero-2-1.js',root),'utf8');
  assert.doesNotMatch(hero,/process\.env\./);
});
test('Playbook hub and articles are crawlable, descriptive and linked to real tools',async()=>{
  const hub=await readFile(new URL('playbook/index.html',root),'utf8');
  assert.match(hub,/Explore the field guides/);
  assert.match(hub,/id="pb-grid"/);
  const entries=[...hub.matchAll(/href="(\/playbook\/[^"#]+\/)"/g)].map(x=>x[1]);
  assert.equal(new Set(entries).size,6);
  const pages=['compress-product-images-without-blur','calculate-real-profit-per-order','jpg-png-webp-product-photos','profitable-discount-calculator-guide','phone-product-photography-setup','product-listing-preflight-checklist'];
  for(const slug of pages){
    const html=await readFile(new URL(`playbook/${slug}/index.html`,root),'utf8');
    assert.match(html,/<h1>/);
    assert.match(html,/"@type":"BlogPosting"/);
    assert.match(html,/name="robots" content="index,follow,max-image-preview:large"/);
    assert.match(html,/property="og:image"/);
    assert.match(html,/href="\/tools\//);
    assert.match(html,/<nav aria-label="On this page">/);
    assert.ok(html.length>5000);
  }
});
test('Playbook additions remain independent from the existing seven tools',async()=>{
  const home=await readFile(new URL('index.html',root),'utf8');
  assert.match(home,/class="pb-home-teaser"/);
  assert.match(home,/href="\/playbook\/"/);
  assert.match(home,/<nav class="mg-desktop-nav" aria-label="Main navigation">[\s\S]*?<a href="\/playbook\/">Playbook<\/a>/);
  assert.match(home,/<details class="mg-mobile-menu">[\s\S]*?<a href="\/playbook\/">Playbook/);
  const tool=await readFile(new URL('tools/profit-calculator/index.html',root),'utf8');
  assert.doesNotMatch(tool,/src="\/playbook\.js"/);
  assert.match(tool,/href="\/playbook\/"/);
  assert.match((await readFile(new URL('robots.txt',root),'utf8')),/Sitemap: https:\/\/manglo.shop\/sitemap.xml/);
  assert.match((await readFile(new URL('feed.xml',root),'utf8')),/<rss version="2.0">/);
  const editorial=await readFile(new URL('editorial-standards/index.html',root),'utf8');
  assert.match(editorial,/Ads and editorial independence/);
  assert.doesNotMatch(home,/adsbygoogle|ca-pub-/);
});
test('all seven interactive tools load their client logic; editorial routes do not',async()=>{
  const ids=['image-compressor','image-resizer','image-converter','image-cropper','target-size-compressor','profit-calculator','discount-calculator'];
  for(const id of ids){
    const html=await readFile(new URL(`tools/${id}/index.html`,root),'utf8');
    assert.match(html,/src="\/app\.js\?v=20261106h" defer/);
    assert.match(html,/src="\/experience\.js\?v=20261106h" defer/);
    assert.equal([...html.matchAll(/class="mg-skip"/g)].length,1);
    assert.match(html,/<noscript>/);
  }
  for(const route of ['','about/','contact/','privacy/','playbook/']){
    const html=await readFile(new URL(`${route}index.html`,root),'utf8');
    assert.doesNotMatch(html,/src="\/app\.js/);
    assert.equal([...html.matchAll(/class="mg-skip"/g)].length,1);
    assert.match(html,/class="mg-site-footer"/);
  }
  await stat(new URL('assets/obsidian-hero.webp',root));
});
test('Playbook article reader has vertical navigation and contrast-safe panels',async()=>{
  const css=await readFile(new URL('experience.css',root),'utf8');
  const js=await readFile(new URL('playbook.js',root),'utf8');
  assert.match(css,/\.pb-toc nav\[aria-label="On this page"\]\{display:flex!important;flex-direction:column!important/);
  assert.match(css,/\.pb-article-body \.pb-callout\{background:linear-gradient/);
  assert.match(css,/\.pb-article-body \.pb-equation\{background:linear-gradient/);
  assert.match(css,/\.pb-article-body \.pb-checklist\{background:#151e22!important/);
  assert.match(css,/@media\(max-width:800px\)\{[\s\S]*?\.pb-article-sidebar\{display:block!important/);
  assert.match(js,/setAttribute\('aria-current', 'location'\)/);
  for(const slug of ['compress-product-images-without-blur','calculate-real-profit-per-order','jpg-png-webp-product-photos','profitable-discount-calculator-guide','phone-product-photography-setup','product-listing-preflight-checklist']){
    const html=await readFile(new URL(`playbook/${slug}/index.html`,root),'utf8');
    assert.match(html,/<nav aria-label="On this page">/);
    assert.match(html,/href="\/experience\.css\?v=20261106h"/);
    assert.match(html,/src="\/playbook\.js" defer/);
  }
});
