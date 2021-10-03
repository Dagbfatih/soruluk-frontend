import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/responseModels/ListResponseModel';
import { Question } from '../models/entities/question';
import { QuestionDetailsDto } from '../models/dtos/questionDetailsDto';
import { ResponseModel } from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  apiUrl = environment.apiUrl + 'questions/';

  constructor(private httpClient: HttpClient) {}

  add(question: Question): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', question);
  }

  update(question: Question): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + 'update', question);
  }

  addWithDetails(
    questionDetailsDto: QuestionDetailsDto
  ): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'addwithrelations',
      questionDetailsDto
    );
  }

  updateWithDetails(
    questionDetailsDto: QuestionDetailsDto
  ): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(
      this.apiUrl + 'updatewithrelations',
      questionDetailsDto
    );
  }

  getQuestions(): Observable<ListResponseModel<Question>> {
    return this.httpClient.get<ListResponseModel<Question>>(
      this.apiUrl + 'getall'
    );
  }

  getQuestionDetails(): Observable<ListResponseModel<QuestionDetailsDto>> {
    return this.httpClient.get<ListResponseModel<QuestionDetailsDto>>(
      this.apiUrl + 'getalldetails'
    );
  }

  getAllDetailsByPublic(): Observable<ListResponseModel<QuestionDetailsDto>> {
    return this.httpClient.get<ListResponseModel<QuestionDetailsDto>>(
      this.apiUrl + 'getalldetailsbypublic'
    );
  }

  getDetailsByUser(
    userId: number
  ): Observable<ListResponseModel<QuestionDetailsDto>> {
    return this.httpClient.get<ListResponseModel<QuestionDetailsDto>>(
      this.apiUrl + 'getdetailsbyuser?userId=' + userId
    );
  }

  getDetailsByUserWithId(
    userId: number,
    categoryId: number
  ): Observable<ListResponseModel<QuestionDetailsDto>> {
    return this.httpClient.get<ListResponseModel<QuestionDetailsDto>>(
      this.apiUrl +
        'getdetailsbyuserwithcategory?userId=' +
        userId +
        '&categoryId=' +
        categoryId
    );
  }

  delete(question: Question): Observable<ResponseModel> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: question,
    };
    return this.httpClient.delete<ResponseModel>(
      this.apiUrl + 'delete',
      httpOptions
    );
  }
}
