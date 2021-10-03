import { Customer } from '../entities/customer';
import { Lesson } from '../entities/lesson';

export interface CustomerDetailsDto {
  customerDetails: Customer;
  roleName: string;
  firstName: string;
  lastName: string;
  email: string;
  status: boolean;
  lesson: Lesson;
}
