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

  @post('/board/{id}/point')
  async createPointAndVerify(@param.path.number('id') id: number,
    @requestBody() point: Point) {
    // verify horizontal winner
    // 1. get all stored points for same symbol and same coordinate Y
    var points = await this.boardRepo.points(id).find({
      where: {
        symbol: point.symbol,
        y: point.y
      }
    });
    points.push(point);
    points.sort((a, b) => a.x - b.x);

    points.forEach(element => {
      console.log(element.x + " - " + element.y);
    });

    // 2. verify if all points are consecutive x coordinates
    /* var isConsecutive = true;
    for (var index = 0; index < points.length - 1; index++) {
      if (!(points[index].x < points[index + 1].x)) {
        isConsecutive = false;
        break;
      }
    }

    if (isConsecutive) {
      console.log('Winner');
    } */

    // verify vertical winner
    // verify diagonal winner

    return await this.boardRepo.points(id).create(point);
  }



}
