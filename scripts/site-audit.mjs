import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = new URL('../dist/', import.meta.url);
const expectedHost = 'https://manglo.shop';
const categoryDesks = ['practical', 'shopping', 'technology', 'ai', 'trends'];

// Release gate for generated static pages. This is deliberately separate from
// live Search Console indexing, real-user metrics, legal and editorial reviews.
export async function auditSite() {
  const failures = [];
  const fail = (route, check, detail) => failures.push({ route, check, detail });
  const sitemap = await readFile(new URL('sitemap.xml', root), 'utf8');
  const paths = [...sitemap.matchAll(/<loc>(https:\/\/manglo\.shop\/[^<]*)<\/loc>/g)].map(match => new URL(match[1]).pathname);
  const titles = new Map();
  const descriptions = new Map();

  for (const path of paths) {
    const route = path === '/' ? '/' : path;
    const file = new URL(path === '/' ? 'index.html' : `${path.slice(1)}index.html`, root);
    let html;
    try { html = await readFile(file, 'utf8'); }
    catch { fail(route, 'file', 'Indexable sitemap URL has no generated HTML'); continue; }
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)];
    const h1s = [...html.matchAll(/<h1\b/g)];
    if (!title || title.length < 12 || title.length > 100) fail(route, 'title', 'Missing or poorly sized title');
    if (!description || description.length < 55 || description.length > 180) fail(route, 'description', 'Missing or poorly sized description');
    if (title && titles.has(title)) fail(route, 'unique_title', `Duplicates ${titles.get(title)}`);
    if (description && descriptions.has(description)) fail(route, 'unique_description', `Duplicates ${descriptions.get(description)}`);
    if (title) titles.set(title, route);
    if (description) descriptions.set(description, route);
    if (canonicals.length !== 1 || canonicals[0][1] !== expectedHost + route) fail(route, 'canonical', 'One self-referencing HTTPS canonical required');
    if (h1s.length !== 1) fail(route, 'heading', `Expected one main heading; found ${h1s.length}`);
    if (!html.includes('name="robots" content="index,follow,max-image-preview:large"')) fail(route, 'indexability', 'Sitemap page must be indexable');
    if (!html.includes(`property="og:url" content="${expectedHost + route}"`)) fail(route, 'sharing', 'Canonical Open Graph URL required');
    if (!html.includes('<html lang="en">') || !html.includes('name="viewport"')) fail(route, 'accessibility', 'Language or responsive viewport missing');
    if (!html.includes('class="mg-mobile-menu"') || !html.includes('class="mg-skip"')) fail(route, 'navigation', 'Mobile navigation or skip link missing');
    if (!html.includes('href="/journal/"') || !html.includes('href="/editorial-standards/"')) fail(route, 'transparency', 'Journal or editorial standards link missing');
    if (html.includes('adsbygoogle') || html.includes('ca-pub-')) fail(route, 'ad_policy', 'Unexpected live ad code in inactive preapproval build');
    const structured = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    if (!structured.length) fail(route, 'structured_data', 'Missing JSON-LD');
    for (const [, json] of structured) try { JSON.parse(json); } catch { fail(route, 'structured_data', 'Invalid JSON-LD'); }
    if (route.startsWith('/playbook/') && route !== '/playbook/' && !structured.some(([, json]) => json.includes('"@type":"BlogPosting"'))) fail(route, 'article_schema', 'Published article requires BlogPosting markup');
  }

  for (const desk of categoryDesks) {
    const path = `/journal/${desk}/`;
    if (paths.includes(path)) fail(path, 'empty_desk', 'Unpublished category must be absent from sitemap');
    const html = await readFile(new URL(`journal/${desk}/index.html`, root), 'utf8');
    if (!html.includes('name="robots" content="noindex,follow"')) fail(path, 'empty_desk', 'Unpublished category must have noindex');
  }
  const errorPage = await readFile(new URL('404.html', root), 'utf8');
  if (!errorPage.includes('name="robots" content="noindex,follow"')) fail('/404', 'indexability', '404 page must not be indexed');
  return { mode:'LOCAL_BUILD_AUDIT', audited:paths.length, skippedCategoryDesks:categoryDesks.length, passed:failures.length===0, failures };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await auditSite();
  console.log(JSON.stringify(result, null, 2));
  if (!result.passed) process.exitCode=1;
}
