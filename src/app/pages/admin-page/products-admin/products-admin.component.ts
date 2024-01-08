import { Component } from '@angular/core';
import {Product} from "../../../shared/models/product.model";
import {User} from "../../../shared/models/user.model";
import {Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent {
  products: Product[] = [];

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  public getProducts() {
    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
  }

  onNewProduct() {
    this.router.navigate(['add-product'])
  }

}
