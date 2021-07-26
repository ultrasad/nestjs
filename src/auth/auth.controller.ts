import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: UserDto) {
    const user = await this.authService.register(body);
    return user;
  }

  @Post('login')
  async login(@Body() body: UserDto) {
    const { email, password } = body;
    const tokenData = await this.authService.login(email, password);
    return tokenData;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Req() req: Request) {
    return req.user;
    //return 'Profile';
  }
}
