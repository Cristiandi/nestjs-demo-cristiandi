import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

interface ExtResquest extends Request {
  user: any
}

@Injectable()
export class AddUserMiddleware implements NestMiddleware {
  use(req: ExtResquest, res: Response, next: Function) {    
    // console.log('adding user...');

    req.user = {
      id: 1,
      username: 'test',
      email: 'test@test.com',
      roles: [
        'admin'
      ]
    };

    next();
  }
}
