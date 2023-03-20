import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Product} from '../shared/models/product.model';
import {BehaviorSubject, Subject} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({providedIn: 'root'})
export class ProductService {

  private apiLocation = 'http://localhost:8080/api/v1/products';

  productsChanged = new Subject<Product[]>();
  public products: any = [new Product('2', 'Aap', 'test', 3, 5, 'https://cdn.webshopapp.com/shops/50597/files/202371404/b-c-basic-heren-t-shirt.jpg')];
  public productList = new BehaviorSubject<any>([]);

  productSelected = new Subject<Product>();

  constructor(private http: HttpClient, private authService: AuthService){
  }

  getProductsWithType(url: string) {

    return this.http.get<Product[]>(this.apiLocation + url);
  }

  getAllProducts() {
    return this.http.get<Product[]>(this.apiLocation);
  }

  getProductById(productId: string) {
    return this.http.get<Product>(this.apiLocation +  '/' + productId);
  }

  getProductByCategory(category: string) {
    return this.http.get<Product[]>(this.apiLocation +  '/category/' +  category);
  }

  makeNewProduct(postData: { productName: String; amount: number; category: String; price: number; imagePath: string }) {
    console.log(postData);
    const apiPoint = this.apiLocation + '/admin/new';
    console.log(apiPoint);
    return this.http
      .post(apiPoint, postData, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer '+ this.authService.getToken())
      }).subscribe(responseData => {console.log(responseData);});
  }

  deleteProduct(productId: string){
    return this.http.delete(this.apiLocation + '/admin/' + productId,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer '+ this.authService.getToken())
      }
    )
  }

  updateProduct(productId: string, postData: { productName: String; amount: number; category: String; price: number; imagePath: string }) {
    const apiPoint = this.apiLocation + '/admin/' + productId;
    console.log(apiPoint)
    console.log(postData)
    return this.http.put(apiPoint, postData,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer '+ this.authService.getToken())
      }
    );
  }

  getProduct(id: number){
    return this.products.slice()[id];
  }




}
