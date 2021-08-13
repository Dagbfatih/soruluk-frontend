import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuestionCategory } from '../models/entities/questionCategory';
import { ResponseModel } from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root',
})
export class QuestionCategoryService {
  apiUrl=environment.apiUrl+"questionCategories/";

  constructor(private httpClient: HttpClient) {}

  add(questionCategory:QuestionCategory):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add", questionCategory);
  }
}
