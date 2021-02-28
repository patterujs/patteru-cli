import chalk = require('chalk');
import { Argument } from '../commands';
import { LoadBalancer } from '../lib/server';
import { ChildWorker } from '../lib/child/child-worker';
import { ERROR_PREFIX, showBannerStart } from '../lib/ui';
import { AbstractAction } from './abstract.action';
import { fileWorkerExists, loadPathWorker } from '../lib/utils/worker-file';
import { isPortTaken } from '../lib/utils/worker-port';

export class StartAction extends AbstractAction {
  public async handle(argv: Argument): Promise<void> {
    try {
      const filePath = argv.app as string;
      if (!filePath) {
        throw new Error('Need path application for running the load balancer.');
      }
      const child: ChildWorker = new ChildWorker();
      if (!fileWorkerExists(filePath)) {
        throw new Error(`path /${chalk.yellow(filePath)} does not exists`);
      }

      const port = argv.port as number;
      const isReadyToRunning = await isPortTaken(port);

      if (!isReadyToRunning) {
        throw new Error(`port ${chalk.red(port)} already use.`);
      }

      const ports: number[] = await child.generateChildPort(
        argv.worker as number,
      );
      const hosts: string[] = [];
      ports.forEach((port) => {
        hosts.push(`localhost:${port}`);
        child.runChild(loadPathWorker(filePath), port);
      });

      const lb: LoadBalancer = new LoadBalancer({ hosts });
      lb.createProxy().listen(port, '0.0.0.0');
      showBannerStart(filePath);
      console.log(`http://127.0.0.1:${port}`);
    } catch (err) {
      if (err instanceof Error) {
        console.log(`\n${ERROR_PREFIX} ${err.message}`);
      } else {
        console.error(`\n${chalk.red(err)}`);
      }
    }
  }
}
