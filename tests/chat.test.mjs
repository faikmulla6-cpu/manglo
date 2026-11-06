import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { transformWithOxc } from 'vite';

const source = await readFile(new URL('../src/chat-engine.ts', import.meta.url), 'utf8');
const compiled = (await transformWithOxc(source, 'chat-engine.ts')).code;
const engine = await import('data:text/javascript;base64,' + Buffer.from(compiled).toString('base64'));

test('assistant routes each of the seven supported tasks', () => {
  const cases = [
    ['Compress this photo', 'image-compressor'],
    ['Resize to 1200 x 800', 'image-resizer'],
    ['Convert my image to PNG', 'image-converter'],
    ['Crop this picture square', 'image-cropper'],
    ['Make this image under 200 KB', 'target-size-compressor'],
    ['Calculate profit from a sale', 'profit-calculator'],
    ['Give me a 20% discount', 'discount-calculator'],
  ];
  for (const [prompt, expected] of cases) assert.equal(engine.detectTool(prompt), expected);
  assert.equal(engine.detectTool('Hello Manglo'), null);
});

test('profit and discount use real user-supplied arithmetic', () => {
  const profit = engine.calculateFromMessage('profit-calculator',
    'Profit for selling price ₹1000, product cost ₹400, fee 10%, fixed ₹10, shipping ₹80, packaging ₹30');
  assert.match(profit.body, /₹380\.00/);
  assert.match(profit.body, /38\.0%/);
  const natural = engine.calculateFromMessage('profit-calculator',
    'Profit for ₹1000 sale, ₹400 cost, ₹110 fee, ₹80 shipping, ₹30 packaging');
  assert.match(natural.body, /₹380\.00/);
  assert.match(natural.body, /Fees: ₹110\.00/);
  const discount = engine.calculateFromMessage('discount-calculator',
    'Calculate a 20% discount on original price ₹1000, cost ₹400');
  assert.match(discount.body, /Sale price: ₹800\.00/);
  assert.match(discount.body, /Profit after entered cost: ₹400\.00/);
  const naturalDiscount = engine.calculateFromMessage('discount-calculator', 'Calculate a 20% discount on $100');
  assert.match(naturalDiscount.body, /Sale price: \$80\.00/);
  assert.throws(() => engine.calculateFromMessage('profit-calculator', 'profit please'), /selling price/i);
  assert.throws(() => engine.calculateFromMessage('discount-calculator', 'price 1000 discount 120%'), /0 to 100%/);
});

test('image instructions validate dimensions, formats and target KB', () => {
  assert.deepEqual(engine.parseImageOptions('image-resizer', 'resize to 1200 x 800').resize,
    { width: 1200, height: 800 });
  assert.equal(engine.parseImageOptions('image-converter', 'convert to png').type, 'image/png');
  assert.equal(engine.parseImageOptions('image-cropper', 'crop for 4:5 portrait').crop.ratio, .8);
  assert.equal(engine.parseImageOptions('target-size-compressor', 'compress to under 200kb').targetBytes, 204800);
  assert.throws(() => engine.parseImageOptions('image-converter', 'convert photo'), /JPG.*PNG.*WebP/);
  assert.throws(() => engine.parseImageOptions('target-size-compressor', 'compress to 1kb'), /5 KB/);
});

test('image engine creates a downloadable encoded export using a browser canvas', async () => {
  const previous = { bitmap: globalThis.createImageBitmap, document: globalThis.document };
  const commands = [];
  globalThis.createImageBitmap = async () => ({ width: 1600, height: 1200, close() {} });
  globalThis.document = { createElement: () => ({
    width: 0, height: 0,
    getContext() { return { drawImage(...args) { commands.push(args); }, fillRect() {}, imageSmoothingQuality: 'high' }; },
    toBlob(done, type) { done(new Blob(['output'], { type })); },
  }) };
  try {
    const file = { type: 'image/png', name: 'product.png', size: 22000 };
    const output = await engine.processImage(file, engine.parseImageOptions('image-resizer', 'resize to 800 x 800'));
    assert.equal(output.width, 800);
    assert.equal(output.height, 600);
    assert.equal(output.filename, 'product-manglo.webp');
    assert.equal(output.blob.type, 'image/webp');
    assert.ok(commands.length > 0);
    await assert.rejects(engine.processImage({ ...file, size: 21 * 1024 * 1024 },
      engine.parseImageOptions('image-compressor', 'compress')), /20 MB/);
  } finally { globalThis.createImageBitmap = previous.bitmap; globalThis.document = previous.document; }
});
