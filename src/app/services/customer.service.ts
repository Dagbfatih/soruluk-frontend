import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerDetailsDto } from '../models/dtos/customerDetailsDto';
import { Customer } from '../models/entities/customer';
import { ItemResponseModel } from '../models/responseModels/ItemResponseModel';
import { ListResponseModel } from '../models/responseModels/ListResponseModel';
import { ResponseModel } from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = environment.apiUrl + 'customers/';
  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(
      this.apiUrl + 'getall'
    );
  }

  getByUser(userId: number): Observable<ItemResponseModel<Customer>> {
    return this.httpClient.get<ItemResponseModel<Customer>>(
      this.apiUrl + 'getbyuser?userId=' + userId
    );
  }

  getDetailsByUser(
    userId: number
  ): Observable<ItemResponseModel<CustomerDetailsDto>> {
    return this.httpClient.get<ItemResponseModel<CustomerDetailsDto>>(
      this.apiUrl + 'getdetailsbyuser?userId=' + userId
    );
  }

  getAllByUsers(
    userIds: number[]
  ): Observable<ListResponseModel<CustomerDetailsDto>> {
    userIds = userIds.filter(
      (element, i) => i === userIds.indexOf(element)
    );

    let params: string="";
    userIds.forEach((userId) => {
      params += 'userIds=' + userId + '&';
    });

    return this.httpClient.get<ListResponseModel<CustomerDetailsDto>>(
      this.apiUrl + 'getallbyuserids?' + params
    );
  }

  add(customer: Customer): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', customer);
  }

  update(customer: Customer): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + 'update', customer);
  }

  confirmAccunt(customer:Customer):Observable<ResponseModel>{
    return this.httpClient.put<ResponseModel>(this.apiUrl+"confirmaccount", customer);
  }
}
