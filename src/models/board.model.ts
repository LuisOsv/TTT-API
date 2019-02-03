import { Entity, model, property, hasMany } from '@loopback/repository';
import { Point } from './point.model'

@model()
export class Board extends Entity {
  @property({
    type: 'number',
    id: true,
    default: 0,
  })
  id?: number;


  @hasMany(() => Point)
  points?: Point[];

  constructor(data?: Partial<Board>) {
    super(data);
  }
}
