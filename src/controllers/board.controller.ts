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
import {Board} from '../models';
import {BoardRepository} from '../repositories';

export class BoardController {
  constructor(
    @repository(BoardRepository)
    public boardRepository : BoardRepository,
  ) {}

  @post('/boards', {
    responses: {
      '200': {
        description: 'Board model instance',
        content: {'application/json': {schema: {'x-ts-type': Board}}},
      },
    },
  })
  async create(@requestBody() board: Board): Promise<Board> {
    return await this.boardRepository.create(board);
  }

  @get('/boards/count', {
    responses: {
      '200': {
        description: 'Board model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Board)) where?: Where,
  ): Promise<Count> {
    return await this.boardRepository.count(where);
  }

  @get('/boards', {
    responses: {
      '200': {
        description: 'Array of Board model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Board}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Board)) filter?: Filter,
  ): Promise<Board[]> {
    return await this.boardRepository.find(filter);
  }

  @patch('/boards', {
    responses: {
      '200': {
        description: 'Board PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() board: Board,
    @param.query.object('where', getWhereSchemaFor(Board)) where?: Where,
  ): Promise<Count> {
    return await this.boardRepository.updateAll(board, where);
  }

  @get('/boards/{id}', {
    responses: {
      '200': {
        description: 'Board model instance',
        content: {'application/json': {schema: {'x-ts-type': Board}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Board> {
    return await this.boardRepository.findById(id);
  }

  @patch('/boards/{id}', {
    responses: {
      '204': {
        description: 'Board PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() board: Board,
  ): Promise<void> {
    await this.boardRepository.updateById(id, board);
  }

  @put('/boards/{id}', {
    responses: {
      '204': {
        description: 'Board PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() board: Board,
  ): Promise<void> {
    await this.boardRepository.replaceById(id, board);
  }

  @del('/boards/{id}', {
    responses: {
      '204': {
        description: 'Board DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.boardRepository.deleteById(id);
  }
}
