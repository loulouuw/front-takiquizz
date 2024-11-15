import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getIsConnected()) {
      return true; // L'utilisateur est connecté, autorise l'accès
    } else {
      this.router.navigate(['/connexion']); // Redirige vers la page de connexion
      return false;
    }
  }
}
