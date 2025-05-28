import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
  @IsMongoId()
  groceryItemId: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class DeleteCartItemDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  groceryItemId: string;

  @IsOptional()
  reason: string;
}
