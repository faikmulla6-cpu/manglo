import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = new URL('../dist/', import.meta.url);
const sections = ['practical', 'shopping', 'technology', 'ai', 'trends'];

export async function auditLinks() {
  const sitemap = await readFile(new URL('sitemap.xml', root), 'utf8');
  const routes = [...sitemap.matchAll(/<loc>https:\/\/manglo\.shop([^<]*)<\/loc>/g)].map(m => m[1]);
  routes.push(...sections.map(s => `/journal/${s}/`), '/404.html');
  const broken = [];
  let references = 0;

  for (const route of routes) {
    const pageFile = route === '/404.html' ? '404.html' : `${route.slice(1)}index.html`;
    const html = await readFile(new URL(pageFile, root), 'utf8');
    for (const [, href] of html.matchAll(/(?:href|src)="(\/[^"\s]*)"/g)) {
      const pathname = href.split(/[?#]/)[0];
      if (!pathname || pathname.includes('..')) {
        broken.push({ route, path: href, issue: 'invalid_local_path' });
        continue;
      }
      const relative = pathname.endsWith('/') ? `${pathname.slice(1)}index.html` : pathname.slice(1);
      references++;
      try { if (!(await stat(new URL(relative, root))).isFile()) throw Error('not a file'); }
      catch { broken.push({ route, path: pathname, issue: 'missing_target' }); }
    }
    for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
      if (!/\balt="[^"]*"/.test(tag)) broken.push({ route, path: 'img', issue: 'missing_alt_attribute' });
    }
  }

  return { checkedPages: routes.length, references, passed: broken.length === 0, broken };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await auditLinks();
  console.log(JSON.stringify(result, null, 2));
  if (!result.passed) process.exitCode = 1;
}
