export interface Question {
  id: number;
  statement: string;
  correctAnswer: string;
  questionType: string;
  image: string | null;
  timeLimit: number;
  incorrectAnswers: string; // Cette propriété doit correspondre aux données renvoyées par l'API
}
