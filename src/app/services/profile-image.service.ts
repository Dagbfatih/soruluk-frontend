import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProfileImage } from '../models/entities/profileImage';
import { ItemResponseModel } from '../models/responseModels/ItemResponseModel';
import { ListResponseModel } from '../models/responseModels/ListResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ProfileImageService {
  apiUrl = environment.apiUrl + 'profileImages/';

  constructor(private httpClient: HttpClient) {}

  getProfileImages(): Observable<ListResponseModel<ProfileImage>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<ProfileImage>>(newPath);
  }

  getProfileImageByUser(
    userId: number
  ): Observable<ItemResponseModel<ProfileImage>> {
    let newPath = this.apiUrl + 'getbyuserid?userId=' + userId;
    return this.httpClient.get<ItemResponseModel<ProfileImage>>(newPath);
  }

  getAllByUsers(
    userIds: number[]
  ): Observable<ListResponseModel<ProfileImage>> {
    userIds = userIds.filter(
      (element, i) => i === userIds.indexOf(element)
    );

    let params: string="";
    userIds.forEach((userId) => {
      params += 'userIds=' + userId + '&';
    });

    return this.httpClient.get<ListResponseModel<ProfileImage>>(
      this.apiUrl + 'getallbyusers?' + params
    );
  }

  update(image: File, id: number): Observable<ResponseModel> {
    const formData: FormData = new FormData();

    formData.append('Image', image);
    formData.append('Id', id.toString());

    return this.httpClient.put<ResponseModel>(
      this.apiUrl + 'update',
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
  }

  add(image: File, profileImage: ProfileImage): Observable<ResponseModel> {
    const formData: FormData = new FormData();

    formData.append('Image', image);
    formData.append('userId', profileImage.userId.toString());
    formData.append('date', profileImage.date.toString());

    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', formData, {
      reportProgress: true,
      responseType: 'json',
    });
  }

  delete(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(
      this.apiUrl + 'delete?id=' + id
    );
  }
}
