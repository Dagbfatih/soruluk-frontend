import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lesson } from '../models/entities/lesson';
import { ListResponseModel } from '../models/responseModels/ListResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  apiUrl = environment.apiUrl + 'lessons/';
  constructor(private httpClient: HttpClient) {}

  add(lesson: Lesson): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', lesson);
  }

  getAll(): Observable<ListResponseModel<Lesson>> {
    return this.httpClient.get<ListResponseModel<Lesson>>(
      this.apiUrl + 'getall'
    );
  }
}
