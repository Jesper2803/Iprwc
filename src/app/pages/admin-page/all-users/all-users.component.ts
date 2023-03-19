import { Component } from '@angular/core';
import {User} from "../../../shared/models/user.model";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent {

  users: User[] = [];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }


  public getUsers() {
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );
  }
}
