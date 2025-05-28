import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserLoginDto, UserSignupDto } from './dto/user.request.dto';
import { Cart, CommonHelpers, User } from 'libs';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { RequestContextService } from 'services/context/context.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL') private userModel: Model<User>,
    @Inject('CART_MODEL') private cartModel: Model<Cart>,
    @Inject() private jwtService: JwtService,
    private helpers: CommonHelpers,
    private reqContextService: RequestContextService,
  ) {}

  async signup({ username, password }: UserSignupDto) {
    const user = await this.userModel.findOne({ username }).exec();
    if (user) {
      throw new BadRequestException('Username is taken');
    }

    const newCart = new this.cartModel();
    newCart.save();

    const newUser = await this.userModel.create({
      username,
      passwordHash: await this.helpers.generatePasswordHash(password),
      cart: newCart,
    });
    newUser.save();
    return { message: 'User created succesfully', user: newUser };
  }

  async login({ username, password }: UserLoginDto) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    let compareResult = this.helpers.comparePasswords(
      password,
      user.passwordHash,
    );

    if (!compareResult) {
      throw new UnauthorizedException({ mesage: 'Invalid credentials' });
    }

    const jwtToken = this.jwtService.sign({ username: user.username });

    return { token: jwtToken };
  }

  async getUserDetails() {
    let username = this.reqContextService.currentUser;
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return {
      message: 'success',
      user: { username: user.username, cart: user.cart },
    };
  }
}
