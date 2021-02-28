#!/usr/bin/env node

import {
  loadLocalLibCommandLoader,
  locaLibExists,
} from '../lib/utils/local-libraries';
import { CommandLoader } from '../commands/command.loader';
import { Argv } from 'yargs';
import yargs = require('yargs');

const bootstrap = () => {
  const cmd: Argv = yargs(process.argv.slice(2));
  cmd
    .scriptName('patteru')
    .version(require('../package.json').version)
    .options({
      h: { alias: 'help', describe: 'Show help' },
      v: { alias: 'version', describe: 'Show current version' },
    });

  if (locaLibExists()) {
    const localCommandLoader = loadLocalLibCommandLoader();
    localCommandLoader.load(cmd);
  } else {
    CommandLoader.load(cmd);
  }

  if (!cmd.argv._[0]) {
    cmd.showHelp();
  }
};

bootstrap();
