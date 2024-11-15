import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service"

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  private apiUrl = 'http://localhost:8080/players'; // L'URL de l'API

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Méthode pour obtenir tous les utilisateurs et vérifier les identifiants
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Méthode pour authentifier l'utilisateur
  authenticate(email: string, password: string): Observable<boolean> {
    return new Observable(subscriber => {
      this.getUsers().subscribe(
        users => {
          const user = users.find(u => u.email === email && u.mdp === password);
          if (user) {
            // Connexion réussie
            this.authService.login(); // Connecte l'utilisateur
            subscriber.next(true);
            subscriber.complete();
          } else {
            // Connexion échouée
            subscriber.next(false);
            subscriber.complete();
          }
        },
        error => {
          console.error('Erreur lors de la récupération des utilisateurs', error);
          subscriber.error(error);
        }
      );
    });
  }
}
