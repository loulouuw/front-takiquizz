import { Component, OnInit } from '@angular/core';
import { QuizService } from 'services/quiz.service';
import { Quiz } from 'models/quiz.model';
import { Question } from 'models/question.model'; // Importer le modèle Question si ce n'est pas déjà fait

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
        this.quizzes = data.map((quiz) => {
          quiz.questions.forEach((question) => {
            question.quizzId = quiz.id;
          });
          return quiz;
        });
      },
      (error) => {
        console.error('Erreur lors de la récupération des quiz:', error);
      }
    );
  }

  // Sélectionner un quiz pour l'éditer
  onQuizSelect(event: any): void {
    const selectedQuizId = Number(event.target.value);
    this.selectedQuiz = this.quizzes.find((quiz) => quiz.id === selectedQuizId) || null;
  }

  // Ajouter une nouvelle question vide
  addQuestion(): void {
    console.log('%%%%%%%%%%%%%%%%%%%%%%SELECTEDQUIZ');
    console.log(this.selectedQuiz);
    if (this.selectedQuiz) {
      this.selectedQuiz.questions.push({
        statement: '',
        correctAnswer: '',
        questionType: 'multiple_choice',
        image: null,
        timeLimit: 30,
        incorrectAnswers: '',
        quizzId: this.selectedQuiz.id, // Lier la question au quiz en cours d'édition
      });
    }
  }

  // Supprimer une question
  removeQuestion(index: number): void {
    if (this.selectedQuiz) {
      this.selectedQuiz.questions.splice(index, 1);
    }
  }

  // Enregistrer les modifications du quiz et ses questions
  saveQuiz(): void {
    if (this.selectedQuiz) {
      // Envoyer le quiz sans les questions d'abord
      const quizData: Partial<Quiz> = {
        id: this.selectedQuiz.id,
        title: this.selectedQuiz.title,
        description: this.selectedQuiz.description,
      };

      this.quizService.saveQuiz(quizData).subscribe(
        (updatedQuiz) => {
          console.log('IULQfiufjkupdated')
          console.log(updatedQuiz)
          if (!updatedQuiz.quizId) {
            console.error('ID du quiz manquant dans la réponse');
            return;
          }

          const updatedQuizId = updatedQuiz.quizId;

          // Met à jour l'ID du quiz dans les questions
          this.selectedQuiz!.questions.forEach((question, index) => {
            question.quizzId = updatedQuizId; // Utilise l'ID retourné
            console.log(`Mise à jour de la question ${index + 1} avec quizzId: ${updatedQuizId}`, question);

            // Envoie chaque question au service
            this.quizService.saveQuestions(question).subscribe(
              (response) => {
                console.log(`Question ${index + 1} sauvegardée`, response);
              },
              (error) => {
                console.error(`Erreur pour Question ${index + 1}`, error);
              }
            );
          });
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du quiz:', error);
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
          this.selectedQuiz = null;
          this.loadQuizzes();
        },
        (error) => {
          console.error('Erreur lors de la suppression du quiz:', error);
        }
      );
    }
  }
}
