import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private apiUrl = 'http://localhost:8080/players'; // L'URL de l'API

  constructor(private http: HttpClient) { }

  getPlayerInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`);  // Assurez-vous d'avoir un endpoint qui retourne les infos du joueur connecté
  }
}
