import Mocha from 'mocha';
import { MochaOptions } from 'mocha';
import program from 'commander';
import scope from './scope';
import glob from 'glob';
import path from 'path';

import { register } from 'ts-node';
import { mochaHooks } from './hooks';
import { loadConfig } from './config';

scope.config = {
  browser: 'chromium',
  testFilesBaseDir: 'spec',
  playwrightLaunchOptions: {},
  playwrightContextOptions: {},
  mochaOptions: {}
};
program
  .option('-c, --config <path>', 'path to playwright-mocha config file');

program.parse(process.argv);
const options = program.opts();
const configPath = options.config ? options.config : './playwright-mocha.json';
scope.config = loadConfig(configPath);

register({
  compilerOptions:
  {
    esModuleInterop: true,
    target: "es2016",
    module: "commonjs"
  },
  transpileOnly: true
});

const mocha = new Mocha(getMochaOptions());
setMochaTestFiles();
mocha.run()
  .on('end', function () {
    console.log('All done');
  });

function getMochaOptions(): MochaOptions {
  scope.config.mochaOptions.rootHooks = mochaHooks;
  return scope.config.mochaOptions;
}

function setMochaTestFiles() {
  const testFiles = glob.sync('**/*.spec.{js,ts}', { cwd: scope.config.testFilesBaseDir });
  testFiles.forEach(file => {
    mocha.addFile(path.join(scope.config.testFilesBaseDir, file))
  });
}

export { scope as test };