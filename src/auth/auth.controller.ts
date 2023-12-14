import { Controller, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUser } from './dto/create-auth.dto';
import { User } from './decorators/user.decorator';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    type: loginUser,
    examples: {
      a: {
        summary: 'use this example to login as a Manager',
        value: {
          email: 'fermerinonew@gmail.com',
          password: 'password123',
        },
      },
      b: {
        summary: 'use this example to login as a Client',
        value: {
          email: 'fernand0scar@hotmail.com',
          password: 'pasword124',
        },
      },
      c: {
        summary: 'wrong credentials',
        value: {
          email: 'fermerinonew@gmail.com',
          password: '11111',
        },
      },
    },
  })
  @Post('login')
  async login(@Body() user: loginUser) {
    const token = await this.authService.login(user);
    return { token };
  }

  @Post('signup')
  async signup(@Body() user: loginUser) {
    return await this.authService.createUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('logout')
  async singout(@User() user: any) {
    await this.authService.singout(user.email);
  }
}
