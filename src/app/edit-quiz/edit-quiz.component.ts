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

          console.log("Questions avant filtrage:", this.selectedQuiz!.questions);
          const newQuestions = this.selectedQuiz!.questions.filter(
            (question) => !question.id
          );
          console.log("Nouvelles questions filtrées:", newQuestions);

          // Met à jour le quizzId des nouvelles questions
          newQuestions.forEach((question, index) => {
            question.quizzId = updatedQuizId; // Associer le quizzId aux nouvelles questions
            console.log(`Mise à jour de la question ${index + 1} avec quizzId: ${updatedQuizId}`, question);

            // Enregistre seulement les nouvelles questions
            this.quizService.saveQuestions(question).subscribe(
              (response) => {
                console.log(`Nouvelle question ${index + 1} sauvegardée`, response);
              },
              (error) => {
                console.error(`Erreur pour la question ${index + 1}`, error);
              }
            );
          });

          console.log('Quiz et nouvelles questions enregistrées');
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
