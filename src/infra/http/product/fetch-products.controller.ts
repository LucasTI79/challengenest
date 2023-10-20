import { FetchProductUseCase } from '@/domain/products/application/useCases/fetch-products.usecase';
import { BadRequestException, Controller, Get } from '@nestjs/common';

@Controller('/products')
export class FetchProductController {
  constructor(private fetchProductUseCase: FetchProductUseCase) {}

  @Get()
  async handle() {
    const products = await this.fetchProductUseCase.execute();

    if (products.isLeft()) {
      throw new BadRequestException();
    }

    return {
      products,
    };
  }
}
