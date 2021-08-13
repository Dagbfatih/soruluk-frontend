export interface QuestionResult {
  id: number;
  testResultId: number;
  questionId: number;
  selectedOptionId: number;
  correctOptionId: number;
  accuracy: boolean;
}
