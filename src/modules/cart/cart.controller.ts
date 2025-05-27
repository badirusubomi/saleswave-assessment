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

@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':cartId')
  getItems(@Param('cartId') cartId: string) {
    return this.cartService.findCartItems(cartId);
  }

  @Post(':id')
  additem(@Param('cartId') cartId: string, @Body() additemDto: AddCartItemDto) {
    return this.cartService.additem(cartId, additemDto);
  }

  @Patch(':cartId')
  updateItem(
    @Param('cartId') cartId: string,
    @Body() payload: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(cartId, payload);
  }

  @Delete(':id')
  deleteItem(
    @Param('cartId') cartId: string,
    @Body() payload: DeleteCartItemDto,
  ) {
    return this.cartService.deleteItem(cartId, payload);
  }
}
