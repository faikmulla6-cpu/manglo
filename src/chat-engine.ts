/** Browser-local operations shared by the seven Manglo assistant actions. */
export type ToolId =
  | "image-compressor" | "image-resizer" | "image-converter"
  | "image-cropper" | "target-size-compressor"
  | "profit-calculator" | "discount-calculator";

export type ImageTask = Exclude<ToolId, "profit-calculator" | "discount-calculator">;
export type ImageResult = {
  blob: Blob;
  filename: string;
  width: number;
  height: number;
  originalBytes: number;
  outputBytes: number;
  format: string;
};

const outputTypes = { webp: "image/webp", jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png" } as const;
const formats = { "image/webp": "webp", "image/jpeg": "jpg", "image/png": "png" } as const;
const imageTypes = Object.keys(formats);

export const toolOptions: { id: ToolId; title: string; subtitle: string; prompt: string }[] = [
  { id: "image-compressor", title: "Compress an image", subtitle: "Lighter photos", prompt: "Compress this image while keeping it clear" },
  { id: "image-resizer", title: "Resize an image", subtitle: "Fit your dimensions", prompt: "Resize this image to fit within 1200 x 1200 pixels" },
  { id: "image-converter", title: "Convert format", subtitle: "JPG, PNG, WebP", prompt: "Convert this image to WebP" },
  { id: "image-cropper", title: "Crop an image", subtitle: "Frame it perfectly", prompt: "Crop this image to a square 1:1" },
  { id: "target-size-compressor", title: "Target file size", subtitle: "Meet upload limits", prompt: "Compress this image to under 200 KB" },
  { id: "profit-calculator", title: "Calculate profit", subtitle: "See what you keep", prompt: "Profit for selling price ₹1000, product cost ₹400, fee 10%, fixed ₹10, shipping ₹80, packaging ₹30" },
  { id: "discount-calculator", title: "Calculate discount", subtitle: "Plan a promotion", prompt: "Calculate a 20% discount on original price ₹1000, cost ₹400" },
];

export function detectTool(input: string, selected?: ToolId | null): ToolId | null {
  const text = input.toLowerCase();
  if (/target size|under\s*[\d.]+\s*(kb|mb)|to\s*[\d.]+\s*(kb|mb)|file.?size limit/.test(text)) return "target-size-compressor";
  if (/\b(discount|promotion|sale price|percent off)\b|\d+(?:\.\d+)?\s*%\s*off\b/.test(text)) return "discount-calculator";
  if (/\b(profit|margin|earnings|revenue|net income)\b/.test(text)) return "profit-calculator";
  if (/\b(crop|square|portrait|landscape)\b|\b(?:1:1|4:5|9:16|16:9)\b/.test(text)) return "image-cropper";
  if (/\b(resize|dimensions?|width|height|scale)\b|\b\d{2,5}\s*(?:x|×|by)\s*\d{2,5}\b/.test(text)) return "image-resizer";
  if (/\b(compress|optimi[sz]e|shrink|reduce|smaller)\b/.test(text)) return "image-compressor";
  if (/\b(convert|format|jpe?g|png|webp)\b/.test(text)) return "image-converter";
  return selected ?? null;
}

export function isImageTool(tool: ToolId): tool is ImageTask {
  return tool !== "profit-calculator" && tool !== "discount-calculator";
}

const matchNumber = (text: string, patterns: RegExp[]): number | undefined => {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1] !== undefined) return Number(match[1].replace(/,/g, ""));
  }
  return undefined;
};
// Require a digit first: a comma between labeled costs is not a zero amount.
const money = "(?:₹|\\$|£|€)?\\s*([\\d][\\d,]*(?:\\.\\d+)?)";
const amount = (text: string, labels: string[]): number | undefined => {
  for (const label of labels) {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const forward = new RegExp(`\\b${escaped}\\s*(?:is|of|at|for|=|:)?\\s*${money}`, "i");
    const reverse = new RegExp(`${money}\\s*(?:\\b${escaped}\\b)`, "i");
    const value = matchNumber(text, [forward, reverse]);
    if (value !== undefined) return value;
  }
  return undefined;
};
const percentage = (text: string, label: string): number | undefined => matchNumber(text, [
  new RegExp(`\\b(?:${label})\\s*(?:is|of|=|:)?\\s*([\\d.]+)\\s*%`, "i"),
  new RegExp(`([\\d.]+)\\s*%\\s*(?:${label})\\b`, "i"),
]);

export function getCurrency(text: string): "INR" | "USD" | "GBP" | "EUR" {
  if (/\b(usd|dollar)\b|\$/.test(text.toLowerCase())) return "USD";
  if (/\b(gbp|pound)\b|£/.test(text.toLowerCase())) return "GBP";
  if (/\b(eur|euro)\b|€/.test(text.toLowerCase())) return "EUR";
  return "INR";
}

const formatAmount = (n: number, currency: string) => new Intl.NumberFormat("en", {
  style: "currency", currency, maximumFractionDigits: 2,
}).format(n);

