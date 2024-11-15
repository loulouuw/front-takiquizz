import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameSession } from 'models/game-session';  // Modèle pour les sessions de jeu

@Injectable({
  providedIn: 'root'
})
export class GameSessionService {
  private apiUrl = 'http://localhost:8080/gamesessions';  // URL de l'API pour récupérer les sessions de jeu
  private playerInfoKey = 'playerInfo'; // Clé pour stocker les infos du joueur dans le localStorage

  constructor(private http: HttpClient) {}

  getIsConnected(): boolean {
    return localStorage.getItem(this.playerInfoKey) !== null;
  }

  getPlayerInfo(): { username: string, email: string } | null {
    const playerInfo = localStorage.getItem(this.playerInfoKey);
    return playerInfo ? JSON.parse(playerInfo) : null;
  }

  getGameSessionsByPlayerId(playerId: string): Observable<GameSession[]> {
    return this.http.get<GameSession[]>(`${this.apiUrl}/player/${playerId}`);
  }

  login(username: string, email: string): void {
    const playerInfo = { username, email };
    localStorage.setItem(this.playerInfoKey, JSON.stringify(playerInfo));
  }

  logout(): void {
    localStorage.removeItem(this.playerInfoKey);
  }
}
