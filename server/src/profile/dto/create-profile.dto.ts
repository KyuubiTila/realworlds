import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty({ message: 'Bio should not be empty' })
  @IsString({ message: 'Bio must be a string' })
  bio: string;

  @IsOptional()
  @IsString({ message: 'Image must be a string' })
  image: string;
}
