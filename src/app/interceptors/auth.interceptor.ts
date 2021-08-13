import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { SettingsService } from '../services/settings.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private settingsService: SettingsService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = this.tokenService.getTokenFromCookie()!;
    let newRequest: HttpRequest<any>;

    newRequest = request.clone({
      headers: request.headers
        .set('Authorization', 'Bearer ' + token)
        .append(
          'language',
          this.settingsService.getLanguageCodeFromLocalStorage()
        ),
    });
    return next.handle(newRequest);
  }
}
