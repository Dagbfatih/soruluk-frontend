import { Pipe, PipeTransform } from '@angular/core';
import { TranslateDetailsDto } from '../models/dtos/translateDetailsDto';
import { Translate } from '../models/entities/translate';

@Pipe({
  name: 'translateFilterPipe',
})
export class TranslateFilterPipePipe implements PipeTransform {
  transform(value: TranslateDetailsDto[], filterText: string): TranslateDetailsDto[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    value = filterText
      ? value.filter(
          (t) =>
            t.translate.key.toLocaleLowerCase().indexOf(filterText) !== -1 ||
            t.translate.value.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;

    return value;
  }
}
