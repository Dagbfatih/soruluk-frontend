import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuestionResultDetailsDto } from '../models/dtos/questionResultDetailsDto';
import { QuestionResult } from '../models/entities/questionResult';
import { ListResponseModel } from '../models/responseModels/ListResponseModel';

@Injectable({
  providedIn: 'root',
})
export class QuestionResultService {
  apiUrl = environment.apiUrl + 'questionResults/';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<QuestionResult>> {
    return this.httpClient.get<ListResponseModel<QuestionResult>>(
      this.apiUrl + 'getall'
    );
  }

  getAllDetails(): Observable<ListResponseModel<QuestionResultDetailsDto>> {
    return this.httpClient.get<ListResponseModel<QuestionResultDetailsDto>>(
      this.apiUrl + 'getalldetails'
    );
  }

  getAllDetailsByTestResultId(
    testResultId: number
  ): Observable<ListResponseModel<QuestionResultDetailsDto>> {
    return this.httpClient.get<ListResponseModel<QuestionResultDetailsDto>>(
      this.apiUrl + 'getalldetailsbytestresultid?testResultId=' + testResultId
    );
  }
}
