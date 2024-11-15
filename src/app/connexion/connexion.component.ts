import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnexionService } from 'services/connexion.service';  // Importer le service de connexion

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private connexionService: ConnexionService,  // Injection du service de connexion
    private router: Router  // Pour rediriger l'utilisateur après connexion
  ) {}

  // Méthode pour gérer l'envoi du formulaire de connexion
  onSubmit(): void {
    this.connexionService.authenticate(this.email, this.password).subscribe(
      (isAuthenticated: boolean) => {
        if (isAuthenticated) {
          // Connexion réussie, on redirige vers la page d'accueil ou la page de score
          this.router.navigate(['/']);
        } else {
          // Connexion échouée, affichage d'un message d'erreur
          this.errorMessage = 'Email ou mot de passe incorrect';
        }
      },
      (error) => {
        console.error('Erreur lors de la connexion', error);
        this.errorMessage = 'Une erreur est survenue lors de la connexion';
      }
    );
  }
}
