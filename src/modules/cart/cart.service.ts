import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Model } from 'mongoose';
import { Cart } from 'libs';
import { AddCartItemDto, UpdateCartItemDto, DeleteCartItemDto } from './dto';

@Injectable()
export class CartService {
  constructor(@Inject('CART_MODEL') private cartModel: Model<Cart>) {}

  async additem(cartId: string, additemDto: AddCartItemDto) {
    const cart = await this.cartModel.findByIdAndUpdate(cartId, {
      $push: { items: { additemDto } },
    });
    return { message: 'success', cart };
  }

  async findCartItems(cartId: string) {
    const cart = await this.cartModel.findById(cartId);
    if (!cart) {
      throw new NotFoundException({ message: 'Cart not found' });
    }
    return { message: 'success', cart };
  }

  async updateItem(cartId: string, payload: UpdateCartItemDto) {
    let cart = await this.cartModel.updateOne(
      { _id: cartId, 'items._id': payload.groceryItemId },
      {
        $set: { ...payload },
      },
    );

    return { message: 'success', cart };
  }

  async deleteItem(cartId: string, payload: DeleteCartItemDto) {
    const cart = await this.cartModel.findByIdAndUpdate(cartId, {
      $pull: { items: { _id: payload.groceryItemId } },
    });
    if (!cart) {
      throw new NotFoundException({ message: 'Cart Item not found' });
    }

    return { message: 'success', cart };
  }
}
