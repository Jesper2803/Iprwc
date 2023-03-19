import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {CategoryService} from "../../../services/category.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {

  loggedIn: boolean;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(){
    if (this.authService.getToken()!==null){
      this.loggedIn = true;
    }
  }




  logout() {
    this.authService.logout();
  }

}
