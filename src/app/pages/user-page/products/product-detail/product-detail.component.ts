import {Component} from '@angular/core';
import {Product} from "../../../../shared/models/product.model";
import {ProductService} from "../../../../services/product.service";
import {ActivatedRoute, Params} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {CartService} from "../../../../services/cart.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  product: Product;
  id: number;
  loggedIn: boolean;
  productAdded: boolean;

  constructor(private productService: ProductService, private route: ActivatedRoute, private authService: AuthService, private cartService: CartService) {
  }

  ngOnInit(){

    this.productService.getSelectedProduct().subscribe(
      (product: Product) => {
        this.product = product;
        this.productAdded = false;

      })
    if (this.authService.getToken()!==null){
      this.loggedIn = true;
    }
  }

  onAddToShoppingCart() {
    this.cartService.addProductToShoppingCart(this.product)
    this.productAdded = true;
  }
}
