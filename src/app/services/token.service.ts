import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie';
import { User } from '../models/entities/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private jwtHelperService: JwtHelperService = new JwtHelperService();
  private tokenString: string = 'token';

  constructor(
    private localStorageService: LocalStorageService,
    private cookieService: CookieService
  ) {}

  decodeToken(token: string) {
    return this.jwtHelperService.decodeToken(token);
  }

  getTokenFromLocalStorage(): string | null {
    let result = localStorage.getItem(this.tokenString);
    if (!result) {
      let token = this.getTokenFromSession();
      return token;
    }
    return result;
  }

  setTokenOnLocalStorage(token: string): void {
    this.localStorageService.setItem(this.tokenString, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenString);
    sessionStorage.removeItem(this.tokenString);
    this.cookieService.remove(this.tokenString);
  }

  isTokenExpiredOnLocalStorage(token: string): boolean {
    let isExpired = this.jwtHelperService.isTokenExpired(
      this.getTokenFromLocalStorage()!
    );

    return isExpired != null ? isExpired : true;
  }

  getTokenExpirationDateFromLocalStorage(): Date {
    let result = this.jwtHelperService.getTokenExpirationDate(
      this.getTokenFromLocalStorage()!
    );
    if (result == null) {
      return new Date('0000-00-0T00:00:00');
    }
    return result;
  }

  getUserRolesWithJWTFromLocalStorage(): string[] {
    let token = this.decodeToken(this.getTokenFromLocalStorage()!);

    if (token != null) {
      let roles =
        token[Object.keys(token).filter((r) => r.endsWith('/role'))[0]];

      if (!Array.isArray(roles)) {
        let array = new Array();
        array.push(roles);

        return array;
      }

      return roles;
    }

    return [];
  }

  getUserWithJWTFromLocalStorage() {
    let token = this.jwtHelperService.decodeToken(
      this.getTokenFromLocalStorage()!
    );

    if (token != null) {
      let userModel: User = {
        id: +token[
          Object.keys(token).filter((t) => t.endsWith('nameidentifier'))[0]
        ],
        email: token.email,
        firstName:
          token[Object.keys(token).filter((t) => t.endsWith('name'))[0]],
        lastName:
          token[Object.keys(token).filter((t) => t.endsWith('surname'))[0]],
        status: Boolean(token.status),
      };

      return userModel;
    }

    return null;
  }

  // ----------- COOKİE SERVİCE -----------

  getTokenFromCookie() {
    let result: string = this.cookieService.get(this.tokenString);
    if (!result) {
      let token = this.getTokenFromSession();
      return token;
    }
    return result;
  }

  setTokenOnCookie(token: string): void {
    this.cookieService.put(this.tokenString, token);
  }

  isTokenExpiredOnCookie(token: string): boolean {
    let isExpired = this.jwtHelperService.isTokenExpired(
      this.getTokenFromCookie()!
    );

    return isExpired != null ? isExpired : true;
  }

  getTokenExpirationDateFromCookie(): Date {
    let result = this.jwtHelperService.getTokenExpirationDate(
      this.getTokenFromCookie()!
    );
    if (result == null) {
      return new Date('0000-00-0T00:00:00');
    }
    return result;
  }

  getUserRolesWithJWTFromCookie(): string[] {
    let token = this.decodeToken(this.getTokenFromCookie()!);

    if (token != null) {
      let roles =
        token[Object.keys(token).filter((r) => r.endsWith('/role'))[0]];

      if (!Array.isArray(roles)) {
        let array = new Array();
        array.push(roles);

        return array;
      }

      return roles;
    }

    return [];
  }

  getUserWithJWTFromCookie() {
    let token = this.jwtHelperService.decodeToken(this.getTokenFromCookie()!);

    if (token != null) {
      let userModel: User = {
        id: +token[
          Object.keys(token).filter((t) => t.endsWith('nameidentifier'))[0]
        ],
        email: token.email,
        firstName:
          token[Object.keys(token).filter((t) => t.endsWith('name'))[0]],
        lastName:
          token[Object.keys(token).filter((t) => t.endsWith('lastname'))[0]],
        status: Boolean(token.status),
      };

      return userModel;
    }

    return { id: 0 } as User;
  }

  // Session Storage

  setTokenOnSession(token: string): void {
    sessionStorage.setItem(this.tokenString, token);
  }

  getTokenFromSession(): string | null {
    return sessionStorage.getItem(this.tokenString);
  }
}
