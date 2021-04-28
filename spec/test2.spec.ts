import assert from 'assert';
import { scope }from 'playwright-mocha';

it('Checks the title of the page', async() => {
  await scope.page.goto('https://headlesstesting.com/');
  const title = await scope.page.title();
  assert.strictEqual(title, 'Headless Testing with Puppeteer and Playwright in the Cloud.');
})