import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OperationClaim } from '../models/entities/operationClaim';
import { ListResponseModel } from '../models/responseModels/ListResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class OperationClaimService {
  apiUrl = environment.apiUrl + 'operationClaims/';

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  getAll(): Observable<ListResponseModel<OperationClaim>> {
    return this.httpClient.get<ListResponseModel<OperationClaim>>(
      this.apiUrl + 'getall'
    );
  }

  add(operationClaim: OperationClaim): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'add',
      operationClaim
    );
  }

  delete(operationClaim: OperationClaim): Observable<ResponseModel> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: operationClaim,
    };
    
    return this.httpClient.delete<ResponseModel>(
      this.apiUrl + 'delete',
      httpOptions
    );
  }
}
