import { RootHookObject } from 'mocha';
import { chromium } from 'playwright-chromium';
import { firefox } from 'playwright-firefox';
import { webkit } from 'playwright-webkit';
import { loadConfig } from './config';

import { TestScope } from './scope';

export const mochaHooks: RootHookObject = {
  async beforeAll() {
    const config = loadConfig('./playwright-mocha.json');
    if (config){
      //@ts-ignore
      TestScope.scope = {};
      TestScope.scope.config = config;
      TestScope.scope.browser = await ({chromium, webkit, firefox}[TestScope.scope.config.browser] || chromium).launch(TestScope.scope.config.playwrightLaunchOptions);
    }
  },
  async afterAll() {
    await TestScope.scope.browser.close();
  },
  async beforeEach() {
    const context = await TestScope.scope.browser.newContext(TestScope.scope.config.playwrightContextOptions);
    TestScope.scope.context = context;
    TestScope.scope.page = await context.newPage();
  },
  async afterEach() {
    await TestScope.scope.page.close();
  }
};