import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { ProductsService } from './products.service';
import { mongoIdDto } from './dto/mongoId.dto';

@ApiTags('Products')
@Controller('product')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'The products have been successfully returned.',
  })
  @ApiResponse({
    status: 404,
    description: 'Products not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @Get()
  async getProducts(@Res() res: Response) {
    try {
      const products = await this.service.getProducts();

      return res.status(HttpStatus.OK).json(products);
    } catch (err) {
      if (err.status === 404) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error' });
    }
  }

  @ApiOperation({ summary: 'Get a product by id' })
  @ApiParam({ name: 'id', type: mongoIdDto })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully returned.',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @Get(':id')
  async getProduct(@Param() id: mongoIdDto, @Res() res: Response) {
    try {
      const product = await this.service.getProduct(id);

      return res.status(HttpStatus.OK).send(product);
    } catch (err) {
      if (err.message === 'Product not found')
        return res.status(HttpStatus.NOT_FOUND).json(err.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err.message);
    }
  }
}
