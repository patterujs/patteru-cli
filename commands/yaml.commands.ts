import { Argv } from 'yargs';
import { AbstractCommand } from './abstract.command';

export class YamlCommand extends AbstractCommand {
  load(program: Argv) {
    program.command(
      'yaml [file]',
      'Starting your application with yaml file configuration',
      (yargs) => {
        yargs
        .option('port', {
          alias: 'p',
          describe: 'Load balancer port',
          default: 80,
          type: 'number',
        });
      },
      this.action.handle,
    ).argv;
  }
}
