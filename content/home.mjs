// Home presentation is pure HTML so the page stays useful to readers and
// crawlers even before its optional React/motion enhancement loads.
const escape = text => String(text).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

const visual = {
  'image-compressor': '<span class="mg-visual-label">OPTIMIZE / IMAGE</span><div class="mg-bars"><i></i><i></i></div><small>Original <b>→</b> Optimized</small>',
  'image-resizer': '<span class="mg-visual-label">SIZE / CANVAS</span><div class="mg-resize-frame"><span>1200 × 1200</span></div>',
  'image-converter': '<span class="mg-visual-label">FORMAT / EXPORT</span><div class="mg-format-glyph">JPG <span>→</span> WebP</div>',
  'image-cropper': '<span class="mg-visual-label">COMPOSE / CROP</span><div class="mg-crop-glyph"><i></i><i></i></div>',
  'target-size-compressor': '<span class="mg-visual-label">FILE / LIMIT</span><div class="mg-target-glyph">200 <small>KB target</small></div>',
  'profit-calculator': '<span class="mg-visual-label">PRICE / COSTS</span><div class="mg-profit-glyph">Revenue <span>−</span> Costs <b>= Profit</b></div>',
  'discount-calculator': '<span class="mg-visual-label">PRICING / SALE</span><div class="mg-discount-glyph">20<span>%</span><small>Example discount</small></div>'
};
const numbers = ['01','02','03','04','05','06','07'];

function card(tool, index) {
  const featured = index === 0 || tool.id === 'profit-calculator';
  return `<a class="mg-tool-card${featured ? ' mg-tool-featured' : ''}" href="/tools/${escape(tool.id)}/" data-group="${escape(tool.group)}" data-search="${escape(`${tool.name} ${tool.desc} ${tool.group}`.toLowerCase())}">
    <div class="mg-tool-card-top"><span>${numbers[index]} / ${tool.group === 'image' ? 'IMAGE STUDIO' : 'BUSINESS MATH'}</span><span class="mg-card-arrow" aria-hidden="true">→</span></div>
    <div class="mg-tool-card-visual" aria-hidden="true">${visual[tool.id] || ''}</div>
    <div class="mg-tool-card-bottom"><div><h3>${escape(tool.name)}</h3><p>${escape(tool.desc)}</p></div><span class="mg-card-link">Launch tool <span aria-hidden="true">→</span></span></div>
  </a>`;
}

