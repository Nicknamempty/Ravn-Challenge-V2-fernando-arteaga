import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';

import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [PrismaModule],
})
export class ProductsModule {}
