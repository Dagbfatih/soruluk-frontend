import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/responseModels/ListResponseModel';
import { User } from '../models/entities/user';
import { ItemResponseModel } from '../models/responseModels/ItemResponseModel';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl + 'users/';

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<ListResponseModel<User>> {
    return this.httpClient.get<ListResponseModel<User>>(this.apiUrl + 'getall');
  }

  getUserById(id: number): Observable<ItemResponseModel<User>> {
    return this.httpClient.get<ItemResponseModel<User>>(
      this.apiUrl + 'getbyid?id=' + id
    );
  }

  update(userModel: User): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'update',
      userModel
    );
  }

  getAllByUsers(
    userIds: number[]
  ): Observable<ListResponseModel<User>> {
    userIds = userIds.filter(
      (element, i) => i === userIds.indexOf(element)
    );

    let params: string="";
    userIds.forEach((userId) => {
      params += 'userIds=' + userId + '&';
    });

    return this.httpClient.get<ListResponseModel<User>>(
      this.apiUrl + 'getallbyids?' + params
    );
  }

  updateWithoutPassword(userModel: User): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'updatewithoutpassword',
      userModel
    );
  }

  delete(user: User): Observable<ResponseModel> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: user,
    };

    return this.httpClient.delete<ResponseModel>(
      this.apiUrl + 'delete',
      httpOptions
    );
  }
}
