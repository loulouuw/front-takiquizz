import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from 'models/quiz.model';  // Import de l'interface Quiz

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:8080/quizzes';

  constructor(private http: HttpClient) { }

  // Récupérer tous les quiz
  getQuizzes(): Observable<Quiz[]> {  // Utilisation du type Quiz[] pour indiquer un tableau de Quiz
    return this.http.get<Quiz[]>(this.apiUrl);
  }

  // Récupérer un quiz par ID
  getQuizById(id: number): Observable<Quiz> {  // Utilisation du type Quiz pour un seul quiz
    return this.http.get<Quiz>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un nouveau quiz
  saveQuiz(quiz: Quiz): Observable<Quiz> {  // Utilisation du type Quiz
    return this.http.post<Quiz>(this.apiUrl, quiz);
  }

  // Supprimer un quiz par ID
  deleteQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Récupérer les quiz par titre
  getQuizzesByTitle(title: string): Observable<Quiz[]> {  // Utilisation du type Quiz[] pour un tableau de quiz
    return this.http.get<Quiz[]>(`${this.apiUrl}/title/${title}`);
  }
}
