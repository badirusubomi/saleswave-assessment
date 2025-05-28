import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto, UserSignupDto } from './dto/user.request.dto';
import { AuthGuard } from 'modules/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  me() {
    return this.userService.getUserDetails();
  }

  @Post('/signup')
  signup(@Body() signupUserDto: UserSignupDto) {
    return this.userService.signup(signupUserDto);
  }

  @Post('/login')
  create(@Body() loginUserDto: UserLoginDto) {
    return this.userService.login(loginUserDto);
  }
}
