import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { hash, genSalt, compare } from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: UserDto): Promise<any> {
    const { email, password } = body;
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    try {
      const user = await this.prismaService.user.create({
        data: {
          email: email,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
        },
      });

      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException('Emal is Already Exists.');
      }
      throw new Error(e);
    }
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    //compare password
    const isValid = await compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Login is incorrect');
    }

    //generate token
    const token = await this.jwtService.signAsync({
      userId: user.id,
    });
    return {
      tokenType: 'Bearer',
      accessToken: token,
    };
  }
}
