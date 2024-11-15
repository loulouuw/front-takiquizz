// src/app/create-quiz/create-quiz.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Pour la redirection après la création du quiz
import { QuizService } from 'services/quiz.service';  // Ton service qui gère les requêtes API
import { Quiz } from 'models/quiz.model';
import { Question } from 'models/question.model';  // Assure-toi d'importer le modèle Question

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent {
  quiz: Quiz = {
    id: 0,  // Le quiz n'a pas encore d'id avant la création
    title: '',
    description: '',
    timeLimitPerQuestion: 30,
    questions: []  // Tableau de questions vide au départ
  };

  constructor(
    private quizService: QuizService,
    private router: Router  // Injecte le router pour la redirection après soumission
  ) {}

  // Ajouter une nouvelle question
  addQuestion(): void {
    // On ajoute une nouvelle question vide
    this.quiz.questions.push({
      id: 0,  // L'ID sera généré automatiquement après la soumission
      statement: '',  // Le texte de la question
      correctAnswer: '',  // La bonne réponse
      incorrectAnswers: '',  // Les mauvaises réponses séparées par des virgules
      questionType: 'multiple_choice',  // Par défaut, type "multiple_choice"
      image: null,  // Pas d'image pour le moment
      timeLimit: 30,  // Temps par défaut
      quiz_id: 0,

    });
  }

  // Soumettre le quiz
  onSubmit(): void {
    if (this.quiz.questions.length >= 2) {
      this.quizService.saveQuiz(this.quiz).subscribe(
        response => {
          console.log('Quiz créé avec succès', response);
          // Rediriger vers une autre page après la création
          this.router.navigate(['/quiz-list']);  // Remplace '/quiz-list' par l'URL appropriée pour ta liste de quiz
        },
        error => {
          console.error('Erreur lors de la création du quiz', error);
        }
      );
    } else {
      alert('Le quiz doit avoir au moins 2 questions.');
    }
  }
}
