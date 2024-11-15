import { Component } from '@angular/core';
import { RegisterService } from 'services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private registerService: RegisterService, private router: Router) {}

  // Méthode qui sera appelée lors de la soumission du formulaire
  onSubmit(): void {
    const userData = {
      username: this.username,
      email: this.email,
      mdp: this.password,
      totalPoint: 0,
    };

    // Appel du service d'enregistrement
    this.registerService.register(userData).subscribe(
      (response: any) => {
        alert('Inscription réussie ! Bienvenue à bord !');
        console.log('Inscription réussie', response);
        this.router.navigate(['/connexion']); // Redirection vers la page de connexion après l'inscription
      },
      (error: any) => {
        console.log(userData)
        console.error('Erreur lors de l\'inscription', error);
        alert('Une erreur est survenue. Veuillez vérifier vos informations.');
      }
    );
  }
}
