import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TestResultDetailsDto } from '../models/dtos/testResultDetailsDto';
import { TestResult } from '../models/entities/testResult';
import { ItemResponseModel } from '../models/responseModels/ItemResponseModel';
import { ListResponseModel } from '../models/responseModels/ListResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root',
})
export class TestResultService {
  apiUrl = environment.apiUrl + 'testResults/';

  constructor(private httpClient: HttpClient) {}

  add(testResult: TestResult): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', testResult);
  }

  addWithDetails(testResult: TestResultDetailsDto): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'addwithdetails',
      testResult
    );
  }

  getAll(): Observable<ListResponseModel<TestResult>> {
    return this.httpClient.get<ListResponseModel<TestResult>>(
      this.apiUrl + 'getall'
    );
  }

  getAllDetailsByUser(
    userId: number
  ): Observable<ListResponseModel<TestResultDetailsDto>> {
    return this.httpClient.get<ListResponseModel<TestResultDetailsDto>>(
      this.apiUrl + 'getalldetailsbyuser?userId=' + userId
    );
  }

  getDetailsById(
    id: number
  ): Observable<ItemResponseModel<TestResultDetailsDto>> {
    return this.httpClient.get<ItemResponseModel<TestResultDetailsDto>>(
      this.apiUrl + 'getdetailsbyid?id=' + id
    );
  }
}
