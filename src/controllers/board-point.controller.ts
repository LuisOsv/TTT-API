import { repository } from "@loopback/repository";
import { BoardRepository } from "../repositories";
import { post, param, requestBody } from "@loopback/rest";
import { Point } from "../models";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class BoardPointController {
  constructor(
    @repository(BoardRepository)
    protected boardRepo: BoardRepository,
  ) { }

  @post('/board/{id}/points')
  async createPoint(@param.path.number('id') id: number,
    @requestBody() point: Point) {
    return await this.boardRepo.points(id).create(point);
  }

}
