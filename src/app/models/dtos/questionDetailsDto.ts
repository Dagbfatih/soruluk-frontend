import { Category } from '../entities/category';
import { Option } from '../entities/option';

export interface QuestionDetailsDto {
  questionId: number;
  questionText: string;
  categories: Category[];
  options: Option[];
  starQuestion: boolean;
  brokenQuestion: boolean;
  privacy: boolean;
  userId: number;
  userName: string;
  branchId: number;
  branchName: string;
}
