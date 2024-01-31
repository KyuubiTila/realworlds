import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';
import { User } from 'src/auth/user.entity';
import { FollowService } from './follow.service';

@Controller('follow')
@UseGuards(AuthGuard())
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post(':userId/follow')
  async follow(
    @Param('userId') userId: number,
    @GetAuthenticatedUser() user: User,
  ): Promise<void> {
    await this.followService.follow(userId, user);
  }

  @Post(':userId/unfollow')
  async unfollow(
    @Param('userId') userId: number,
    @GetAuthenticatedUser() user: User,
  ): Promise<void> {
    await this.followService.unfollow(userId, user);
  }
}
