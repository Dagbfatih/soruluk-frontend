import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { alltranslates } from 'src/app/constants/TranslateManager';
import { Language } from 'src/app/models/entities/language';
import { LanguageService } from 'src/app/services/language.service';
import { PageService } from 'src/app/services/page.service';
import { SettingsService } from 'src/app/services/settings.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  languageCode: string = this.settingsService.getLanguageCodeFromLocalStorage();
  languages: Language[] = [];
  theme: string = 'bootstrap';

  constructor(
    private languageService: LanguageService,
    private settingsService: SettingsService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.getLanguages();
  }

  publicgetLanguageCodeFromLocalStorage(): string {
    let code = localStorage.getItem('code');

    if (code == null) {
      return 'EN-en';
    } else {
      return code;
    }
  }

  getLanguages() {
    this.languageService.getAll().subscribe((response) => {
      this.languages = response.data;
    });
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }

  onLanguageChanged(event: any) {
    this.settingsService.setLanguage(this.languageCode);
    window.location.reload();
  }

  // toggleTheme() {
  //   if (this.theme === 'bootstrap') {
  //     this.theme = 'bootstrap-dark';
  //   } else  {
  //     this.theme = 'bootstrap';
  //   }

  //   this.themeService.setTheme(this.theme)
  // }
}
