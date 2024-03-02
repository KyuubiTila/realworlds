import { AuthService } from './auth.service';
import { RegisterCredentialDto } from './dto/register-credential.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { LoginCredentialDto } from './dto/login-credential.dto';
import { User } from './user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(registerCredentialDto: RegisterCredentialDto): Promise<void>;
    getUserById(id: number): Promise<User>;
    updateUserById(id: number, userUpdateDto: UserUpdateDto): Promise<User>;
    deleteUserById(id: number): Promise<void>;
    getAllUsers(): Promise<User[]>;
    signIn(loginCredentialDto: LoginCredentialDto): Promise<{
        accessToken: string;
    }>;
    getProfile(user: User): Promise<{
        user: User;
    }>;
}
