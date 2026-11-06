import { readFile, writeFile, mkdir } from 'node:fs/promises';
import vm from 'node:vm';
import { playbookArticles, categories } from '../content/playbook.mjs';
import { renderHome } from '../content/home.mjs';

const root = new URL('../dist/', import.meta.url);
const domain = 'https://manglo.shop';
const published = '2026-11-06';
// Change the URL when these generated assets change. Static hosts/CDNs can
// otherwise keep an older bundle cached after a new index.html is deployed.
const release = '20261106o';
const heroCss = `<link rel="stylesheet" href="/hero-2-1.css?v=${release}">`;
const homeCss = `<link rel="stylesheet" href="/home-editorial.css?v=${release}">`;
const heroJs = `<script src="/hero-2-1.js?v=${release}" defer></script>`;
const homeJs = `<script src="/playbook-home.js?v=${release}" defer></script>`;
const playbookCss = `<link rel="stylesheet" href="/playbook.css?v=${release}">`;
const experienceCss = `<link rel="stylesheet" href="/experience.css?v=${release}">`;
const experienceJs = `<script src="/experience.js?v=${release}" defer></script>`;
const toolJs = `<script src="/app.js?v=${release}" defer></script>`;
const rssLink = '<link rel="alternate" type="application/rss+xml" title="Manglo Playbook" href="/feed.xml">';

const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));
const absolute = path => `${domain}${path}`;
const jsonLD = object => `<script type="application/ld+json">${JSON.stringify(object).replace(/</g, '\\u003c')}</script>`;
const original = await readFile(new URL('index.html', root), 'utf8');

// The generated home page also acts as the template. Strip additions from any
// previous build to make repeated runs deterministic and non-duplicating.
let template = original
  .replace(/<a class="mg-skip" href="#content">Skip to content<\/a>/g, '')
  .replace(/<link rel="stylesheet" href="\/hero-2-1\.css(?:\?[^\"]*)?">/g, '')
  .replace(/<link rel="stylesheet" href="\/home-editorial\.css(?:\?[^\"]*)?">/g, '')
  .replace(/<script src="\/hero-2-1\.js(?:\?[^\"]*)?" defer><\/script>/g, '')
  .replace(/<script src="\/playbook-home\.js(?:\?[^\"]*)?" defer><\/script>/g, '')
  .replace(/<link rel="stylesheet" href="\/playbook\.css(?:\?[^\"]*)?">/g, '')
  .replace(/<link rel="stylesheet" href="\/experience\.css(?:\?[^\"]*)?">/g, '')
  .replace(/<script src="\/experience\.js(?:\?[^\"]*)?" defer><\/script>/g, '')
  .replace(/<!-- PB_META_START -->[\s\S]*?<!-- PB_META_END -->/g, '');
template = template.replace('</head>', `${playbookCss}</head>`);
template = template.replace('</head>', `${experienceCss}</head>`);
if (!template.includes(rssLink)) template = template.replace('</head>', `${rssLink}</head>`);

