import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/players'; // URL de l'API pour la connexion
  private isConnected: boolean = false; // Variable globale pour savoir si l'utilisateur est connecté

  constructor(private http: HttpClient) {}

  // Méthode pour vérifier l'authentification de l'utilisateur
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials); // Envoie de la requête à l'API
  }

  getIsConnected(): boolean {
    return this.isConnected; // Retourne la valeur de isConnected
  }

  // Méthode pour savoir si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return this.isConnected; // Retourne si l'utilisateur est connecté ou non
  }

  // Méthode pour marquer l'utilisateur comme connecté
  setAuthenticated(status: boolean): void {
    this.isConnected = status; // Mettre à jour la variable isConnected
  }

  // Si tu veux rajouter une méthode de déconnexion
  logout(): void {
    this.isConnected = false; // Mettre isConnected à false lors de la déconnexion
  }

  register(userData: { username: string; email: string; mdp: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData); // Envoie une requête à l'API pour enregistrer l'utilisateur
  }
}