export type Calculation = { title: string; body: string; summary: string };
export function calculateFromMessage(tool: "profit-calculator" | "discount-calculator", input: string): Calculation {
  const currency = getCurrency(input);
  const price = amount(input, tool === "profit-calculator"
    ? ["selling price", "sale price", "selling for", "sell for", "price", "revenue", "sale"]
    : ["original price", "list price", "regular price", "price"]);
  if (price === undefined) throw Error("Tell me the selling price. Example: ‘selling price ₹1000, product cost ₹400’. ");
  if (!Number.isFinite(price) || price < 0 || price > 1e12) throw Error("Enter a valid, non-negative price.");
  const cost = amount(input, ["product cost", "total cost", "item cost", "cost"]) ?? 0;
  if (!Number.isFinite(cost) || cost < 0 || cost > 1e12) throw Error("Enter a valid, non-negative cost.");

  if (tool === "discount-calculator") {
    const percent = percentage(input, "discount|off") ?? matchNumber(input, [/\b(?:discount|off)\s*([\d.]+)\s*%/i]);
    if (percent === undefined || !Number.isFinite(percent) || percent < 0 || percent > 100) {
      throw Error("Include a discount from 0 to 100%. Example: ‘20% discount on original price ₹1000’. ");
    }
    const sale = price * (1 - percent / 100);
    const profit = sale - cost;
    const margin = sale > 0 ? `${(profit / sale * 100).toFixed(1)}%` : "Not defined";
    return {
      title: "Your discount estimate is ready",
      body: `Original price: ${formatAmount(price, currency)}\nDiscount: ${percent}%\nCustomer saves: ${formatAmount(price - sale, currency)}\nSale price: ${formatAmount(sale, currency)}\n${cost ? `Profit after entered cost: ${formatAmount(profit, currency)}\nMargin: ${margin}` : "Add ‘cost ₹…’ to estimate profit and margin."}`,
      summary: `Discount ${percent}% → ${formatAmount(sale, currency)}`,
    };
  }

  const fee = percentage(input, "(?:platform |payment )?(?:fee|commission)");
  const flatFee = fee === undefined ? (amount(input, ["platform fee", "payment fee", "transaction fee", "commission", "fee"]) ?? 0) : 0;
  const fixed = amount(input, ["fixed fee", "fixed"]) ?? 0;
  const shipping = amount(input, ["shipping", "delivery"]) ?? 0;
  const packaging = amount(input, ["packaging", "packing"]) ?? 0;
  const other = amount(input, ["other costs", "other expenses", "other"]) ?? 0;
  if ([fee ?? 0, flatFee, fixed, shipping, packaging, other].some(n => !Number.isFinite(n) || n < 0 || n > 1e12) || (fee ?? 0) > 100) {
    throw Error("Use non-negative costs and a fee percentage between 0 and 100.");
  }
  const fees = price * (fee ?? 0) / 100 + flatFee + fixed;
  const expenses = cost + fees + shipping + packaging + other;
  const profit = price - expenses;
  const margin = price > 0 ? `${(profit / price * 100).toFixed(1)}%` : "Not defined";
  return {
    title: "Your profit estimate is ready",
    body: `Selling price: ${formatAmount(price, currency)}\nProduct cost: ${formatAmount(cost, currency)}\nFees: ${formatAmount(fees, currency)}\nShipping, packaging & other: ${formatAmount(shipping + packaging + other, currency)}\nEstimated net profit: ${formatAmount(profit, currency)}\nProfit margin: ${margin}\n\nBased on the costs supplied. Returns, advertising, tax and overhead may change the result.`,
    summary: `Estimated profit ${formatAmount(profit, currency)} · Margin ${margin}`,
  };
}

export type ImageOptions = {
  type: "image/webp" | "image/jpeg" | "image/png";
  quality: number;
  resize?: { width: number; height: number };
  crop?: { ratio: number };
  targetBytes?: number;
};

