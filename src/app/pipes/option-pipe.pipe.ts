import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'optionPipe'
})
export class OptionPipePipe implements PipeTransform {

  transform(value: string, optionIndicator:string): string {
    return value+optionIndicator;
  }

}
