import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './providers';
import { CommonHelpers, DatabaseModule } from 'libs';

@Module({
  controllers: [UserController],
  providers: [UserService, ...userProviders, CommonHelpers],
  imports: [DatabaseModule],
})
export class UserModule {}
