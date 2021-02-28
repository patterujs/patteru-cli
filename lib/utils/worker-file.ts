import { existsSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

export function fileWorkerExists(path: string) {
  return existsSync(join(cwd(), path));
}

export function loadPathWorker(path: string) {
  return join(cwd(), path);
}
