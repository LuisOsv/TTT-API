import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './ttt-db.datasource.json';

export class Ttt_dbDataSource extends juggler.DataSource {
  static dataSourceName = 'ttt_db';

  constructor(
    @inject('datasources.config.ttt_db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
