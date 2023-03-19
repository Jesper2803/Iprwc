import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  userId: string;
  firstName: string;
  lastName: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(){
    this.userId = <string>localStorage.getItem('userId')
    this.userService.getUser(this.userId).subscribe(
      (res)=>{
        this.firstName = res.firstName;
        this.lastName = res.lastName;
      }
    )
  }

}
