import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateArticleDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Title should not be empty' })
  @IsString({ message: 'Title must be a string' })
  slug: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Title should not be empty' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Description should not be empty' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Body should not be empty' })
  @IsString({ message: 'Body must be a string' })
  body: string;

  @IsOptional()
  @IsString({ message: 'Taglist must be a string' })
  taglist: string;
}
