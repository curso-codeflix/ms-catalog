import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import configJson from './esv7.datasource.config.json';

const config = {
  ...configJson,
  // defaultSize: 50,
  debug: process.env.APP_ENV === 'dev',
  configuration: {
    node: process.env.ELASTICSEARCH,
    requestTimeout: process.env.ELASTICSEARCH_REQUEST_TIMEOUT,
    pingTimeout: process.env.ELASTICSEARCH_PING_TIMEOUT,
  },
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class Esv7DataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'esv7';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.esv7', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
