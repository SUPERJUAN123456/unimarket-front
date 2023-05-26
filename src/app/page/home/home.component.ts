import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../service/product.service";
import { ProductGetDTO } from "../../model/product-get-dto";
import { TokenService } from 'src/app/service/token.service';
import { Alert } from 'src/app/model/alert';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  textoBusqueda!: string;
  minPrice!: string;
  maxPrice!: string;
  filter!: string;
  products!: ProductGetDTO[];
  filtro!: ProductGetDTO[]
  roles!: string[];
  isMod = false;
  alert!: Alert;
  isLogged: boolean = false;


  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService, private tokenService: TokenService, private sessionService:SessionService) {


    this.route.params.subscribe(params => {
      this.textoBusqueda = params["text"];
      this.filter = params["filter"];
      this.minPrice = params["minPrice"];
      this.maxPrice = params["maxPrice"];


      console.log("minPrice:" + this.minPrice);
      console.log("maxPrice:" + this.maxPrice);
      console.log("filter:" + this.filter);
      console.log("textoBusqueda:" + this.textoBusqueda);

      if (this.textoBusqueda == null && this.filter == null) {
        this.productService.listarAllProducts().subscribe({
          next: data => {
            this.products = data.response;
            this.filtro = this.products;
          },
          error: error => {
            console.log(error.error.response);
          }
        });

      }

      if (this.filter != null) {

        if (this.textoBusqueda != null) {
          if (this.filter == "categoria") {

            this.productService.listProductByCategory(this.textoBusqueda).subscribe({
              next: data => {
                console.log(data);
                this.products = data.response;
                this.filtro = this.products;

              },
              error: error => {
                console.log(error.error.response);
              }
            });
          }

          if (this.filter == "titulo") {

            this.productService.listProductByTitle(this.textoBusqueda).subscribe({
              next: data => {
                this.products = data.response;
                this.filtro = this.products;

              },
              error: error => {
                console.log(error.error.response);
              }
            });
          }
        }

        if (this.filter == "precio" && this.minPrice != null && this.maxPrice != null) {

          console.log("es precios");
          this.productService.listProductByPrice(parseInt(this.minPrice), parseInt(this.maxPrice)).subscribe({
            next: data => {
              console.log(data);
              this.products = data.response;
              this.filtro = this.products;
              console.log(this.filtro.length);
            },
            error: error => {
              console.log(error.error.response);
            }
          });
        }
      }
    });


  }
  public iraBusqueda(valor: string) {
    if (valor) {
      this.router.navigate(["busqueda/titulo", valor]);
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

    if(this.roles[0] == "MODERADOR") {

    this.isMod = true;
  }*/

}


