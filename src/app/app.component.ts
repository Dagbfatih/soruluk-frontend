import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { slideInAnimation } from './animations/route-animations';
import { alltranslates, TranslateManager } from './constants/TranslateManager';
import { SettingsService } from './services/settings.service';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit, OnDestroy {
  pageRefreshsubscription: Subscription;

  constructor(
    private router: Router,
    private translateManager: TranslateManager,
    private settingsService: SettingsService
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

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation
    );
  }
}
