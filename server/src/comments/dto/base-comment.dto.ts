import { IsNotEmpty, IsString } from 'class-validator';

export class BaseCommentDto {
  @IsNotEmpty()
  @IsString()
  body: string;
}
