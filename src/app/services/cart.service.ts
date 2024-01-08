import {Product} from "../shared/models/product.model";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {CartItem} from "../shared/models/cartItem.model";

@Injectable({providedIn: 'root'})
export class CartService {

  public cartItems: CartItem[] = [];
  public cartItemList = new BehaviorSubject<CartItem[]>([]);

  constructor(){
  }

  getProducts() {
    return this.cartItemList.asObservable();
  }

  addProductToShoppingCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.productId === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    }else{
      const newItem: CartItem = {
        productId: product.id,
        productName: product.productName,
        price: product.price,
        imagePath: product.imagePath,
        quantity: 1
      }
      this.cartItems.push(newItem)

    }

    this.cartItemList.next(this.cartItems)
  }

  removeCartItem(product: CartItem) {
    this.cartItems.map((cartItem: CartItem, index: number) => {
      if (product.productId === cartItem.productId) {
        this.cartItems.splice(index, 1);
      }
    })
  }

  removeAllCart(){
    this.cartItems = [];
    this.cartItemList.next(this.cartItems);
  }
}
