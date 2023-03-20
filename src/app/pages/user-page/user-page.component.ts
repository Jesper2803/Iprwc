import { Component } from '@angular/core';
import {Product} from "../../shared/models/product.model";
import {Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {

  userType: string;
  userId: string | null;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }


  ngOnInit() {
    this.userId = localStorage.getItem('userId')
    if (localStorage.getItem('role') === 'ROLE_ADMIN'){
      this.router.navigate(['admin'])
    }
  }

}
