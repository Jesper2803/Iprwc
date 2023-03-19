import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {User} from '../shared/models/user.model';
import {AuthService} from "./auth.service";

@Injectable({providedIn: 'root'})
export class UserService {

  private apiLocation = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient, private authService: AuthService){
  }

  getAllUsers() {
    return this.http.get<User[]>(this.apiLocation,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer '+ this.authService.getToken())
      });
  }

  getUser(userId: string) {
    return this.http.get<User>(this.apiLocation + '/' +  userId,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer '+ this.authService.getToken())
      });
  }

  deleteUser(userId: string){
    console.log(this.authService.getToken())
    console.log(userId)
    return this.http.delete(this.apiLocation + '/' + userId,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer '+ this.authService.getToken())
      }
    )
  }

  updateUser(userId: string, postData: { firstName: String; lastName: String; password: String; email: String }) {
    const apiPoint = this.apiLocation + '/' + userId;
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
