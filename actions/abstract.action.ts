import { Argument } from '../commands';

export abstract class AbstractAction {
  public abstract handle(argv: Argument): Promise<void> | void;
}
