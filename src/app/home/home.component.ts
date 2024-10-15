import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Assure-toi d'importer Router

@Component({
  selector: 'epf-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { } // Injection du Router

  ngOnInit(): void { }

  startQuiz(): void {
    this.router.navigate(['/quiz']); // Redirection vers la page du quiz
  }
}
