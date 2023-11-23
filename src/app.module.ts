import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ShoppingcartsModule } from './shoppingcarts/shoppingcarts.module';
import { OrdersModule } from './orders/orders.module';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    ProductsModule,
    UsersModule,
    RolesModule,
    ShoppingcartsModule,
    OrdersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
