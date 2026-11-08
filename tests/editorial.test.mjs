import test from 'node:test';
import assert from 'node:assert/strict';
import { assessDraft } from '../scripts/editorial-check.mjs';

const fixture=()=>({status:'draft',author:'Manglo Editorial',category:'practical',slug:'example-guide',title:'A practical example of checking a file format',summary:'An original, detailed guide to a repeatable file-format workflow for people who need to upload photos.',body:Array.from({length:65},()=> 'Explain the task, show an example, consider limitations and verify the output carefully.').join(' '),sources:[{id:'one',title:'Official documentation',publisher:'Example organization',url:'https://example.org/doc',checkedAt:'2026-11-08'},{id:'two',title:'Another document',publisher:'Different organization',url:'https://example.com/doc',checkedAt:'2026-11-08'}],claims:[{text:'Claim 1',sourceIds:['one'],verified:true},{text:'Claim 2',sourceIds:['two'],verified:true}],image:{rightsType:'original',rightsEvidence:'Test illustration asset record',path:'/assets/example.webp',alt:'Example workflow',width:1600,height:900},seo:{description:'A clear example demonstrating an image format decision with documented sources and checks.',canonical:'/journal/example-guide/'},originalValue:'An original worked example, decision process and validation checklist that readers can reproduce.',aiDisclosure:'No AI assistance in the simulated test item.',review:{accuracy:true,originality:true,rights:true,readerValue:true,risk:true,advertising:true,accessibility:true,technical:true}});

test('all-pass fixture only reaches owner-review stage',()=>{const r=assessDraft(fixture(),new Date('2026-11-08T10:00:00Z'));assert.equal(r.decision,'READY_FOR_OWNER_REVIEW');assert.equal(r.published,false);});
test('unverified claims, rights or authorship block publication',()=>{const d=fixture();d.author='Invented Expert';d.image.rightsEvidence='';d.claims[0].sourceIds=['missing'];const r=assessDraft(d);assert.equal(r.decision,'SKIP_PUBLICATION');assert.ok(r.failures.some(f=>f.gate==='image_rights'));assert.ok(r.failures.some(f=>f.gate==='fact_check'));assert.ok(r.notification.includes('No article went live'));});
test('stale trends and missing specialist review block publication',()=>{const d=fixture();d.category='trends';d.sources.forEach(s=>s.checkedAt='2026-10-20');const r=assessDraft(d,new Date('2026-11-08T10:00:00Z'));assert.ok(r.failures.some(f=>f.gate==='freshness'));assert.ok(r.failures.some(f=>f.gate==='human_review'));});
test('fabricated, malformed or future source check dates cannot satisfy fact checking',()=>{
  for (const invalidDate of ['2026-11-31','2026-13-08','2026-11-09']) {
    const draft=fixture();draft.sources[0].checkedAt=invalidDate;
    const report=assessDraft(draft,new Date('2026-11-08T10:00:00Z'));
    assert.equal(report.decision,'SKIP_PUBLICATION');
    assert.ok(report.failures.some(f=>f.gate==='sources'));
    assert.ok(report.failures.some(f=>f.gate==='fact_check'));
  }
});
