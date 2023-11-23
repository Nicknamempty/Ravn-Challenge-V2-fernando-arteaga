import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUser } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: loginUser) {
    const token = await this.authService.login(user);
    return { token };
  }

  @Post('signup')
  async signup(@Body() user: loginUser) {
    return await this.authService.createUser(user);
  }

  // @Post('register')
  // async register(@Request() req): Promise<any> {
  //   const { username, password } = req.body;
  //   const user = await this.authService.register(username, password);
  //   return { user };
  // }
}
