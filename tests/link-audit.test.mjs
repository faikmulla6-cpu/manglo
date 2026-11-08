import test from 'node:test';
import assert from 'node:assert/strict';
import { auditLinks } from '../scripts/link-audit.mjs';

test('all indexable pages and Journal desks have working local links and image alternatives', async () => {
  const report = await auditLinks();
  assert.equal(report.checkedPages, 36);
  assert.ok(report.references > 1000);
  assert.deepEqual(report.broken, []);
  assert.equal(report.passed, true);
});
