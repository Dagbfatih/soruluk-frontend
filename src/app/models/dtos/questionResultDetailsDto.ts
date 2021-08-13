import { QuestionDetailsDto } from './questionDetailsDto';

export interface QuestionResultDetailsDto {
  questionResultId?: number;
  testResultId: number;
  questionId: number;
  selectedOptionId: number;
  correctOptionId: number;
  accuracy: boolean;
  question: QuestionDetailsDto;
}
