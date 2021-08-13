import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responseModels/ListResponseModel';
import { Test } from '../models/entities/test';
import { environment } from 'src/environments/environment';
import { TestDetailsDto } from '../models/dtos/testDetailsDto';
import { ResponseModel } from '../models/responseModels/responseModel';
import { ItemResponseModel } from '../models/responseModels/ItemResponseModel';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  apiUrl = environment.apiUrl + 'tests/';

  constructor(private httpClient: HttpClient) {}

  addWithDetails(test: TestDetailsDto): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'addwithdetails',
      test
    );
  }

  getTests(): Observable<ListResponseModel<Test>> {
    return this.httpClient.get<ListResponseModel<Test>>(this.apiUrl + 'getall');
  }

  getTestDetails(): Observable<ListResponseModel<TestDetailsDto>> {
    return this.httpClient.get<ListResponseModel<TestDetailsDto>>(
      this.apiUrl + 'getdetails'
    );
  }

  getTestDetailsByPublic(): Observable<ListResponseModel<TestDetailsDto>> {
    return this.httpClient.get<ListResponseModel<TestDetailsDto>>(
      this.apiUrl + 'gettestdetailsbypublic'
    );
  }

  getTestDetailsByUser(
    userId: number
  ): Observable<ListResponseModel<TestDetailsDto>> {
    return this.httpClient.get<ListResponseModel<TestDetailsDto>>(
      this.apiUrl + 'gettestdetailsbyuser?userId=' + userId
    );
  }

  updateWithDetails(test: TestDetailsDto): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(
      this.apiUrl + 'updatewithdetails',
      test
    );
  }

  deleteWithDetails(test: TestDetailsDto): Observable<ResponseModel> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: test,
    };
    return this.httpClient.delete<ResponseModel>(
      this.apiUrl + 'deletewithdetails',
      httpOptions
    );
  }

  getTestDetailsById(
    id: number
  ): Observable<ItemResponseModel<TestDetailsDto>> {
    return this.httpClient.get<ItemResponseModel<TestDetailsDto>>(
      this.apiUrl + 'gettestdetailsbyid?id=' + id
    );
  }
}
