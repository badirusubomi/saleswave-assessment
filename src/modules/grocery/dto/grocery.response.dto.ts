import { PartialType } from '@nestjs/mapped-types';
import { GroceryRequestDto } from './grocery.request.dto';

export class GroceryResponseDto extends PartialType(GroceryRequestDto) {}
