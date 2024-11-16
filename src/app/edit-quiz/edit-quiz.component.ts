import { Component, OnInit } from '@angular/core';
import { QuizService } from 'services/quiz.service';
import { Quiz } from 'models/quiz.model';
import { Question } from 'models/question.model'; // Importer le modèle Question si ce n'est pas déjà fait
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {
  quizzes: Quiz[] = [];
  selectedQuiz: Quiz | null = null;
  originalQuestions: Question[] = []; // Nouvelle propriété pour stocker les questions originales

  constructor(private quizService: QuizService,private router: Router) {}

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

    // Copier les questions originales à chaque sélection de quiz
    if (this.selectedQuiz) {
      this.originalQuestions = JSON.parse(JSON.stringify(this.selectedQuiz.questions));
    }
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
    console.log(`Tentative de suppression de la question à l'index ${index}`);

    if (this.selectedQuiz && this.selectedQuiz.questions[index]) {
      const questionToDelete = this.selectedQuiz.questions[index];
      console.log(`Question à supprimer :`, questionToDelete);

      if (questionToDelete.quizzId) {
        this.quizService.deleteQuestion(questionToDelete.id).subscribe(
          () => {
            console.log(`Question ${index + 1} supprimée avec succès.`);
            this.selectedQuiz!.questions.splice(index, 1);
          },
          (error) => {
            console.error(`Erreur lors de la suppression de la question ${index + 1}`, error);
          }
        );
      } else {
        console.log(`La question est une nouvelle question, suppression locale.`);
        this.selectedQuiz!.questions.splice(index, 1);
      }
    } else {
      console.error(`La question à l'index ${index} n'a pas été trouvée.`);
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
          console.log('Quiz mis à jour:', updatedQuiz);
          if (!updatedQuiz.quizId) {
            console.error('ID du quiz manquant dans la réponse');
            return;
          }

          const updatedQuizId = updatedQuiz.quizId;

          // Filtrer les nouvelles questions (celles qui n'ont pas d'ID)
          const newQuestions = this.selectedQuiz!.questions.filter(
            (question) => !question.id // Vérifie si l'ID de la question est manquant
          );

          // Enregistrer les nouvelles questions
          newQuestions.forEach((question, index) => {
            question.quizzId = updatedQuizId; // Associer le quizzId aux nouvelles questions
            console.log(`Mise à jour de la question ${index + 1} avec quizzId: ${updatedQuizId}`, question);

            // Envoie seulement les nouvelles questions
            this.quizService.saveQuestions(question).subscribe(
              (response) => {
                console.log(`Nouvelle question ${index + 1} sauvegardée`, response);
              },
              (error) => {
                console.error(`Erreur pour la question ${index + 1}`, error);
              }
            );
          });

          // Comparer et mettre à jour les questions existantes
          const existingQuestions = this.selectedQuiz!.questions.filter(
            (question) => question.id // Filtre les questions avec un ID existant
          );

          existingQuestions.forEach((question, index) => {
            // Trouver la question d'origine dans la liste des questions originales
            const originalQuestion = this.originalQuestions.find(q => q.id === question.id);

            if (originalQuestion) {
              console.log('Original:', originalQuestion);
              console.log('Modifié:', question);

              // Comparer les anciennes et les nouvelles données de la question
              const isModified =
                question.statement !== originalQuestion.statement ||
                question.correctAnswer !== originalQuestion.correctAnswer ||
                question.incorrectAnswers !== originalQuestion.incorrectAnswers ||
                question.questionType !== originalQuestion.questionType ||
                question.timeLimit !== originalQuestion.timeLimit ||
                question.image !== originalQuestion.image;

              if (isModified) {
                // Supprimer l'ancienne question avant de sauvegarder la nouvelle
                this.quizService.deleteQuestion(question.id).subscribe(
                  () => {
                    console.log(`Ancienne question ${index + 1} supprimée`);

                    // Associer le quizzId aux questions mises à jour
                    question.quizzId = updatedQuizId;

                    // Enregistrer la question mise à jour
                    this.quizService.saveQuestions(question).subscribe(
                      (response) => {
                        console.log(`Question ${index + 1} mise à jour`, response);
                      },
                      (error) => {
                        console.error(`Erreur pour la question ${index + 1}`, error);
                      }
                    );
                  },
                  (error) => {
                    console.error(`Erreur lors de la suppression de la question ${index + 1}`, error);
                  }
                );
              } else {
                console.log(`Aucune modification pour la question ${index + 1}`);
              }
            }
          });

          console.log('Quiz, nouvelles questions et questions mises à jour enregistrés');
          this.router.navigate(['/']);
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
