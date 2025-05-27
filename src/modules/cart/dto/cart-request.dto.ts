import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddCartItemDto {
  @IsString()
  @IsOptional()
  description: string;

  //   @IsNumber()
  //   @IsOptional()
  //   price: number;

  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class UpdateCartItemDto {
  @IsNotEmpty()
  @IsString()
  groceryItemId: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  //   @IsNumber()
  //   @IsOptional()
  //   price: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class DeleteCartItemDto {
  @IsNotEmpty()
  @IsString()
  groceryItemId: string;

  @IsOptional()
  reason: string;
}
