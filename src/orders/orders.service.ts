import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(order: CreateOrderDto, userId: number) {
    const productAlreadyAdded = this.findOne(order.productId, userId);
    if (productAlreadyAdded === null) {
      throw new BadRequestException(
        'this product is already on the shopping cart',
      );
    }
    const product = await this.prismaService.product.findFirst({
      where: {
        id: order.productId,
      },
    });

    return await this.prismaService.order.create({
      data: {
        userId,
        productId: order.productId,
        quantity: order.quantity,
        unitPrice: product.price,
        totalPrice: +product.price * order.quantity,
      },
    });
  }

  async findAllByLoggedUser(userId: number) {
    return await this.prismaService.order.findMany({
      where: { userId },
    });
  }

  async findOne(productId: number, userId: number) {
    return await this.prismaService.order.findFirst({
      where: { userId, productId },
    });
  }

  async remove(productId: number) {
    return this.prismaService.order.deleteMany({
      where: { userId: 1, productId },
    });
  }
}
