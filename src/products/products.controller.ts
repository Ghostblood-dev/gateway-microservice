import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NAST_SERVICES, PRODUCT_SERVICES } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NAST_SERVICES) private readonly productClient: ClientProxy
  ) { }

  @Post()
  CreateProducts(@Body() createProductDto: CreateProductDto) {
    return this.productClient.emit({ cmd: 'createProduct' }, createProductDto)
      .pipe(
        catchError(error => {
          throw new RpcException(error)
        })
      )
  }

  @Get()
  FindProducts(@Query() paginationDto: PaginationDto) {
    return this.productClient.send({ cmd: 'findAllProducts' }, paginationDto)
      .pipe(
        catchError(error => {
          throw new RpcException(error)
        })
      )
  }

  @Get(':id')
  async FindOne(@Param('id', ParseIntPipe) id: string) {
    return this.productClient.send({ cmd: 'findOneProducts' }, { id })
      .pipe(
        catchError(error => {
          throw new RpcException(error)
        })
      )
  }

  @Patch(':id')
  PatchProduct(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDto) {
    return this.productClient.send({ cmd: 'updateProducts' }, { id, ...body })
      .pipe(
        catchError(error => {
          throw new RpcException(error)
        })
      )
  }

  @Delete(':id')
  DeleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productClient.send({ cmd: 'deleteProduct' }, { id })
      .pipe(
        catchError(error => {
          throw new RpcException(error)
        })
      )
  }
}
