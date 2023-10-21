import { Inject, Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';
import { Either, right } from '@/core/either';
import { Product } from '../../enterprise/entities/product';

interface CreateProductUseCaseRequest {
  name: string;
  description: string;
  price: number;
}

type CreateProductUseCaseResponse = Either<
  null,
  {
    product: Product;
  }
>;

@Injectable()
export class CreateProductUseCase {
  constructor(
    // @Inject('ProductsRepository')
    private readonly productsRepository: ProductsRepository,
  ) {}
  async execute({
    name,
    description,
    price,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const productInstance = Product.create({
      name,
      description,
      price,
    });

    const product = await this.productsRepository.createProduct(
      productInstance,
    );

    return right({
      product,
    });
  }
}
