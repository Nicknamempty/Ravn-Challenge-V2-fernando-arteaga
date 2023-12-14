import { ApiProperty } from '@nestjs/swagger';

export class CreateShoppingcartDto {
  @ApiProperty()
  productId: number;
}
