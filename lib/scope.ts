import { Browser, BrowserContext, Page } from 'playwright-core';
import { PlaywrightMochaConfig } from './config-model';

export interface Scope {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  config: PlaywrightMochaConfig;
}

export namespace TestScope {
  //@ts-ignore
  export let scope: Scope = {};
}

export default TestScope;