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
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUtils } from 'src/utils/fileManager.util';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ERole } from 'src/roles/enums/role.enum';
import { Roles } from 'src/auth/decorators/role.decorator';
import { User } from 'src/auth/decorators/user.decorator';
import { LoggedUserDTO } from 'src/users/entities/user.entity';
@ApiTags('Product')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles([ERole.MANAGER])
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
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles([ERole.CLIENT])
  @Post(':id/like')
  like(@User() user: LoggedUserDTO, @Param('id', ParseIntPipe) id: number) {
    return this.productsService.like(id, user.id);
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles([ERole.CLIENT])
  @Delete(':id/like')
  unlike(@Param('id') id: number, @User() user: LoggedUserDTO) {
    return this.productsService.unlike(+id, user.id);
  }

  @Get()
  @ApiQuery({ name: 'category', required: false })
  async findAll(@Query('category') category: string) {
    return await this.productsService.findAll(category);
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles([ERole.MANAGER])
  @Get('/admin')
  @ApiQuery({ name: 'category', required: false })
  async findAllAsManager(
    @User() user: any,
    @Query('category') category: string,
  ) {
    console.log(user);
    return await this.productsService.findAllAsManager(category);
  }
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles([ERole.MANAGER])
  @Get(':id/admin')
  async findOneAsManager(@Param('id', ParseIntPipe) id: string) {
    return await this.productsService.findOneAsManager(+id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    return await this.productsService.findOne(+id);
  }

  @Patch(':id/status')
  changeStatus(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.changeStatus(+id);
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles([ERole.MANAGER])
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
  @ApiBody({
    type: UpdateProductDto,
    examples: {
      a: {
        summary: 'simple example',
        value: {
          name: 'new name',
          description: 'new description',
        },
      },
    },
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Roles([ERole.MANAGER])
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(+id);
  }
}
