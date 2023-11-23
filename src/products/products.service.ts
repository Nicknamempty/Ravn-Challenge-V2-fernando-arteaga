import {
  Injectable,
  NotFoundException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    return await this.prismaService.product.create({ data: createProductDto });
  }

  async findAll(category?: string) {
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

  async like(productId: number, userId: number) {
    await this.prismaService.likesByProduct.create({
      data: {
        userId,
        productId,
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
