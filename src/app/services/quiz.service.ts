import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from 'models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private apiUrl = 'http://localhost:8080/quizzes';

  constructor(private http: HttpClient) { }

  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.apiUrl);
  }

  getQuizById(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiUrl}/${id}`);
  }

  saveQuiz(quiz: Quiz): Observable<Quiz> {
    return this.http.post<Quiz>(this.apiUrl, quiz);
  }

  deleteQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getQuizzesByTitle(title: string): Observable<Quiz[]> {  // Utilisation du type Quiz[] pour un tableau de quiz
    return this.http.get<Quiz[]>(`${this.apiUrl}/title/${title}`);
  }
}
