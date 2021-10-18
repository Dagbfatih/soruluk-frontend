import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemResponseModel } from 'src/app/models/responseModels/ItemResponseModel';
import { ListResponseModel } from 'src/app/models/responseModels/ListResponseModel';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';
import { environment } from 'src/environments/environment';
import { ServiceRepository } from './service.repository';

export class ServiceRepositoryBase<T> implements ServiceRepository<T> {
  apiUrl: string;

  constructor(
    protected controllerName: string,
    protected httpClient: HttpClient
  ) {
    this.apiUrl = environment.apiUrl + controllerName + '/';
  }

  add(entity: T): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'add', entity);
  }

  delete(entity: T): Observable<ResponseModel> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: entity,
    };

    return this.httpClient.delete<ResponseModel>(
      this.apiUrl + 'delete',
      httpOptions
    );
  }

  getAll(): Observable<ListResponseModel<T>> {
    return this.httpClient.get<ListResponseModel<T>>(this.apiUrl + 'getall');
  }

  getById(id: number): Observable<ItemResponseModel<T>> {
    return this.httpClient.get<ItemResponseModel<T>>(
      this.apiUrl + 'getall?id=' + id
    );
  }

  update(entity: T): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + 'update', entity);
  }
}
