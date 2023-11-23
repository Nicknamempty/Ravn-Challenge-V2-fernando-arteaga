import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsPositive,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  productImage: Express.Multer.File;

  image: string;

  @ApiProperty()
  @Transform((value) => (Number.isNaN(+value) ? 0 : +value))
  @IsInt()
  price: number;

  @ApiProperty()
  @Transform((value) => (Number.isNaN(+value) ? 0 : +value))
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({ required: true })
  @Transform((value) => (Number.isNaN(+value) ? 0 : +value))
  @IsInt()
  categoryId: number;
}
