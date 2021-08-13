import { Pipe, PipeTransform } from '@angular/core';
import { QuestionDetailsDto } from '../models/dtos/questionDetailsDto';

@Pipe({
  name: 'questionOptionNumFilterPipe',
})
export class QuestionOptionNumFilterPipePipe implements PipeTransform {
  transform(
    value: QuestionDetailsDto[],
    optionNumber: number
  ): QuestionDetailsDto[] {
    if (optionNumber===0 || optionNumber) {
      return value;
    }
    
    return value.filter((q) => q.options.length === optionNumber);
  } 
}
