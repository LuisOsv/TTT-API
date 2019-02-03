import { DefaultCrudRepository, juggler, HasManyRepositoryFactory, repository } from '@loopback/repository';
import { Board, Point } from '../models';
import { PointRepository } from '../repositories';
import { Ttt_dbDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';

export class BoardRepository extends DefaultCrudRepository<
  Board,
  typeof Board.prototype.id
  > {

  public readonly points: HasManyRepositoryFactory<
    Point,
    typeof Board.prototype.id
  >;

  constructor(
    @inject('datasources.ttt_db') dataSource: Ttt_dbDataSource,
    @repository.getter(PointRepository)
    protected pointRepositoryGetter: Getter<PointRepository>,
  ) {
    super(Board, dataSource);
    this.points = this.createHasManyRepositoryFactoryFor(
      'points',
      pointRepositoryGetter
    );
  }
}
