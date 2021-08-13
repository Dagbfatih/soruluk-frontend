export interface Question {
  questionId: number;
  questionText: string;
  starQuestion: boolean;
  brokenQuestion: boolean;
  privacy: boolean;
  userId: number;
  branchId: number;
}
