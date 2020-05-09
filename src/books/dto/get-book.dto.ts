import { IsNumberString } from 'class-validator';

export class GetBookDTO {
  @IsNumberString()
  bookId: number;
}