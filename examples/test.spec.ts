import assert from 'assert';
import { test } from 'playwright-mocha';


it('TS checks the title of the page', async() => {
  await test.page.goto('https://headlesstesting.com/');
  const title = await test.page.title();
  assert.strictEqual(title, 'Headless Testing with Puppeteer and Playwright in the Cloud.');
})