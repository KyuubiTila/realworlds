import { JwtPayload } from './jwt-payload.interface';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginCredentialDto } from './dto/login-credential.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // password hasher
  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  // SIGNUP
  async signUpService(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, email, password } = authCredentialDto;

    // Check if username or email already exists
    const existingUser = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });

    if (existingUser) {
      throw new BadRequestException('Username or email already exists');
    }

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = await this.hashPassword(password);

    try {
      await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Internal Server Error',
      );
    }
  }

  // GET USER BY ID
  async getUserByIdService(id: number): Promise<User> {
    const found = await this.userRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`User with ${id} not found`);
    }
    return found;
  }

  // UPDATE USER BY ID
  async updateUserByIdService(
    id: number,
    userUpdateDto: UserUpdateDto,
  ): Promise<User> {
    const { username, password } = userUpdateDto;

    try {
      // Check if the user exists
      const user = await this.getUserByIdService(id);

      // Update user properties
      user.username = username;
      user.password = password;

      // Save changes to the database
      await this.userRepository.save(user);

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        // Rethrow NotFoundException with a meaningful error message
        throw new NotFoundException(`User with ID ${id} not found`);
      } else if (error instanceof BadRequestException) {
        // Rethrow BadRequestException with a meaningful error message
        throw new BadRequestException(error.message);
      } else {
        // Handle other exceptions as needed
        throw error;
      }
    }
  }

  //   DELETE USER BY ID
  async deleteUserByIdService(id: number): Promise<void> {
    try {
      // Check if the user exists
      const user = await this.getUserByIdService(id);

      // Delete the user from the database
      await this.userRepository.remove(user);
    } catch (error) {
      if (error.name === 'EntityNotFound') {
        // Rethrow NotFoundException with a meaningful error message
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      // Rethrow other exceptions as is
      throw error;
    }
  }

  // GET ALL USERS
  async getAllUserService(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  // SIGN IN
  async validateUserPassword(
    loginCredentialDto: LoginCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = loginCredentialDto;
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
