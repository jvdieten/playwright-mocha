import Mocha from 'mocha';
import { MochaOptions } from 'mocha';
import { TestScope } from './scope';
import program from 'commander';
import glob from 'glob';
import path from 'path';

import { mochaHooks } from './hooks';
import { handleCLI } from './cli';
import { loadConfig } from './config';

program
  .option('-c, --config <path>', 'path to playwright-mocha config file');

//@ts-ignore
TestScope.scope = {};

program.parse(process.argv);
const options = program.opts();

if (options.config) {
  const configFileContents = loadConfig(options.config);
  if (configFileContents){
    TestScope.scope.config = configFileContents;
    runMocha();
  }else{
    console.log(`Configuration file not found at location ${options.config}`);
    process.exit(1);
  }
} else {
  handleCLI().then(config => {

    TestScope.scope.config = config;
    runMocha();
  });
}



function runMocha(): void {
  const mocha = new Mocha(getMochaOptions());
  const testFiles = glob.sync('**/*.{js,ts}', { cwd: TestScope.scope.config.testFilesBaseDir });
  testFiles.forEach(file => {

    console.log('added new testfile', file);
    mocha.addFile(path.join(TestScope.scope.config.testFilesBaseDir, file))
  });
  mocha.run(failures => process.exitCode = failures ? 1 : 0);
}

function getMochaOptions(): MochaOptions {
  if (!TestScope.scope.config.mochaOptions) {
    TestScope.scope.config.mochaOptions = {};
  }
  TestScope.scope.config.mochaOptions.rootHooks = mochaHooks;

  return TestScope.scope.config.mochaOptions;
}
