import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OptionNumberGeneratorService {
  optionNumbers: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'J',
    'J',
    'J',
    'J',
    'J',
    'J',
    'J',
    'J',
    'J',
    'J',
  ];

  constructor() {}

  getOptionNumber(index: number) {
    return this.optionNumbers[index];
  }
}
