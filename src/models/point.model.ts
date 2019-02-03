import { Entity, model, property } from '@loopback/repository';

@model()
export class Point extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  x: number;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  y: number;

  @property({
    type: 'string',
    required: true,
  })
  symbol: string;


  @property()
  boardId: number;

  constructor(data?: Partial<Point>) {
    super(data);
  }
}
