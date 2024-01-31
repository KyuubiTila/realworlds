import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { User } from 'src/auth/user.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async createProfile(
    user: User,
    createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    try {
      const { bio, image } = createProfileDto;
      const profile = new Profile();
      profile.user = user;
      profile.bio = bio;
      profile.image = image;

      return await this.profileRepository.save(profile);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        // Handle duplicate entry error (for unique constraints)
        throw new HttpException(
          'Profile already exists for this user',
          HttpStatus.CONFLICT,
        );
      } else {
        // Handle other errors
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getProfileById(id: number, user: User): Promise<Profile> {
    const profile = await this.profileRepository.findOne({
      where: { id, userId: user.id },
      relations: ['user', 'user.following', 'user.followers'],
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async updateProfile(
    id: number,
    user: User,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const profile = await this.getProfileById(id, user);

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    // Update fields if provided in the DTO
    if (updateProfileDto.bio !== undefined) {
      profile.bio = updateProfileDto.bio;
    }

    if (updateProfileDto.image !== undefined) {
      profile.image = updateProfileDto.image;
    }

    return await this.profileRepository.save(profile);
  }
}
