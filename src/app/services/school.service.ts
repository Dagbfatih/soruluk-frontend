import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceRepositoryBase } from '../core/services/service.repository.base';
import { School } from '../models/entities/school';

@Injectable({
  providedIn: 'root',
})
export class SchoolService extends ServiceRepositoryBase<School> {
  apiUrl = environment.apiUrl + 'schools/';
  constructor(protected httpClient: HttpClient) {
    super('schools', httpClient);
  }
}
