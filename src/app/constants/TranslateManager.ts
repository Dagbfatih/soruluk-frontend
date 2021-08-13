import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Translate } from '../models/entities/translate';
import { ListResponseModel } from '../models/responseModels/ListResponseModel';
import { TranslateService } from '../services/translate.service';

export let alltranslates: Map<string, string> = new Map<string, string>();

@Injectable({
  providedIn: 'root',
})
export class TranslateManager implements OnInit {
  values: Translate[] = [];

  constructor(private translateService: TranslateService) {}

  ngOnInit() {}

  public getAllTranslatesByCode(code: string) {
    this.translateService.getAllByCode(code).subscribe((response) => {
      this.values = response.data;
      this.setTranslates();
    });
  }

  setTranslates() {
    this.values.forEach((v) => {
      alltranslates.set(v.key, v.value);
    });
  }
}
