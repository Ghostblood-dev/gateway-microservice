import { AuthModule } from './auth/auth.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { Module } from '@nestjs/common';
import { NastModule } from './transports/nast.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule, OrdersModule, NastModule, PaymentsModule, AuthModule, HealthCheckModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
