import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  addProduct(@Body() order: CreateOrderDto) {
    return this.ordersService.create(order, 1);
  }

  @Get()
  findAllByLoggedUser() {
    return this.ordersService.findAllByLoggedUser(1);
  }

  @Get('productId/:productId')
  findOne(@Param('productId') productId: number) {
    return this.ordersService.findOne(+productId, 1);
  }

  @Delete(':id')
  remove(@Param('id') productId: number) {
    return this.ordersService.remove(+productId);
  }
}
