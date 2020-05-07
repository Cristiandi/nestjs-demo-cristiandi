import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDateTime(): string {
    return new Date().toISOString();
  }
}
