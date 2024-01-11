import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RegisterCredentialDto } from './dto/register-credential.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { LoginCredentialDto } from './dto/login-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetAuthenticatedUser } from './get-authenticated-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signUp')
  signUp(@Body() registerCredentialDto: RegisterCredentialDto) {
    return this.authService.signUpService(registerCredentialDto);
  }

  @Get('/:id')
  getUserById(@Param('id') id: number) {
    return this.authService.getUserByIdService(id);
  }

  @Put('/:id')
  updateUserById(
    @Param('id') id: number,
    @Body() userUpdateDto: UserUpdateDto, // Use the UserUpdateDto
  ) {
    return this.authService.updateUserByIdService(id, userUpdateDto);
  }

  @Delete('/:id')
  async deleteUserById(@Param('id') id: number): Promise<void> {
    await this.authService.deleteUserByIdService(id);
  }

  @Get('/')
  getAllUsers() {
    return this.authService.getAllUserService();
  }

  @Post('/signIn')
  signIn(
    @Body() loginCredentialDto: LoginCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.validateUserPassword(loginCredentialDto);
  }

  @Post('/profile')
  @UseGuards(AuthGuard())
  async getProfile(@GetAuthenticatedUser() user: User) {
    return { user };
  }
}
