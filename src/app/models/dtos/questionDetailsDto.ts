import { Branch } from '../entities/branch';
import { Option } from '../entities/option';
import { Question } from '../entities/question';

export interface QuestionDetailsDto {
  question: Question;
  options: Option[];
  userName: string;
}
