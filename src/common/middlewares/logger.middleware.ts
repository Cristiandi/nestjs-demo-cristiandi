import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    // console.log('Request...', req.body);
    Logger.log(`requested route: ${req.originalUrl} |  method: ${req.method}`, LoggerMiddleware.name);
    next();
  }
}
