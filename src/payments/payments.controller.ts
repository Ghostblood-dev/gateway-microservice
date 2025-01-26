import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NAST_SERVICES } from 'src/config';
import { catchError } from 'rxjs';
import { PaymentSessionDTO } from './dto';

@Controller('payments')
export class PaymentsController {
  constructor(@Inject(NAST_SERVICES) private readonly payment: ClientProxy) { }

  @Post('create-payment-session')
  createPaymentSession(@Body() paymentSessionDTO: PaymentSessionDTO) {
    return this.payment.send('create.payment.session', paymentSessionDTO)
      .pipe(
        catchError(error => {
          throw new RpcException(error)
        })
      )
  }

  @Get('success')
  success() {
    return this.payment.send('success', {})
      .pipe(
        catchError(error => {
          throw new RpcException(error)
        })
      )
  }

  @Get('cancel')
  cancel() {
    return this.payment.send('cancel', {})
      .pipe(
        catchError(error => {
          throw new RpcException(error)
        })
      )
  }

  @Post('webhook')
  async stripeWebhook() {
    return this.payment.send('webhook', {})
      .pipe(
        catchError(error => {
          throw new RpcException(error)
        })
      )
  }

}
