import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {AuthService} from "../../../services/auth.service";
import {UserRequest} from "../../../shared/models/userRequest.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{

  userCreated: boolean;
  error: string;
  errorMessages: string[];
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const newUser: UserRequest = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      password: form.value.password,
      email: form.value.email,
    }
    this.authService.makeNewUser(newUser).subscribe(
      (response)=> {
        this.errorMessages = []
        this.userCreated = true;
      },
      (error)=>{
        this.errorMessages=error.error;
      }
    );
  }
}


