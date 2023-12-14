import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  async findAllByClient(id: number) {
    return await this.prismaService.order.findMany({ where: { userId: id } });
  }
  constructor(private readonly prismaService: PrismaService) {}

  async create(order: CreateOrderDto, userId: number) {
    const product = await this.prismaService.product.findFirst({
      where: {
        id: order.productId,
      },
    });
    if (product.stock < order.quantity)
      throw new BadRequestException('stock error');
    await this.prismaService.product.update({
      where: { id: product.id },
      data: {
        stock: product.stock - order.quantity,
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

  async findOne(productId: number, userId: number, date: string) {
    return await this.prismaService.order.findFirst({
      where: { userId, productId, createdAt: date },
    });
  }

  async remove(productId: number) {
    return this.prismaService.order.deleteMany({
      where: { userId: 1, productId },
    });
  }
}
