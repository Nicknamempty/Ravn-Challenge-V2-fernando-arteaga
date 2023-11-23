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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUtils } from 'src/utils/fileManager.util';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('productImage', {
      storage: diskStorage(FileUtils.getStorageOptions('./uploads/products')),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    // Aquí puedes utilizar tanto el archivo cargado como los datos del formulario
    const productDataWithPhoto = {
      ...createProductDto,
      image: file.filename,
    };
    return this.productsService.create(productDataWithPhoto);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('product', {
      storage: diskStorage(FileUtils.getStorageOptions('./uploads/products')),
    }),
  )
  async upload() {
    // Aquí puedes utilizar el archivo cargado según tus necesidades
    // console.log(file.fieldname);
  }

  @Post('/like')
  like(@Body('productId') productId: number) {
    return this.productsService.like(productId, 1);
  }
  @Delete(':id/like')
  unlike(@Param('id') id: number) {
    return this.productsService.unlike(+id, 1);
  }

  @Get()
  async findAll(@Query('category') category: string) {
    return await this.productsService.findAll(category);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(+id);
  }

  @Patch(':id/status')
  changeStatus(@Param('id') id: number) {
    return this.productsService.changeStatus(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(+id);
  }
}
