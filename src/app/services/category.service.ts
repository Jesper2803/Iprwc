import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Category} from "../shared/models/category.model";
import {AuthService} from "./auth.service";

@Injectable({providedIn: 'root'})
export class CategoryService {

  private apiLocation = 'http://localhost:8080/api/v1/categories';

  categoriesChanged = new EventEmitter<Category[]>();

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getAllCategories() {
    return this.http.get<Category[]>(this.apiLocation);
  }

  makeNewCategory(postData: { categoryName: String;}) {
    console.log(postData);
    const apiPoint = this.apiLocation + "/admin/new";
    console.log(apiPoint);
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
    console.log(categoryId)
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
}
