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
    <section class="mg-chat-section" id="tools" aria-labelledby="mg-home-title">
      <div class="mg-chat-heading"><span class="mg-kicker">MANGLO / YOUR CREATIVE WORKSPACE</span><h1 id="mg-home-title">What can Manglo<br><em>help you with?</em></h1></div>
      <div id="manglo-chat-root" class="mchat-root"><div class="mchat-fallback"><h3>Make something useful with Manglo.</h3><p>Our image tools and seller calculators are available free without an account. Use the browser workspace or visit a direct tool.</p><div class="mchat-fallback-links">${tools.map(tool => `<a href="/tools/${escape(tool.id)}/">${escape(tool.name)}</a>`).join('')}</div></div></div>
      <noscript><p>Enable JavaScript to use the chat workspace. The seven individual tools linked above remain available.</p></noscript>
    </section>
    <section id="guides" class="mg-home-reading" aria-label="Manglo Playbook highlights"><!-- PLAYBOOK_HOME_TEASER --></section>
    <section class="mg-end-cta"><div class="mg-end-glow" aria-hidden="true"></div><span class="mg-kicker">MANGLO / FREE TO USE</span><h2>Your next good idea<br><em>starts here.</em></h2><p>Prepare an image or check the numbers. Your work stays yours.</p><a class="mg-button mg-button-primary" href="#tools">Open Manglo Studio <span>→</span></a></section>
  </div>`;
}
