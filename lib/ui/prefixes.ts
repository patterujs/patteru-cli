import * as chalk from 'chalk';

export const ERROR_PREFIX = chalk.bold.white.bgRed(' ERROR ');
export const INFO_PREFIX = chalk.bold.white.bgGreen(' INFO ');
export const PID_PREFIX_CLOSED = (pid: number, message: string) =>
  chalk.cyan(`PID ${pid} `) + chalk.red(message);
export const PID_PREFIX_DATA = (pid: number, message: string) =>
  chalk.cyan(`PID ${pid} `) + chalk.green(message);
