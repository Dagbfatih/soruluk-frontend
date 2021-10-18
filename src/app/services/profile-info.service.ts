import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceRepositoryBase } from '../core/services/service.repository.base';
import { ProfileInfoDetailsDto } from '../models/dtos/profileInfoDetailsDto';
import { ProfileInfo } from '../models/entities/profileInfo';
import { ItemResponseModel } from '../models/responseModels/ItemResponseModel';
import { ListResponseModel } from '../models/responseModels/ListResponseModel';

@Injectable({
  providedIn: 'root',
})
export class ProfileInfoService extends ServiceRepositoryBase<ProfileInfo> {
  apiUrl = environment.apiUrl + 'profileInfos/';
  constructor(protected httpClient: HttpClient) {
    super('profileInfos', httpClient);
  }

  getAllDetails(): Observable<ListResponseModel<ProfileInfoDetailsDto>> {
    return this.httpClient.get<ListResponseModel<ProfileInfoDetailsDto>>(
      this.apiUrl + 'getalldetails'
    );
  }

  getDetailsByUser(
    userId: number
  ): Observable<ItemResponseModel<ProfileInfoDetailsDto>> {
    return this.httpClient.get<ItemResponseModel<ProfileInfoDetailsDto>>(
      this.apiUrl + 'getdetailsbyuser?userId=' + userId
    );
  }
}
