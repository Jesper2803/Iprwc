import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{
  // firstName: string;
  // firstName: string;
  // lastName: string;
  // email: string;
  // password: string;
  // confirmPassword: string;
  //
  userCreated: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const information = form.value;
    // const sortedInformation = [information.firstName, information.lastName, information.email, information.password, information.confirmPassword];
    this.authService.makeNewUser(form.value);
    this.userCreated = true;
  }
}


