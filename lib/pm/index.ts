import { Page, BrowserContext } from 'playwright-core';
import { TestScope } from '../scope';

namespace PlaywrightMocha {
  export function page(): Page {
    return TestScope.scope.page;
  }

  export function browserContext(): BrowserContext {
    return TestScope.scope.context;
  }
}
export { PlaywrightMocha };