import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { journalSections } from '../content/journal.mjs';

const dist=new URL('../dist/',import.meta.url);
test('Journal is a substantial accessible editorial hub in the sitemap',async()=>{
  const html=await readFile(new URL('journal/index.html',dist),'utf8');
  const sitemap=await readFile(new URL('sitemap.xml',dist),'utf8');
  assert.match(html,/Clarity for a/);
  assert.match(html,/Manglo Editorial/);
  assert.match(html,/"@type":"CollectionPage"/);
  assert.match(html,/name="robots" content="index,follow,max-image-preview:large"/);
  assert.match(sitemap,/<loc>https:\/\/manglo.shop\/journal\/<\/loc>/);
  assert.match(html,/href="\/journal\/ai\/"/);
  await stat(new URL('journal.css',dist));
});
test('Five categories are navigable but noindex while waiting for verified articles',async()=>{
  const sitemap=await readFile(new URL('sitemap.xml',dist),'utf8');
  assert.equal(journalSections.length,5);
  for(const section of journalSections){
    const route=`journal/${section.slug}/`;
    const html=await readFile(new URL(route+'index.html',dist),'utf8');
    assert.match(html,/<h1>/);
    assert.match(html,/name="robots" content="noindex,follow"/);
    assert.match(html,/Research and review phase/);
    assert.ok(!sitemap.includes(`https://manglo.shop/${route}`));
  }
});
test('Header, footer and mobile menu link to Journal',async()=>{
  for(const route of ['','playbook/','tools/profit-calculator/']){
    const html=await readFile(new URL(`${route}index.html`,dist),'utf8');
    assert.match(html,/<nav class="mg-desktop-nav"[^>]+>[\s\S]*?href="\/journal\/"/);
    assert.match(html,/<details class="mg-mobile-menu">[\s\S]*?href="\/journal\/"/);
  }
});
