import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerForRegisterDto } from '../models/dtos/customerForRegisterDto';
import { LoginModel } from '../models/entities/loginModel';
import { RegisterModel } from '../models/entities/registerModel';
import { Token } from '../models/entities/token';
import { TokenModel } from '../models/entities/tokenModel';
import { ItemResponseModel } from '../models/responseModels/ItemResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';
import { RefreshTokenService } from './refresh-token.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl + 'auth/';

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private refreshTokenService: RefreshTokenService
  ) {}

  login(loginModel: LoginModel): Observable<ItemResponseModel<Token>> {
    return this.httpClient.post<ItemResponseModel<Token>>(
      this.apiUrl + 'login',
      loginModel
    );
  }

  register(registerModel: RegisterModel): Observable<ItemResponseModel<Token>> {
    return this.httpClient.post<ItemResponseModel<Token>>(
      this.apiUrl + 'register',
      registerModel
    );
  }

  registerWithCustomer(
    customerForRegisterDto: CustomerForRegisterDto
  ): Observable<ItemResponseModel<Token>> {
    return this.httpClient.post<ItemResponseModel<Token>>(
      this.apiUrl + 'registerwithcustomer',
      customerForRegisterDto
    );
  }

  refreshToken(): Observable<ItemResponseModel<Token>> {
    return this.httpClient.post<ItemResponseModel<Token>>(
      this.apiUrl + 'refreshToken',
      null
    );
  }

  signOut() {
    this.httpClient
      .post<ResponseModel>(
        this.apiUrl + 'logout',
        this.tokenService.getUserWithJWT()
      )
      .subscribe((response) => {
        this.tokenService.remove();
        this.refreshTokenService.remove();
      });
  }

  isAuthenticated() {
    if (this.tokenService.get()) {
      return true;
    }
    return false;
  }
}
