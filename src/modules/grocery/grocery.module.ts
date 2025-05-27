import { Module } from '@nestjs/common';
import { CartService } from './grocery.service';
import { GroceryController } from './grocery.controller';
import { DatabaseModule } from 'libs/database/database.module';
import { groceryProviders } from './providers';

@Module({
  controllers: [GroceryController],
  providers: [CartService, ...groceryProviders],
  imports: [DatabaseModule],
})
export class GroceryModule {}
