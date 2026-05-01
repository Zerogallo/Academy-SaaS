import { Controller, Get, Post, Put, UseGuards, Request, Body, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.usersService.findById(req.user.userId);
    const { password, ...result } = user;
    return result;
  }

  @Get('needs-evaluation')
  async needsEvaluation(@Request() req) {
    const needs = await this.usersService.needsEvaluation(req.user.userId);
    return { needs };
  }

  @Post('renew-evaluation')
  async renewEvaluation(@Request() req) {
    await this.usersService.updateEvaluation(req.user.userId);
    return { message: 'Avaliação renovada com sucesso' };
  }

  @Put('profile')
  @UseInterceptors(FileInterceptor('photo', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `profile-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        return cb(new BadRequestException('Formato de imagem inválido'), false);
      }
      cb(null, true);
    },
  }))
  async updateProfile(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
  ) {
    const photoPath = file ? file.path : undefined;
    const updatedUser = await this.usersService.updateProfile(req.user.userId, name, photoPath);
    const { password, ...result } = updatedUser;
    return result;
  }
}