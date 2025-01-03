// src/app/models/quiz.model.ts
import { Question } from "./question.model"

export interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: Question[];
  timeLimitPerQuestion: number,
  quizId: number;
}
