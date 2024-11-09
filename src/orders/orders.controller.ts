import { Controller, Get, Post, Body, Patch, Param, Inject, Query, ParseUUIDPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NAST_SERVICES, ORDER_SERVICES } from 'src/config';
import { catchError } from 'rxjs';
import { OrderPaginationDto } from './dto/order-paginations.dto';
import { PaginationDto } from 'src/common';
import { StatusDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NAST_SERVICES) private readonly orderClient: ClientProxy) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderClient.send('createOrder', createOrderDto)
      .pipe(
        catchError(error => {
          throw new RpcException(error)
        })
      )
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.orderClient.send('findAllOrders', orderPaginationDto)
      .pipe(
        catchError(error => {
          throw new RpcException(error)
        })
      )
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderClient.send('findOneOrder', { id })
      .pipe(
        catchError(error => {
          throw new RpcException(error)
        })
      )
  }

  @Get(':status')
  findByStatus(@Param() status: StatusDto, @Query() paginationDto: PaginationDto) {
    return this.orderClient.send('findAllOrders', { ...status, ...paginationDto })
      .pipe(
        catchError(error => {
          throw new RpcException(error)
        })
      )
  }

  @Patch(':id')
  ChangeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: StatusDto
  ) {
    return this.orderClient.send('changeOrderStatus', { id, status: body.status })
      .pipe(
        catchError(error => {
          throw new RpcException(error)
        })
      )
  }

}
