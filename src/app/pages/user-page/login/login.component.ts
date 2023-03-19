import { Component } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userType: string;
  userId: string | null;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId')
    return this.userService.getUser(<string>this.userId).subscribe(
      (res) => {
        if (res.role === 'ROLE_ADMIN'){
          this.router.navigate(['admin'])
        }
        if (res.role === 'ROLE_USER'){
          this.router.navigate(['user'])
        }
      }
    )
  }

  onSubmit(form: NgForm) {
    const information = form.value;
    // const sortedInformation = [information.firstName, information.lastName, information.email, information.password, information.confirmPassword];
    this.authService.login(form.value);
  }

}
