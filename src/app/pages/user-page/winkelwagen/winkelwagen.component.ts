import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../../../shared/models/product.model";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-winkelwagen',
  templateUrl: './winkelwagen.component.html',
  styleUrls: ['./winkelwagen.component.scss']
})
export class WinkelwagenComponent implements OnInit, OnDestroy{

  public products: any = []
  public grandTotal!: number;
  totalPrice: number;
  amount: number;
  cartEmpty: boolean;

  constructor(private router: Router, private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.totalPrice = 0;
    this.cartService.getProducts().subscribe(res=>{
      this.products=res;
      this.grandTotal = this.cartService.calculateTotalPrice();
      this.amount = this.products.length
      this.calculateTotalPrice()

      if (this.products.length == 0){
        this.cartEmpty = true;
      }
      }
    )
  }

  ngOnDestroy() {
  }

  calculateTotalPrice(){
    this.totalPrice = 0;
    this.products.map((a: any) => {
      this.totalPrice += a.price;
    })
    return this.totalPrice
  }

  emptyCart() {
    this.cartService.removeAllCart()
    this.totalPrice = 0;
  }

  deleteItemFromCart(product: any) {
    this.cartService.removeCartItem(product)
    this.amount = this.products.length
    this.calculateTotalPrice()
  }
}
