import { Component, OnInit } from '@angular/core';
import { injectMocks } from 'data-mocks';
import { HttpClient} from '@angular/common/http';
import { Scenarios } from 'data-mocks/dist/types';

const scenarios: Scenarios = {
  default: [
    {
      url: /words/,
      method: 'GET',
      response: {
        "0": {
          "question": "select animals",
          "all_words": [
            "hole",
            "sofa",
            "pear",
            "tiger",
            "oatmeal",
            "square",
            "nut",
            "cub",
            "shirt",
            "tub",
            "passenger",
            "cow"
          ],
          "good_words": [
            "tiger",
            "cow"
          ]
        },
        "1": {
          "question": "select colors",
          "all_words": [
            "jeans",
            "existence",
            "ink",
            "red",
            "blue",
            "yellow",
            "laugh",
            "behavior",
            "expansion",
            "white",
            "black",
            "cakes"
          ],
          "good_words": [
            "red",
            "blue",
            "yellow",
            "white",
            "black"
          ]
        },
        "2": {
          "question": "select vehicles",
          "all_words": [
            "belief",
            "wire",
            "car",
            "bus",
            "star",
            "river",
            "hat",
            "skirt",
            "train"
          ],
          "good_words": [
            "car",
            "bus",
            "train"
          ]
        }
      },
      responseCode: 200
    }
  ]
};

injectMocks(scenarios, 'default', {allowXHRPassthrough: true, allowFetchPassthrough: true});

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

  // words:string[] = ["Alice", "Bob", "Eve", 'Rob', 'Iwona', 'Mark', 'Martin', 'Dave'];
  question:string = '';
  boardWidth: number;
  boardHeight: number;
  chosenCells:number[] = [];
  board: Word[][] = [];
  checkingAnswers: boolean = false;
  score: number;
  wordsTest: any;
  allWords: string[] = [];
  goodWords: string[] = [];
  questionNumber: number;

  constructor(private http: HttpClient) { 
  }

  ngOnInit(): void {
    this.questionNumber = Math.floor(Math.random() * 3); // 0, 1 or 2
    this.http.get('https://foo.d/words').subscribe(
      data => {
        console.log('Successfully fetched words data ', data);
        let rawQuestion = data[this.questionNumber].question;
        this.question = rawQuestion.charAt(0).toUpperCase() + rawQuestion.slice(1);
        this.allWords = data[this.questionNumber].all_words;
        this.goodWords = data[this.questionNumber].good_words;

        this.countBoardDimensions();
        this.preparePlainBoard();
        this.drawCells();
        this.buildWordObjects();
      },
      error => {
        console.log('Error in fetching words data :(', error);
      }
    ); 
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
    while(Math.pow(a, 2) < this.allWords.length){ 
      a++;
    }
    a++; // +1 to keep more distance
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
    for(let i = 0; i < this.allWords.length; i++){
      this.chosenCells.push(allCells[i]);
    }
  }

  buildWordObjects(): void{
    for(let i = 0; i < this.chosenCells.length; i++){
      let wordObject: Word = {
        isMarked: false,
        isCorrect: this.goodWords.includes(this.allWords[i]),
        word: this.allWords[i],
        number: this.chosenCells[i],
        rowNumber: Math.floor(this.chosenCells[i]/this.boardWidth),
        columnNumber: this.chosenCells[i] - (Math.floor(this.chosenCells[i]/this.boardWidth) * this.boardWidth)
      }
      
      this.board[wordObject.rowNumber][wordObject.columnNumber] = wordObject;
    }
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
    sessionStorage.setItem('scoreWordCloudGame', this.score + '');
  }
}
