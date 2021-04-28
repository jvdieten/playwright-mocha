import { RootHookObject } from 'mocha';
import { chromium } from 'playwright-chromium';
import { firefox } from 'playwright-firefox';
import { webkit } from 'playwright-webkit';

import scope from './scope';

export const mochaHooks: RootHookObject = {
  async beforeAll() {
    scope.browser = await ({chromium, webkit, firefox}[scope.config.browser] || chromium).launch(scope.config.playwrightLaunchOptions);
  },
  async afterAll() {
    await scope.browser.close();
  },
  async beforeEach() {
    const context = await scope.browser.newContext(scope.config.playwrightContextOptions);
    scope.page = await context.newPage();
  },
  async afterEach() {
    await scope.page.close();
  }
};