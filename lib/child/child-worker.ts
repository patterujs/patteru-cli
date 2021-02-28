import { exec, env } from 'shelljs';
import { PID_PREFIX_CLOSED, PID_PREFIX_DATA } from '../ui';
import { isPortTaken } from '../utils/worker-port';
import { cpus } from 'os';

export class ChildWorker {
  async generateChildPort(totalWorker: number): Promise<number[]> {
    const maxWorker = cpus().length * 2;
    if (totalWorker > maxWorker) {
      throw new Error(
        `The maximum number of workers on your device is ${maxWorker}`,
      );
    }
    let max: number = totalWorker + 3000;
    let ports: number[] = [];
    for (let i = 3000; i < max; i++) {
      if (await isPortTaken(i)) {
        ports.push(i);
      } else {
        max++;
      }
    }
    return ports;
  }

  runChild(path: string, port: number) {
    env['PORT'] = port.toString();
    const child = exec(`node ${path}`, {
      async: true,
      silent: true,
      env: env,
    });
    child.stdout?.on('close', () => {
      console.log(
        PID_PREFIX_CLOSED(child.pid, ' PORT %s CLOSED'),
        port.toString(),
      );
    });
    child.stdout?.on('data', (data: string) => {
      console.log(
        `${PID_PREFIX_DATA(child.pid, '(%s)')} ${data.replace('\n', '')}`,
        port.toString(),
      );
    });
  }
}
