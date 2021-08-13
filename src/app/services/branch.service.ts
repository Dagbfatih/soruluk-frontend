import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Branch } from '../models/entities/branch';
import { ListResponseModel } from '../models/responseModels/ListResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  apiUrl = environment.apiUrl + 'branches/';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<Branch>> {
    return this.httpClient.get<ListResponseModel<Branch>>(
      this.apiUrl + 'getall'
    );
  }

  add(branch: Branch): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', branch);
  }

  delete(branch: Branch): Observable<ResponseModel> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: branch,
    };

    return this.httpClient.delete<ResponseModel>(
      this.apiUrl + 'delete',
      httpOptions
    );
  }

  update(branch: Branch): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + 'update', branch);
  }
}
