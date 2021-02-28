import * as chalk from "chalk";
import { Argument } from "../commands";
import { configYaml } from "../lib/config/load-config";
import { LoadBalancer } from "../lib/server";
import { ERROR_PREFIX, showBannerStart } from "../lib/ui";
import { EMOJIS } from "../lib/ui/emojis";
import { isPortTaken } from "../lib/utils/worker-port";
import { fileYamlExists } from "../lib/utils/yaml-file";
import { AbstractAction } from "./abstract.action";

export class YamlAction extends AbstractAction {
    public async handle(argv: Argument): Promise<void> {
        try {
            const filePath = argv.file as string;
            if (!filePath) {
                throw new Error(`Please fill yaml command`);
            }
            if (!fileYamlExists(filePath)) {
                throw new Error(`path /${chalk.yellow(filePath)} does not exists`);
            }

            const port = argv.port as number;
            const isReadyToRunning = await isPortTaken(port);

            if (!isReadyToRunning) {
                throw new Error(`port ${chalk.red(port)} already use.`);
            }

            const conf:any = configYaml(filePath);
            console.log(conf);
            const lb: LoadBalancer = new LoadBalancer({ hosts: conf.config.addresses });
            lb.createProxy(true).listen(port, '0.0.0.0');
            showBannerStart(filePath);
            console.log(`http://127.0.0.1:${port}`);
        } catch (error) {
            if (error instanceof Error) {
                console.log(`\n${ERROR_PREFIX} ${EMOJIS.CRYING} ${error.message}`);
            } else {
                console.error(`\n${chalk.red(error)}`);
            }
        }
    }
}