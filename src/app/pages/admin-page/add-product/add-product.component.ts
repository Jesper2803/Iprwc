import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../shared/models/category.model";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  categories: Category[] = [];
  productAdded: boolean;

  constructor(private catService: CategoryService, private productService: ProductService) {
    this.catService.getAllCategories().subscribe(
      data => {
        console.log(data);
        this.categories = data;
      }
    );
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const information = form.value;
    const sortedInformation = [information.productName, information.amount, information.category, information.price, information.imagePath];
    this.productService.makeNewProduct(form.value);
    this.productAdded = true;
  }

}
