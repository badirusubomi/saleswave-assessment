import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'libs';
import { Model } from 'mongoose';
import { RequestContextService } from 'services/context/context.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject() private jwtService: JwtService,
    private requestContextService: RequestContextService,
    @Inject() private config: ConfigService,
    @Inject('USER_MODEL') private userModel: Model<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.authorization ?? '';

    const isAuthenticated = await this.authenticate(accessToken);

    if (!isAuthenticated.success) {
      throw new UnauthorizedException(isAuthenticated.message);
    }

    return isAuthenticated.success;
  }

  private async authenticate(accessToken: string) {
    const token = this.extractTokenFromHeader(accessToken);
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.get('jwt.secret'),
      });

      const user = await this.userModel.findOne({
        username: payload['username'],
      });

      if (!user) {
        return { success: false, message: 'Invalid Token' };
      }

      this.requestContextService.set('user', user['username']);
    } catch {
      return { success: false, message: 'Invalid Token' };
    }
    return { success: true, message: 'User Authenticated' };
  }

  private splitBearer(token: string) {
    return token.split(' ');
  }

  private extractTokenFromHeader(accessToken: string): string | undefined {
    const [type, token] = this.splitBearer(accessToken) ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
