import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Put,
  Param,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';

@Controller('profiles')
@UseGuards(AuthGuard())
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('create')
  async createProfile(
    @Body() createProfileDto: CreateProfileDto,
    @GetAuthenticatedUser() user: User,
  ): Promise<Profile> {
    try {
      const createdProfile = await this.profileService.createProfile(
        user,
        createProfileDto,
      );
      return createdProfile;
    } catch (error) {
      // Check for specific error types and return appropriate responses
      if (error instanceof HttpException) {
        throw error; // Re-throw HTTP exceptions as they are
      }

      // Handle other errors
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:id')
  getProfileById(@Param('id') id: number, @GetAuthenticatedUser() user: User) {
    return this.profileService.getProfileById(id, user);
  }

  @Put('/:id')
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @GetAuthenticatedUser() user: User,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    return await this.profileService.updateProfile(id, user, updateProfileDto);
  }
}
