import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-screen',
  templateUrl: './result-screen.component.html',
  styleUrls: ['./result-screen.component.css']
})
export class ResultScreenComponent implements OnInit {

  nickName: string;
  score: string;

  constructor() { }

  ngOnInit(): void {
    this.fetchDataFromSession();
  }

  fetchDataFromSession(){
    this.nickName = sessionStorage.getItem('nickNameWordCloudGame');
    this.score = sessionStorage.getItem('scoreWordCloudGame');
  }

}
