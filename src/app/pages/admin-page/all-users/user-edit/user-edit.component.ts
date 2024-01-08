import { Component } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../shared/models/user.model";
import {NgForm} from "@angular/forms";
import {ProductRequest} from "../../../../shared/models/productRequest.model";
import {UserRequest} from "../../../../shared/models/userRequest.model";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userEdited: boolean;
  errorMessages: string[];

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.userId = params['id']
      }
    );

    this.userService.getUser(this.userId).subscribe(
      (res: User) => {
        this.firstName = Object.values(res)[1];
        this.lastName = Object.values(res)[2];
        this.password = Object.values(res)[3];
        this.email = Object.values(res)[4];
      }
    )
  }

  onSubmit(form: NgForm) {
    const updatedUser: UserRequest = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      password: form.value.password,
      email: form.value.email,
    }
    this.userService.updateUser(this.userId, updatedUser).subscribe(
      (response) => {
        this.errorMessages = []
        this.userEdited = true;
      }, (error) =>{
        this.errorMessages = error.error
      }
    );
  }

  onDeletionUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(
      () =>{
        this.router.navigate(['admin-all-users']);
      }
    );
  }
}
