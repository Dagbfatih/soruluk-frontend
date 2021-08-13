import { QuestionDetailsDto } from './questionDetailsDto';

export interface TestDetailsDto {
  testId: number;
  userId: number;
  userName: string;
  testName: string;
  testNotes: string;
  testTime: number;
  mixedCategory: boolean;
  privacy: boolean;
  questions: QuestionDetailsDto[];
  branchId: number;
  branchName: string;
}
