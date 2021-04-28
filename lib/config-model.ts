import { MochaOptions } from 'mocha';
import { BrowserContextOptions, LaunchOptions } from 'playwright-core';

export interface PlaywrightMochaConfig {
  browser: string;
  testFilesBaseDir: string;
  playwrightLaunchOptions: LaunchOptions;
  playwrightContextOptions: BrowserContextOptions;
  mochaOptions: MochaOptions;
}