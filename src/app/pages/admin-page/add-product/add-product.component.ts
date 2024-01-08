import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../shared/models/category.model";
import {OrderRequest} from "../../../shared/models/orderRequest.model";
import {ProductRequest} from "../../../shared/models/productRequest.model";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  categories: Category[] = [];
  productAdded: boolean;
  errorMessages: string[];

  constructor(private catService: CategoryService, private productService: ProductService) {
    this.catService.getAllCategories().subscribe(
      data => {
        this.categories = data;
      }
    );
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const newProduct: ProductRequest = {
      productName: form.value.productName,
      category: form.value.category,
      amount: form.value.amount,
      price: form.value.price,
      imagePath: form.value.imagePath
    }
    this.productService.makeNewProduct(newProduct).subscribe(
      (response)=> {
        this.errorMessages = []
        this.productAdded = true;
      },
      (error)=>{
        this.errorMessages=error.error;
      }
    )
  }

}
