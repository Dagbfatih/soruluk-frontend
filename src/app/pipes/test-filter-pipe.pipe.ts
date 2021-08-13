import { Pipe, PipeTransform } from '@angular/core';
import { TestDetailsDto } from '../models/dtos/testDetailsDto';

@Pipe({
  name: 'testFilterPipe'
})
export class TestFilterPipePipe implements PipeTransform {

  transform(value: TestDetailsDto[], filterText: string): TestDetailsDto[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    return filterText
      ? value.filter(
          (t) => t.testName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
  }

}
