import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from "./environments";
import {Router} from "@angular/router";
import {CartService} from "./cart.service";
import {catchError, EMPTY, Observable, of, tap, throwError} from "rxjs";
import {User} from "../shared/models/user.model";
import {UserRequest} from "../shared/models/userRequest.model";

interface AuthRequest {
  token: string,
  issuer: string,
  expires: string
  userId: string
  role: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  private apiLocation = environment.baseUrl + '/api/v1/auth';
  public static readonly apiTokenKey = 'token';
  loggedIn: boolean;


  constructor(private http: HttpClient, private router: Router, private cartService: CartService) {
  }

  getToken():string{
    return <string>window.localStorage.getItem(AuthService.apiTokenKey)
  }


  makeNewUser(postData: UserRequest): Observable<User> {
    const apiPoint = this.apiLocation + "/register";
    return this.http
      .post<User>(apiPoint, postData, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
      })
  }

  login(postData: { email: string; password: string }): Observable<AuthRequest> {
    const apiPoint = this.apiLocation + "/authenticate";
    return this.http.post<AuthRequest>(apiPoint, postData).pipe(
      tap(({ token, userId, role }) => {
        if (token !== '') {
          localStorage.setItem(AuthService.apiTokenKey, token);
          localStorage.setItem('userId', userId);
          localStorage.setItem('role', role);
          this.router.navigate(['']);
          this.loggedIn = true;
        }
      })
    );
  }


  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('role')
    this.cartService.removeAllCart()
  }

  getLoggedInStatus() {
    return this.loggedIn;
  }

  verifyRecaptcha(captchaResponse: string): Observable<any> {
    const apiPoint = this.apiLocation + "/verify-recaptcha?response=" + captchaResponse;
    return this.http.post<any>(apiPoint, null, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

}
