import { IsString, IsNotEmpty } from 'class-validator';

export class BaseArticleDto {
  @IsNotEmpty({ message: 'Slug should not be empty' })
  @IsString({ message: 'Slug must be a string' })
  slug: string;

  @IsNotEmpty({ message: 'Title should not be empty' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsNotEmpty({ message: 'Description should not be empty' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsNotEmpty({ message: 'Body should not be empty' })
  @IsString({ message: 'Body must be a string' })
  body: string;

  @IsString({ message: 'Taglist must be a string' })
  taglist: string;
}
