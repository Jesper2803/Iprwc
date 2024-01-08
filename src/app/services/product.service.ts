import {Injectable, EventEmitter, createEnvironmentInjector} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Product} from '../shared/models/product.model';
import {BehaviorSubject, map, Observable, Subject, tap} from "rxjs";
import {AuthService} from "./auth.service";
import {environment} from "./environments";
import {ProductRequest} from "../shared/models/productRequest.model";
import {CartItem} from "../shared/models/cartItem.model";


@Injectable({providedIn: 'root'})
export class ProductService {

  private apiLocation = environment.baseUrl + '/api/v1/products';
  public selectedProduct = new Subject<Product>();

  constructor(private http: HttpClient, private authService: AuthService){
  }

  setSelectedProduct(product: Product): void {
    this.selectedProduct.next(product);
  }

  getSelectedProduct() {
    return this.selectedProduct.asObservable();
  }


  getProductsWithType(url: string) {
    return this.http.get<Product[]>(this.apiLocation + url);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiLocation);
  }

  getProductById(productId: string) {
    return this.http.get<Product>(this.apiLocation +  '/' + productId);
  }

  getProductByCategory(category: string) {
    return this.http.get<Product[]>(this.apiLocation +  '/category/' +  category);
  }

  makeNewProduct(postData: ProductRequest ): Observable<void> {
    const apiPoint = this.apiLocation + '/admin/new';
    return this.http
      .post<void>(apiPoint, postData, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer '+ this.authService.getToken())
      })
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

  updateProduct(productId: string, postData: ProductRequest): Observable<void> {
    const apiPoint = this.apiLocation + '/admin/' + productId;
    return this.http.put<void>(apiPoint, postData,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer '+ this.authService.getToken())
      }
    );
  }
}