// Every static route shares one coherent, accessible identity. The header and
// footer are generated afresh so older build outputs cannot leave stale UI.
const header = `<a class="mg-skip" href="#content">Skip to content</a><header class="mg-site-header">
  <a class="mg-brand" href="/" aria-label="Manglo home"><span class="mg-brand-mark" aria-hidden="true">m</span>manglo<span class="mg-brand-dot">.</span></a>
  <nav class="mg-desktop-nav" aria-label="Main navigation"><a href="/#tools">Tools</a><a href="/playbook/">Playbook</a><a href="/about/">About</a><a href="/contact/">Contact</a></nav>
  <a class="mg-header-action" href="/#tools">Explore the tools <span aria-hidden="true">→</span></a>
  <details class="mg-mobile-menu"><summary aria-label="Open navigation">☰</summary><div><a href="/#tools">Tools →</a><a href="/playbook/">Playbook →</a><a href="/about/">About →</a><a href="/contact/">Contact →</a></div></details>
</header>`;
const footer = `<footer class="mg-site-footer"><div class="mg-footer-top">
  <div class="mg-footer-brand"><a class="mg-brand" href="/"><span class="mg-brand-mark" aria-hidden="true">m</span>manglo<span class="mg-brand-dot">.</span></a><p>A thoughtful collection of free image tools, seller calculators and practical field guides. Built for independent work.</p></div>
  <div class="mg-footer-col"><span class="mg-footer-heading">EXPLORE</span><a href="/#tools">All tools</a><a href="/tools/image-compressor/">Image compressor</a><a href="/tools/image-resizer/">Image resizer</a><a href="/tools/profit-calculator/">Profit calculator</a><a href="/tools/discount-calculator/">Discount calculator</a></div>
  <div class="mg-footer-col"><span class="mg-footer-heading">LEARN</span><a href="/playbook/">Manglo Playbook</a><a href="/playbook/product-listing-preflight-checklist/">Listing checklist</a><a href="/guides/prepare-product-images/">Product image guide</a><a href="/editorial-standards/">Editorial standards</a></div>
  <div class="mg-footer-col"><span class="mg-footer-heading">MANGLO</span><a href="/about/">About</a><a href="/contact/">Contact</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a><a href="mailto:faikxbillion@gmail.com">Email support →</a></div>
</div><div class="mg-footer-bottom"><span>© 2026 Manglo. Small tools, thoughtful design.</span><span>Free to use · No account required</span><a href="#content">Back to top ↑</a></div></footer>`;
template = template.replace(/<header(?:\s[^>]*)?>[\s\S]*?<\/header>/, header)
  .replace(/<footer(?:\s[^>]*)?>[\s\S]*?<\/footer>/, footer)
  .replace('</body>', `${experienceJs}</body>`);

const existingRoutes = {
  'tools/image-compressor': 'Free image compressor',
  'tools/image-resizer': 'Free image resizer',
  'tools/image-converter': 'JPG, PNG and WebP converter',
  'tools/image-cropper': 'Free image cropper',
  'tools/target-size-compressor': 'Compress images to a target KB size',
  'tools/profit-calculator': 'Seller profit calculator',
  'tools/discount-calculator': 'Discount calculator',
  'guides/prepare-product-images': 'A practical checklist for better product images',
  'guides/calculate-selling-profit': 'How to calculate selling profit',
  'guides/jpg-png-webp': 'JPG, PNG or WebP: choosing a format',
  about: 'About Manglo', privacy: 'Privacy policy',
  terms: 'Terms of use', contact: 'Contact and feedback'
};

// Run the existing static app in an isolated DOM stub to preserve its original
// server-visible home, guides and tool data without changing tool behavior.
const elements = new Map();
const element = key => {
  if (!elements.has(key)) elements.set(key, {
    innerHTML: '', addEventListener() {},
    classList: { add() {}, remove() {} }
  });
  return elements.get(key);
};
const sandbox = {
  location: { pathname: '/' },
  document: { querySelector: element, querySelectorAll: () => [] },
  window: { addEventListener() {} }, URL, console
};
vm.createContext(sandbox);
vm.runInContext(await readFile(new URL('app.js', root), 'utf8'), sandbox);
const data = vm.runInContext('({tools,guides,articles,pages})', sandbox);
const homeHTML = renderHome(data.tools);

const breadcrumb = items => jsonLD({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem', position: i + 1, name: item.label,
    item: absolute(item.href)
  }))
});

function renderPage(route, title, description, main, options = {}) {
  const path = route ? `/${route}/` : '/';
  const image = absolute(options.image || '/assets/photography-studio.webp');
  const meta = `<!-- PB_META_START -->
    <meta name="robots" content="${options.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'}">
    <meta property="og:type" content="${options.article ? 'article' : 'website'}">
    <meta property="og:site_name" content="Manglo">
    <meta property="og:title" content="${escapeHTML(title)}">
    <meta property="og:description" content="${escapeHTML(description)}">
    <meta property="og:url" content="${absolute(path)}">
    <meta property="og:image" content="${image}">
    <meta property="og:image:alt" content="${escapeHTML(options.imageAlt || 'Manglo seller tools and practical guides')}">
    <meta name="twitter:card" content="summary_large_image">
    ${options.article ? `<meta property="article:published_time" content="${published}"><meta property="article:modified_time" content="${published}">` : ''}
    ${options.schema || ''}<!-- PB_META_END -->`;

  return template
    .replace(/<main id="content">[\s\S]*?<\/main>/, `<main id="content">${main}</main>`)
    .replace(experienceJs, `${route.startsWith('tools/') ? toolJs : ''}${experienceJs}`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHTML(title)} — Manglo</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeHTML(description)}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${absolute(path)}">`)
    .replace('</head>', `${meta}</head>`);
}

