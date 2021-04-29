import Mocha from 'mocha';
import { MochaOptions } from 'mocha';
import scope from './scope';
import glob from 'glob';
import path from 'path';

import { register } from 'ts-node';
import { mochaHooks } from './hooks';
import { handleCLI } from './cli';

handleCLI().then(config => {
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
  const testFiles = glob.sync('**/*.spec.{js,ts}', { cwd: scope.config.testFilesBaseDir });
  testFiles.forEach(file => {
    mocha.addFile(path.join(scope.config.testFilesBaseDir, file))
  });
  mocha.run()
    .on('end', function () {
      console.log('All done');
    });
});

function getMochaOptions(): MochaOptions {
  if (!scope.config.mochaOptions){
    scope.config.mochaOptions = {};
  }
  scope.config.mochaOptions.rootHooks = mochaHooks;
  return scope.config.mochaOptions;
}

export { scope as test };