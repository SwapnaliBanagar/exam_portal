import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/exam'; 

  constructor(private httpClient:HttpClient) { }

loginHere(user:any):Observable<any>
{
  return this.httpClient.post(`${this.baseUrl}/login`, user);
}
 
}
