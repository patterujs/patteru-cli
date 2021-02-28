import { readFileSync } from "fs";
import * as yaml from 'js-yaml';

export function configYaml(path:string) {
    const file = readFileSync(path, 'utf8');
    const read:any = yaml.load(file);

    if (read.version !== '1.0.0') {
        throw new Error(`Version is required!`);
    }

    if (read.config.addresses === null) {
        throw new Error(`Address is required!`);
    }

    const cfg:any = {
        config: read.config
    };
    return cfg;
}

// configYaml('./sample/patteru.yaml');
