import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { NastModule } from './transports/nast.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [ProductsModule, OrdersModule, NastModule, PaymentsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
