import * as cors from 'cors';
import * as helmet from 'helmet';
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { BooksController } from './books/books.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { BooksModule } from './books/books.module';

@Module({
  imports: [BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cors(),
        helmet({
          hidePoweredBy: {
            setTo: 'PHP 4.2.0',
          },
        }),
        LoggerMiddleware,
      )
      .exclude(
        { path: 'books', method: RequestMethod.GET },
        { path: 'books', method: RequestMethod.POST },
        'books/(.*)',
      )
      .forRoutes(BooksController);
    //.forRoutes('') // for all routes
  }
}
