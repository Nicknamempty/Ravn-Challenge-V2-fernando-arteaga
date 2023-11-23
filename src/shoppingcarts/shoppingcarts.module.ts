import { Module } from '@nestjs/common';
import { ShoppingcartsService } from './shoppingcarts.service';
import { ShoppingcartsController } from './shoppingcarts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ShoppingcartsController],
  providers: [ShoppingcartsService],
  imports: [PrismaModule],
})
export class ShoppingcartsModule {}
