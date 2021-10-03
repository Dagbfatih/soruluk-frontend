import { QuestionResult } from '../entities/questionResult';
import { QuestionDetailsDto } from './questionDetailsDto';

export interface QuestionResultDetailsDto {
  questionResult: QuestionResult;
  question: QuestionDetailsDto;
}
