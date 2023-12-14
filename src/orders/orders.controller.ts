import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ERole } from 'src/roles/enums/role.enum';
import { LoggedUserDTO } from 'src/users/entities/user.entity';
import { User } from 'src/auth/decorators/user.decorator';
@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles([ERole.CLIENT])
  @Post()
  addProduct(@Body() order: CreateOrderDto, @User() user: LoggedUserDTO) {
    return this.ordersService.create(order, user.id);
  }

  @Roles([ERole.MANAGER])
  @Get('/user/:id/admin')
  findAllAsManager(@Param('id') id: number) {
    return this.ordersService.findAllByClient(id);
  }

  @Roles([ERole.CLIENT])
  @Get()
  findAllByLoggedUser(@User() user: LoggedUserDTO) {
    return this.ordersService.findAllByLoggedUser(user.id);
  }

  @Get('productId/:productId')
  findOne(
    @Param('productId') productId: number,
    @Param('date') date: string,
    @User() user: LoggedUserDTO,
  ) {
    return this.ordersService.findOne(+productId, user.id, date);
  }

  @Roles([ERole.CLIENT])
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) productId: number) {
    return this.ordersService.remove(+productId);
  }
}
