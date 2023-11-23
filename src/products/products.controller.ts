import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUtils } from 'src/utils/fileManager.util';
import { ApiConsumes } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/role.decorator';
import { ERoles } from 'src/auth/constant/roles.constant';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Roles(ERoles.Manager)
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('productImage', {
      storage: diskStorage(
        FileUtils.getStorageOptions(
          '/mnt/c/Users/ferme/OneDrive/Desktop/products',
        ),
      ),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    const productDataWithPhoto = {
      ...createProductDto,
      image: file.filename,
    };
    return this.productsService.create(productDataWithPhoto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/like')
  like(@Body('productId') productId: number) {
    return this.productsService.like(productId, 1);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/like')
  unlike(@Param('id') id: number) {
    return this.productsService.unlike(+id, 1);
  }

  @Roles(ERoles.Manager)
  @Get()
  async findAll(@Query('category') category: string) {
    return await this.productsService.findAll(category);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/status')
  changeStatus(@Param('id') id: number) {
    return this.productsService.changeStatus(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(+id);
  }
}
