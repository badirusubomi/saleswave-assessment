import { Module } from '@nestjs/common';
import { CartService } from './grocery.service';
import { GroceryController } from './grocery.controller';
import { groceryProviders, DatabaseModule } from 'libs';

@Module({
  controllers: [GroceryController],
  providers: [CartService, ...groceryProviders],
  imports: [DatabaseModule],
})
export class GroceryModule {}
