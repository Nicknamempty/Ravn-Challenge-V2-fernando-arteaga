import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { productImageWindowsPath } from 'src/common/const';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    const categoryExists = await this.prismaService.category.findFirst({
      where: { id: Number(createProductDto.categoryId) },
    });
    if (!categoryExists) throw new BadRequestException('no category found');

    const { productImage, categoryId, ...product } = createProductDto;
    return await this.prismaService.product.create({
      data: {
        ...product,
        image: productImageWindowsPath + createProductDto.image,
        price: Number(createProductDto.price),
        stock: Number(createProductDto.stock),
        category: {
          connect: {
            id: Number(categoryExists.id),
          },
        },
      },
    });
  }

  async findAll(category?: string) {
    return await this.prismaService.product.findMany({
      where: {
        category: {
          name: { contains: category?.toLocaleLowerCase() },
        },
        status: true,
      },
      include: {
        category: true,
        _count: {
          select: { likes: true },
        },
      },
    });
  }

  async findAllAsManager(category?: string) {
    return await this.prismaService.product.findMany({
      where: {
        category: {
          name: { contains: category?.toLocaleLowerCase() },
        },
      },
      include: {
        category: true,
        _count: {
          select: { likes: true },
        },
      },
    });
  }

  async findOne(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
        status: true,
      },
      include: {
        _count: {
          select: { likes: true },
        },
      },
    });
    if (!product) {
      throw new NotFoundException('no product was found ):');
    }
    return product;
  }

  async findOneAsManager(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: { likes: true },
        },
      },
    });
    if (!product) {
      throw new NotFoundException('no product was found ):');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.prismaService.product.update({
      where: { id },
      data: { ...updateProductDto },
    });
  }

  async like(id: number, userId: number) {
    const product = await this.prismaService.product.findFirst({
      where: { id, status: true },
    });

    if (!product) throw new NotFoundException();

    await this.prismaService.likesByProduct.create({
      data: {
        userId,
        productId: id,
      },
    });
  }

  async unlike(productId: number, userId: number) {
    await this.prismaService.likesByProduct.deleteMany({
      where: {
        userId,
        productId,
      },
    });
  }

  async changeStatus(productId: number) {
    const product = await this.prismaService.product.findFirst({
      where: { id: productId },
    });
    if (!product)
      throw new NotFoundException(
        'product does not exist or have been deleted',
      );
    return await this.prismaService.product.update({
      where: { id: productId },
      data: { status: !product.status },
    });
  }

  async remove(id: number) {
    return await this.prismaService.product.delete({ where: { id } });
  }
}
