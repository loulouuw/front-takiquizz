import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/swagger-ui/index.html';

  constructor(private http: HttpClient) {}

  // Exemple de méthode pour récupérer des données
  getStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/students`);
  }

  // Méthode pour ajouter un étudiant (exemple)
  addStudent(student: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/students`, student);
  }
}
