import chalk = require('chalk');
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { createProxyServer } from 'http-proxy';
import { LoadBalancerConfiguration } from '.';
import { DELETE_PREFIX, GET_PREFIX, PATCH_PREFIX, POST_PREFIX, PUT_PREFIX } from '../ui';
export class LoadBalancer {
  constructor(private config: LoadBalancerConfiguration) {}

  createProxy(logger?:boolean) {
    let i = -1;
    const proxy = createProxyServer(this.config.options);
    proxy.on('error', this.onErrorConnection);
    proxy.on('proxyRes', (resProxy, req, res) => {
      resProxy.headers['x-powered-by'] = 'PatteruJS';
      // console.log(`${resProxy.method}`);
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
      if (logger) {
        let method = '';
        if (req.method === 'GET') {
          method = GET_PREFIX;
        } else if (req.method === 'POST') {
          method = POST_PREFIX;
        } else if (req.method === 'DELETE') {
          method = DELETE_PREFIX;
        } else if (req.method === 'PATCH') {
          method = PATCH_PREFIX;
        } else if (req.method === 'PUT') {
          method = PUT_PREFIX;
        }
        console.log(`${method} http://${addresses[i]}${req.url}`);
      }
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
