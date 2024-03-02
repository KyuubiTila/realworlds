import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
export declare class FollowService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    follow(userId: number, user: User): Promise<void>;
    unfollow(userId: number, user: User): Promise<void>;
}
