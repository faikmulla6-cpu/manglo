// Useful, tool-specific explanations for the seven existing working tools.
// No advertisements or new article routes are created by this content.
export const toolOverviews = {
  'image-compressor': {
    question:'How do I reduce a photo without destroying detail?',
    paragraphs:[
      'Start with an original image that is already sharp. If the destination accepts a smaller pixel size, reducing unnecessary dimensions often helps before lowering the export quality. Compare the downloaded result with the original at the same display size.',
      'Photographs tend to work well as JPG or WebP. A PNG graphic with crisp text or transparency may need a different approach. The smallest possible file is not always the most useful: buyers still need to inspect labels, colors, texture and product condition.'
    ],
    checks:['Keep the full-resolution original.','Check the destination’s accepted formats and pixel requirements.','Open the output and inspect fine detail at normal viewing size.'],
    limitation:'Actual file-size reduction depends on the source, export format and encoder. A previously optimized file may not shrink.',
    related:'/playbook/compress-product-images-without-blur/',relatedText:'Read the complete image-compression guide'
  },
  'image-resizer': {
    question:'Which dimensions should I enter?',
    paragraphs:[
      'Pixel dimensions describe width and height, not the storage size of the file. With aspect ratio preserved, a 4000 × 3000 image can become 1200 × 900 without stretching. A requested 1200 × 1200 box may produce a proportional fit rather than an exact square.',
      'If a form requires a precise square or portrait shape, crop to the desired ratio first, then resize. Enlarging a small source adds pixels but cannot create missing photographic detail. Check the current rules of your marketplace or upload form rather than relying on one universal preset.'
    ],
    checks:['Record exact width, height and ratio requirements.','Keep proportion lock enabled unless distortion is intentional.','Inspect edges and text after export.'],
    limitation:'Preserving proportions can yield different final dimensions from a requested bounding box. Crop when an exact ratio is required.',
    related:'/playbook/resize-photo-in-pixels-without-stretching/',relatedText:'Learn aspect ratio and photo resizing'
  },
  'image-converter': {
    question:'Is JPG, PNG or WebP the right output?',
    paragraphs:[
      'Use JPG for a broadly compatible photographic file when transparency is unnecessary. PNG is often useful for crisp graphics and transparent designs. WebP supports both photographic compression and transparency, but not every upload portal accepts it.',
      'The conversion must re-encode the file: changing a filename extension alone cannot convert an image. If you turn a transparent PNG into JPG, the transparent area needs a background; Manglo uses white. Compare the new file’s actual format and appearance before uploading it.'
    ],
    checks:['Check the destination’s accepted type.','Decide whether transparency matters.','Verify the real downloaded format and visible details.'],
    limitation:'Converting a lossy image to PNG does not restore lost pixels. Animated images are not preserved as animations.',
    related:'/playbook/convert-png-jpg-webp-step-by-step/',relatedText:'See the step-by-step conversion guide'
  },
  'image-cropper': {
    question:'How can I change framing without stretching?',
    paragraphs:[
      'Cropping changes what is inside the frame; resizing changes the final pixel count. For a square thumbnail, choose a 1:1 crop and move the image so the subject has breathing room. For a portrait or landscape design, choose the ratio required by the destination.',
      'Check the complete product outline, face or required document area before exporting. A crop that looks attractive on a large screen may remove important details in a small listing card. Keep the source and inspect the output on a phone.'
    ],
    checks:['Select the destination ratio, not a guessed one.','Keep labels, handles and required content inside the crop.','Resize afterward if a pixel limit is specified.'],
    limitation:'Cropping permanently removes pixels from the exported copy, though your saved original is unchanged.',
    related:'/playbook/crop-photo-square-portrait-landscape/',relatedText:'Understand square and portrait crops'
  },
  'target-size-compressor': {
    question:'What if a form requires 100 KB or 200 KB?',
    paragraphs:[
      'A file-size limit is measured in bytes; it is not the same as a pixel requirement. Start with the portal’s accepted format, dimensions and any minimum size. Choose the target carefully, keep an original, then let the tool attempt to reduce the exported file toward that limit.',
      'Open the downloaded result to confirm its real size. Check text, signatures, faces and product features before submitting an application. If an extreme limit would make the result unreadable, return to a clearer source or ask the destination for guidance.'
    ],
    checks:['Read all portal requirements, including any minimum KB value.','Check final size and actual file type outside the tool.','Reject any output whose important details are unreadable.'],
    limitation:'A specific byte target cannot be guaranteed for every image without damaging detail; the destination may impose additional rules.',
    related:'/playbook/compress-image-to-100kb-200kb/',relatedText:'Follow the 100 KB / 200 KB walkthrough'
  },
  'profit-calculator': {
    question:'What does a sale actually leave me?',
    paragraphs:[
      'Selling price is revenue, not profit. Record product cost, packaging, delivery paid by the seller, platform and transaction fees, and other per-order expenses. For example, ₹1000 revenue less ₹400 product cost, ₹100 delivery and ₹100 fees leaves ₹400 before any other uncounted expenses. Those amounts are illustrative, not marketplace rates.',
      'Profit margin uses profit divided by selling price. Markup uses profit divided by cost; the percentages differ. Test a higher-delivery scenario or an advertising allowance before depending on the estimate. Compare later with actual settlement records.'
    ],
    checks:['All inputs use consistent currency and tax treatment.','Known per-order costs are included.','Returns, overhead and other omitted costs are considered separately.'],
    limitation:'The calculator does not automatically know changing platform fees, legal tax obligations or real return costs.',
    related:'/playbook/calculate-real-profit-per-order/',relatedText:'Read the worked profit example'
  },
  'discount-calculator': {
    question:'How much will the buyer pay after the discount?',
    paragraphs:[
      'Multiply the original price by the discount percentage to find the reduction. A ₹1000 item at 20% off becomes ₹800 before any extra charges. Two successive discounts do not simply add: 20% followed by 10% leaves ₹720, an overall 28% reduction.',
      'If you are the seller, check your full cost per order as well as the new checkout price. A 20% revenue reduction can remove a much larger proportion of profit when fixed costs stay the same. If you are buying, compare the final payable amount with alternatives instead of trusting a crossed-out original price.'
    ],
    checks:['Original and sale prices are in the same currency.','Coupon conditions, tax and delivery are considered.','The new price still meets any margin requirement.'],
    limitation:'Displayed savings are arithmetic estimates, not verification of a retailer’s original price, stock or promotion terms.',
    related:'/playbook/calculate-discount-percentage-final-price/',relatedText:'Learn the discount formula with examples'
  }
};
