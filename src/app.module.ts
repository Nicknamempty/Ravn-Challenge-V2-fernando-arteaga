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
import { JwtModule } from '@nestjs/jwt';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    PrismaModule,
    ProductsModule,
    UsersModule,
    RolesModule,
    ShoppingcartsModule,
    OrdersModule,
    AuthModule,
    JwtModule.register({
      secret: '123',
      signOptions: { expiresIn: '1d' },
    }),
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
