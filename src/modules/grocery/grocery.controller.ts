import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './grocery.service';
import { GroceryRequestDto } from './dto/grocery.request.dto';
import { GroceryResponseDto } from './dto/grocery.response.dto';

@Controller('grocery')
export class GroceryController {
  constructor(private readonly groceryService: CartService) {}

  @Post()
  create(@Body() createGroceryDto: GroceryRequestDto) {
    return this.groceryService.create(createGroceryDto);
  }

  @Get()
  findAll() {
    return this.groceryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groceryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGroceryDto: GroceryResponseDto,
  ) {
    return this.groceryService.update(+id, updateGroceryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groceryService.remove(+id);
  }
}
