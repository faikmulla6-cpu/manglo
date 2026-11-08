import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

export const ALLOWED_CATEGORIES = new Set(['practical', 'shopping', 'technology', 'ai', 'trends']);
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const isHttps = s => typeof s === 'string' && /^https:\/\/[^\s/]+\.[^\s/]+/.test(s);
const wordCount = s => String(s || '').trim().split(/\s+/).filter(Boolean).length;

// This never publishes, sends notifications or changes the site. The review
// gate is mandatory even when the automated checks pass.
export function assessDraft(draft, now = new Date()) {
  const failures = [];
  const fail = (gate, reason) => failures.push({ gate, reason });
  if (!draft || typeof draft !== 'object' || Array.isArray(draft)) {
    fail('input','Draft must be an object');
    return result({}, failures, now);
  }
  if (!['draft','review'].includes(draft.status)) fail('workflow','Only unpublished drafts may enter preflight');
  if (draft.author !== 'Manglo Editorial') fail('identity','Use the honest Manglo Editorial byline');
  if (!ALLOWED_CATEGORIES.has(draft.category)) fail('scope','Category not approved');
  if (!draft.title || draft.title.length < 15 || draft.title.length > 110) fail('reader_value','Need a useful descriptive headline');
  if (!draft.summary || draft.summary.length < 70) fail('reader_value','Explain the audience problem and practical outcome');
  if (wordCount(draft.body) < 400) fail('depth','A substantive original explanation is required; length alone is insufficient');
  const sources = Array.isArray(draft.sources) ? draft.sources : [];
  if (sources.length < 2) fail('sources','At least two individually reviewed sources required by Manglo policy');
  const ids = new Set();
  for (const s of sources) {
    if (!s?.id || ids.has(s.id) || !isHttps(s.url) || !s.title || !s.publisher || !datePattern.test(s.checkedAt || '')) {
      fail('sources','Each source needs unique ID, HTTPS URL, title, publisher and check date');continue;
    }
    ids.add(s.id);
    if (draft.category === 'trends' && (now.getTime() - Date.parse(`${s.checkedAt}T00:00:00Z`)) / 86400000 > 2) fail('freshness','Trend sources must be rechecked within two days');
  }
  if (!Array.isArray(draft.claims) || draft.claims.length < 2) fail('fact_check','Claim-to-source ledger required');
  for (const claim of draft.claims || []) if (!claim?.text || claim.verified !== true || !Array.isArray(claim.sourceIds) || !claim.sourceIds.length || claim.sourceIds.some(id=>!ids.has(id))) fail('fact_check','Every consequential claim needs valid source IDs and verification');
  if (!draft.image || !['original','licensed'].includes(draft.image.rightsType) || !draft.image.rightsEvidence || !draft.image.path || !draft.image.alt || draft.image.width < 1200 || draft.image.height < 630) fail('image_rights','Relevant image, rights evidence, alt text and resolution required');
  if (!draft.seo?.description || draft.seo.description.length < 60 || !/^\/journal\/[a-z0-9-/]+\/$/.test(draft.seo.canonical || '')) fail('seo','Valid description and Journal canonical URL required');
  if (!draft.originalValue || draft.originalValue.length < 60) fail('originality','Explain original value beyond existing coverage');
  if (!draft.aiDisclosure) fail('transparency','Disclose material AI help, or explicitly say none');
  for (const gate of ['accuracy','originality','rights','readerValue','risk','advertising','accessibility','technical']) if (draft.review?.[gate] !== true) fail('review_'+gate,'Signed reviewer confirmation required: '+gate);
  if (draft.category === 'shopping' && draft.commercialDisclosure === undefined) fail('commercial','Shopping material must state affiliate/sponsor status');
  if ((draft.category === 'trends' || draft.riskLevel === 'high') && draft.review?.humanSpecialist !== true) fail('human_review','Qualified human review required');
  return result(draft, failures, now);
}

function result(draft, failures, now) {
  const pass = failures.length === 0;
  return {
    mode:'DRY_RUN_ONLY',timestamp:now.toISOString(),title:draft.title || '(untitled)',slug:draft.slug || null,
    decision:pass?'READY_FOR_OWNER_REVIEW':'SKIP_PUBLICATION',pass,published:false,failures,
    notification:pass?'All checks passed. Nothing published; owner approval still required.':`Publication skipped: ${failures.map(f=>`${f.gate}: ${f.reason}`).join('; ')}. No article went live.`
  };
}

async function main() {
  const args=process.argv.slice(2), option=flag=>args[args.indexOf(flag)+1];
  if (!args.includes('--input') || !option('--input')) {console.error('Usage: node scripts/editorial-check.mjs --input DRAFT.json [--output REPORT.json]');process.exitCode=2;return;}
  let report;
  try {report=assessDraft(JSON.parse(await readFile(resolve(option('--input')),'utf8')));}
  catch (error) {report=assessDraft(null);report.failures.push({gate:'input',reason:`Unable to load draft: ${error.message}`});}
  if (args.includes('--output') && option('--output')) await writeFile(resolve(option('--output')),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));
  if (!report.pass) process.exitCode=1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) await main();
