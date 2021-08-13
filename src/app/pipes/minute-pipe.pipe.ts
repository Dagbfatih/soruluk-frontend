import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutePipe'
})
export class MinutePipePipe implements PipeTransform {

  transform(value: number): string {
    return value + " " + "dk";
 }

}