// The older app.js is a client-side router for the original tools and guides.
// Editorial pages are already complete HTML, so running that router on them
// would replace the article with its "not found" screen.
const staticEditorial = html => html.replace(/<script src="\/app\.js(?:\?v=[^"]+)?" defer><\/script>/g, '');

async function saveRoute(route, html) {
  await mkdir(new URL(`${route}/`, root), { recursive: true });
  await writeFile(new URL(`${route}/index.html`, root), html);
}

const articleHref = article => `/playbook/${article.slug}/`;
const articleCard = (article, i = 0) => `
  <a class="pb-card" href="${articleHref(article)}" data-category="${escapeHTML(article.category)}" data-search="${escapeHTML(`${article.title} ${article.description} ${article.category}`.toLowerCase())}">
    <div class="pb-card-visual"><img src="${article.image}" alt="${escapeHTML(article.imageAlt)}" loading="lazy" width="1536" height="1024"><span class="pb-card-number">${String(i + 1).padStart(2, '0')}</span></div>
    <div class="pb-card-copy"><div class="pb-card-meta"><span>${escapeHTML(article.category)}</span><span>${article.readTime} min read</span></div>
      <h3>${escapeHTML(article.title)}</h3><p>${escapeHTML(article.dek)}</p><span class="pb-card-read">Read the guide <span aria-hidden="true">→</span></span>
    </div>
  </a>`;

const story = (article, extraClass = '') => `<a class="mg-story ${extraClass}" href="${articleHref(article)}">
  <div class="mg-story-image"><img src="${article.image}" alt="${escapeHTML(article.imageAlt)}" width="1536" height="1024" loading="lazy"></div>
  <div class="mg-story-copy"><span>${escapeHTML(article.category)} · ${article.readTime} MIN READ</span><h3>${escapeHTML(article.title)}</h3></div>
</a>`;
const newsRow = article => `<a class="mg-news-item" href="${articleHref(article)}">
  <img src="${article.image}" alt="${escapeHTML(article.imageAlt)}" loading="lazy" width="1536" height="1024">
  <span><strong>${escapeHTML(article.title)}</strong><small>${escapeHTML(article.category)} · ${article.readTime} min read</small></span>
</a>`;
const homeTeaser = `<div class="mg-editorial-wrap">
  <section class="mg-feature-section" aria-labelledby="mg-feature-title">
    <div class="mg-reading-heading"><div><span class="mg-reading-overline">THE MANGLO PLAYBOOK</span><h2 id="mg-feature-title">Featured ideas</h2></div><a href="/playbook/">All articles <span aria-hidden="true">→</span></a></div>
    <div class="mg-feature-layout">
      <a class="mg-feature-lead" href="${articleHref(playbookArticles[0])}">
        <img src="${playbookArticles[0].image}" alt="${escapeHTML(playbookArticles[0].imageAlt)}" width="1536" height="1024">
        <div class="mg-feature-shade"></div><div class="mg-feature-lead-copy"><span>FEATURED / PRODUCT PHOTOS</span><h3>${escapeHTML(playbookArticles[0].title)}</h3><p>${escapeHTML(playbookArticles[0].dek)}</p><small>Read the guide →</small></div>
      </a>
      <div class="mg-feature-stack">${story(playbookArticles[4])}${story(playbookArticles[1])}</div>
    </div>
  </section>
  <section class="mg-latest-section" aria-labelledby="mg-latest-title">
    <div class="mg-reading-heading"><h2 id="mg-latest-title">Latest from the Playbook</h2><a href="/playbook/">View all <span aria-hidden="true">→</span></a></div>
    <div class="mg-news-grid">${[...playbookArticles].reverse().slice(0,6).map(newsRow).join('')}</div>
  </section>
  <section class="mg-topic-section" aria-labelledby="mg-photos-title">
    <div class="mg-reading-heading"><div><span class="mg-reading-overline">MAKE THE PRODUCT LOOK ITS BEST</span><h2 id="mg-photos-title">Image & product stories</h2></div><a href="/playbook/">Explore guides <span aria-hidden="true">→</span></a></div>
    <div class="mg-topic-grid">${[playbookArticles[4],playbookArticles[2],playbookArticles[0]].map(a=>story(a)).join('')}</div>
  </section>
  <section class="mg-topic-section" aria-labelledby="mg-business-title">
    <div class="mg-reading-heading"><div><span class="mg-reading-overline">FOR INDEPENDENT SELLERS EVERYWHERE</span><h2 id="mg-business-title">Pricing & selling smarter</h2></div><a href="/playbook/">Explore guides <span aria-hidden="true">→</span></a></div>
    <div class="mg-topic-grid">${[playbookArticles[1],playbookArticles[3],playbookArticles[5]].map(a=>story(a)).join('')}</div>
  </section>
</div>`;

