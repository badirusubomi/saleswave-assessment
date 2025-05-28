import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { cartProviders, userProviders, DatabaseModule } from 'src/libs';

@Module({
  controllers: [CartController],
  providers: [CartService, ...cartProviders, ...userProviders],
  imports: [DatabaseModule],
})
export class CartModule {}
