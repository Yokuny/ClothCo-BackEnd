import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { CheckoutsModule } from './checkouts/checkouts.module';

@Module({
  imports: [ProductsModule, CartsModule, RegistrationsModule, CheckoutsModule],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
