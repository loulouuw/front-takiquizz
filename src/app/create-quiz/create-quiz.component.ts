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
    questions: [],  // Tableau de questions vide au départ
    quizId: 0,
  };

  removeQuestion(index: number): void {
    this.quiz.questions.splice(index, 1);
  }

  constructor(
    private quizService: QuizService,
    private router: Router  // Injecte le router pour la redirection après soumission
  ) {}

  // Ajouter une nouvelle question
  addQuestion(): void {
    // On ajoute une nouvelle question vide
    this.quiz.questions.push({

      statement: '',  // Le texte de la question
      correctAnswer: '',  // La bonne réponse
      questionType: 'multiple_choice',  // Par défaut, type "multiple_choice"
      image: null,  // Pas d'image pour le moment
      timeLimit: 30,  // Temps par défaut
      incorrectAnswers:'',
      quizzId: 0,

    });
    console.log(this.quiz.questions)
  }

  // Soumettre le quiz
  onSubmit(): void {
    // Créer un objet quizData sans les questions pour l'envoi
    const quizData: Partial<Quiz> = {
      title: this.quiz.title,
      description: this.quiz.description,
    };

    // Envoie du quiz sans les questions
    this.quizService.saveQuiz(quizData).subscribe(
      response => {
        console.log('Quiz créé avec succès', response);
        const quizId = response.quizId;  // Récupérer l'ID du quiz créé
        console.log('Quiz ID:', quizId);  // Afficher l'ID dans la console

        // Assigner l'ID du quiz à chaque question
        this.quiz.questions.forEach((question, index) => {
          question.quizzId = quizId;  // Lier chaque question au quiz
          console.log('##################################################');
          console.log('Question à envoyer:', question);
          console.log('id', question.quizzId);

          // Envoyer chaque question à l'API, une par une
          this.quizService.saveQuestions(question).subscribe(
            questionResponse => {
              console.log(`Question ${index + 1} ajoutée avec succès`, questionResponse);
            },
            error => {
              console.error(`Erreur lors de l'ajout de la question ${index + 1}`, error);
            }
          );
        });
      },
      error => {
        console.error('Erreur lors de la création du quiz', error);
      }
    );
  }

}
