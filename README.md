# playwright-mocha

<!-- badges: start -->
[![NPM](https://nodei.co/npm/playwright-mocha.png)](https://npmjs.org/package/playwright-mocha)
<!-- badges: end -->

The aim of playwright-mocha is to deliver a lightweight test-framework that is combining the power of [mocha](https://mochajs.org/) and [playwright](https://playwright.dev/). You should be able to use all configuration options you can provide via mocha or playwright. If you miss something raise an issue or open a pull request.


## Installation and configuration via CLI

<br>

To install the framework:

`npm install playwright-mocha`

<br>

To run:

`npx playwright-mocha`

If no configuration file is found the CLI is automatically activated to setup the file via the CLI.

![cli](img/cli.png)

## Create test 

You are able to use typescript out of the box but also javascript is supported. It will execute tests named **.spec.(ts|js). 

Typescript example 

```typescript
import assert from 'assert';
import { test } from 'playwright-mocha';

it('TS checks the title of the page', async() => {
  await test.page.goto('https://headlesstesting.com/');
  const title = await test.page.title();
  assert.strictEqual(title, 'Headless Testing with Puppeteer and Playwright in the Cloud.');
})
```

## Advanced configuration

The only thing you need now is a configuration file the paramaters browser and testFilesBaseDir are custom framework paramaters the rest of the paramaters are 1:1 mapped to specific playwright or mocha options.

| Name      | options |
| ----------- | ----------- |
| browser      | firefox/chromium/webkit       |
| testFilesBaseDir | relative path to your folder containing the test files |
| playwrightLaunchOptions   | https://playwright.dev/docs/api/class-browsertype?_highlight=launch#browsertypelaunchoptions        |
| playwrightContextOptions | https://playwright.dev/docs/api/class-browser?_highlight=context&_highlight=op#browsernewcontextoptions |
| mochaOptions | https://mochajs.org/api/mocha |

<br>


### example config
```json 
{
  "browser": "firefox",
  "testFilesBaseDir": "examples",
  "playwrightLaunchOptions": {
    "headless": false
  },
  "playwrightContextOptions": {

    "viewport": {
      "width": 1600,
      "height": 1000
    },
    "recordVideo": {
      "dir": "video"
    }
  },
  "mochaOptions": {
  }
}
```

## Run test

If you run the command below the framework will try to find the config file 'playwright-mocha.json' in the current working directory.

`npx playwright-mocha`

You can also provide a configuration file at a different location

`npx playwright-mocha --config examples/playwright-mocha.json`

