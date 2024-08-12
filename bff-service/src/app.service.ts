import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable()
export class AppService {
  constructor(
      private readonly configService: ConfigService,
      private readonly httpService: HttpService
  ) {}

  private getProductsAPI(): string {
    const productsAPI = this.configService.get<string>('PRODUCTS_API');
    if (!productsAPI) {
      throw new HttpException(
          'Cannot process request: PRODUCTS_API not configured',
          HttpStatus.BAD_GATEWAY
      );
    }
    return productsAPI;
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getAllProducts(): Promise<any> {
    const productsAPI = this.getProductsAPI();
    try {
      const response = await firstValueFrom(
          this.httpService.get(`${productsAPI}/products`)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error.message);
      throw new HttpException(
          {
            success: false,
            message: "Failed to fetch products.",
            error: error.response?.data?.message || error.message,
          },
          error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getProductById(id: string): Promise<any> {
    const productsAPI = this.getProductsAPI();
    try {
      const response = await firstValueFrom(
          this.httpService.get(`${productsAPI}/products/${id}`)
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error.message);
      throw new HttpException(
          {
            success: false,
            message: `Failed to fetch product with ID: ${id}.`,
            error: error.response?.data?.message || error.message,
          },
          error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createProduct(
      newProductData: CreateProductDto
  ): Promise<any> {
    const productsAPI = this.getProductsAPI();
    try {
      const response = await firstValueFrom(
          this.httpService.post(`${productsAPI}/products`, newProductData),
      );
      console.log("Response", response);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error.message);
      throw new HttpException(
          {
            success: false,
            message: "Failed to create product.",
            error: error.response?.data?.message || error.message,
          },
          error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}