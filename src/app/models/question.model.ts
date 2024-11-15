export interface Question {
  id: number;
  idQuiz?: number;
  statement: string;
  correctAnswer: string;
  questionType: string;
  image: string | null;
  timeLimit: number;
  quiz_id: number;
  incorrectAnswers: string; // Cette propriété doit correspondre aux données renvoyées par l'API
}
