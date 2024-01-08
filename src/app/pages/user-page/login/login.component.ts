import {Component, ViewChild} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {ReCaptcha2Component} from "ngx-captcha";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userType: string;
  userId: string | null;
  siteKey: string = "6Lem_T8pAAAAADAYeDOblzboRPQISPUG51VZSo1X";
  captchaResponse: string;
  captchaFailure: boolean;
  logginFailure: boolean;
  @ViewChild('captchaElem') captchaElem: ReCaptcha2Component;


  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId')
    if (this.userId){
      this.userService.getUser(<string>this.userId).subscribe(
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
  }

  onSubmit(form: NgForm) {
    this.authService.verifyRecaptcha(form.value.captchaResponse).subscribe(res=>{
      if(res.success){
        this.authService.login(form.value).subscribe((response)=> {
        }, (error)=>{
          this.logginFailure = true;
          this.captchaElem.resetCaptcha();
        });

      }else {
        this.captchaFailure = true;
      }
    });
  }

}
