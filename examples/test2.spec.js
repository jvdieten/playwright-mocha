const  assert = require('assert');
const { test } = require('playwright-mocha');

it('JS checks the title of the page', async() => {
  await test.page.goto('https://headlesstesting.com/');
  const title = await test.page.title();
  assert.strictEqual(title, 'Headless Testing with Puppeteer and Playwright in the Cloud.');
})