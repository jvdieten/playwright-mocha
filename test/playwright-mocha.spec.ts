import { spawnSync } from 'child_process';
import { expect } from 'chai';

const cliPath = require.resolve('../dist/index');

const run = (options: { args: string[] }) => {
  const spawnResult = spawnSync('node', [cliPath, ...options.args.map((arg) => `"${arg}"`)], {
    shell: true
  });
  return spawnResult;
};

describe('playwright-mocha', function () {

  this.timeout(20_000);

  describe('configuration file', function () {

    it('accepts a valid configuration file', () => {
      const { status, stdout } = run({ args: [] });
      console.log(stdout.toString());
      expect(status).to.equal(0);
    });

    it('gives an error if no configuration file is found', () => {
      const { stdout } = run({ args: ['-c', 'non-existing.conf.js'] });
      expect(stdout.toString()).to.contain('Configuration file not found at location');
    });

  });
});