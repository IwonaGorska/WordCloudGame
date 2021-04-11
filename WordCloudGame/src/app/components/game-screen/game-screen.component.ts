import { Component, OnInit } from '@angular/core';

interface Word {
  isMarked: boolean;
  isCorrect: boolean;
  word: string;
  number: number;
  rowNumber: number;
  columnNumber: number;
}

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.css']
})
export class GameScreenComponent implements OnInit {

  words:string[] = ["Alice", "Bob", "Eve", 'Rob', 'Iwona', 'Mark', 'Martin', 'Dave'];
  question:string = 'Select animals';
  boardWidth: number;
  boardHeight: number;
  chosenCells:number[] = [];
  board: Word[][] = [];
  checkingAnswers: boolean = false;
  score: number;

  constructor() { }

  ngOnInit(): void {
    this.countBoardDimensions();
    this.preparePlainBoard();
    this.drawCells();
    this.buildWordObjects();
  }

  countBoardDimensions(): void{
    //proportion of the board in pdf is 7:12
    //we're looking for y in: 7y * 12y = x, where x is number of the words

    // let y = 1;
    // while(84*Math.pow(y, 2) < this.words.length){
    //   y++;
    // }
    // this.boardWidth = 12 * y;
    // this.boardHeight = 7 * y;

    //But let's keep it as a square for better look on mobile devices
    let a = 1;
    while(Math.pow(a, 2) < this.words.length){
      a++;
    }
    this.boardWidth = a;
    this.boardHeight = a;
  }

  preparePlainBoard(){
    let plainWord: Word = {
      isMarked: false,
      isCorrect: false,
      word: '',
      number: -1,
      rowNumber: -1,
      columnNumber: -1
    }

    for(let i = 0; i < this.boardHeight; i++){
      // let rowBoard = [];
      this.board[i] = [];
      for(let j = 0; j < this.boardWidth; j++){
        // rowBoard.push({});
        this.board[i][j] = plainWord;
      }
      // this.board.push(rowBoard);
    }
  }

  drawCells(): void{
    let allCells: number[] = [];
    let cellsNumber = this.boardWidth * this.boardHeight;
    for(let i = 0; i < cellsNumber; i++){
      allCells.push(i);
    }
    allCells = allCells.sort(() => Math.random() - 0.5);
    for(let i = 0; i < this.words.length; i++){
      this.chosenCells.push(allCells[i]);
    }
  }

  buildWordObjects(): void{
    for(let i = 0; i < this.chosenCells.length; i++){
      let wordObject: Word = {
        isMarked: false,
        isCorrect: true,
        word: this.words[i],
        number: this.chosenCells[i],
        rowNumber: Math.floor(this.chosenCells[i]/this.boardWidth),
        columnNumber: this.chosenCells[i] - (Math.floor(this.chosenCells[i]/this.boardWidth) * this.boardWidth)
      }
      
      this.board[wordObject.rowNumber][wordObject.columnNumber] = wordObject;
    }
    // for(let i = 0; i < this.chosenCells.length; i++){
    //   let wordObject: any = {};
    //   // let wordObject: {isMarked: boolean; isCorrect: boolean; word: string; rowNumber: number; columnNumber: number};
    //   wordObject.isAlive = true;
    //   wordObject.isMarked = false;
    //   wordObject.isCorrect = false;
    //   wordObject.word = this.words[i];
    //   wordObject.number = this.chosenCells[i];
    //   wordObject.rowNumber = Math.floor(this.chosenCells[i]/this.boardWidth);
    //   wordObject.columnNumber = this.chosenCells[i] - (Math.floor(this.chosenCells[i]/this.boardWidth) * this.boardWidth);
    //   this.board[wordObject.rowNumber][wordObject.columnNumber] = wordObject;
    // }
  }

  markWord(row: number, column: number){
    this.board[row][column].isMarked = !this.board[row][column].isMarked;
  }

  getColor(isMarked: boolean, isCorrect: boolean){
    let color = '#808080';
    if(!this.checkingAnswers){
      if(isMarked)
        color = '#000000';
    } else{
        if(isCorrect){
          color = '#00FF00';
        } else{
          color = '#FF0000';
        }
    }


    return color;
  }

  checkAnswers(){
    this.checkingAnswers = true;
  }

  finishGame(){
    let markedCorrectAnswers: number = 0;
    let markedWrongAnswers: number = 0;
    let unmarkedCorrectAnswers: number = 0;

    for(let i = 0; i < this.boardHeight; i++){
      for(let j = 0; j < this.boardWidth; j++){
        if(this.board[i][j].word){
          if(this.board[i][j].isMarked && this.board[i][j].isCorrect){
            markedCorrectAnswers++;
          } else if(this.board[i][j].isMarked && !this.board[i][j].isCorrect){
            markedWrongAnswers++;
          } else if(!this.board[i][j].isMarked && this.board[i][j].isCorrect){
            unmarkedCorrectAnswers++;
          }
        }
      }
    }

    this.score = markedCorrectAnswers * 2 - (markedWrongAnswers + unmarkedCorrectAnswers);
    // console.log(this.score);
    sessionStorage.setItem('scoreWordCloudGame', this.score + '');
  }
}
