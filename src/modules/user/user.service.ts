import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserLoginDto } from './dto/user.request.dto';
import { CommonHelpers, User } from 'libs';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL') private userModel: Model<User>,
    @Inject() private jwtService: JwtService,
    private common: CommonHelpers,
  ) {}

  async login({ username, password }: UserLoginDto) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    let compareResult = this.common.comparePasswords(
      password,
      user.passwordHash,
    );

    if (!compareResult) {
      throw new UnauthorizedException({ mesage: 'Invalid credentials' });
    }

    const jwtToken = this.jwtService.sign({ username: user.username });

    return { token: jwtToken };
  }
}
