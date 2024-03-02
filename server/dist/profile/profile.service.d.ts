import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { User } from 'src/auth/user.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class ProfileService {
    private profileRepository;
    constructor(profileRepository: Repository<Profile>);
    createProfile(user: User, createProfileDto: CreateProfileDto): Promise<Profile>;
    getProfileById(id: number, user: User): Promise<Profile>;
    updateProfile(id: number, user: User, updateProfileDto: UpdateProfileDto): Promise<Profile>;
}
