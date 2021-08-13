import { Pipe, PipeTransform } from '@angular/core';
import { QuestionDetailsDto } from '../models/dtos/questionDetailsDto';

@Pipe({
  name: 'questionFilterPipe',
})
export class QuestionFilterPipePipe implements PipeTransform {
  transform(
    value: QuestionDetailsDto[],
    filterText: string = '',
    optionNumber: number = 0
  ): QuestionDetailsDto[] {
    let questions: QuestionDetailsDto[] = value;

    // Text filter
    // User Name Filter

    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    questions = filterText
      ? questions.filter(
          (q) =>
            q.questionText.toLocaleLowerCase().indexOf(filterText) !== -1 ||
            q.userName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : questions;

    // Option number filter

    questions =
      optionNumber && optionNumber !== 0
        ? questions.filter((q) => q.options.length === optionNumber)
        : questions;

    return questions;
  }
}
