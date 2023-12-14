import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { loginUser } from './dto/create-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

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
    const password = await bcrypt.hash(user.password, 12);
    await this.prismaService.user.create({
      data: {
        password,
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
    const payload = { email: user.email };
    const accessToken = this.jwtService.sign(payload);
    const userExists = await this.userService.findByEmail(user.email);
    if (!userExists) {
      throw new UnauthorizedException('invalid credentials');
    }

    if (!bcrypt.compareSync(user.password, userExists.password)) {
      throw new UnauthorizedException('invalid credentials');
    }
    await this.prismaService.user.update({
      where: { id: userExists.id },
      data: {
        jwt: accessToken,
      },
    });
    return {
      accessToken,
    };
  }

  async singout(email: string) {
    const user = await this.userService.findByEmail(email);
    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        jwt: null,
      },
    });
  }
}
