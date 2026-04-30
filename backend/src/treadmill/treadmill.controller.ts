import { Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { TreadmillService } from './treadmill.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('treadmill')
@UseGuards(AuthGuard('jwt'))
export class TreadmillController {
  constructor(private treadmillService: TreadmillService) {}

  @Post('start')
  async start(@Request() req) {
    return this.treadmillService.startTreadmill(req.user.userId);
  }

  @Post('end')
  async end(@Request() req) {
    return this.treadmillService.endTreadmill(req.user.userId);
  }

  @Get('active')
  async getActive(@Request() req) {
    return this.treadmillService.getActiveSession(req.user.userId);
  }
}