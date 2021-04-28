import { Browser, Page } from 'playwright-core';
import { PlaywrightMochaConfig } from './config-model';

interface Scope {
  browser: Browser;
  page: Page;
  config: PlaywrightMochaConfig;
}

export default {} as Scope;