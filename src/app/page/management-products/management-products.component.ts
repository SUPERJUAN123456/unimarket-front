import { Component } from '@angular/core';
import {ProductService} from "../../service/product.service";
import {ProductGetDTO} from "../../model/product-get-dto";
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { TokenService } from 'src/app/service/token.service';
import { CategoryDTO } from 'src/app/model/category-dto';
import { SessionService } from 'src/app/service/session.service';
import {PaymentMethodGetDto} from "../../model/payment-method-get-dto";

@Component({
  selector: 'app-management-products',
  templateUrl: './management-products.component.html',
  styleUrls: ['./management-products.component.css']
})
export class ManagementProductsComponent {
  products!: ProductGetDTO[];
  selectedList: ProductGetDTO[];
  selected!: ProductGetDTO;
  textBtnDelete!: string;
  btnText!:string;
  iconText!:string;
  categoryName!:string;
  isLogged = false;
  idPerson!:string;

  constructor(private productService: ProductService,private tokenService: TokenService,private router: Router,private categoryService: CategoryService, private sessionService : SessionService) {

    this.selectedList = [];


  }
  /*ngOnInit(): void {
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
      this.idPerson = this.tokenService.getId();
      this.productService.listProductByPerson(this.idPerson).subscribe({
        next: data => {
          this.products = data.response;
        },
        error: error => {
          console.log(error.error);
        }
      });
    }
  }*/

 ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    if(this.isLogged){
      this.idPerson = this.tokenService.getId()
      console.log(this.idPerson);
      this.productService.listProductByPerson(this.idPerson).subscribe({
        next: data => {
          this.products = data.response;
          console.log(this.products);
        },
        error: error => {
          console.log(error.error.response);
        }
      });
    }
  }

  public getCategory(idCategory:number){
     let category:CategoryDTO;

    this.categoryService.getCategory(idCategory).subscribe({
      next: data => {
        category = data.response;
      },
      error: error => {
        console.log(error.error.response);
      }
    });
  }

  public select(product: ProductGetDTO, state: boolean) {
    if (state) {
      this.selectedList.push(product);
    } else {
      this.selectedList = this.selectedList.filter(i => i != product);
    }
    this.updateMessage();
  }

  private updateMessage() {
    const tam = this.selectedList.length;
    if (tam != 0) {
      if (tam == 1) {
        this.textBtnDelete = "1 elemento";
      } else {
        this.textBtnDelete = tam + " elementos";
      }
    } else {
      this.textBtnDelete = "";
    }
  }

  public deleteProduct() {
    this.selectedList.forEach(e => {
      this.products = this.products.filter(i => i != e);
    });
    this.selectedList = [];
    this.updateMessage();
  }

  public updateProduct(id:number) {
    this.router.navigate(["/editar_producto",id]);
  }
  public sendInfo() {
    if(this.btnText == "Actualizar"){
      const indice = this.products.findIndex( e => this.selected.id == e.id );
      this.products[indice] = this.selected;
    }else{
      this.products.push(this.selected);
    }
    document.getElementById("cerrar-m")?.click();
  }


}

