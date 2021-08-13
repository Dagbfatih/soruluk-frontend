import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TranslateDetailsDto } from '../models/dtos/translateDetailsDto';
import { Translate } from '../models/entities/translate';
import { ItemResponseModel } from '../models/responseModels/ItemResponseModel';
import { ListResponseModel } from '../models/responseModels/ListResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  apiUrl = environment.apiUrl + 'translates/';

  constructor(private httpClient:HttpClient) { }

  getAll(): Observable<ListResponseModel<Translate>> {
    return this.httpClient.get<ListResponseModel<Translate>>(
      this.apiUrl + 'getall'
    );
  }

  getAllDetails(): Observable<ListResponseModel<TranslateDetailsDto>> {
    return this.httpClient.get<ListResponseModel<TranslateDetailsDto>>(
      this.apiUrl + 'getalldetails'
    );
  }

  getAllDetailsByCode(
    code: string
  ): Observable<ListResponseModel<TranslateDetailsDto>> {
    return this.httpClient.get<ListResponseModel<TranslateDetailsDto>>(
      this.apiUrl + 'getalldetailsbycode?code=' + code
    );
  }

  getAllDetailsByLanguage(
    languageId: number
  ): Observable<ListResponseModel<TranslateDetailsDto>> {
    return this.httpClient.get<ListResponseModel<TranslateDetailsDto>>(
      this.apiUrl + 'getalldetailsbylanguage?languageId=' + languageId
    );
  }

  getAllByLanguage(
    languageId: number
  ): Observable<ListResponseModel<Translate>> {
    return this.httpClient.get<ListResponseModel<Translate>>(
      this.apiUrl + 'getallbylanguage?languageId=' + languageId
    );
  }

  getAllByCode(code: string): Observable<ListResponseModel<Translate>> {
    return this.httpClient.get<ListResponseModel<Translate>>(
      this.apiUrl + 'getallbycode?code=' + code
    );
  }

  add(translate: Translate): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', translate);
  }

  delete(translate: Translate): Observable<ResponseModel> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: translate,
    };

    return this.httpClient.delete<ResponseModel>(
      this.apiUrl + 'delete',
      httpOptions
    );
  }
}
