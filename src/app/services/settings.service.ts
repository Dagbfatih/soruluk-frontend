import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Language } from '../models/entities/language';
import { LanguageService } from './language.service';
import { PageService } from './page.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(
    private languageService: LanguageService,
    private pageService: PageService,
    private router:Router
  ) {}

  getLanguageCodeFromLocalStorage(): string {
    let code = localStorage.getItem('code');

    if (code == null) {
      return 'tr-TR';
    } else {
      return code;
    }
  }

  getLanguage(): Language {
    let language: Language = {} as Language;
    this.languageService
      .getByCode(this.getLanguageCodeFromLocalStorage())
      .subscribe(
        (response) => {
          language = response.data;
        },
        (responseError) => {
          language = {
            code: 'en-US',
            languageName: 'English',
          };
        }
      );

    return language;
  }

  setLanguage(languageCode: string) {
    localStorage.setItem('code', languageCode);
  }
}
