import { Component } from '@angular/core';
import {Category} from "../models/category.model";
import {Router} from "@angular/router";
import {CategoryService} from "../../services/category.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  categories: Category[] = [];
  loggedIn: boolean;

  constructor(private router: Router, private categoryService: CategoryService, private authService: AuthService) { }

  ngOnInit() {
    this.getCategories();
    if (this.authService.getToken()!==null){
      this.loggedIn = true;
    }
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
