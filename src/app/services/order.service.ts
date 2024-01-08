import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from "./environments";


import {AuthService} from "./auth.service";
import {Order} from "../shared/models/order.model";
import {OrderRequest} from "../shared/models/orderRequest.model";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class OrderService {

  private apiLocation = environment.baseUrl + '/api/v1/orders';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getAllOrders() {
    return this.http.get<Order[]>(this.apiLocation + '/admin',
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer '+ this.authService.getToken())
      });
  }

  getUserOrders(userId: string){
    return this.http.get<Order[]>(this.apiLocation + '/user/' + userId,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer '+ this.authService.getToken())
      });
  }

  placeOrder(postData: OrderRequest): Observable<void> {
    const apiPoint = this.apiLocation + '/place-order';
    return this.http
      .post<void>(apiPoint, postData, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer '+ this.authService.getToken())
      })
  }
}
