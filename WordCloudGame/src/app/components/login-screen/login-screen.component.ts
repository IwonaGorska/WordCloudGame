import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  nickName: string = '';
  nickPlaceholder: string = 'Enter your nickname here...';

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  onSubmit(loginForm) {
    console.log(loginForm.value);
    //put the nickName to the  session storage
    sessionStorage.setItem('nickNameWordCloudGame', this.nickName);
    console.log(sessionStorage.getItem('nickNameWordCloudGame'));
    this.route.navigate(['game']); // NAVIGATION HERE INSTEAD OF ROUTERLINK IN HTML IN BUTTON BECAUSE 
    //NO ACTION WOULD BE PERFORMED FROM THIS FUNCTION BEFORE RELOADING IF WE KEEP REDIRECTION IN THE TEMPLATE
    //sessionStorage.removeItem('property');
  }

}
