import { Component } from '@angular/core';
import { CartService } from "../../service/cart.service";
import {ProductGetDTO} from "../../model/product-get-dto";
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent {
  id!:string;
  isLogged:boolean = false;
  idPerson!:string;

  constructor(private router: Router, private route:ActivatedRoute, private cartService:CartService, private tokenService : TokenService, private sessionService : SessionService) {
    this.route.params.subscribe(params => {this.id = params["id"]})
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

  public addCart(){
    this.cartService.addProduct(parseInt(this.id));
  }

}