export function parseImageOptions(tool: ImageTask, input: string): ImageOptions {
  const text = input.toLowerCase();
  const formatMatch = text.match(/\b(webp|jpe?g|png)\b/);
  const type = formatMatch ? outputTypes[formatMatch[1] as keyof typeof outputTypes] : "image/webp";
  const qualityValue = matchNumber(text, [/(?:quality|at)\s*(\d{1,3})\s*%/]);
  const quality = qualityValue === undefined ? .78 : Math.min(.98, Math.max(.1, qualityValue / 100));
  const options: ImageOptions = { type, quality };
  if (tool === "image-resizer") {
    const match = text.match(/(\d{2,5})\s*(?:x|×|by)\s*(\d{2,5})/);
    if (!match) throw Error("Tell me the maximum dimensions. For example: ‘resize to 1200 x 1200’. ");
    options.resize = { width: Number(match[1]), height: Number(match[2]) };
    if (options.resize.width > 10000 || options.resize.height > 10000) throw Error("Maximum width and height are 10,000 pixels.");
  }
  if (tool === "image-cropper") {
    const ratio = /(?:4:5|portrait)/.test(text) ? 4 / 5
      : /(?:9:16|story)/.test(text) ? 9 / 16
      : /(?:16:9|landscape)/.test(text) ? 16 / 9 : 1;
    options.crop = { ratio };
  }
  if (tool === "target-size-compressor") {
    const match = text.match(/(\d+(?:\.\d+)?)\s*(kb|mb)\b/);
    if (!match) throw Error("Tell me the size limit. For example: ‘compress under 200 KB’. ");
    const kb = Number(match[1]) * (match[2] === "mb" ? 1024 : 1);
    if (!Number.isFinite(kb) || kb < 5 || kb > 20000) throw Error("Choose a target from 5 KB to 20,000 KB.");
    options.targetBytes = Math.floor(kb * 1024);
  }
  if (tool === "image-converter" && !formatMatch) throw Error("Which format would you like? Say ‘convert to JPG’, ‘PNG’, or ‘WebP’. ");
  return options;
}

const canvasFor = (bitmap: ImageBitmap, options: ImageOptions): HTMLCanvasElement => {
  let sx = 0, sy = 0, sw = bitmap.width, sh = bitmap.height;
  if (options.crop) {
    const ratio = options.crop.ratio;
    if (sw / sh > ratio) { sw = sh * ratio; sx = (bitmap.width - sw) / 2; }
    else { sh = sw / ratio; sy = (bitmap.height - sh) / 2; }
  }
  let w = Math.round(sw), h = Math.round(sh);
  if (options.resize) {
    const scale = Math.min(1, options.resize.width / w, options.resize.height / h);
    w = Math.max(1, Math.round(w * scale)); h = Math.max(1, Math.round(h * scale));
  }
  if (w * h > 40_000_000) throw Error("The output exceeds 40 megapixels. Use smaller dimensions.");
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw Error("Canvas processing is not available in this browser.");
  if (options.type === "image/jpeg") { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, h); }
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, w, h);
  return canvas;
};

const encodeCanvas = (canvas: HTMLCanvasElement, type: ImageOptions["type"], quality: number) =>
  new Promise<Blob>((resolve, reject) => canvas.toBlob(blob => {
    if (!blob) reject(Error("Unable to encode this image. Try a smaller file."));
    else if (blob.type !== type) reject(Error("This browser cannot export the selected format."));
    else resolve(blob);
  }, type, quality));

export async function processImage(file: File, options: ImageOptions): Promise<ImageResult> {
  if (!imageTypes.includes(file.type)) throw Error("Upload a JPG, PNG or WebP image.");
  if (file.size > 20 * 1024 * 1024) throw Error("Images must be no larger than 20 MB.");
  let bitmap: ImageBitmap | undefined;
  try {
    bitmap = await createImageBitmap(file);
    if (bitmap.width * bitmap.height > 40_000_000) throw Error("Images must be no larger than 40 megapixels.");
    let canvas = canvasFor(bitmap, options);
    let quality = options.quality;
    let blob = await encodeCanvas(canvas, options.type, quality);
    if (options.targetBytes) {
      const target = options.targetBytes;
      for (let attempt = 0; blob.size > target && attempt < 30; attempt++) {
        if (options.type !== "image/png" && quality > .14) quality = Math.max(.1, quality - .09);
        else {
          const scale = Math.min(.85, Math.sqrt(target / blob.size) * .95);
          const reduced = document.createElement("canvas");
          reduced.width = Math.max(1, Math.floor(canvas.width * scale));
          reduced.height = Math.max(1, Math.floor(canvas.height * scale));
          const ctx = reduced.getContext("2d");
          if (!ctx) throw Error("Image processing is unavailable in this browser.");
          if (options.type === "image/jpeg") { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, reduced.width, reduced.height); }
          ctx.drawImage(canvas, 0, 0, reduced.width, reduced.height);
          canvas = reduced;
        }
        blob = await encodeCanvas(canvas, options.type, quality);
      }
      if (blob.size > target) throw Error("Could not reach that file size. Try a larger KB limit.");
    } else if (!options.resize && !options.crop && options.type === "image/webp" && blob.size >= file.size) {
      for (const lowerQuality of [.65, .5, .35]) {
        blob = await encodeCanvas(canvas, options.type, lowerQuality);
        if (blob.size < file.size) break;
      }
    }
    const ext = formats[options.type];
    const filename = `${file.name.replace(/\.[^.]+$/, "")}-manglo.${ext}`;
    return { blob, filename, width: canvas.width, height: canvas.height,
      originalBytes: file.size, outputBytes: blob.size, format: ext.toUpperCase() };
  } finally { bitmap?.close(); }
}

export const fileSize = (bytes: number) => bytes < 1024 * 1024
  ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / 1024 / 1024).toFixed(2)} MB`;
