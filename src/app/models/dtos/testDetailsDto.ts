import { Branch } from '../entities/branch';
import { Test } from '../entities/test';
import { QuestionDetailsDto } from './questionDetailsDto';

export interface TestDetailsDto {
  test: Test;
  userName: string;
  questions: QuestionDetailsDto[];
}
