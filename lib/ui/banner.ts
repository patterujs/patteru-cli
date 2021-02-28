import chalk = require('chalk');
import { clear } from 'console';
import { EMOJIS } from './emojis';

export function showBannerStart(path: string) {
  let banner = '';
  banner += chalk.bold.white.bgGreen(` ${path} `);
  banner += ` ${EMOJIS.ROCKET}\n`;
  clear();
  console.log(banner);
}
