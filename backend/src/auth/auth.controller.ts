import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('photo', {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `photo-${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB (aumente para 10 MB se quiser)
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Apenas imagens são permitidas'), false);
    }
    cb(null, true);
  },
  }))
  
  async register(@UploadedFile() file: Express.Multer.File, @Body() registerDto: RegisterDto) {
    const photoPath = file ? file.path : null;
    return this.authService.register(registerDto, photoPath);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}