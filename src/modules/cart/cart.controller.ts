import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from 'modules/auth.guard';
import {
  AddCartItemDto,
  DeleteCartItemDto,
  UpdateCartItemDto,
} from './dto/cart-request.dto';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { GroceryPropertyValidationPipe } from './cart.pipes';
import { CartGuard } from './cart.guard';

@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':cartId')
  @UseGuards(CartGuard)
  getItems(@Param('cartId', ParseObjectIdPipe) cartId: string) {
    return this.cartService.findCartItems(cartId);
  }

  @Post(':cartId')
  @UseGuards(CartGuard)
  additem(
    @Param('cartId', ParseObjectIdPipe) cartId: string,
    @Body() additemDto: AddCartItemDto,
  ) {
    return this.cartService.additem(cartId, additemDto);
  }

  @Patch(':cartId')
  @UseGuards(CartGuard)
  updateItem(
    @Param('cartId', ParseObjectIdPipe) cartId: string,
    @Body(new GroceryPropertyValidationPipe()) payload: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(cartId, payload);
  }

  @Delete(':cartId')
  @UseGuards(CartGuard)
  deleteItem(
    @Param('cartId', ParseObjectIdPipe) cartId: string,
    @Body() payload: DeleteCartItemDto,
  ) {
    return this.cartService.deleteItem(cartId, payload);
  }
}
