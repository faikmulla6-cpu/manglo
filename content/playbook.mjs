import { searchGuides } from './search-guides.mjs';

// Original, evergreen seller education. Publish only material we can explain and
// substantiate; illustrative examples are explicitly labelled as examples.
export const playbookArticles = [
  {
    slug: 'compress-product-images-without-blur',
    category: 'Product photos',
    title: 'How to compress product images without making them blurry',
    description: 'A practical image-export workflow for online sellers: choose sensible dimensions, compare detail, and make smaller files without hiding the product.',
    dek: 'Smaller files are useful. Missing texture, unreadable labels and muddy colors are not. Here is how to balance both.',
    image: '/assets/manglo-product-photo-20261108.webp',
    imageAlt: 'Product bottle on a simple studio set, suitable for inspecting fine photographic details',
    readTime: 7,
    tool: { href: '/tools/image-compressor/', label: 'Try the free image compressor' },
    body: `
      <p>When an image takes too long to load or exceeds a listing upload limit, the instinct is often to drag the quality slider as low as it will go. That can make the file lighter, but it can also destroy the details a buyer needs: fabric weave, packaging text, edges and surface finish. A better approach starts with the image dimensions and ends with a visual check.</p>
      <h2 id="start-with-original">1. Keep a clean original</h2>
      <p>Save the untouched camera file separately. If you compress an image, download it, compress the download, and repeat, you may introduce additional loss with each export. Work from the original when you need a different size or format. Check that the original is in focus; compression cannot repair a blurry photograph.</p>
      <p>For a product listing, prepare a hero view that shows the entire item, a detail image that reveals texture and a context image that conveys scale. An accurate photo is more useful than an artificially sharpened one.</p>
      <h2 id="dimensions-first">2. Reduce unnecessary pixels before reducing quality</h2>
      <p>A 4,000-pixel-wide camera photo may be larger than the destination needs. If the marketplace asks for a smaller image, resize to suit its current requirements first. For a general-purpose draft, 1,200 pixels on the longest side is a reasonable starting point—not a universal rule. Always check your selling platform's documentation.</p>
      <div class="pb-callout"><strong>Illustrative workflow</strong><p>Start with a 4,000 × 3,000 image. Keep an original. Export a 1,200 × 900 copy, then compare a JPG or WebP version at moderate quality with the original at the same on-screen size. Your actual file size will depend on the photo.</p></div>
      <h2 id="choose-format">3. Pick the right format</h2>
      <ul><li><strong>JPG:</strong> a dependable option for photographs and marketplaces that specify JPEG uploads. It does not preserve transparency.</li><li><strong>WebP:</strong> often makes efficient photographic files and can preserve transparency. Use it when the destination accepts it.</li><li><strong>PNG:</strong> valuable for logos, flat graphics and transparency. Photographic PNG files can be much larger.</li></ul>
      <p>Changing the extension alone does not convert a file. Export it in the format the destination actually supports. See the <a href="/playbook/jpg-png-webp-product-photos/">format decision guide</a> for a deeper comparison.</p>
      <h2 id="inspect-details">4. Inspect three details at normal viewing size</h2>
      <p>Open the exported file on a phone and desktop if possible. Zoom to check small labels, fine edges and textured materials. Then zoom out to the size buyers will actually see. Compare color, not just sharpness. If an important feature is smeared, raise quality, keep more pixels or choose another format.</p>
      <p>Do not promise a fixed percentage reduction. A simple product against a plain background may compress differently from a detailed textile or a noisy low-light photograph. Files that were already optimized may not shrink at all.</p>
      <h2 id="publish-check">5. Check the complete listing</h2>
      <ol><li>Keep the original and name the export clearly.</li><li>Check your marketplace's latest format, dimension and background requirements.</li><li>Confirm the item is not cropped accidentally.</li><li>Inspect text, texture, color and condition after export.</li><li>Check the listing preview at thumbnail size before publishing.</li></ol>
      <p>For Indian sellers, the same workflow works for marketplace listings and catalog messages, but each channel can impose its own limits. Keep separate export presets for each destination rather than using one image everywhere.</p>
      <p><strong>Bottom line:</strong> reduce redundant pixels, pick a suitable format and inspect the result. Quality is a buying-confidence decision, not only a file-size number.</p>
    `
  },
  {
    slug: 'calculate-real-profit-per-order',
    category: 'Pricing & profit',
    title: 'Calculate your real profit per order—not just your markup',
    description: 'Understand the real difference between selling price, markup, profit and margin with transparent INR and USD examples.',
    dek: 'Revenue is what the buyer pays. Profit is what you get to keep after a much longer list of costs.',
    image: '/assets/manglo-seller-desk-20261108.webp',
    imageAlt: 'Desk with calculator and seller paperwork for working through order costs',
    readTime: 8,
    tool: { href: '/tools/profit-calculator/', label: 'Open the profit calculator' },
    body: `
      <p>A busy sales day can feel successful right up until the bills arrive. Product cost is only the beginning: payment fees, marketplace charges, packaging, shipping subsidies, returns and ads can change the result. The safest way to plan is to calculate the economics of one typical order and then test what happens when a cost rises.</p>
      <h2 id="formula">Start with a complete profit formula</h2>
      <div class="pb-equation">Net profit per order = selling price − product cost − platform/payment fees − packaging − shipping you pay − other attributable costs</div>
      <p>Profit margin is <strong>net profit ÷ selling price × 100</strong>. Markup is <strong>profit ÷ cost × 100</strong>. These percentages use different denominators, so they are not interchangeable. State which one you mean whenever you set a pricing target.</p>
      <h2 id="india-example">Worked example: a seller pricing in INR</h2>
      <p>Suppose an independent seller lists an item for ₹999. These are <em>illustrative inputs</em>, not fees quoted by any marketplace:</p>
      <table><thead><tr><th>Per-order item</th><th>Example</th></tr></thead><tbody><tr><td>Customer price</td><td>₹999</td></tr><tr><td>Product cost</td><td>₹420</td></tr><tr><td>Shipping absorbed</td><td>₹100</td></tr><tr><td>Marketplace / transaction fees</td><td>₹109</td></tr><tr><td>Packaging</td><td>₹20</td></tr><tr><td><strong>Estimated net profit</strong></td><td><strong>₹350</strong></td></tr><tr><td>Estimated margin</td><td>35.0%</td></tr></tbody></table>
      <p>The calculation is ₹999 − ₹420 − ₹100 − ₹109 − ₹20 = ₹350. If the business also spends ₹70 in advertising to acquire that order, the estimate falls to ₹280 before any other uncounted costs. The important lesson is to list every cost explicitly.</p>
      <h2 id="global-example">The same method for a global seller</h2>
      <p>A $40 order with $13 product cost, $5 shipping, $3 transaction fees and $2 packaging leaves $17, or a 42.5% margin, before returns, ads and tax. The currency changes; the arithmetic does not.</p>
      <h2 id="returns">Don't forget returns, discounts and taxes</h2>
      <p>If some orders are returned, track the actual cost of those returns over time. An expected per-order return allowance can be estimated from your own history, but do not invent a universal return rate. Discounts reduce revenue, while some fees still apply after a promotion. Sales tax, VAT and GST treatment varies by jurisdiction and transaction; a generic calculator cannot determine your legal obligations.</p>
      <div class="pb-callout"><strong>Practical decision rule</strong><p>Calculate a base case, a higher-shipping case and a promotional case. If a small change turns your margin negative, revisit the price or cost structure before scaling ads.</p></div>
      <h2 id="monthly-habit">Make this a monthly habit</h2>
      <ol><li>Recheck supplier prices and packaging costs.</li><li>Compare expected marketplace fees with settlement statements.</li><li>Record returns, replacements and ad spend separately.</li><li>Review profit by product, not just total sales.</li><li>Use one currency and consistent tax treatment within each calculation.</li></ol>
      <p>Use the <a href="/tools/profit-calculator/">Manglo profit calculator</a> to enter your own numbers. Its output is an estimate, not financial or tax advice.</p>
    `
  },
  {
    slug: 'jpg-png-webp-product-photos',
    category: 'Product photos',
    title: 'JPG vs PNG vs WebP: a seller’s practical image guide',
    description: 'Choose among JPG, PNG and WebP for product listings, transparent graphics, social images and web pages without relying on vague file-size claims.',
    dek: 'The best image format is the one that keeps the important detail and works where your customer will see it.',
    image: '/assets/manglo-photo-workspace-20261108.webp',
    imageAlt: 'Small product photography setup with a clean backdrop and natural light',
    readTime: 7,
    tool: { href: '/tools/image-converter/', label: 'Convert an image locally' },
    body: `
      <p>You have finished the product shoot. Now you need a listing thumbnail, a transparent badge and an image for your own store. Should each file be a JPG, PNG or WebP? There is no universal winner. These formats make different trade-offs between compatibility, transparency and compression.</p>
      <h2 id="quick-answer">The short decision table</h2>
      <table><thead><tr><th>Use case</th><th>Usually start with</th><th>Why</th></tr></thead><tbody><tr><td>Standard product photograph</td><td>JPG</td><td>Broad listing compatibility; manageable file sizes</td></tr><tr><td>Product photograph on your own website</td><td>WebP</td><td>Efficient delivery where supported</td></tr><tr><td>Transparent logo or graphic</td><td>PNG or WebP</td><td>Preserves transparent areas</td></tr><tr><td>Marketplace with a stated format requirement</td><td>That required format</td><td>Acceptance matters more than theoretical efficiency</td></tr></tbody></table>
      <h2 id="jpg">JPG: the practical photograph default</h2>
      <p>JPEG uses lossy compression, so lower quality settings can introduce visible blocks and smearing. It is widely accepted and works well for photographic subjects. It cannot preserve transparency. White-background product photographs are a common fit, provided the marketplace permits them and you check small print after export.</p>
      <h2 id="png">PNG: clean graphics and transparency</h2>
      <p>PNG is lossless for the stored pixel data, which is useful for typography, logos, diagrams and illustrations with crisp edges. But lossless does not mean every PNG looks better: a blurry source remains blurry, and a photographic PNG can be unnecessarily large. PNG does not recover original quality after prior lossy compression.</p>
      <h2 id="webp">WebP: efficient for the web</h2>
      <p>WebP supports both lossy and lossless encoding and can preserve alpha transparency. On websites that serve WebP successfully it is often an efficient option. However, an upload form or older workflow may impose different requirements. Always verify what your destination accepts rather than assuming browser support means marketplace support.</p>
      <h2 id="fair-test">Make a fair comparison with your own photo</h2>
      <ol><li>Keep the same source image and output dimensions.</li><li>Export a JPG and a WebP at comparable visual quality; export PNG if the use case needs it.</li><li>Compare actual file sizes and examine fine details at 100% zoom.</li><li>Check transparency, color, text and the destination upload.</li><li>Pick the smallest acceptable file—not simply the smallest number.</li></ol>
      <p>There are no benchmark results in this article because file size depends on the actual image and encoder settings. You can make an evidence-based choice with your own products using the <a href="/tools/image-converter/">Manglo image converter</a>.</p>
      <h2 id="seller-rule">A simple rule for sellers</h2>
      <p>Export for the destination, keep originals, and check the finished asset. If you sell across countries or channels, store separate export copies so you do not accidentally upload a web-optimized format where a platform expects JPG.</p>
    `
  },
  {
    slug: 'profitable-discount-calculator-guide',
    category: 'Pricing & profit',
    title: 'Is your discount actually profitable? Work it out before the sale',
    description: 'Understand how percentage discounts affect net profit and contribution margin, with a worked INR example and a simple break-even method.',
    dek: 'A 20% sale can do much more than reduce your revenue by 20%. Check the remaining profit first.',
    image: '/assets/manglo-seller-desk-20261108.webp',
    imageAlt: 'Calculator on a desk used to plan a product promotion',
    readTime: 7,
    tool: { href: '/tools/discount-calculator/', label: 'Calculate your sale price' },
    body: `
      <p>A discount looks simple from a customer's side: 20% off means they pay 80% of the original price. From the seller's side, most product costs do not automatically fall by 20%. That is why a promotion can reduce profit far more sharply than it reduces revenue.</p>
      <h2 id="price-formula">First, calculate the new selling price</h2>
      <div class="pb-equation">Sale price = original price × (1 − discount percentage ÷ 100)</div>
      <p>For an item originally priced at ₹1,000, a 25% discount makes the customer price ₹750. Before celebrating the order volume, subtract the full costs attached to each order.</p>
      <h2 id="margin-example">Example: what happens to the margin?</h2>
      <p>Assume the complete per-order cost is ₹650 and stays constant during the promotion. This is an example, not a marketplace rate.</p>
      <table><thead><tr><th></th><th>Regular price</th><th>25% off</th></tr></thead><tbody><tr><td>Selling price</td><td>₹1,000</td><td>₹750</td></tr><tr><td>Total per-order cost</td><td>₹650</td><td>₹650</td></tr><tr><td>Profit</td><td>₹350</td><td>₹100</td></tr><tr><td>Profit margin</td><td>35%</td><td>13.3%</td></tr></tbody></table>
      <p>Revenue falls by 25%, but profit per order falls from ₹350 to ₹100—a reduction of about 71%. Extra volume would need to make up the difference, and there may be extra advertising or fulfillment work as well.</p>
      <h2 id="break-even">Find your break-even discount</h2>
      <p>If costs are fixed per order, the largest discount before profit reaches zero is <strong>(original price − total cost) ÷ original price × 100</strong>. In the example that is 35%. Do not use 35% as a safe promotion target: it leaves nothing for unexpected costs or business overhead. Percentage-based platform fees can change with the discounted price, so recalculate rather than assuming every cost is fixed.</p>
      <h2 id="promotion-checklist">Four questions before announcing a sale</h2>
      <ol><li>Does the discounted price still cover product, packaging, shipping and fees?</li><li>Will advertising or return costs rise during the promotion?</li><li>What is the goal—clearing inventory, attracting new buyers or increasing repeat orders?</li><li>How will you measure actual profit after the promotion ends?</li></ol>
      <div class="pb-callout"><strong>Indian and global sellers</strong><p>Use the same formula in INR, USD, GBP or EUR, but enter your actual local costs. Tax and consumer-promotion rules depend on where and how you sell.</p></div>
      <p>Try the <a href="/tools/discount-calculator/">discount calculator</a> for an immediate sale-price estimate, then the <a href="/tools/profit-calculator/">profit calculator</a> for a fuller cost breakdown.</p>
    `
  },
  {
    slug: 'phone-product-photography-setup',
    category: 'Product photos',
    title: 'A simple phone photography setup for better product listings',
    description: 'Make clearer product photos using a window, clean background and repeatable angles before using free crop, resize and export tools.',
    dek: 'Good product photos come from a repeatable setup more often than from expensive equipment.',
    image: '/assets/manglo-photo-workspace-20261108.webp',
    imageAlt: 'Natural light product photography setup on a tabletop',
    readTime: 8,
    tool: { href: '/tools/image-cropper/', label: 'Crop a product photo' },
    body: `
      <p>If you are selling a handmade candle, a notebook or a phone case, you do not need a full studio to produce useful photos. You need enough light, a stable camera, accurate color and a view that helps a stranger understand the product. A small repeatable setup is especially valuable when you must photograph many items.</p>
      <h2 id="light">1. Start with soft, consistent light</h2>
      <p>Place a table near a window with indirect daylight. If the sunlight is harsh, a thin white curtain can soften shadows. Switch off mixed-color indoor bulbs if they make one side of the object warm and another blue. A white card on the darker side can gently bounce light back toward the product.</p>
      <h2 id="background">2. Keep the background honest and uncluttered</h2>
      <p>A plain sheet of paper, fabric or board may be enough. Pick a neutral surface that contrasts with the item but does not change how its color appears. Remove unrelated packaging and personal information from the frame. If your selling platform specifies a background, follow that requirement instead of a general aesthetic rule.</p>
      <h2 id="angles">3. Capture a useful set of angles</h2>
      <ol><li><strong>Front:</strong> a clear view of the entire product.</li><li><strong>Side or back:</strong> show shape, attachments or ports.</li><li><strong>Detail:</strong> make material, stitching, texture or labels visible.</li><li><strong>Scale:</strong> include a familiar context or a measurement reference without being misleading.</li><li><strong>In use:</strong> show realistic function if relevant.</li></ol>
      <p>If the item has a scratch, variation or defect, represent it accurately rather than editing it away. Buyers should know what they are purchasing.</p>
      <h2 id="phone-settings">4. Use the phone you already have well</h2>
      <p>Clean the lens, tap to focus on the product, avoid digital zoom and support the phone on a stable surface. Keep exposure consistent between photos. Portrait-mode blur can accidentally erase product edges, so check the result carefully. Retouch dust in the background if appropriate, but do not change the item's color, labeling or condition.</p>
      <h2 id="workflow">5. Create an export workflow</h2>
      <p>After shooting, pick the sharpest images. Crop with a little space around the object, resize for your destination and export in the accepted format. The <a href="/tools/image-cropper/">Manglo cropper</a> supports square, portrait and landscape framing; the <a href="/tools/image-resizer/">resizer</a> handles dimensions. Keep the originals so you can create future marketplace-specific versions.</p>
      <div class="pb-callout"><strong>A practical repeatable session</strong><p>Photograph five products using the same window, camera height and background. Check the thumbnails together. Consistent framing makes a catalog easier to browse and usually saves editing time.</p></div>
      <h2 id="final-check">Before publishing</h2>
      <p>Zoom in once to inspect focus. Compare the exported colors with the physical product in normal light. Confirm that buyers can see the relevant dimensions and details. Then check the live listing on mobile, where many customers will first encounter it.</p>
    `
  },
  {
    slug: 'product-listing-preflight-checklist',
    category: 'Seller workflow',
    title: 'The product listing preflight checklist: 12 things to check',
    description: 'A clear, printable 12-step quality checklist for images, titles, pricing, shipping promises, customer trust and final mobile preview.',
    dek: 'Before you hit publish, run through a short list that can prevent expensive surprises later.',
    image: '/assets/manglo-product-photo-20261108.webp',
    imageAlt: 'Prepared product on a clean surface ready for an online listing',
    readTime: 6,
    tool: { href: '/tools/image-resizer/', label: 'Prepare your listing images' },
    body: `
      <p>Publishing a listing is a series of small decisions. It is easy to overlook a shipping cost, unclear photo or misleading title while trying to finish quickly. Use this checklist before each major listing launch. You can check items off on this page or print it; your selections stay in this browser session and are not sent to Manglo.</p>
      <h2 id="checklist">Your 12-step preflight</h2>
      <div class="pb-checklist" data-playbook-checklist>
        <label><input type="checkbox"> <span>1. The main photograph shows the entire item clearly.</span></label>
        <label><input type="checkbox"> <span>2. Detail photos show texture, labels and relevant features.</span></label>
        <label><input type="checkbox"> <span>3. Images match current platform size, format and background requirements.</span></label>
        <label><input type="checkbox"> <span>4. Product color, size and condition are represented honestly.</span></label>
        <label><input type="checkbox"> <span>5. The title says what the product is without keyword stuffing.</span></label>
        <label><input type="checkbox"> <span>6. The description answers common buyer questions in plain English.</span></label>
        <label><input type="checkbox"> <span>7. Variants, dimensions and included items are clear.</span></label>
        <label><input type="checkbox"> <span>8. Price covers product cost, packaging, fees and shipping you absorb.</span></label>
        <label><input type="checkbox"> <span>9. Any discount still meets your margin target.</span></label>
        <label><input type="checkbox"> <span>10. Delivery time, stock and return terms are accurate.</span></label>
        <label><input type="checkbox"> <span>11. You have rights to every image and claim in the listing.</span></label>
        <label><input type="checkbox"> <span>12. The final listing is readable and usable on a phone.</span></label>
        <div class="pb-checklist-controls"><strong data-checklist-count aria-live="polite">0 of 12 complete</strong><button type="button" data-print-checklist>Print checklist →</button></div>
      </div>
      <h2 id="why-it-matters">Why these checks belong together</h2>
      <p>A beautiful photograph cannot fix an incorrect delivery promise. A perfect title cannot rescue an unprofitable order. Treat visual clarity, cost accuracy and buyer expectations as one workflow. Fix the highest-impact mistakes before spending money on traffic.</p>
      <h2 id="make-it-routine">Make it a repeatable routine</h2>
      <p>Create a source-photo folder and keep original files. Store your current product dimensions and materials in a simple spreadsheet. Reuse the same preflight process every time, but check marketplace policies again whenever they change. If you work with a team, assign one person to verify figures and another to check the mobile listing.</p>
      <div class="pb-callout"><strong>Starting point for Indian sellers</strong><p>Before publishing to any marketplace, recheck its current category rules, any required tax information, return terms and image specifications. Those platform-specific rules take priority over this general checklist.</p></div>
      <h2 id="tools">Useful tools for the final pass</h2>
      <p>Use the <a href="/tools/image-resizer/">image resizer</a> and <a href="/tools/image-compressor/">compressor</a> to prepare photos, then check the numbers in the <a href="/tools/profit-calculator/">profit calculator</a>. Every listed tool currently runs without an account.</p>
    `
  },
  ...searchGuides
];

export const categories = ['All topics', 'Product photos', 'Image size & uploads', 'Pricing & profit', 'Everyday calculations', 'Seller workflow'];

