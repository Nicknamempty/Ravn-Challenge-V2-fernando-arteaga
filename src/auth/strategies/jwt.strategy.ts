import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'yourSecretKey', // Replace with your own secret key
    });
  }

  async validate(payload: any) {
    console.log('asdas' + JSON.stringify(payload.sub));
    const user = await this.userService.findByEmail(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
