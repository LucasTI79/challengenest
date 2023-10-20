import { Entity } from 'src/core/entities/entity';

interface ProductProps {
  name: string;
  description?: string;
  price: number;
}

export class Product extends Entity<ProductProps> {
  get name() {
    return this.name;
  }
  set name(name: string) {
    this.name = name;
  }
  get description() {
    return this.description;
  }
  set description(description: string) {
    this.description = description;
  }
  get price() {
    return this.price;
  }
  set price(price: number) {
    this.price = price;
  }
  static create(props: ProductProps, id?: number) {
    const product = new Product(props, id);
    return product;
  }
}
