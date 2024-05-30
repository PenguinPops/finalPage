import { Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
declare function checkQuiz(): any;

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
  encapsulation: ViewEncapsulation.None
})
@Injectable({
  providedIn: 'root'
})
export class QuizComponent implements OnInit {
  constructor() {    }
  ngOnInit(): void {
    checkQuiz();
  }



}