export function renderHome(tools) {
  return `<div class="mg-home">
    <section class="mg-cover premium-hero" aria-labelledby="mg-home-title">
      <div class="mg-cover-light" aria-hidden="true"></div>
      <div class="mg-cover-inner">
        <div class="mg-cover-copy hero-copy">
          <div class="mg-eyebrow"><span class="mg-dot"></span> MANGLO / THE INDEPENDENT WORKSPACE</div>
          <h1 id="mg-home-title">A sharper edge <em>for every idea.</em></h1>
          <p>Make your images look their best. Understand the numbers behind every sale. Move from idea to listing with less friction.</p>
          <div class="mg-cover-actions"><a class="mg-button mg-button-primary" href="#tools">Explore the toolkit <span>→</span></a><a class="mg-button mg-button-ghost" href="/playbook/">Read the Playbook <span>→</span></a></div>
          <div class="mg-cover-assurance"><span>07 browser-based tools</span><span>No account needed</span><span>Image processing stays local</span></div>
        </div>
        <div class="mg-cover-product studio-window"><img src="/assets/obsidian-hero.webp" alt="Cinematic arrangement of unbranded product packaging on dark glass" width="1536" height="1024" fetchpriority="high">
          <div class="mg-image-corner mg-image-corner-top">MANGLO / PRODUCT STUDIO <span>01—07</span></div>
          <div class="mg-image-corner mg-image-corner-bottom"><span class="mg-icon-flash">✦</span><div><strong>Bring your best to the details.</strong><small>Photography, pricing, and the work in between.</small></div><span aria-hidden="true">→</span></div>
        </div>
      </div>
      <a class="mg-scroll-prompt" href="#tools"><span>SCROLL TO EXPLORE</span><i aria-hidden="true">↓</i></a>
    </section>
    <div class="mg-marquee" aria-label="Manglo toolkit specialties"><div><span>IMAGE PREPARATION</span><b>✦</b><span>SMARTER MARGINS</span><b>✦</b><span>BETTER PRODUCT LISTINGS</span><b>✦</b><span>FREE TO USE</span><b>✦</b></div></div>
    <section class="mg-tool-section mg-section" id="tools" aria-labelledby="mg-tools-title">
      <div class="mg-section-intro"><span class="mg-kicker"><span class="mg-kicker-line"></span> 01 / YOUR WORKSPACE</span><div><h2 id="mg-tools-title">Everyday tools.<br><em>Uncommon attention to detail.</em></h2><p>Seven focused utilities for the moments that matter between creating a product and putting it in front of someone.</p></div></div>
      <div class="mg-tool-controls"><div class="mg-filters" role="group" aria-label="Filter tools"><button type="button" class="active" data-filter="all" aria-pressed="true">All tools <span>07</span></button><button type="button" data-filter="image" aria-pressed="false">Image studio</button><button type="button" data-filter="calculator" aria-pressed="false">Business calculators</button></div><label class="mg-tool-search"><span aria-hidden="true">⌕</span><input id="tool-search" type="search" placeholder="Find your next tool..." aria-label="Search Manglo tools"></label></div>
      <p class="mg-filter-status" id="tool-count" role="status">7 tools ready to use.</p>
      <div class="mg-tool-grid">${tools.map(card).join('')}</div>
      <div class="mg-search-empty" id="search-empty" hidden><h3>No matching tools.</h3><p>Try “image”, “resize”, or “profit”.</p><button type="button" id="clear-search" class="mg-button mg-button-ghost">Show all tools →</button></div>
    </section>
    <section class="mg-vision mg-section" aria-labelledby="mg-vision-title"><div class="mg-vision-image"><img src="/assets/photography-studio.webp" alt="An orderly product photography setup" width="1536" height="1024" loading="lazy"><span>THE RIGHT DETAILS MAKE THE DIFFERENCE</span></div><div class="mg-vision-copy"><span class="mg-kicker"><span class="mg-kicker-line"></span> 02 / THE MANGLO IDEA</span><h2 id="mg-vision-title">The work behind great work deserves <em>better tools.</em></h2><p>Images that tell the truth. Numbers that make sense. A workspace that stays out of the way. Manglo brings the everyday essentials together without another login, subscription, or complicated dashboard.</p><div class="mg-vision-points"><div><span>01</span><strong>Use it right away.</strong><p>Open a tool and start. No account setup is required.</p></div><div><span>02</span><strong>Keep your files yours.</strong><p>Image processing happens inside your browser, not on a Manglo upload server.</p></div><div><span>03</span><strong>Know the assumptions.</strong><p>Our calculators explain their inputs and the costs you should consider.</p></div></div><a class="mg-inline-link" href="/about/">Meet Manglo <span>→</span></a></div></section>
    <section class="mg-process mg-section"><div class="mg-section-intro"><span class="mg-kicker"><span class="mg-kicker-line"></span> 03 / FROM IDEA TO READY</span><div><h2>One clear step<br><em>at a time.</em></h2><p>A simple workflow you can actually use. Start where you are; keep the tools that help.</p></div></div><div class="mg-process-grid"><a href="/tools/image-resizer/"><span>STEP / 01</span><strong>Prepare your product photos.</strong><p>Resize, crop and export for the destination you have in mind.</p><i>EXPLORE IMAGE TOOLS →</i></a><a href="/tools/profit-calculator/"><span>STEP / 02</span><strong>See the full cost.</strong><p>Check prices, fees and shipping before you set a margin.</p><i>CHECK A MARGIN →</i></a><a href="/playbook/product-listing-preflight-checklist/"><span>STEP / 03</span><strong>Publish with confidence.</strong><p>Use the 12-point listing checklist before the final click.</p><i>OPEN THE CHECKLIST →</i></a></div></section>
    <section id="guides" class="mg-home-reading" aria-label="Manglo Playbook highlights"><!-- PLAYBOOK_HOME_TEASER --></section>
    <section class="mg-faq-section mg-section"><div class="mg-faq-intro"><span class="mg-kicker"><span class="mg-kicker-line"></span> 05 / GOOD TO KNOW</span><h2>Thoughtful tools.<br><em>Straight answers.</em></h2><a class="mg-inline-link" href="/contact/">Still have a question? Contact us →</a></div><div class="mg-faq-list"><details><summary>Is Manglo really free?<span aria-hidden="true">+</span></summary><p>Yes. All seven current tools are free to use, without an account or subscription. If that changes, any paid features will be clearly labelled.</p></details><details><summary>Do my images get uploaded?<span aria-hidden="true">+</span></summary><p>No. The image tools run in your browser. Images are processed locally; Manglo does not receive your files. Keep a copy of the original and review your export.</p></details><details><summary>Will this work on mobile?<span aria-hidden="true">+</span></summary><p>The tools support modern mobile browsers. Very large files may take longer on devices with limited memory.</p></details><details><summary>Can I trust the profit estimates?<span aria-hidden="true">+</span></summary><p>The calculations use the values you enter. They are planning estimates, not official marketplace statements, tax advice or a substitute for bookkeeping.</p></details></div></section>
    <section class="mg-end-cta"><div class="mg-end-glow" aria-hidden="true"></div><span class="mg-kicker">A LITTLE LESS FRICTION</span><h2>Make room for<br><em>what comes next.</em></h2><p>Choose a tool. Get something done. Keep moving.</p><a class="mg-button mg-button-primary" href="#tools">Find your tool <span>→</span></a></section>
  </div>`;
}
