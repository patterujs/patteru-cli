import { Argv } from 'yargs';
import { AbstractCommand } from './abstract.command';

export class StartCommand extends AbstractCommand {
  load(program: Argv) {
    program.command(
      'start [app]',
      'Starting your application with load balancer',
      (yargs) => {
        yargs
          .option('worker', {
            alias: 'w',
            describe: 'total worker',
            default: 2,
            type: 'number',
          })
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
