import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async follow(userId: number, user: User): Promise<void> {
    const userToBeFollowed = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['followers'],
    });

    const authenticatedUserFollowing = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: ['following'],
    });

    if (!userToBeFollowed || !authenticatedUserFollowing) {
      throw new NotFoundException(
        'User not found or follower not authenticated',
      );
    }

    if (userToBeFollowed.id === authenticatedUserFollowing.id) {
      throw new NotAcceptableException('You cannot follow yourself');
    }

    const isUserToBeFollowedAlreadyFollowed = userToBeFollowed.followers.some(
      (follower) => follower.id === authenticatedUserFollowing.id,
    );

    if (isUserToBeFollowedAlreadyFollowed) {
      throw new NotAcceptableException('You already follow this user');
    }

    userToBeFollowed.followers.push(authenticatedUserFollowing);
    authenticatedUserFollowing.following.push(userToBeFollowed);

    await this.usersRepository.save(userToBeFollowed);
    await this.usersRepository.save(authenticatedUserFollowing);
  }

  async unfollow(userId: number, user: User): Promise<void> {
    const userToBeUnfollowed = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['followers'],
    });

    const authenticatedUserUnfollowing = await this.usersRepository.findOne({
      where: { id: user.id },
      relations: ['following'],
    });

    if (!userToBeUnfollowed || !authenticatedUserUnfollowing) {
      throw new NotFoundException('User or unfollower not found');
    }

    userToBeUnfollowed.followers = userToBeUnfollowed.followers.filter(
      (follower) => follower.id !== authenticatedUserUnfollowing.id,
    );

    authenticatedUserUnfollowing.following =
      authenticatedUserUnfollowing.following.filter(
        (followedUser) => followedUser.id !== userToBeUnfollowed.id,
      );

    await this.usersRepository.save(userToBeUnfollowed);
    await this.usersRepository.save(authenticatedUserUnfollowing);
  }
}
