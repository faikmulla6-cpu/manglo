// Search-intent guides for everyday users, selected for practical relevance to
// Manglo's seven tools. These are not claimed to be Google rank/volume winners.
// Factual format references: MDN image formats and web.dev image guidance.
export const searchGuides = [
  {
    slug: 'compress-image-to-100kb-200kb',
    category: 'Image size & uploads',
    title: 'How to compress an image to 100 KB or 200 KB for an online form',
    description: 'Step-by-step guide to reducing JPG, PNG or WebP images toward a 100 KB or 200 KB upload limit without sacrificing essential details.',
    dek: 'A form asks for a smaller photo. Here is how to meet the limit while keeping the face, text and edges clear.',
    image: '/assets/photography-studio.webp',
    imageAlt: 'A camera and photograph setup, illustrating careful image preparation',
    readTime: 7,
    published: '2026-11-07',
    tool: { href: '/tools/target-size-compressor/', label: 'Try the target-size compressor' },
    body: `
      <p>“Image must be under 100 KB” is a familiar kind of upload error. A larger photo is not necessarily a better form photo, and an extremely compressed photo might be rejected for being unreadable. The goal is to satisfy the <em>specific form's rules</em> while keeping identifying details clear. A 100 KB target is not the same thing as a 100-pixel image.</p>
      <h2 id="check-requirements">1. Read the upload requirements first</h2>
      <p>Find four separate details on the form: accepted file type (usually stated as JPG/JPEG or PNG), maximum file size, pixel dimensions or aspect ratio, and any background or photo-content rules. Some portals also specify a minimum file size. Do not assume that the requirements of one exam, application, school or employer are the requirements of another. Check the live portal before editing.</p>
      <div class="pb-callout"><strong>Example, not an official form requirement</strong><p>Imagine a portal accepts JPG images up to 200 KB and requires the subject to be clearly visible. Your objective is a <em>JPG file at or below 200 KB</em> that preserves adequate detail—not simply the smallest file possible.</p></div>
      <h2 id="clean-original">2. Begin with a clear original image</h2>
      <p>Choose an in-focus photo with a well-lit subject. Keep a separate original, because shrinking and re-exporting the same already-compressed copy can cause additional quality loss. If the original is a PNG screenshot or photograph and the form accepts JPG, a JPG export may produce a smaller file. But JPG removes transparency, so it is not right for every graphic.</p>
      <h2 id="make-file-smaller">3. Reduce size in the right order</h2>
      <ol><li><strong>Crop only if the form allows it.</strong> Remove needless empty space without cutting off required content.</li><li><strong>Resize to the required pixels.</strong> If the form specifies width and height, prioritize that requirement; do not invent a standard size.</li><li><strong>Choose an accepted format.</strong> JPG often suits photos, while PNG can be better for sharp text or graphics if allowed.</li><li><strong>Compress gradually.</strong> Try a moderate-quality output first and compare the result before pushing quality lower.</li></ol>
      <p>Manglo's <a href="/tools/target-size-compressor/">target-size tool</a> lets you upload a JPG, PNG or WebP image and request a limit such as <strong>100 KB</strong> or <strong>200 KB</strong>. Processing happens in your browser. The tool can adjust quality or dimensions as needed, but very detailed images might not reach an extremely low limit at acceptable quality.</p>
      <h2 id="verify-export">4. Check the actual downloaded file</h2>
      <p>Open the exported file and verify its size in your device's file information. Also confirm its true format; renaming <code>.png</code> to <code>.jpg</code> does not convert it. Zoom in to check faces, lettering, signatures, borders or any element the application requires. Look at the complete photo again, then try the upload. If the portal still rejects it, read the exact error rather than repeatedly compressing.</p>
      <h2 id="troubleshooting">Why a 100 KB export may still be rejected</h2>
      <table><thead><tr><th>What the form says</th><th>What to check next</th></tr></thead><tbody><tr><td>File too large</td><td>Inspect the downloaded file's actual KB/MB size.</td></tr><tr><td>Invalid file type</td><td>Export in the accepted format, not just a renamed extension.</td></tr><tr><td>Incorrect dimensions</td><td>Check width × height in pixels and required orientation.</td></tr><tr><td>Photo unclear</td><td>Start with a sharper original or use less compression.</td></tr></tbody></table>
      <h2 id="quality-rule">A simple quality rule</h2>
      <p>Never sacrifice important details just to achieve a particular byte count. If the requirement cannot be met without severe blur, review the portal's precise specifications, start with a better source, and contact the form operator when necessary. The <a href="/playbook/resize-photo-in-pixels-without-stretching/">photo resizing guide</a> explains how to control dimensions without distortion.</p>
      <p class="pb-source-note">Technical reference: <a href="https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types" rel="noopener noreferrer" target="_blank">MDN image format guide</a>.</p>
    `
  },
  {
    slug: 'resize-photo-in-pixels-without-stretching',
    category: 'Image size & uploads',
    title: 'How to resize a photo in pixels without stretching or blurring it',
    description: 'Learn the difference between pixel dimensions and file size, preserve aspect ratio, and resize photos for websites, profile images and forms.',
    dek: 'A photo can fit the exact pixel limit without looking squashed. The trick is to protect its proportions.',
    image: '/assets/seller-still-life.webp',
    imageAlt: 'Product photograph with visible edges for checking resize quality',
    readTime: 6,
    published: '2026-11-07',
    tool: { href: '/tools/image-resizer/', label: 'Resize your photo' },
    body: `
      <p>You have a photo that is 4,000 × 3,000 pixels. The upload page asks for something smaller. Should you enter 1,000 × 1,000? Not immediately: changing both numbers without considering the photo's original shape can make people and objects look stretched.</p>
      <h2 id="pixels">Understand pixels before you resize</h2>
      <p><strong>Width × height</strong> is the number of picture elements across and down the image. <strong>KB or MB</strong> is the amount of storage the encoded file uses. They are related, but not interchangeable. Two images with identical dimensions can have very different file sizes because of their contents, format and compression settings.</p>
      <h2 id="ratio">Keep the aspect ratio</h2>
      <p>Aspect ratio is width divided by height. A 4,000 × 3,000 photo has a 4:3 ratio. To keep that shape at one-quarter scale, use <strong>1,000 × 750</strong> pixels, not 1,000 × 1,000. The same proportions are maintained, so a round object stays round.</p>
      <div class="pb-equation">New height = original height × (new width ÷ original width)</div>
      <p>For our example: 3,000 × (1,000 ÷ 4,000) = <strong>750 pixels</strong>. You can calculate the width from a target height in exactly the same way.</p>
      <h2 id="steps">Resize in four steps</h2>
      <ol><li>Keep an untouched original file.</li><li>Find the exact pixel requirement of the website, employer, form or social platform.</li><li>Open the <a href="/tools/image-resizer/">Manglo image resizer</a>, upload the photo and enter the desired maximum dimensions.</li><li>Leave <strong>Preserve aspect ratio</strong> enabled for a proportional fit, then download and inspect the result.</li></ol>
      <p>When aspect ratio is preserved, Manglo fits the image <em>within</em> the requested width and height. The final dimensions may be smaller than one of the numbers you entered. If a portal demands an exact square, crop to square first with the <a href="/tools/image-cropper/">crop tool</a>; stretching a rectangular photograph is not the answer.</p>
      <h2 id="blurry">Why a resized photo sometimes looks blurry</h2>
      <ul><li><strong>Enlarging a small source:</strong> adding pixels cannot recreate missing details.</li><li><strong>Over-compression:</strong> a low-quality JPG export can soften fine lines.</li><li><strong>Wrong crop:</strong> a subject that is tiny in the frame remains tiny after resizing.</li><li><strong>Comparing at different zoom levels:</strong> judge the image at its real destination size.</li></ul>
      <h2 id="decision">Resize or compress—which one do you need?</h2>
      <table><thead><tr><th>Requirement</th><th>Start with</th></tr></thead><tbody><tr><td>“Max 800 × 800 pixels”</td><td>Resize, preserving the required shape.</td></tr><tr><td>“Image under 200 KB”</td><td>Target-size compression, after meeting dimension rules.</td></tr><tr><td>“Square image only”</td><td>Crop to 1:1, then resize.</td></tr></tbody></table>
      <p>Always check the site's own current specifications. The <a href="/playbook/compress-image-to-100kb-200kb/">100 KB / 200 KB guide</a> covers the next step if the dimensions are right but the file is still too heavy.</p>
      <p class="pb-source-note">Further reading: <a href="https://web.dev/articles/choose-the-right-image-format" rel="noopener noreferrer" target="_blank">web.dev on image dimensions and formats</a>.</p>
    `
  },
  {
    slug: 'convert-png-jpg-webp-step-by-step',
    category: 'Image size & uploads',
    title: 'How to convert PNG to JPG, JPG to PNG or WebP correctly',
    description: 'A practical conversion guide for JPG, PNG and WebP, including transparency, quality, web use and common upload mistakes.',
    dek: 'Converting a file is more than changing its name. Choose the format that your destination can actually open.',
    image: '/assets/photography-studio.webp',
    imageAlt: 'Digital photo setup showing a detailed image suitable for format conversion',
    readTime: 6,
    published: '2026-11-07',
    tool: { href: '/tools/image-converter/', label: 'Convert JPG, PNG or WebP' },
    body: `
      <p>An application may say “JPG only”, while your phone or design software produces PNG or WebP. The fix is to <strong>re-encode</strong> the actual image into an accepted format. Editing the letters after the filename dot does not change the underlying image data.</p>
      <h2 id="choose">Choose the output format first</h2>
      <table><thead><tr><th>Format</th><th>Useful for</th><th>Important limitation</th></tr></thead><tbody><tr><td>JPG / JPEG</td><td>Photos and broadly compatible uploads</td><td>Lossy; cannot keep transparent pixels.</td></tr><tr><td>PNG</td><td>Sharp text, diagrams, logos, transparent designs</td><td>Photographs can become large files.</td></tr><tr><td>WebP</td><td>Efficient images on modern websites</td><td>Some external upload portals may not accept it.</td></tr></tbody></table>
      <h2 id="convert">Convert an image with Manglo</h2>
      <ol><li>Open the <a href="/tools/image-converter/">free image converter</a>.</li><li>Choose a JPG, PNG or WebP image from your device.</li><li>Select the <strong>output format</strong> explicitly.</li><li>For JPG or WebP, start with moderate-to-high quality and inspect the preview or result.</li><li>Download the new file, check its extension and open it once before uploading.</li></ol>
      <p>The image conversion happens locally in your browser. The original stays available on your device unless you delete it yourself.</p>
      <h2 id="transparent">What happens to transparency?</h2>
      <p>PNG and WebP can contain transparent regions. JPG cannot. When you convert a transparent image to JPG in Manglo, the transparent areas are filled with white. If your graphic must retain a cut-out background, use PNG or WebP and make sure the destination supports it.</p>
      <h2 id="quality">Does converting always improve quality or reduce size?</h2>
      <p>No. Exporting an already blurry JPG as PNG does <em>not</em> restore its original detail. A PNG of a photograph can be larger than the JPG source, and a WebP export may or may not be smaller depending on the image and settings. Keep the original and compare outputs at the same pixel dimensions.</p>
      <div class="pb-callout"><strong>A common mistake</strong><p>Uploading <code>photo.png</code> after renaming it <code>photo.jpg</code> may still fail because the file remains PNG internally. Use a real converter, then verify the exported result.</p></div>
      <h2 id="destination">Match the destination, not the trend</h2>
      <p>For a form that explicitly asks for JPEG, choose JPG. For a transparent logo in a design, start with PNG. For a website image where WebP is supported, compare a WebP export. If the main problem is upload size rather than format, use the <a href="/tools/target-size-compressor/">target-size compressor</a> too.</p>
      <p class="pb-source-note">Format reference: <a href="https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types" rel="noopener noreferrer" target="_blank">MDN's image file type guide</a>.</p>
    `
  },
  {
    slug: 'photo-upload-error-size-format-dimensions',
    category: 'Image size & uploads',
    title: 'Photo upload failed? Fix file size, format and dimension errors',
    description: 'Troubleshoot common photo and signature upload errors on application forms, portals and websites with a clear diagnostic checklist.',
    dek: '“Invalid image” does not tell you much. Find out which rule failed before editing the file again.',
    image: '/assets/seller-still-life.webp',
    imageAlt: 'Close-up product photograph illustrating file preparation and quality checks',
    readTime: 7,
    published: '2026-11-07',
    tool: { href: '/tools/target-size-compressor/', label: 'Check an image-size target' },
    body: `
      <p>A website says your photo cannot be uploaded, but the image opens normally on your phone. The problem may be the file's actual format, its dimensions, byte size or a browser issue. This guide helps you isolate the cause without destroying the quality of a good original.</p>
      <h2 id="read-error">1. Copy the exact error message</h2>
      <p>Before changing anything, note what the portal says. “Maximum 200 KB” means a file-size cap. “500 × 500 pixels” describes dimensions. “JPEG only” is a format restriction. A vague “upload failed” may be unrelated to the image itself. Check any instructions next to the upload field as well.</p>
      <h2 id="four-checks">2. Check four facts about the file</h2>
      <ol><li><strong>Format:</strong> the file should actually be encoded in an accepted type, not simply renamed.</li><li><strong>Size:</strong> compare KB or MB against any minimum and maximum limits.</li><li><strong>Dimensions:</strong> inspect width and height in pixels; keep the required orientation.</li><li><strong>Content:</strong> verify that required faces, documents, signatures or product details remain fully visible and legible.</li></ol>
      <table><thead><tr><th>Error</th><th>Likely first action</th></tr></thead><tbody><tr><td>Unsupported type</td><td>Convert to the accepted JPG, PNG or WebP format.</td></tr><tr><td>Exceeds size limit</td><td>Compress toward the stated KB limit.</td></tr><tr><td>Wrong dimensions</td><td>Crop if necessary, then resize to the stated pixels.</td></tr><tr><td>Image is blurry</td><td>Return to a better original; reduce compression.</td></tr><tr><td>Upload failed / network</td><td>Check connection, file permissions and portal availability.</td></tr></tbody></table>
      <h2 id="fix">3. Edit the smallest thing necessary</h2>
      <p>If a photo is already the right width and height, do not crop it simply because the file is too large. Instead, try <a href="/tools/target-size-compressor/">compression</a>. If it is the wrong shape, use the <a href="/tools/image-cropper/">cropper</a> before the <a href="/tools/image-resizer/">resizer</a>. If the extension is unsupported, use the <a href="/tools/image-converter/">converter</a>. Working from a retained original helps you reverse a bad export.</p>
      <h2 id="check-upload">4. Try uploading the exported copy</h2>
      <p>Open the new file and inspect it. Confirm the exact final file name and extension, then select the exported copy—it's easy to reselect the original accidentally. For a persistent generic error, try a fresh browser tab, check browser file-access permissions and look for portal maintenance notices.</p>
      <h2 id="avoid">What not to do</h2>
      <ul><li>Do not rename a PNG to JPG without converting it.</li><li>Do not stretch a portrait into a square without cropping.</li><li>Do not turn an unreadable signature or face into a tiny file merely to meet a number.</li><li>Do not assume every application portal uses the same specifications.</li></ul>
      <p>For common KB targets, follow the <a href="/playbook/compress-image-to-100kb-200kb/">100 KB / 200 KB walkthrough</a>. If none of the published checks solves the issue, contact the portal operator with the error text and non-sensitive file details. Don't send personal documents to random third-party helpers.</p>
    `
  },
  {
    slug: 'calculate-discount-percentage-final-price',
    category: 'Everyday calculations',
    title: 'How to calculate a discount percentage and final price',
    description: 'Simple formulas for 10%, 20%, 30% and other discounts, with worked rupee examples and a check for real savings.',
    dek: 'Know the final price and how much you save before you buy—or before you announce a sale.',
    image: '/assets/seller-desk.webp',
    imageAlt: 'Calculator on a desk for checking price and discount arithmetic',
    readTime: 6,
    published: '2026-11-07',
    tool: { href: '/tools/discount-calculator/', label: 'Calculate a discount' },
    body: `
      <p>A “30% off” label tells you the percentage reduction, not the exact amount you will pay. The arithmetic is easy once you know the original price. You can use the same formulas for shopping, invoices and planning promotions.</p>
      <h2 id="formula">The two basic discount formulas</h2>
      <div class="pb-equation">Discount amount = original price × (discount % ÷ 100)<br>Final price = original price − discount amount</div>
      <p>For an item marked at ₹1,000 with a 20% discount, the reduction is ₹1,000 × 0.20 = <strong>₹200</strong>. The customer pays <strong>₹800</strong> before any additional taxes, shipping or fees that may apply.</p>
      <h2 id="examples">Quick examples you can check yourself</h2>
      <table><thead><tr><th>Original</th><th>Discount</th><th>You save</th><th>New price</th></tr></thead><tbody><tr><td>₹500</td><td>10%</td><td>₹50</td><td>₹450</td></tr><tr><td>₹1,000</td><td>20%</td><td>₹200</td><td>₹800</td></tr><tr><td>₹2,000</td><td>25%</td><td>₹500</td><td>₹1,500</td></tr><tr><td>₹1,500</td><td>30%</td><td>₹450</td><td>₹1,050</td></tr><tr><td>₹800</td><td>50%</td><td>₹400</td><td>₹400</td></tr></tbody></table>
      <p>These are arithmetic examples, not current prices at any retailer. The same formulas work with other currencies.</p>
      <h2 id="reverse">How to find the discount percentage from two prices</h2>
      <div class="pb-equation">Discount % = ((original price − sale price) ÷ original price) × 100</div>
      <p>If a ₹1,200 item now costs ₹900, the savings are ₹300. Divide ₹300 by ₹1,200 and multiply by 100: the reduction is <strong>25%</strong>. This only works when the stated original price is genuine; the arithmetic cannot verify a store's pricing claims.</p>
      <h2 id="twice">Why two discounts don't simply add together</h2>
      <p>Suppose a ₹1,000 item gets 20% off, then another 10% off the already reduced price. After the first discount it costs ₹800. The second discount is 10% of ₹800, or ₹80, leaving <strong>₹720</strong>. Total savings are ₹280, equivalent to 28% of the original—not 30%.</p>
      <h2 id="taxes">What about tax and delivery?</h2>
      <p>Check whether a displayed price already includes tax, whether delivery charges apply, and whether a coupon has eligibility conditions. A discount on the product price does not necessarily reduce every part of the final checkout total.</p>
      <h2 id="use-calculator">Check the result without mental math</h2>
      <p>Enter the original price and percentage in the <a href="/tools/discount-calculator/">Manglo discount calculator</a>. If you're selling rather than buying, add your product cost to estimate what remains after the reduction. For a fuller estimate including other expenses, use the <a href="/tools/profit-calculator/">profit calculator</a>.</p>
    `
  },
  {
    slug: 'crop-photo-square-portrait-landscape',
    category: 'Image size & uploads',
    title: 'How to crop a photo to square, portrait or landscape',
    description: 'Understand 1:1, 4:5, 16:9 and 9:16 photo ratios and crop images without stretching or cutting off the subject.',
    dek: 'An image can have the right shape without looking squeezed or losing the details that matter.',
    image: '/assets/photography-studio.webp',
    imageAlt: 'Photo studio arrangement suitable for comparing portrait and landscape crops',
    readTime: 6,
    published: '2026-11-07',
    tool: { href: '/tools/image-cropper/', label: 'Crop an image' },
    body: `
      <p>Profile photos, product cards, stories and video thumbnails often use different shapes. If you upload the same image everywhere, the website might cut off the subject automatically. Taking control of the crop lets you decide what stays in the frame.</p>
      <h2 id="ratios">Common aspect ratios explained</h2>
      <table><thead><tr><th>Ratio</th><th>Shape</th><th>Example use</th></tr></thead><tbody><tr><td>1:1</td><td>Square</td><td>Square avatar or product thumbnail</td></tr><tr><td>4:5</td><td>Portrait</td><td>Tall feed image</td></tr><tr><td>16:9</td><td>Landscape</td><td>Wide banner or video-style image</td></tr><tr><td>9:16</td><td>Tall portrait</td><td>Story-style visual</td></tr></tbody></table>
      <p>These are popular shapes, not guaranteed specifications for every platform. Always check the destination's current rules before exporting.</p>
      <h2 id="crop-vs-resize">Crop and resize are different actions</h2>
      <p><strong>Cropping</strong> removes part of the outside image to change framing or proportions. <strong>Resizing</strong> changes how many pixels the remaining image has. If a landscape photo must become square, crop first. Do not simply change its width until everything is distorted.</p>
      <h2 id="steps">Crop using Manglo</h2>
      <ol><li>Choose a clear original image and keep a copy untouched.</li><li>Open the <a href="/tools/image-cropper/">Manglo cropper</a> and upload it.</li><li>Select square 1:1, portrait 4:5, landscape 16:9 or story 9:16.</li><li>Use the position controls to keep the most important subject in view.</li><li>Export, inspect the final frame and resize separately if a pixel limit is specified.</li></ol>
      <h2 id="composition">Keep the subject where it belongs</h2>
      <p>For an identification or application photo, follow the issuing organization's exact composition instructions. For product photographs, avoid cropping off handles, accessories or visible condition details. For a portrait, leave enough space around the face that the destination's own thumbnail crop will not remove part of it.</p>
      <h2 id="mistakes">Three easy mistakes to avoid</h2>
      <ul><li><strong>Stretching:</strong> changes the subject's real shape.</li><li><strong>Over-tight framing:</strong> leaves no breathing room around a product or face.</li><li><strong>Wrong final dimensions:</strong> a square crop may still be too large or too small in pixels.</li></ul>
      <p>Once the crop is right, use the <a href="/tools/image-resizer/">resizer</a> to fit pixel dimensions or the <a href="/tools/target-size-compressor/">target-size compressor</a> for a KB limit. The best workflow changes only what the destination requires.</p>
    `
  }
];
