import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'services/quiz.service';
import { Quiz} from 'models/quiz.model';
import { Question } from "../models/question.model"

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss']
})
export class QuizDetailComponent implements OnInit {
  quiz: Quiz | undefined;
  currentQuestionIndex: number = 0;
  currentQuestion: Question | undefined ;
  answers: string[] = [];
  selectedAnswer: string | null = null;
  score: number = 0;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {}

  ngOnInit(): void {
    const quizId = Number(this.route.snapshot.paramMap.get('id'));
    this.quizService.getQuizById(quizId).subscribe(
      (data: Quiz) => {
        this.quiz = data;
        if (this.quiz.questions.length > 0) {
          this.setCurrentQuestion(0);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération du quiz:', error);
      }
    );
  }

  setCurrentQuestion(index: number): void {
    this.currentQuestionIndex = index;
    this.currentQuestion = this.quiz?.questions[this.currentQuestionIndex];
    if (this.currentQuestion) {
      // Sépare les mauvaises réponses par des virgules pour les afficher
      this.answers = [
        this.currentQuestion.correctAnswer,
        ...this.currentQuestion.incorrectAnswers.split(',').map(ans => ans.trim())
      ];
      // Mélange les réponses pour que l'ordre soit aléatoire
      this.answers = this.shuffle(this.answers);
    }
  }

  shuffle(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }

  submitAnswer(): void {
    if (this.selectedAnswer === this.currentQuestion?.correctAnswer) {
      this.score++;
    }
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < (this.quiz?.questions.length || 0)) {
      this.setCurrentQuestion(this.currentQuestionIndex);
      this.selectedAnswer = null; // Réinitialise la sélection de réponse
    } else {
      this.currentQuestion = undefined; // Indique que le quiz est terminé
    }
  }
}
