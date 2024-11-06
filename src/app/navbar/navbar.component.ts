import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Link } from "models/links.model";

@Component({
  selector: "epf-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
  links: Link[] = [
    { name: "Accueil", href: "" },
    { name: "Quiz", href: "quiz" }
  ];
  isAuthenticated: boolean = false; // Gestion de l'état de connexion
  showDropdown: boolean = false; // État du menu déroulant

  constructor(private router: Router) {}

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown; // Affiche ou masque le dropdown
  }

  // Méthode pour la connexion ou déconnexion
  handleAuthAction(): void {
    if (this.isAuthenticated) {
      // Si l'utilisateur est connecté, déconnecte-le et redirige vers l'accueil
      this.isAuthenticated = false;
      this.router.navigate(["/"]);
    } else {
      // Sinon, redirige vers la page de connexion
      this.router.navigate(["/connexion"]);
    }
    this.showDropdown = false; // Ferme le dropdown
  }
}
