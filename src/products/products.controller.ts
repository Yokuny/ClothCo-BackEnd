import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from './products.service';

@Controller('product')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get()
  async getProducts(@Res() res: Response) {
    try {
      const products = await this.service.getProducts();

      return res.status(HttpStatus.OK).json(products);
    } catch (err) {
      console.log(err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error' });
    }
  }
  @Get(':id')
  async getProduct(@Res() res: Response, @Param('id') id: string) {
    try {
      const product = await this.service.getProduct(id);

      return res.status(HttpStatus.OK).json(product);
    } catch (err) {
      console.log(err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error' });
    }
  }
}
