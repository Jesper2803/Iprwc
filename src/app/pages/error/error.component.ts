import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  counter: number = 6;

  constructor(private router: Router) {
  }

  ngOnInit() {
    let countDown = setInterval(() => {
      this.counter = this.counter - 1;
      console.log(this.counter)
      if(this.counter === 0){
        clearInterval(countDown)
        this.router.navigate(['/'])
      }
    }, 1000)
  }
}
