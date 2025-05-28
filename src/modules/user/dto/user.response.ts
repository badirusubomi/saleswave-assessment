import { Expose } from 'class-transformer';

export class GroceryResponseDto {
  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }

  @Expose()
  username: string;

  @Expose()
  email: string;
}
