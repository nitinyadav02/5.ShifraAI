import test from 'node:test';
import assert from 'node:assert/strict';

import { googleAuth } from '../Controllers/auth.controller.js';
import { setMemoryStoreEnabled } from '../Configs/fallbackStore.js';

test('googleAuth falls back to in-memory users when MongoDB is unavailable', async () => {
  setMemoryStoreEnabled(true);

  const req = {
    body: {
      name: 'Local User',
      email: 'local@example.com',
    },
  };

  let statusCode = null;
  let payload = null;
  let cookieValue = null;

  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      payload = data;
      return this;
    },
    cookie(name, value) {
      cookieValue = { name, value };
      return this;
    },
  };

  await googleAuth(req, res);

  assert.equal(statusCode, 200);
  assert.equal(payload.email, 'local@example.com');
  assert.equal(cookieValue.name, 'token');
  assert.ok(cookieValue.value);
});
