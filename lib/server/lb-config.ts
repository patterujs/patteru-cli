import { ServerOptions } from 'http-proxy';

export interface LoadBalancerConfiguration {
  hosts: string[];
  options?: ServerOptions;
}
