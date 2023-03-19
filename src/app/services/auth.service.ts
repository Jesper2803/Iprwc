import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {User} from '../shared/models/user.model';
import {Router} from "@angular/router";
import {UserService} from "./user.service";

interface AuthRequest {
  token: string,
  issuer: string,
  expires: string
  userId: string
  role: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  private apiLocation = 'http://localhost:8080/api/v1/auth';
  public static readonly apiTokenKey = 'token';
  loggedIn: boolean;


  constructor(private http: HttpClient, private router: Router) {
  }

  getToken():string{
    return <string>window.localStorage.getItem(AuthService.apiTokenKey)
  }


  makeNewUser(postData: { firstName: String; lastName: String; password: String; email: String }) {
    console.log(postData);
    const apiPoint = this.apiLocation + "/register";
    console.log(apiPoint);
    return this.http
      .post(apiPoint, postData, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
      }).subscribe(responseData => {console.log(responseData);});
  }

  login(postData: {email: String; password: String}){
    const apiPoint = this.apiLocation + "/authenticate";
    return this.http.post<AuthRequest>(
      apiPoint, postData
    ).subscribe({
      next: ({ token, userId, role}) => {
        if (token !== '') {
          console.log(userId)
          localStorage.setItem(AuthService.apiTokenKey, token);
          localStorage.setItem('userId', userId);
          localStorage.setItem('role', role);
          console.log(role)
          this.router.navigate(['']);
          console.log(token)
          this.loggedIn = true;
        }
      }
    })
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('role')
  }

  getLoggedInStatus() {
    return this.loggedIn;
  }
}
