import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl = 'http://localhost:8080/exam'; 

  constructor(private httpClient: HttpClient) { }

  registerUser(user: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/register`, user);
  }

  getAllUser(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/admin/getAllUsers`);
  }

}


