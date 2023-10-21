import { Entity } from 'src/core/entities/entity';

interface ProductProps {
  name: string;
  description?: string;
  price: number;
}

export class Product extends Entity<ProductProps> {
  get name() {
    return this.props.name;
  }
  set name(name: string) {
    this.props.name = name;
  }
  get description() {
    return this.props.description || '';
  }
  set description(description: string) {
    this.props.description = description;
  }
  get price() {
    return this.props.price;
  }
  set price(price: number) {
    this.props.price = price;
  }
  static create(props: ProductProps, id?: number) {
    const product = new Product({ ...props }, id);
    return product;
  }
}
