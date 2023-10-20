import { CreateProductUseCase } from '@/domain/products/application/useCases/create-product.usecase';
import { ZodValidationPipe } from '@/infra/pipes/zod-validation-pipe';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { z } from 'zod';

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
      products,
    };
  }
}
