import { Component } from '@angular/core';
import {Category} from "../models/category.model";
import {Router} from "@angular/router";
import {CategoryService} from "../../services/category.service";
import {AuthService} from "../../services/auth.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  categories: Category[] = [];
  loggedIn: boolean;
  totalCartItems: number = 0;

  constructor(private router: Router, private categoryService: CategoryService, private authService: AuthService, private cartService: CartService) { }

  ngOnInit() {
    this.getCategories();
    if (this.authService.getToken()!==null){
      this.loggedIn = true;
    }
    this.cartService.getProducts().subscribe(cartItems=> {
      this.totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    })
  }

  public getCategories() {
    this.categoryService.getAllCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['']);
    });
  }
}
