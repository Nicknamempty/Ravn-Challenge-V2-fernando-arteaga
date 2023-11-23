import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { loginUser } from './dto/create-auth.dto';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async createUser(user: CreateUserDto) {
    const userExists = await this.prismaService.user.findFirst({
      where: { email: user.email },
    });

    if (userExists) throw new BadRequestException('user already exists');
    const role = await this.prismaService.role.findFirst({
      where: { name: 'Client' },
    });
    await this.prismaService.user.create({
      data: {
        ...user,
        role: {
          connect: {
            id: role.id,
          },
        },
      },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: loginUser) {
    console.log(user);
    const payload = { sub: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
