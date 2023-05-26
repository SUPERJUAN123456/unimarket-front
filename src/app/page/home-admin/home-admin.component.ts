import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../service/product.service";
import { ProductGetDTO } from "../../model/product-get-dto";
import { Alert } from 'src/app/model/alert';
import { TokenService } from 'src/app/service/token.service';
import { ModeratorService } from 'src/app/service/moderator.service';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {

  textoBusqueda!: string;
  minPrice!: string;
  maxPrice!: string;
  filter!: string;
  products!: ProductGetDTO[];
  filtro!: ProductGetDTO[]
  roles!: string[];
  isMod = false;
  alert!: Alert;
  isLogged:boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private tokenService: TokenService, private moderatorService: ModeratorService, private sessionService : SessionService) {
    this.route.params.subscribe(params => {
      this.textoBusqueda = params["text"];
      this.filter = params["filter"];
      this.minPrice = params["minPrice"];
      this.maxPrice = params["maxPrice"];


      console.log(this.minPrice);
      console.log(this.maxPrice);
      console.log(this.filter);
      console.log(this.textoBusqueda);

      if (this.textoBusqueda && this.filter == "estado") {
        this.moderatorService.listProductByState(this.textoBusqueda).subscribe({
          next: data => {
            this.products = data.response;
            this.filtro = this.products;
            console.log(this.products);
          },
          error: error => {
            console.log(error.error.response);
          }
        });

      }
    });


  }
  public iraBusqueda(valor: string) {
    if (valor) {
      this.router.navigate(["busqueda/estado", valor]);
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
      this.roles = this.tokenService.getRol();

      if (this.roles[0] == "MODERADOR") {

        this.isMod = true;
      }
    }
  }
  /*ngOnInit(): void {
    this.roles = this.tokenService.getRol();

    if (this.roles[0].toString() == "MODERADOR") {
      this.isMod = true;
    }
  }*/
}
