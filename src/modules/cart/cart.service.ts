import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Model } from 'mongoose';
import { AddCartItemDto, UpdateCartItemDto, DeleteCartItemDto } from './dto';
import { Cart } from 'src/libs';

@Injectable()
export class CartService {
  constructor(@Inject('CART_MODEL') private cartModel: Model<Cart>) {}

  async additem(cartId: string, additemDto: AddCartItemDto) {
    const cart = await this.cartModel
      .findByIdAndUpdate(
        cartId,
        {
          $push: { items: { ...additemDto } },
        },
        { new: true },
      )
      .exec();
    if (!cart) {
      throw new NotFoundException({ message: 'Cart not found' });
    }
    const item = cart.items[cart.items.length - 1];
    return {
      message: 'Item added successfully',
      item: {
        id: item['_id'].toString(),
        name: item['name'],
        description: item['description'],
        quantity: item['quantity'],
      },
    };
  }

  async findCartItems(cartId: string) {
    const cart = await this.cartModel.findById(cartId).exec();
    if (!cart) {
      throw new NotFoundException({ message: 'Cart not found' });
    }
    return { message: 'success', cart };
  }

  async updateItem(cartId: string, payload: UpdateCartItemDto) {
    let result = await this.cartModel
      .updateOne(
        { _id: cartId, 'items._id': payload.groceryItemId },
        {
          $set: {
            'items.$.name': payload.name,
            'items.$.quantity': payload.quantity,
            'items.$.description': payload.description,
          },
        },
      )
      .exec();

    if (result.modifiedCount === 0) {
      throw new NotFoundException({ message: 'Cart Item not found' });
    }

    return { message: 'successfully modified cart item' };
  }

  async deleteItem(cartId: string, payload: DeleteCartItemDto) {
    const result = await this.cartModel
      .updateOne(
        { _id: cartId, 'items._id': payload.groceryItemId },
        {
          $pull: { items: { _id: payload.groceryItemId } },
        },
      )
      .exec();

    if (result.modifiedCount === 0) {
      throw new NotFoundException({ message: 'Cart Item not found' });
    }

    return { message: 'Cart item deleted successfully' };
  }
}
