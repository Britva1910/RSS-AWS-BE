import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {CreateProductDto} from "./dto/create-product.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/products")
  async getAllProducts(): Promise<any> {
    return this.appService.getAllProducts();
  }

  @Get('/products/:id')
  async getProductById(@Param('id') id: string): Promise<any> {
    return this.appService.getProductById(id);
  }

  @Post('/products')
  async createProduct(@Body() newProductData: CreateProductDto): Promise<any> {
    return this.appService.createProduct(newProductData);
  }
}
