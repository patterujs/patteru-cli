import { existsSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

export function fileYamlExists(path: string) {
  return existsSync(join(cwd(), path));
}

export function loadPathYaml(path: string) {
  return join(cwd(), path);
}