import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/entities/user';

@Pipe({
  name: 'userFilterPipe',
})
export class UserFilterPipePipe implements PipeTransform {
  transform(value: User[], filterText: string): User[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    value = filterText
      ? value.filter(
          (u) =>
            u.firstName.toLocaleLowerCase().indexOf(filterText) !== -1 ||
            u.lastName.toLocaleLowerCase().indexOf(filterText) !== -1 ||
            u.email.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
    return value;
  }
}
