import { Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { CheckinsService } from './checkins.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('checkins')
@UseGuards(AuthGuard('jwt'))
export class CheckinsController {
  constructor(private checkinsService: CheckinsService) {}

  @Post('in')
  async checkin(@Request() req) {
    return this.checkinsService.checkin(req.user.userId);
  }

  @Post('out')
  async checkout(@Request() req) {
    return this.checkinsService.checkout(req.user.userId);
  }

  @Get('active')
  async getActive(@Request() req) {
    return this.checkinsService.getActiveCheckin(req.user.userId);
  }
}