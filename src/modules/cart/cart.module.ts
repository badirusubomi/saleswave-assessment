import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { cartProviders, DatabaseModule, userProviders } from 'libs';

@Module({
  controllers: [CartController],
  providers: [CartService, ...cartProviders, ...userProviders],
  imports: [DatabaseModule],
})
export class CartModule {}
