import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {HttpService} from "@nestjs/axios";
import {firstValueFrom} from "rxjs";
import {CreateProductDto} from "./dto/create-product.dto";

@Injectable()
export class AppService {

  constructor(private configService: ConfigService,
              private readonly httpService: HttpService) {}

  private getProductsAPI(): string {
    return this.configService.get<string>('PRODUCTS_API');
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getAllProducts(): Promise<any> {
    const productsAPI = this.getProductsAPI();
    try {
      const response = await firstValueFrom(
          this.httpService.get(productsAPI + "/products")
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error.message);

      return {
        success: false,
        message: "Failed to fetch products.",
        error: error.message
      };
    }
  }

  async getProductById(id: string): Promise<any>{
    const productsAPI = this.getProductsAPI();
    try {
      const response = await firstValueFrom(
          this.httpService.get(`${productsAPI}/products/${id}`)
      );
      return response.data;
    } catch (error){
      console.log(error.message)
      return {
        success: false,
        message: `Failed to fetch product with ID: ${id}.`,
        error: error.message
      };
    }
  }

  async createProduct(
      newProductData: CreateProductDto,
  ): Promise<any> {
    const productsAPI = this.getProductsAPI();
    try {
      const response = await firstValueFrom(
          this.httpService.post(productsAPI + '/products', newProductData),
      );
      console.log("Response", response)
      return response.data;
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Failed to create product.",
        error: error.message
      };
    }
  }
}