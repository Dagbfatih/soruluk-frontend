import { Observable } from 'rxjs';
import { ItemResponseModel } from 'src/app/models/responseModels/ItemResponseModel';
import { ListResponseModel } from 'src/app/models/responseModels/ListResponseModel';
import { ResponseModel } from 'src/app/models/responseModels/responseModel';

export interface ServiceRepository<T> {
  apiUrl: string;
  add(entity: T): Observable<ResponseModel>;
  delete(entity: T): Observable<ResponseModel>;
  getAll(): Observable<ListResponseModel<T>>;
  getById(id: number): Observable<ItemResponseModel<T>>;
  update(entity: T): Observable<ResponseModel>;
}
