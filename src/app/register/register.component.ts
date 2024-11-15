// register.component.ts
import { Component } from '@angular/core';
import { AuthService } from 'services/auth.service';
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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    const userData = {
      username: this.username,
      email: this.email,
      mdp: this.password
    };

    this.authService.register(userData).subscribe(
      (response: any) => {
        console.log('Inscription réussie', response);
        this.router.navigate(['/connexion']); // Redirige vers la page de connexion après l'inscription
      },
      (error: any) => {
        console.error('Erreur lors de l\'inscription', error);
        alert('Une erreur est survenue. Veuillez vérifier vos informations.');
      }
    );
  }
}
