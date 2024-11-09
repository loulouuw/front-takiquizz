// src/app/models/quiz.model.ts
export interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: Array<{
    id: number;
    statement: string;
    correctAnswer: string;
    questionType: string;
    image: string | null;
    timeLimit: number;
  }>;
  timeLimitPerQuestion: number;
}

