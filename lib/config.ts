import fs from 'fs';
import { PlaywrightMochaConfig } from './config-model';

export function loadConfig(path: string): PlaywrightMochaConfig | undefined {

  let configFileContents;
  try{
    configFileContents = fs.readFileSync(path, { encoding: 'utf8' });
  } catch(e) {
    return undefined;
  }
  const config: PlaywrightMochaConfig = JSON.parse(configFileContents);

  return config;
}

export function writeConfig(config: PlaywrightMochaConfig) {
  fs.writeFileSync('./playwright-mocha.json', JSON.stringify(config));
}