import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Point} from '../models';
import {PointRepository} from '../repositories';

export class PointController {
  constructor(
    @repository(PointRepository)
    public pointRepository : PointRepository,
  ) {}

  @post('/points', {
    responses: {
      '200': {
        description: 'Point model instance',
        content: {'application/json': {schema: {'x-ts-type': Point}}},
      },
    },
  })
  async create(@requestBody() point: Point): Promise<Point> {
    return await this.pointRepository.create(point);
  }

  @get('/points/count', {
    responses: {
      '200': {
        description: 'Point model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Point)) where?: Where,
  ): Promise<Count> {
    return await this.pointRepository.count(where);
  }

  @get('/points', {
    responses: {
      '200': {
        description: 'Array of Point model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Point}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Point)) filter?: Filter,
  ): Promise<Point[]> {
    return await this.pointRepository.find(filter);
  }

  @patch('/points', {
    responses: {
      '200': {
        description: 'Point PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() point: Point,
    @param.query.object('where', getWhereSchemaFor(Point)) where?: Where,
  ): Promise<Count> {
    return await this.pointRepository.updateAll(point, where);
  }

  @get('/points/{id}', {
    responses: {
      '200': {
        description: 'Point model instance',
        content: {'application/json': {schema: {'x-ts-type': Point}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Point> {
    return await this.pointRepository.findById(id);
  }

  @patch('/points/{id}', {
    responses: {
      '204': {
        description: 'Point PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() point: Point,
  ): Promise<void> {
    await this.pointRepository.updateById(id, point);
  }

  @put('/points/{id}', {
    responses: {
      '204': {
        description: 'Point PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() point: Point,
  ): Promise<void> {
    await this.pointRepository.replaceById(id, point);
  }

  @del('/points/{id}', {
    responses: {
      '204': {
        description: 'Point DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pointRepository.deleteById(id);
  }
}
