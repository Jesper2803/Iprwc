import {Product} from "../shared/models/product.model";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({providedIn: 'root'})
export class CartService {

  productsChanged = new Subject<Product[]>();
  public products: any = [];
  public productList = new BehaviorSubject<any>([]);

  productSelected = new Subject<Product>();

  constructor(private http: HttpClient, private authService: AuthService){
  }

  getProducts() {
    return this.productList.asObservable();
    // return this.products.slice();
  }

  setProduct(product: any) {
    this.products.push(...product)
    // console.log(this.products)
    // this.products.push(product);
    // console.log(this.products)
    this.productList.next(product)
  }

  addProductToShoppingCart(product: any) {
    this.products.push(product)
    this.productList.next(this.products)
    this.calculateTotalPrice()
    console.log(this.products)
  }

  calculateTotalPrice() : number {
    let grandTotal = 0;
    this.products.map((a: any) => {
      grandTotal += a.total;
    })
    return grandTotal
    // this.products.forEach(element =>
    //   this.totalPrice += element.price)
    // console.log(this.totalPrice)
  }

  deleteProductFromShoppingCart(product: Product) {
    // this.products.pop(product)
  }

  removeCartItem(product: any) {
    this.products.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.products.splice(index, 1);
      }
    })
  }

  removeAllCart(){
    this.products = [];
    this.productList.next(this.products);
  }
}
