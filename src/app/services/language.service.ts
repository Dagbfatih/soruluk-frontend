import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Language } from '../models/entities/language';
import { ItemResponseModel } from '../models/responseModels/ItemResponseModel';
import { ListResponseModel } from '../models/responseModels/ListResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  apiUrl = environment.apiUrl + 'languages/';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<Language>> {
    return this.httpClient.get<ListResponseModel<Language>>(
      this.apiUrl + 'getall'
    );
  }

  getByCode(code: string): Observable<ItemResponseModel<Language>> {
    return this.httpClient.get<ItemResponseModel<Language>>(
      this.apiUrl + 'getbycode?code=' + code
    );
  }

  add(language: Language): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', language);
  }

  update(language: Language): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + 'update', language);
  }

  delete(language: Language): Observable<ResponseModel> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: language,
    };

    return this.httpClient.delete<ResponseModel>(
      this.apiUrl + 'delete',
      httpOptions
    );
  }
}
