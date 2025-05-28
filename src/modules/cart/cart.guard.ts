import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/libs';
import { RequestContextService } from 'src/services';

@Injectable()
export class CartGuard implements CanActivate {
  constructor(
    @Inject('USER_MODEL') private userModel: Model<User>,
    private requestContextService: RequestContextService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cartId = request.params['cartId'];
    const username = this.requestContextService.currentUser;

    const user = await this.userModel
      .findOne<User>({
        username: username,
      })
      .exec();
    if (user.cart['_id'].toString() !== cartId) {
      throw new UnauthorizedException('Unauthorized cart access');
    } else return true;
  }
}
