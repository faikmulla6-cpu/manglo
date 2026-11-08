// The Journal is a publication framework, not a license to fabricate content.
// Empty category routes are intentionally noindex until verified articles exist.
export const journalSections = [
  {
    slug: 'practical', number: '01', name: 'Practical guides', short: 'Useful answers, without the noise.',
    description: 'Clear workflows for everyday digital tasks, files, forms and independent work.',
    promise: 'Every guide should leave the reader with a repeatable action and the limits of that advice.',
    topics: ['File formats and uploads', 'Calculators and everyday math', 'Digital workflows'],
    existing: ['compress-image-to-100kb-200kb', 'resize-photo-in-pixels-without-stretching', 'calculate-discount-percentage-final-price']
  },
  {
    slug: 'shopping', number: '02', name: 'Shopping smarter', short: 'Buy for value, not for hype.',
    description: 'Transparent buying frameworks, product comparisons and careful price-context explainers.',
    promise: 'Research is not hands-on testing. We will say which it is, verify availability and label affiliate relationships.',
    topics: ['How to compare products', 'Price and value checks', 'Buying mistakes to avoid'],
    existing: ['profitable-discount-calculator-guide']
  },
  {
    slug: 'technology', number: '03', name: 'Technology', short: 'Make technology understandable.',
    description: 'Clear explanations of tools, security, devices and the trade-offs behind technical choices.',
    promise: 'Version-sensitive details need current primary documentation, testing where possible and an update date.',
    topics: ['Digital tools', 'Device decisions', 'Online safety'], existing: []
  },
  {
    slug: 'ai', number: '04', name: 'AI in practice', short: 'Real usefulness over AI promises.',
    description: 'Practical AI workflows, capability limits, privacy trade-offs and honest tool comparisons.',
    promise: 'No invented benchmarks, automation claims or personal tests. We distinguish vendor claims from independent evidence.',
    topics: ['Responsible AI workflows', 'AI tool comparisons', 'Privacy and limitations'], existing: []
  },
  {
    slug: 'trends', number: '05', name: 'Verified trends', short: 'What changed—and what it means.',
    description: 'Selective developments that matter to readers, with date-stamped primary-source verification.',
    promise: 'No rumor amplification or urgency for its own sake. If sources conflict or are stale, the story waits.',
    topics: ['Technology changes', 'Consumer updates', 'Policy and product shifts'], existing: []
  }
];

export const editorialCommitments = [
  { number: '01', title: 'Useful by design', copy: 'Each story answers a real reader question, with concrete context or steps beyond a generic summary.' },
  { number: '02', title: 'Evidence you can follow', copy: 'We identify sources and dates, check consequential claims, and distinguish sourced research from direct experience.' },
  { number: '03', title: 'Honest about AI', copy: 'Manglo Editorial may use AI assistance, but it is not a substitute for fact-checking or accountability.' },
  { number: '04', title: 'No forced daily quota', copy: 'If accuracy, originality, rights or technical checks fail, publication is skipped and the reason is recorded.' }
];
