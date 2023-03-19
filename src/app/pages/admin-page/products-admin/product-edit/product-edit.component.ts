import { Component } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../shared/models/user.model";
import {NgForm} from "@angular/forms";
import {ProductService} from "../../../../services/product.service";
import {Product} from "../../../../shared/models/product.model";
import {Category} from "../../../../shared/models/category.model";
import {CategoryService} from "../../../../services/category.service";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {

  productId: string;
  productName: string;
  category: string;
  amount: number;
  price: number;
  imagePath: string;
  productEdited: boolean;
  categories: Category[] = [];


  constructor(private catService: CategoryService, private route: ActivatedRoute, private router: Router, private productService: ProductService) {
    this.catService.getAllCategories().subscribe(
      data => {
        console.log(data);
        this.categories = data;
      }
    );
  }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.productId = params['id']
        console.log(this.productId);

      }
    );

    this.productService.getProductById(this.productId).subscribe(
      (res: Product) => {
        this.productName = Object.values(res)[1];
        this.category = Object.values(res)[2];
        this.amount = Object.values(res)[3];
        this.price = Object.values(res)[4];
        this.imagePath = Object.values(res)[5];
      }
    )
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
    this.productService.updateProduct(this.productId, form.value).subscribe(
      (res) => {
        this.productEdited = true;
      }
    );
  }

  onDeletionProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        this.router.navigate(['admin-all-products']);
      }
    );
  }
}
