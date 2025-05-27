import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GroceryRequestDto } from './dto/grocery.request.dto';
import { GroceryResponseDto } from './dto/grocery.response.dto';
import { Model } from 'mongoose';
import { Grocery } from 'libs/database';

@Injectable()
export class CartService {
  constructor(@Inject('GROCERY_MODEL') private groceryModel: Model<Grocery>) {}

  create(createGroceryDto: GroceryRequestDto) {
    const newGrocery = new this.groceryModel(createGroceryDto);
    return newGrocery.save();
  }

  findAll() {
    return `This action returns all grocery`;
  }

  async findOne(id: number) {
    const item = await this.groceryModel.findById(id);
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  update(id: number, updateGroceryDto: GroceryResponseDto) {
    return `This action updates a #${id} grocery`;
  }

  remove(id: number) {
    return `This action removes a #${id} grocery`;
  }
}
