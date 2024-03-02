import { User } from 'src/auth/user.entity';
import { FollowService } from './follow.service';
export declare class FollowController {
    private readonly followService;
    constructor(followService: FollowService);
    follow(userId: number, user: User): Promise<void>;
    unfollow(userId: number, user: User): Promise<void>;
}
