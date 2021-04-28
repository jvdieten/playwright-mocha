#! node
import Mocha from 'mocha';
import program from 'commander';
import scope from './scope';
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import {create, register} from 'ts-node';

import { mochaHooks } from './hooks';
import { PlaywrightMochaConfig } from './config-model';
import { MochaOptions } from 'mocha';

create();
register();

let config: PlaywrightMochaConfig;
scope.config = { 
  browser: 'chromium', 
  playwrightLaunchOptions: {}, 
  playwrightContextOptions: {}, 
  mochaOptions: {} 
};
program.version('0.0.1');
program
  .option('-c, --config <path>', 'path to playwright-mocha config file');

program.parse(process.argv);
const options = program.opts();
const configFileContents = options.config ? fs.readFileSync(options.config, { encoding: 'utf8' }) : fs.readFileSync('./playwright-mocha.json', { encoding: 'utf8' });
config = JSON.parse(configFileContents);
scope.config = config;


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
  const wdir = config.testFilesBaseDir !== undefined ? config.testFilesBaseDir : 'spec';
  const testFiles = glob.sync('**/*.spec.ts', {cwd: wdir});
  testFiles.forEach(file => {mocha.addFile(path.join(wdir, file))});
}

export {scope};