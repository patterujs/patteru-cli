import * as chalk from 'chalk';
import { Argv } from 'yargs';
import { StartAction } from '../actions/start.action';
import { YamlAction } from '../actions/yaml.action';
import { ERROR_PREFIX } from '../lib/ui';
import { StartCommand } from './start.command';
import { YamlCommand } from './yaml.commands';

export class CommandLoader {
  public static load(program: Argv): void {
    new StartCommand(new StartAction()).load(program);
    new YamlCommand(new YamlAction()).load(program);
    this.handleInvalidCommand(program);
  }

  private static handleInvalidCommand(program: Argv) {
    program
      .strictCommands()
      .demandCommand(1)
      .fail((_msg, _err) => {
        console.error(
          `\n${ERROR_PREFIX} Invalid command: ${chalk.red('%s')}`,
          process.argv.slice(2).join(' '),
        );
        console.log(
          `See ${chalk.red('--help')} for a list of available commands.\n`,
        );
        process.exit(1);
      });
  }
}
