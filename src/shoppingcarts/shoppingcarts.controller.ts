import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShoppingcartsService } from './shoppingcarts.service';
import { ProductUserRelationDto } from 'src/common/dto/product-user.dto';

@Controller('shoppingcarts')
export class ShoppingcartsController {
  constructor(private readonly shoppingcartsService: ShoppingcartsService) {}

  @Post()
  addProduct(@Body() productUser: ProductUserRelationDto) {
    return this.shoppingcartsService.addToShoppingCart(
      productUser.productId,
      productUser.userId,
    );
  }

  @Get()
  findAllByLoggedUser() {
    return this.shoppingcartsService.findAllByLoggedUser(1);
  }

  @Get('productId/:productId')
  findOne(@Param('productId') productId: number) {
    return this.shoppingcartsService.findOne(+productId, 1);
  }

  @Delete(':id')
  remove(@Param('id') productId: number) {
    return this.shoppingcartsService.remove(+productId);
  }
}
