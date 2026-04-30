import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'SECRET_KEY_CHANGE_THIS',
    });
  }

  async validate(payload: any) {
    // payload vem do token: { sub: userId, email }
    const user = await this.usersService.findById(payload.sub);
    if (!user) return null;
    return { userId: user.id, email: user.email };
  }
}