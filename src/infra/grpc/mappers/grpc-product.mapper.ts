import { Product } from '@/domain/products/enterprise/entities/product';
import { Product as ProductGrpc } from '@/infra/grpc/proto/product';

export class ProductGrpcMapper {
  static toDomain(product: ProductGrpc) {
    return Product.create(
      {
        name: product.name,
        description: product.description,
        price: product.price,
      },
      product.id,
    );
  }
}
