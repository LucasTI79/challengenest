import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Product } from '@/domain/products/enterprise/entities/product';
import { ProductsRepository } from '../../../../domain/products/application/repositories/products.repository';
import { ClientGrpc } from '@nestjs/microservices';
import { ProductServiceGrpc } from './product.grpc';
import { ProductGrpcMapper } from '../../mappers/grpc-product.mapper';

@Injectable()
export class ProductGrpcRepository
  extends ProductsRepository
  implements OnModuleInit
{
  private productGrpcService: ProductServiceGrpc | null = null;

  constructor(
    @Inject('PRODUCT_PACKAGE')
    private readonly productGrpcPackage: ClientGrpc,
  ) {
    super();
  }

  onModuleInit() {
    this.productGrpcService =
      this.productGrpcPackage.getService<ProductServiceGrpc>('ProductService');
  }

  async fetchProducts(): Promise<Product[]> {
    if (this.productGrpcService) {
      const products = await this.productGrpcService.FindProducts();
      return products.products.map((product) => {
        return ProductGrpcMapper.toDomain(product);
      });
    }
    throw new Error('productGrpcService is not initialized');
  }
  async createProduct(request: Product): Promise<Product> {
    if (this.productGrpcService) {
      const product = await this.productGrpcService.CreateProduct({
        name: request.name,
        description: request.description,
        price: request.price,
      });
      return ProductGrpcMapper.toDomain(product.product);
    }
    throw new Error('productGrpcService is not initialized');
  }
}
