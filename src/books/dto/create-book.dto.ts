import { IsInt, IsString, IsDefined } from 'class-validator';

export class CreateBookDTO {
  @IsInt()
  @IsDefined()
  readonly id: number;
  
  @IsString()
  @IsDefined()
  readonly title: string;
  
  @IsString()
  @IsDefined()
  readonly description: string;
  
  @IsString()
  @IsDefined()
  readonly author: string;
}