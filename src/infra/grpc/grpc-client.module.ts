import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ProductsRepository } from '@/domain/products/application/repositories/products.repository';
import { ProductGrpcRepository } from './repositories/product/product-grpc.repository';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'PRODUCT_PACKAGE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: configService.get('GRPC_URL'),
            package: 'github.com.codeedu.codepix',
            protoPath: [join(__dirname, 'proto/product.proto')],
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      provide: ProductsRepository,
      useClass: ProductGrpcRepository,
    },
  ],
})
export class GrpcClientModule {}
