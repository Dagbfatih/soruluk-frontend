import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerForRegisterDto } from '../models/dtos/customerForRegisterDto';
import { LoginModel } from '../models/entities/loginModel';
import { RegisterModel } from '../models/entities/registerModel';
import { TokenModel } from '../models/entities/tokenModel';
import { ItemResponseModel } from '../models/responseModels/ItemResponseModel';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl + 'auth/';

  constructor(private httpClient: HttpClient,
    private tokenService:TokenService) {}

  login(loginModel: LoginModel): Observable<ItemResponseModel<TokenModel>> {
    return this.httpClient.post<ItemResponseModel<TokenModel>>(
      this.apiUrl + 'login',
      loginModel
    );
  }

  register(
    registerModel: RegisterModel
  ): Observable<ItemResponseModel<TokenModel>> {
    return this.httpClient.post<ItemResponseModel<TokenModel>>(
      this.apiUrl + 'register',
      registerModel
    );
  }

  registerWithCustomer(
    customerForRegisterDto: CustomerForRegisterDto
  ): Observable<ItemResponseModel<TokenModel>> {
    return this.httpClient.post<ItemResponseModel<TokenModel>>(
      this.apiUrl + 'registerwithcustomer',
      customerForRegisterDto
    );
  }

  signOut() {
    this.tokenService.removeToken();
  }

  isAuthenticated() {
    if (this.tokenService.getTokenFromCookie()) {
      return true;
    }
    return false;
  }
}