const homeMain = homeHTML.replace('<!-- PLAYBOOK_HOME_TEASER -->', homeTeaser);
const homeSchema = jsonLD({
  '@context': 'https://schema.org', '@type': 'WebSite',
  name: 'Manglo', url: absolute('/'),
  description: 'Free browser-local image tools, seller calculators and practical education.'
});
let homePage = renderPage('', 'Manglo | Beautiful tools for independent work',
  'Free image tools, seller profit calculators and practical guides. Work on your photos and numbers with no account required.',
  homeMain, { schema: homeSchema, image:'/assets/obsidian-hero.webp', imageAlt:'Premium editorial product arrangement in glass and bronze' });
// The home page is now completely static and crawlable. Only its optional
// React island and filters need JavaScript; the old router stays on tool URLs.
homePage = staticEditorial(homePage).replace('</body>', `${heroJs}</body>`)
  .replace(experienceCss, `${heroCss}${experienceCss}${homeCss}`);
await writeFile(new URL('home-editorial.css', root), await readFile(new URL('../src/home-editorial.css', import.meta.url), 'utf8'));
await writeFile(new URL('index.html', root), homePage);

function trustPage(route, page) {
  if (route === 'about') return `<div class="mg-info-page mg-about">
    <section class="mg-about-hero"><span class="mg-kicker"><span class="mg-kicker-line"></span> THE MANGLO STORY</span><h1>Good work deserves<br><em>good tools.</em></h1><p>Not another complicated platform. Manglo is a focused place to prepare product images, understand selling numbers and learn the practical details that help independent work move forward.</p></section>
    <section class="mg-about-grid"><div><span class="mg-kicker"><span class="mg-kicker-line"></span> WHAT WE BELIEVE</span><h2>The details should feel <em>easier.</em></h2><p>Independent sellers have enough to manage. Beautiful product photos, accurate pricing and clear listings shouldn't require expensive software or another dashboard to learn.</p><p>We build simple, useful tools around real tasks: compress a photo, choose a format, understand the margin or check a promotion before it goes live. Our Playbook explains the thinking behind those actions.</p><a class="mg-inline-link" href="/#tools">Explore all seven tools →</a></div><div class="mg-about-photo"><img src="/assets/seller-desk.webp" alt="Practical workspace with a notebook and calculator" width="1536" height="1024"><span>INDEPENDENT WORK / MADE MORE APPROACHABLE</span></div></section>
    <section class="mg-about-values"><span class="mg-kicker"><span class="mg-kicker-line"></span> THE PRINCIPLES</span><h2>Built around what matters.</h2><div class="mg-values-grid"><div class="mg-about-block"><span>01 / CLARITY</span><h3>One clear job at a time.</h3><p>Each tool has a purpose and explains what it does. No overwhelming dashboard or unexplained settings.</p></div><div class="mg-about-block"><span>02 / PRIVACY</span><h3>Files stay on your device.</h3><p>Our image tools process photos inside your browser rather than uploading them to a Manglo server.</p></div><div class="mg-about-block"><span>03 / ACCESS</span><h3>Useful without an account.</h3><p>All seven tools are currently free. Our practical guides are open to everyone, with examples for sellers in India and worldwide.</p></div></div></section>
    <section class="mg-about-closing"><h2>Have an idea to make Manglo better?</h2><a class="mg-button mg-button-primary" href="/contact/">Talk to us →</a></section>
  </div>`;
  if (route === 'contact') return `<div class="mg-info-page mg-contact"><section class="mg-contact-hero"><span class="mg-kicker"><span class="mg-kicker-line"></span> GET IN TOUCH</span><h1>Let's make things <em>better.</em></h1><p>Have feedback, a tool idea, a technical problem or a privacy question? Send a direct note. No complicated ticketing system.</p></section><div class="mg-contact-grid"><section class="mg-contact-card"><span class="mg-kicker">SAY HELLO</span><h2>Reach the Manglo inbox.</h2><p>You can email us directly. Your email app will handle sending the message; this website does not collect contact forms or store your message.</p><a class="mg-contact-email" href="mailto:faikxbillion@gmail.com">faikxbillion@gmail.com →</a><div><a class="mg-button mg-button-primary" href="mailto:faikxbillion@gmail.com?subject=Manglo%20support">Write an email →</a></div></section><section class="mg-contact-card"><span class="mg-kicker">HELP US HELP YOU</span><h2>For a useful bug report.</h2><ol><li>Tell us which tool or page you used.</li><li>Include your browser, device and the steps you took.</li><li>Explain what you expected and what happened.</li><li>Share a file format or dimensions for image issues—not private files.</li></ol><p>There is no live chat or guaranteed response time. Please don't send passwords, private photos or customer data.</p></section></div></div>`;
  const headings = [];
  let section = 0;
  const body = page.body.replace(/<h2>(.*?)<\/h2>/g, (_, heading) => {
    const id = `policy-section-${++section}`;
    headings.push({ id, heading });
    return `<h2 id="${id}">${heading}</h2>`;
  });
  return `<div class="mg-policy"><section class="mg-policy-hero"><span class="mg-kicker"><span class="mg-kicker-line"></span> MANGLO / TRANSPARENCY</span><h1>${escapeHTML(route === 'privacy' ? 'Your privacy matters.' : 'Clear, fair terms.')}</h1><p>${route === 'privacy' ? 'A plain-language account of what Manglo does with files and information.' : 'The conditions for using these free browser-based tools, without the fine-print maze.'}</p></section><div class="mg-policy-layout"><nav class="mg-policy-toc" aria-label="On this page"><strong>IN THIS DOCUMENT</strong>${headings.map(h => `<a href="#${h.id}">${h.heading}</a>`).join('')}</nav><article class="mg-policy-content">${body}</article></div></div>`;
}

