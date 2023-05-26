import { Component } from '@angular/core';
import { CategoryService } from "../../service/category.service";
import { CategoryDTO } from "../../model/category-dto";
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { ProductGetDTO } from 'src/app/model/product-get-dto';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categories!: any[];
  products!: ProductGetDTO[];
  

  constructor(private categoryService: CategoryService, private router: Router, private productService: ProductService) {

    this.categoryService.getCategories().subscribe({
      next: data => {
        this.categories = data.response;
      },
      error: error => {
        console.log(error.error);
      }
    });

   
  }

  public selectCategory(category: number) {
    this.router.navigate(["busqueda/categoria", category]);
  }
}
