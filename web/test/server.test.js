const test = require('node:test');
const assert = require('node:assert');

const server = require('../server');

test('rejects path traversal', async (t) => {
  t.after(() => server.close());
  const res = await fetch('http://localhost:3000/../../etc/passwd');
  assert.ok(res.status === 403 || res.status === 404);
});
