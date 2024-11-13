// src/app/models/quiz.model.ts
import { Question } from "./question.model"

export interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: Question[]; // Utilisation de l'interface Question ici
  timeLimitPerQuestion: number;
}
