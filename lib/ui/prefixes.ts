import * as chalk from 'chalk';

export const ERROR_PREFIX = chalk.bold.white.bgRed(' ERROR ');
export const INFO_PREFIX = chalk.bold.white.bgGreen(' INFO ');
export const PID_PREFIX_CLOSED = (pid: number, message: string) =>
  chalk.cyan(`PID ${pid} `) + chalk.red(message);
export const PID_PREFIX_DATA = (pid: number, message: string) =>
  chalk.cyan(`PID ${pid} `) + chalk.green(message);

export const GET_PREFIX = chalk.bgRgb(171, 71, 188).bold.rgb(0, 0, 0)(
  ' GET ',
);

export const POST_PREFIX = chalk.bgRgb(76, 175, 80).rgb(0, 0, 0)(
  ' POST ',
);

export const PUT_PREFIX = chalk.bgRgb(255, 152, 0).rgb(0, 0, 0)(
  ' PUT ',
);

export const DELETE_PREFIX = chalk.bgRgb(244, 67, 54).rgb(0, 0, 0)(
  ' DELETE ',
);

export const PATCH_PREFIX = chalk.bgRgb(255, 235, 59).rgb(0, 0, 0)(
  ' PATCH ',
);
