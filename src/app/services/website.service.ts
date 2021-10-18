import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceRepositoryBase } from '../core/services/service.repository.base';
import { Website } from '../models/entities/website';

@Injectable({
  providedIn: 'root',
})
export class WebsiteService extends ServiceRepositoryBase<Website> {
  apiUrl = environment.apiUrl + 'websites/';
  constructor(protected httpClient: HttpClient) {
    super('websites', httpClient);
  }
}
