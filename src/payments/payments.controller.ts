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
    return this.payment.send('createPaymentSession', paymentSessionDTO)
      .pipe(
        catchError(error => {
          throw new RpcException(error)
        })
      )
  }

  @Get('success')
  success() {
    console.log('log')
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
