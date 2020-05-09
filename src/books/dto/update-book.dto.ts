import { IsInt, IsString } from 'class-validator';

export class UpdateBookDTO {
  @IsInt()
  id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  author: string;
}