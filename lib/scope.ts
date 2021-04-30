import { Browser, BrowserContext, Page } from 'playwright-core';
import { PlaywrightMochaConfig } from './config-model';

interface Scope {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  config: PlaywrightMochaConfig;
}

export default {} as Scope;