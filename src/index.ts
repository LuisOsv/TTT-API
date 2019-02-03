import {TttApiApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {TttApiApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new TttApiApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
