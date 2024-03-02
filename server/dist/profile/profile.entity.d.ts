import { User } from 'src/auth/user.entity';
import { BaseEntity } from 'typeorm';
export declare class Profile extends BaseEntity {
    id: number;
    bio: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    userId: number;
}
