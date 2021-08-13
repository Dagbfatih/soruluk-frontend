import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmailMessage } from '../models/entities/emailMessage';
import { ResponseModel } from '../models/responseModels/responseModel';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  apiUrl = environment.apiUrl + 'emails/';
  
  constructor(private httpClient: HttpClient) {}

  send(emailMessage: EmailMessage): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'send', emailMessage);
  }
}
