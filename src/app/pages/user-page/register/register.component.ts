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

  userCreated: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.authService.makeNewUser(form.value);
    this.userCreated = true;
  }
}