for (const [route, title] of Object.entries(existingRoutes)) {
  let body = '';
  let description = 'Free, practical tools for independent sellers.';
  if (route.startsWith('guides/')) {
    const id = route.split('/')[1];
    const guide = data.guides.find(g => g.id === id);
    description = guide.title;
    const cover = id === 'prepare-product-images' ? '/assets/photography-studio.webp'
      : id === 'calculate-selling-profit' ? '/assets/seller-desk.webp' : '/assets/seller-still-life.webp';
    body = `<article class="article"><div class="breadcrumb"><a href="/">Home</a> / <a href="/playbook/">Playbook</a> / Guide</div><div class="eyebrow">MANGLO SELLER GUIDES</div><h1>${guide.title}</h1><img class="article-cover" src="${cover}" alt="Product and seller workspace illustration" width="1536" height="1024">${data.articles[id]}<p><a href="/playbook/">Explore more in Manglo Playbook →</a></p></article>`;
  } else if (data.pages[route]) {
    const page = data.pages[route];
    description = route === 'about' ? 'Discover the thinking behind Manglo: seven free tools, private browser-based image processing and practical resources for independent sellers.'
      : route === 'contact' ? 'Get in touch with Manglo about tools, feedback, corrections and privacy questions.'
      : route === 'privacy' ? 'How Manglo handles images, browser data and privacy when you use the free seller toolkit.'
      : 'Terms and practical limitations for using Manglo free image tools and seller calculators.';
    body = trustPage(route, page);
  } else {
    const tool = data.tools.find(t => route.endsWith(t.id));
    description = tool.desc;
    body = `<div class="container"><div class="page-heading"><h1>${tool.name}</h1><p>${tool.desc}</p><noscript>This interactive tool requires JavaScript. Enable JavaScript to process images locally or calculate results.</noscript></div>
      <section class="tool-explainer"><h2>Simple tools for everyday work</h2><p>${tool.group === 'image' ? 'Choose JPG, PNG or WebP files from your device. Set output options, process images and download the results. Image processing happens locally in your browser. Keep your originals and inspect the output before publishing.' : 'Enter your selling price and relevant costs to estimate results. Fees, shipping and expenses affect what you keep. These tools offer estimates, not financial or tax advice.'}</p>
      <a href="/guides/${tool.group === 'image' ? 'prepare-product-images' : 'calculate-selling-profit'}/">Read our practical guide</a></section></div>`;
  }
  // Article and information pages have complete static markup and do not need
  // the original browser router. Tool routes retain that router and all tools.
  const html = renderPage(route, title, description, body);
  await saveRoute(route, route.startsWith('tools/') ? html : staticEditorial(html));
}

