import { Component } from '@angular/core';
import { CartService } from "../../service/cart.service";
import { ProductService } from "../../service/product.service";
import { TransactionDetailDto } from "../../model/transaction-detail-dto";
import { ProductGetDTO } from 'src/app/model/product-get-dto';
import { TokenService } from 'src/app/service/token.service';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  products:TransactionDetailDto[];
  totalPrice:number;
  isLogged = false;
  idPerson!:string;

  constructor(private cartService:CartService, private productService:ProductService, private tokenService: TokenService, private sessionService : SessionService) {

    this.products = [];
    this.totalPrice = 0;

    const idList = this.cartService.listProducts();

    if(idList.length > 0){

      for( let id of idList ){

        this.productService.getProduct(id).subscribe({
          next: data => {
            const producto = data.response;

            if(producto!=null){
              this.products.push(new TransactionDetailDto(producto, 1));
              this.totalPrice += producto.price;
            }

          },
          error: error => {
            console.log(error.error.response);
          }
        });


      }
    }
  }

  ngOnInit(): void {
    const objeto = this;
    this.sessionService.currentMessage.subscribe({
      next: data => {
        objeto.actualizarSesion(data);
      }
    });
    this.actualizarSesion(this.tokenService.isLogged());
  }

  private actualizarSesion(estado: boolean) {
    this.isLogged = estado;
    if (estado) {
      this.idPerson = this.tokenService.getId()
    }
  }
  /*ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    }*/
}
