import {Component} from '@angular/core';
import {Product} from "../../../../shared/models/product.model";
import {ProductService} from "../../../../services/product.service";
import {ActivatedRoute, Params} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {CartService} from "../../../../services/cart.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  // @ts-ignore
  product: Product;
  id: number;
  loggedIn: boolean;

  constructor(private productService: ProductService, private route: ActivatedRoute, private authService: AuthService, private cartService: CartService) {
  }

  ngOnInit(){
    console.log("test")
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.productService.getProductById(String(this.id)).subscribe(
        (res: Product) => {
          this.product = res;
          console.log(this.product)
        }
      );
    });
    if (this.authService.getToken()!==null){
      this.loggedIn = true;
    }
  }

  onAddToShoppingCart() {
    console.log(this.product)
    this.cartService.addProductToShoppingCart(this.product)
  }
}
