import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Point} from '../models';
import {Ttt_dbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PointRepository extends DefaultCrudRepository<
  Point,
  typeof Point.prototype.id
> {
  constructor(
    @inject('datasources.ttt_db') dataSource: Ttt_dbDataSource,
  ) {
    super(Point, dataSource);
  }
}
