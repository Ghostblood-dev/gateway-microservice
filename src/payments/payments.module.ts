import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { NastModule } from 'src/transports/nast.module';

@Module({
  controllers: [PaymentsController],
  providers: [],
  imports: [NastModule]
})
export class PaymentsModule { }
