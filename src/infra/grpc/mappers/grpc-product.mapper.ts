import { Product } from '@/domain/products/enterprise/entities/product';
import { Product as ProductGrpc } from '@/infra/grpc/repositories/product/product.grpc';

export class ProductGrpcMapper {
  static toDomain(product: ProductGrpc): Product {
    return Product.create(product, product.id);
  }
}
