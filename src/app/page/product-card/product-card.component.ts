import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { CategoryDTO } from 'src/app/model/category-dto';
import { ProductGetDTO } from 'src/app/model/product-get-dto';
import { CategoryService } from 'src/app/service/category.service';
import { SessionService } from 'src/app/service/session.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!:ProductGetDTO;
 
  categoryName!:string;
  
  constructor(private categoryService: CategoryService,private router: Router) {
       
    
  }

  
  ngOnInit(): void {

    this.categoryService.getCategory(this.product.idCategory).subscribe({
      next: data => {
        this.categoryName = data.response.name;
      },
      error: error => {
        console.log(error.error.response);
      }
    });
  }

  public detailProduct(idProduct:number){
    this.router.navigate(["producto/", idProduct]);
  }
  
}
