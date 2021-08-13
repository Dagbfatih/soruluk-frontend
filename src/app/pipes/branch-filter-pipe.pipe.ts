import { Pipe, PipeTransform } from '@angular/core';
import { Branch } from '../models/entities/branch';

@Pipe({
  name: 'branchFilterPipe'
})
export class BranchFilterPipePipe implements PipeTransform {

  transform(value: Branch[], filterText: string): Branch[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    value = filterText
      ? value.filter(
          (b) => b.name.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
      return value
  }

}
