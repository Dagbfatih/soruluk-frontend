import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responseModels/ListResponseModel';
import { Option } from '../models/entities/option';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OptionService {
  apiUrl = environment.apiUrl + 'options/';
  
  constructor(private httpClient: HttpClient) {}

  getOptions(): Observable<ListResponseModel<Option>> {
    return this.httpClient.get<ListResponseModel<Option>>(
      this.apiUrl + 'getall'
    );
  }

  getOptionsByQuestion(
    questionId: number
  ): Observable<ListResponseModel<Option>> {
    return this.httpClient.get<ListResponseModel<Option>>(
      this.apiUrl + 'getallbyquestion?questionId=' + questionId
    );
  }
}
