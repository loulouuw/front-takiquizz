import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "epf-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "epf-front-skeleton"
  constructor(private router: Router) {}

  shouldDisplayNavbar(): boolean {
    return this.router.url !== '/connexion' && this.router.url !== '/inscription';
  }

}
