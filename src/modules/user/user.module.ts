import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {
  cartProviders,
  CommonHelpers,
  DatabaseModule,
  userProviders,
} from 'libs';

@Module({
  controllers: [UserController],
  providers: [UserService, ...userProviders, ...cartProviders, CommonHelpers],
  imports: [DatabaseModule],
})
export class UserModule {}
