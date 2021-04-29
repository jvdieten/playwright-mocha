import fs from 'fs';
import { PlaywrightMochaConfig } from './config-model';

export function loadConfig(path: string): PlaywrightMochaConfig {

  let configFileContents;
  try{
    configFileContents = fs.readFileSync(path, { encoding: 'utf8' });
  } catch(e) {
    console.log(`Configuration file not found at location ${path}`);
    process.exit(1);
  }
  const config: PlaywrightMochaConfig = JSON.parse(configFileContents);

  return config;
}