import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subject } from '../models/entities/subject';
import { ListResponseModel } from '../models/responseModels/ListResponseModel';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  apiUrl = environment.apiUrl + 'subjects/';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<Subject>> {
    return this.httpClient.get<ListResponseModel<Subject>>(
      this.apiUrl + 'getall'
    );
  }

  getAllByLesson(lessonId: number): Observable<ListResponseModel<Subject>> {
    return this.httpClient.get<ListResponseModel<Subject>>(
      this.apiUrl + 'getallbylesson?lessonId=' + lessonId
    );
  }
}
