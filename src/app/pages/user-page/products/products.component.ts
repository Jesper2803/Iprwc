import {Component, OnInit} from '@angular/core';
import {Product} from "../../../shared/models/product.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {Category} from "../../../shared/models/category.model";
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit{
  categories: Category[] = [];


  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService, private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getCategories();

  }

  public getCategories() {
    this.categoryService.getAllCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      }
    );
  }


}
