import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { cartProviders } from './providers/cart.providers';
import { DatabaseModule } from 'libs';
import { userProviders } from 'modules/user/providers';

@Module({
  controllers: [CartController],
  providers: [CartService, ...cartProviders, ...userProviders],
  imports: [DatabaseModule],
})
export class CartModule {}
