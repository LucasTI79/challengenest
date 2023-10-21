import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { Product } from '@/domain/products/enterprise/entities/product';
import { ProductsRepository } from '../../../domain/products/application/repositories/products.repository';
import { ClientGrpc } from '@nestjs/microservices';
import { ProductService } from '@/infra/grpc/proto/product';
import { ProductGrpcMapper } from '../mappers/grpc-product.mapper';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductGrpcRepository
  extends ProductsRepository
  implements OnModuleInit
{
  private productGrpcService: ProductService | null = null;

  constructor(
    @Inject('PRODUCT_PACKAGE')
    private prodGrpcPackage: ClientGrpc,
  ) {
    super();
  }

  onModuleInit() {
    this.productGrpcService =
      this.prodGrpcPackage.getService<ProductService>('ProductService');
  }

  async fetchProducts(): Promise<Product[]> {
    if (this.productGrpcService) {
      const products = await lastValueFrom(
        this.productGrpcService.FindProducts({}),
      );
      if (!products) return [];
      return products?.products?.map(ProductGrpcMapper.toDomain);
    }
    throw new Error('productGrpcService is not initialized');
  }
  async createProduct(request: Product): Promise<Product> {
    if (this.productGrpcService) {
      const createProductResponse = await lastValueFrom(
        this.productGrpcService.CreateProduct({
          name: request.name,
          description: request.description,
          price: request.price,
        }),
      );
      if (!createProductResponse?.product) throw new BadRequestException();
      return ProductGrpcMapper.toDomain(createProductResponse.product);
    }
    throw new Error('productGrpcService is not initialized');
  }
}
