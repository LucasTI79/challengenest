import { CreateProductUseCase } from '@/domain/products/application/useCases/create-product.usecase';
import { ProductGrpcMapper } from '@/infra/grpc/mappers/grpc-product.mapper';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { z } from 'zod';
import { ProductPresenter } from '../../presenters/product.presenter';

const createProductBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().default(0.0),
});

const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema);

type CreateProductBodySchema = z.infer<typeof createProductBodySchema>;

@Controller('/products')
export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateProductBodySchema) {
    const { name, description, price } = body;

    const products = await this.createProductUseCase.execute({
      name,
      description,
      price,
    });

    if (products.isLeft()) {
      throw new BadRequestException();
    }

    return {
      product: ProductPresenter.toHTTP(products.value.product),
    };
  }
}
