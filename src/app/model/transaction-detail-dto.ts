import {ProductGetDTO} from "./product-get-dto";

export class TransactionDetailDto {
  constructor(product: ProductGetDTO, units: number) {
    this.product = product;
    this.units = units;
  }

  product!: ProductGetDTO;
  units: number = 0;
}
