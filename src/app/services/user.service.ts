import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {User} from '../shared/models/user.model';
import {AuthService} from "./auth.service";
import {environment} from "./environments";
import {Observable} from "rxjs";
import {UserRequest} from "../shared/models/userRequest.model";


@Injectable({providedIn: 'root'})
export class UserService {

  private apiLocation = environment.baseUrl + '/api/v1/users';

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
    return this.http.delete(this.apiLocation + '/' + userId,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer '+ this.authService.getToken())
      }
    )
  }

  updateUser(userId: string, postData: UserRequest): Observable<void> {
    const apiPoint = this.apiLocation + '/' + userId;
    return this.http.put<void>(apiPoint, postData,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer '+ this.authService.getToken())
      }
    );
  }
}
