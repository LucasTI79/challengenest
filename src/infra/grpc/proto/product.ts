import { Observable } from 'rxjs';

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface CreateProductResponse {
  product: Product | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FindProductsRequest {}

export interface FindProductsResponse {
  products: Product[];
}

export interface ProductService {
  CreateProduct(
    request: CreateProductRequest,
  ): Observable<CreateProductResponse>;
  FindProducts(request: FindProductsRequest): Observable<FindProductsResponse>;
}
