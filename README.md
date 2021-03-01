# Patteru JS

A [Node.js](https://nodejs.org/en/) CLI Tool for small load balancer

![npm](https://img.shields.io/npm/v/@patterujs/cli)
![NPM](https://img.shields.io/npm/l/@patterujs/cli)
[![Known Vulnerabilities](https://snyk.io/test/github/patterujs/patteru-cli/badge.svg?targetFile=package.json)](https://snyk.io/test/github/patterujs/patteru-cli?targetFile=package.json)
![GitHub last commit](https://img.shields.io/github/last-commit/patterujs/patteru-cli)

## Description

The Patteru CLI is a command line interface tool for helps you to test run your project in load balancer.

## Installing

### Installing for global use

```shell
npm i -g @patterujs/cli
```

### Installing in current project

```shell
npm i --save-dev @patterujs/cli
```

After the installation is complete, add a script to package.json in your project.

```json
{
  "script": {
    "balancer": "patteru start filename.js"
  }
}
```

## Usage

To run your project using PatteruJS, you have to add `process.env.PORT` into your project as in the example below.

### Example of use in Express

```javascript
// index.js
const express = require('express');
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

To run it

```shell
patteru start index.js
```

### Example of use in Fastify

```javascript
// index.js

const fastify = require('fastify')({
  logger: true,
});

fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' });
});

fastify.listen(process.env.PORT, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
```

To run it

```shell
patteru start index.js
```

### Example of use in Nestjs

```typescript
// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
}
bootstrap();
```

Before running it, make the project first.

```shell
npm run build
```

To run it

```shell
patteru start dist/main.js
```

## License

PatteruJS is [MIT Licensed](LICENSE)