const featured = playbookArticles[0];
const hub = `<div class="pb-page">
  <section class="pb-hero"><div class="pb-hero-copy"><span class="pb-kicker">MANGLO / PRACTICAL KNOW-HOW</span><h1>Better decisions.<br><em>One small lesson at a time.</em></h1><p>Not more noise. Just honest, useful guides for people selling things on the internet—whether you're starting in India or serving customers worldwide.</p><div class="pb-hero-actions"><a class="pb-primary" href="#latest">Explore all guides <span aria-hidden="true">↘</span></a><span>Original, practical, free to read.</span></div></div><div class="pb-hero-art"><img src="${featured.image}" alt="${escapeHTML(featured.imageAlt)}" width="1536" height="1024"><div class="pb-hero-art-caption"><small>START HERE / PRODUCT PHOTOS</small><strong>${escapeHTML(featured.title)}</strong><a href="${articleHref(featured)}">Open the field guide →</a></div></div></section>
  <section class="pb-topic-strip" aria-label="Playbook topics"><span>THE PLAYBOOK COVERS</span><strong>Product photography</strong><strong>Pricing that makes sense</strong><strong>Better listings</strong></section>
  <section class="pb-library" id="latest"><div class="pb-section-heading"><div><span class="pb-kicker">A LITTLE KNOW-HOW</span><h2>Explore the field guides.</h2><p>Start with a problem. Leave with an action.</p></div><span class="pb-volume">VOL. 01 / ${String(playbookArticles.length).padStart(2, '0')} GUIDES</span></div>
    <div class="pb-library-controls"><div class="pb-filters" role="group" aria-label="Filter Playbook guides">${categories.map((category, i) => `<button type="button" data-pb-filter="${escapeHTML(category)}" aria-pressed="${i === 0 ? 'true' : 'false'}" class="${i === 0 ? 'active' : ''}">${escapeHTML(category)}</button>`).join('')}</div><label class="pb-search"><span aria-hidden="true">⌕</span><input type="search" id="pb-search" placeholder="Search a question or topic" aria-label="Search Playbook articles"></label></div>
    <p class="pb-results-count" id="pb-results-count" role="status">${playbookArticles.length} useful guides</p>
    <div class="pb-grid" id="pb-grid">${playbookArticles.map(articleCard).join('')}</div>
    <p class="pb-no-results" id="pb-no-results" hidden>No guides match that search. Try “photos”, “profit”, or “listing”.</p>
  </section>
  <section class="pb-tool-banner"><div><span class="pb-kicker">READ IT. TRY IT.</span><h2>Ideas are better when you can use them.</h2><p>Our free browser-based tools turn a tip into a useful next step. Your product photos stay on your device.</p></div><div class="pb-tool-links"><a href="/tools/image-compressor/">Prepare a product photo →</a><a href="/tools/profit-calculator/">Check your profit →</a><a href="/tools/discount-calculator/">Plan a promotion →</a></div></section>
  <p class="pb-editorial-note">Guides are written for independent sellers using original explanations and illustrative examples. <a href="/editorial-standards/">See our editorial standards</a>.</p>
</div>`;
await saveRoute('playbook', staticEditorial(renderPage('playbook', 'Manglo Playbook | Seller field guides',
  'Original, practical guides for product photography, listing preparation, pricing and profit. Written for a global audience with examples for Indian sellers.',
  hub, { image: featured.image, imageAlt: featured.imageAlt, schema: jsonLD({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Manglo Playbook', url: absolute('/playbook/'), inLanguage: 'en', mainEntity: { '@type': 'ItemList', itemListElement: playbookArticles.map((a, i) => ({ '@type': 'ListItem', position: i + 1, name: a.title, url: absolute(articleHref(a)) })) } }) })
  .replace('</body>', '<script src="/playbook.js" defer></script></body>')));

for (const article of playbookArticles) {
  const others = playbookArticles.filter(a => a.slug !== article.slug);
  const related = others.filter(a => a.category === article.category).concat(others.filter(a => a.category !== article.category)).slice(0, 2);
  const toc = [...article.body.matchAll(/<h2 id="([^"]+)">([^<]+)<\/h2>/g)].map(m => ({ id: m[1], label: m[2] }));
  const main = `<div class="pb-article-page"><div class="pb-reading-progress" aria-hidden="true"><span id="pb-progress-bar"></span></div>
    <nav class="pb-breadcrumb" aria-label="Breadcrumb"><a href="/">Manglo</a><span>/</span><a href="/playbook/">Playbook</a><span>/</span><span>${escapeHTML(article.category)}</span></nav>
    <header class="pb-article-header"><span class="pb-kicker">${escapeHTML(article.category)} / FIELD GUIDE</span><h1>${escapeHTML(article.title)}</h1><p class="pb-article-dek">${escapeHTML(article.dek)}</p><div class="pb-article-meta"><span>By <a href="/editorial-standards/">Manglo Editorial</a></span><span>6 November 2026</span><span>${article.readTime} min read</span><button type="button" class="pb-copy-link" id="pb-copy-link">Copy link →</button></div></header>
    <div class="pb-article-cover"><img src="${article.image}" alt="${escapeHTML(article.imageAlt)}" width="1536" height="1024"><span>THE MANGLO PLAYBOOK / ORIGINAL GUIDE</span></div>
    <div class="pb-article-layout"><article class="pb-article-body" id="pb-article-body">${article.body}
      <section class="pb-article-cta"><span class="pb-kicker">PUT THIS TO WORK</span><h2>One small next step.</h2><p>Use Manglo's free toolkit to put the ideas in this guide into practice. No sign-up required.</p><a href="${article.tool.href}" class="pb-primary">${escapeHTML(article.tool.label)} →</a></section>
      <div class="pb-article-disclaimer">This is general educational content, not legal, financial or tax advice. Platform rules and costs change; verify requirements for your destination.</div>
    </article><aside class="pb-article-sidebar"><div class="pb-toc"><strong>IN THIS GUIDE</strong><nav aria-label="On this page">${toc.map(item => `<a href="#${item.id}">${escapeHTML(item.label)}</a>`).join('')}</nav></div><div class="pb-sidebar-tool"><small>FREE SELLER TOOL</small><strong>Make the next step easier.</strong><a href="${article.tool.href}">${escapeHTML(article.tool.label)} →</a></div></aside></div>
    <section class="pb-more"><div class="pb-section-heading"><div><span class="pb-kicker">KEEP EXPLORING</span><h2>Good things to read next.</h2></div><a href="/playbook/">All Playbook guides →</a></div><div class="pb-grid">${related.map(articleCard).join('')}</div></section>
  </div>`;
  const schema = jsonLD({
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: article.title, description: article.description,
    mainEntityOfPage: absolute(articleHref(article)),
    image: [absolute(article.image)], datePublished: published,
    dateModified: published, inLanguage: 'en',
    author: { '@type': 'Organization', name: 'Manglo Editorial', url: absolute('/editorial-standards/') },
    publisher: { '@type': 'Organization', name: 'Manglo', url: absolute('/') }
  }) + breadcrumb([{ label: 'Home', href: '/' }, { label: 'Playbook', href: '/playbook/' }, { label: article.title, href: articleHref(article) }]);
  await saveRoute(`playbook/${article.slug}`, staticEditorial(renderPage(`playbook/${article.slug}`, article.title,
    article.description, main, { article: true, image: article.image, imageAlt: article.imageAlt, schema })
    .replace('</body>', '<script src="/playbook.js" defer></script></body>')));
}

const standards = `<div class="pb-editorial-page"><nav class="pb-breadcrumb" aria-label="Breadcrumb"><a href="/">Manglo</a><span>/</span><a href="/playbook/">Playbook</a><span>/</span>Editorial standards</nav><div class="pb-kicker">HOW WE WORK</div><h1>Useful before impressive. Honest before loud.</h1><p class="pb-article-dek">Here's how we plan, write and maintain the Manglo Playbook—and how to tell us when we miss something.</p><div class="pb-standards-grid"><section><h2>Who makes the guides?</h2><p>Manglo Editorial publishes practical articles to help independent sellers use everyday digital tools. We explain common workflows, show the math behind examples and link to relevant Manglo tools. We do not claim marketplace endorsement or certifications we don't hold.</p></section><section><h2>How we handle examples</h2><p>Currency examples, margins and product scenarios are labelled illustrative. They are not reported marketplace fees, live price quotes or fabricated customer case studies. When an article includes a calculation, we show the inputs so readers can check it.</p></section><section><h2>Corrections and updates</h2><p>Requirements, formats and platform policies can change. We review guides when changes come to our attention, update significant content and indicate the modified date. If you spot an error or outdated instruction, contact <a href="mailto:faikxbillion@gmail.com">faikxbillion@gmail.com</a> with the page and correction.</p></section><section><h2>Ads and editorial independence</h2><p>Manglo does not currently serve Google ads on this site. If advertising is introduced after approval, ads will be distinguishable from editorial content. We will update our privacy disclosures and implement any required consent controls before enabling relevant tracking or ad technology.</p></section><section><h2>What the Playbook isn't</h2><p>Guides are general educational information—not individualized legal, financial, tax or professional advice. Sellers should verify regulations, rates and platform requirements for their own region and business.</p></section><section><h2>Privacy and reader trust</h2><p>The current site has no account requirement. We avoid invasive popups and misleading download buttons. Read the <a href="/privacy/">privacy policy</a>, <a href="/terms/">terms</a> and <a href="/contact/">contact page</a> for more detail.</p></section></div><a class="pb-primary" href="/playbook/">Back to the Playbook →</a></div>`;
await saveRoute('editorial-standards', staticEditorial(renderPage('editorial-standards', 'Editorial standards and corrections',
  'How Manglo Playbook articles are produced, corrected and kept honest, with transparent examples and clear advertising policies.', standards)));

const missing = `<div class="pb-editorial-page"><div class="pb-kicker">404 / WRONG TURN</div><h1>Let's get you back to something useful.</h1><p class="pb-article-dek">That page isn't here. Your next useful tool or guide is one click away.</p><p><a class="pb-primary" href="/">Go home →</a> <a class="pb-pill-link" href="/playbook/">Browse the Playbook →</a></p></div>`;
await writeFile(new URL('404.html', root), staticEditorial(renderPage('', 'Page not found', 'This Manglo page was not found.', missing, { noindex: true })));

const sitemapPaths = ['', ...Object.keys(existingRoutes), 'playbook', ...playbookArticles.map(a => `playbook/${a.slug}`), 'editorial-standards'];
await writeFile(new URL('robots.txt', root), `User-agent: *\nAllow: /\nSitemap: ${absolute('/sitemap.xml')}\n`);
await writeFile(new URL('sitemap.xml', root), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapPaths.map(route => `<url><loc>${absolute(route ? `/${route}/` : '/')}</loc></url>`).join('\n')}\n</urlset>\n`);

const xml = value => escapeHTML(value).replace(/'/g, '&apos;');
const rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>Manglo Playbook</title><link>${absolute('/playbook/')}</link><description>Practical field guides for independent sellers</description><language>en</language>${playbookArticles.map(a => `<item><title>${xml(a.title)}</title><link>${absolute(articleHref(a))}</link><guid isPermaLink="true">${absolute(articleHref(a))}</guid><description>${xml(a.description)}</description><pubDate>Fri, 06 Nov 2026 00:00:00 GMT</pubDate></item>`).join('')}</channel></rss>`;
await writeFile(new URL('feed.xml', root), rss);

console.log(`Built ${sitemapPaths.length} crawlable routes, 404, RSS feed, robots.txt and sitemap.xml.`);
