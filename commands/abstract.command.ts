import { Argv } from 'yargs';
import { AbstractAction } from '../actions';

export abstract class AbstractCommand {
  constructor(protected action: AbstractAction) {}

  public abstract load(program: Argv): void;
}
