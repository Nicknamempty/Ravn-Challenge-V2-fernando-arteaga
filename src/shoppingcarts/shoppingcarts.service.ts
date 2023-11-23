import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ShoppingcartsService {
  constructor(private readonly prismaService: PrismaService) {}

  async addToShoppingCart(productId: number, userId: number) {
    const productExists = await this.prismaService.product.findFirst({
      where: { id: productId },
    });
    if (!productExists) {
      throw new BadRequestException(
        'the product does not exist or have been deleted',
      );
    }
    const productAlreadyAdded = await this.findOne(productId, userId);
    if (productAlreadyAdded) {
      throw new BadRequestException(
        'this product is already on the shopping cart',
      );
    }
    return await this.prismaService.shoppingCart.create({
      data: {
        userId,
        productId,
        quantity: 0,
      },
    });
  }

  async findAllByLoggedUser(userId: number) {
    return await this.prismaService.shoppingCart.findMany({
      where: { userId },
    });
  }

  async findOne(productId: number, userId: number) {
    return await this.prismaService.shoppingCart.findFirst({
      where: { userId, productId },
    });
  }

  async remove(productId: number) {
    return this.prismaService.shoppingCart.deleteMany({
      where: { userId: 1, productId },
    });
  }
}
