import assert from 'assert';
import { scope } from 'playwright-mocha';

it('should work', async () => {
  await scope.page.goto('https://www.example.com/');
  assert.strictEqual(await scope.page.title(), 'Example Domain');
});