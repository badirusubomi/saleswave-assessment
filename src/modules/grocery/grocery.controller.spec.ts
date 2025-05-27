import { Test, TestingModule } from '@nestjs/testing';
import { GroceryController } from './grocery.controller';
import { CartService } from './grocery.service';

describe('GroceryController', () => {
  let controller: GroceryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroceryController],
      providers: [CartService],
    }).compile();

    controller = module.get<GroceryController>(GroceryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
