import * as Net from 'net';

export function isPortTaken(port: number): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    const tester: any = Net.createServer()
      .once('error', () => resolve(false))
      .once('listening', () =>
        tester.once('close', () => resolve(true)).close(),
      )
      .listen(port);
  });
}
