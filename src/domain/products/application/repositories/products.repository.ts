import { Product } from '../../enterprise/entities/product';

export abstract class ProductsRepository {
  abstract fetchProducts(): Promise<Product[]>;
  abstract createProduct(product: Product): Promise<Product>;
}
