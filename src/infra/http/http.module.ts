import { Module } from '@nestjs/common';
import { FetchProductController } from './product/fetch-products.controller';
import { CreateProductController } from './product/create-product.controller';
import { FetchProductUseCase } from '@/domain/products/application/useCases/fetch-products.usecase';
import { CreateProductUseCase } from '@/domain/products/application/useCases/create-product.usecase';
import { GrpcClientModule } from '../grpc/grpc-client.module';

@Module({
  imports: [GrpcClientModule],
  controllers: [FetchProductController, CreateProductController],
  providers: [FetchProductUseCase, CreateProductUseCase],
})
export class HttpModule {}
