import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto } from './dto/user.request.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  create(@Body() loginUserDto: UserLoginDto) {
    return this.userService.login(loginUserDto);
  }
}
