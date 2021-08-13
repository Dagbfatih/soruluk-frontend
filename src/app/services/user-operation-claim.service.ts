import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserOperationClaimDetailsDto } from '../models/dtos/userOperationClaimDetailsDto';
import { UserOperationClaim } from '../models/entities/userOperationClaim';
import { ListResponseModel } from '../models/responseModels/ListResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class UserOperationClaimService {
  apiUrl = environment.apiUrl + 'userOperationClaims/';

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  getAll(): Observable<ListResponseModel<UserOperationClaim>> {
    return this.httpClient.get<ListResponseModel<UserOperationClaim>>(
      this.apiUrl + 'getall'
    );
  }

  add(userOperationClaim: UserOperationClaim): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'add',
      userOperationClaim
    );
  }

  getAllDetails(): Observable<ListResponseModel<UserOperationClaimDetailsDto>> {
    return this.httpClient.get<ListResponseModel<UserOperationClaimDetailsDto>>(
      this.apiUrl + 'getalldetails'
    );
  }

  getAllDetailsByUser(
    userId: number
  ): Observable<ListResponseModel<UserOperationClaimDetailsDto>> {
    return this.httpClient.get<ListResponseModel<UserOperationClaimDetailsDto>>(
      this.apiUrl + 'getalldetailsbyuser?userId=' + userId
    );
  }

  delete(userOperationClaim: UserOperationClaim): Observable<ResponseModel> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: userOperationClaim,
    };

    return this.httpClient.delete<ResponseModel>(
      this.apiUrl + 'delete',
      httpOptions
    );
  }
}
