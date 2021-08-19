import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CountdownTimerService } from 'ngx-timer';
import { Subscription } from 'rxjs';
import { alltranslates, TranslateManager } from './constants/TranslateManager';
import { SettingsService } from './services/settings.service';
import { ThemeService } from './services/theme.service';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  pageRefreshsubscription: Subscription;

  constructor(
    private router: Router,
    private translateManager: TranslateManager,
    private settingsService: SettingsService,
    private countdownTimerService: CountdownTimerService,
    private themeService: ThemeService,
    private renderer: Renderer2
  ) {}

  title = 'funnytest-project';

  ngOnInit() {
    // this.checkTheme();
    this.checkPageRefresh();
    this.translateManager.getAllTranslatesByCode(this.getLanguageCode());
  }

  ngOnDestroy() {
    this.pageRefreshsubscription.unsubscribe();
  }

  checkPageRefresh() {
    this.pageRefreshsubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !this.router.navigated;
      }
    });
  }

  checkRouter(): boolean {
    if (this.router.url.includes('/exam')) {
      return false;
    } else {
      return true;
    }
  }

  getLanguageCode(): string {
    return this.settingsService.getLanguageCodeFromLocalStorage();
  }

  getTranslate(key: string) {
    return alltranslates.get(key);
  }

  // checkTheme() {
  //   this.themeService.themeChanges().subscribe((theme) => {
  //     if (theme.oldValue) {
  //       this.renderer.removeClass(document.body, theme.oldValue);
  //     }
  //     this.renderer.addClass(document.body, theme.newValue);
  //   });
  // }
  // Düzenlenecek
}
