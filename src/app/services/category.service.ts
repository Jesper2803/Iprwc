import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from "./environments";


import {Category} from "../shared/models/category.model";
import {AuthService} from "./auth.service";

@Injectable({providedIn: 'root'})
export class CategoryService {

  private apiLocation = environment.baseUrl + '/api/v1/categories';

  categoriesChanged = new EventEmitter<Category[]>();

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getAllCategories() {
    return this.http.get<Category[]>(this.apiLocation);
  }

  makeNewCategory(postData: { categoryName: String;}) {
    const apiPoint = this.apiLocation + "/admin/new";
    return this.http
      .post(apiPoint, postData, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer '+ this.authService.getToken())
      })
  }

  deleteCategory(categoryId: string){
    return this.http.delete(this.apiLocation + '/admin/' + categoryId,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer '+ this.authService.getToken())
      }
    );
  }

  updateCategory(categoryId: string, postData: { categoryName: string;}) {
    const apiPoint = this.apiLocation + '/admin/' + categoryId;
    return this.http.put(apiPoint, postData,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer '+ this.authService.getToken())
      }
    );
  }
}
