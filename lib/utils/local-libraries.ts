import { existsSync } from 'fs';
import { join, posix } from 'path';
import { CommandLoader } from '../../commands';

const localLibPath = [
  process.cwd(),
  'node_modules',
  '@patterujs',
  'patteru-cli',
];

export function locaLibExists() {
  return existsSync(join(...localLibPath));
}

export function loadLocalLibCommandLoader(): typeof CommandLoader {
  const commandsFile = require(posix.join(...localLibPath, 'commands'));
  return commandsFile.CommandLoader;
}
