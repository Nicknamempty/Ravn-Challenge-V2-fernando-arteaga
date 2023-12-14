import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ShoppingcartsService } from './shoppingcarts.service';

import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { ERole } from 'src/roles/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/decorators/user.decorator';
import { LoggedUserDTO } from 'src/users/entities/user.entity';
import { CreateShoppingcartDto } from './dto/create-shoppingcart.dto';

@ApiTags('Shopping cart ')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Roles([ERole.CLIENT])
@Controller('shoppingcarts')
export class ShoppingcartsController {
  constructor(private readonly shoppingcartsService: ShoppingcartsService) {}

  @Post()
  addProduct(
    @Body() product: CreateShoppingcartDto,
    @User() user: LoggedUserDTO,
  ) {
    return this.shoppingcartsService.addToShoppingCart(
      product.productId,
      user.id,
    );
  }

  @Get()
  findAllByLoggedUser(@User() user: LoggedUserDTO) {
    return this.shoppingcartsService.findAllByLoggedUser(user.id);
  }

  @Get('productId/:productId')
  findOne(@Param('productId') productId: number, @User() user: LoggedUserDTO) {
    return this.shoppingcartsService.findOne(+productId, user.id);
  }

  @Delete(':id')
  remove(@Param('id') productId: number, @User() user: LoggedUserDTO) {
    return this.shoppingcartsService.remove(+productId, user.id);
  }
}
