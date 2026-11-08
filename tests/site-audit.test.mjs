import test from 'node:test';
import assert from 'node:assert/strict';
import { auditSite } from '../scripts/site-audit.mjs';

test('generated sitemap pages satisfy the technical publication audit', async () => {
  const report = await auditSite();
  assert.equal(report.audited, 30);
  assert.equal(report.skippedCategoryDesks, 5);
  assert.deepEqual(report.failures, []);
  assert.equal(report.passed, true);
});
