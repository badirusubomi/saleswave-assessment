import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    req['user'] = req.headers['user'];
    next();
  }
}
