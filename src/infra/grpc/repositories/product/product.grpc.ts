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
  product: Product;
}

export interface FindProductsResponse {
  products: Product[];
}

export interface ProductServiceGrpc {
  CreateProduct(request: CreateProductRequest): Promise<CreateProductResponse>;
  FindProducts(): Promise<FindProductsResponse>;
}
