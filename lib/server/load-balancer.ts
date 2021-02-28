import { createServer, IncomingMessage, ServerResponse } from 'http';
import { createProxyServer } from 'http-proxy';
import { LoadBalancerConfiguration } from '.';
export class LoadBalancer {
  constructor(private config: LoadBalancerConfiguration) {}

  createProxy() {
    let i = -1;
    const proxy = createProxyServer(this.config.options);
    proxy.on('error', this.onErrorConnection);
    proxy.on('proxyRes', (resProxy) => {
      resProxy.headers['x-powered-by'] = 'PatteruJS';
    });
    const server = createServer((req, res) => {
      const addresses = this.config.hosts;
      if (addresses.length === 0) {
        res.writeHead(503, { 'Content-Type': 'text/html' });
        res.end('<h1>Service unavailable</h1>');
        return;
      }
      i = (i + 1) % addresses.length;
      const host = addresses[i].split(':')[0];
      const port = addresses[i].split(':')[1];
      proxy.web(req, res, { target: `http://${host}:${port}`, xfwd: true });
    });
    server.requestTimeout = 5000;
    return server;
  }

  onErrorConnection(_err: Error, _req: IncomingMessage, res: ServerResponse) {
    res.writeHead(503, { 'Content-Type': 'text/html' });
    res.end('<h1>Service unavailable</h1>');
    return;
  }
}
