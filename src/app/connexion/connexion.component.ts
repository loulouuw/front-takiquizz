import { Component } from '@angular/core';
import { AuthService } from 'services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginData).subscribe(
      (response) => {
        // Si la connexion réussit, on marque l'utilisateur comme connecté
        console.log('Connexion réussie', response);
        this.authService.setAuthenticated(true); // Mettre isConnected à true
        this.router.navigate(['/']); // Redirige vers la page d'accueil
      },
      (error) => {
        // Si la connexion échoue, afficher un message d'erreur
        console.error('Erreur de connexion', error);
        this.errorMessage = 'Email ou mot de passe incorrect';
      }
    );
  }
}
