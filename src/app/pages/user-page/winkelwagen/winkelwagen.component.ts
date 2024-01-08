import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../../../shared/models/product.model";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {CartService} from "../../../services/cart.service";
import {OrderService} from "../../../services/order.service";
import {Order} from "../../../shared/models/order.model";
import {OrderRequest} from "../../../shared/models/orderRequest.model";
import {CartItem} from "../../../shared/models/cartItem.model";

@Component({
  selector: 'app-winkelwagen',
  templateUrl: './winkelwagen.component.html',
  styleUrls: ['./winkelwagen.component.scss']
})
export class WinkelwagenComponent implements OnInit, OnDestroy {

  cartItems: CartItem[] = [];
  totalPrice: number;
  amount: number;
  cartEmpty: boolean;
  userId: string;
  orderPlaced: boolean;


  constructor(private router: Router, private productService: ProductService, private cartService: CartService, private orderService: OrderService) {
  }

  ngOnInit() {
    this.totalPrice = 0;
    this.cartService.getProducts().subscribe(res => {
      this.cartItems = res;
      this.amount = this.cartItems.reduce((total, item) => total + item.quantity, 0);

      this.calculateTotalPrice()

      if (this.cartItems.length == 0) {
        this.cartEmpty = true;
      }
    })
  }

  ngOnDestroy() {
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    this.cartItems.map((item: CartItem) => {
      this.totalPrice += item.price * item.quantity;
    })
    return this.totalPrice
  }

  emptyCart() {
    this.cartService.removeAllCart()
    this.totalPrice = 0;
  }

  deleteItemFromCart(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem)
    this.amount = this.cartItems.length
    this.calculateTotalPrice()
  }

  placeOrder() {
    this.userId = <string>localStorage.getItem('userId')
    const order: OrderRequest = {
      userId: this.userId,
      totalPrice: this.totalPrice,
      orderItems: this.cartItems.map(cartItems => {
        return {
          productId: cartItems.productId,
          productName: cartItems.productName,
          quantity: cartItems.quantity
        };
      })
    }
    this.orderService.placeOrder(order).subscribe(
      (response)=> {
        this.emptyCart()
        this.orderPlaced = true;
      },
      (error)=>{
      }
    )
  }
}
