import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class GroceryPropertyValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value?.quantity >= 100) {
      throw new BadRequestException('Quantity should not exceed 100');
    }
    return value;
  }
}
