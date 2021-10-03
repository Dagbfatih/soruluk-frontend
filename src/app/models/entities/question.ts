export interface Question {
  questionId: number;
  questionText: string;
  starQuestion: boolean;
  brokenQuestion: boolean;
  privacy: boolean;
  userId: number;
  lessonId: number;
  subjectId: number;
  difficultyLevel: number;
}
