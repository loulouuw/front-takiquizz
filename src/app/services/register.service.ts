import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:8080/players/register';  // URL de l'API pour l'enregistrement

  constructor(private http: HttpClient) {}

  // Méthode pour envoyer les informations d'inscription
  register(userData: { username: string, email: string, mdp: string, totalPoint: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }
}
