import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products: number[];
  constructor() {
    this.products = []; 
  }
  public addProduct(idProduct:number) {
      if(!this.products.includes(idProduct)){
        this.products.push(idProduct);
        console.log("Se agregó el producto con id " + idProduct);
      }
  }
  public removeProduct(id: number) {
    let indice = this.products.indexOf(id);
    this.products.splice(indice, 1);
  }
  public listProducts(): number[] {
    return this.products;
  }
}
