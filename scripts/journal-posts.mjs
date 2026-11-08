import { readFile, readdir } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assessDraft } from './editorial-check.mjs';

const postsDirectory = fileURLToPath(new URL('../content/journal-posts/', import.meta.url));
const siteDirectory = fileURLToPath(new URL('../dist/', import.meta.url));
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const validDate = value => datePattern.test(value || '') && Number.isFinite(Date.parse(value + 'T00:00:00Z')) && new Date(value + 'T00:00:00Z').toISOString().slice(0,10) === value;
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

// Only structured, plain-text blocks are accepted: no arbitrary HTML or
// JavaScript can enter published articles through editorial JSON.
export function articleText(blocks) {
  if (!Array.isArray(blocks) || blocks.length < 5) throw Error('Five or more structured content blocks required');
  let headings = 0;
  const text = blocks.map(block => {
    if (block?.type === 'heading' && typeof block.text === 'string' && block.text.trim()) {
      headings += 1;
      return block.text.trim();
    }
    if (block?.type === 'paragraph' && typeof block.text === 'string' && block.text.trim()) return block.text.trim();
    if (block?.type === 'list' && Array.isArray(block.items) && block.items.length >= 2 && block.items.every(v => typeof v === 'string' && v.trim())) return block.items.join(' ');
    throw Error('Invalid article block; use heading, paragraph or list with plain text');
  }).join(' ');
  if (headings < 2) throw Error('At least two descriptive section headings required');
  return text;
}

export function renderArticleBlocks(blocks) {
  let headingIndex = 0;
  return blocks.map(block => {
    if (block.type === 'heading') return `<h2 id="section-${++headingIndex}">${escapeHTML(block.text)}</h2>`;
    if (block.type === 'paragraph') return `<p>${escapeHTML(block.text)}</p>`;
    return `<ul>${block.items.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul>`;
  }).join('\n');
}

export function imageDimensions(data) {
  if (data.length >= 24 && data.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) {
    return { width:data.readUInt32BE(16), height:data.readUInt32BE(20) };
  }
  if (data.length > 30 && data.toString('ascii', 0, 4) === 'RIFF' && data.toString('ascii', 8, 12) === 'WEBP') {
    const type = data.toString('ascii', 12, 16);
    if (type === 'VP8X') return { width:1 + data.readUIntLE(24, 3), height:1 + data.readUIntLE(27, 3) };
    if (type === 'VP8 ' && data[23] === 0x9d && data[24] === 0x01 && data[25] === 0x2a) return { width:data.readUInt16LE(26) & 0x3fff, height:data.readUInt16LE(28) & 0x3fff };
    if (type === 'VP8L' && data[20] === 0x2f) return {
      width:1 + (data[21] | ((data[22] & 0x3f) << 8)),
      height:1 + ((data[22] >> 6) | (data[23] << 2) | ((data[24] & 0x0f) << 10))
    };
  }
  if (data.length > 4 && data[0] === 0xff && data[1] === 0xd8) {
    let offset = 2;
    while (offset + 8 < data.length) {
      if (data[offset] !== 0xff) break;
      const marker = data[offset + 1];
      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { offset += 2; continue; }
      if (marker === 0xd9 || marker === 0xda) break;
      const length = data.readUInt16BE(offset + 2);
      if (length < 2 || offset + length + 2 > data.length) break;
      if ([0xc0,0xc1,0xc2,0xc3,0xc5,0xc6,0xc7,0xc9,0xca,0xcb,0xcd,0xce,0xcf].includes(marker)) return {
        width:data.readUInt16BE(offset + 7), height:data.readUInt16BE(offset + 5)
      };
      offset += length + 2;
    }
  }
  throw Error('Thumbnail must be a readable PNG, JPG or WebP image');
}

export async function validatePost(post, { now = new Date(), publicRoot = siteDirectory } = {}) {
  if (!slugPattern.test(post?.slug || '')) throw Error('Journal slug must be a lowercase, hyphenated URL name');
  if (!validDate(post.publishedAt) || Date.parse(post.publishedAt + 'T00:00:00Z') > now.getTime()) throw Error('Journal publish date is missing, invalid or in the future');
  if (post.modifiedAt && (!validDate(post.modifiedAt) || post.modifiedAt < post.publishedAt || Date.parse(post.modifiedAt + 'T00:00:00Z') > now.getTime())) throw Error('Modified date must be a valid, non-future date after publication');
  if (post.status !== 'review') throw Error('Only reviewed, unpublished article packages can enter the release build');
  if (post.seo?.canonical !== `/journal/${post.slug}/`) throw Error('Canonical must exactly match article route');
  const body = articleText(post.blocks);
  // Historical articles should remain buildable after their sources age.
  // Trend freshness is measured at publication or at a documented revision,
  // never relative to a later, unrelated deployment of the whole website.
  const editorialDay = post.modifiedAt || post.publishedAt;
  const checkAt = new Date(Math.min(now.getTime(), Date.parse(editorialDay + 'T23:59:59Z')));
  const report = assessDraft({ ...post, body }, checkAt);
  if (!report.pass) throw Error(`Editorial gates failed: ${report.failures.map(f => f.gate).join(', ')}`);
  if (!/^\/assets\/journal\/[a-z0-9-]+\.(?:webp|png|jpe?g)$/.test(post.image.path)) throw Error('Thumbnail must be a local Journal asset');
  const asset = resolve(publicRoot, '.' + post.image.path);
  if (!asset.startsWith(resolve(publicRoot) + sep)) throw Error('Thumbnail path escapes the public site');
  const image = await readFile(asset).catch(() => { throw Error(`Missing verified thumbnail: ${post.image.path}`); });
  if (image.length < 1024) throw Error('Thumbnail is suspiciously small');
  const measured = imageDimensions(image);
  if (measured.width !== post.image.width || measured.height !== post.image.height) throw Error('Thumbnail dimensions do not match the actual image');
  if (measured.width < 1200 || Math.abs(measured.width / measured.height - 16 / 9) > 0.045) throw Error('Thumbnail must be a large 16:9 image');
  return { ...post, body, report, html:renderArticleBlocks(post.blocks) };
}

export async function loadJournalPosts({ directory = postsDirectory, publicRoot = siteDirectory, now = new Date() } = {}) {
  let names;
  try { names = (await readdir(directory)).filter(name => name.endsWith('.json')).sort(); }
  catch (error) { if (error.code === 'ENOENT') return []; throw error; }
  const posts = [];
  const slugs = new Set();
  const days = new Set();
  for (const filename of names) {
    let post;
    try { post = JSON.parse(await readFile(resolve(directory, filename), 'utf8')); }
    catch (error) { throw Error(`${filename}: invalid JSON: ${error.message}`); }
    try { post = await validatePost(post, { now, publicRoot }); }
    catch (error) { throw Error(`${filename}: ${error.message}`); }
    if (['practical','shopping','technology','ai','trends'].includes(post.slug) || slugs.has(post.slug) || days.has(post.publishedAt)) throw Error(`Reserved/duplicate Journal slug or more than one article on ${post.publishedAt}`);
    slugs.add(post.slug); days.add(post.publishedAt); posts.push(post);
  }
  return posts.sort((a,b) => b.publishedAt.localeCompare(a.publishedAt));
}
