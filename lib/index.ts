#! node
import Mocha from 'mocha';
import { MochaOptions } from 'mocha';
import program from 'commander';
import scope from './scope';
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { register } from 'ts-node';

import { mochaHooks } from './hooks';
import { PlaywrightMochaConfig } from './config-model';


let config: PlaywrightMochaConfig;
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
const configFileContents = options.config ? fs.readFileSync(options.config, { encoding: 'utf8' }) : fs.readFileSync('./playwright-mocha.json', { encoding: 'utf8' });
config = JSON.parse(configFileContents);
scope.config = config;

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
  config.mochaOptions.rootHooks = mochaHooks;
  return config.mochaOptions;
}

function setMochaTestFiles() {
  const testFiles = glob.sync('**/*.spec.{js,ts}', { cwd: config.testFilesBaseDir });
  testFiles.forEach(file => {
    mocha.addFile(path.join(config.testFilesBaseDir, file))
  });
}

export { scope as test };