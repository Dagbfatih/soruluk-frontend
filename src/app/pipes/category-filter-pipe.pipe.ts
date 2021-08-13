import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../models/entities/category';

@Pipe({
  name: 'categoryFilterPipe',
})
export class CategoryFilterPipePipe implements PipeTransform {
  transform(value: Category[], filterText: string): Category[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';
    value = filterText
      ? value.filter(
          (c) => c.categoryName.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : value;
      return value
  }
}
