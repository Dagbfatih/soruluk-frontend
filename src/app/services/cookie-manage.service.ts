import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root',
})
export class CookieManageService {
  constructor(private cookieService: CookieService) {}

  setItem(key: string, value: string) {
    this.cookieService.put(key, value);
  }

  getItem(key: string): string | null {
    return this.cookieService.get(key);
  }

  setToken(token: string) {
    this.cookieService.put('token', token);
  }

  getToken(): string | null {
    return this.cookieService.get('token');
  }

  removeItem(key: string) {
    this.cookieService.remove(key);
  }

  removeToken() {
    this.cookieService.remove('token');
  }
}
