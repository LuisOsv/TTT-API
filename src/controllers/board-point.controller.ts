import { repository } from "@loopback/repository";
import { BoardRepository } from "../repositories";
import { post, param, requestBody } from "@loopback/rest";
import { Point } from "../models";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';

const schemaPoint = {
  type: 'object',
  properties: {
    messagePoint: { type: 'string' },
    xPoint: { type: 'number' },
    yPoint: { type: 'number' },
    symbolPoint: { type: 'string' },
  },
};

export class BoardPointController {
  constructor(
    @repository(BoardRepository)
    protected boardRepo: BoardRepository,
  ) { }

  @post('/board/{id}/point', {
    responses: {
      '200': {
        description: 'Point model instance',
        content: { 'application/json': { schema: schemaPoint } },
      },
    },
  })
  async createPointAndVerify(@param.path.number('id') id: number,
    @requestBody() point: Point) {

    // verify horizontal winner
    var pointsForAxisX = await this.getStoredPointsForAxisX(id, point);
    pointsForAxisX.push(point);
    if (pointsForAxisX.length == 3) {
      console.log('Winner ' + point.symbol);
    }

    // verify vertical winner
    var pointsForAxisY = await this.getStoredPointsForAxisY(id, point);
    pointsForAxisY.push(point);
    if (pointsForAxisY.length == 3) {
      console.log('Winner ' + point.symbol);
    }

    // verify diagonal winner

    var pointCreated = await this.boardRepo.points(id).create(point);
    return {
      messagePoint: 'Point created successfully',
      xPoint: pointCreated.x,
      yPoint: pointCreated.y,
      symbolPoint: pointCreated.symbol,
    };
  }

  getStoredPointsForAxisX(id: number, point: Point): Promise<Point[]> {
    return this.boardRepo.points(id).find({
      where: {
        symbol: point.symbol,
        y: point.y
      }
    });
  }

  getStoredPointsForAxisY(id: number, point: Point): Promise<Point[]> {
    return this.boardRepo.points(id).find({
      where: {
        symbol: point.symbol,
        x: point.x
      }
    });
  }

  verifyPointsAreConsecutiveForAxisX(points: Point[]): boolean {
    var isConsecutive = true;
    points.sort((a, b) => a.x - b.x);
    for (var index = 0; index < points.length - 1; index++) {
      if (!(points[index].x < points[index + 1].x)) {
        isConsecutive = false;
        break;
      }
    }
    return isConsecutive;
  }

}
