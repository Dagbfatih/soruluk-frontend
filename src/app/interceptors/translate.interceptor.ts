import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SettingsService } from '../services/settings.service';

@Injectable()
export class TranslateInterceptor implements HttpInterceptor {
  constructor(private settingsService: SettingsService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let newRequest: HttpRequest<any>;

    newRequest = request.clone({
      headers: request.headers.set(
        'language',
        this.settingsService.getLanguageCodeFromLocalStorage()
      ),
    });

    return next.handle(request);
  }
}
