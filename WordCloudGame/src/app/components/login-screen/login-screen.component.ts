import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  nickName: string = '';
  nickPlaceholder: string = 'Enter your nickname here...';

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(loginForm) {
    console.log(loginForm.value);
    //put the nickName to the  session storage
    sessionStorage.setItem('nickNameWordCloudGame', this.nickName);
    console.log(sessionStorage.getItem('nickNameWordCloudGame'));
    //sessionStorage.removeItem('property');
  }

}
