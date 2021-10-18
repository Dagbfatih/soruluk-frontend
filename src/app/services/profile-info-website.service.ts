import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceRepositoryBase } from '../core/services/service.repository.base';
import { ProfileInfoWebsite } from '../models/entities/profileInfoWebsite';

@Injectable({
  providedIn: 'root',
})
export class ProfileInfoWebsiteService extends ServiceRepositoryBase<ProfileInfoWebsite> {
  apiUrl = environment.apiUrl + 'profileInfoWebsites/';
  constructor(protected httpClient: HttpClient) {
    super('profileInfoWebsites', httpClient);
  }
}
