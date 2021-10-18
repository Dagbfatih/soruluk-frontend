import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceRepositoryBase } from '../core/services/service.repository.base';
import { City } from '../models/entities/city';

@Injectable({
  providedIn: 'root',
})
export class CityService extends ServiceRepositoryBase<City> {
  apiUrl = environment.apiUrl + 'cities/';
  constructor(protected httpClient: HttpClient) {
    super('cities', httpClient);
  }
}
