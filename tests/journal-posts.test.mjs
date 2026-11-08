import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { deflateSync } from 'node:zlib';
import { articleText, renderArticleBlocks, imageDimensions, validatePost, loadJournalPosts } from '../scripts/journal-posts.mjs';

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const b of buffer) {
    crc ^= b;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const tag = Buffer.from(type), len = Buffer.alloc(4), crc = Buffer.alloc(4);
  len.writeUInt32BE(data.length); crc.writeUInt32BE(crc32(Buffer.concat([tag, data])));
  return Buffer.concat([len, tag, data, crc]);
}

function png(width, height) {
  const row = width * 3 + 1;
  const raw = Buffer.alloc(row * height);
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const i = y * row + 1 + x * 3;
    raw[i] = (x * 7 + y) % 256; raw[i + 1] = (x + y * 5) % 256; raw[i + 2] = (x ^ y) % 256;
  }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4); ihdr[8] = 8; ihdr[9] = 2;
  return Buffer.concat([
    Buffer.from([137,80,78,71,13,10,26,10]), pngChunk('IHDR', ihdr),
    pngChunk('IDAT', deflateSync(raw)), pngChunk('IEND', Buffer.alloc(0))
  ]);
}

const sample = () => ({
  status:'review', author:'Manglo Editorial', category:'ai', slug:'careful-ai-photo-workflows',
  publishedAt:'2026-11-09', title:'How to check an AI-assisted image workflow before sharing',
  summary:'A practical guide for Indian creators who want to check an AI-assisted image result for accuracy and privacy before sharing it.',
  blocks:[
    {type:'heading',text:'Start with the purpose'},
    {type:'paragraph',text:Array.from({length:80},()=> 'Consider whether this image actually answers a reader question before you publish it.').join(' ')},
    {type:'heading',text:'Verify the changes'},
    {type:'paragraph',text:Array.from({length:85},()=> 'Compare the original and edited version and look for unintended visual changes.').join(' ')},
    {type:'list',items:['Keep the source image and permissions with the working record.','Show uncertainty and avoid making claims about a real event.']}
  ],
  sources:[
    {id:'first',title:'Original official documentation',publisher:'Official publisher',url:'https://example.org/reference',checkedAt:'2026-11-09'},
    {id:'second',title:'Independent technical reference',publisher:'Another publisher',url:'https://example.com/guide',checkedAt:'2026-11-09'}
  ],
  claims:[{text:'Claim one',verified:true,sourceIds:['first']},{text:'Claim two',verified:true,sourceIds:['second']}],
  image:{rightsType:'original',rightsEvidence:'Synthetic test fixture, not for real publication',path:'/assets/journal/sample.png',alt:'Original test illustration of an image workflow',width:1600,height:900},
  seo:{description:'Learn a transparent and repeatable way to check AI-assisted image edits, with source review, privacy checks, and realistic limits.',canonical:'/journal/careful-ai-photo-workflows/'},
  originalValue:'An original decision process and repeatable checklist for verifying an edited image before it is released.',
  aiDisclosure:'This is a synthetic test fixture; no genuine article has been published.',
  review:{accuracy:true,originality:true,rights:true,readerValue:true,risk:true,advertising:true,accessibility:true,technical:true}
});

test('article content blocks escape HTML and reject arbitrary markup',()=>{
  assert.match(renderArticleBlocks([{type:'paragraph',text:'A <script> should stay text'}]),/&lt;script&gt;/);
  assert.throws(()=>articleText([{type:'html',content:'<script>alert(1)</script>'}]),/Five or more/);
});

test('thumbnail parser reads real image metadata',()=>{
  assert.deepEqual(imageDimensions(png(1600,900)),{width:1600,height:900});
});

test('only complete approved editorial packages become candidate Journal pages',async()=>{
  const root=await mkdtemp(join(tmpdir(),'manglo-posts-'));
  try {
    const publicRoot=join(root,'dist'), directory=join(root,'posts');
    await mkdir(join(publicRoot,'assets','journal'),{recursive:true}); await mkdir(directory);
    await writeFile(join(publicRoot,'assets','journal','sample.png'),png(1600,900));
    const original=sample();
    const validated=await validatePost(original,{now:new Date('2026-11-09T12:00:00Z'),publicRoot});
    assert.equal(validated.report.pass,true);
    await writeFile(join(directory,'sample.json'),JSON.stringify(original));
    const posts=await loadJournalPosts({directory,publicRoot,now:new Date('2026-11-09T12:00:00Z')});
    assert.equal(posts.length,1); assert.equal(posts[0].slug,'careful-ai-photo-workflows');
    const invalid=sample();invalid.claims[0].verified=false;
    await assert.rejects(validatePost(invalid,{now:new Date('2026-11-09T12:00:00Z'),publicRoot}),/Editorial gates failed/);
    const historicTrend=sample();historicTrend.category='trends';historicTrend.review.humanSpecialist=true;
    const historic=await validatePost(historicTrend,{now:new Date('2026-12-01T12:00:00Z'),publicRoot});
    assert.equal(historic.report.pass,true,'old, reviewed trend articles should not break later site rebuilds');
    await writeFile(join(directory,'duplicate.json'),JSON.stringify(original));
    await assert.rejects(loadJournalPosts({directory,publicRoot,now:new Date('2026-11-09T12:00:00Z')}),/duplicate Journal slug/);
    assert.ok((await readFile(join(publicRoot,'assets','journal','sample.png'))).length > 1024);
  } finally { await rm(root,{recursive:true,force:true}); }
});
