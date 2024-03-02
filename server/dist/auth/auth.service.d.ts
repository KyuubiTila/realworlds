import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterCredentialDto } from './dto/register-credential.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginCredentialDto } from './dto/login-credential.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    private hashPassword;
    signUpService(registerCredentialDto: RegisterCredentialDto): Promise<void>;
    getUserByIdService(id: number): Promise<User>;
    updateUserByIdService(id: number, userUpdateDto: UserUpdateDto): Promise<User>;
    deleteUserByIdService(id: number): Promise<void>;
    getAllUserService(): Promise<User[]>;
    validateUserPassword(loginCredentialDto: LoginCredentialDto): Promise<{
        accessToken: string;
    }>;
}
