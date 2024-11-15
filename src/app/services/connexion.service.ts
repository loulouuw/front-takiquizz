import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  private apiUrl = 'http://localhost:8080/players';  // L'URL de l'API
  private playerInfoKey = 'playerInfo';  // Clé pour stocker les infos du joueur dans le localStorage

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  authenticate(email: string, password: string): Observable<boolean> {
    return new Observable(subscriber => {
      this.getUsers().subscribe(
        users => {
          const user = users.find(u => u.email === email && u.mdp === password);
          if (user) {
            const playerInfo = { username: user.username, email: user.email };
            localStorage.setItem(this.playerInfoKey, JSON.stringify(playerInfo)); // Sauvegarde des infos dans le localStorage
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

  isConnected(): boolean {
    return localStorage.getItem(this.playerInfoKey) !== null;
  }

  logout(): void {
    localStorage.removeItem(this.playerInfoKey);
  }

  getPlayerInfo(): { username: string, email: string } | null {
    const playerInfo = localStorage.getItem(this.playerInfoKey);
    return playerInfo ? JSON.parse(playerInfo) : null;
  }
}
