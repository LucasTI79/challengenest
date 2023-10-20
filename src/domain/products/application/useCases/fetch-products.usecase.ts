import { Either, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { Product } from '../../enterprise/entities/product';
import { ProductsRepository } from '../repositories/products.repository';

type FetchProductUseCaseResponse = Either<
  null,
  {
    products: Product[];
  }
>;

@Injectable()
export class FetchProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(): Promise<FetchProductUseCaseResponse> {
    const products = await this.productsRepository.fetchProducts();
    return right({
      products,
    });
  }
}
