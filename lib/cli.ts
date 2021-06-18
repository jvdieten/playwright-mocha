import program from 'commander';
import inquirer from 'inquirer';

import { loadConfig, writeConfig } from './config';
import { PlaywrightMochaConfig } from './config-model';
const newConfig: PlaywrightMochaConfig = {
  browser: 'chromium',
  testFilesBaseDir: 'spec',
  playwrightLaunchOptions: {},
  playwrightContextOptions: {},
  mochaOptions: {}
};

const generateConfigurationPrompt = [{
  type: 'confirm',
  name: 'configure',
  message: 'Do you want to configure playwright-mocha via CLI?',
  default: true,
}]

const configQuestions = [
  {
    type: 'list',
    name: 'browser',
    message: 'Please pick you browser',
    choices: ['Chromium', 'Webkit', 'Firefox'],
    filter: (value: string) => {
      return value.toLowerCase();
    },
  },
  {
    type: 'input',
    name: 'dir',
    message: 'Location of your test specifications?',
  }
];

export async function handleCLI(): Promise<PlaywrightMochaConfig> {

  program.parse(process.argv);

  const configPath = './playwright-mocha.json';
  const config = loadConfig(configPath);
  if (config) {
    return config;
  } else {
    const answer = await inquirer.prompt(generateConfigurationPrompt);
    if (answer.configure){
      const configAnswers = await inquirer.prompt(configQuestions);
      console.log(configAnswers);
      newConfig.browser = configAnswers.browser;
      newConfig.testFilesBaseDir = configAnswers.dir;
      newConfig.mochaOptions.timeout = 30000;
      writeConfig(newConfig);
      console.log('Configuration file saved!');
      console.log('To execute your test run npx playwright-mocha!');
      process.exit(0);
    }
    process.exit(0);
  }
}
