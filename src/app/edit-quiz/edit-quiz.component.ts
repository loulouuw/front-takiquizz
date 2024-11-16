import { Component, OnInit } from '@angular/core';
import { QuizService } from 'services/quiz.service';
import { Quiz } from 'models/quiz.model';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {
  quizzes: Quiz[] = [];
  selectedQuiz: Quiz | null = null;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  // Charger la liste des quiz
  loadQuizzes(): void {
    this.quizService.getQuizzes().subscribe(
      (data: Quiz[]) => {
        this.quizzes = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des quiz:', error);
      }
    );
  }

  // Sélectionner un quiz pour l'éditer
// Sélectionner un quiz pour l'éditer
  onQuizSelect(event: any): void {
    const selectedQuizId = Number(event.target.value); // Conversion en nombre
    this.selectedQuiz = this.quizzes.find(quiz => quiz.id === selectedQuizId) || null;
  }


  // Ajouter une nouvelle question vide
  addQuestion(): void {
    if (this.selectedQuiz) {
      this.selectedQuiz.questions.push({
        statement: '',
        correctAnswer: '',
        incorrectAnswers: '',
        questionType: 'multiple_choice',  // Valeur par défaut
        timeLimit: 30,  // Valeur par défaut
        image: null,  // Ajouter l'image comme null ou chaîne vide
        quizzId: 0
      });
    }
  }

  // Enregistrer les modifications du quiz
  saveQuiz(): void {
    if (this.selectedQuiz) {
      this.quizService.saveQuiz(this.selectedQuiz).subscribe(
        (updatedQuiz) => {
          console.log('Quiz modifié:', updatedQuiz);
          this.selectedQuiz = updatedQuiz;  // Mettre à jour le quiz sélectionné
        },
        (error) => {
          console.error('Erreur lors de l\'enregistrement du quiz:', error);
        }
      );
    }
  }

  // Supprimer le quiz
  onDelete(): void {
    if (this.selectedQuiz && this.selectedQuiz.id) {
      this.quizService.deleteQuiz(this.selectedQuiz.id).subscribe(
        () => {
          console.log('Quiz supprimé');
          this.selectedQuiz = null;  // Réinitialiser la sélection
          this.loadQuizzes();  // Recharger la liste des quiz
        },
        (error) => {
          console.error('Erreur lors de la suppression du quiz:', error);
        }
      );
    }
  }
}
