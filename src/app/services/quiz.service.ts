import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from 'models/quiz.model';
import {Question} from "models/question.model"

@Injectable({
  providedIn: "root",
})
export class QuizService {
  private apiUrl = "http://localhost:8080/quizzes"

  constructor(private http: HttpClient) {}

  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.apiUrl)
  }

  getQuizById(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiUrl}/${id}`)
  }

  saveQuiz(quiz: Partial<Quiz>): Observable<Quiz> {
    return this.http.post<Quiz>(this.apiUrl, quiz)
  }

  saveQuestions(questions: Question): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/questions`, questions)
  }

  deleteQuestion(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/questions/${id}`)
  }

  deleteQuiz(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  getQuizzesByTitle(title: string): Observable<Quiz[]> {
    // Utilisation du type Quiz[] pour un tableau de quiz
    return this.http.get<Quiz[]>(`${this.apiUrl}/title/${title}`)
  }
}
