import { Component } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../shared/models/user.model";
import {NgForm} from "@angular/forms";

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

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.userId = params['id']
        console.log(this.userId);

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
    console.log(form.value)
    const information = form.value;
    const firstName = information.firstName;
    const lastName = information.lastName;
    const email = information.email;
    const password = information.password;
    this.userService.updateUser(this.userId, {firstName, lastName, password, email}).subscribe(
      (res) => {
        console.log(res);
      }
    );
    this.userEdited = true;
  }

  onDeletionUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(
      () =>{
        this.router.navigate(['admin-all-users']);
      }
    );
  }
}
