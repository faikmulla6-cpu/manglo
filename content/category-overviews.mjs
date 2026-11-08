// Evergreen orientation for the five existing Journal category pages.
// These are useful category resources, NOT newly published news/articles.
// No external price, product test, benchmark or trend is asserted here.
export const categoryOverviews = {
  practical: {
    eyebrow: 'A repeatable workflow',
    lead: 'Solve the requirement in front of you before changing a file or a number. A form asking for a maximum size is a different problem from a form asking for exact pixels; a profit estimate is different from a discount percentage.',
    sections: [
      { title: 'Identify the actual constraint', body: '<p>Read the complete instruction first. For an image, record the permitted format, width and height in pixels, file-size limit and content rules. For a seller calculation, record the selling price, currency, product cost, fees, shipping and tax assumptions. A task becomes easier when the inputs are explicit.</p><p>For example, a photo that is 1200 × 900 pixels but 600 KB fails a 200 KB limit even though its shape is fine. That calls for compression, not automatically for a square crop.</p>' },
      { title: 'Change only what is needed', body: '<p>Keep an untouched original. Resize when the pixel dimensions are wrong, crop when the shape is wrong, convert when the encoded type is wrong, and compress when the byte limit is wrong. Multiple changes at once make it harder to explain why a result improved—or broke.</p><p>For a calculation, write the formula next to the inputs. Use the same currency throughout. Make one change at a time to understand sensitivity: higher shipping, a deeper discount or a different transaction fee.</p>' },
      { title: 'Verify the real output', body: '<p>Open a downloaded image and check its true format, dimensions, size and visible detail. Test it on the actual destination when safe. For a calculator, independently check a small example with mental arithmetic or a spreadsheet. A successful download or calculated number is a starting point, not independent verification of a platform’s requirements.</p>' }
    ],
    checklist: ['I have copied the exact requirement, not guessed it.', 'I kept an original and changed one variable at a time.', 'I checked the downloaded file or calculation independently.', 'I have not uploaded private files to an unknown service.'],
    next: 'Get a practical starting point from the Playbook below; each guide leads to the relevant free tool.'
  },
  shopping: {
    eyebrow: 'A buyer’s decision framework',
    lead: 'A good deal is not simply the lowest advertised number. Value depends on the exact model, what comes in the box, the full checkout cost and whether the seller will resolve a problem later.',
    sections: [
      { title: 'Compare the same thing', body: '<p>Write down the precise model or specification you need before comparing stores. Confirm configuration, size, included accessories, seller identity, warranty terms and any regional differences. A cheaper listing with less storage, different parts or no applicable warranty is not an equal comparison.</p><p>Separate facts confirmed in official specifications from impressions in reviews. A single highly rated review or promotional demonstration is not enough to verify a technical feature.</p>' },
      { title: 'Calculate delivered and ongoing cost', body: '<p>Use <strong>total cost = item price − genuine discount + delivery + unavoidable fees</strong> as a first check. If the purchase needs consumables, maintenance or a paid subscription, estimate those for the period you expect to use it. Example: a ₹2,000 item plus ₹150 delivery costs ₹2,150 before any other charges; that is arithmetic, not a live product quote.</p><p>Check whether a coupon applies to your chosen variant, whether taxes are already included and whether the return process adds restrictions. Do not rely on a countdown or an unexplained “original price” as evidence of value.</p>' },
      { title: 'Choose with a short decision record', body: '<p>Keep two or three options, their verified features, total cost, warranty, return conditions and the date each detail was checked. Mark any unknown as <em>not verified</em>. If two choices are close, prefer the one that meets your essential requirements with fewer unresolved risks.</p><p>For technology and AI subscriptions, verify the provider’s current pricing and limits on its official page. Manglo does not claim to have personally tested a product unless it actually has.</p>' }
    ],
    checklist: ['The exact model and included items match.', 'The total payable cost is clear.', 'Warranty, return terms and seller identity have been checked.', 'A claim or discount is not being mistaken for an independent test.'],
    next: 'For a transparent discount calculation, begin with the existing guides below. Future product-specific reporting will carry its own sources and checked dates.'
  },
  technology: {
    eyebrow: 'A practical technology checklist',
    lead: 'Before installing a tool, buying a device or changing a security setting, identify the job and the risk. Compatibility, recoverability and support often matter as much as a headline feature.',
    sections: [
      { title: 'Start with the job, not the brand', body: '<p>Define the task in one sentence: “Edit ten product photos on a phone,” “back up customer records,” or “run a browser-based calculator.” Note your device, operating system, available storage, network requirements and budget. These constraints narrow the options before marketing language gets involved.</p><p>For a software feature, use the publisher’s official documentation to verify supported versions, regional availability and the current setup process. Screenshots from an older release may no longer match the interface.</p>' },
      { title: 'Check the security and privacy cost', body: '<p>Review permissions before granting access. A photo converter that works entirely in the browser may not need an account; a cloud editor may require uploading files. Identify where data is processed, whether it is retained and how it can be deleted. Keep unrelated private records out of demonstrations.</p><p>Back up anything you cannot easily reconstruct before upgrading a device or replacing files. Use a unique password and account security controls offered by the service. Never treat a surprising popup as proof that your system needs an emergency download.</p>' },
      { title: 'Test with a reversible example', body: '<p>Try a non-sensitive sample first. Record the input, the expected result and what actually happened. Confirm that the output opens in another viewer or app. If the workflow changes a setting, know how to reverse it. Check current vendor documentation again before suggesting a device model or compatibility claim to somebody else.</p>' }
    ],
    checklist: ['The tool solves a clearly defined task.', 'Compatibility is checked against current official documentation.', 'Permissions and data handling are understood.', 'I can reverse or recover from the change.'],
    next: 'Our existing image-format and upload guides show these principles in practice. New device or software comparisons require separate current-source checks.'
  },
  ai: {
    eyebrow: 'An AI workflow you can verify',
    lead: 'Use AI for a clearly bounded draft or analysis task, then treat the output as unverified until you check it. A confident answer is not a source, and a fluent summary is not evidence of testing.',
    sections: [
      { title: 'Give the model a defined task', body: '<p>Start with a prompt that contains <strong>goal, audience, supplied facts, constraints and output format</strong>. For example: “Using only these three product descriptions that I wrote, make a comparison table of dimensions and materials. Leave missing values blank. Do not guess.” This makes omissions visible and easier to check.</p><p>Separate your own notes from facts copied from other sources. Do not paste passwords, government IDs, sensitive customer data or unpublished confidential material into an external AI service without the necessary authorization.</p>' },
      { title: 'Build a human verification loop', body: '<p>Check every consequential number, link, quote, price, release date and technical instruction against the original source. Follow links yourself; a model can produce convincing but incorrect references. Ask whether a claim describes a vendor announcement, a third-party test or your own observed result—these are different levels of evidence.</p><p>For high-stakes issues involving health, law, money or safety, use qualified primary guidance and appropriate expert review. Do not publish AI output as confirmed reporting merely because several generated answers agree.</p>' },
      { title: 'Keep a before-and-after record', body: '<p>Save the original task, an example input that is safe to share, the AI-assisted draft, the corrections made and the final review result. Measure usefulness by a real outcome: fewer manual formatting steps, clearer instructions or a verified comparison—not an invented productivity percentage.</p>' }
    ],
    checklist: ['The task and source boundaries are explicit.', 'Sensitive information was excluded.', 'Material claims were checked outside the model.', 'The final output was reviewed and corrected by a person.'],
    next: 'This category is a practical orientation. Model-specific capability and pricing articles will require current provider documentation and clearly dated checks.'
  },
  trends: {
    eyebrow: 'How to verify a development',
    lead: 'A headline can be recent, repeated and still misleading. Before sharing something as a verified trend, separate when it happened from when it was posted and identify who can actually confirm it.',
    sections: [
      { title: 'Find the earliest credible account', body: '<p>Locate the official announcement, published dataset, release notes, filing or primary statement where possible. Record the precise claim and the date of the event. A screenshot of a social post may be useful as a lead, but by itself it cannot establish a product release, a price change or a policy update.</p><p>Check whether the original source has been corrected or replaced. If no authoritative evidence is available, label the report unverified rather than turning uncertainty into urgency.</p>' },
      { title: 'Check context and scope', body: '<p>Ask: Who is affected? Is this available in India, another region or only a limited trial? Is it a proposal, an announcement or a change already in effect? Does a product feature apply to all plans? Compare the claim with a second independent source when a mistake would meaningfully affect a reader.</p><p>When information conflicts, keep the contradiction visible. Do not choose the most exciting version. Explain what is known, what remains uncertain and what evidence would settle the question.</p>' },
      { title: 'Explain the practical consequence', body: '<p>Good coverage answers “What should the reader do differently, if anything?” Sometimes the correct action is to wait. Include a checked date, links to sources and the limitations of the report. Do not rewrite an old article’s publication date merely to make it look fresh.</p>' }
    ],
    checklist: ['Event date and publication date are not confused.', 'A primary source is identified where possible.', 'Geography, rollout stage and limitations are stated.', 'Uncertainty and corrections remain visible.'],
    next: 'This verification method is live; time-sensitive news reporting will be released only after fresh source checks and a separate editorial approval.'
  }
};
