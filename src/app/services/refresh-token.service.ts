import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { storageTypes } from '../constants/storageTypes';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RefreshTokenService {
  private tokenString: string = 'refreshToken';

  constructor(
    private localStorageService: LocalStorageService,
    private cookieService: CookieService
  ) {}

  get(): string | null {
    let token: string = this.cookieService.get(this.tokenString);
    if (token == null) {
      token = this.localStorageService.getItem(this.tokenString)!;
      if (token == null) {
        token = sessionStorage.getItem(this.tokenString)!;
        if (token == null) {
          return null;
        }
      }
    }
    return token;
  }

  getStorageType(): string {
    if (this.cookieService.get(this.tokenString) !== null) {
      return storageTypes.cookie;
    } else if (this.localStorageService.getItem(this.tokenString) !== null) {
      return storageTypes.localStorage;
    } else if (sessionStorage.getItem(this.tokenString) !== null) {
      return storageTypes.sessionStorage;
    } else {
      return '';
    }
  }

  setCookie(token: string): void {
    this.cookieService.put(this.tokenString, token);
  }

  setLocal(token: string): void {
    this.localStorageService.setItem(this.tokenString, token);
  }

  setSession(token: string): void {
    sessionStorage.setItem(this.tokenString, token);
  }

  remove(): void {
    localStorage.removeItem(this.tokenString);
    sessionStorage.removeItem(this.tokenString);
    this.cookieService.remove(this.tokenString);
  }
}
