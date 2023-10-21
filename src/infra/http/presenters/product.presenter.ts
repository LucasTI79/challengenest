import { Product } from '@/domain/products/enterprise/entities/product';

export class ProductPresenter {
  static toHTTP(product: Product) {
    return {
      id: product.id!.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
    };
  }
}
