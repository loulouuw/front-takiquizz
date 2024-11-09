import { Component, OnInit } from '@angular/core';
import { QuizService } from 'services/quiz.service';
import { Quiz } from 'models/quiz.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quizzes: Quiz[] = [];
  selectedQuiz: Quiz | null = null;  // Pour stocker le quiz sélectionné

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getQuizzes().subscribe(
      (data: Quiz[]) => {
        this.quizzes = data;
        console.log('Quizzes:', this.quizzes);
      },
      (error) => {
        console.error('Erreur lors de la récupération des quiz:', error);
      }
    );
  }

  selectQuiz(quiz: Quiz): void {
    this.selectedQuiz = quiz;
    console.log('Quiz sélectionné:', this.selectedQuiz);
  }
}
