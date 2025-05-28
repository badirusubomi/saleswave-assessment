import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserLoginDto, UserSignupDto } from './dto/user.request.dto';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, Cart, CommonHelpers } from 'src/libs';
import { RequestContextService } from 'src/services/context/context.service';

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
    return {
      message: 'User created succesfully',
      user: { username: newUser.username, cart: newUser.cart },
    };
  }

  async login({ username, password }: UserLoginDto) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    let compareResult = await this.helpers.comparePasswords(
      password,
      user.passwordHash,
    );

    if (!compareResult) {
      throw new UnauthorizedException({ mesage: 'Invalid credentials' });
    }

    const jwtToken = this.jwtService.sign({ username: user.username });

    return { accessToken: jwtToken };
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

  async deleteuser() {
    const user = await this.userModel
      .findOne({ username: this.reqContextService.currentUser })
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const cart = await this.cartModel.findById(user.cart['_id']);
    if (!cart) {
      throw new NotFoundException('User cart not found');
    }
    const resultCart = await this.cartModel.deleteOne({ _id: cart._id }).exec();
    const resultUser = await this.userModel
      .deleteOne({ username: user.username })
      .exec();

    if (!(resultCart.deletedCount > 0 && resultUser.deletedCount > 0)) {
      throw new NotFoundException({ message: 'User not found' });
    }

    return { message: 'User deleted successfully' };
  }
}
