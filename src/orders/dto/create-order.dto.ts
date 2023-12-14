import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  productId: number;

  @IsInt()
  @ApiProperty({ required: true })
  @IsNotEmpty()
  quantity: number;
}
