import { Test } from '../entities/test';
import { TestResult } from '../entities/testResult';
import { QuestionResultDetailsDto } from './questionResultDetailsDto';

export interface TestResultDetailsDto {
  resultDetails: TestResult;
  questionResults: QuestionResultDetailsDto[];
  testDetails: Test;
}
