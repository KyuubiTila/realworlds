import { User } from 'src/auth/user.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    createProfile(createProfileDto: CreateProfileDto, user: User): Promise<Profile>;
    getProfileById(id: number, user: User): Promise<Profile>;
    updateProfile(id: number, user: User, updateProfileDto: UpdateProfileDto): Promise<Profile>;
}
